import { AISMessage } from "./AISMessage.js";

class AISType24 extends AISMessage {
    constructor(messageType, channel, bitHandler, formatter) {
        super(messageType, channel, bitHandler);
        this.partNum = bitHandler.getIntVal(38, 2);
        this.name = ""
        this.typeAndCargo = "";
        this.vendorId = "";
        this.model = ""
        this.serial = ""
        this.callsign = ""
        this.mothershipMMSI = ""
        this.dimBow = ""
        this.dimStern = ""
        this.dimPort = ""
        this.dimStarboard = ""

        if (this.partNum === 0) {
            this.setPartAProperties(bitHandler);
        } else if (this.partNum === 1) {
            this.setPartBProperties(bitHandler);
        } else {
            throw new Error(
                `Invalid part number '${this.partNum}' while decoding message type 24`
            );
        }

    }
    setPartAProperties(bitHandler) {
        this.name = bitHandler.getStringVal(40, 120);
    }

    setPartBProperties(bitHandler) {
        this.typeAndCargo = bitHandler.getIntVal(40, 8);
        this.vendorId = bitHandler.getStringVal(48, 18);
        this.model = bitHandler.getIntVal(66, 4);
        this.serial = bitHandler.getIntVal(70, 20);
        this.callsign = bitHandler.getStringVal(90, 42);

        if (isAuxiliaryCraft(this.mmsi)) {
            this.mothershipMMSI = bitHandler.getIntVal(132, 30);
        } else {
            this.dimBow = bitHandler.getIntVal(132, 9);
            this.dimStern = bitHandler.getIntVal(141, 9);
            this.dimPort = bitHandler.getIntVal(150, 6);
            this.dimStarboard = bitHandler.getIntVal(156, 6);
        }
    }
    isAuxiliaryCraft(mmsi) {
        const mmsiString = mmsi.toString();

        if (mmsiString.length !== 9) {
            return false;
        }

        const firstTwoDigits = Number(mmsiString.slice(0, 2));
        const lastFourDigits = Number(mmsiString.slice(5));

        const belongsToAuxiliaryCraft =
            firstTwoDigits === 98 && lastFourDigits > 0 && lastFourDigits <= 9999;

        return belongsToAuxiliaryCraft;
    }
}

export { AISType24 }