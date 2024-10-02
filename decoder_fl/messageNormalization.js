function messageNormalization(message) {
    if (message.includes('\r\n')) {
        // Remove all occurrences of \r\n
        return message.replace(/\r\n/g, '');
    }

    return message;
}

console.log(messageNormalization("abnv\r\n"))