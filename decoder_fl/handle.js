let project_id = JSON?.parse(entityInfo)?.project_id;
/*normalize message*/
payload = await me.messageNormalization({ message: payload })


/*Decode message */

const sentence = await me.AIS_Message_Sentence({ message: payload });


const checksum = await me.AIS_Message_Checksum({
    message: payload,
    checksum: sentence.checksum,
});

/**checksum */


if (checksum.errCode == -1) {
    return {
        payload: payload
    }
}
let countOfFragments = sentence.countOfFragments
let currentFragments = sentence.currentFragments
let decoded_message = {};

if (countOfFragments == 1) {
    decoded_message = await me.AIS_Decode_One_Message({ payload: sentence.payload, channel: sentence.channel })
} else if (countOfFragments == 2) {
    if (currentFragments != countOfFragments) {
        await Adapter().UpdateSession({ metadata: payload })
        return {}
    } else if (currentFragments == countOfFragments) {
        let meta = ""
        if (metadata != "") {
            meta = JSON.parse(metadata);
        }
        const sentence_prev = await me.AIS_Message_Sentence({ message: meta });
        decoded_message = await me.AIS_Decode_One_Message({ payload: sentence_prev.payload + sentence.payload, channel: sentence.channel })
    }
    // handle multi fragments message
}
let mmsi = decoded_message?.mmsi;

// get messageType
let messageType = decoded_message.messageType;

if (
    messageType != 1 &&
    messageType != 2 &&
    messageType != 3 &&
    messageType != 5 &&
    messageType != 18 &&
    messageType != 19 &&
    messageType != 24
) {
    return decoded_message;
}
/*check device exist*/
let checkDevice = await me.keyDeviceInfo({
    device_key: mmsi?.toString(),
    project_id: project_id,
});

let created_device = null;
let device_id = null;
if (checkDevice.success) {
    // if device existed -> get device id
    device_id = checkDevice?.data?.id;
} else {
    // create devices
    created_device = await me.AIS_Create_New_Device({
        device_name: `AIS-${mmsi}`,
        device_key: mmsi?.toString(),
    });
    device_id = created_device.data.id;
}
if (device_id == null) {
    return {
        errCode: -1,
        Error: "Device id  not found",
    };
}

let attrs = await me.AIS_Attrs({
    decoded_message: decoded_message,
    device_id: device_id,
});
if (attrs.errCode == -1) {
    return attrs;
}
let timestamp = Date.now();

let res = "";
if (messageType == 5 || messageType == 24) {
    let type_transport = attrs?.type_transport;
    let type_transport_detail = attrs?.type_transport_detail
    let status = attrs?.status
    attrs = {
        ...attrs?.data, // datainfo
        type_transport: type_transport,
        status: status,
        type_transport_detail: type_transport_detail
    };
    res = await Thing(device_id).UpsertAttributes(attrs, {
        logged: false,
        entityType: "DEVICE",
    });
    // res = await Thing(device_id).UpsertAttributes({ status: status }, {
    //     logged: false,
    //     entityType: "DEVICE",
    // });

} else if (
    messageType == 1 ||
    messageType == 2 ||
    messageType == 3 ||
    messageType == 18
) {
    let status = attrs?.status;
    let type_transport = attrs?.type_transport
    let type_transport_detail = attrs?.type_transport_detail
    attrs = {
        ...attrs?.data,
    };
    let timestamp = Date.now();
    res = await me.UpsertAttributeWs({ device_id: device_id, attrs: attrs, ts: timestamp })

    res = await Thing(device_id).UpsertAttributes({
        status: status,
        type_transport: type_transport,
        type_transport_detail: type_transport_detail
    }, {
        notSendWs: false,
        entityType: "DEVICE",
    })
} else if (messageType == 19) {
    /*
      errCode: 0,
        data: {
            datasKey: { datas: datas },
            dataInfoKey: { dataInfo: dataInfo }
        },
        status: status,
        type_transport: await me.AIS_Type_Transport({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }),
    */
    let type_transport = attrs?.type_transport;
    let type_transport_detail = attrs?.type_transport_detail
    let status = attrs?.status;
    if (attrs?.data?.dataInfoKey != null) {
        let upsertAttrs1 = {
            ...attrs?.data?.dataInfoKey,
            type_transport: type_transport,
            status: status,
            type_transport_detail: type_transport_detail
        };
        res = await Thing(device_id).UpsertAttributes(upsertAttrs1, {
            logged: false,
            entityType: "DEVICE",
        });
    }

    let upsertAttrs = {
        ...attrs?.data?.datasKey, // dataset
    };
    let timestamp = Date.now();
    res = await me.UpsertAttributeWs({ device_id: device_id, attrs: upsertAttrs, ts: timestamp })
    // res = await Thing(device_id).UpsertAttributes(upsertAttrs, {
    //     notSendWs: false,
    //     logged: true,
    //     entityType: "DEVICE",
    //     ts: timestamp,
    // });
}
return {
    messageType: messageType,
    created_device: created_device,
    project_id: project_id,
    checkDevice: checkDevice,
    res: res,
    attrs: attrs,
    message: decoded_message,
};
