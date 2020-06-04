# windows-clipboard-buffer

<a href="https://www.npmjs.com/package/windows-clipboard-buffer"><img alt="npm" src="https://img.shields.io/npm/v/windows-clipboard-buffer"></a>

This can convert the buffer copied to the clipboard by Windows into text and output it.

## usage 1

**copied**:

```html
<h1>Hello, World!</h1>
```

**code**:

```js
const {
  getBuffer,
  getText,
  getDecodedText,
} = require("windows-clipboard-buffer");

const formatId = 49381; // HTML Format

console.log(getBuffer(formatId));

console.log(getText(formatId));

// console.log(getDecodedText(formatId, "Shift_JIS"));
// ref: https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
```

**result**:

```xml
<Buffer 56 65 72 73 69 6f 6e 3a 30 2e 39 0d 0a 53 74 61 72 74 48 54 4d 4c 3a 30 30 30 30 30 30 30 31 37 33 0d
0a 45 6e 64 48 54 4d 4c 3a 30 30 30 30 30 30 30 ... 589 more bytes>
```

```xml
Version:0.9
StartHTML:0000000173
EndHTML:0000000638
StartFragment:0000000209
EndFragment:0000000602
SourceURL:
<html>
<body>
<!--StartFragment--><h1 style="color: rgb(0, 0, 0); font-family: Meiryo; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;">Hello, World!</h1><!--EndFragment-->
</body>
</html>
```

## usage 2

**file**:

```xml
Version:0.9
StartHTML:0000000173
EndHTML:0000000638
StartFragment:0000000209
EndFragment:0000000602
SourceURL:
<html>
<body>
<!--StartFragment--><h1 style="color: rgb(0, 0, 0); font-family: Meiryo; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-style: initial; text-decoration-color: initial;">Hello, World!</h1><!--EndFragment-->
</body>
</html>
```

**code**:

```js
const { setBuffer } = require("windows-clipboard-buffer");

setBuffer(
  49381, // HTML Format
  Buffer.from(require("fs").readFileSync("file"))
);
```

**paste** to `data:text/html, <html contenteditable>`:

```html
<h1>Hello, World!</h1>
```
