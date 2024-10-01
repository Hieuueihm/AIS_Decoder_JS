
let message = payload
const sentence = await me.AIS_Message_Sentence({ message: message });

const checksum = await me.AIS_Message_Checksum({
    message: message,
    checksum: sentence.checksum,
});

if (checksum.errCode == -1) {
    return checksum;
}
let countOfFragments = sentence.countOfFragments
let decodedMessage = {};
if (countOfFragments == 1) {
    decodedMessage = await me.AIS_Decode_One_Message({ payload: sentence.payload, channel: sentence.channel })

} else {
    // handle multi fragments message
}
return {
    errCode: 0,
    message: decodedMessage
};