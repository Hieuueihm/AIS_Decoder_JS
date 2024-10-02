
if (navigation_status == 15 && speed < 4.34) {
    //undefined + speed < 
    return "stop"
}

switch (navigation_status) {
    case 1:
        return "park"
    case 5:
        return "moored"
    case 6:
        return "aground"
    case 7:
        return "engagedInFishing"
    case 8:
        return "run"
    case 15:
        return "undefined"
    default:
        return "others"
}