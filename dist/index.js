"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecodedText = exports.getText = exports.getBuffer = exports.getBufferText = exports.getArray = exports.setBuffer = void 0;
const child_process_1 = require("child_process");
const iconv_lite_1 = require("iconv-lite");
const fs_1 = require("fs");
var Mode;
(function (Mode) {
    Mode["get"] = "get";
    Mode["set"] = "set";
    Mode["setFile"] = "setfile";
})(Mode || (Mode = {}));
const run = (mode, formatId, text) => {
    const result = iconv_lite_1.decode(child_process_1.execSync(mode === Mode.get
        ? `"${__dirname}\\..\\bin\\hsptmp.exe" ${mode} ${formatId}`
        : `"${__dirname}\\..\\bin\\hsptmp.exe" ${mode} ${formatId} ${text}`), "Shift-JIS")
        .toString()
        .trim();
    if (/^ERROR/.test(result)) {
        throw new Error(result);
    }
    return result;
};
exports.setBuffer = (formatId, buffer) => {
    fs_1.writeFileSync(`${__dirname}\\..\\bin\\out.ignore.temp`, buffer);
    run(Mode.setFile, formatId, `${__dirname}\\..\\bin\\out.ignore.temp`);
};
exports.getArray = (formatId) => run(Mode.get, formatId).match(/.{1,2}/g).map((x) => Number(`0x${x}`));
exports.getBufferText = (formatId) => run(Mode.get, formatId);
exports.getBuffer = (formatId) => Buffer.from(exports.getArray(formatId));
exports.getText = (formatId) => exports.getArray(formatId)
    .map((x) => String.fromCharCode(x))
    .join("");
// encoding: https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
exports.getDecodedText = (formatId, encoding) => iconv_lite_1.decode(Buffer.from(exports.getArray(formatId)), encoding);
//# sourceMappingURL=index.js.map