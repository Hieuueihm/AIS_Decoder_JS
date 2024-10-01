let decoded_message = {
    "type": 5, "channel": "B", "repeat": 0, "mmsi": 574000040, "aisVersion": 0, "imo": 9200976, "callsign": "XVCX", "name": "PTS HAI PHONG 02", "typeAndCargo": 80, "dimBow": 78, "dimStern": 22, "dimPort": 3, "dimStarboard": 12, "epfd": 1, "etaMonth": 9, "etaDay": 25, "etaHour": 13, "etaMinute": 30, "draught": 6.3, "destination": "HON GAI", "dte": false
}
let messageType = decoded_message.type;
let eta = ""
console.log(typeof (messageType), messageType)
if (messageType == 5) {
    let year = new Date().getFullYear();
    console.log(year)
    eta = `${year}-${`0${decoded_message.etaMonth}`.slice(-2)}-${`0${decoded_message.etaDay}`.slice(-2)}T${`0${decoded_message.etaHour}`.slice(-2)}:${`0${decoded_message.etaMinute}`.slice(-2)}:00`;
    console.log(eta)
    eta = Date.parse(eta);
}
console.log(eta)