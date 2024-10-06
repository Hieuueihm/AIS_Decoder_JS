const mmsiString = mmsi.toString()
if (mmsiString.length !== 9) {
    return false;
}

const firstTwoDigits = Number(mmsiString.slice(0, 2));
const lastFourDigits = Number(mmsiString.slice(5));

const belongsToAuxiliaryCraft =
    firstTwoDigits == 98 && lastFourDigits > 0 && lastFourDigits <= 9999;

return belongsToAuxiliaryCraft;