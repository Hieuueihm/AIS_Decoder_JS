const baseMessage = await me.AIS_Message_Common({
    payload: payload,
    messageType: messageType,
    channel: channel,
});
return {
    ...baseMessage,
    speedOverGround: await me.getInt({ binaryPayload: payload, startIndex: 46, length: 10 }), // Assuming direct retrieval
    accuracy: await me.getBooleanVal({ binaryPayload: payload, startIndex: 56, length: 1 }),
    lon: await me.getSignedVal({ binaryPayload: payload, startIndex: 57, length: 28 }) / 600000, // Assuming direct retrieval
    lat: await me.getSignedVal({ binaryPayload: payload, startIndex: 85, length: 27 }) / 600000, // Assuming direct retrieval
    courseOverGround: await me.getInt({ binaryPayload: payload, startIndex: 112, length: 12 }), // Assuming direct retrieval
    heading: await me.getInt({ binaryPayload: payload, startIndex: 124, length: 9 }), // Assuming direct retrieval
    utcSecond: await me.getInt({ binaryPayload: payload, startIndex: 133, length: 6 }),
    regional: await me.getInt({ binaryPayload: payload, startIndex: 139, length: 2 }),
    unitFlag: await me.getBooleanVal({ binaryPayload: payload, startIndex: 141, length: 1 }),
    displayFlag: await me.getBooleanVal({ binaryPayload: payload, startIndex: 142, length: 1 }),
    dscFlag: await me.getBooleanVal({ binaryPayload: payload, startIndex: 143, length: 1 }),
    bandFlag: await me.getBooleanVal({ binaryPayload: payload, startIndex: 144, length: 1 }),
    msg22Flag: await me.getBooleanVal({ binaryPayload: payload, startIndex: 145, length: 1 }),
    modeFlag: await me.getBooleanVal({ binaryPayload: payload, startIndex: 146, length: 1 }),
    raim: await me.getBooleanVal({ binaryPayload: payload, startIndex: 147, length: 1 }),
    radio: await me.getInt({ binaryPayload: payload, startIndex: 148, length: 20 })
};
