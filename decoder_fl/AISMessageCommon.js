return {
    messageType: messageType,
    channel: channel,
    repeat: await me.getInt({ binaryPayload: payload, startIndex: 6, length: 2 }),
    mmsi: await me.getInt({ binaryPayload: payload, startIndex: 8, length: 30 }),
}