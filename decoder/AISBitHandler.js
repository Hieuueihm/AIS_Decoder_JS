import { TypeDef } from "./TypeDef.js";
/*
The data payload is an ASCII-encoded bit vector. 
Each character represents six bits of data. To recover the six bits, subtract 48 from the ASCII character value; if the result is greater than 40 subtract 8
*/

/**
Signed or unsigned integer

Float (scaled from signed integer)

Flag or Boolean

Index into a controlled vocabulary

Reserved bits

Spare bits

Strings
 * 
 */
class AISBitHanlder {
    // 0 -> 63

    sixBitAscii = '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_ !"#$%&\'()*+,-./0123456789:;<=>?';
    constructor(payload) {
        this.binaryPayload = ''
        this.payload = payload
        for (let i = 0; i < this.payload.length; i++) {
            let asciiValue = this.payload.charCodeAt(i) - 48;
            if (asciiValue > 40) {
                asciiValue -= 8;
            }
            const binaryValue = asciiValue.toString(2);
            // padding
            this.binaryPayload += `000000${binaryValue}`.slice(-6);

        }

    }
    getIntVal(startIndex, length) {
        // return integer value data
        return parseInt(this.binaryPayload.substr(startIndex, length), 2);
    }
    getSignedIntVal(startIndex, length) {
        let intVal = this.getIntVal(startIndex, length);
        // convert to signed (big-edian)
        // if highest bit == 1 
        if ((intVal & (1 << (length - 1))) !== 0) {
            intVal -= (1 << length);
        }

        return intVal;

    }
    charAt(message, index) {
        if (index < 0 || index >= message.length) {
            return '';
        }
        return message[index];
    }
    getBooleanVal(startIndex, length) {
        return Boolean(this.getIntVal(startIndex, length));
    }

    getStringVal(startIndex, length) {
        const binary = this.binaryPayload.substr(startIndex, length);
        let stringValue = ''
        let num = Math.floor(length / 6);
        let currentIndex = 0
        for (let i = 0; i < num; i++) {
            const binaryValueOfPara = binary.substr(currentIndex, 6);
            currentIndex += 6
            let sixBitVal = this.charAt(this.sixBitAscii, parseInt(binaryValueOfPara, 2))
            stringValue += sixBitVal
        }
        // remove 6 bit 0 (terminal char)
        /**
         * According to the standard, trailing unused characters in six-bit fields will be represented by "@" (six-bit zero); however, 
         * real-world encoders are not careful about this and often have nonzero garbage after the "@". The terminating "@" should not be considered part of the text,
         *  and any non-"@" characters after it should be discarded.
         *  It is also common to space-fill short fields such as ship and station name, so a decoder should strip trailing spaces after stripping at-signs and the garbage after them.
         * 
         */
        const terminalCharInedx = stringValue.indexOf('@');
        if (terminalCharInedx !== -1) {
            stringValue = stringValue.substr(0, terminalCharInedx);
        }


        return stringValue.trimRight()

    }

}

export { AISBitHanlder }