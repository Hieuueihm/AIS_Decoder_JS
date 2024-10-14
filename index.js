import fs from 'fs';
import AISDecoder from './decoder/index.js';  // Import your decoder

const decoder = new AISDecoder();
// let msg = ["!AIVDM,2,1,3,A,58SJsdH000000000001@P4pR0@5B3;P0000000197PC66t3d0020BH15CkQp,0*3F", "!AIVDM,2,2,3,A,13kQp3PB@00,2*3E"]
// let res = decoder.decode(msg[0])
// console.log(res)

let startTime = Date.now();
const msg = ["!AIVDO,2,1,0,A,58StHEh0000000000000000000000000000000162@400000000000000000,0*19",
    "!AIVDO,2,2,0,A,00000000000,2*26"]
for (let i = 0; i < msg.length; i++) {
    decoder.decode(msg[i])
}
console.log(Date.now() - startTime)

// let msg = "!AIVDO,1,1,,A,11mg=5@P007DBe0=jTH000000000,0*29"
// decoder.decode(msg)

// const msg = ["!AIVDM,2,1,1,B,58SK5`p00001QHLkB20P4V0@4pN3;?R2222222168`:77t0Ht03Qj2Dkk`88,0*44",
//     "!AIVDM,2,2,1,B,88888888880,2*26"]
// for (let i = 0; i < msg.length; i++) {
//     decoder.decode(msg[i])
// }
// console.log(new Date().getFullYear())
// let year = new Date().getFullYear();
// let eta = `${year}-09-25T13:30:00`
// console.log(eta)

// // let timestamp = Date.parse(eta);
// // console.log(timestamp)

// console.log(`test: 0${7}`.slice(-2))

// if (
//     messageType == 1 ||
//     messageType == 2 ||
//     messageType == 3 ||
//     messageType == 18
// ) {
//     let rot = decoded_message.rateOfTurn;
//     rot = Math.sqrt(rot);
//     if (rot == -128) {
//         rot = null;
//     }

//     let datas = {
//         direction: rot,
//         latitude: decoded_message.lat == 91 ? null : decoded_message.lat,
//         longitude: decoded_message.lon == 181 ? null : decoded_message.lon,
//         speed: decoded_message.speedOverGround,
//     };
//     let navigational_status = await me.AIS_Navigational_Status({
//         navigation_status: Number(decoded_message.navigationStatus),
//     });
//     let result = {
//         aisStation: "Cát Lái",
//         datas: datas,
//         status: navigational_status,
//     };
//     return result;
// } else if (messageType == 5 || messageType == 24) {
//     let eta = null;
//     if (messageType == 5) {
//         let year = new Date().getFullYear();
//         eta = `${year}-\`0${decoded_message.etaMonth}\`.slice(-2)-\`0${decoded_message.etaDay}\`.slice(-2)T\`0${decoded_message.etaHour}\`.slice(-2):\`0${decoded_message.etaMinute}\`.slice(-2):00`
//         eta = Date.parse(eta)
//     }
//     let dataDes = {
//         "desLocation": (messageType == 5) ? decoded_message.destination : null,
//         "departureTime": eta
//     }
//     let signalCall = decoded_message.callsign
//     let result = {
//         dataInfo: dataInfo,
//         type_transport: type_transport,
//         dataStart: {
//             "departureTime": null,
//             "startLocation": null,
//         },
//         signalCall: signalCall,
//         dataDes: dataDes
//     }
//     return result
// }

// let result = {
//     errCode: -1,
//     input: decoded_message
// };
// return result;
// console.log(Date.now())
// let mmsi = "12314"
// console.log(mmsi.substring(0, 3))

