const { getBuffer, getText } = require(".");

[getBuffer, getText].forEach((fn) => console.log(fn(49381)));
