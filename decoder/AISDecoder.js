import { AISSentence } from "./AISSentence.js";
import { AISBitHanlder } from "./AISBitHandler.js";
import { AISFormatter } from "./messages/AISFormatter.js";
import { AISMessage } from "./messages/AISMessage.js";
import { AISType123 } from "./messages/AISType123.js";
import { AISType4 } from "./messages/AISType4.js";
import { AISType5 } from "./messages/AISType5.js";
import { AISType8 } from "./messages/AISType8.js";
import { AISType18 } from "./messages/AISType18.js";
import { AISType24 } from "./messages/AISType24.js";
class AISDecoder {
    constructor() {
        this.formatter = new AISFormatter();
    }
    decode(message) {
        const sentence = new AISSentence(message);
        if (sentence.isMultiFragments()) {
            this.handlerMultiFragmentsMessage(sentence);
        } else {
            this.handleDecodeMessage(sentence.payload, sentence.channel);
        }
    }
    handleDecodeMessage(payload, channel) {
        const bitHandler = new AISBitHanlder(payload);
        console.log(bitHandler)
        const messageType = bitHandler.getIntVal(0, 6);
        let decodedMsg = null;
        switch (messageType) {
            case 1:
            case 2:
            case 3:
                decodedMsg = new AISType123(messageType, channel, bitHandler, this.formatter);
                break;
            case 4:
                decodedMsg = new AISType4(messageType, channel, bitHandler, this.formatter);
                break;
            case 5:
                decodedMsg = new AISType5(messageType, channel, bitHandler, this.formatter);
                break;
            case 8:
                decodedMsg = new AISType8(messageType, channel, bitHandler, this.formatter);
                break;
            case 18:
                decodedMsg = new AISType18(messageType, channel, bitHandler, this.formatter);
                break;
            case 24:
                decodedMsg = new AISType24(messageType, channel, bitHandler, this.formatter);
                break;
        }
        if (decodedMsg) {
            console.log(JSON.stringify(decodedMsg))
        }
    }
    handlerMultiFragmentsMessage() {

    }
}


export { AISDecoder }