import { execSync } from "child_process";
import { decode } from "iconv-lite";

enum Mode {
  get = "get",
  set = "set",
}

const run = (mode: Mode, formatId: number) => {
  const result = decode(
    execSync(`"${__dirname}\\..\\bin\\hsptmp.exe" ${mode} ${formatId}`),
    "Shift-JIS"
  )
    .toString()
    .trim();

  if (/^ERROR/.test(result)) {
    throw new Error(result);
  }

  return result;
};

export const getArray = (formatId: number) =>
  (run(Mode.get, formatId).match(/.{1,2}/g) as string[]).map((x) =>
    Number(`0x${x}`)
  );
export const getBufferText = (formatId: number) => run(Mode.get, formatId);
export const getBuffer = (formatId: number) => Buffer.from(getArray(formatId));
export const getText = (formatId: number) =>
  getArray(formatId)
    .map((x) => String.fromCharCode(x))
    .join("");
// encoding: https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
export const getDecodedText = (formatId: number, encoding: string) =>
  decode(Buffer.from(getArray(formatId)), encoding);

////////////////
// Deprecated //
////////////////

export const getPlainText = (formatId: number) => {
  console.warn(
    "Deprecation Warning: getPlainText has been renamed to getText, please use getText"
  );
  return getText(formatId);
};
