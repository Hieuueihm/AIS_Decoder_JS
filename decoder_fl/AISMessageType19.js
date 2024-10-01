const baseMessage = await me.AIS_Message_Common({
    payload: payload,
    messageType: messageType,
    channel: channel,
});
return {
    ...baseMessage,
    speedOverGround: await me.getInt({ binaryPayload: payload, startIndex: 46, length: 10 }),
    accuracy: await me.getBooleanVal({ binaryPayload: payload, startIndex: 56, length: 1 }),
    lon: await me.getSignedVal({ binaryPayload: payload, startIndex: 57, length: 28 }) / 600000,
    lat: await me.getSignedVal({ binaryPayload: payload, startIndex: 85, length: 27 }) / 600000,
    courseOverGround: await me.getInt({ binaryPayload: payload, startIndex: 112, length: 12 }),
    heading: await me.getInt({ binaryPayload: payload, startIndex: 124, length: 9 }),
    utcSecond: await me.getInt({ binaryPayload: payload, startIndex: 133, length: 6 }),
    name: await me.getStringVal({ binaryPayload: payload, startIndex: 143, length: 120 }),
    typeAndCargo: await me.getInt({ binaryPayload: payload, startIndex: 263, length: 8 }),
    dimBow: await me.getInt({ binaryPayload: payload, startIndex: 271, length: 9 }),
    dimStern: await me.getInt({ binaryPayload: payload, startIndex: 280, length: 9 }),
    dimPort: await me.getInt({ binaryPayload: payload, startIndex: 289, length: 6 }),
    dimStarboard: await me.getInt({ binaryPayload: payload, startIndex: 295, length: 6 }),
    epfd: await me.getInt({ binaryPayload: payload, startIndex: 301, length: 4 })

};
