const checksumString = message.split("*")[0].substr(1); // Remove '!'

let checksums = 0;
// Calculate the checksum using XOR on all characters
for (let i = 0; i < checksumString.length; i++) {
    // XOR each character's ASCII value
    checksums ^= checksumString.charCodeAt(i);
}


let checksumHex = checksums.toString(16).toUpperCase();
if (checksumHex.length === 1) {
    checksumHex = `0${checksumHex}`;
}
if (checksumHex !== checksum) {
    return {
        Error: "checksum Err",
        errCode: -1,
        input1: message,
        input2: checksum,
    };
}
return {
    errCode: 0,
    input1: message,
    input2: checksum,
};
