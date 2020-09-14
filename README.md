# Webpack ainsley loader

[![NPM](https://img.shields.io/npm/v/ainsley-loader.svg)](https://npmjs.com/package/ainsley-loader)
[![NPM](https://img.shields.io/npm/dw/ainsley-loader.svg?maxAge=2592000)](https://npmjs.com/package/ainsley-loader)


## Purpose

This ainsley webpack loader allows you to input ainsley input as JSON5, and does all the necessary optimizations
to get from input to optimized input for the build-step, and optimized input to the generated CSS for the
runtime-step in the browser.

You may want to set the default syntax for `.ainsley` files to JSON5 in your editor to make development easier.

## Installation

```
npm install --save-dev ainsley-loader
# yarn add --dev ainsley-loader
```

## Usage

Add the ainsley-loader to your webpack configuration.

```javascript
const config = {
  module: {
    rules: [
      {
        test: /\.ainsley$/,
        loader: 'ainsley-loader'
        options: {
          // optional custom flatten() getConfig
          // https://tbjgolden.github.io/ainsley/docs/api/index#const-flatten
          flatten: {
            getConfig: (configString, defaultGetConfig) => {
              if (configString === "reset") {
                return { children: [ "*{all:unset}" ] };
              } else {
                return defaultGetConfig(configString);
              }
            }
          },
          // optional custom generate() arguments
          // https://tbjgolden.github.io/ainsley/docs/api/interfaces/ainsleygenerateoptions#properties
          generate: {
            addValueToSelector: (selector, valueAbbreviation) => `${selector}-${valueAbbreviation}`,
            addPropertyToSelector: (selector, propertyAbbreviation) => `${selector}-${propertyAbbreviation}`,
            addVariationToSelector: (selector, variationAbbreviation) => `${variationAbbreviation}_${selector}`
          }
        }
      }
    ]
  }
};
```

Then import and use as:

```jsx
import "./example.ainsley";
```

## Common issues

Sometimes, you might get an error like this:

```
error - .../create-next-app/node_modules/ainsley/dist/ainsley.client.esm.js:227
export { DEFAULT_OPTIONS, ITERATOR_REGEX, embed, generate };
^^^^^^

SyntaxError: Unexpected token 'export'
```

This is because the tool you are using is likely trying to do some stuff with node
- either static generation or server side.

In Next.js, you cannot do this:

`pages/_app.js`

```jsx
import { useEffect } from "react";
import "../styles/globals.ainsley";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

To solve this, instead dynamically import it in your script.

`pages/_app.js`

```jsx
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('../styles/globals.ainsley');
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
```
