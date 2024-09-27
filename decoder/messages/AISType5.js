import { AISMessage } from "./AISMessage.js";


class AISType5 extends AISMessage {
    constructor(messageType, channel, bitHandler, formatter) {
        super(messageType, channel, bitHandler);
        this.aisVersion = bitHandler.getIntVal(38, 2);
        this.imo = bitHandler.getIntVal(40, 30);
        this.callsign = bitHandler.getStringVal(70, 42);
        this.name = bitHandler.getStringVal(112, 120);
        this.typeAndCargo = bitHandler.getIntVal(232, 8);
        this.dimBow = bitHandler.getIntVal(240, 9);
        this.dimStern = bitHandler.getIntVal(249, 9);
        this.dimPort = bitHandler.getIntVal(258, 6);
        this.dimStarboard = bitHandler.getIntVal(264, 6);
        this.epfd = bitHandler.getIntVal(270, 4);
        this.etaMonth = format.month(bitHandler.getIntVal(274, 4));
        this.etaDay = format.day(bitHandler.getIntVal(278, 5));
        this.etaHour = format.hour(bitHandler.getIntVal(283, 5));
        this.etaMinute = format.minute(bitHandler.getIntVal(288, 6));
        this.draught = format.draught(bitHandler.getIntVal(294, 8));
        this.destination = bitHandler.getStringVal(302, 120);
        this.dte = bitHandler.getBooleanVal(422, 1);

    }
}

export { AISType5 }