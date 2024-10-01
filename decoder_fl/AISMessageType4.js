const baseMessage = await me.AIS_Message_Common({
    payload: payload,
    messageType: messageType,
    channel: channel,
});
return {
    ...baseMessage,
    year: await me.getInt({ binaryPayload: payload, startIndex: 38, length: 14 }),
    month: await me.getInt({ binaryPayload: payload, startIndex: 52, length: 4 }),
    day: await me.getInt({ binaryPayload: payload, startIndex: 56, length: 5 }),
    hour: await me.getInt({ binaryPayload: payload, startIndex: 61, length: 5 }),
    minute: await me.getInt({
        binaryPayload: payload,
        startIndex: 66,
        length: 6,
    }),
    second: await me.getInt({
        binaryPayload: payload,
        startIndex: 72,
        length: 6,
    }),
    accuracy: await me.getBooleanVal({
        binaryPayload: payload,
        startIndex: 78,
        length: 1,
    }),
    lon:
        (await me.getSignedVal({
            binaryPayload: payload,
            startIndex: 79,
            length: 28,
        })) / 600000,
    lat:
        (await me.getSignedVal({
            binaryPayload: payload,
            startIndex: 107,
            length: 27,
        })) / 600000,
    epfd: await me.getInt({ binaryPayload: payload, startIndex: 134, length: 4 }),
    raim: await me.getBooleanVal({
        binaryPayload: payload,
        startIndex: 148,
        length: 1,
    }),
    radio: await me.getInt({
        binaryPayload: payload,
        startIndex: 149,
        length: 19,
    }),
};
