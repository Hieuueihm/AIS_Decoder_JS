let project_id = JSON.parse(entityInfo).project_id;
let decoded_message = await me.AIS_Decoder({ payload: payload });
let mmsi = decoded_message.mmsi;
let checkDevice = await me.keyDeviceInfo({
    device_key: mmsi.toString(),
    project_id: project_id,
});
let created_device = null;
let device_id = null;
if (checkDevice.success) {
    // upsert attrs
    device_id = checkDevice.data.id;
} else {
    // create devices
    created_device = await me.AIS_Create_New_Device({
        device_name: `AIS-${mmsi}`,
        device_key: mmsi.toString(),
    });
    device_id = created_device.data.id;
}
if (device_id == null) {
    return {
        errCode: -1,
        Error: "Device id  not found",
    };
}
// get messageType
let messageType = decoded_message.messageType;
if (
    messageType != 1 &&
    messageType != 2 &&
    messageType != 3 &&
    messageType != 5 &&
    messageType != 18 &&
    messageType != 24
) {
    return decoded_message;
}
// wrap attrs
let attrs = await me.AIS_Attrs({
    decoded_message: decoded_message,
    device_id: device_id,
});
if (attrs.errCode == -1) {
    return attrs;
}
let upsertData = attrs.data;
// timestamp
let timestamp = Date.now();
// upsert attrs

let res = "";
if (messageType == 5 || messageType == 24) {
    let type_transport = attrs.type_transport
    attrs = {
        ...attrs.data,
        type_transport: type_transport
    }
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
    let status = attrs.status
    attrs = {
        ...attrs.data,
        status: status
    }
    let timestamp = Date.now();
    res = await Thing(device_id).UpsertAttributes(attrs, {
        notSendWs: true,
        logged: true,
        entityType: "DEVICE",
        ts: timestamp,
    });
}
return {
    created_device: created_device,
    project_id: project_id,
    checkDevice: checkDevice,
    res: res,
    attrs: attrs,
    message: decoded_message,
};
let binaryPayload = "";
for (let i = 0; i < payload.length; i++) {
    let asciiValue = payload.charCodeAt(i) - 48;
    if (asciiValue > 40) {
        asciiValue -= 8;
    }
    const binaryValue = asciiValue.toString(2);
    // padding
    binaryPayload += `000000${binaryValue}`.slice(-6);
}
return binaryPayload;
