const { getBuffer, getText } = require(".");

[getBuffer, getText].forEach((fn) => console.log(fn(process.argv[2])));
