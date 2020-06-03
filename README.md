# windows-clipboard-buffer

This can convert the buffer copied to the clipboard by Windows into text and output it.

## usage

**copied**:

```html
<h1>Hello, World!</h1>
```

**code**:

```js
const { getBuffer } = require("windows-clipboard-buffer");

const formatId = 49381; // HTML Format

const result = getBuffer(49381);

console.log(result);
```

**result**:

```xml
<Buffer 56 65 72 73 69 6f 6e 3a 30 2e 39 0d 0a 53 74 61 72 74 48 54 4d 4c 3a 30 30 30 30 30 30 30 31 37 33 0d
0a 45 6e 64 48 54 4d 4c 3a 30 30 30 30 30 30 30 ... 589 more bytes>
```
