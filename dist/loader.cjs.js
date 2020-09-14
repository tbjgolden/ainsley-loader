"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _ainsley = require("ainsley");

var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _cryptoHash = require("crypto-hash");

var _json = _interopRequireDefault(require("json5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _default(content) {
  var config = _loaderUtils["default"].getOptions(this);

  var callback = this.async();

  var inputAinsley = _json["default"].parse(content);

  var getConfig = config && config.flatten && config.flatten.getConfig || undefined;

  var wrappedGetConfig = getConfig && function (configString) {
    return getConfig(configString, _ainsley.defaultGetConfig);
  };

  Promise.all([(0, _ainsley.flatten)(inputAinsley, wrappedGetConfig), (0, _cryptoHash.sha256)(this.resourcePath)]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        flatAinsley = _ref2[0],
        uid = _ref2[1];

    var optsStr = "";

    if (config && config.generate) {
      optsStr = ", {";
      Object.entries(config.generate).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        optsStr += "".concat(JSON.stringify(k), ":").concat(v.toString(), ",");
      });
      optsStr += "}";
    }

    callback(null, "\n        import { generate, embed } from \"ainsley/dist/ainsley.client.esm.js\";\n        const css = generate(".concat(JSON.stringify((0, _ainsley.minify)(flatAinsley))).concat(optsStr, ");\n        embed(css, ").concat(JSON.stringify("uid".concat(uid)), ");\n        if (document.body.style.visibility === \"hidden\") {\n          document.body.style.visibility = \"\";\n        } else {\n          console.warn(\"Add 'visibility: hidden' to the body tag's styles to avoid Flash of Unstyled Content (FOUC).\");\n        }\n        "));
  });
}

;