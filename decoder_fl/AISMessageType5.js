const baseMessage = await me.AIS_Message_Common({
    payload: payload,
    messageType: messageType,
    channel: channel,
});
return {
    ...baseMessage,
    aisVersion: await me.getInt({ binaryPayload: payload, startIndex: 38, length: 2 }),
    imo: await me.getInt({ binaryPayload: payload, startIndex: 40, length: 30 }),
    callsign: await me.getStringVal({ binaryPayload: payload, startIndex: 70, length: 42 }),
    name: await me.getStringVal({ binaryPayload: payload, startIndex: 112, length: 120 }),
    typeAndCargo: await me.getInt({ binaryPayload: payload, startIndex: 232, length: 8 }),
    dimBow: await me.getInt({ binaryPayload: payload, startIndex: 240, length: 9 }),
    dimStern: await me.getInt({ binaryPayload: payload, startIndex: 249, length: 9 }),
    dimPort: await me.getInt({ binaryPayload: payload, startIndex: 258, length: 6 }),
    dimStarboard: await me.getInt({ binaryPayload: payload, startIndex: 264, length: 6 }),
    epfd: await me.getInt({ binaryPayload: payload, startIndex: 270, length: 4 }),
    etaMonth: await me.getInt({ binaryPayload: payload, startIndex: 274, length: 4 }), // Assuming no formatting needed
    etaDay: await me.getInt({ binaryPayload: payload, startIndex: 278, length: 5 }),  // Assuming no formatting needed
    etaHour: await me.getInt({ binaryPayload: payload, startIndex: 283, length: 5 }),  // Assuming no formatting needed
    etaMinute: await me.getInt({ binaryPayload: payload, startIndex: 288, length: 6 }),  // Assuming no formatting needed
    draught: await me.getInt({ binaryPayload: payload, startIndex: 294, length: 8 }),  // Assuming no formatting needed
    destination: await me.getStringVal({ binaryPayload: payload, startIndex: 302, length: 120 }),
    dte: await me.getBooleanVal({ binaryPayload: payload, startIndex: 422, length: 1 })
};
