import { execSync } from "child_process";
import { decode } from "iconv-lite";
import { writeFileSync } from "fs";

enum Mode {
  get = "get",
  set = "set",
  setFile = "setfile",
}

const run = (mode: Mode, formatId: number, text?: string) => {
  const result = decode(
    execSync(
      mode === Mode.get
        ? `"${__dirname}\\..\\bin\\hsptmp.exe" ${mode} ${formatId}`
        : `"${__dirname}\\..\\bin\\hsptmp.exe" ${mode} ${formatId} ${text}`
    ),
    "Shift-JIS"
  )
    .toString()
    .trim();

  if (/^ERROR/.test(result)) {
    throw new Error(result);
  }

  return result;
};

export const setBuffer = (formatId: number, buffer: Buffer) => {
  writeFileSync(`${__dirname}\\..\\bin\\out.ignore.temp`, buffer);
  run(Mode.setFile, formatId, `${__dirname}\\..\\bin\\out.ignore.temp`);
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
