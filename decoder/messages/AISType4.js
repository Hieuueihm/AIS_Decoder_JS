import { AISMessage } from "./AISMessage.js";


class AISType4 extends AISMessage {
    constructor(messageType, channel, bitHandler, formatter) {
        super(messageType, channel, bitHandler);
        this.year = formatter.year(bitHandler.getIntVal(38, 14));
        this.month = formatter.month(bitHandler.getIntVal(52, 4));
        this.day = formatter.day(bitHandler.getIntVal(56, 5));
        this.hour = formatter.hour(bitHandler.getIntVal(61, 5));
        this.minute = formatter.minute(bitHandler.getIntVal(66, 6));
        this.second = formatter.second(bitHandler.getIntVal(72, 6));
        this.accuracy = bitHandler.getBoolean(78, 1);
        this.lon = formatter.longitude(bitHandler.getSignedIntVal(79, 28));
        this.lat = formatter.latitude(bitHandler.getSignedIntVal(107, 27));
        this.epfd = bitHandler.getIntVal(134, 4);
        this.raim = bitHandler.getBooleanVal(148, 1);
        this.radio = bitHandler.getIntVal(149, 19);

    }
}

export { AISType4 }