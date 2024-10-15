if (transport_type_code[0] == 7) {
    return "cargo"
}
else if (transport_type_code[0] == 8) {
    return "oil"
} else if (transport_type_code[0] == 6) {
    return "passenger"

} else if (transport_type_code[0] == 4) {
    return "highspeed"
    // tàu cao tốc
} else if (transport_type_code == 30) {
    return "fish"
} else if (transport_type_code == 37) {
    return "travel"
    // } else if (transport_type_code[0] == 5 || transport_type_code == 34 || transport_type_code == 35) {
    //     return "special"
    //     // tàu đặc chủng
    // } else {
    //     return "different"
    // }
} else if (transport_type_code == 50) {
    return "pilot-vessel"
} else if (transport_type_code == 51) {
    return "search-and-rescue-vessels"
} else if (transport_type_code == 52) {
    return "tugs"
} else if (transport_type_code == 53) {
    return "port-tenders"
} else if (transport_type_code == 54) {
    return "vessels-with-anti-pollution-facilities-or-equipment"
} else if (transport_type_code == 55) {
    return "law-enforcement-vessels"
} else if (transport_type_code == 58) {
    return "medical-transports"
} else if (transport_type_code == 59) {
    return "ships-and-aircraft-of-States-not-parties-on-armed-conflict"
} else if (transport_type_code == 34) {
    return "engaged-in-diving-operations"

} else if (transport_type_code == 35) {
    return "engaged-in-military-operations"
} else {
    return "different"
}