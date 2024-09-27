import { AISMessage } from "./AISMessage.js";


class AISType8InlandStatic extends AISMessage {
    constructor(messageType, channel, bitHandler, formatter) {
        super(messageType, channel, bitHandler);
        this.dac = bitHandler.getIntVal(40, 10);
        this.fid = bitHandler.getIntVal(50, 6);
        this.eni = bitHandler.getStringVal(56, 48);
        this.length = formatter.inlandLengthOrBeam(bitHandler.getIntVal(104, 13));
        this.beam = formatter.inlandLengthOrBeam(bitHandler.getIntVal(117, 10));
        this.shipType = bitHandler.getIntVal(127, 14);
        this.hazardCode = bitHandler.getIntVal(141, 3);
        this.draught = formatter.draught(bitHandler.getIntVal(144, 11));
        this.loadStatus = bitHandler.getIntVal(155, 2);
        this.speedQuality = bitHandler.getBooleanVal(157, 1);
        this.courseQuality = bitHandler.getBooleanVal(158, 1);
        this.headingQuality = bitHandler.getBooleanVal(159, 1);

    }
}

export { AISType8InlandStatic }