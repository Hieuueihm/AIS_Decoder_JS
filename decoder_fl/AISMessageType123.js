const baseMessage = await me.AIS_Message_Common({ payload: payload, messageType: messageType, channel: channel })
return {
    ...baseMessage,
    navigationStatus: await me.getInt({ binaryPayload: payload, startIndex: 38, length: 4 }),
    rateOfTurn: await me.getSignedVal({ binaryPayload: payload, startIndex: 42, length: 8 }),
    speedOverGround: await me.getInt({ binaryPayload: payload, startIndex: 50, length: 10 }),
    accuracy: await me.getBooleanVal({ binaryPayload: payload, startIndex: 60, length: 1 }),
    lon: await me.getSignedVal({ binaryPayload: payload, startIndex: 61, length: 28 }) / 600000,
    lat: await me.getSignedVal({ binaryPayload: payload, startIndex: 89, length: 27 }) / 600000,
    courseOverGround: await me.getInt({ binaryPayload: payload, startIndex: 116, length: 12 }),
    heading: await me.getInt({ binaryPayload: payload, startIndex: 128, length: 9 }),
    utcSecond: await me.getInt({ binaryPayload: payload, startIndex: 137, length: 6 }),
    specialManoeuvre: await me.getInt({ binaryPayload: payload, startIndex: 143, length: 2 }),
    raim: await me.getBooleanVal({ binaryPayload: payload, startIndex: 148, length: 1 }),
    radio: await me.getInt({ binaryPayload: payload, startIndex: 149, length: 19 })


};