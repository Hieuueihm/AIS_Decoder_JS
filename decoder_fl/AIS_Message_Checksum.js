function AIS_Message_Checksum(message, checksum) {
    const checksumString = message.split("*")[0].substr(1); // Remove '!'
    console.log(typeof checksumString)
    console.log(checksumString)
    let checksum1 = 0;
    // Calculate the checksum using XOR on all characters
    for (let i = 0; i < checksumString.length; i++) {
        // XOR each character's ASCII value
        checksum1 ^= checksumString.charCodeAt(i);
    }
    let checksumHex = checksum1.toString(16).toUpperCase();
    if (checksumHex.length === 1) {
        checksumHex = `0${checksumHex}`;
    }
    console.log(checksumHex)
    if (checksumHex != checksum) {
        return false;
    }
    return true;
}
const msg = "!AIVDM,1,1,,A,18SK5`jP007b1:0<0OJk3wwD0<2i,0*74"
console.log(AIS_Message_Checksum(msg, "74"))




