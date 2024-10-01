let deviceInfo = await Device().IdentifyInfoByKeyWithAd({
    key: device_key,
    projectId: project_id,
});
return deviceInfo
console.log("Check device key: ");
console.log(device_key);
console.log("Check project ID: ");
console.log(project_id);
if (deviceInfo.success === true) {
    deviceInfo.data.additionalinfo = JSON.parse(
        Buffer.from(deviceInfo.data.additionalinfo, "base64").toString("utf-8"),
    );
    deviceInfo.data.metadata = JSON.parse(
        Buffer.from(deviceInfo.data.metadata, "base64").toString("utf-8"),
    );
}
console.log("Check device infor AIS: ");
console.log(deviceInfo)

return deviceInfo;
