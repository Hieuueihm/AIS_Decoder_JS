import { AISSentence } from "./AISSentence.js";
import { AISBitHanlder } from "./AISBitHandler.js";
import { AISFormatter } from "./messages/AISFormatter.js";
import { AISMessage } from "./messages/AISMessage.js";
import { AISType123 } from "./messages/AISType123.js";
import { AISType5 } from "./messages/AISType5.js";
import { AISType18 } from "./messages/AISType18.js";
import { AISType24 } from "./messages/AISType24.js";
import fs from 'fs'
class AISDecoder {

    constructor() {
        this.formatter = new AISFormatter();
        this.buffer = []
    }
    decode(message) {
        console.log(message)
        let res = null
        const sentence = new AISSentence(message);
        if (sentence.isMultiFragments()) {
            this.handlerMultiFragmentsMessage(sentence, message);
        } else {
            res = this.handleDecodeMessage(sentence.payload, sentence.channel, message);
        }
        return res
    }
    handleDecodeMessage(payload, channel) {
        console.log(payload)
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
            case 5:
                decodedMsg = new AISType5(messageType, channel, bitHandler, this.formatter);
                break;
            case 18:
                decodedMsg = new AISType18(messageType, channel, bitHandler, this.formatter);
                break;
            case 24:
                decodedMsg = new AISType24(messageType, channel, bitHandler, this.formatter);
                break;
        }
        if (decodedMsg) {
            // Append the decoded result to 'output.txt'
            console.log(decodedMsg)
        }
    }
    handlerMultiFragmentsMessage(sentence, message) {
        let fragmentId = sentence.fragmentId
        if (!this.buffer[fragmentId]) {
            this.buffer[fragmentId] = [];
        }

        this.buffer[fragmentId].push(sentence)


        if (sentence.isFinishAMessage()) {
            if (this.buffer[fragmentId].length != sentence.countOfFragments) {
                this.buffer[fragmentId] = []
                throw new Error(`Fragment mismatch for ID ${fragmentId}: expected ${sentence.countOfFragments}, but got ${this.buffer[fragmentId].length}`);
            }
            console.log("Message complete!", this.buffer[fragmentId]);
            const payloads = this.buffer[fragmentId].map(sentence => sentence.payload)
            this.buffer[fragmentId] = []
            this.handleDecodeMessage(payloads.join(''), sentence.channel, message)
        }
    }
}


export { AISDecoder }