//   decoded_message = JSON.parse(decoded_message);
let messageType = decoded_message.messageType;
let nation = "";
let mmsi = decoded_message.mmsi;
mmsi = mmsi.toString();
let timestamp_now = Date.now()
nation = await me.AIS_MMSI_To_Nation({ mmsi: mmsi });
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
        navigation_status: Number(decoded_message?.navigationStatus), speed: Number(decoded_message?.speedOverGround),
    });

    let keys = [];
    keys.push("dataInfo");
    let ids = [];
    ids.push(device_id);
    let data_lastest = await Things().GetAttributesLatest({
        keys: keys,
        ids: ids,
        entityType: "DEVICE",
    });

    let dataInfo = {};
    let type_transport = "different"
    let type_transport_detail = "different"
    if (data_lastest.success == true) {
        dataInfo = data_lastest?.data?.entitiesList[0]?.attributesList[0]?.value
        type_transport = data_lastest?.data?.entitiesList[0]?.attributesList[0]?.value?.type_transport ?? "different"
        type_transport_detail = data_lastest?.data?.entitiesList[0]?.attributesList[0]?.value?.type_transport_detail ?? "different"

    }
    let datas = {
        ...dataInfo,
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
        nation: nation,
        startLocation: null,
        last_updated_ts: timestamp_now,
        departureTime: null,
        aisStation: "Cát Lái",
        // }
    };
    return {
        errCode: 0,
        data: { datas: datas },
        status: (messageType == 18) ? "undefined" : navigational_status,
        type_transport: type_transport,
        type_transport_detail: type_transport_detail
    };
} else if (messageType == 5) {
    // static data report
    // static data
    let eta = "";
    if (messageType == 5) {
        let year = new Date().getFullYear();
        eta = `${year}-${`0${decoded_message.etaMonth}`.slice(-2)}-${`0${decoded_message.etaDay}`.slice(-2)}T${`0${decoded_message.etaHour}`.slice(-2)}:${`0${decoded_message.etaMinute}`.slice(-2)}:00`;
        eta = Date.parse(eta);
    }

    let keys = [];
    keys.push("status");
    let ids = [];
    ids.push(device_id);
    let data_lastest = await Things().GetAttributesLatest({
        keys: keys,
        ids: ids,
        entityType: "DEVICE",
    });
    let status = "undefined"
    if (data_lastest.success == true) {
        status = data_lastest?.data?.entitiesList?.[0]?.attributesList?.[0]?.value ?? "undefined";
    }
    let dataInfo = {
        name: decoded_message.name,
        signalCall: decoded_message.callsign,
        type_transport: await me.AIS_Type_Transport({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }),
        type_transport_detail: await me.AIS_Type_Transport_Detail({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }),
        sizeShip: {
            length: decoded_message.dimBow + decoded_message.dimStern,
            width: decoded_message.dimPort + decoded_message.dimStarboard,
        },
        draftMark: decoded_message?.draught,
        desLocation: decoded_message?.destination,
        estimatedTime: eta,
    };
    return {
        errCode: 0,
        data: {
            dataInfo: dataInfo
        },
        type_transport: await me.AIS_Type_Transport({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }),
        type_transport_detail: await me.AIS_Type_Transport_Detail({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }),
        status: status,
    };
} else if (messageType == 24) {
    let partNum = decoded_message?.partNum;
    let keys = [];
    keys.push("dataInfo");
    let ids = [];
    ids.push(device_id);
    let data_lastest = await Things().GetAttributesLatest({
        keys: keys,
        ids: ids,
        entityType: "DEVICE",
    });
    let dataInfo_lastest = null;
    if (data_lastest.success == true) {
        dataInfo_lastest = data_lastest?.data?.entitiesList[0]?.attributesList[0]?.value
    }
    let dataInfo = {
        name: (partNum == 0) ? decoded_message.name : dataInfo_lastest?.name,
        signalCall: (partNum == 1) ? decoded_message.callsign : dataInfo_lastest?.signalCall,
        type_transport: (partNum == 1) ? await me.AIS_Type_Transport({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }) : dataInfo_lastest?.type_transport,
        type_transport_detail: (partNum == 1) ? await me.AIS_Type_Transport_Detail({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }) : dataInfo_lastest?.type_transport,
        sizeShip: {
            length: (partNum == 1) ? decoded_message.dimBow + decoded_message.dimStern : dataInfo_lastest?.sizeShip?.length,
            width: (partNum == 1) ? decoded_message.dimPort + decoded_message.dimStarboard : dataInfo_lastest?.sizeShip?.width,
        },
        draftMark: (partNum == 1) ? decoded_message.draught : dataInfo_lastest?.draftMark,
        desLocation: (partNum == 1) ? decoded_message.destination : dataInfo_lastest?.desLocation,
        estimatedTime: dataInfo_lastest?.estimatedTime,
    };
    return {
        errCode: 0,
        data: {
            dataInfo: dataInfo
        },
        type_transport: (partNum == 0) ? data_lastest?.type_transport : await me.AIS_Type_Transport({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }),
        type_transport_detail: (partNum == 0) ? data_lastest?.type_transport : await me.AIS_Type_Transport_Detail({
            transport_type_code: decoded_message.typeAndCargo.toString(),
        }),
        status: "undefined"
    }
} else if (messageType == 19) {
    let ids = [];
    ids.push(device_id);
    /**datas */
    let heading = decoded_message.heading;
    if (heading == 511) {
        heading = null;
    }
    let status_lastest = await Things().GetAttributesLatest({
        keys: ["status"],
        ids: ids,
        entityType: "DEVICE",
    });
    let status = "undefined"
    if (status_lastest.success == true) {
        status = status_lastest?.data?.entitiesList[0]?.attributesList[0]?.value ?? "undefined"
    }
    let keys = [];
    keys.push("dataInfo");

    let dataInfoLastest = await Things().GetAttributesLatest({
        keys: keys,
        ids: ids,
        entityType: "DEVICE",
    });
    let type_transport = await me.AIS_Type_Transport({
        transport_type_code: decoded_message.typeAndCargo.toString(),
    })
    let type_transport_detail = await me.AIS_Type_Transport_Detail({
        transport_type_code: decoded_message.typeAndCargo.toString(),

    })
    let dataInfo = null
    let content_get_lastest = null;
    if (dataInfoLastest.success == true) {
        content_get_lastest = dataInfoLastest?.data?.entitiesList[0]?.attributesList[0]?.value
        dataInfo = {
            name: decoded_message.name,
            signalCall: content_get_lastest?.signalCall,
            type_transport: type_transport,
            type_transport_detail: type_transport_detail,
            sizeShip: {
                length: decoded_message.dimBow + decoded_message.dimStern,
                width: decoded_message.dimPort + decoded_message.dimStarboard,
            },
            draftMark: content_get_lastest?.draftMark,
            desLocation: content_get_lastest?.desLocation,
            estimatedTime: content_get_lastest?.estimatedTime,
        }
    }
    let datas = {
        direction: heading,
        status: status,
        name: decoded_message?.name,
        type_transport: type_transport,
        type_transport_detail: type_transport_detail,
        latitude: decoded_message.lat == 91 ? null : decoded_message.lat.toFixed(6),
        longitude: decoded_message.lon == 181 ? null : decoded_message.lon.toFixed(6),
        sizeShip: {
            length: decoded_message.dimBow + decoded_message.dimStern,
            width: decoded_message.dimPort + decoded_message.dimStarboard,
        },
        speed:
            decoded_message.speedOverGround == 1023
                ? null
                : (decoded_message.speedOverGround / 10 * 1.852).toFixed(2),
        timestamp: timestamp_now,
        MSSI: mmsi,
        nation: nation,
        startLocation: null,
        last_updated_ts: timestamp_now,
        departureTime: null,
        aisStation: "Cát Lái",
        draftMark: content_get_lastest?.draftMark,

    }



    return {
        errCode: 0,
        data: {
            datasKey: { datas: datas },
            dataInfoKey: { dataInfo: dataInfo }
        },
        status: status,
        type_transport: type_transport,
        type_transport_detail: type_transport_detail,
    }
}
return {
    errCode: -1,
    input: decoded_message,
};
