function messageNormalization(message) {
    let cleanedMessage = "";

    for (let i = 0; i < message.length; i++) {
        if (!((message[i] === '\\' && message[i + 1] === 'r') || (message[i] === '\\' && message[i + 1] === 'n'))) {
            cleanedMessage += message[i];
        } else {
            i++
        }
    }
    return cleanedMessage
}

console.log(messageNormalization("abnv\r\n"))