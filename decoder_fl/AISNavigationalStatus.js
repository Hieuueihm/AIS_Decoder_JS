switch (navigation_status) {
    case 0:
        return "Đang sử dụng động cơ"
    case 1:
        return "Tại mỏ neo"
    case 2:
        return "Không được lái"
    case 3:
        return "Khả năng cơ động bị hạn chế"
    case 4:
        return "Tàu thuyền bị hạn chế bởi mớn nước"
    case 5:
        return "Neo đậu"
    case 6:
        return "Mắc cạn"
    case 7:
        return "Tham gia câu cá"
    case 8:
        return "Đang di chuyển"
    default:
        return "Không xác định"
}