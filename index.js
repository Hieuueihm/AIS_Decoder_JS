import AISDecoder from "./decoder/index.js";

const msg = ["!AIVDM,2,1,0,B,58SJ;b02<IE1QH=R2211A>0P4V10PtpN33:2221@9hF3<6LeN?j3k`1hB@00,0*4E",
    "!AIVDM,2,2,0,B,00000000000,2*27",
]
const decoder = new AISDecoder();
for (let i = 0; i < msg.length; i++) {
    decoder.decode(msg[i])

}

