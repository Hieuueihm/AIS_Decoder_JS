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
} else if (transport_type_code[0] == 5 || transport_type_code == 34 || transport_type_code == 35) {
    return "special"
    // tàu đặc chủng 
} else {
    return "different"
}