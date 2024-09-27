import AISDecoder from "./decoder/index.js";

const msg = "!AIVDM,1,1,,A,18SK5`jP007b1:0<0OJk3wwD0<2i,0*74"
const decoder = new AISDecoder();
decoder.decode(msg)

