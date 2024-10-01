if (transport_type_code[0] == 7) {
    return "Tàu chở hàng"
}
else if (transport_type_code[0] == 8) {
    return "Tàu chở dầu"
} else if (transport_type_code[0] == 6) {
    return "Tàu chở khách"

} else if (transport_type_code[0] == 4) {
    return "Tàu cao tốc"
    // tàu cao tốc
} else if (transport_type_code == 30) {
    return "Tàu cá"
} else if (transport_type_code == 37) {
    return "Tàu du lịch"
} else if (transport_type_code[0] == 5 || transport_type_code == 34 || transport_type_code == 35) {
    return "Tàu đặc chủng"
    // tàu đặc chủng 
} else {
    return "Không xác định"
}