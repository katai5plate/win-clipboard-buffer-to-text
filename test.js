const lib = require(".");

const formatId = process.argv[2];

const result = {
  formatId,
  getArray: lib.getArray(formatId).join(", "),
  getBuffer: [...lib.getBuffer(formatId)].join(", "),
  ...["getBufferText", "getText"].reduce(
    (p, name) => ({ ...p, ...{ [name]: lib[name](formatId) } }),
    {}
  ),
  getDecodedText: [
    "utf8",
    "utf16le", // ucs2
    "ascii",
    "binary",
    "base64",
    "hex",
    "UTF-16BE",
    "UTF-16", // (with BOM)
    "Shift_JIS", // CP932
    "Windows-31j",
    "Windows932",
    "EUC-JP",
  ].reduce(
    (p, code) => ({
      ...p,
      ...{ [code]: lib.getDecodedText(formatId, code) },
    }),
    {}
  ),
};

console.log(result);

require("fs").writeFileSync(
  `${formatId}.ignore.json`,
  JSON.stringify(result, null, 2)
);
