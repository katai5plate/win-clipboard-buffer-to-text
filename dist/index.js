"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlainText = exports.getText = exports.getBuffer = exports.getBufferText = exports.getArray = void 0;
const child_process_1 = require("child_process");
const iconv_lite_1 = require("iconv-lite");
var Mode;
(function (Mode) {
    Mode["get"] = "get";
    Mode["set"] = "set";
})(Mode || (Mode = {}));
const run = (mode, formatId) => {
    const result = iconv_lite_1.decode(child_process_1.execSync(`"${__dirname}\\..\\bin\\hsptmp.exe" ${mode} ${formatId}`), "Shift-JIS")
        .toString()
        .trim();
    if (/^ERROR/.test(result)) {
        throw new Error(result);
    }
    return result;
};
exports.getArray = (formatId) => run(Mode.get, formatId).match(/.{1,2}/g).map((x) => Number(`0x${x}`));
exports.getBufferText = (formatId) => run(Mode.get, formatId);
exports.getBuffer = (formatId) => Buffer.from(exports.getArray(formatId));
exports.getText = (formatId) => exports.getArray(formatId)
    .map((x) => String.fromCharCode(x))
    .join("");
////////////////
// Deprecated //
////////////////
exports.getPlainText = (formatId) => {
    console.warn("Deprecation Warning: getPlainText has been renamed to getText, please use getText");
    return exports.getText(formatId);
};
//# sourceMappingURL=index.js.map