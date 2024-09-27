

//!AIVDM, 1, 1,, B, 18SJvJhP01Wb5FR; wmb9egwF24qL, 0 * 56
/*
[
    '!AIVDM',
    ' 1',
    ' 1',
    '',
    ' B',
    ' 18SJvJhP01Wb5FR; wmb9egwF24qL',
    ' 0 * 56'
]
*/
// senteces:
/*
    taker ID - field[0] -> (1, 2)
    count of fragment - field[1]
    current fragment - field[2]
    fragment Id - field[3]
    channel - field[4]
    payload  - field[5]
    fillBits - field[6] -> (0)
    checksum - field[6] => (2, 3)

*/
class AISSentence {
    constructor(message) {
        this.message = message
        const startIndex = this.message.indexOf('!');
        if (startIndex === -1) {
            throw new Error('Invalid AIS format: No start character found');
        }

        const fields = this.message.split(',')
        if (fields.length !== 7) {
            throw new Error("Invalid AIS format: Invalid length");
        }

        this.talkerId = fields[0].substr(1, 2)
        this.countOfFragments = fields[1];
        this.currentFragments = fields[2];
        this.fragmentId = fields[3];
        this.channel = fields[4];
        this.payload = fields[5];
        const posStr = fields[6].split("*")
        this.fillBits = Number(posStr[0]);
        this.checksum = posStr[1];

        this.checkCheckSum();


    }


    isMultiFragments() {
        return this.countOfFragments > 1;
    }
    isFinishAMessage() {
        return this.countOfFragments === this.currentFragments;
    }
    checkCheckSum() {
        const checksumString = this.message.split('*')[0].substr(1); // Remove '!'
        console.log(checksumString)
        let checksum = 0;
        // Calculate the checksum using XOR on all characters
        for (let i = 0; i < checksumString.length; i++) {
            // XOR each character's ASCII value
            checksum ^= checksumString.charCodeAt(i);
        }
        let checksumHex = checksum.toString(16).toUpperCase();

        if (checksumHex.length === 1) {
            checksumHex = `0${checksumHex}`;
        }

        if (checksumHex !== this.checksum) {
            throw new Error(`Invalid checksum: calculated ${checksumHex}, expected ${this.checksum}`);
        }
    }
}

export { AISSentence }