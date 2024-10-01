let intVal = await me.getInt({
    binaryPayload: binaryPayload,
    startIndex: startIndex,
    length: length,
});
if ((intVal & (1 << (length - 1))) != 0) {
    intVal -= 1 << length;
}

return intVal;
