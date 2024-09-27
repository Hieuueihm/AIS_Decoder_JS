

class AISMessage {

    constructor(messageType, channel, bitHandler) {
        this.type = messageType;
        this.channel = channel;
        this.repeat = bitHandler.getIntVal(6, 2);
        this.mmsi = bitHandler.getIntVal(8, 30);
    }
}

export { AISMessage }