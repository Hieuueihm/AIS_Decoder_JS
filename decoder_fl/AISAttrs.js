//   decoded_message = JSON.parse(decoded_message);
let messageType = decoded_message.messageType;
if (
    messageType == 1 ||
    messageType == 2 ||
    messageType == 3 ||
    messageType == 18
) {
    // position report
    // heading
    let heading = decoded_message.heading;
    if (heading == 511) {
        heading = null;
    }
    /*navigational status*/
    let navigational_status = await me.AIS_Navigational_Status({
        navigation_status: Number(decoded_message.navigationStatus),
    });
    let nation = "";
    let mmsi = decoded_message.mmsi;
    mmsi = mmsi.toString();
    nation = await me.AIS_MMSI_To_Nation({ mmsi: mmsi });
    let keys = [];
    keys.push("dataInfo");
    let ids = [];
    ids.push(device_id);
    let dataInfo = await Things().GetAttributesLatest({
        keys: keys,
        ids: ids,
        entityType: "DEVICE",
    });

    let datas1 = {};
    if (dataInfo.success == true) {
        datas1 = {
            ...dataInfo?.data?.entitiesList[0]?.attributesList[0]?.value,
        };
    }
    let datas = {
        ...datas1,
        direction: heading,
        latitude: decoded_message.lat == 91 ? null : decoded_message.lat,
        longitude: decoded_message.lon == 181 ? null : decoded_message.lon,
        speed:
            decoded_message.speedOverGround == 1023
                ? null
                : decoded_message.speedOverGround,
        timestamp: decoded_message.utcSecond,
        MMSI: mmsi,
        nation: nation,
        startLocation: null,
        last_update_ts: decoded_message.utcSecond,
        depatureTime: null,
        aisStation: "Cát Lái",
        // }
    };
    return {
        errCode: 0,
        data: { datas: datas },
        status: navigational_status,
    };
} else if (messageType == 5 || messageType == 24) {
    // static data report
    // static data
    let eta = "";
    if (messageType == 5) {
        let year = new Date().getFullYear();
        eta = `${year}-${`0${decoded_message.etaMonth}`.slice(-2)}-${`0${decoded_message.etaDay}`.slice(-2)}T${`0${decoded_message.etaHour}`.slice(-2)}:${`0${decoded_message.etaMinute}`.slice(-2)}:00`;
        eta = Date.parse(eta);
    }

    let dataInfo = {
        name: decoded_message.name,
        signalCall: decoded_message.signalCall,
        sizeShip: {
            length: decoded_message.dimBow + decoded_message.dimStern,
            width: decoded_message.dimPort + decoded_message.dimStarboard,
        },
        draftMark: messageType == 5 ? decoded_message.draught : "",
        desLocation: messageType == 5 ? decoded_message.destination : "",
        estimatedTime: eta,
    };
    return {
        errCode: 0,
        data: { dataInfo: dataInfo },
        type_transport: await me.AIS_Type_Transport({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }),
    };
} else if (messageType == 19) {
    /**datas */
    let nation = "";
    let mmsi = decoded_message.mmsi;
    mmsi = mmsi.toString();
    nation = await me.AIS_MMSI_To_Nation({ mmsi: mmsi });
    let heading = decoded_message.heading;
    if (heading == 511) {
        heading = null;
    }
    let datas = {
        direction: heading,
        latitude: decoded_message.lat == 91 ? null : decoded_message.lat,
        longitude: decoded_message.lon == 181 ? null : decoded_message.lon,
        speed:
            decoded_message.speedOverGround == 1023
                ? null
                : decoded_message.speedOverGround,
        timestamp: decoded_message.utcSecond,
        MMSI: mmsi,
        nation: nation,
        startLocation: null,
        last_update_ts: decoded_message.utcSecond,
        depatureTime: null,
        aisStation: "Cát Lái",

    }

    let keys = [];
    keys.push("dataInfo");
    let ids = [];
    ids.push(device_id);
    let dataInfoLastest = await Things().GetAttributesLatest({
        keys: keys,
        ids: ids,
        entityType: "DEVICE",
    });
    let dataInfo = null
    if (dataInfoLastest.success == true) {
        let content_get_lastest = dataInfoLastest?.data?.entitiesList[0]?.attributesList[0]?.value

        dataInfo = {
            name: decoded_message.name,
            signalCall: content_get_lastest?.signalCall,
            sizeShip: {
                length: decoded_message.dimBow + decoded_message.dimStern,
                width: decoded_message.dimPort + decoded_message.dimStarboard,
            },
            draftMark: content_get_lastest?.draftMark,
            desLocation: content_get_lastest?.desLocation,
            estimatedTime: content_get_lastest?.estimatedTime,

        }
    }

    return {
        errCode: 0,
        data: {
            datasKey: { datas: datas },
            dataInfoKey: { dataInfo: dataInfo }
        },
        type_transport: await me.AIS_Type_Transport({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }),
    }
}
return {
    errCode: -1,
    input: decoded_message,
};
