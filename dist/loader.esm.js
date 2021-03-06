import { defaultGetConfig, flatten, minify } from 'ainsley';
import loaderUtils from 'loader-utils';
import { sha256 } from 'crypto-hash';
import JSON5 from 'json5';


export default function(content) {
  const config = loaderUtils.getOptions(this);

  const callback = this.async();

  const inputAinsley = JSON5.parse(content);

  const getConfig = (config && config.flatten && config.flatten.getConfig) || undefined;
  const wrappedGetConfig = getConfig && (configString => (
    getConfig(configString, defaultGetConfig)
  ));

  Promise.all([
    flatten(inputAinsley, wrappedGetConfig),
    sha256(this.resourcePath)
  ])
    .then(([flatAinsley, uid]) => {
      let optsStr = "";
      if (config && config.generate) {
        optsStr = ", {";
        Object.entries(config.generate)
          .forEach(([k, v]) => {
            optsStr += `${JSON.stringify(k)}:${v.toString()},`;
          })
        optsStr += "}";
      }

      callback(
        null,
        `
        import { generate, embed } from "ainsley/dist/ainsley.client.esm.js";
        const css = generate(${JSON.stringify(minify(flatAinsley))}${optsStr});
        embed(css, ${JSON.stringify(`uid${uid}`)});
        if (document.body.style.visibility === "hidden") {
          document.body.style.visibility = "";
        } else {
          console.warn("Add 'visibility: hidden' to the body tag's styles to avoid Flash of Unstyled Content (FOUC).");
        }
        `
      );
    });
};
