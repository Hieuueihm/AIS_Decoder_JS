function AIS_Bit_Hanlder(payload) {
    let binaryPayload = ''
    for (let i = 0; i < payload.length; i++) {
        let asciiValue = payload.charCodeAt(i) - 48;
        if (asciiValue > 40) {
            asciiValue -= 8;
        }
        const binaryValue = asciiValue.toString(2);
        // padding
        binaryPayload += `000000${binaryValue}`.slice(-6);
    }
}