class AISFormatter {

    constructor() {

    }
    longitude(lon) {
        return (lon /= 600000) == 181 ? null : lon;
    }
    latitude(lat) {
        return (lat /= 600000) == 91 ? null : lat;
    }
    courseOverGround(cog) {
        return cog == 3600 ? null : cog;
    }
    heading(heading) {
        if (heading === 511) {
            return null;
        }
        return heading;
    }
    rateOfTurn(rot) {
        rot = Math.sqrt(rot / 4.733)
        return rot == -128 ? null : rot;
    }
    speedOverGround(sog) {
        return sog == 1023 ? null : sog;
    }
    inlandLengthOrBeam(lengthOrBeam) {
        return Math.round(lengthOrBeam * 0.1 * 100) / 100;
    }
    draught(dr) {
        return dr / 10;
    }
    airDraught(ad) {
        return ad / 100;
    }
    year(y) {
        return y == 0 ? null : y;
    }
    month(m) {
        return (m == 0 || m > 12) ? null : m;
    }
    day(d) {
        return (d == 0 || d > 31) ? null : d;
    }
    hour(h) {
        return (h >= 24) ? null : h;
    }
    minute(m) {
        return (m >= 60) ? null : m;
    }
    second(s) {
        return (s >= 60) ? null : s;
    }


}

export { AISFormatter }