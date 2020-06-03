"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuffer = exports.getText = void 0;
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
exports.getText = (formatId) => run(Mode.get, formatId);
exports.getBuffer = (formatId) => Buffer.from(run(Mode.get, formatId).match(/.{1,2}/g).map((x) => Number(`0x${x}`)));
//# sourceMappingURL=index.js.map