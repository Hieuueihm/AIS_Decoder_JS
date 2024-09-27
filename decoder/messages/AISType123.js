import { AISMessage } from "./AISMessage.js";

class AISType123 extends AISMessage {
    constructor(messageType, channel, bitHandler, formatter) {
        super(messageType, channel, bitHandler);
        this.navigationStatus = bitHandler.getIntVal(38, 4);
        this.rateOfTurn = formatter.rateOfTurn(bitHandler.getSignedIntVal(42, 8));
        this.speedOverGround = formatter.speedOverGround(bitHandler.getIntVal(50, 10));
        this.accuracy = bitHandler.getBooleanVal(60, 1);
        this.lon = formatter.longitude(bitHandler.getSignedIntVal(61, 28));
        this.lat = formatter.latitude(bitHandler.getSignedIntVal(89, 27));
        this.courseOverGround = formatter.courseOverGround(bitHandler.getIntVal(116, 12));
        this.heading = formatter.heading(bitHandler.getIntVal(128, 9));
        this.utcSecond = bitHandler.getIntVal(137, 6);
        this.specialManoeuvre = bitHandler.getIntVal(143, 2);
        this.raim = bitHandler.getBooleanVal(148, 1);
        this.radio = bitHandler.getIntVal(149, 19);

    }
}

export { AISType123 }