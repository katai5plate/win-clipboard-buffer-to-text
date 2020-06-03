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

export const getText = (formatId: number) => run(Mode.get, formatId);
export const getBuffer = (formatId: number) =>
  Buffer.from(
    (run(Mode.get, formatId).match(/.{1,2}/g) as string[]).map((x) =>
      Number(`0x${x}`)
    )
  );
