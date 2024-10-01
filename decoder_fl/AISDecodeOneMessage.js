let binaryPayload = await me.AIS_Payload_String_Padding({
    payload: payload,
});
let messageType = await me.getInt({
    binaryPayload: binaryPayload,
    startIndex: 0,
    length: 6,
});


let decodedMsg = {};
switch (messageType) {
    case 1:
    case 2:
    case 3:
        decodedMsg = await me.AIS_Message_Type_123({
            messageType: messageType,
            channel: channel,
            payload: binaryPayload,
        });
        break;
    case 4:
        decodedMsg = await me.AIS_Message_Type_4({
            messageType: messageType,
            channel: channel,
            payload: binaryPayload,
        });
        break;
    case 5:
        decodedMsg = await me.AIS_Message_Type_5({
            messageType: messageType,
            channel: channel,
            payload: binaryPayload,
        });
        break;

    case 18:
        decodedMsg = await me.AIS_Message_Type_18({
            messageType: messageType,
            channel: channel,
            payload: binaryPayload,
        });
        break;
    case 19:
        decodedMsg = await me.AIS_Message_Type_19({
            messageType: messageType,
            channel: channel,
            payload: binaryPayload,
        });
        break;
    case 24:
        decodedMsg = await me.AIS_Message_Type_24({
            messageType: messageType,
            channel: channel,
            payload: binaryPayload,
        });
        break;
}
return decodedMsg;
