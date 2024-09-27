function getInt(binaryPayload, startIndex, length) {
    console.log(binaryPayload.substr(startIndex, length)[0])
    return parseInt(binaryPayload.substr(startIndex, length), 2)
}

function getSinedInt(binaryPayload, startIndex, length) {
    let intVal = getInt(binaryPayload, startIndex, length);
    console.log(binaryPayload)
    if ((intVal & (1 << length - 1)) != 0) {
        intVal -= (1 << length)
    }
    return intVal

}

function getBooleanVal(binaryPayload, startIndex, length) {

}
function getStringVal(binaryPayload, startIndex, length) {
    binaryPayload = JSON.parse(binaryPayload);
    const sixBitAscii =
        "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_ !\"#$%&'()*+,-./0123456789:;<=>?";

    const binary = binaryPayload.substr(startIndex, length);
    let stringValue = "";
    let num = Math.floor(length / 6);
    let currentIndex = 0;
    for (i = 0; i < num; i++) {
        const binaryValueOfPara = binary.substr(currentIndex, 6);
        currentIndex += 6;

        sixBitVal =
            await me.charAt(sixBitAscii, parseInt(binaryValueOfPara, 2));
        stringValue += sixBitVal;
    }
    return stringValue
    const terminalCharInedx = stringValue.indexOf("@");
    if (terminalCharInedx !== -1) {
        stringValue = stringValue.substr(0, terminalCharInedx);
    }
    return stringValue.trimRight();

}

function charAt(message, index) {
    if (index < 0 || index >= message.length) {
        return '';
    }
    return message[index];
}
const binaryPayload = "11011"
console.log(getSinedInt(binaryPayload, 0, 5))


binaryPayload = JSON.parse(binaryPayload);
let subPayload = binaryPayload.substr(startIndex, length);
let maxValue = Math.pow(2, length)
let signedVal = maxValue - intVal
return signedVal
let inst = "";
if (callIns == 0) {
    // lat
    if (subPayload[0] == 1) {
        return {
            val: Math.pow(2, length) - intVal,
            dir: "South",
            errCode: 0,
        };
    } else {
        return {
            val: intVal,
            dir: "North",
            errCode: 0,
        };
    }
} else if (callIns == 1) {
    // lat
    if (subPayload[0] == 1) {
        return {
            val: Math.pow(2, length) - intVal,
            dir: "West",
            errCode: 0,
        };
    } else {
        return {
            val: intVal,
            dir: "East",
            errCode: 0,
        };
    }
} else if (callIns == 2) {
    return {
        val: intVal,
    };
}

return {
    errCode: -1,
};
