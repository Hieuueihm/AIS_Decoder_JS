let project_id = JSON?.parse(entityInfo)?.project_id;
/*normalize message*/
payload = await me.messageNormalization({ message: payload })
/*Decode message */
let decoded_message = await me.AIS_Decoder({ payload: payload });
if (decoded_message.errCode == -1) {
    return decoded_message
}
decoded_message = decoded_message?.message
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
    device_id = checkDevice.data.id;
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

// wrap attrs
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
    let status = attrs?.status
    attrs = {
        ...attrs?.data,
        type_transport: type_transport,
        status: status
    };
    res = await Thing(device_id).UpsertAttributes(attrs, {
        logged: false,
        entityType: "DEVICE",
    });
} else if (
    messageType == 1 ||
    messageType == 2 ||
    messageType == 3 ||
    messageType == 18
) {
    let status = attrs?.status;
    let type_transport = attrs?.type_transport
    attrs = {
        ...attrs?.data,
    };
    let timestamp = Date.now();
    res = await me.UpsertAttributeWs({ device_id: device_id, attrs: attrs?.datas, ts: timestamp })

    res = await Thing(device_id).UpsertAttributes({
        status: status,
        type_transport: type_transport
    }, {
        notSendWs: false,
        entityType: "DEVICE",
    })
} else if (messageType == 19) {
    let type_transport = attrs?.type_transport;

    if (attrs?.data?.dataInfoKey != null) {
        let upsertAttrs = {
            ...attrs?.data?.dataInfoKey,
            type_transport: type_transport,
        };
        res = await Thing(device_id).UpsertAttributes(upsertAttrs, {
            logged: false,
            entityType: "DEVICE",
        });
    }

    let upsertAttrs = {
        ...attrs?.data?.datasKey,
    };
    let timestamp = Date.now();
    res = await me.UpsertAttributeWs({ device_id: device_id, attrs: upsertAttrs?.datas, ts: timestamp })
    res = await Thing(device_id).UpsertAttributes(upsertAttrs, {
        notSendWs: false,
        logged: true,
        entityType: "DEVICE",
        ts: timestamp,
    });
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
