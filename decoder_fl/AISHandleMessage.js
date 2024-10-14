let project_id = JSON?.parse(entityInfo)?.project_id;
/*normalize message*/
payload = await me.messageNormalization({ message: payload })
let sentences = []
let message = payload.split("!")
for (let i = 1; i < message.length; i++) {
    message[i] = "!" + message[i]
    sentences.push(await me.AIS_Message_Sentence({ message: message[i] }));
    let checksum = await me.AIS_Message_Checksum({
        message: message[i],
        checksum: sentences[i - 1].checksum,
    });
    if (checksum.errCode == -1) {
        return {
            payload: payload
        }
    }
}
let decoded_message = {};

/*Decode message */
let startTime = Date.now();
let decoded_time = 0;
if (sentences.length <= 1) {
    decoded_message = await me.AIS_Decode_One_Message({ payload: sentences[0].payload, channel: sentences[0].channel })
    decoded_time = Date.now() - startTime;
} else if (sentences.length >= 2) {
    let _payload = sentences[0].payload;
    for (let i = 2; i < sentences.length; i++) {
        _payload += sentences[i].payload;
    }
    decoded_message = await me.AIS_Decode_One_Message({ payload: _payload, channel: sentences[0].channel })
    decoded_time = Date.now() - startTime;
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
    return {
        Error: "Message is not of the defined types",
        decoded_message: decoded_message,
        payload: payload
    }
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

startTime = Date.now();
let res = "";
if (
    messageType == 1 ||
    messageType == 2 ||
    messageType == 3 || messageType == 18
) {
    let status = attrs?.status;
    let datas = attrs?.dataHistory
    let nation = attrs?.nation
    res = await me.UpsertAttributeWs({ device_id: device_id, attrs: datas, ts: timestamp })
    res = await Thing(device_id).UpsertAttributes({
        status: status,
        nation: nation
    }, {
        notSendWs: false,
        entityType: "DEVICE",
    })
} else if (messageType == 5) {
    let type_transport = attrs?.type_transport;
    let type_transport_detail = attrs?.type_transport_detail
    let dataInfo = attrs?.dataInfo;
    let dataDes = attrs?.dataHistory;
    let name = attrs?.name;
    // res = await me.UpsertAttributeWs({ device_id: device_id, attrs: dataDes, ts: timestamp })
    res = await Thing(device_id).UpsertAttributes({
        signalCall: attrs?.signalCall,
        dataDes,
        name: name,
        dataInfo: dataInfo,
        type_transport: type_transport,
        type_transport_detail: type_transport_detail
    }, {
        notSendWs: false,
        entityType: "DEVICE",
    })
}
else if (messageType == 24) {
    let partNum = attrs?.partNum
    if (partNum == 0) {
        res = await Thing(device_id).UpsertAttributes({
            name: attrs?.name
        }, {
            logged: false,
            entityType: "DEVICE",
        });
    } else {
        let type_transport = attrs?.type_transport;
        let type_transport_detail = attrs?.type_transport_detail
        let dataDes = attrs?.dataInfo
        res = await Thing(device_id).UpsertAttributes({
            type_transport: type_transport,
            type_transport_detail: type_transport_detail,
            dataDes,
            signalCall: attrs?.signalCall,

        }, {
            logged: false,
            entityType: "DEVICE",
        });
    }


}
else if (messageType == 19) {

    /**
     * 
     *  errCode: 0,
        dataHistory: {
            datas: datas

        },
        dataInfo: {
            dataInfo: dataInfo
        },
        name: decoded_message?.name,
        status: status,
        type_transport: type_transport,
        type_transport_detail: type_transport_detail,
    }
     */
    let type_transport = attrs?.type_transport;
    let type_transport_detail = attrs?.type_transport_detail
    let status = attrs?.status;
    let datas = attrs?.dataHistory;
    let dataInfo = attrs?.dataInfo;;
    let name = attrs?.name
    res = await Thing(device_id).UpsertAttributes({
        name: name,
        type_transport: type_transport,
        type_transport_detail: type_transport_detail,
        status: status,
        dataInfo
    }, {
        logged: false,
        entityType: "DEVICE",
    });
    res = await me.UpsertAttributeWs({ device_id: device_id, attrs: datas, ts: timestamp })

}



return {
    messageType: messageType,
    created_device: created_device,
    project_id: project_id,
    checkDevice: checkDevice,
    res: res,
    attrs: attrs,
    message: decoded_message,
    decodeTime: decoded_time,
    getAndSaveTime: Date.now() - startTime
};
