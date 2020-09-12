import path from 'path';
import webpack from 'webpack';

export default () => {
  const compiler = webpack({
    mode: "production",
    context: __dirname,
    entry: `./before.js`,
    output: {
      path: path.join(__dirname, 'output'),
      filename: 'after.js',
    },
    module: {
      rules: [
        {
          test: /\.ainsley$/,
          loader: path.resolve(__dirname, '../src/loader.js'),
          options: {
            flatten: {
              getConfig: (configString, defaultGetConfig) => {
                if (configString === "reset") {
                  return { children: [ "*{all:unset}" ] };
                } else {
                  return defaultGetConfig(configString);
                }
              }
            },
            generate: {
              abbreviateProperty: (propertyName) => [
                hasUpperCaseRegex.test(propertyName)
                  ? propertyName.replace(removeNonUpperCaseRegex, "")
                  : propertyName
                    .split("-")
                    .map((word) => word.charAt(0))
                    .join("")
                    .toLowerCase(),
                propertyName.toLowerCase(),
              ],
            }
          }
        }
      ]
    },
    optimization: {
      usedExports: true,
    }
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

      resolve(stats);
    });
  });
};
