//   decoded_message = JSON.parse(decoded_message);
let messageType = decoded_message.messageType;
let nation = "";
let mmsi = decoded_message.mmsi;
mmsi = mmsi.toString();
let timestamp_now = Date.now()
nation = await me.AIS_MMSI_To_Nation({ mmsi: mmsi });

if (messageType == 1 || messageType == 2 || messageType == 3 || messageType == 18) {
    let heading = decoded_message.heading;
    if (heading == 511) {
        heading = null;
    }
    /*navigational status*/
    let navigational_status = (messageType == 18) ? "undefined" : await me.AIS_Navigational_Status({
        navigation_status: Number(decoded_message?.navigationStatus), speed: Number(decoded_message?.speedOverGround),
    });
    let datas = {
        status: navigational_status,
        direction: heading,
        latitude: decoded_message.lat == 91 ? null : decoded_message.lat.toFixed(6),
        longitude: decoded_message.lon == 181 ? null : decoded_message.lon.toFixed(6),
        speed:
            decoded_message.speedOverGround == 1023
                ? null
                : (decoded_message.speedOverGround / 10 * 1.852).toFixed(2),
        timestamp: timestamp_now,
        MSSI: mmsi,
        last_updated_ts: timestamp_now,
        aisStation: "Cát Lái",
    };

    return {
        errCode: 0,
        dataHistory:
        {
            datas: datas,
        },
        status: navigational_status,
        nation: nation

    };
}
else if (messageType == 5) {
    // static data report
    // static data
    let eta = "";
    let year = new Date().getFullYear();
    eta = `${year}-${`0${decoded_message.etaMonth}`.slice(-2)}-${`0${decoded_message.etaDay}`.slice(-2)}T${`0${decoded_message.etaHour}`.slice(-2)}:${`0${decoded_message.etaMinute}`.slice(-2)}:00`;
    eta = Date.parse(eta);
    let type_transport = await me.AIS_Type_Transport({
        transport_type_code: decoded_message.typeAndCargo.toString(),
    });
    let type_transport_detail = await me.AIS_Type_Transport_Detail({
        transport_type_code: decoded_message.typeAndCargo.toString(),
    })
    let dataInfo = {
        type_transport: type_transport,
        type_transport_detail: type_transport_detail,
        sizeShip: {
            length: decoded_message.dimBow + decoded_message.dimStern,
            width: decoded_message.dimPort + decoded_message.dimStarboard,
        }

    };
    let dataDes = {
        desLocation: decoded_message?.destination,
        estimatedTime: eta,
        draftMark: decoded_message?.draught,
        startLocation: "",
        departureTime: ""
    }
    return {
        errCode: 0,
        dataHistory: {
            dataDes: dataDes
        },
        dataInfo: {
            dataInfo: dataInfo
        },
        type_transport: type_transport,
        type_transport_detail: type_transport_detail,
        name: decoded_message.name,
        signalCall: decoded_message.callsign,

    };
} else if (messageType == 24) {
    let partNum = decoded_message?.partNum;
    if (partNum == 0) {
        return {
            errCode: 0,
            partNum: partNum,
            name: decoded_message?.name
        }
    } else {
        let type_transport = await me.AIS_Type_Transport({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        });
        let type_transport_detail = await me.AIS_Type_Transport_Detail({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        })
        let dataInfo = {
            type_transport: type_transport,
            type_transport_detail: type_transport_detail,
            sizeShip: {
                length: decoded_message.dimBow + decoded_message.dimStern,
                width: decoded_message.dimPort + decoded_message.dimStarboard,
            },
        };
        return {
            errCode: 0,
            partNum: partNum,
            dataInfo: {
                dataInfo: dataInfo
            },
            signalCall: decoded_message?.callsign,
            type_transport: (partNum == 0) ? data_lastest?.type_transport : await me.AIS_Type_Transport({
                transport_type_code: decoded_message.typeAndCargo.toString(),
            }),
            type_transport_detail: (partNum == 0) ? data_lastest?.type_transport : await me.AIS_Type_Transport_Detail({
                transport_type_code: decoded_message.typeAndCargo.toString(),
            }),
        }
    }

} else if (messageType == 19) {

    let heading = decoded_message.heading;
    if (heading == 511) {
        heading = null;
    }

    let type_transport = await me.AIS_Type_Transport({
        transport_type_code: decoded_message.typeAndCargo.toString(),
    })
    let type_transport_detail = await me.AIS_Type_Transport_Detail({
        transport_type_code: decoded_message.typeAndCargo.toString(),

    })
    let status = "undefined"

    let dataInfo = {
        type_transport: type_transport,
        type_transport_detail: type_transport_detail,
        sizeShip: {
            length: decoded_message.dimBow + decoded_message.dimStern,
            width: decoded_message.dimPort + decoded_message.dimStarboard,
        },

    }
    let datas = {
        direction: heading,
        status: status,

        latitude: decoded_message.lat == 91 ? null : decoded_message.lat.toFixed(6),
        longitude: decoded_message.lon == 181 ? null : decoded_message.lon.toFixed(6),
        speed:
            decoded_message.speedOverGround == 1023
                ? null
                : (decoded_message.speedOverGround / 10 * 1.852).toFixed(2),
        timestamp: timestamp_now,
        MSSI: mmsi,
        last_updated_ts: timestamp_now,
        aisStation: "Cát Lái",
    }


    return {
        errCode: 0,
        dataHistory: {
            datas: datas
        },
        dataInfo: {
            dataInfo: dataInfo
        },
        name: decoded_message?.name,
        status: status,
        type_transport: type_transport,
        type_transport_detail: type_transport_detail,
    }
}
return {
    errCode: -1,
    input: decoded_message,
};
