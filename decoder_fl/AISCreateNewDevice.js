let newdv = { name: device_name, key: device_key };
console.log('----------CreateDevice: ------');
console.log(newdv)
let createDevice = await Device().CreateDevice(newdv);
// let data = createDevice.data;
return createDevice;