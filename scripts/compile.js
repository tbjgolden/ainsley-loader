const babelCore = require("@babel/core");
const path = require("path");
const fs = require("fs");

const input = path.join(__dirname, '../src/loader.js');
const outputDir = path.join(__dirname, '../dist');

const output = babelCore.transformFileSync(input, {
  presets: ["@babel/preset-env"],
});

fs.writeFileSync(
  path.join(outputDir, 'loader.cjs.js'),
  output.code
);

fs.writeFileSync(
  path.join(outputDir, 'loader.esm.js'),
  fs.readFileSync(input)
);
