const Ainsley = require('ainsley');
const loaderUtils = require('loader-utils');
const JSON5 = require('json5')

module.exports = function (text) {
  if (this.cacheable) this.cacheable();

  const callback = this.async();
  const config = loaderUtils.getOptions(this);
  
  const inputAinsley = JSON5.parse(text);

  const getConfig = (config && config.flatten && config.flatten.getConfig) || undefined;
  const wrappedGetConfig = getConfig && (configString => (
    getConfig(configString, Ainsley.defaultGetConfig)
  ));

  Ainsley.flatten(inputAinsley, wrappedGetConfig)
    .then(flatAinsley => {
      const minifiedAinsley = Ainsley.minify(flatAinsley);
      callback(
        null,
        `module.exports = ${JSON.stringify(minifiedAinsley)}`
      );
    });
};
