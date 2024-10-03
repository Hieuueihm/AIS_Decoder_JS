const startIndex = message.indexOf('!')
if (startIndex === -1) {
    return {
        "Error": "No start character found!",
        errCode: -1
    }
}
const fields = message.split(',')
if (fields.length !== 7) {
    return {
        "Error": "Invalid Length",
        errCode: -1

    }
}
const posStr = fields[6].split('*')

return {
    talkerId: fields[0].substr(1, 2),
    countOfFragments: fields[1],
    currentFragments: fields[2],
    fragmentId: fields[3],
    channel: fields[4],
    payload: fields[5],
    checksum: posStr[1].slice(0, 2),
    errCode: 0

}