const webpack = require("webpack");
const MemoryFS = require("memory-fs");
const path = require("path");

describe("ainsley-loader", function () {
  it("parses ainsley", function (done) {
    const compiler = webpack({
      entry: "./test/fixtures/before.ainsley",
      mode: "production",
      output: {
        path: path.resolve(__dirname),
        filename: "bundle.js"
      },
      module: {
        rules: [
          {
            test: /\.ainsley$/,
            loader: './index',
            exclude: /node_modules/,
            options: {
              flatten: {
                getConfig: (configString, defaultGetConfig) => {
                  if (configString === "reset") {
                    return { children: [ "*{all:unset}" ] };
                  } else {
                    return defaultGetConfig(configString);
                  }
                }
              }
            }
          }
        ]
      }
    },
      (err, stats) => {
        if (err) done(err);
        expect(err).toBe(null);
        expect(stats.hasErrors()).toBe(false);
        expect(stats.hasWarnings()).toBe(false);
        expect(eval(stats.toJson().modules[0].source)).toEqual(require("./fixtures/after.json"));
        done();
      });
    compiler.outputFileSystem = new MemoryFS();
  });
});