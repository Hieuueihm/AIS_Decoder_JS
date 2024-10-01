import { AISMessage } from "./AISMessage.js";


class AISType19 extends AISMessage {
    constructor(messageType, channel, bitHandler, formatter) {
        super(messageType, channel, bitHandler);
        this.speedOverGround = formatter.speedOverGround(bitHandler.getIntVal(46, 10));
        this.accuracy = bitHandler.getBooleanVal(56, 1);
        this.lon = formatter.longitude(bitHandler.getSignedIntVal(57, 28));
        this.lat = formatter.latitude(bitHandler.getSignedIntVal(85, 27));
        this.courseOverGround = formatter.courseOverGround(bitHandler.getIntVal(112, 12));
        this.heading = formatter.heading(bitHandler.getIntVal(124, 9));
        this.utcSecond = bitHandler.getIntVal(133, 6);
        this.name = bitHandler.getStringVal(143, 120);
        this.typeAndCargo = bitHandler.getIntVal(263, 8);
        this.dimBow = bitHandler.getIntVal(271, 9);
        this.dimStern = bitHandler.getIntVal(280, 9);
        this.dimPort = bitHandler.getIntVal(289, 6);
        this.dimStarboard = bitHandler.getIntVal(295, 6);
        this.epfd = bitHandler.getIntVal(301, 4);

    }
}

export { AISType19 }