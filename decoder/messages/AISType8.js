import { AISMessage } from "./AISMessage.js";

import { AISType8InlandStatic } from "./AISType8InlandStatic.js";

class AISType8 extends AISMessage {
    constructor(messageType, channel, bitHandler, formatter) {
        super(messageType, channel, bitHandler);
        this.dac = bitHandler.getIntVal(40, 10);
        this.fid = bitHandler.getIntVal(50, 6);

        if (this.dac === 200 && this.fid === 10) {
            return new AISType8InlandStatic(this.type, this.channel, bitHandler);
        }

    }
}

export { AISType8 }