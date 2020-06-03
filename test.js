const lib = require(".");

console.log(
  ["getArray", "getBufferText", "getBuffer", "getText"].reduce(
    (p, name) => ({ ...p, ...{ [name]: lib[name](process.argv[2]) } }),
    {}
  )
);
