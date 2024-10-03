let jsonString = JSON.stringify(attrs.datas);

let res = await Thing(device_id).UpsertAttributes({ datas: jsonString }, { notSendWs: false, logged: true, ts: ts, entityType: "DEVICE" });


return res;