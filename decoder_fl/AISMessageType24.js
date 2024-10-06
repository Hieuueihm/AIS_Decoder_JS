const baseMessage = await me.AIS_Message_Common({
    payload: payload,
    messageType: messageType,
    channel: channel,
});
let name = "";
let typeAndCargo = "";
let vendorId = "";
let model = "";
let serial = "";
let callsign = "";
let dimBow = "";
let dimStern = "";
let dimPort = "";
let dimStarboard = "";
let mothershipMMSI = "";
let partNum = await me.getInt({
    binaryPayload: payload,
    startIndex: 38,
    length: 2,
});
if (partNum == 0) {
    name = await me.getStringVal({
        binaryPayload: payload,
        startIndex: 40,
        length: 120,
    });
} else if (partNum == 1) {
    typeAndCargo = await me.getInt({
        binaryPayload: payload,
        startIndex: 40,
        length: 8,
    })
    vendorId =
        await me.getStringVal({
            binaryPayload: payload,
            startIndex: 48,
            length: 18,
        })
    model = await me.getInt({
        binaryPayload: payload,
        startIndex: 66,
        length: 4,
    })
    serial = await me.getInt({
        binaryPayload: payload,
        startIndex: 70,
        length: 20,
    })
    callsign = await me.getStringVal({
        binaryPayload: payload,
        startIndex: 90,
        length: 42,
    })
    if (await me.isAuxiliaryCraft({ mmsi: baseMessage.mmsi })) {
        mothershipMMSI = await me.getInt({
            binaryPayload: payload,
            startIndex: 132,
            length: 30,
        });
    } else {
        dimBow = await me.getInt({
            binaryPayload: payload,
            startIndex: 132,
            length: 9,
        });
        dimStern = await me.getInt({
            binaryPayload: payload,
            startIndex: 141,
            length: 9,
        });
        dimPort = await me.getInt({
            binaryPayload: payload,
            startIndex: 150,
            length: 6,
        });
        dimStarboard = await me.getInt({
            binaryPayload: payload,
            startIndex: 156,
            length: 6,
        });
    }
} else {
    return {
        errCode: -1,
    };
}
return {
    ...baseMessage,
    partNum: partNum,
    name: name,
    partNum: partNum,
    typeAndCargo: typeAndCargo,
    vendorId: vendorId,
    model: model,
    serial: serial,
    callsign: callsign,
    mothershipMMSI: mothershipMMSI,
    dimBow: dimBow,
    dimStern: dimStern,
    dimPort: dimPort,
    dimStarboard: dimStarboard,
};
