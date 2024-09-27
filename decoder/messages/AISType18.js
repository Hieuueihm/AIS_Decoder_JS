import { AISMessage } from "./AISMessage.js";

class AISType18 extends AISMessage {
    constructor(messageType, channel, bitHandler, formatter) {
        super(messageType, channel, bitHandler);
        this.speedOverGround = formatter.speedOverGround(bitHandler.getIntVal(46, 10));
        this.accuracy = bitHandler.getBooleanVal(56, 1);
        this.lon = formatter.longitude(bitHandler.getSignedIntVal(57, 28));
        this.lat = formatter.latitude(bitHandler.getSignedIntVal(85, 27));
        this.courseOverGround = formatter.courseOverGround(bitHandler.getIntVal(112, 12));
        this.heading = formatter.heading(bitHandler.getIntVal(124, 9));
        this.utcSecond = bitHandler.getIntVal(133, 6);
        this.regional = bitHandler.getIntVal(139, 2);
        this.unitFlag = bitHandler.getBooleanVal(141, 1);
        this.displayFlag = bitHandler.getBooleanVal(142, 1);
        this.dscFlag = bitHandler.getBooleanVal(143, 1);
        this.bandFlag = bitHandler.getBooleanVal(144, 1);
        this.msg22Flag = bitHandler.getBooleanVal(145, 1);
        this.modeFlag = bitHandler.getBooleanVal(146, 1);
        this.raim = bitHandler.getBooleanVal(147, 1);
        this.radio = bitHandler.getIntVal(148, 20);

    }
}

export { AISType18 }