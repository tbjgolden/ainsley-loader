# Webpack ainsley loader

[![NPM](https://img.shields.io/npm/v/ainsley-loader.svg)](https://npmjs.com/package/ainsley-loader)
[![NPM](https://img.shields.io/npm/dw/ainsley-loader.svg?maxAge=2592000)](https://npmjs.com/package/ainsley-loader)


## Purpose

This ainsley webpack loader imports your ainsley input object (as JSON5),
fetching any dependencies, compressing any CSS inside, and minifying the result.

You may want to set the default syntax for `.ainsley` files to JSON5 in your
editor to make development easier.

## Installation

```
npm install --save-dev ainsley-loader
# yarn add --dev ainsley-loader
```

## Usage

Add the ainsley-loader to your webpack configuration:

```javascript
const config = {
  module: {
    rules: [
      {
        test: /\.ainsley$/,
        loader: 'ainsley-loader'
        // options: {
        //   flatten: {
        //     getConfig: (configString, defaultGetConfig) => {
        //       if (configString === "reset") {
        //         return { children: [ "*{all:unset}" ] };
        //       } else {
        //         return defaultGetConfig(configString);
        //       }
        //     }
        //   }
        // }
      }
    ]
  }
};
```

Then import and use as:

```jsx
import { generate, embed } from "ainsley";
import ainsley from "./example.ainsley";

embed(generate(ainsley/* , options */));
document.body.style.display = "block";
```
