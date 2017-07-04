/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(41)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(23);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,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BCZhILAEJWBkI7ADJWBkUFghGyMhWSMgILAEJiNGYThZLbAwLLAAFiAgILAFJiAuRyNHI2EjPDgtsDEssAAWILAJI0IgICBGI0ewACsjYTgtsDIssAAWsAMlsAIlRyNHI2GwAFRYLiA8IyEbsAIlsAIlRyNHI2EgsAUlsAQlRyNHI2GwBiWwBSVJsAIlYbABRWMjIFhiGyFZY7ABRWJgIy4jICA8ijgjIVktsDMssAAWILAJQyAuRyNHI2EgYLAgYGawgGIjICA8ijgtsDQsIyAuRrACJUZSWCA8WS6xJAEUKy2wNSwjIC5GsAIlRlBYIDxZLrEkARQrLbA2LCMgLkawAiVGUlggPFkjIC5GsAIlRlBYIDxZLrEkARQrLbA3LLAuKyMgLkawAiVGUlggPFkusSQBFCstsDgssC8riiAgPLAEI0KKOCMgLkawAiVGUlggPFkusSQBFCuwBEMusCQrLbA5LLAAFrAEJbAEJiAuRyNHI2GwBkUrIyA8IC4jOLEkARQrLbA6LLEJBCVCsAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgR7AEQ7CAYmAgsAArIIqKYSCwAkNgZCOwA0NhZFBYsAJDYRuwA0NgWbADJbCAYmGwAiVGYTgjIDwjOBshICBGI0ewACsjYTghWbEkARQrLbA7LLAuKy6xJAEUKy2wPCywLyshIyAgPLAEI0IjOLEkARQrsARDLrAkKy2wPSywABUgR7AAI0KyAAEBFRQTLrAqKi2wPiywABUgR7AAI0KyAAEBFRQTLrAqKi2wPyyxAAEUE7ArKi2wQCywLSotsEEssAAWRSMgLiBGiiNhOLEkARQrLbBCLLAJI0KwQSstsEMssgAAOistsEQssgABOistsEUssgEAOistsEYssgEBOistsEcssgAAOystsEgssgABOystsEkssgEAOystsEossgEBOystsEsssgAANystsEwssgABNystsE0ssgEANystsE4ssgEBNystsE8ssgAAOSstsFAssgABOSstsFEssgEAOSstsFIssgEBOSstsFMssgAAPCstsFQssgABPCstsFUssgEAPCstsFYssgEBPCstsFcssgAAOCstsFgssgABOCstsFkssgEAOCstsFossgEBOCstsFsssDArLrEkARQrLbBcLLAwK7A0Ky2wXSywMCuwNSstsF4ssAAWsDArsDYrLbBfLLAxKy6xJAEUKy2wYCywMSuwNCstsGEssDErsDUrLbBiLLAxK7A2Ky2wYyywMisusSQBFCstsGQssDIrsDQrLbBlLLAyK7A1Ky2wZiywMiuwNistsGcssDMrLrEkARQrLbBoLLAzK7A0Ky2waSywMyuwNSstsGossDMrsDYrLbBrLCuwCGWwAyRQeLABFTAtAABLuADIUlixAQGOWbkIAAgAYyCwASNEILADI3CwDkUgIEu4AA5RS7AGU1pYsDQbsChZYGYgilVYsAIlYbABRWMjYrACI0SzCgkFBCuzCgsFBCuzDg8FBCtZsgQoCUVSRLMKDQYEK7EGAUSxJAGIUViwQIhYsQYDRLEmAYhRWLgEAIhYsQYBRFlZWVm4Af+FsASNsQUARAAAAA=="

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(42);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(29);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue2.default({
    el: "#app",
    render: function render(h) {
        return h(_App2.default);
    }
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
(function (window, document, Math) {
var rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
	function (callback) { window.setTimeout(callback, 1000 / 60); };

var utils = (function () {
	var me = {};

	var _elementStyle = document.createElement('div').style;
	var _vendor = (function () {
		var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			transform,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			transform = vendors[i] + 'ransform';
			if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
		}

		return false;
	})();

	function _prefixStyle (style) {
		if ( _vendor === false ) return false;
		if ( _vendor === '' ) return style;
		return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}

	me.getTime = Date.now || function getTime () { return new Date().getTime(); };

	me.extend = function (target, obj) {
		for ( var i in obj ) {
			target[i] = obj[i];
		}
	};

	me.addEvent = function (el, type, fn, capture) {
		el.addEventListener(type, fn, !!capture);
	};

	me.removeEvent = function (el, type, fn, capture) {
		el.removeEventListener(type, fn, !!capture);
	};

	me.prefixPointerEvent = function (pointerEvent) {
		return window.MSPointerEvent ?
			'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8):
			pointerEvent;
	};

	me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
		var distance = current - start,
			speed = Math.abs(distance) / time,
			destination,
			duration;

		deceleration = deceleration === undefined ? 0.0006 : deceleration;

		destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
		duration = speed / deceleration;

		if ( destination < lowerMargin ) {
			destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
			distance = Math.abs(destination - current);
			duration = distance / speed;
		} else if ( destination > 0 ) {
			destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
			distance = Math.abs(current) + destination;
			duration = distance / speed;
		}

		return {
			destination: Math.round(destination),
			duration: duration
		};
	};

	var _transform = _prefixStyle('transform');

	me.extend(me, {
		hasTransform: _transform !== false,
		hasPerspective: _prefixStyle('perspective') in _elementStyle,
		hasTouch: 'ontouchstart' in window,
		hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
		hasTransition: _prefixStyle('transition') in _elementStyle
	});

	/*
	This should find all Android browsers lower than build 535.19 (both stock browser and webview)
	- galaxy S2 is ok
    - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
    - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
   - galaxy S3 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
   - galaxy S4 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
   - galaxy S5 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
   - galaxy S6 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
  */
	me.isBadAndroid = (function() {
		var appVersion = window.navigator.appVersion;
		// Android browser is not a chrome browser.
		if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
			var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
			if(safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
				return parseFloat(safariVersion[1]) < 535.19;
			} else {
				return true;
			}
		} else {
			return false;
		}
	})();

	me.extend(me.style = {}, {
		transform: _transform,
		transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
		transitionDuration: _prefixStyle('transitionDuration'),
		transitionDelay: _prefixStyle('transitionDelay'),
		transformOrigin: _prefixStyle('transformOrigin')
	});

	me.hasClass = function (e, c) {
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
		return re.test(e.className);
	};

	me.addClass = function (e, c) {
		if ( me.hasClass(e, c) ) {
			return;
		}

		var newclass = e.className.split(' ');
		newclass.push(c);
		e.className = newclass.join(' ');
	};

	me.removeClass = function (e, c) {
		if ( !me.hasClass(e, c) ) {
			return;
		}

		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
		e.className = e.className.replace(re, ' ');
	};

	me.offset = function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;

		// jshint -W084
		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}
		// jshint +W084

		return {
			left: left,
			top: top
		};
	};

	me.preventDefaultException = function (el, exceptions) {
		for ( var i in exceptions ) {
			if ( exceptions[i].test(el[i]) ) {
				return true;
			}
		}

		return false;
	};

	me.extend(me.eventType = {}, {
		touchstart: 1,
		touchmove: 1,
		touchend: 1,

		mousedown: 2,
		mousemove: 2,
		mouseup: 2,

		pointerdown: 3,
		pointermove: 3,
		pointerup: 3,

		MSPointerDown: 3,
		MSPointerMove: 3,
		MSPointerUp: 3
	});

	me.extend(me.ease = {}, {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function (k) {
				return k * ( 2 - k );
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
			fn: function (k) {
				return Math.sqrt( 1 - ( --k * k ) );
			}
		},
		back: {
			style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			fn: function (k) {
				var b = 4;
				return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
			}
		},
		bounce: {
			style: '',
			fn: function (k) {
				if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
					return 7.5625 * k * k;
				} else if ( k < ( 2 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
				} else if ( k < ( 2.5 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
				} else {
					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
				}
			}
		},
		elastic: {
			style: '',
			fn: function (k) {
				var f = 0.22,
					e = 0.4;

				if ( k === 0 ) { return 0; }
				if ( k == 1 ) { return 1; }

				return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
			}
		}
	});

	me.tap = function (e, eventName) {
		var ev = document.createEvent('Event');
		ev.initEvent(eventName, true, true);
		ev.pageX = e.pageX;
		ev.pageY = e.pageY;
		e.target.dispatchEvent(ev);
	};

	me.click = function (e) {
		var target = e.target,
			ev;

		if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
			// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
			// initMouseEvent is deprecated.
			ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
			ev.initEvent('click', true, true);
			ev.view = e.view || window;
			ev.detail = 1;
			ev.screenX = target.screenX || 0;
			ev.screenY = target.screenY || 0;
			ev.clientX = target.clientX || 0;
			ev.clientY = target.clientY || 0;
			ev.ctrlKey = !!e.ctrlKey;
			ev.altKey = !!e.altKey;
			ev.shiftKey = !!e.shiftKey;
			ev.metaKey = !!e.metaKey;
			ev.button = 0;
			ev.relatedTarget = null;
			ev._constructed = true;
			target.dispatchEvent(ev);
		}
	};

	return me;
})();
function IScroll (el, options) {
	this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.scrollerStyle = this.scroller.style;		// cache style for better performance

	this.options = {

		resizeScrollbars: true,

		mouseWheelSpeed: 20,

		snapThreshold: 0.334,

// INSERT POINT: OPTIONS
		disablePointer : !utils.hasPointer,
		disableTouch : utils.hasPointer || !utils.hasTouch,
		disableMouse : utils.hasPointer || utils.hasTouch,
		startX: 0,
		startY: 0,
		scrollY: true,
		directionLockThreshold: 5,
		momentum: true,

		bounce: true,
		bounceTime: 600,
		bounceEasing: '',

		preventDefault: true,
		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

		HWCompositing: true,
		useTransition: true,
		useTransform: true,
		bindToWrapper: typeof window.onmousedown === "undefined"
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	// Normalize options
	this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	this.options.useTransition = utils.hasTransition && this.options.useTransition;
	this.options.useTransform = utils.hasTransform && this.options.useTransform;

	this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	// If you want eventPassthrough I have to lock one of the axes
	this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

	// With eventPassthrough we also need lockDirection mechanism
	this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	if ( this.options.tap === true ) {
		this.options.tap = 'tap';
	}

	// https://github.com/cubiq/iscroll/issues/1029
	if (!this.options.useTransition && !this.options.useTransform) {
		if(!(/relative|absolute/i).test(this.scrollerStyle.position)) {
			this.scrollerStyle.position = "relative";
		}
	}

	if ( this.options.shrinkScrollbars == 'scale' ) {
		this.options.useTransition = false;
	}

	this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

	if ( this.options.probeType == 3 ) {
		this.options.useTransition = false;	}

// INSERT POINT: NORMALIZATION

	// Some defaults
	this.x = 0;
	this.y = 0;
	this.directionX = 0;
	this.directionY = 0;
	this._events = {};

// INSERT POINT: DEFAULTS

	this._init();
	this.refresh();

	this.scrollTo(this.options.startX, this.options.startY);
	this.enable();
}

IScroll.prototype = {
	version: '5.2.0',

	_init: function () {
		this._initEvents();

		if ( this.options.scrollbars || this.options.indicators ) {
			this._initIndicators();
		}

		if ( this.options.mouseWheel ) {
			this._initWheel();
		}

		if ( this.options.snap ) {
			this._initSnap();
		}

		if ( this.options.keyBindings ) {
			this._initKeys();
		}

// INSERT POINT: _init

	},

	destroy: function () {
		this._initEvents(true);
		clearTimeout(this.resizeTimeout);
 		this.resizeTimeout = null;
		this._execEvent('destroy');
	},

	_transitionEnd: function (e) {
		if ( e.target != this.scroller || !this.isInTransition ) {
			return;
		}

		this._transitionTime();
		if ( !this.resetPosition(this.options.bounceTime) ) {
			this.isInTransition = false;
			this._execEvent('scrollEnd');
		}
	},

	_start: function (e) {
		// React to left mouse button only
		if ( utils.eventType[e.type] != 1 ) {
		  // for button property
		  // http://unixpapa.com/js/mouse.html
		  var button;
	    if (!e.which) {
	      /* IE case */
	      button = (e.button < 2) ? 0 :
	               ((e.button == 4) ? 1 : 2);
	    } else {
	      /* All others */
	      button = e.button;
	    }
			if ( button !== 0 ) {
				return;
			}
		}

		if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
			return;
		}

		if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.touches ? e.touches[0] : e,
			pos;

		this.initiated	= utils.eventType[e.type];
		this.moved		= false;
		this.distX		= 0;
		this.distY		= 0;
		this.directionX = 0;
		this.directionY = 0;
		this.directionLocked = 0;

		this.startTime = utils.getTime();

		if ( this.options.useTransition && this.isInTransition ) {
			this._transitionTime();
			this.isInTransition = false;
			pos = this.getComputedPosition();
			this._translate(Math.round(pos.x), Math.round(pos.y));
			this._execEvent('scrollEnd');
		} else if ( !this.options.useTransition && this.isAnimating ) {
			this.isAnimating = false;
			this._execEvent('scrollEnd');
		}

		this.startX    = this.x;
		this.startY    = this.y;
		this.absStartX = this.x;
		this.absStartY = this.y;
		this.pointX    = point.pageX;
		this.pointY    = point.pageY;

		this._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
			e.preventDefault();
		}

		var point		= e.touches ? e.touches[0] : e,
			deltaX		= point.pageX - this.pointX,
			deltaY		= point.pageY - this.pointY,
			timestamp	= utils.getTime(),
			newX, newY,
			absDistX, absDistY;

		this.pointX		= point.pageX;
		this.pointY		= point.pageY;

		this.distX		+= deltaX;
		this.distY		+= deltaY;
		absDistX		= Math.abs(this.distX);
		absDistY		= Math.abs(this.distY);

		// We need to move at least 10 pixels for the scrolling to initiate
		if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
			return;
		}

		// If you are scrolling in one direction lock the other
		if ( !this.directionLocked && !this.options.freeScroll ) {
			if ( absDistX > absDistY + this.options.directionLockThreshold ) {
				this.directionLocked = 'h';		// lock horizontally
			} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
				this.directionLocked = 'v';		// lock vertically
			} else {
				this.directionLocked = 'n';		// no lock
			}
		}

		if ( this.directionLocked == 'h' ) {
			if ( this.options.eventPassthrough == 'vertical' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'horizontal' ) {
				this.initiated = false;
				return;
			}

			deltaY = 0;
		} else if ( this.directionLocked == 'v' ) {
			if ( this.options.eventPassthrough == 'horizontal' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'vertical' ) {
				this.initiated = false;
				return;
			}

			deltaX = 0;
		}

		deltaX = this.hasHorizontalScroll ? deltaX : 0;
		deltaY = this.hasVerticalScroll ? deltaY : 0;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		// Slow down if outside of the boundaries
		if ( newX > 0 || newX < this.maxScrollX ) {
			newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
		}
		if ( newY > 0 || newY < this.maxScrollY ) {
			newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
		}

		this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if ( !this.moved ) {
			this._execEvent('scrollStart');
		}

		this.moved = true;

		this._translate(newX, newY);

/* REPLACE START: _move */
		if ( timestamp - this.startTime > 300 ) {
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;

			if ( this.options.probeType == 1 ) {
				this._execEvent('scroll');
			}
		}

		if ( this.options.probeType > 1 ) {
			this._execEvent('scroll');
		}
/* REPLACE END: _move */

	},

	_end: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.changedTouches ? e.changedTouches[0] : e,
			momentumX,
			momentumY,
			duration = utils.getTime() - this.startTime,
			newX = Math.round(this.x),
			newY = Math.round(this.y),
			distanceX = Math.abs(newX - this.startX),
			distanceY = Math.abs(newY - this.startY),
			time = 0,
			easing = '';

		this.isInTransition = 0;
		this.initiated = 0;
		this.endTime = utils.getTime();

		// reset if we are outside of the boundaries
		if ( this.resetPosition(this.options.bounceTime) ) {
			return;
		}

		this.scrollTo(newX, newY);	// ensures that the last position is rounded

		// we scrolled less than 10 pixels
		if ( !this.moved ) {
			if ( this.options.tap ) {
				utils.tap(e, this.options.tap);
			}

			if ( this.options.click ) {
				utils.click(e);
			}

			this._execEvent('scrollCancel');
			return;
		}

		if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
			this._execEvent('flick');
			return;
		}

		// start momentum animation if needed
		if ( this.options.momentum && duration < 300 ) {
			momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
			momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
			newX = momentumX.destination;
			newY = momentumY.destination;
			time = Math.max(momentumX.duration, momentumY.duration);
			this.isInTransition = 1;
		}


		if ( this.options.snap ) {
			var snap = this._nearestSnap(newX, newY);
			this.currentPage = snap;
			time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(newX - snap.x), 1000),
						Math.min(Math.abs(newY - snap.y), 1000)
					), 300);
			newX = snap.x;
			newY = snap.y;

			this.directionX = 0;
			this.directionY = 0;
			easing = this.options.bounceEasing;
		}

// INSERT POINT: _end

		if ( newX != this.x || newY != this.y ) {
			// change easing function when scroller goes out of the boundaries
			if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
				easing = utils.ease.quadratic;
			}

			this.scrollTo(newX, newY, time, easing);
			return;
		}

		this._execEvent('scrollEnd');
	},

	_resize: function () {
		var that = this;

		clearTimeout(this.resizeTimeout);

		this.resizeTimeout = setTimeout(function () {
			that.refresh();
		}, this.options.resizePolling);
	},

	resetPosition: function (time) {
		var x = this.x,
			y = this.y;

		time = time || 0;

		if ( !this.hasHorizontalScroll || this.x > 0 ) {
			x = 0;
		} else if ( this.x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( !this.hasVerticalScroll || this.y > 0 ) {
			y = 0;
		} else if ( this.y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		if ( x == this.x && y == this.y ) {
			return false;
		}

		this.scrollTo(x, y, time, this.options.bounceEasing);

		return true;
	},

	disable: function () {
		this.enabled = false;
	},

	enable: function () {
		this.enabled = true;
	},

	refresh: function () {
		var rf = this.wrapper.offsetHeight;		// Force reflow

		this.wrapperWidth	= this.wrapper.clientWidth;
		this.wrapperHeight	= this.wrapper.clientHeight;

/* REPLACE START: refresh */

		this.scrollerWidth	= this.scroller.offsetWidth;
		this.scrollerHeight	= this.scroller.offsetHeight;

		this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
		this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

/* REPLACE END: refresh */

		this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
		this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

		if ( !this.hasHorizontalScroll ) {
			this.maxScrollX = 0;
			this.scrollerWidth = this.wrapperWidth;
		}

		if ( !this.hasVerticalScroll ) {
			this.maxScrollY = 0;
			this.scrollerHeight = this.wrapperHeight;
		}

		this.endTime = 0;
		this.directionX = 0;
		this.directionY = 0;

		this.wrapperOffset = utils.offset(this.wrapper);

		this._execEvent('refresh');

		this.resetPosition();

// INSERT POINT: _refresh

	},

	on: function (type, fn) {
		if ( !this._events[type] ) {
			this._events[type] = [];
		}

		this._events[type].push(fn);
	},

	off: function (type, fn) {
		if ( !this._events[type] ) {
			return;
		}

		var index = this._events[type].indexOf(fn);

		if ( index > -1 ) {
			this._events[type].splice(index, 1);
		}
	},

	_execEvent: function (type) {
		if ( !this._events[type] ) {
			return;
		}

		var i = 0,
			l = this._events[type].length;

		if ( !l ) {
			return;
		}

		for ( ; i < l; i++ ) {
			this._events[type][i].apply(this, [].slice.call(arguments, 1));
		}
	},

	scrollBy: function (x, y, time, easing) {
		x = this.x + x;
		y = this.y + y;
		time = time || 0;

		this.scrollTo(x, y, time, easing);
	},

	scrollTo: function (x, y, time, easing) {
		easing = easing || utils.ease.circular;

		this.isInTransition = this.options.useTransition && time > 0;
		var transitionType = this.options.useTransition && easing.style;
		if ( !time || transitionType ) {
				if(transitionType) {
					this._transitionTimingFunction(easing.style);
					this._transitionTime(time);
				}
			this._translate(x, y);
		} else {
			this._animate(x, y, time, easing.fn);
		}
	},

	scrollToElement: function (el, time, offsetX, offsetY, easing) {
		el = el.nodeType ? el : this.scroller.querySelector(el);

		if ( !el ) {
			return;
		}

		var pos = utils.offset(el);

		pos.left -= this.wrapperOffset.left;
		pos.top  -= this.wrapperOffset.top;

		// if offsetX/Y are true we center the element to the screen
		if ( offsetX === true ) {
			offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		}
		if ( offsetY === true ) {
			offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		}

		pos.left -= offsetX || 0;
		pos.top  -= offsetY || 0;

		pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

		time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

		this.scrollTo(pos.left, pos.top, time, easing);
	},

	_transitionTime: function (time) {
		if (!this.options.useTransition) {
			return;
		}
		time = time || 0;
		var durationProp = utils.style.transitionDuration;
		if(!durationProp) {
			return;
		}

		this.scrollerStyle[durationProp] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.scrollerStyle[durationProp] = '0.0001ms';
			// remove 0.0001ms
			var self = this;
			rAF(function() {
				if(self.scrollerStyle[durationProp] === '0.0001ms') {
					self.scrollerStyle[durationProp] = '0s';
				}
			});
		}


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].transitionTime(time);
			}
		}


// INSERT POINT: _transitionTime

	},

	_transitionTimingFunction: function (easing) {
		this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].transitionTimingFunction(easing);
			}
		}


// INSERT POINT: _transitionTimingFunction

	},

	_translate: function (x, y) {
		if ( this.options.useTransform ) {

/* REPLACE START: _translate */

			this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

/* REPLACE END: _translate */

		} else {
			x = Math.round(x);
			y = Math.round(y);
			this.scrollerStyle.left = x + 'px';
			this.scrollerStyle.top = y + 'px';
		}

		this.x = x;
		this.y = y;


	if ( this.indicators ) {
		for ( var i = this.indicators.length; i--; ) {
			this.indicators[i].updatePosition();
		}
	}


// INSERT POINT: _translate

	},

	_initEvents: function (remove) {
		var eventType = remove ? utils.removeEvent : utils.addEvent,
			target = this.options.bindToWrapper ? this.wrapper : window;

		eventType(window, 'orientationchange', this);
		eventType(window, 'resize', this);

		if ( this.options.click ) {
			eventType(this.wrapper, 'click', this, true);
		}

		if ( !this.options.disableMouse ) {
			eventType(this.wrapper, 'mousedown', this);
			eventType(target, 'mousemove', this);
			eventType(target, 'mousecancel', this);
			eventType(target, 'mouseup', this);
		}

		if ( utils.hasPointer && !this.options.disablePointer ) {
			eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
			eventType(target, utils.prefixPointerEvent('pointermove'), this);
			eventType(target, utils.prefixPointerEvent('pointercancel'), this);
			eventType(target, utils.prefixPointerEvent('pointerup'), this);
		}

		if ( utils.hasTouch && !this.options.disableTouch ) {
			eventType(this.wrapper, 'touchstart', this);
			eventType(target, 'touchmove', this);
			eventType(target, 'touchcancel', this);
			eventType(target, 'touchend', this);
		}

		eventType(this.scroller, 'transitionend', this);
		eventType(this.scroller, 'webkitTransitionEnd', this);
		eventType(this.scroller, 'oTransitionEnd', this);
		eventType(this.scroller, 'MSTransitionEnd', this);
	},

	getComputedPosition: function () {
		var matrix = window.getComputedStyle(this.scroller, null),
			x, y;

		if ( this.options.useTransform ) {
			matrix = matrix[utils.style.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d.]/g, '');
			y = +matrix.top.replace(/[^-\d.]/g, '');
		}

		return { x: x, y: y };
	},
	_initIndicators: function () {
		var interactive = this.options.interactiveScrollbars,
			customStyle = typeof this.options.scrollbars != 'string',
			indicators = [],
			indicator;

		var that = this;

		this.indicators = [];

		if ( this.options.scrollbars ) {
			// Vertical scrollbar
			if ( this.options.scrollY ) {
				indicator = {
					el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			// Horizontal scrollbar
			if ( this.options.scrollX ) {
				indicator = {
					el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}
		}

		if ( this.options.indicators ) {
			// TODO: check concat compatibility
			indicators = indicators.concat(this.options.indicators);
		}

		for ( var i = indicators.length; i--; ) {
			this.indicators.push( new Indicator(this, indicators[i]) );
		}

		// TODO: check if we can use array.map (wide compatibility and performance issues)
		function _indicatorsMap (fn) {
			if (that.indicators) {
				for ( var i = that.indicators.length; i--; ) {
					fn.call(that.indicators[i]);
				}
			}
		}

		if ( this.options.fadeScrollbars ) {
			this.on('scrollEnd', function () {
				_indicatorsMap(function () {
					this.fade();
				});
			});

			this.on('scrollCancel', function () {
				_indicatorsMap(function () {
					this.fade();
				});
			});

			this.on('scrollStart', function () {
				_indicatorsMap(function () {
					this.fade(1);
				});
			});

			this.on('beforeScrollStart', function () {
				_indicatorsMap(function () {
					this.fade(1, true);
				});
			});
		}


		this.on('refresh', function () {
			_indicatorsMap(function () {
				this.refresh();
			});
		});

		this.on('destroy', function () {
			_indicatorsMap(function () {
				this.destroy();
			});

			delete this.indicators;
		});
	},

	_initWheel: function () {
		utils.addEvent(this.wrapper, 'wheel', this);
		utils.addEvent(this.wrapper, 'mousewheel', this);
		utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

		this.on('destroy', function () {
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = null;
			utils.removeEvent(this.wrapper, 'wheel', this);
			utils.removeEvent(this.wrapper, 'mousewheel', this);
			utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
		});
	},

	_wheel: function (e) {
		if ( !this.enabled ) {
			return;
		}

		e.preventDefault();

		var wheelDeltaX, wheelDeltaY,
			newX, newY,
			that = this;

		if ( this.wheelTimeout === undefined ) {
			that._execEvent('scrollStart');
		}

		// Execute the scrollEnd event after 400ms the wheel stopped scrolling
		clearTimeout(this.wheelTimeout);
		this.wheelTimeout = setTimeout(function () {
			if(!that.options.snap) {
				that._execEvent('scrollEnd');
			}
			that.wheelTimeout = undefined;
		}, 400);

		if ( 'deltaX' in e ) {
			if (e.deltaMode === 1) {
				wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
				wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
			} else {
				wheelDeltaX = -e.deltaX;
				wheelDeltaY = -e.deltaY;
			}
		} else if ( 'wheelDeltaX' in e ) {
			wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
			wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
		} else if ( 'wheelDelta' in e ) {
			wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
		} else if ( 'detail' in e ) {
			wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
		} else {
			return;
		}

		wheelDeltaX *= this.options.invertWheelDirection;
		wheelDeltaY *= this.options.invertWheelDirection;

		if ( !this.hasVerticalScroll ) {
			wheelDeltaX = wheelDeltaY;
			wheelDeltaY = 0;
		}

		if ( this.options.snap ) {
			newX = this.currentPage.pageX;
			newY = this.currentPage.pageY;

			if ( wheelDeltaX > 0 ) {
				newX--;
			} else if ( wheelDeltaX < 0 ) {
				newX++;
			}

			if ( wheelDeltaY > 0 ) {
				newY--;
			} else if ( wheelDeltaY < 0 ) {
				newY++;
			}

			this.goToPage(newX, newY);

			return;
		}

		newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
		newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

		this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
		this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

		if ( newX > 0 ) {
			newX = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
		}

		if ( newY > 0 ) {
			newY = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
		}

		this.scrollTo(newX, newY, 0);

		if ( this.options.probeType > 1 ) {
			this._execEvent('scroll');
		}

// INSERT POINT: _wheel
	},

	_initSnap: function () {
		this.currentPage = {};

		if ( typeof this.options.snap == 'string' ) {
			this.options.snap = this.scroller.querySelectorAll(this.options.snap);
		}

		this.on('refresh', function () {
			var i = 0, l,
				m = 0, n,
				cx, cy,
				x = 0, y,
				stepX = this.options.snapStepX || this.wrapperWidth,
				stepY = this.options.snapStepY || this.wrapperHeight,
				el;

			this.pages = [];

			if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
				return;
			}

			if ( this.options.snap === true ) {
				cx = Math.round( stepX / 2 );
				cy = Math.round( stepY / 2 );

				while ( x > -this.scrollerWidth ) {
					this.pages[i] = [];
					l = 0;
					y = 0;

					while ( y > -this.scrollerHeight ) {
						this.pages[i][l] = {
							x: Math.max(x, this.maxScrollX),
							y: Math.max(y, this.maxScrollY),
							width: stepX,
							height: stepY,
							cx: x - cx,
							cy: y - cy
						};

						y -= stepY;
						l++;
					}

					x -= stepX;
					i++;
				}
			} else {
				el = this.options.snap;
				l = el.length;
				n = -1;

				for ( ; i < l; i++ ) {
					if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
						m = 0;
						n++;
					}

					if ( !this.pages[m] ) {
						this.pages[m] = [];
					}

					x = Math.max(-el[i].offsetLeft, this.maxScrollX);
					y = Math.max(-el[i].offsetTop, this.maxScrollY);
					cx = x - Math.round(el[i].offsetWidth / 2);
					cy = y - Math.round(el[i].offsetHeight / 2);

					this.pages[m][n] = {
						x: x,
						y: y,
						width: el[i].offsetWidth,
						height: el[i].offsetHeight,
						cx: cx,
						cy: cy
					};

					if ( x > this.maxScrollX ) {
						m++;
					}
				}
			}

			this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

			// Update snap threshold if needed
			if ( this.options.snapThreshold % 1 === 0 ) {
				this.snapThresholdX = this.options.snapThreshold;
				this.snapThresholdY = this.options.snapThreshold;
			} else {
				this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
				this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
			}
		});

		this.on('flick', function () {
			var time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(this.x - this.startX), 1000),
						Math.min(Math.abs(this.y - this.startY), 1000)
					), 300);

			this.goToPage(
				this.currentPage.pageX + this.directionX,
				this.currentPage.pageY + this.directionY,
				time
			);
		});
	},

	_nearestSnap: function (x, y) {
		if ( !this.pages.length ) {
			return { x: 0, y: 0, pageX: 0, pageY: 0 };
		}

		var i = 0,
			l = this.pages.length,
			m = 0;

		// Check if we exceeded the snap threshold
		if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
			Math.abs(y - this.absStartY) < this.snapThresholdY ) {
			return this.currentPage;
		}

		if ( x > 0 ) {
			x = 0;
		} else if ( x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( y > 0 ) {
			y = 0;
		} else if ( y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		for ( ; i < l; i++ ) {
			if ( x >= this.pages[i][0].cx ) {
				x = this.pages[i][0].x;
				break;
			}
		}

		l = this.pages[i].length;

		for ( ; m < l; m++ ) {
			if ( y >= this.pages[0][m].cy ) {
				y = this.pages[0][m].y;
				break;
			}
		}

		if ( i == this.currentPage.pageX ) {
			i += this.directionX;

			if ( i < 0 ) {
				i = 0;
			} else if ( i >= this.pages.length ) {
				i = this.pages.length - 1;
			}

			x = this.pages[i][0].x;
		}

		if ( m == this.currentPage.pageY ) {
			m += this.directionY;

			if ( m < 0 ) {
				m = 0;
			} else if ( m >= this.pages[0].length ) {
				m = this.pages[0].length - 1;
			}

			y = this.pages[0][m].y;
		}

		return {
			x: x,
			y: y,
			pageX: i,
			pageY: m
		};
	},

	goToPage: function (x, y, time, easing) {
		easing = easing || this.options.bounceEasing;

		if ( x >= this.pages.length ) {
			x = this.pages.length - 1;
		} else if ( x < 0 ) {
			x = 0;
		}

		if ( y >= this.pages[x].length ) {
			y = this.pages[x].length - 1;
		} else if ( y < 0 ) {
			y = 0;
		}

		var posX = this.pages[x][y].x,
			posY = this.pages[x][y].y;

		time = time === undefined ? this.options.snapSpeed || Math.max(
			Math.max(
				Math.min(Math.abs(posX - this.x), 1000),
				Math.min(Math.abs(posY - this.y), 1000)
			), 300) : time;

		this.currentPage = {
			x: posX,
			y: posY,
			pageX: x,
			pageY: y
		};

		this.scrollTo(posX, posY, time, easing);
	},

	next: function (time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x++;

		if ( x >= this.pages.length && this.hasVerticalScroll ) {
			x = 0;
			y++;
		}

		this.goToPage(x, y, time, easing);
	},

	prev: function (time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x--;

		if ( x < 0 && this.hasVerticalScroll ) {
			x = 0;
			y--;
		}

		this.goToPage(x, y, time, easing);
	},

	_initKeys: function (e) {
		// default key bindings
		var keys = {
			pageUp: 33,
			pageDown: 34,
			end: 35,
			home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};
		var i;

		// if you give me characters I give you keycode
		if ( typeof this.options.keyBindings == 'object' ) {
			for ( i in this.options.keyBindings ) {
				if ( typeof this.options.keyBindings[i] == 'string' ) {
					this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
				}
			}
		} else {
			this.options.keyBindings = {};
		}

		for ( i in keys ) {
			this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
		}

		utils.addEvent(window, 'keydown', this);

		this.on('destroy', function () {
			utils.removeEvent(window, 'keydown', this);
		});
	},

	_key: function (e) {
		if ( !this.enabled ) {
			return;
		}

		var snap = this.options.snap,	// we are using this alot, better to cache it
			newX = snap ? this.currentPage.pageX : this.x,
			newY = snap ? this.currentPage.pageY : this.y,
			now = utils.getTime(),
			prevTime = this.keyTime || 0,
			acceleration = 0.250,
			pos;

		if ( this.options.useTransition && this.isInTransition ) {
			pos = this.getComputedPosition();

			this._translate(Math.round(pos.x), Math.round(pos.y));
			this.isInTransition = false;
		}

		this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

		switch ( e.keyCode ) {
			case this.options.keyBindings.pageUp:
				if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
					newX += snap ? 1 : this.wrapperWidth;
				} else {
					newY += snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.pageDown:
				if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
					newX -= snap ? 1 : this.wrapperWidth;
				} else {
					newY -= snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.end:
				newX = snap ? this.pages.length-1 : this.maxScrollX;
				newY = snap ? this.pages[0].length-1 : this.maxScrollY;
				break;
			case this.options.keyBindings.home:
				newX = 0;
				newY = 0;
				break;
			case this.options.keyBindings.left:
				newX += snap ? -1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.up:
				newY += snap ? 1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.right:
				newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.down:
				newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
				break;
			default:
				return;
		}

		if ( snap ) {
			this.goToPage(newX, newY);
			return;
		}

		if ( newX > 0 ) {
			newX = 0;
			this.keyAcceleration = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
			this.keyAcceleration = 0;
		}

		if ( newY > 0 ) {
			newY = 0;
			this.keyAcceleration = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
			this.keyAcceleration = 0;
		}

		this.scrollTo(newX, newY, 0);

		this.keyTime = now;
	},

	_animate: function (destX, destY, duration, easingFn) {
		var that = this,
			startX = this.x,
			startY = this.y,
			startTime = utils.getTime(),
			destTime = startTime + duration;

		function step () {
			var now = utils.getTime(),
				newX, newY,
				easing;

			if ( now >= destTime ) {
				that.isAnimating = false;
				that._translate(destX, destY);
				
				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd');
				}

				return;
			}

			now = ( now - startTime ) / duration;
			easing = easingFn(now);
			newX = ( destX - startX ) * easing + startX;
			newY = ( destY - startY ) * easing + startY;
			that._translate(newX, newY);

			if ( that.isAnimating ) {
				rAF(step);
			}

			if ( that.options.probeType == 3 ) {
				that._execEvent('scroll');
			}
		}

		this.isAnimating = true;
		step();
	},

	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
			case 'click':
				if ( this.enabled && !e._constructed ) {
					e.preventDefault();
					e.stopPropagation();
				}
				break;
		}
	}
};
function createDefaultScrollbar (direction, interactive, type) {
	var scrollbar = document.createElement('div'),
		indicator = document.createElement('div');

	if ( type === true ) {
		scrollbar.style.cssText = 'position:absolute;z-index:9999';
		indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
	}

	indicator.className = 'iScrollIndicator';

	if ( direction == 'h' ) {
		if ( type === true ) {
			scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
			indicator.style.height = '100%';
		}
		scrollbar.className = 'iScrollHorizontalScrollbar';
	} else {
		if ( type === true ) {
			scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
			indicator.style.width = '100%';
		}
		scrollbar.className = 'iScrollVerticalScrollbar';
	}

	scrollbar.style.cssText += ';overflow:hidden';

	if ( !interactive ) {
		scrollbar.style.pointerEvents = 'none';
	}

	scrollbar.appendChild(indicator);

	return scrollbar;
}

function Indicator (scroller, options) {
	this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
	this.wrapperStyle = this.wrapper.style;
	this.indicator = this.wrapper.children[0];
	this.indicatorStyle = this.indicator.style;
	this.scroller = scroller;

	this.options = {
		listenX: true,
		listenY: true,
		interactive: false,
		resize: true,
		defaultScrollbars: false,
		shrink: false,
		fade: false,
		speedRatioX: 0,
		speedRatioY: 0
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	this.sizeRatioX = 1;
	this.sizeRatioY = 1;
	this.maxPosX = 0;
	this.maxPosY = 0;

	if ( this.options.interactive ) {
		if ( !this.options.disableTouch ) {
			utils.addEvent(this.indicator, 'touchstart', this);
			utils.addEvent(window, 'touchend', this);
		}
		if ( !this.options.disablePointer ) {
			utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
			utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
		}
		if ( !this.options.disableMouse ) {
			utils.addEvent(this.indicator, 'mousedown', this);
			utils.addEvent(window, 'mouseup', this);
		}
	}

	if ( this.options.fade ) {
		this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
		var durationProp = utils.style.transitionDuration;
		if(!durationProp) {
			return;
		}
		this.wrapperStyle[durationProp] = utils.isBadAndroid ? '0.0001ms' : '0ms';
		// remove 0.0001ms
		var self = this;
		if(utils.isBadAndroid) {
			rAF(function() {
				if(self.wrapperStyle[durationProp] === '0.0001ms') {
					self.wrapperStyle[durationProp] = '0s';
				}
			});
		}
		this.wrapperStyle.opacity = '0';
	}
}

Indicator.prototype = {
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
		}
	},

	destroy: function () {
		if ( this.options.fadeScrollbars ) {
			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;
		}
		if ( this.options.interactive ) {
			utils.removeEvent(this.indicator, 'touchstart', this);
			utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
			utils.removeEvent(this.indicator, 'mousedown', this);

			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
			utils.removeEvent(window, 'mousemove', this);

			utils.removeEvent(window, 'touchend', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
			utils.removeEvent(window, 'mouseup', this);
		}

		if ( this.options.defaultScrollbars ) {
			this.wrapper.parentNode.removeChild(this.wrapper);
		}
	},

	_start: function (e) {
		var point = e.touches ? e.touches[0] : e;

		e.preventDefault();
		e.stopPropagation();

		this.transitionTime();

		this.initiated = true;
		this.moved = false;
		this.lastPointX	= point.pageX;
		this.lastPointY	= point.pageY;

		this.startTime	= utils.getTime();

		if ( !this.options.disableTouch ) {
			utils.addEvent(window, 'touchmove', this);
		}
		if ( !this.options.disablePointer ) {
			utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
		}
		if ( !this.options.disableMouse ) {
			utils.addEvent(window, 'mousemove', this);
		}

		this.scroller._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		var point = e.touches ? e.touches[0] : e,
			deltaX, deltaY,
			newX, newY,
			timestamp = utils.getTime();

		if ( !this.moved ) {
			this.scroller._execEvent('scrollStart');
		}

		this.moved = true;

		deltaX = point.pageX - this.lastPointX;
		this.lastPointX = point.pageX;

		deltaY = point.pageY - this.lastPointY;
		this.lastPointY = point.pageY;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		this._pos(newX, newY);


		if ( this.scroller.options.probeType == 1 && timestamp - this.startTime > 300 ) {
			this.startTime = timestamp;
			this.scroller._execEvent('scroll');
		} else if ( this.scroller.options.probeType > 1 ) {
			this.scroller._execEvent('scroll');
		}


// INSERT POINT: indicator._move

		e.preventDefault();
		e.stopPropagation();
	},

	_end: function (e) {
		if ( !this.initiated ) {
			return;
		}

		this.initiated = false;

		e.preventDefault();
		e.stopPropagation();

		utils.removeEvent(window, 'touchmove', this);
		utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
		utils.removeEvent(window, 'mousemove', this);

		if ( this.scroller.options.snap ) {
			var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

			var time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(this.scroller.x - snap.x), 1000),
						Math.min(Math.abs(this.scroller.y - snap.y), 1000)
					), 300);

			if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
				this.scroller.directionX = 0;
				this.scroller.directionY = 0;
				this.scroller.currentPage = snap;
				this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
			}
		}

		if ( this.moved ) {
			this.scroller._execEvent('scrollEnd');
		}
	},

	transitionTime: function (time) {
		time = time || 0;
		var durationProp = utils.style.transitionDuration;
		if(!durationProp) {
			return;
		}

		this.indicatorStyle[durationProp] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.indicatorStyle[durationProp] = '0.0001ms';
			// remove 0.0001ms
			var self = this;
			rAF(function() {
				if(self.indicatorStyle[durationProp] === '0.0001ms') {
					self.indicatorStyle[durationProp] = '0s';
				}
			});
		}
	},

	transitionTimingFunction: function (easing) {
		this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
	},

	refresh: function () {
		this.transitionTime();

		if ( this.options.listenX && !this.options.listenY ) {
			this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
		} else if ( this.options.listenY && !this.options.listenX ) {
			this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
		} else {
			this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
		}

		if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
			utils.addClass(this.wrapper, 'iScrollBothScrollbars');
			utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

			if ( this.options.defaultScrollbars && this.options.customStyle ) {
				if ( this.options.listenX ) {
					this.wrapper.style.right = '8px';
				} else {
					this.wrapper.style.bottom = '8px';
				}
			}
		} else {
			utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
			utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

			if ( this.options.defaultScrollbars && this.options.customStyle ) {
				if ( this.options.listenX ) {
					this.wrapper.style.right = '2px';
				} else {
					this.wrapper.style.bottom = '2px';
				}
			}
		}

		var r = this.wrapper.offsetHeight;	// force refresh

		if ( this.options.listenX ) {
			this.wrapperWidth = this.wrapper.clientWidth;
			if ( this.options.resize ) {
				this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
				this.indicatorStyle.width = this.indicatorWidth + 'px';
			} else {
				this.indicatorWidth = this.indicator.clientWidth;
			}

			this.maxPosX = this.wrapperWidth - this.indicatorWidth;

			if ( this.options.shrink == 'clip' ) {
				this.minBoundaryX = -this.indicatorWidth + 8;
				this.maxBoundaryX = this.wrapperWidth - 8;
			} else {
				this.minBoundaryX = 0;
				this.maxBoundaryX = this.maxPosX;
			}

			this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
		}

		if ( this.options.listenY ) {
			this.wrapperHeight = this.wrapper.clientHeight;
			if ( this.options.resize ) {
				this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
				this.indicatorStyle.height = this.indicatorHeight + 'px';
			} else {
				this.indicatorHeight = this.indicator.clientHeight;
			}

			this.maxPosY = this.wrapperHeight - this.indicatorHeight;

			if ( this.options.shrink == 'clip' ) {
				this.minBoundaryY = -this.indicatorHeight + 8;
				this.maxBoundaryY = this.wrapperHeight - 8;
			} else {
				this.minBoundaryY = 0;
				this.maxBoundaryY = this.maxPosY;
			}

			this.maxPosY = this.wrapperHeight - this.indicatorHeight;
			this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
		}

		this.updatePosition();
	},

	updatePosition: function () {
		var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
			y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

		if ( !this.options.ignoreBoundaries ) {
			if ( x < this.minBoundaryX ) {
				if ( this.options.shrink == 'scale' ) {
					this.width = Math.max(this.indicatorWidth + x, 8);
					this.indicatorStyle.width = this.width + 'px';
				}
				x = this.minBoundaryX;
			} else if ( x > this.maxBoundaryX ) {
				if ( this.options.shrink == 'scale' ) {
					this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
					this.indicatorStyle.width = this.width + 'px';
					x = this.maxPosX + this.indicatorWidth - this.width;
				} else {
					x = this.maxBoundaryX;
				}
			} else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
				this.width = this.indicatorWidth;
				this.indicatorStyle.width = this.width + 'px';
			}

			if ( y < this.minBoundaryY ) {
				if ( this.options.shrink == 'scale' ) {
					this.height = Math.max(this.indicatorHeight + y * 3, 8);
					this.indicatorStyle.height = this.height + 'px';
				}
				y = this.minBoundaryY;
			} else if ( y > this.maxBoundaryY ) {
				if ( this.options.shrink == 'scale' ) {
					this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
					this.indicatorStyle.height = this.height + 'px';
					y = this.maxPosY + this.indicatorHeight - this.height;
				} else {
					y = this.maxBoundaryY;
				}
			} else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
				this.height = this.indicatorHeight;
				this.indicatorStyle.height = this.height + 'px';
			}
		}

		this.x = x;
		this.y = y;

		if ( this.scroller.options.useTransform ) {
			this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
		} else {
			this.indicatorStyle.left = x + 'px';
			this.indicatorStyle.top = y + 'px';
		}
	},

	_pos: function (x, y) {
		if ( x < 0 ) {
			x = 0;
		} else if ( x > this.maxPosX ) {
			x = this.maxPosX;
		}

		if ( y < 0 ) {
			y = 0;
		} else if ( y > this.maxPosY ) {
			y = this.maxPosY;
		}

		x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
		y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

		this.scroller.scrollTo(x, y);
	},

	fade: function (val, hold) {
		if ( hold && !this.visible ) {
			return;
		}

		clearTimeout(this.fadeTimeout);
		this.fadeTimeout = null;

		var time = val ? 250 : 500,
			delay = val ? 0 : 300;

		val = val ? '1' : '0';

		this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

		this.fadeTimeout = setTimeout((function (val) {
			this.wrapperStyle.opacity = val;
			this.visible = +val;
		}).bind(this, val), delay);
	}
};

IScroll.utils = utils;

if ( typeof module != 'undefined' && module.exports ) {
	module.exports = IScroll;
} else if ( true ) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return IScroll; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
	window.IScroll = IScroll;
}

})(window, document, Math);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v1.12.2 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="1.12.2",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(!l.ownFirst)for(b in a)return k.call(a,b);for(b in a);return void 0===b||k.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(h)return h.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=e.call(arguments,2),d=function(){return a.apply(b||this,c.concat(e.call(arguments)))},d.guid=a.guid=a.guid||n.guid++,d):void 0},now:function(){return+new Date},support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}if(f=d.getElementById(e[2]),f&&f.parentNode){if(f.id!==e[2])return A.find(a);this.length=1,this[0]=f}return this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||(e=n.uniqueSort(e)),D.test(a)&&(e=e.reverse())),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=!0,c||j.disable(),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.addEventListener?(d.removeEventListener("DOMContentLoaded",K),a.removeEventListener("load",K)):(d.detachEvent("onreadystatechange",K),a.detachEvent("onload",K))}function K(){(d.addEventListener||"load"===a.event.type||"complete"===d.readyState)&&(J(),n.ready())}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll)a.setTimeout(n.ready);else if(d.addEventListener)d.addEventListener("DOMContentLoaded",K),a.addEventListener("load",K);else{d.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=!1;try{c=null==a.frameElement&&d.documentElement}catch(e){}c&&c.doScroll&&!function f(){if(!n.isReady){try{c.doScroll("left")}catch(b){return a.setTimeout(f,50)}J(),n.ready()}}()}return I.promise(b)},n.ready.promise();var L;for(L in n(l))break;l.ownFirst="0"===L,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c,e;c=d.getElementsByTagName("body")[0],c&&c.style&&(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",l.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(e))}),function(){var a=d.createElement("div");l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}a=null}();var M=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b},N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0;
}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function R(a,b,d,e){if(M(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),"object"!=typeof b&&"function"!=typeof b||(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f}}function S(a,b,c){if(M(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=void 0)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,!0)},_removeData:function(a,b){return S(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c)})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}}),function(){var a;l.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,e;return c=d.getElementsByTagName("body")[0],c&&c.style?(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(d.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(e),a):void 0}}();var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),V=["Top","Right","Bottom","Left"],W=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function X(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&U.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var Y=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)Y(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},Z=/^(?:checkbox|radio)$/i,$=/<([\w:-]+)/,_=/^$|\/(?:java|ecma)script/i,aa=/^\s+/,ba="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";function ca(a){var b=ba.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}!function(){var a=d.createElement("div"),b=d.createDocumentFragment(),c=d.createElement("input");a.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",l.leadingWhitespace=3===a.firstChild.nodeType,l.tbody=!a.getElementsByTagName("tbody").length,l.htmlSerialize=!!a.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==d.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,b.appendChild(c),l.appendChecked=c.checked,a.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!a.cloneNode(!0).lastChild.defaultValue,b.appendChild(a),c=d.createElement("input"),c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),a.appendChild(c),l.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!!a.addEventListener,a[n.expando]=1,l.attributes=!a.getAttribute(n.expando)}();var da={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};da.optgroup=da.option,da.tbody=da.tfoot=da.colgroup=da.caption=da.thead,da.th=da.td;function ea(a,b){var c,d,e=0,f="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,ea(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function fa(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}var ga=/<|&#?\w+;/,ha=/<tbody/i;function ia(a){Z.test(a.type)&&(a.defaultChecked=a.checked)}function ja(a,b,c,d,e){for(var f,g,h,i,j,k,m,o=a.length,p=ca(b),q=[],r=0;o>r;r++)if(g=a[r],g||0===g)if("object"===n.type(g))n.merge(q,g.nodeType?[g]:g);else if(ga.test(g)){i=i||p.appendChild(b.createElement("div")),j=($.exec(g)||["",""])[1].toLowerCase(),m=da[j]||da._default,i.innerHTML=m[1]+n.htmlPrefilter(g)+m[2],f=m[0];while(f--)i=i.lastChild;if(!l.leadingWhitespace&&aa.test(g)&&q.push(b.createTextNode(aa.exec(g)[0])),!l.tbody){g="table"!==j||ha.test(g)?"<table>"!==m[1]||ha.test(g)?0:i:i.firstChild,f=g&&g.childNodes.length;while(f--)n.nodeName(k=g.childNodes[f],"tbody")&&!k.childNodes.length&&g.removeChild(k)}n.merge(q,i.childNodes),i.textContent="";while(i.firstChild)i.removeChild(i.firstChild);i=p.lastChild}else q.push(b.createTextNode(g));i&&p.removeChild(i),l.appendChecked||n.grep(ea(q,"input"),ia),r=0;while(g=q[r++])if(d&&n.inArray(g,d)>-1)e&&e.push(g);else if(h=n.contains(g.ownerDocument,g),i=ea(p.appendChild(g),"script"),h&&fa(i),c){f=0;while(g=i[f++])_.test(g.type||"")&&c.push(g)}return i=null,p}!function(){var b,c,e=d.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b]=c in a)||(e.setAttribute(c,"t"),l[b]=e.attributes[c].expando===!1);e=null}();var ka=/^(?:input|select|textarea)$/i,la=/^key/,ma=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,na=/^(?:focusinfocus|focusoutblur)$/,oa=/^([^.]*)(?:\.(.+)|)/;function pa(){return!0}function qa(){return!1}function ra(){try{return d.activeElement}catch(a){}}function sa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)sa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=qa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return"undefined"==typeof n||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(G)||[""],h=b.length;while(h--)f=oa.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=oa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(i=m=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!na.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),h=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),l=n.event.special[q]||{},f||!l.trigger||l.trigger.apply(e,c)!==!1)){if(!f&&!l.noBubble&&!n.isWindow(e)){for(j=l.delegateType||q,na.test(j+q)||(i=i.parentNode);i;i=i.parentNode)p.push(i),m=i;m===(e.ownerDocument||d)&&p.push(m.defaultView||m.parentWindow||a)}o=0;while((i=p[o++])&&!b.isPropagationStopped())b.type=o>1?j:l.bindType||q,g=(n._data(i,"events")||{})[b.type]&&n._data(i,"handle"),g&&g.apply(i,c),g=h&&i[h],g&&g.apply&&M(i)&&(b.result=g.apply(i,c),b.result===!1&&b.preventDefault());if(b.type=q,!f&&!b.isDefaultPrevented()&&(!l._default||l._default.apply(p.pop(),c)===!1)&&M(e)&&h&&e[q]&&!n.isWindow(e)){m=e[h],m&&(e[h]=null),n.event.triggered=q;try{e[q]()}catch(s){}n.event.triggered=void 0,m&&(e[h]=m)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ma.test(f)?this.mouseHooks:la.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=g.srcElement||d),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,h.filter?h.filter(a,g):a},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button,h=b.fromElement;return null==a.pageX&&null!=b.clientX&&(e=a.target.ownerDocument||d,f=e.documentElement,c=e.body,a.pageX=b.clientX+(f&&f.scrollLeft||c&&c.scrollLeft||0)-(f&&f.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(f&&f.scrollTop||c&&c.scrollTop||0)-(f&&f.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&h&&(a.relatedTarget=h===a.target?b.toElement:h),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==ra()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ra()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=d.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)}:function(a,b,c){var d="on"+b;a.detachEvent&&("undefined"==typeof a[d]&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?pa:qa):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:qa,isPropagationStopped:qa,isImmediatePropagationStopped:qa,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=pa,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=pa,a&&!this.isSimulated&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=pa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submit||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?n.prop(b,"form"):void 0;c&&!n._data(c,"submit")&&(n.event.add(c,"submit._submit",function(a){a._submitBubble=!0}),n._data(c,"submit",!0))})},postDispatch:function(a){a._submitBubble&&(delete a._submitBubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.change||(n.event.special.change={setup:function(){return ka.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._justChanged=!0)}),n.event.add(this,"click._change",function(a){this._justChanged&&!a.isTrigger&&(this._justChanged=!1),n.event.simulate("change",this,a)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;ka.test(b.nodeName)&&!n._data(b,"change")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a)}),n._data(b,"change",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!ka.test(this.nodeName)}}),l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d){return sa(this,a,b,c,d)},one:function(a,b,c,d){return sa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=qa),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var ta=/ jQuery\d+="(?:null|\d+)"/g,ua=new RegExp("<(?:"+ba+")[\\s/>]","i"),va=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,wa=/<script|<style|<link/i,xa=/checked\s*(?:[^=]|=\s*.checked.)/i,ya=/^true\/(.*)/,za=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Aa=ca(d),Ba=Aa.appendChild(d.createElement("div"));function Ca(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function Da(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function Ea(a){var b=ya.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function Ga(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(Da(b).text=a.text,Ea(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Z.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}}function Ha(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&xa.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d)});if(o&&(k=ja(b,a[0].ownerDocument,!1,a,d),e=k.firstChild,1===k.childNodes.length&&(k=e),e||d)){for(i=n.map(ea(k,"script"),Da),h=i.length;o>m;m++)g=k,m!==p&&(g=n.clone(g,!0,!0),h&&n.merge(i,ea(g,"script"))),c.call(a[m],g,m);if(h)for(j=i[i.length-1].ownerDocument,n.map(i,Ea),m=0;h>m;m++)g=i[m],_.test(g.type||"")&&!n._data(g,"globalEval")&&n.contains(j,g)&&(g.src?n._evalUrl&&n._evalUrl(g.src):n.globalEval((g.text||g.textContent||g.innerHTML||"").replace(za,"")));k=e=null}return a}function Ia(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(ea(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&fa(ea(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(va,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!ua.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(Ba.innerHTML=a.outerHTML,Ba.removeChild(f=Ba.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=ea(f),h=ea(a),g=0;null!=(e=h[g]);++g)d[g]&&Ga(e,d[g]);if(b)if(c)for(h=h||ea(a),d=d||ea(f),g=0;null!=(e=h[g]);g++)Fa(e,d[g]);else Fa(a,f);return d=ea(f,"script"),d.length>0&&fa(d,!i&&ea(a,"script")),d=h=e=null,f},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.attributes,m=n.event.special;null!=(d=a[h]);h++)if((b||M(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k||"undefined"==typeof d.removeAttribute?d[i]=void 0:d.removeAttribute(i),c.push(f))}}}),n.fn.extend({domManip:Ha,detach:function(a){return Ia(this,a,!0)},remove:function(a){return Ia(this,a)},text:function(a){return Y(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||d).createTextNode(a))},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a)}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(ea(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return Y(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(ta,""):void 0;if("string"==typeof a&&!wa.test(a)&&(l.htmlSerialize||!ua.test(a))&&(l.leadingWhitespace||!aa.test(a))&&!da[($.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ea(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(ea(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],f=n(a),h=f.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(f[d])[b](c),g.apply(e,c.get());return this.pushStack(e)}});var Ja,Ka={HTML:"block",BODY:"block"};function La(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function Ma(a){var b=d,c=Ka[a];return c||(c=La(a,b),"none"!==c&&c||(Ja=(Ja||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ja[0].contentWindow||Ja[0].contentDocument).document,b.write(),b.close(),c=La(a,b),Ja.detach()),Ka[a]=c),c}var Na=/^margin/,Oa=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Pa=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Qa=d.documentElement;!function(){var b,c,e,f,g,h,i=d.createElement("div"),j=d.createElement("div");if(j.style){j.style.cssText="float:left;opacity:.5",l.opacity="0.5"===j.style.opacity,l.cssFloat=!!j.style.cssFloat,j.style.backgroundClip="content-box",j.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===j.style.backgroundClip,i=d.createElement("div"),i.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",j.innerHTML="",i.appendChild(j),l.boxSizing=""===j.style.boxSizing||""===j.style.MozBoxSizing||""===j.style.WebkitBoxSizing,n.extend(l,{reliableHiddenOffsets:function(){return null==b&&k(),f},boxSizingReliable:function(){return null==b&&k(),e},pixelMarginRight:function(){return null==b&&k(),c},pixelPosition:function(){return null==b&&k(),b},reliableMarginRight:function(){return null==b&&k(),g},reliableMarginLeft:function(){return null==b&&k(),h}});function k(){var k,l,m=d.documentElement;m.appendChild(i),j.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",b=e=h=!1,c=g=!0,a.getComputedStyle&&(l=a.getComputedStyle(j),b="1%"!==(l||{}).top,h="2px"===(l||{}).marginLeft,e="4px"===(l||{width:"4px"}).width,j.style.marginRight="50%",c="4px"===(l||{marginRight:"4px"}).marginRight,k=j.appendChild(d.createElement("div")),k.style.cssText=j.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",k.style.marginRight=k.style.width="0",j.style.width="1px",g=!parseFloat((a.getComputedStyle(k)||{}).marginRight),j.removeChild(k)),j.style.display="none",f=0===j.getClientRects().length,f&&(j.style.display="",j.innerHTML="<table><tr><td></td><td>t</td></tr></table>",k=j.getElementsByTagName("td"),k[0].style.cssText="margin:0;border:0;padding:0;display:none",f=0===k[0].offsetHeight,f&&(k[0].style.display="",k[1].style.display="none",f=0===k[0].offsetHeight)),m.removeChild(i)}}}();var Ra,Sa,Ta=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ra=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Oa.test(g)&&Na.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0===g?g:g+""}):Qa.currentStyle&&(Ra=function(a){return a.currentStyle},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Oa.test(g)&&!Ta.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Ua(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Va=/alpha\([^)]*\)/i,Wa=/opacity\s*=\s*([^)]*)/i,Xa=/^(none|table(?!-c[ea]).+)/,Ya=new RegExp("^("+T+")(.*)$","i"),Za={position:"absolute",visibility:"hidden",display:"block"},$a={letterSpacing:"0",fontWeight:"400"},_a=["Webkit","O","Moz","ms"],ab=d.createElement("div").style;function bb(a){if(a in ab)return a;var b=a.charAt(0).toUpperCase()+a.slice(1),c=_a.length;while(c--)if(a=_a[c]+b,a in ab)return a}function cb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&W(d)&&(f[g]=n._data(d,"olddisplay",Ma(d.nodeName)))):(e=W(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function db(a,b,c){var d=Ya.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function eb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+V[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+V[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+V[f]+"Width",!0,e))):(g+=n.css(a,"padding"+V[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+V[f]+"Width",!0,e)));return g}function fb(b,c,e){var f=!0,g="width"===c?b.offsetWidth:b.offsetHeight,h=Ra(b),i=l.boxSizing&&"border-box"===n.css(b,"boxSizing",!1,h);if(d.msFullscreenElement&&a.top!==a&&b.getClientRects().length&&(g=Math.round(100*b.getBoundingClientRect()[c])),0>=g||null==g){if(g=Sa(b,c,h),(0>g||null==g)&&(g=b.style[c]),Oa.test(g))return g;f=i&&(l.boxSizingReliable()||g===b.style[c]),g=parseFloat(g)||0}return g+eb(b,c,e||(i?"border":"content"),f,h)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Sa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=U.exec(c))&&e[1]&&(c=X(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Sa(a,b,d)),"normal"===f&&b in $a&&(f=$a[b]),""===c||c?(e=parseFloat(f),c===!0||isFinite(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Xa.test(n.css(a,"display"))&&0===a.offsetWidth?Pa(a,Za,function(){return fb(a,b,d)}):fb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ra(a);return db(a,c,d?eb(a,b,d,l.boxSizing&&"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Wa.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Va,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Va.test(f)?f.replace(Va,e):f+" "+e)}}),n.cssHooks.marginRight=Ua(l.reliableMarginRight,function(a,b){return b?Pa(a,{display:"inline-block"},Sa,[a,"marginRight"]):void 0}),n.cssHooks.marginLeft=Ua(l.reliableMarginLeft,function(a,b){
return b?(parseFloat(Sa(a,"marginLeft"))||(n.contains(a.ownerDocument,a)?a.getBoundingClientRect().left-Pa(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}):0))+"px":void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+V[d]+b]=f[d]||f[d-2]||f[0];return e}},Na.test(a)||(n.cssHooks[a+b].set=db)}),n.fn.extend({css:function(a,b){return Y(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ra(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return cb(this,!0)},hide:function(){return cb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){W(this)?n(this).show():n(this).hide()})}});function gb(a,b,c,d,e){return new gb.prototype.init(a,b,c,d,e)}n.Tween=gb,gb.prototype={constructor:gb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=gb.propHooks[this.prop];return a&&a.get?a.get(this):gb.propHooks._default.get(this)},run:function(a){var b,c=gb.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):gb.propHooks._default.set(this),this}},gb.prototype.init.prototype=gb.prototype,gb.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},gb.propHooks.scrollTop=gb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=gb.prototype.init,n.fx.step={};var hb,ib,jb=/^(?:toggle|show|hide)$/,kb=/queueHooks$/;function lb(){return a.setTimeout(function(){hb=void 0}),hb=n.now()}function mb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=V[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function nb(a,b,c){for(var d,e=(qb.tweeners[b]||[]).concat(qb.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ob(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&W(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k="none"===j?n._data(a,"olddisplay")||Ma(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==Ma(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],jb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(o))"inline"===("none"===j?Ma(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide()}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b])});for(d in o)g=nb(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function pb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function qb(a,b,c){var d,e,f=0,g=qb.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=hb||lb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:hb||lb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(pb(k,j.opts.specialEasing);g>f;f++)if(d=qb.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,nb,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(qb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return X(c.elem,a,U.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],qb.tweeners[c]=qb.tweeners[c]||[],qb.tweeners[c].unshift(b)},prefilters:[ob],prefilter:function(a,b){b?qb.prefilters.unshift(a):qb.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(W).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=qb(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&kb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(mb(b,!0),a,d,e)}}),n.each({slideDown:mb("show"),slideUp:mb("hide"),slideToggle:mb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(hb=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),hb=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){ib||(ib=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(ib),ib=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a,b=d.createElement("input"),c=d.createElement("div"),e=d.createElement("select"),f=e.appendChild(d.createElement("option"));c=d.createElement("div"),c.setAttribute("className","t"),c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],b.setAttribute("type","checkbox"),c.appendChild(b),a=c.getElementsByTagName("a")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==c.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=f.selected,l.enctype=!!d.createElement("form").enctype,e.disabled=!0,l.optDisabled=!f.disabled,b=d.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value}();var rb=/\r/g,sb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(sb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>-1)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var tb,ub,vb=n.expr.attrHandle,wb=/^(?:checked|selected)$/i,xb=l.getSetAttribute,yb=l.input;n.fn.extend({attr:function(a,b){return Y(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ub:tb)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?yb&&xb||!wb.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(xb?c:d)}}),ub={set:function(a,b,c){return b===!1?n.removeAttr(a,c):yb&&xb||!wb.test(c)?a.setAttribute(!xb&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=vb[b]||n.find.attr;yb&&xb||!wb.test(b)?vb[b]=function(a,b,d){var e,f;return d||(f=vb[b],vb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,vb[b]=f),e}:vb[b]=function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),yb&&xb||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):tb&&tb.set(a,b,c)}}),xb||(tb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},vb.id=vb.name=vb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:tb.set},n.attrHooks.contenteditable={set:function(a,b,c){tb.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var zb=/^(?:input|select|textarea|button|object)$/i,Ab=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return Y(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):zb.test(a.nodeName)||Ab.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var Bb=/[\t\r\n\f]/g;function Cb(a){return n.attr(a,"class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,Cb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,Cb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&n.attr(c,"class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,Cb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=Cb(this),b&&n._data(this,"__className__",b),n.attr(this,"class",b||a===!1?"":n._data(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+Cb(c)+" ").replace(Bb," ").indexOf(b)>-1)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Db=a.location,Eb=n.now(),Fb=/\?/,Gb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(Gb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new a.DOMParser,c=d.parseFromString(b,"text/xml")):(c=new a.ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var Hb=/#.*$/,Ib=/([?&])_=[^&]*/,Jb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Kb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Lb=/^(?:GET|HEAD)$/,Mb=/^\/\//,Nb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ob={},Pb={},Qb="*/".concat("*"),Rb=Db.href,Sb=Nb.exec(Rb.toLowerCase())||[];function Tb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Ub(a,b,c,d){var e={},f=a===Pb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Vb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(!0,a,c),a}function Wb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Xb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Rb,type:"GET",isLocal:Kb.test(Sb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Qb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Vb(Vb(a,n.ajaxSettings),b):Vb(n.ajaxSettings,a)},ajaxPrefilter:Tb(Ob),ajaxTransport:Tb(Pb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var d,e,f,g,h,i,j,k,l=n.ajaxSetup({},c),m=l.context||l,o=l.context&&(m.nodeType||m.jquery)?n(m):n.event,p=n.Deferred(),q=n.Callbacks("once memory"),r=l.statusCode||{},s={},t={},u=0,v="canceled",w={readyState:0,getResponseHeader:function(a){var b;if(2===u){if(!k){k={};while(b=Jb.exec(g))k[b[1].toLowerCase()]=b[2]}b=k[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===u?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return u||(a=t[c]=t[c]||a,s[a]=b),this},overrideMimeType:function(a){return u||(l.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>u)for(b in a)r[b]=[r[b],a[b]];else w.always(a[w.status]);return this},abort:function(a){var b=a||v;return j&&j.abort(b),y(0,b),this}};if(p.promise(w).complete=q.add,w.success=w.done,w.error=w.fail,l.url=((b||l.url||Rb)+"").replace(Hb,"").replace(Mb,Sb[1]+"//"),l.type=c.method||c.type||l.method||l.type,l.dataTypes=n.trim(l.dataType||"*").toLowerCase().match(G)||[""],null==l.crossDomain&&(d=Nb.exec(l.url.toLowerCase()),l.crossDomain=!(!d||d[1]===Sb[1]&&d[2]===Sb[2]&&(d[3]||("http:"===d[1]?"80":"443"))===(Sb[3]||("http:"===Sb[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=n.param(l.data,l.traditional)),Ub(Ob,l,c,w),2===u)return w;i=n.event&&l.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!Lb.test(l.type),f=l.url,l.hasContent||(l.data&&(f=l.url+=(Fb.test(f)?"&":"?")+l.data,delete l.data),l.cache===!1&&(l.url=Ib.test(f)?f.replace(Ib,"$1_="+Eb++):f+(Fb.test(f)?"&":"?")+"_="+Eb++)),l.ifModified&&(n.lastModified[f]&&w.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&w.setRequestHeader("If-None-Match",n.etag[f])),(l.data&&l.hasContent&&l.contentType!==!1||c.contentType)&&w.setRequestHeader("Content-Type",l.contentType),w.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+Qb+"; q=0.01":""):l.accepts["*"]);for(e in l.headers)w.setRequestHeader(e,l.headers[e]);if(l.beforeSend&&(l.beforeSend.call(m,w,l)===!1||2===u))return w.abort();v="abort";for(e in{success:1,error:1,complete:1})w[e](l[e]);if(j=Ub(Pb,l,c,w)){if(w.readyState=1,i&&o.trigger("ajaxSend",[w,l]),2===u)return w;l.async&&l.timeout>0&&(h=a.setTimeout(function(){w.abort("timeout")},l.timeout));try{u=1,j.send(s,y)}catch(x){if(!(2>u))throw x;y(-1,x)}}else y(-1,"No Transport");function y(b,c,d,e){var k,s,t,v,x,y=c;2!==u&&(u=2,h&&a.clearTimeout(h),j=void 0,g=e||"",w.readyState=b>0?4:0,k=b>=200&&300>b||304===b,d&&(v=Wb(l,w,d)),v=Xb(l,v,w,k),k?(l.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(n.lastModified[f]=x),x=w.getResponseHeader("etag"),x&&(n.etag[f]=x)),204===b||"HEAD"===l.type?y="nocontent":304===b?y="notmodified":(y=v.state,s=v.data,t=v.error,k=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),w.status=b,w.statusText=(c||y)+"",k?p.resolveWith(m,[s,y,w]):p.rejectWith(m,[w,y,t]),w.statusCode(r),r=void 0,i&&o.trigger(k?"ajaxSuccess":"ajaxError",[w,l,k?s:t]),q.fireWith(m,[w,y]),i&&(o.trigger("ajaxComplete",[w,l]),--n.active||n.event.trigger("ajaxStop")))}return w},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}});function Yb(a){return a.style&&a.style.display||n.css(a,"display")}function Zb(a){while(a&&1===a.nodeType){if("none"===Yb(a)||"hidden"===a.type)return!0;a=a.parentNode}return!1}n.expr.filters.hidden=function(a){return l.reliableHiddenOffsets()?a.offsetWidth<=0&&a.offsetHeight<=0&&!a.getClientRects().length:Zb(a)},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var $b=/%20/g,_b=/\[\]$/,ac=/\r?\n/g,bc=/^(?:submit|button|image|reset|file)$/i,cc=/^(?:input|select|textarea|keygen)/i;function dc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||_b.test(a)?d(a,e):dc(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)dc(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)dc(c,a[c],b,e);return d.join("&").replace($b,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&cc.test(this.nodeName)&&!bc.test(a)&&(this.checked||!Z.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(ac,"\r\n")}}):{name:b.name,value:c.replace(ac,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return this.isLocal?ic():d.documentMode>8?hc():/^(get|post|head|put|delete|options)$/i.test(this.type)&&hc()||ic()}:hc;var ec=0,fc={},gc=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in fc)fc[a](void 0,!0)}),l.cors=!!gc&&"withCredentials"in gc,gc=l.ajax=!!gc,gc&&n.ajaxTransport(function(b){if(!b.crossDomain||l.cors){var c;return{send:function(d,e){var f,g=b.xhr(),h=++ec;if(g.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(f in b.xhrFields)g[f]=b.xhrFields[f];b.mimeType&&g.overrideMimeType&&g.overrideMimeType(b.mimeType),b.crossDomain||d["X-Requested-With"]||(d["X-Requested-With"]="XMLHttpRequest");for(f in d)void 0!==d[f]&&g.setRequestHeader(f,d[f]+"");g.send(b.hasContent&&b.data||null),c=function(a,d){var f,i,j;if(c&&(d||4===g.readyState))if(delete fc[h],c=void 0,g.onreadystatechange=n.noop,d)4!==g.readyState&&g.abort();else{j={},f=g.status,"string"==typeof g.responseText&&(j.text=g.responseText);try{i=g.statusText}catch(k){i=""}f||!b.isLocal||b.crossDomain?1223===f&&(f=204):f=j.text?200:404}j&&e(f,i,j,g.getAllResponseHeaders())},b.async?4===g.readyState?a.setTimeout(c):g.onreadystatechange=fc[h]=c:c()},abort:function(){c&&c(void 0,!0)}}}});function hc(){try{return new a.XMLHttpRequest}catch(b){}}function ic(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=d.head||n("head")[0]||d.documentElement;return{send:function(e,f){b=d.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||f(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var jc=[],kc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=jc.pop()||n.expando+"_"+Eb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(kc.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&kc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(kc,"$1"+e):b.jsonp!==!1&&(b.url+=(Fb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,jc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ja([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var lc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&lc)return lc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h,a.length)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(g,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function mc(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?("undefined"!=typeof e.getBoundingClientRect&&(d=e.getBoundingClientRect()),c=mc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",!0),c.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-n.css(d,"marginTop",!0),left:b.left-c.left-n.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Qa})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return Y(this,function(a,d,e){var f=mc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ua(l.pixelPosition,function(a,c){
return c?(c=Sa(a,b),Oa.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return Y(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"=="function"&&__webpack_require__(43)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return n}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var nc=a.jQuery,oc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=oc),b&&a.jQuery===n&&(a.jQuery=nc),n},b||(a.jQuery=a.$=n),n});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Swiper 3.4.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: October 16, 2016
 */
!function(){"use strict";function e(e){e.fn.swiper=function(a){var s;return e(this).each(function(){var e=new t(this,a);s||(s=e)}),s}}var a,t=function(e,i){function n(e){return Math.floor(e)}function o(){var e=S.params.autoplay,a=S.slides.eq(S.activeIndex);a.attr("data-swiper-autoplay")&&(e=a.attr("data-swiper-autoplay")||S.params.autoplay),S.autoplayTimeoutId=setTimeout(function(){S.params.loop?(S.fixLoop(),S._slideNext(),S.emit("onAutoplay",S)):S.isEnd?i.autoplayStopOnLast?S.stopAutoplay():(S._slideTo(0),S.emit("onAutoplay",S)):(S._slideNext(),S.emit("onAutoplay",S))},e)}function l(e,t){var s=a(e.target);if(!s.is(t))if("string"==typeof t)s=s.parents(t);else if(t.nodeType){var i;return s.parents().each(function(e,a){a===t&&(i=t)}),i?t:void 0}if(0!==s.length)return s[0]}function p(e,a){a=a||{};var t=window.MutationObserver||window.WebkitMutationObserver,s=new t(function(e){e.forEach(function(e){S.onResize(!0),S.emit("onObserverUpdate",S,e)})});s.observe(e,{attributes:"undefined"==typeof a.attributes||a.attributes,childList:"undefined"==typeof a.childList||a.childList,characterData:"undefined"==typeof a.characterData||a.characterData}),S.observers.push(s)}function d(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!S.params.allowSwipeToNext&&(S.isHorizontal()&&39===a||!S.isHorizontal()&&40===a))return!1;if(!S.params.allowSwipeToPrev&&(S.isHorizontal()&&37===a||!S.isHorizontal()&&38===a))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var t=!1;if(S.container.parents("."+S.params.slideClass).length>0&&0===S.container.parents("."+S.params.slideActiveClass).length)return;var s={left:window.pageXOffset,top:window.pageYOffset},i=window.innerWidth,r=window.innerHeight,n=S.container.offset();S.rtl&&(n.left=n.left-S.container[0].scrollLeft);for(var o=[[n.left,n.top],[n.left+S.width,n.top],[n.left,n.top+S.height],[n.left+S.width,n.top+S.height]],l=0;l<o.length;l++){var p=o[l];p[0]>=s.left&&p[0]<=s.left+i&&p[1]>=s.top&&p[1]<=s.top+r&&(t=!0)}if(!t)return}S.isHorizontal()?(37!==a&&39!==a||(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===a&&!S.rtl||37===a&&S.rtl)&&S.slideNext(),(37===a&&!S.rtl||39===a&&S.rtl)&&S.slidePrev()):(38!==a&&40!==a||(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&S.slideNext(),38===a&&S.slidePrev())}}function u(){var e="onwheel",a=e in document;if(!a){var t=document.createElement("div");t.setAttribute(e,"return;"),a="function"==typeof t[e]}return!a&&document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("","")!==!0&&(a=document.implementation.hasFeature("Events.wheel","3.0")),a}function c(e){e.originalEvent&&(e=e.originalEvent);var a=0,t=S.rtl?-1:1,s=m(e);if(S.params.mousewheelForceToAxis)if(S.isHorizontal()){if(!(Math.abs(s.pixelX)>Math.abs(s.pixelY)))return;a=s.pixelX*t}else{if(!(Math.abs(s.pixelY)>Math.abs(s.pixelX)))return;a=s.pixelY}else a=Math.abs(s.pixelX)>Math.abs(s.pixelY)?-s.pixelX*t:-s.pixelY;if(0!==a){if(S.params.mousewheelInvert&&(a=-a),S.params.freeMode){var i=S.getWrapperTranslate()+a*S.params.mousewheelSensitivity,r=S.isBeginning,n=S.isEnd;if(i>=S.minTranslate()&&(i=S.minTranslate()),i<=S.maxTranslate()&&(i=S.maxTranslate()),S.setWrapperTransition(0),S.setWrapperTranslate(i),S.updateProgress(),S.updateActiveIndex(),(!r&&S.isBeginning||!n&&S.isEnd)&&S.updateClasses(),S.params.freeModeSticky?(clearTimeout(S.mousewheel.timeout),S.mousewheel.timeout=setTimeout(function(){S.slideReset()},300)):S.params.lazyLoading&&S.lazy&&S.lazy.load(),S.emit("onScroll",S,e),S.params.autoplay&&S.params.autoplayDisableOnInteraction&&S.stopAutoplay(),0===i||i===S.maxTranslate())return}else{if((new window.Date).getTime()-S.mousewheel.lastScrollTime>60)if(a<0)if(S.isEnd&&!S.params.loop||S.animating){if(S.params.mousewheelReleaseOnEdges)return!0}else S.slideNext(),S.emit("onScroll",S,e);else if(S.isBeginning&&!S.params.loop||S.animating){if(S.params.mousewheelReleaseOnEdges)return!0}else S.slidePrev(),S.emit("onScroll",S,e);S.mousewheel.lastScrollTime=(new window.Date).getTime()}return e.preventDefault?e.preventDefault():e.returnValue=!1,!1}}function m(e){var a=10,t=40,s=800,i=0,r=0,n=0,o=0;return"detail"in e&&(r=e.detail),"wheelDelta"in e&&(r=-e.wheelDelta/120),"wheelDeltaY"in e&&(r=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(i=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(i=r,r=0),n=i*a,o=r*a,"deltaY"in e&&(o=e.deltaY),"deltaX"in e&&(n=e.deltaX),(n||o)&&e.deltaMode&&(1===e.deltaMode?(n*=t,o*=t):(n*=s,o*=s)),n&&!i&&(i=n<1?-1:1),o&&!r&&(r=o<1?-1:1),{spinX:i,spinY:r,pixelX:n,pixelY:o}}function h(e,t){e=a(e);var s,i,r,n=S.rtl?-1:1;s=e.attr("data-swiper-parallax")||"0",i=e.attr("data-swiper-parallax-x"),r=e.attr("data-swiper-parallax-y"),i||r?(i=i||"0",r=r||"0"):S.isHorizontal()?(i=s,r="0"):(r=s,i="0"),i=i.indexOf("%")>=0?parseInt(i,10)*t*n+"%":i*t*n+"px",r=r.indexOf("%")>=0?parseInt(r,10)*t+"%":r*t+"px",e.transform("translate3d("+i+", "+r+",0px)")}function g(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof t))return new t(e,i);var f={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,iOSEdgeSwipeDetection:!1,iOSEdgeSwipeThreshold:20,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},flip:{slideShadows:!0,limitRotation:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,zoom:!1,zoomMax:3,zoomMin:1,zoomToggle:!0,scrollbar:null,scrollbarHide:!0,scrollbarDraggable:!1,scrollbarSnapOnRelease:!1,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,mousewheelSensitivity:1,mousewheelEventsTarged:"container",hashnav:!1,hashnavWatchState:!1,history:!1,replaceState:!1,breakpoints:void 0,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,touchReleaseOnEdges:!1,uniqueNavElements:!0,pagination:null,paginationElement:"span",paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,paginationProgressRender:null,paginationFractionRender:null,paginationCustomRender:null,paginationType:"bullets",resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingInPrevNextAmount:1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,controlBy:"slide",normalizeSlideIndex:!0,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",passiveListeners:!0,containerModifierClass:"swiper-container-",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationCurrentClass:"swiper-pagination-current",paginationTotalClass:"swiper-pagination-total",paginationHiddenClass:"swiper-pagination-hidden",paginationProgressbarClass:"swiper-pagination-progressbar",paginationClickableClass:"swiper-pagination-clickable",paginationModifierClass:"swiper-pagination-",lazyLoadingClass:"swiper-lazy",lazyStatusLoadingClass:"swiper-lazy-loading",lazyStatusLoadedClass:"swiper-lazy-loaded",lazyPreloaderClass:"swiper-lazy-preloader",notificationClass:"swiper-notification",preloaderClass:"preloader",zoomContainerClass:"swiper-zoom-container",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",runCallbacksOnInit:!0},v=i&&i.virtualTranslate;i=i||{};var w={};for(var y in i)if("object"!=typeof i[y]||null===i[y]||(i[y].nodeType||i[y]===window||i[y]===document||"undefined"!=typeof s&&i[y]instanceof s||"undefined"!=typeof jQuery&&i[y]instanceof jQuery))w[y]=i[y];else{w[y]={};for(var x in i[y])w[y][x]=i[y][x]}for(var T in f)if("undefined"==typeof i[T])i[T]=f[T];else if("object"==typeof i[T])for(var b in f[T])"undefined"==typeof i[T][b]&&(i[T][b]=f[T][b]);var S=this;if(S.params=i,S.originalParams=w,S.classNames=[],"undefined"!=typeof a&&"undefined"!=typeof s&&(a=s),("undefined"!=typeof a||(a="undefined"==typeof s?window.Dom7||window.Zepto||window.jQuery:s))&&(S.$=a,S.currentBreakpoint=void 0,S.getActiveBreakpoint=function(){if(!S.params.breakpoints)return!1;var e,a=!1,t=[];for(e in S.params.breakpoints)S.params.breakpoints.hasOwnProperty(e)&&t.push(e);t.sort(function(e,a){return parseInt(e,10)>parseInt(a,10)});for(var s=0;s<t.length;s++)e=t[s],e>=window.innerWidth&&!a&&(a=e);return a||"max"},S.setBreakpoint=function(){var e=S.getActiveBreakpoint();if(e&&S.currentBreakpoint!==e){var a=e in S.params.breakpoints?S.params.breakpoints[e]:S.originalParams,t=S.params.loop&&a.slidesPerView!==S.params.slidesPerView;for(var s in a)S.params[s]=a[s];S.currentBreakpoint=e,t&&S.destroyLoop&&S.reLoop(!0)}},S.params.breakpoints&&S.setBreakpoint(),S.container=a(e),0!==S.container.length)){if(S.container.length>1){var C=[];return S.container.each(function(){C.push(new t(this,i))}),C}S.container[0].swiper=S,S.container.data("swiper",S),S.classNames.push(S.params.containerModifierClass+S.params.direction),S.params.freeMode&&S.classNames.push(S.params.containerModifierClass+"free-mode"),S.support.flexbox||(S.classNames.push(S.params.containerModifierClass+"no-flexbox"),S.params.slidesPerColumn=1),S.params.autoHeight&&S.classNames.push(S.params.containerModifierClass+"autoheight"),(S.params.parallax||S.params.watchSlidesVisibility)&&(S.params.watchSlidesProgress=!0),S.params.touchReleaseOnEdges&&(S.params.resistanceRatio=0),["cube","coverflow","flip"].indexOf(S.params.effect)>=0&&(S.support.transforms3d?(S.params.watchSlidesProgress=!0,S.classNames.push(S.params.containerModifierClass+"3d")):S.params.effect="slide"),"slide"!==S.params.effect&&S.classNames.push(S.params.containerModifierClass+S.params.effect),"cube"===S.params.effect&&(S.params.resistanceRatio=0,S.params.slidesPerView=1,S.params.slidesPerColumn=1,S.params.slidesPerGroup=1,S.params.centeredSlides=!1,S.params.spaceBetween=0,S.params.virtualTranslate=!0,S.params.setWrapperSize=!1),"fade"!==S.params.effect&&"flip"!==S.params.effect||(S.params.slidesPerView=1,S.params.slidesPerColumn=1,S.params.slidesPerGroup=1,S.params.watchSlidesProgress=!0,S.params.spaceBetween=0,S.params.setWrapperSize=!1,"undefined"==typeof v&&(S.params.virtualTranslate=!0)),S.params.grabCursor&&S.support.touch&&(S.params.grabCursor=!1),S.wrapper=S.container.children("."+S.params.wrapperClass),S.params.pagination&&(S.paginationContainer=a(S.params.pagination),S.params.uniqueNavElements&&"string"==typeof S.params.pagination&&S.paginationContainer.length>1&&1===S.container.find(S.params.pagination).length&&(S.paginationContainer=S.container.find(S.params.pagination)),"bullets"===S.params.paginationType&&S.params.paginationClickable?S.paginationContainer.addClass(S.params.paginationModifierClass+"clickable"):S.params.paginationClickable=!1,S.paginationContainer.addClass(S.params.paginationModifierClass+S.params.paginationType)),(S.params.nextButton||S.params.prevButton)&&(S.params.nextButton&&(S.nextButton=a(S.params.nextButton),S.params.uniqueNavElements&&"string"==typeof S.params.nextButton&&S.nextButton.length>1&&1===S.container.find(S.params.nextButton).length&&(S.nextButton=S.container.find(S.params.nextButton))),S.params.prevButton&&(S.prevButton=a(S.params.prevButton),S.params.uniqueNavElements&&"string"==typeof S.params.prevButton&&S.prevButton.length>1&&1===S.container.find(S.params.prevButton).length&&(S.prevButton=S.container.find(S.params.prevButton)))),S.isHorizontal=function(){return"horizontal"===S.params.direction},S.rtl=S.isHorizontal()&&("rtl"===S.container[0].dir.toLowerCase()||"rtl"===S.container.css("direction")),S.rtl&&S.classNames.push(S.params.containerModifierClass+"rtl"),S.rtl&&(S.wrongRTL="-webkit-box"===S.wrapper.css("display")),S.params.slidesPerColumn>1&&S.classNames.push(S.params.containerModifierClass+"multirow"),S.device.android&&S.classNames.push(S.params.containerModifierClass+"android"),S.container.addClass(S.classNames.join(" ")),S.translate=0,S.progress=0,S.velocity=0,S.lockSwipeToNext=function(){S.params.allowSwipeToNext=!1,S.params.allowSwipeToPrev===!1&&S.params.grabCursor&&S.unsetGrabCursor()},S.lockSwipeToPrev=function(){S.params.allowSwipeToPrev=!1,S.params.allowSwipeToNext===!1&&S.params.grabCursor&&S.unsetGrabCursor()},S.lockSwipes=function(){S.params.allowSwipeToNext=S.params.allowSwipeToPrev=!1,S.params.grabCursor&&S.unsetGrabCursor()},S.unlockSwipeToNext=function(){S.params.allowSwipeToNext=!0,S.params.allowSwipeToPrev===!0&&S.params.grabCursor&&S.setGrabCursor()},S.unlockSwipeToPrev=function(){S.params.allowSwipeToPrev=!0,S.params.allowSwipeToNext===!0&&S.params.grabCursor&&S.setGrabCursor()},S.unlockSwipes=function(){S.params.allowSwipeToNext=S.params.allowSwipeToPrev=!0,S.params.grabCursor&&S.setGrabCursor()},S.setGrabCursor=function(e){S.container[0].style.cursor="move",S.container[0].style.cursor=e?"-webkit-grabbing":"-webkit-grab",S.container[0].style.cursor=e?"-moz-grabbin":"-moz-grab",S.container[0].style.cursor=e?"grabbing":"grab"},S.unsetGrabCursor=function(){S.container[0].style.cursor=""},S.params.grabCursor&&S.setGrabCursor(),S.imagesToLoad=[],S.imagesLoaded=0,S.loadImage=function(e,a,t,s,i,r){function n(){r&&r()}var o;e.complete&&i?n():a?(o=new window.Image,o.onload=n,o.onerror=n,s&&(o.sizes=s),t&&(o.srcset=t),a&&(o.src=a)):n()},S.preloadImages=function(){function e(){"undefined"!=typeof S&&null!==S&&(void 0!==S.imagesLoaded&&S.imagesLoaded++,S.imagesLoaded===S.imagesToLoad.length&&(S.params.updateOnImagesReady&&S.update(),S.emit("onImagesReady",S)))}S.imagesToLoad=S.container.find("img");for(var a=0;a<S.imagesToLoad.length;a++)S.loadImage(S.imagesToLoad[a],S.imagesToLoad[a].currentSrc||S.imagesToLoad[a].getAttribute("src"),S.imagesToLoad[a].srcset||S.imagesToLoad[a].getAttribute("srcset"),S.imagesToLoad[a].sizes||S.imagesToLoad[a].getAttribute("sizes"),!0,e)},S.autoplayTimeoutId=void 0,S.autoplaying=!1,S.autoplayPaused=!1,S.startAutoplay=function(){return"undefined"==typeof S.autoplayTimeoutId&&(!!S.params.autoplay&&(!S.autoplaying&&(S.autoplaying=!0,S.emit("onAutoplayStart",S),void o())))},S.stopAutoplay=function(e){S.autoplayTimeoutId&&(S.autoplayTimeoutId&&clearTimeout(S.autoplayTimeoutId),S.autoplaying=!1,S.autoplayTimeoutId=void 0,S.emit("onAutoplayStop",S))},S.pauseAutoplay=function(e){S.autoplayPaused||(S.autoplayTimeoutId&&clearTimeout(S.autoplayTimeoutId),S.autoplayPaused=!0,0===e?(S.autoplayPaused=!1,o()):S.wrapper.transitionEnd(function(){S&&(S.autoplayPaused=!1,S.autoplaying?o():S.stopAutoplay())}))},S.minTranslate=function(){return-S.snapGrid[0]},S.maxTranslate=function(){return-S.snapGrid[S.snapGrid.length-1]},S.updateAutoHeight=function(){var e=[],a=0;if("auto"!==S.params.slidesPerView&&S.params.slidesPerView>1)for(r=0;r<Math.ceil(S.params.slidesPerView);r++){var t=S.activeIndex+r;if(t>S.slides.length)break;e.push(S.slides.eq(t)[0])}else e.push(S.slides.eq(S.activeIndex)[0]);for(r=0;r<e.length;r++)if("undefined"!=typeof e[r]){var s=e[r].offsetHeight;a=s>a?s:a}a&&S.wrapper.css("height",a+"px")},S.updateContainerSize=function(){var e,a;e="undefined"!=typeof S.params.width?S.params.width:S.container[0].clientWidth,a="undefined"!=typeof S.params.height?S.params.height:S.container[0].clientHeight,0===e&&S.isHorizontal()||0===a&&!S.isHorizontal()||(e=e-parseInt(S.container.css("padding-left"),10)-parseInt(S.container.css("padding-right"),10),a=a-parseInt(S.container.css("padding-top"),10)-parseInt(S.container.css("padding-bottom"),10),S.width=e,S.height=a,S.size=S.isHorizontal()?S.width:S.height)},S.updateSlidesSize=function(){S.slides=S.wrapper.children("."+S.params.slideClass),S.snapGrid=[],S.slidesGrid=[],S.slidesSizesGrid=[];var e,a=S.params.spaceBetween,t=-S.params.slidesOffsetBefore,s=0,i=0;if("undefined"!=typeof S.size){"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*S.size),S.virtualSize=-a,S.rtl?S.slides.css({marginLeft:"",marginTop:""}):S.slides.css({marginRight:"",marginBottom:""});var r;S.params.slidesPerColumn>1&&(r=Math.floor(S.slides.length/S.params.slidesPerColumn)===S.slides.length/S.params.slidesPerColumn?S.slides.length:Math.ceil(S.slides.length/S.params.slidesPerColumn)*S.params.slidesPerColumn,"auto"!==S.params.slidesPerView&&"row"===S.params.slidesPerColumnFill&&(r=Math.max(r,S.params.slidesPerView*S.params.slidesPerColumn)));var o,l=S.params.slidesPerColumn,p=r/l,d=p-(S.params.slidesPerColumn*p-S.slides.length);for(e=0;e<S.slides.length;e++){o=0;var u=S.slides.eq(e);if(S.params.slidesPerColumn>1){var c,m,h;"column"===S.params.slidesPerColumnFill?(m=Math.floor(e/l),h=e-m*l,(m>d||m===d&&h===l-1)&&++h>=l&&(h=0,m++),c=m+h*r/l,u.css({"-webkit-box-ordinal-group":c,"-moz-box-ordinal-group":c,"-ms-flex-order":c,"-webkit-order":c,order:c})):(h=Math.floor(e/p),m=e-h*p),u.css("margin-"+(S.isHorizontal()?"top":"left"),0!==h&&S.params.spaceBetween&&S.params.spaceBetween+"px").attr("data-swiper-column",m).attr("data-swiper-row",h)}"none"!==u.css("display")&&("auto"===S.params.slidesPerView?(o=S.isHorizontal()?u.outerWidth(!0):u.outerHeight(!0),S.params.roundLengths&&(o=n(o))):(o=(S.size-(S.params.slidesPerView-1)*a)/S.params.slidesPerView,S.params.roundLengths&&(o=n(o)),S.isHorizontal()?S.slides[e].style.width=o+"px":S.slides[e].style.height=o+"px"),S.slides[e].swiperSlideSize=o,S.slidesSizesGrid.push(o),S.params.centeredSlides?(t=t+o/2+s/2+a,0===e&&(t=t-S.size/2-a),Math.abs(t)<.001&&(t=0),i%S.params.slidesPerGroup===0&&S.snapGrid.push(t),S.slidesGrid.push(t)):(i%S.params.slidesPerGroup===0&&S.snapGrid.push(t),S.slidesGrid.push(t),t=t+o+a),S.virtualSize+=o+a,s=o,i++)}S.virtualSize=Math.max(S.virtualSize,S.size)+S.params.slidesOffsetAfter;var g;if(S.rtl&&S.wrongRTL&&("slide"===S.params.effect||"coverflow"===S.params.effect)&&S.wrapper.css({width:S.virtualSize+S.params.spaceBetween+"px"}),S.support.flexbox&&!S.params.setWrapperSize||(S.isHorizontal()?S.wrapper.css({width:S.virtualSize+S.params.spaceBetween+"px"}):S.wrapper.css({height:S.virtualSize+S.params.spaceBetween+"px"})),S.params.slidesPerColumn>1&&(S.virtualSize=(o+S.params.spaceBetween)*r,S.virtualSize=Math.ceil(S.virtualSize/S.params.slidesPerColumn)-S.params.spaceBetween,S.isHorizontal()?S.wrapper.css({width:S.virtualSize+S.params.spaceBetween+"px"}):S.wrapper.css({height:S.virtualSize+S.params.spaceBetween+"px"}),S.params.centeredSlides)){for(g=[],e=0;e<S.snapGrid.length;e++)S.snapGrid[e]<S.virtualSize+S.snapGrid[0]&&g.push(S.snapGrid[e]);S.snapGrid=g}if(!S.params.centeredSlides){for(g=[],e=0;e<S.snapGrid.length;e++)S.snapGrid[e]<=S.virtualSize-S.size&&g.push(S.snapGrid[e]);S.snapGrid=g,Math.floor(S.virtualSize-S.size)-Math.floor(S.snapGrid[S.snapGrid.length-1])>1&&S.snapGrid.push(S.virtualSize-S.size)}0===S.snapGrid.length&&(S.snapGrid=[0]),0!==S.params.spaceBetween&&(S.isHorizontal()?S.rtl?S.slides.css({marginLeft:a+"px"}):S.slides.css({marginRight:a+"px"}):S.slides.css({marginBottom:a+"px"})),S.params.watchSlidesProgress&&S.updateSlidesOffset()}},S.updateSlidesOffset=function(){for(var e=0;e<S.slides.length;e++)S.slides[e].swiperSlideOffset=S.isHorizontal()?S.slides[e].offsetLeft:S.slides[e].offsetTop},S.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=S.translate||0),0!==S.slides.length){"undefined"==typeof S.slides[0].swiperSlideOffset&&S.updateSlidesOffset();var a=-e;S.rtl&&(a=e),S.slides.removeClass(S.params.slideVisibleClass);for(var t=0;t<S.slides.length;t++){var s=S.slides[t],i=(a+(S.params.centeredSlides?S.minTranslate():0)-s.swiperSlideOffset)/(s.swiperSlideSize+S.params.spaceBetween);if(S.params.watchSlidesVisibility){var r=-(a-s.swiperSlideOffset),n=r+S.slidesSizesGrid[t],o=r>=0&&r<S.size||n>0&&n<=S.size||r<=0&&n>=S.size;o&&S.slides.eq(t).addClass(S.params.slideVisibleClass)}s.progress=S.rtl?-i:i}}},S.updateProgress=function(e){"undefined"==typeof e&&(e=S.translate||0);var a=S.maxTranslate()-S.minTranslate(),t=S.isBeginning,s=S.isEnd;0===a?(S.progress=0,S.isBeginning=S.isEnd=!0):(S.progress=(e-S.minTranslate())/a,S.isBeginning=S.progress<=0,S.isEnd=S.progress>=1),S.isBeginning&&!t&&S.emit("onReachBeginning",S),S.isEnd&&!s&&S.emit("onReachEnd",S),S.params.watchSlidesProgress&&S.updateSlidesProgress(e),S.emit("onProgress",S,S.progress)},S.updateActiveIndex=function(){var e,a,t,s=S.rtl?S.translate:-S.translate;for(a=0;a<S.slidesGrid.length;a++)"undefined"!=typeof S.slidesGrid[a+1]?s>=S.slidesGrid[a]&&s<S.slidesGrid[a+1]-(S.slidesGrid[a+1]-S.slidesGrid[a])/2?e=a:s>=S.slidesGrid[a]&&s<S.slidesGrid[a+1]&&(e=a+1):s>=S.slidesGrid[a]&&(e=a);S.params.normalizeSlideIndex&&(e<0||"undefined"==typeof e)&&(e=0),t=Math.floor(e/S.params.slidesPerGroup),t>=S.snapGrid.length&&(t=S.snapGrid.length-1),e!==S.activeIndex&&(S.snapIndex=t,S.previousIndex=S.activeIndex,S.activeIndex=e,S.updateClasses(),S.updateRealIndex())},S.updateRealIndex=function(){S.realIndex=S.slides.eq(S.activeIndex).attr("data-swiper-slide-index")||S.activeIndex},S.updateClasses=function(){S.slides.removeClass(S.params.slideActiveClass+" "+S.params.slideNextClass+" "+S.params.slidePrevClass+" "+S.params.slideDuplicateActiveClass+" "+S.params.slideDuplicateNextClass+" "+S.params.slideDuplicatePrevClass);var e=S.slides.eq(S.activeIndex);e.addClass(S.params.slideActiveClass),i.loop&&(e.hasClass(S.params.slideDuplicateClass)?S.wrapper.children("."+S.params.slideClass+":not(."+S.params.slideDuplicateClass+')[data-swiper-slide-index="'+S.realIndex+'"]').addClass(S.params.slideDuplicateActiveClass):S.wrapper.children("."+S.params.slideClass+"."+S.params.slideDuplicateClass+'[data-swiper-slide-index="'+S.realIndex+'"]').addClass(S.params.slideDuplicateActiveClass));var t=e.next("."+S.params.slideClass).addClass(S.params.slideNextClass);S.params.loop&&0===t.length&&(t=S.slides.eq(0),t.addClass(S.params.slideNextClass));var s=e.prev("."+S.params.slideClass).addClass(S.params.slidePrevClass);if(S.params.loop&&0===s.length&&(s=S.slides.eq(-1),s.addClass(S.params.slidePrevClass)),i.loop&&(t.hasClass(S.params.slideDuplicateClass)?S.wrapper.children("."+S.params.slideClass+":not(."+S.params.slideDuplicateClass+')[data-swiper-slide-index="'+t.attr("data-swiper-slide-index")+'"]').addClass(S.params.slideDuplicateNextClass):S.wrapper.children("."+S.params.slideClass+"."+S.params.slideDuplicateClass+'[data-swiper-slide-index="'+t.attr("data-swiper-slide-index")+'"]').addClass(S.params.slideDuplicateNextClass),s.hasClass(S.params.slideDuplicateClass)?S.wrapper.children("."+S.params.slideClass+":not(."+S.params.slideDuplicateClass+')[data-swiper-slide-index="'+s.attr("data-swiper-slide-index")+'"]').addClass(S.params.slideDuplicatePrevClass):S.wrapper.children("."+S.params.slideClass+"."+S.params.slideDuplicateClass+'[data-swiper-slide-index="'+s.attr("data-swiper-slide-index")+'"]').addClass(S.params.slideDuplicatePrevClass)),S.paginationContainer&&S.paginationContainer.length>0){var r,n=S.params.loop?Math.ceil((S.slides.length-2*S.loopedSlides)/S.params.slidesPerGroup):S.snapGrid.length;if(S.params.loop?(r=Math.ceil((S.activeIndex-S.loopedSlides)/S.params.slidesPerGroup),r>S.slides.length-1-2*S.loopedSlides&&(r-=S.slides.length-2*S.loopedSlides),r>n-1&&(r-=n),r<0&&"bullets"!==S.params.paginationType&&(r=n+r)):r="undefined"!=typeof S.snapIndex?S.snapIndex:S.activeIndex||0,"bullets"===S.params.paginationType&&S.bullets&&S.bullets.length>0&&(S.bullets.removeClass(S.params.bulletActiveClass),S.paginationContainer.length>1?S.bullets.each(function(){a(this).index()===r&&a(this).addClass(S.params.bulletActiveClass)}):S.bullets.eq(r).addClass(S.params.bulletActiveClass)),"fraction"===S.params.paginationType&&(S.paginationContainer.find("."+S.params.paginationCurrentClass).text(r+1),S.paginationContainer.find("."+S.params.paginationTotalClass).text(n)),"progress"===S.params.paginationType){var o=(r+1)/n,l=o,p=1;S.isHorizontal()||(p=o,l=1),S.paginationContainer.find("."+S.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX("+l+") scaleY("+p+")").transition(S.params.speed)}"custom"===S.params.paginationType&&S.params.paginationCustomRender&&(S.paginationContainer.html(S.params.paginationCustomRender(S,r+1,n)),S.emit("onPaginationRendered",S,S.paginationContainer[0]))}S.params.loop||(S.params.prevButton&&S.prevButton&&S.prevButton.length>0&&(S.isBeginning?(S.prevButton.addClass(S.params.buttonDisabledClass),S.params.a11y&&S.a11y&&S.a11y.disable(S.prevButton)):(S.prevButton.removeClass(S.params.buttonDisabledClass),S.params.a11y&&S.a11y&&S.a11y.enable(S.prevButton))),S.params.nextButton&&S.nextButton&&S.nextButton.length>0&&(S.isEnd?(S.nextButton.addClass(S.params.buttonDisabledClass),S.params.a11y&&S.a11y&&S.a11y.disable(S.nextButton)):(S.nextButton.removeClass(S.params.buttonDisabledClass),S.params.a11y&&S.a11y&&S.a11y.enable(S.nextButton))))},S.updatePagination=function(){if(S.params.pagination&&S.paginationContainer&&S.paginationContainer.length>0){var e="";if("bullets"===S.params.paginationType){for(var a=S.params.loop?Math.ceil((S.slides.length-2*S.loopedSlides)/S.params.slidesPerGroup):S.snapGrid.length,t=0;t<a;t++)e+=S.params.paginationBulletRender?S.params.paginationBulletRender(S,t,S.params.bulletClass):"<"+S.params.paginationElement+' class="'+S.params.bulletClass+'"></'+S.params.paginationElement+">";S.paginationContainer.html(e),S.bullets=S.paginationContainer.find("."+S.params.bulletClass),S.params.paginationClickable&&S.params.a11y&&S.a11y&&S.a11y.initPagination()}"fraction"===S.params.paginationType&&(e=S.params.paginationFractionRender?S.params.paginationFractionRender(S,S.params.paginationCurrentClass,S.params.paginationTotalClass):'<span class="'+S.params.paginationCurrentClass+'"></span> / <span class="'+S.params.paginationTotalClass+'"></span>',S.paginationContainer.html(e)),"progress"===S.params.paginationType&&(e=S.params.paginationProgressRender?S.params.paginationProgressRender(S,S.params.paginationProgressbarClass):'<span class="'+S.params.paginationProgressbarClass+'"></span>',S.paginationContainer.html(e)),"custom"!==S.params.paginationType&&S.emit("onPaginationRendered",S,S.paginationContainer[0])}},S.update=function(e){function a(){S.rtl?-S.translate:S.translate;s=Math.min(Math.max(S.translate,S.maxTranslate()),S.minTranslate()),S.setWrapperTranslate(s),S.updateActiveIndex(),S.updateClasses()}if(S.updateContainerSize(),S.updateSlidesSize(),S.updateProgress(),S.updatePagination(),S.updateClasses(),S.params.scrollbar&&S.scrollbar&&S.scrollbar.set(),e){var t,s;S.controller&&S.controller.spline&&(S.controller.spline=void 0),S.params.freeMode?(a(),S.params.autoHeight&&S.updateAutoHeight()):(t=("auto"===S.params.slidesPerView||S.params.slidesPerView>1)&&S.isEnd&&!S.params.centeredSlides?S.slideTo(S.slides.length-1,0,!1,!0):S.slideTo(S.activeIndex,0,!1,!0),t||a())}else S.params.autoHeight&&S.updateAutoHeight()},S.onResize=function(e){S.params.breakpoints&&S.setBreakpoint();var a=S.params.allowSwipeToPrev,t=S.params.allowSwipeToNext;S.params.allowSwipeToPrev=S.params.allowSwipeToNext=!0,S.updateContainerSize(),S.updateSlidesSize(),("auto"===S.params.slidesPerView||S.params.freeMode||e)&&S.updatePagination(),S.params.scrollbar&&S.scrollbar&&S.scrollbar.set(),S.controller&&S.controller.spline&&(S.controller.spline=void 0);var s=!1;if(S.params.freeMode){var i=Math.min(Math.max(S.translate,S.maxTranslate()),S.minTranslate());S.setWrapperTranslate(i),S.updateActiveIndex(),S.updateClasses(),S.params.autoHeight&&S.updateAutoHeight()}else S.updateClasses(),s=("auto"===S.params.slidesPerView||S.params.slidesPerView>1)&&S.isEnd&&!S.params.centeredSlides?S.slideTo(S.slides.length-1,0,!1,!0):S.slideTo(S.activeIndex,0,!1,!0);S.params.lazyLoading&&!s&&S.lazy&&S.lazy.load(),S.params.allowSwipeToPrev=a,S.params.allowSwipeToNext=t},S.touchEventsDesktop={start:"mousedown",move:"mousemove",end:"mouseup"},window.navigator.pointerEnabled?S.touchEventsDesktop={start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled&&(S.touchEventsDesktop={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}),S.touchEvents={start:S.support.touch||!S.params.simulateTouch?"touchstart":S.touchEventsDesktop.start,move:S.support.touch||!S.params.simulateTouch?"touchmove":S.touchEventsDesktop.move,end:S.support.touch||!S.params.simulateTouch?"touchend":S.touchEventsDesktop.end},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===S.params.touchEventsTarget?S.container:S.wrapper).addClass("swiper-wp8-"+S.params.direction),S.initEvents=function(e){var a=e?"off":"on",t=e?"removeEventListener":"addEventListener",s="container"===S.params.touchEventsTarget?S.container[0]:S.wrapper[0],r=S.support.touch?s:document,n=!!S.params.nested;if(S.browser.ie)s[t](S.touchEvents.start,S.onTouchStart,!1),r[t](S.touchEvents.move,S.onTouchMove,n),r[t](S.touchEvents.end,S.onTouchEnd,!1);else{if(S.support.touch){var o=!("touchstart"!==S.touchEvents.start||!S.support.passiveListener||!S.params.passiveListeners)&&{passive:!0,capture:!1};s[t](S.touchEvents.start,S.onTouchStart,o),s[t](S.touchEvents.move,S.onTouchMove,n),s[t](S.touchEvents.end,S.onTouchEnd,o)}(i.simulateTouch&&!S.device.ios&&!S.device.android||i.simulateTouch&&!S.support.touch&&S.device.ios)&&(s[t]("mousedown",S.onTouchStart,!1),document[t]("mousemove",S.onTouchMove,n),document[t]("mouseup",S.onTouchEnd,!1))}window[t]("resize",S.onResize),S.params.nextButton&&S.nextButton&&S.nextButton.length>0&&(S.nextButton[a]("click",S.onClickNext),S.params.a11y&&S.a11y&&S.nextButton[a]("keydown",S.a11y.onEnterKey)),S.params.prevButton&&S.prevButton&&S.prevButton.length>0&&(S.prevButton[a]("click",S.onClickPrev),S.params.a11y&&S.a11y&&S.prevButton[a]("keydown",S.a11y.onEnterKey)),S.params.pagination&&S.params.paginationClickable&&(S.paginationContainer[a]("click","."+S.params.bulletClass,S.onClickIndex),S.params.a11y&&S.a11y&&S.paginationContainer[a]("keydown","."+S.params.bulletClass,S.a11y.onEnterKey)),(S.params.preventClicks||S.params.preventClicksPropagation)&&s[t]("click",S.preventClicks,!0)},S.attachEvents=function(){S.initEvents()},S.detachEvents=function(){S.initEvents(!0)},S.allowClick=!0,S.preventClicks=function(e){S.allowClick||(S.params.preventClicks&&e.preventDefault(),S.params.preventClicksPropagation&&S.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},S.onClickNext=function(e){e.preventDefault(),S.isEnd&&!S.params.loop||S.slideNext()},S.onClickPrev=function(e){e.preventDefault(),S.isBeginning&&!S.params.loop||S.slidePrev()},S.onClickIndex=function(e){
e.preventDefault();var t=a(this).index()*S.params.slidesPerGroup;S.params.loop&&(t+=S.loopedSlides),S.slideTo(t)},S.updateClickedSlide=function(e){var t=l(e,"."+S.params.slideClass),s=!1;if(t)for(var i=0;i<S.slides.length;i++)S.slides[i]===t&&(s=!0);if(!t||!s)return S.clickedSlide=void 0,void(S.clickedIndex=void 0);if(S.clickedSlide=t,S.clickedIndex=a(t).index(),S.params.slideToClickedSlide&&void 0!==S.clickedIndex&&S.clickedIndex!==S.activeIndex){var r,n=S.clickedIndex;if(S.params.loop){if(S.animating)return;r=a(S.clickedSlide).attr("data-swiper-slide-index"),S.params.centeredSlides?n<S.loopedSlides-S.params.slidesPerView/2||n>S.slides.length-S.loopedSlides+S.params.slidesPerView/2?(S.fixLoop(),n=S.wrapper.children("."+S.params.slideClass+'[data-swiper-slide-index="'+r+'"]:not(.'+S.params.slideDuplicateClass+")").eq(0).index(),setTimeout(function(){S.slideTo(n)},0)):S.slideTo(n):n>S.slides.length-S.params.slidesPerView?(S.fixLoop(),n=S.wrapper.children("."+S.params.slideClass+'[data-swiper-slide-index="'+r+'"]:not(.'+S.params.slideDuplicateClass+")").eq(0).index(),setTimeout(function(){S.slideTo(n)},0)):S.slideTo(n)}else S.slideTo(n)}};var z,M,E,P,I,k,L,D,B,H,G="input, select, textarea, button, video",X=Date.now(),Y=[];S.animating=!1,S.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var A,O;S.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),A="touchstart"===e.type,A||!("which"in e)||3!==e.which){if(S.params.noSwiping&&l(e,"."+S.params.noSwipingClass))return void(S.allowClick=!0);if(!S.params.swipeHandler||l(e,S.params.swipeHandler)){var t=S.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,s=S.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY;if(!(S.device.ios&&S.params.iOSEdgeSwipeDetection&&t<=S.params.iOSEdgeSwipeThreshold)){if(z=!0,M=!1,E=!0,I=void 0,O=void 0,S.touches.startX=t,S.touches.startY=s,P=Date.now(),S.allowClick=!0,S.updateContainerSize(),S.swipeDirection=void 0,S.params.threshold>0&&(D=!1),"touchstart"!==e.type){var i=!0;a(e.target).is(G)&&(i=!1),document.activeElement&&a(document.activeElement).is(G)&&document.activeElement.blur(),i&&e.preventDefault()}S.emit("onTouchStart",S,e)}}}},S.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!A||"mousemove"!==e.type){if(e.preventedByNestedSwiper)return S.touches.startX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,void(S.touches.startY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY);if(S.params.onlyExternal)return S.allowClick=!1,void(z&&(S.touches.startX=S.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,S.touches.startY=S.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,P=Date.now()));if(A&&S.params.touchReleaseOnEdges&&!S.params.loop)if(S.isHorizontal()){if(S.touches.currentX<S.touches.startX&&S.translate<=S.maxTranslate()||S.touches.currentX>S.touches.startX&&S.translate>=S.minTranslate())return}else if(S.touches.currentY<S.touches.startY&&S.translate<=S.maxTranslate()||S.touches.currentY>S.touches.startY&&S.translate>=S.minTranslate())return;if(A&&document.activeElement&&e.target===document.activeElement&&a(e.target).is(G))return M=!0,void(S.allowClick=!1);if(E&&S.emit("onTouchMove",S,e),!(e.targetTouches&&e.targetTouches.length>1)){if(S.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,S.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof I){var t;S.isHorizontal()&&S.touches.currentY===S.touches.startY||!S.isHorizontal()&&S.touches.currentX!==S.touches.startX?I=!1:(t=180*Math.atan2(Math.abs(S.touches.currentY-S.touches.startY),Math.abs(S.touches.currentX-S.touches.startX))/Math.PI,I=S.isHorizontal()?t>S.params.touchAngle:90-t>S.params.touchAngle)}if(I&&S.emit("onTouchMoveOpposite",S,e),"undefined"==typeof O&&S.browser.ieTouch&&(S.touches.currentX===S.touches.startX&&S.touches.currentY===S.touches.startY||(O=!0)),z){if(I)return void(z=!1);if(O||!S.browser.ieTouch){S.allowClick=!1,S.emit("onSliderMove",S,e),e.preventDefault(),S.params.touchMoveStopPropagation&&!S.params.nested&&e.stopPropagation(),M||(i.loop&&S.fixLoop(),L=S.getWrapperTranslate(),S.setWrapperTransition(0),S.animating&&S.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),S.params.autoplay&&S.autoplaying&&(S.params.autoplayDisableOnInteraction?S.stopAutoplay():S.pauseAutoplay()),H=!1,!S.params.grabCursor||S.params.allowSwipeToNext!==!0&&S.params.allowSwipeToPrev!==!0||S.setGrabCursor(!0)),M=!0;var s=S.touches.diff=S.isHorizontal()?S.touches.currentX-S.touches.startX:S.touches.currentY-S.touches.startY;s*=S.params.touchRatio,S.rtl&&(s=-s),S.swipeDirection=s>0?"prev":"next",k=s+L;var r=!0;if(s>0&&k>S.minTranslate()?(r=!1,S.params.resistance&&(k=S.minTranslate()-1+Math.pow(-S.minTranslate()+L+s,S.params.resistanceRatio))):s<0&&k<S.maxTranslate()&&(r=!1,S.params.resistance&&(k=S.maxTranslate()+1-Math.pow(S.maxTranslate()-L-s,S.params.resistanceRatio))),r&&(e.preventedByNestedSwiper=!0),!S.params.allowSwipeToNext&&"next"===S.swipeDirection&&k<L&&(k=L),!S.params.allowSwipeToPrev&&"prev"===S.swipeDirection&&k>L&&(k=L),S.params.threshold>0){if(!(Math.abs(s)>S.params.threshold||D))return void(k=L);if(!D)return D=!0,S.touches.startX=S.touches.currentX,S.touches.startY=S.touches.currentY,k=L,void(S.touches.diff=S.isHorizontal()?S.touches.currentX-S.touches.startX:S.touches.currentY-S.touches.startY)}S.params.followFinger&&((S.params.freeMode||S.params.watchSlidesProgress)&&S.updateActiveIndex(),S.params.freeMode&&(0===Y.length&&Y.push({position:S.touches[S.isHorizontal()?"startX":"startY"],time:P}),Y.push({position:S.touches[S.isHorizontal()?"currentX":"currentY"],time:(new window.Date).getTime()})),S.updateProgress(k),S.setWrapperTranslate(k))}}}}},S.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),E&&S.emit("onTouchEnd",S,e),E=!1,z){S.params.grabCursor&&M&&z&&(S.params.allowSwipeToNext===!0||S.params.allowSwipeToPrev===!0)&&S.setGrabCursor(!1);var t=Date.now(),s=t-P;if(S.allowClick&&(S.updateClickedSlide(e),S.emit("onTap",S,e),s<300&&t-X>300&&(B&&clearTimeout(B),B=setTimeout(function(){S&&(S.params.paginationHide&&S.paginationContainer.length>0&&!a(e.target).hasClass(S.params.bulletClass)&&S.paginationContainer.toggleClass(S.params.paginationHiddenClass),S.emit("onClick",S,e))},300)),s<300&&t-X<300&&(B&&clearTimeout(B),S.emit("onDoubleTap",S,e))),X=Date.now(),setTimeout(function(){S&&(S.allowClick=!0)},0),!z||!M||!S.swipeDirection||0===S.touches.diff||k===L)return void(z=M=!1);z=M=!1;var i;if(i=S.params.followFinger?S.rtl?S.translate:-S.translate:-k,S.params.freeMode){if(i<-S.minTranslate())return void S.slideTo(S.activeIndex);if(i>-S.maxTranslate())return void(S.slides.length<S.snapGrid.length?S.slideTo(S.snapGrid.length-1):S.slideTo(S.slides.length-1));if(S.params.freeModeMomentum){if(Y.length>1){var r=Y.pop(),n=Y.pop(),o=r.position-n.position,l=r.time-n.time;S.velocity=o/l,S.velocity=S.velocity/2,Math.abs(S.velocity)<S.params.freeModeMinimumVelocity&&(S.velocity=0),(l>150||(new window.Date).getTime()-r.time>300)&&(S.velocity=0)}else S.velocity=0;S.velocity=S.velocity*S.params.freeModeMomentumVelocityRatio,Y.length=0;var p=1e3*S.params.freeModeMomentumRatio,d=S.velocity*p,u=S.translate+d;S.rtl&&(u=-u);var c,m=!1,h=20*Math.abs(S.velocity)*S.params.freeModeMomentumBounceRatio;if(u<S.maxTranslate())S.params.freeModeMomentumBounce?(u+S.maxTranslate()<-h&&(u=S.maxTranslate()-h),c=S.maxTranslate(),m=!0,H=!0):u=S.maxTranslate();else if(u>S.minTranslate())S.params.freeModeMomentumBounce?(u-S.minTranslate()>h&&(u=S.minTranslate()+h),c=S.minTranslate(),m=!0,H=!0):u=S.minTranslate();else if(S.params.freeModeSticky){var g,f=0;for(f=0;f<S.snapGrid.length;f+=1)if(S.snapGrid[f]>-u){g=f;break}u=Math.abs(S.snapGrid[g]-u)<Math.abs(S.snapGrid[g-1]-u)||"next"===S.swipeDirection?S.snapGrid[g]:S.snapGrid[g-1],S.rtl||(u=-u)}if(0!==S.velocity)p=S.rtl?Math.abs((-u-S.translate)/S.velocity):Math.abs((u-S.translate)/S.velocity);else if(S.params.freeModeSticky)return void S.slideReset();S.params.freeModeMomentumBounce&&m?(S.updateProgress(c),S.setWrapperTransition(p),S.setWrapperTranslate(u),S.onTransitionStart(),S.animating=!0,S.wrapper.transitionEnd(function(){S&&H&&(S.emit("onMomentumBounce",S),S.setWrapperTransition(S.params.speed),S.setWrapperTranslate(c),S.wrapper.transitionEnd(function(){S&&S.onTransitionEnd()}))})):S.velocity?(S.updateProgress(u),S.setWrapperTransition(p),S.setWrapperTranslate(u),S.onTransitionStart(),S.animating||(S.animating=!0,S.wrapper.transitionEnd(function(){S&&S.onTransitionEnd()}))):S.updateProgress(u),S.updateActiveIndex()}return void((!S.params.freeModeMomentum||s>=S.params.longSwipesMs)&&(S.updateProgress(),S.updateActiveIndex()))}var v,w=0,y=S.slidesSizesGrid[0];for(v=0;v<S.slidesGrid.length;v+=S.params.slidesPerGroup)"undefined"!=typeof S.slidesGrid[v+S.params.slidesPerGroup]?i>=S.slidesGrid[v]&&i<S.slidesGrid[v+S.params.slidesPerGroup]&&(w=v,y=S.slidesGrid[v+S.params.slidesPerGroup]-S.slidesGrid[v]):i>=S.slidesGrid[v]&&(w=v,y=S.slidesGrid[S.slidesGrid.length-1]-S.slidesGrid[S.slidesGrid.length-2]);var x=(i-S.slidesGrid[w])/y;if(s>S.params.longSwipesMs){if(!S.params.longSwipes)return void S.slideTo(S.activeIndex);"next"===S.swipeDirection&&(x>=S.params.longSwipesRatio?S.slideTo(w+S.params.slidesPerGroup):S.slideTo(w)),"prev"===S.swipeDirection&&(x>1-S.params.longSwipesRatio?S.slideTo(w+S.params.slidesPerGroup):S.slideTo(w))}else{if(!S.params.shortSwipes)return void S.slideTo(S.activeIndex);"next"===S.swipeDirection&&S.slideTo(w+S.params.slidesPerGroup),"prev"===S.swipeDirection&&S.slideTo(w)}}},S._slideTo=function(e,a){return S.slideTo(e,a,!0,!0)},S.slideTo=function(e,a,t,s){"undefined"==typeof t&&(t=!0),"undefined"==typeof e&&(e=0),e<0&&(e=0),S.snapIndex=Math.floor(e/S.params.slidesPerGroup),S.snapIndex>=S.snapGrid.length&&(S.snapIndex=S.snapGrid.length-1);var i=-S.snapGrid[S.snapIndex];if(S.params.autoplay&&S.autoplaying&&(s||!S.params.autoplayDisableOnInteraction?S.pauseAutoplay(a):S.stopAutoplay()),S.updateProgress(i),S.params.normalizeSlideIndex)for(var r=0;r<S.slidesGrid.length;r++)-Math.floor(100*i)>=Math.floor(100*S.slidesGrid[r])&&(e=r);return!(!S.params.allowSwipeToNext&&i<S.translate&&i<S.minTranslate())&&(!(!S.params.allowSwipeToPrev&&i>S.translate&&i>S.maxTranslate()&&(S.activeIndex||0)!==e)&&("undefined"==typeof a&&(a=S.params.speed),S.previousIndex=S.activeIndex||0,S.activeIndex=e,S.updateRealIndex(),S.rtl&&-i===S.translate||!S.rtl&&i===S.translate?(S.params.autoHeight&&S.updateAutoHeight(),S.updateClasses(),"slide"!==S.params.effect&&S.setWrapperTranslate(i),!1):(S.updateClasses(),S.onTransitionStart(t),0===a||S.browser.lteIE9?(S.setWrapperTranslate(i),S.setWrapperTransition(0),S.onTransitionEnd(t)):(S.setWrapperTranslate(i),S.setWrapperTransition(a),S.animating||(S.animating=!0,S.wrapper.transitionEnd(function(){S&&S.onTransitionEnd(t)}))),!0)))},S.onTransitionStart=function(e){"undefined"==typeof e&&(e=!0),S.params.autoHeight&&S.updateAutoHeight(),S.lazy&&S.lazy.onTransitionStart(),e&&(S.emit("onTransitionStart",S),S.activeIndex!==S.previousIndex&&(S.emit("onSlideChangeStart",S),S.activeIndex>S.previousIndex?S.emit("onSlideNextStart",S):S.emit("onSlidePrevStart",S)))},S.onTransitionEnd=function(e){S.animating=!1,S.setWrapperTransition(0),"undefined"==typeof e&&(e=!0),S.lazy&&S.lazy.onTransitionEnd(),e&&(S.emit("onTransitionEnd",S),S.activeIndex!==S.previousIndex&&(S.emit("onSlideChangeEnd",S),S.activeIndex>S.previousIndex?S.emit("onSlideNextEnd",S):S.emit("onSlidePrevEnd",S))),S.params.history&&S.history&&S.history.setHistory(S.params.history,S.activeIndex),S.params.hashnav&&S.hashnav&&S.hashnav.setHash()},S.slideNext=function(e,a,t){if(S.params.loop){if(S.animating)return!1;S.fixLoop();S.container[0].clientLeft;return S.slideTo(S.activeIndex+S.params.slidesPerGroup,a,e,t)}return S.slideTo(S.activeIndex+S.params.slidesPerGroup,a,e,t)},S._slideNext=function(e){return S.slideNext(!0,e,!0)},S.slidePrev=function(e,a,t){if(S.params.loop){if(S.animating)return!1;S.fixLoop();S.container[0].clientLeft;return S.slideTo(S.activeIndex-1,a,e,t)}return S.slideTo(S.activeIndex-1,a,e,t)},S._slidePrev=function(e){return S.slidePrev(!0,e,!0)},S.slideReset=function(e,a,t){return S.slideTo(S.activeIndex,a,e)},S.disableTouchControl=function(){return S.params.onlyExternal=!0,!0},S.enableTouchControl=function(){return S.params.onlyExternal=!1,!0},S.setWrapperTransition=function(e,a){S.wrapper.transition(e),"slide"!==S.params.effect&&S.effects[S.params.effect]&&S.effects[S.params.effect].setTransition(e),S.params.parallax&&S.parallax&&S.parallax.setTransition(e),S.params.scrollbar&&S.scrollbar&&S.scrollbar.setTransition(e),S.params.control&&S.controller&&S.controller.setTransition(e,a),S.emit("onSetTransition",S,e)},S.setWrapperTranslate=function(e,a,t){var s=0,i=0,r=0;S.isHorizontal()?s=S.rtl?-e:e:i=e,S.params.roundLengths&&(s=n(s),i=n(i)),S.params.virtualTranslate||(S.support.transforms3d?S.wrapper.transform("translate3d("+s+"px, "+i+"px, "+r+"px)"):S.wrapper.transform("translate("+s+"px, "+i+"px)")),S.translate=S.isHorizontal()?s:i;var o,l=S.maxTranslate()-S.minTranslate();o=0===l?0:(e-S.minTranslate())/l,o!==S.progress&&S.updateProgress(e),a&&S.updateActiveIndex(),"slide"!==S.params.effect&&S.effects[S.params.effect]&&S.effects[S.params.effect].setTranslate(S.translate),S.params.parallax&&S.parallax&&S.parallax.setTranslate(S.translate),S.params.scrollbar&&S.scrollbar&&S.scrollbar.setTranslate(S.translate),S.params.control&&S.controller&&S.controller.setTranslate(S.translate,t),S.emit("onSetTranslate",S,S.translate)},S.getTranslate=function(e,a){var t,s,i,r;return"undefined"==typeof a&&(a="x"),S.params.virtualTranslate?S.rtl?-S.translate:S.translate:(i=window.getComputedStyle(e,null),window.WebKitCSSMatrix?(s=i.transform||i.webkitTransform,s.split(",").length>6&&(s=s.split(", ").map(function(e){return e.replace(",",".")}).join(", ")),r=new window.WebKitCSSMatrix("none"===s?"":s)):(r=i.MozTransform||i.OTransform||i.MsTransform||i.msTransform||i.transform||i.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),t=r.toString().split(",")),"x"===a&&(s=window.WebKitCSSMatrix?r.m41:16===t.length?parseFloat(t[12]):parseFloat(t[4])),"y"===a&&(s=window.WebKitCSSMatrix?r.m42:16===t.length?parseFloat(t[13]):parseFloat(t[5])),S.rtl&&s&&(s=-s),s||0)},S.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=S.isHorizontal()?"x":"y"),S.getTranslate(S.wrapper[0],e)},S.observers=[],S.initObservers=function(){if(S.params.observeParents)for(var e=S.container.parents(),a=0;a<e.length;a++)p(e[a]);p(S.container[0],{childList:!1}),p(S.wrapper[0],{attributes:!1})},S.disconnectObservers=function(){for(var e=0;e<S.observers.length;e++)S.observers[e].disconnect();S.observers=[]},S.createLoop=function(){S.wrapper.children("."+S.params.slideClass+"."+S.params.slideDuplicateClass).remove();var e=S.wrapper.children("."+S.params.slideClass);"auto"!==S.params.slidesPerView||S.params.loopedSlides||(S.params.loopedSlides=e.length),S.loopedSlides=parseInt(S.params.loopedSlides||S.params.slidesPerView,10),S.loopedSlides=S.loopedSlides+S.params.loopAdditionalSlides,S.loopedSlides>e.length&&(S.loopedSlides=e.length);var t,s=[],i=[];for(e.each(function(t,r){var n=a(this);t<S.loopedSlides&&i.push(r),t<e.length&&t>=e.length-S.loopedSlides&&s.push(r),n.attr("data-swiper-slide-index",t)}),t=0;t<i.length;t++)S.wrapper.append(a(i[t].cloneNode(!0)).addClass(S.params.slideDuplicateClass));for(t=s.length-1;t>=0;t--)S.wrapper.prepend(a(s[t].cloneNode(!0)).addClass(S.params.slideDuplicateClass))},S.destroyLoop=function(){S.wrapper.children("."+S.params.slideClass+"."+S.params.slideDuplicateClass).remove(),S.slides.removeAttr("data-swiper-slide-index")},S.reLoop=function(e){var a=S.activeIndex-S.loopedSlides;S.destroyLoop(),S.createLoop(),S.updateSlidesSize(),e&&S.slideTo(a+S.loopedSlides,0,!1)},S.fixLoop=function(){var e;S.activeIndex<S.loopedSlides?(e=S.slides.length-3*S.loopedSlides+S.activeIndex,e+=S.loopedSlides,S.slideTo(e,0,!1,!0)):("auto"===S.params.slidesPerView&&S.activeIndex>=2*S.loopedSlides||S.activeIndex>S.slides.length-2*S.params.slidesPerView)&&(e=-S.slides.length+S.activeIndex+S.loopedSlides,e+=S.loopedSlides,S.slideTo(e,0,!1,!0))},S.appendSlide=function(e){if(S.params.loop&&S.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&S.wrapper.append(e[a]);else S.wrapper.append(e);S.params.loop&&S.createLoop(),S.params.observer&&S.support.observer||S.update(!0)},S.prependSlide=function(e){S.params.loop&&S.destroyLoop();var a=S.activeIndex+1;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)e[t]&&S.wrapper.prepend(e[t]);a=S.activeIndex+e.length}else S.wrapper.prepend(e);S.params.loop&&S.createLoop(),S.params.observer&&S.support.observer||S.update(!0),S.slideTo(a,0,!1)},S.removeSlide=function(e){S.params.loop&&(S.destroyLoop(),S.slides=S.wrapper.children("."+S.params.slideClass));var a,t=S.activeIndex;if("object"==typeof e&&e.length){for(var s=0;s<e.length;s++)a=e[s],S.slides[a]&&S.slides.eq(a).remove(),a<t&&t--;t=Math.max(t,0)}else a=e,S.slides[a]&&S.slides.eq(a).remove(),a<t&&t--,t=Math.max(t,0);S.params.loop&&S.createLoop(),S.params.observer&&S.support.observer||S.update(!0),S.params.loop?S.slideTo(t+S.loopedSlides,0,!1):S.slideTo(t,0,!1)},S.removeAllSlides=function(){for(var e=[],a=0;a<S.slides.length;a++)e.push(a);S.removeSlide(e)},S.effects={fade:{setTranslate:function(){for(var e=0;e<S.slides.length;e++){var a=S.slides.eq(e),t=a[0].swiperSlideOffset,s=-t;S.params.virtualTranslate||(s-=S.translate);var i=0;S.isHorizontal()||(i=s,s=0);var r=S.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);a.css({opacity:r}).transform("translate3d("+s+"px, "+i+"px, 0px)")}},setTransition:function(e){if(S.slides.transition(e),S.params.virtualTranslate&&0!==e){var a=!1;S.slides.transitionEnd(function(){if(!a&&S){a=!0,S.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],t=0;t<e.length;t++)S.wrapper.trigger(e[t])}})}}},flip:{setTranslate:function(){for(var e=0;e<S.slides.length;e++){var t=S.slides.eq(e),s=t[0].progress;S.params.flip.limitRotation&&(s=Math.max(Math.min(t[0].progress,1),-1));var i=t[0].swiperSlideOffset,r=-180*s,n=r,o=0,l=-i,p=0;if(S.isHorizontal()?S.rtl&&(n=-n):(p=l,l=0,o=-n,n=0),t[0].style.zIndex=-Math.abs(Math.round(s))+S.slides.length,S.params.flip.slideShadows){var d=S.isHorizontal()?t.find(".swiper-slide-shadow-left"):t.find(".swiper-slide-shadow-top"),u=S.isHorizontal()?t.find(".swiper-slide-shadow-right"):t.find(".swiper-slide-shadow-bottom");0===d.length&&(d=a('<div class="swiper-slide-shadow-'+(S.isHorizontal()?"left":"top")+'"></div>'),t.append(d)),0===u.length&&(u=a('<div class="swiper-slide-shadow-'+(S.isHorizontal()?"right":"bottom")+'"></div>'),t.append(u)),d.length&&(d[0].style.opacity=Math.max(-s,0)),u.length&&(u[0].style.opacity=Math.max(s,0))}t.transform("translate3d("+l+"px, "+p+"px, 0px) rotateX("+o+"deg) rotateY("+n+"deg)")}},setTransition:function(e){if(S.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),S.params.virtualTranslate&&0!==e){var t=!1;S.slides.eq(S.activeIndex).transitionEnd(function(){if(!t&&S&&a(this).hasClass(S.params.slideActiveClass)){t=!0,S.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=0;s<e.length;s++)S.wrapper.trigger(e[s])}})}}},cube:{setTranslate:function(){var e,t=0;S.params.cube.shadow&&(S.isHorizontal()?(e=S.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),S.wrapper.append(e)),e.css({height:S.width+"px"})):(e=S.container.find(".swiper-cube-shadow"),0===e.length&&(e=a('<div class="swiper-cube-shadow"></div>'),S.container.append(e))));for(var s=0;s<S.slides.length;s++){var i=S.slides.eq(s),r=90*s,n=Math.floor(r/360);S.rtl&&(r=-r,n=Math.floor(-r/360));var o=Math.max(Math.min(i[0].progress,1),-1),l=0,p=0,d=0;s%4===0?(l=4*-n*S.size,d=0):(s-1)%4===0?(l=0,d=4*-n*S.size):(s-2)%4===0?(l=S.size+4*n*S.size,d=S.size):(s-3)%4===0&&(l=-S.size,d=3*S.size+4*S.size*n),S.rtl&&(l=-l),S.isHorizontal()||(p=l,l=0);var u="rotateX("+(S.isHorizontal()?0:-r)+"deg) rotateY("+(S.isHorizontal()?r:0)+"deg) translate3d("+l+"px, "+p+"px, "+d+"px)";if(o<=1&&o>-1&&(t=90*s+90*o,S.rtl&&(t=90*-s-90*o)),i.transform(u),S.params.cube.slideShadows){var c=S.isHorizontal()?i.find(".swiper-slide-shadow-left"):i.find(".swiper-slide-shadow-top"),m=S.isHorizontal()?i.find(".swiper-slide-shadow-right"):i.find(".swiper-slide-shadow-bottom");0===c.length&&(c=a('<div class="swiper-slide-shadow-'+(S.isHorizontal()?"left":"top")+'"></div>'),i.append(c)),0===m.length&&(m=a('<div class="swiper-slide-shadow-'+(S.isHorizontal()?"right":"bottom")+'"></div>'),i.append(m)),c.length&&(c[0].style.opacity=Math.max(-o,0)),m.length&&(m[0].style.opacity=Math.max(o,0))}}if(S.wrapper.css({"-webkit-transform-origin":"50% 50% -"+S.size/2+"px","-moz-transform-origin":"50% 50% -"+S.size/2+"px","-ms-transform-origin":"50% 50% -"+S.size/2+"px","transform-origin":"50% 50% -"+S.size/2+"px"}),S.params.cube.shadow)if(S.isHorizontal())e.transform("translate3d(0px, "+(S.width/2+S.params.cube.shadowOffset)+"px, "+-S.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+S.params.cube.shadowScale+")");else{var h=Math.abs(t)-90*Math.floor(Math.abs(t)/90),g=1.5-(Math.sin(2*h*Math.PI/360)/2+Math.cos(2*h*Math.PI/360)/2),f=S.params.cube.shadowScale,v=S.params.cube.shadowScale/g,w=S.params.cube.shadowOffset;e.transform("scale3d("+f+", 1, "+v+") translate3d(0px, "+(S.height/2+w)+"px, "+-S.height/2/v+"px) rotateX(-90deg)")}var y=S.isSafari||S.isUiWebView?-S.size/2:0;S.wrapper.transform("translate3d(0px,0,"+y+"px) rotateX("+(S.isHorizontal()?0:t)+"deg) rotateY("+(S.isHorizontal()?-t:0)+"deg)")},setTransition:function(e){S.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),S.params.cube.shadow&&!S.isHorizontal()&&S.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=S.translate,t=S.isHorizontal()?-e+S.width/2:-e+S.height/2,s=S.isHorizontal()?S.params.coverflow.rotate:-S.params.coverflow.rotate,i=S.params.coverflow.depth,r=0,n=S.slides.length;r<n;r++){var o=S.slides.eq(r),l=S.slidesSizesGrid[r],p=o[0].swiperSlideOffset,d=(t-p-l/2)/l*S.params.coverflow.modifier,u=S.isHorizontal()?s*d:0,c=S.isHorizontal()?0:s*d,m=-i*Math.abs(d),h=S.isHorizontal()?0:S.params.coverflow.stretch*d,g=S.isHorizontal()?S.params.coverflow.stretch*d:0;Math.abs(g)<.001&&(g=0),Math.abs(h)<.001&&(h=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(c)<.001&&(c=0);var f="translate3d("+g+"px,"+h+"px,"+m+"px)  rotateX("+c+"deg) rotateY("+u+"deg)";if(o.transform(f),o[0].style.zIndex=-Math.abs(Math.round(d))+1,S.params.coverflow.slideShadows){var v=S.isHorizontal()?o.find(".swiper-slide-shadow-left"):o.find(".swiper-slide-shadow-top"),w=S.isHorizontal()?o.find(".swiper-slide-shadow-right"):o.find(".swiper-slide-shadow-bottom");0===v.length&&(v=a('<div class="swiper-slide-shadow-'+(S.isHorizontal()?"left":"top")+'"></div>'),o.append(v)),0===w.length&&(w=a('<div class="swiper-slide-shadow-'+(S.isHorizontal()?"right":"bottom")+'"></div>'),o.append(w)),v.length&&(v[0].style.opacity=d>0?d:0),w.length&&(w[0].style.opacity=-d>0?-d:0)}}if(S.browser.ie){var y=S.wrapper[0].style;y.perspectiveOrigin=t+"px 50%"}},setTransition:function(e){S.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},S.lazy={initialImageLoaded:!1,loadImageInSlide:function(e,t){if("undefined"!=typeof e&&("undefined"==typeof t&&(t=!0),0!==S.slides.length)){var s=S.slides.eq(e),i=s.find("."+S.params.lazyLoadingClass+":not(."+S.params.lazyStatusLoadedClass+"):not(."+S.params.lazyStatusLoadingClass+")");!s.hasClass(S.params.lazyLoadingClass)||s.hasClass(S.params.lazyStatusLoadedClass)||s.hasClass(S.params.lazyStatusLoadingClass)||(i=i.add(s[0])),0!==i.length&&i.each(function(){var e=a(this);e.addClass(S.params.lazyStatusLoadingClass);var i=e.attr("data-background"),r=e.attr("data-src"),n=e.attr("data-srcset"),o=e.attr("data-sizes");S.loadImage(e[0],r||i,n,o,!1,function(){if(i?(e.css("background-image",'url("'+i+'")'),e.removeAttr("data-background")):(n&&(e.attr("srcset",n),e.removeAttr("data-srcset")),o&&(e.attr("sizes",o),e.removeAttr("data-sizes")),r&&(e.attr("src",r),e.removeAttr("data-src"))),e.addClass(S.params.lazyStatusLoadedClass).removeClass(S.params.lazyStatusLoadingClass),s.find("."+S.params.lazyPreloaderClass+", ."+S.params.preloaderClass).remove(),S.params.loop&&t){var a=s.attr("data-swiper-slide-index");if(s.hasClass(S.params.slideDuplicateClass)){var l=S.wrapper.children('[data-swiper-slide-index="'+a+'"]:not(.'+S.params.slideDuplicateClass+")");S.lazy.loadImageInSlide(l.index(),!1)}else{var p=S.wrapper.children("."+S.params.slideDuplicateClass+'[data-swiper-slide-index="'+a+'"]');S.lazy.loadImageInSlide(p.index(),!1)}}S.emit("onLazyImageReady",S,s[0],e[0])}),S.emit("onLazyImageLoad",S,s[0],e[0])})}},load:function(){var e,t=S.params.slidesPerView;if("auto"===t&&(t=0),S.lazy.initialImageLoaded||(S.lazy.initialImageLoaded=!0),S.params.watchSlidesVisibility)S.wrapper.children("."+S.params.slideVisibleClass).each(function(){S.lazy.loadImageInSlide(a(this).index())});else if(t>1)for(e=S.activeIndex;e<S.activeIndex+t;e++)S.slides[e]&&S.lazy.loadImageInSlide(e);else S.lazy.loadImageInSlide(S.activeIndex);if(S.params.lazyLoadingInPrevNext)if(t>1||S.params.lazyLoadingInPrevNextAmount&&S.params.lazyLoadingInPrevNextAmount>1){var s=S.params.lazyLoadingInPrevNextAmount,i=t,r=Math.min(S.activeIndex+i+Math.max(s,i),S.slides.length),n=Math.max(S.activeIndex-Math.max(i,s),0);for(e=S.activeIndex+t;e<r;e++)S.slides[e]&&S.lazy.loadImageInSlide(e);for(e=n;e<S.activeIndex;e++)S.slides[e]&&S.lazy.loadImageInSlide(e)}else{var o=S.wrapper.children("."+S.params.slideNextClass);o.length>0&&S.lazy.loadImageInSlide(o.index());var l=S.wrapper.children("."+S.params.slidePrevClass);l.length>0&&S.lazy.loadImageInSlide(l.index())}},onTransitionStart:function(){S.params.lazyLoading&&(S.params.lazyLoadingOnTransitionStart||!S.params.lazyLoadingOnTransitionStart&&!S.lazy.initialImageLoaded)&&S.lazy.load()},onTransitionEnd:function(){S.params.lazyLoading&&!S.params.lazyLoadingOnTransitionStart&&S.lazy.load()}},S.scrollbar={isTouched:!1,setDragPosition:function(e){var a=S.scrollbar,t=S.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageX:e.pageX||e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageY:e.pageY||e.clientY,s=t-a.track.offset()[S.isHorizontal()?"left":"top"]-a.dragSize/2,i=-S.minTranslate()*a.moveDivider,r=-S.maxTranslate()*a.moveDivider;s<i?s=i:s>r&&(s=r),s=-s/a.moveDivider,S.updateProgress(s),S.setWrapperTranslate(s,!0)},dragStart:function(e){var a=S.scrollbar;a.isTouched=!0,e.preventDefault(),e.stopPropagation(),a.setDragPosition(e),clearTimeout(a.dragTimeout),a.track.transition(0),S.params.scrollbarHide&&a.track.css("opacity",1),S.wrapper.transition(100),a.drag.transition(100),S.emit("onScrollbarDragStart",S)},dragMove:function(e){var a=S.scrollbar;a.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,a.setDragPosition(e),S.wrapper.transition(0),a.track.transition(0),a.drag.transition(0),S.emit("onScrollbarDragMove",S))},dragEnd:function(e){var a=S.scrollbar;a.isTouched&&(a.isTouched=!1,S.params.scrollbarHide&&(clearTimeout(a.dragTimeout),a.dragTimeout=setTimeout(function(){a.track.css("opacity",0),a.track.transition(400)},1e3)),S.emit("onScrollbarDragEnd",S),S.params.scrollbarSnapOnRelease&&S.slideReset())},draggableEvents:function(){return S.params.simulateTouch!==!1||S.support.touch?S.touchEvents:S.touchEventsDesktop}(),enableDraggable:function(){var e=S.scrollbar,t=S.support.touch?e.track:document;a(e.track).on(e.draggableEvents.start,e.dragStart),a(t).on(e.draggableEvents.move,e.dragMove),a(t).on(e.draggableEvents.end,e.dragEnd)},disableDraggable:function(){var e=S.scrollbar,t=S.support.touch?e.track:document;a(e.track).off(S.draggableEvents.start,e.dragStart),a(t).off(S.draggableEvents.move,e.dragMove),a(t).off(S.draggableEvents.end,e.dragEnd)},set:function(){if(S.params.scrollbar){var e=S.scrollbar;e.track=a(S.params.scrollbar),S.params.uniqueNavElements&&"string"==typeof S.params.scrollbar&&e.track.length>1&&1===S.container.find(S.params.scrollbar).length&&(e.track=S.container.find(S.params.scrollbar)),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=a('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=S.isHorizontal()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=S.size/S.virtualSize,e.moveDivider=e.divider*(e.trackSize/S.size),e.dragSize=e.trackSize*e.divider,S.isHorizontal()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.divider>=1?e.track[0].style.display="none":e.track[0].style.display="",S.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(S.params.scrollbar){var e,a=S.scrollbar,t=(S.translate||0,a.dragSize);e=(a.trackSize-a.dragSize)*S.progress,S.rtl&&S.isHorizontal()?(e=-e,e>0?(t=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(t=a.trackSize+e)):e<0?(t=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(t=a.trackSize-e),S.isHorizontal()?(S.support.transforms3d?a.drag.transform("translate3d("+e+"px, 0, 0)"):a.drag.transform("translateX("+e+"px)"),a.drag[0].style.width=t+"px"):(S.support.transforms3d?a.drag.transform("translate3d(0px, "+e+"px, 0)"):a.drag.transform("translateY("+e+"px)"),a.drag[0].style.height=t+"px"),S.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){S.params.scrollbar&&S.scrollbar.drag.transition(e)}},S.controller={LinearSpline:function(e,a){this.x=e,this.y=a,this.lastIndex=e.length-1;var t,s;this.x.length;this.interpolate=function(e){return e?(s=i(this.x,e),t=s-1,(e-this.x[t])*(this.y[s]-this.y[t])/(this.x[s]-this.x[t])+this.y[t]):0};var i=function(){var e,a,t;return function(s,i){for(a=-1,e=s.length;e-a>1;)s[t=e+a>>1]<=i?a=t:e=t;return e}}()},getInterpolateFunction:function(e){S.controller.spline||(S.controller.spline=S.params.loop?new S.controller.LinearSpline(S.slidesGrid,e.slidesGrid):new S.controller.LinearSpline(S.snapGrid,e.snapGrid))},setTranslate:function(e,a){function s(a){e=a.rtl&&"horizontal"===a.params.direction?-S.translate:S.translate,"slide"===S.params.controlBy&&(S.controller.getInterpolateFunction(a),r=-S.controller.spline.interpolate(-e)),r&&"container"!==S.params.controlBy||(i=(a.maxTranslate()-a.minTranslate())/(S.maxTranslate()-S.minTranslate()),r=(e-S.minTranslate())*i+a.minTranslate()),S.params.controlInverse&&(r=a.maxTranslate()-r),a.updateProgress(r),a.setWrapperTranslate(r,!1,S),a.updateActiveIndex()}var i,r,n=S.params.control;if(S.isArray(n))for(var o=0;o<n.length;o++)n[o]!==a&&n[o]instanceof t&&s(n[o]);else n instanceof t&&a!==n&&s(n)},setTransition:function(e,a){function s(a){a.setWrapperTransition(e,S),0!==e&&(a.onTransitionStart(),a.wrapper.transitionEnd(function(){r&&(a.params.loop&&"slide"===S.params.controlBy&&a.fixLoop(),a.onTransitionEnd())}))}var i,r=S.params.control;if(S.isArray(r))for(i=0;i<r.length;i++)r[i]!==a&&r[i]instanceof t&&s(r[i]);else r instanceof t&&a!==r&&s(r)}},S.hashnav={onHashCange:function(e,a){var t=document.location.hash.replace("#",""),s=S.slides.eq(S.activeIndex).attr("data-hash");t!==s&&S.slideTo(S.wrapper.children("."+S.params.slideClass+'[data-hash="'+t+'"]').index());
},attachEvents:function(e){var t=e?"off":"on";a(window)[t]("hashchange",S.hashnav.onHashCange)},setHash:function(){if(S.hashnav.initialized&&S.params.hashnav)if(S.params.replaceState&&window.history&&window.history.replaceState)window.history.replaceState(null,null,"#"+S.slides.eq(S.activeIndex).attr("data-hash")||"");else{var e=S.slides.eq(S.activeIndex),a=e.attr("data-hash")||e.attr("data-history");document.location.hash=a||""}},init:function(){if(S.params.hashnav&&!S.params.history){S.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e){for(var a=0,t=0,s=S.slides.length;t<s;t++){var i=S.slides.eq(t),r=i.attr("data-hash")||i.attr("data-history");if(r===e&&!i.hasClass(S.params.slideDuplicateClass)){var n=i.index();S.slideTo(n,a,S.params.runCallbacksOnInit,!0)}}S.params.hashnavWatchState&&S.hashnav.attachEvents()}}},destroy:function(){S.params.hashnavWatchState&&S.hashnav.attachEvents(!0)}},S.history={init:function(){if(S.params.history){if(!window.history||!window.history.pushState)return S.params.history=!1,void(S.params.hashnav=!0);S.history.initialized=!0,this.paths=this.getPathValues(),(this.paths.key||this.paths.value)&&(this.scrollToSlide(0,this.paths.value,S.params.runCallbacksOnInit),S.params.replaceState||window.addEventListener("popstate",this.setHistoryPopState))}},setHistoryPopState:function(){S.history.paths=S.history.getPathValues(),S.history.scrollToSlide(S.params.speed,S.history.paths.value,!1)},getPathValues:function(){var e=window.location.pathname.slice(1).split("/"),a=e.length,t=e[a-2],s=e[a-1];return{key:t,value:s}},setHistory:function(e,a){if(S.history.initialized&&S.params.history){var t=S.slides.eq(a),s=this.slugify(t.attr("data-history"));window.location.pathname.includes(e)||(s=e+"/"+s),S.params.replaceState?window.history.replaceState(null,null,s):window.history.pushState(null,null,s)}},slugify:function(e){return e.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")},scrollToSlide:function(e,a,t){if(a)for(var s=0,i=S.slides.length;s<i;s++){var r=S.slides.eq(s),n=this.slugify(r.attr("data-history"));if(n===a&&!r.hasClass(S.params.slideDuplicateClass)){var o=r.index();S.slideTo(o,e,t)}}else S.slideTo(0,e,t)}},S.disableKeyboardControl=function(){S.params.keyboardControl=!1,a(document).off("keydown",d)},S.enableKeyboardControl=function(){S.params.keyboardControl=!0,a(document).on("keydown",d)},S.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},S.params.mousewheelControl&&(S.mousewheel.event=navigator.userAgent.indexOf("firefox")>-1?"DOMMouseScroll":u()?"wheel":"mousewheel"),S.disableMousewheelControl=function(){if(!S.mousewheel.event)return!1;var e=S.container;return"container"!==S.params.mousewheelEventsTarged&&(e=a(S.params.mousewheelEventsTarged)),e.off(S.mousewheel.event,c),!0},S.enableMousewheelControl=function(){if(!S.mousewheel.event)return!1;var e=S.container;return"container"!==S.params.mousewheelEventsTarged&&(e=a(S.params.mousewheelEventsTarged)),e.on(S.mousewheel.event,c),!0},S.parallax={setTranslate:function(){S.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){h(this,S.progress)}),S.slides.each(function(){var e=a(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=Math.min(Math.max(e[0].progress,-1),1);h(this,a)})})},setTransition:function(e){"undefined"==typeof e&&(e=S.params.speed),S.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var t=a(this),s=parseInt(t.attr("data-swiper-parallax-duration"),10)||e;0===e&&(s=0),t.transition(s)})}},S.zoom={scale:1,currentScale:1,isScaling:!1,gesture:{slide:void 0,slideWidth:void 0,slideHeight:void 0,image:void 0,imageWrap:void 0,zoomMax:S.params.zoomMax},image:{isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},velocity:{x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0},getDistanceBetweenTouches:function(e){if(e.targetTouches.length<2)return 1;var a=e.targetTouches[0].pageX,t=e.targetTouches[0].pageY,s=e.targetTouches[1].pageX,i=e.targetTouches[1].pageY,r=Math.sqrt(Math.pow(s-a,2)+Math.pow(i-t,2));return r},onGestureStart:function(e){var t=S.zoom;if(!S.support.gestures){if("touchstart"!==e.type||"touchstart"===e.type&&e.targetTouches.length<2)return;t.gesture.scaleStart=t.getDistanceBetweenTouches(e)}return t.gesture.slide&&t.gesture.slide.length||(t.gesture.slide=a(this),0===t.gesture.slide.length&&(t.gesture.slide=S.slides.eq(S.activeIndex)),t.gesture.image=t.gesture.slide.find("img, svg, canvas"),t.gesture.imageWrap=t.gesture.image.parent("."+S.params.zoomContainerClass),t.gesture.zoomMax=t.gesture.imageWrap.attr("data-swiper-zoom")||S.params.zoomMax,0!==t.gesture.imageWrap.length)?(t.gesture.image.transition(0),void(t.isScaling=!0)):void(t.gesture.image=void 0)},onGestureChange:function(e){var a=S.zoom;if(!S.support.gestures){if("touchmove"!==e.type||"touchmove"===e.type&&e.targetTouches.length<2)return;a.gesture.scaleMove=a.getDistanceBetweenTouches(e)}a.gesture.image&&0!==a.gesture.image.length&&(S.support.gestures?a.scale=e.scale*a.currentScale:a.scale=a.gesture.scaleMove/a.gesture.scaleStart*a.currentScale,a.scale>a.gesture.zoomMax&&(a.scale=a.gesture.zoomMax-1+Math.pow(a.scale-a.gesture.zoomMax+1,.5)),a.scale<S.params.zoomMin&&(a.scale=S.params.zoomMin+1-Math.pow(S.params.zoomMin-a.scale+1,.5)),a.gesture.image.transform("translate3d(0,0,0) scale("+a.scale+")"))},onGestureEnd:function(e){var a=S.zoom;!S.support.gestures&&("touchend"!==e.type||"touchend"===e.type&&e.changedTouches.length<2)||a.gesture.image&&0!==a.gesture.image.length&&(a.scale=Math.max(Math.min(a.scale,a.gesture.zoomMax),S.params.zoomMin),a.gesture.image.transition(S.params.speed).transform("translate3d(0,0,0) scale("+a.scale+")"),a.currentScale=a.scale,a.isScaling=!1,1===a.scale&&(a.gesture.slide=void 0))},onTouchStart:function(e,a){var t=e.zoom;t.gesture.image&&0!==t.gesture.image.length&&(t.image.isTouched||("android"===e.device.os&&a.preventDefault(),t.image.isTouched=!0,t.image.touchesStart.x="touchstart"===a.type?a.targetTouches[0].pageX:a.pageX,t.image.touchesStart.y="touchstart"===a.type?a.targetTouches[0].pageY:a.pageY))},onTouchMove:function(e){var a=S.zoom;if(a.gesture.image&&0!==a.gesture.image.length&&(S.allowClick=!1,a.image.isTouched&&a.gesture.slide)){a.image.isMoved||(a.image.width=a.gesture.image[0].offsetWidth,a.image.height=a.gesture.image[0].offsetHeight,a.image.startX=S.getTranslate(a.gesture.imageWrap[0],"x")||0,a.image.startY=S.getTranslate(a.gesture.imageWrap[0],"y")||0,a.gesture.slideWidth=a.gesture.slide[0].offsetWidth,a.gesture.slideHeight=a.gesture.slide[0].offsetHeight,a.gesture.imageWrap.transition(0));var t=a.image.width*a.scale,s=a.image.height*a.scale;if(!(t<a.gesture.slideWidth&&s<a.gesture.slideHeight)){if(a.image.minX=Math.min(a.gesture.slideWidth/2-t/2,0),a.image.maxX=-a.image.minX,a.image.minY=Math.min(a.gesture.slideHeight/2-s/2,0),a.image.maxY=-a.image.minY,a.image.touchesCurrent.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,a.image.touchesCurrent.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!a.image.isMoved&&!a.isScaling){if(S.isHorizontal()&&Math.floor(a.image.minX)===Math.floor(a.image.startX)&&a.image.touchesCurrent.x<a.image.touchesStart.x||Math.floor(a.image.maxX)===Math.floor(a.image.startX)&&a.image.touchesCurrent.x>a.image.touchesStart.x)return void(a.image.isTouched=!1);if(!S.isHorizontal()&&Math.floor(a.image.minY)===Math.floor(a.image.startY)&&a.image.touchesCurrent.y<a.image.touchesStart.y||Math.floor(a.image.maxY)===Math.floor(a.image.startY)&&a.image.touchesCurrent.y>a.image.touchesStart.y)return void(a.image.isTouched=!1)}e.preventDefault(),e.stopPropagation(),a.image.isMoved=!0,a.image.currentX=a.image.touchesCurrent.x-a.image.touchesStart.x+a.image.startX,a.image.currentY=a.image.touchesCurrent.y-a.image.touchesStart.y+a.image.startY,a.image.currentX<a.image.minX&&(a.image.currentX=a.image.minX+1-Math.pow(a.image.minX-a.image.currentX+1,.8)),a.image.currentX>a.image.maxX&&(a.image.currentX=a.image.maxX-1+Math.pow(a.image.currentX-a.image.maxX+1,.8)),a.image.currentY<a.image.minY&&(a.image.currentY=a.image.minY+1-Math.pow(a.image.minY-a.image.currentY+1,.8)),a.image.currentY>a.image.maxY&&(a.image.currentY=a.image.maxY-1+Math.pow(a.image.currentY-a.image.maxY+1,.8)),a.velocity.prevPositionX||(a.velocity.prevPositionX=a.image.touchesCurrent.x),a.velocity.prevPositionY||(a.velocity.prevPositionY=a.image.touchesCurrent.y),a.velocity.prevTime||(a.velocity.prevTime=Date.now()),a.velocity.x=(a.image.touchesCurrent.x-a.velocity.prevPositionX)/(Date.now()-a.velocity.prevTime)/2,a.velocity.y=(a.image.touchesCurrent.y-a.velocity.prevPositionY)/(Date.now()-a.velocity.prevTime)/2,Math.abs(a.image.touchesCurrent.x-a.velocity.prevPositionX)<2&&(a.velocity.x=0),Math.abs(a.image.touchesCurrent.y-a.velocity.prevPositionY)<2&&(a.velocity.y=0),a.velocity.prevPositionX=a.image.touchesCurrent.x,a.velocity.prevPositionY=a.image.touchesCurrent.y,a.velocity.prevTime=Date.now(),a.gesture.imageWrap.transform("translate3d("+a.image.currentX+"px, "+a.image.currentY+"px,0)")}}},onTouchEnd:function(e,a){var t=e.zoom;if(t.gesture.image&&0!==t.gesture.image.length){if(!t.image.isTouched||!t.image.isMoved)return t.image.isTouched=!1,void(t.image.isMoved=!1);t.image.isTouched=!1,t.image.isMoved=!1;var s=300,i=300,r=t.velocity.x*s,n=t.image.currentX+r,o=t.velocity.y*i,l=t.image.currentY+o;0!==t.velocity.x&&(s=Math.abs((n-t.image.currentX)/t.velocity.x)),0!==t.velocity.y&&(i=Math.abs((l-t.image.currentY)/t.velocity.y));var p=Math.max(s,i);t.image.currentX=n,t.image.currentY=l;var d=t.image.width*t.scale,u=t.image.height*t.scale;t.image.minX=Math.min(t.gesture.slideWidth/2-d/2,0),t.image.maxX=-t.image.minX,t.image.minY=Math.min(t.gesture.slideHeight/2-u/2,0),t.image.maxY=-t.image.minY,t.image.currentX=Math.max(Math.min(t.image.currentX,t.image.maxX),t.image.minX),t.image.currentY=Math.max(Math.min(t.image.currentY,t.image.maxY),t.image.minY),t.gesture.imageWrap.transition(p).transform("translate3d("+t.image.currentX+"px, "+t.image.currentY+"px,0)")}},onTransitionEnd:function(e){var a=e.zoom;a.gesture.slide&&e.previousIndex!==e.activeIndex&&(a.gesture.image.transform("translate3d(0,0,0) scale(1)"),a.gesture.imageWrap.transform("translate3d(0,0,0)"),a.gesture.slide=a.gesture.image=a.gesture.imageWrap=void 0,a.scale=a.currentScale=1)},toggleZoom:function(e,t){var s=e.zoom;if(s.gesture.slide||(s.gesture.slide=e.clickedSlide?a(e.clickedSlide):e.slides.eq(e.activeIndex),s.gesture.image=s.gesture.slide.find("img, svg, canvas"),s.gesture.imageWrap=s.gesture.image.parent("."+e.params.zoomContainerClass)),s.gesture.image&&0!==s.gesture.image.length){var i,r,n,o,l,p,d,u,c,m,h,g,f,v,w,y,x,T;"undefined"==typeof s.image.touchesStart.x&&t?(i="touchend"===t.type?t.changedTouches[0].pageX:t.pageX,r="touchend"===t.type?t.changedTouches[0].pageY:t.pageY):(i=s.image.touchesStart.x,r=s.image.touchesStart.y),s.scale&&1!==s.scale?(s.scale=s.currentScale=1,s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"),s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"),s.gesture.slide=void 0):(s.scale=s.currentScale=s.gesture.imageWrap.attr("data-swiper-zoom")||e.params.zoomMax,t?(x=s.gesture.slide[0].offsetWidth,T=s.gesture.slide[0].offsetHeight,n=s.gesture.slide.offset().left,o=s.gesture.slide.offset().top,l=n+x/2-i,p=o+T/2-r,c=s.gesture.image[0].offsetWidth,m=s.gesture.image[0].offsetHeight,h=c*s.scale,g=m*s.scale,f=Math.min(x/2-h/2,0),v=Math.min(T/2-g/2,0),w=-f,y=-v,d=l*s.scale,u=p*s.scale,d<f&&(d=f),d>w&&(d=w),u<v&&(u=v),u>y&&(u=y)):(d=0,u=0),s.gesture.imageWrap.transition(300).transform("translate3d("+d+"px, "+u+"px,0)"),s.gesture.image.transition(300).transform("translate3d(0,0,0) scale("+s.scale+")"))}},attachEvents:function(e){var t=e?"off":"on";if(S.params.zoom){var s=(S.slides,!("touchstart"!==S.touchEvents.start||!S.support.passiveListener||!S.params.passiveListeners)&&{passive:!0,capture:!1});S.support.gestures?(S.slides[t]("gesturestart",S.zoom.onGestureStart,s),S.slides[t]("gesturechange",S.zoom.onGestureChange,s),S.slides[t]("gestureend",S.zoom.onGestureEnd,s)):"touchstart"===S.touchEvents.start&&(S.slides[t](S.touchEvents.start,S.zoom.onGestureStart,s),S.slides[t](S.touchEvents.move,S.zoom.onGestureChange,s),S.slides[t](S.touchEvents.end,S.zoom.onGestureEnd,s)),S[t]("touchStart",S.zoom.onTouchStart),S.slides.each(function(e,s){a(s).find("."+S.params.zoomContainerClass).length>0&&a(s)[t](S.touchEvents.move,S.zoom.onTouchMove)}),S[t]("touchEnd",S.zoom.onTouchEnd),S[t]("transitionEnd",S.zoom.onTransitionEnd),S.params.zoomToggle&&S.on("doubleTap",S.zoom.toggleZoom)}},init:function(){S.zoom.attachEvents()},destroy:function(){S.zoom.attachEvents(!0)}},S._plugins=[];for(var N in S.plugins){var W=S.plugins[N](S,S.params[N]);W&&S._plugins.push(W)}return S.callPlugins=function(e){for(var a=0;a<S._plugins.length;a++)e in S._plugins[a]&&S._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},S.emitterEventListeners={},S.emit=function(e){S.params[e]&&S.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(S.emitterEventListeners[e])for(a=0;a<S.emitterEventListeners[e].length;a++)S.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);S.callPlugins&&S.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},S.on=function(e,a){return e=g(e),S.emitterEventListeners[e]||(S.emitterEventListeners[e]=[]),S.emitterEventListeners[e].push(a),S},S.off=function(e,a){var t;if(e=g(e),"undefined"==typeof a)return S.emitterEventListeners[e]=[],S;if(S.emitterEventListeners[e]&&0!==S.emitterEventListeners[e].length){for(t=0;t<S.emitterEventListeners[e].length;t++)S.emitterEventListeners[e][t]===a&&S.emitterEventListeners[e].splice(t,1);return S}},S.once=function(e,a){e=g(e);var t=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),S.off(e,t)};return S.on(e,t),S},S.a11y={makeFocusable:function(e){return e.attr("tabIndex","0"),e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){13===e.keyCode&&(a(e.target).is(S.params.nextButton)?(S.onClickNext(e),S.isEnd?S.a11y.notify(S.params.lastSlideMessage):S.a11y.notify(S.params.nextSlideMessage)):a(e.target).is(S.params.prevButton)&&(S.onClickPrev(e),S.isBeginning?S.a11y.notify(S.params.firstSlideMessage):S.a11y.notify(S.params.prevSlideMessage)),a(e.target).is("."+S.params.bulletClass)&&a(e.target)[0].click())},liveRegion:a('<span class="'+S.params.notificationClass+'" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=S.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){S.params.nextButton&&S.nextButton&&S.nextButton.length>0&&(S.a11y.makeFocusable(S.nextButton),S.a11y.addRole(S.nextButton,"button"),S.a11y.addLabel(S.nextButton,S.params.nextSlideMessage)),S.params.prevButton&&S.prevButton&&S.prevButton.length>0&&(S.a11y.makeFocusable(S.prevButton),S.a11y.addRole(S.prevButton,"button"),S.a11y.addLabel(S.prevButton,S.params.prevSlideMessage)),a(S.container).append(S.a11y.liveRegion)},initPagination:function(){S.params.pagination&&S.params.paginationClickable&&S.bullets&&S.bullets.length&&S.bullets.each(function(){var e=a(this);S.a11y.makeFocusable(e),S.a11y.addRole(e,"button"),S.a11y.addLabel(e,S.params.paginationBulletMessage.replace(/{{index}}/,e.index()+1))})},destroy:function(){S.a11y.liveRegion&&S.a11y.liveRegion.length>0&&S.a11y.liveRegion.remove()}},S.init=function(){S.params.loop&&S.createLoop(),S.updateContainerSize(),S.updateSlidesSize(),S.updatePagination(),S.params.scrollbar&&S.scrollbar&&(S.scrollbar.set(),S.params.scrollbarDraggable&&S.scrollbar.enableDraggable()),"slide"!==S.params.effect&&S.effects[S.params.effect]&&(S.params.loop||S.updateProgress(),S.effects[S.params.effect].setTranslate()),S.params.loop?S.slideTo(S.params.initialSlide+S.loopedSlides,0,S.params.runCallbacksOnInit):(S.slideTo(S.params.initialSlide,0,S.params.runCallbacksOnInit),0===S.params.initialSlide&&(S.parallax&&S.params.parallax&&S.parallax.setTranslate(),S.lazy&&S.params.lazyLoading&&(S.lazy.load(),S.lazy.initialImageLoaded=!0))),S.attachEvents(),S.params.observer&&S.support.observer&&S.initObservers(),S.params.preloadImages&&!S.params.lazyLoading&&S.preloadImages(),S.params.zoom&&S.zoom&&S.zoom.init(),S.params.autoplay&&S.startAutoplay(),S.params.keyboardControl&&S.enableKeyboardControl&&S.enableKeyboardControl(),S.params.mousewheelControl&&S.enableMousewheelControl&&S.enableMousewheelControl(),S.params.hashnavReplaceState&&(S.params.replaceState=S.params.hashnavReplaceState),S.params.history&&S.history&&S.history.init(),S.params.hashnav&&S.hashnav&&S.hashnav.init(),S.params.a11y&&S.a11y&&S.a11y.init(),S.emit("onInit",S)},S.cleanupStyles=function(){S.container.removeClass(S.classNames.join(" ")).removeAttr("style"),S.wrapper.removeAttr("style"),S.slides&&S.slides.length&&S.slides.removeClass([S.params.slideVisibleClass,S.params.slideActiveClass,S.params.slideNextClass,S.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),S.paginationContainer&&S.paginationContainer.length&&S.paginationContainer.removeClass(S.params.paginationHiddenClass),S.bullets&&S.bullets.length&&S.bullets.removeClass(S.params.bulletActiveClass),S.params.prevButton&&a(S.params.prevButton).removeClass(S.params.buttonDisabledClass),S.params.nextButton&&a(S.params.nextButton).removeClass(S.params.buttonDisabledClass),S.params.scrollbar&&S.scrollbar&&(S.scrollbar.track&&S.scrollbar.track.length&&S.scrollbar.track.removeAttr("style"),S.scrollbar.drag&&S.scrollbar.drag.length&&S.scrollbar.drag.removeAttr("style"))},S.destroy=function(e,a){S.detachEvents(),S.stopAutoplay(),S.params.scrollbar&&S.scrollbar&&S.params.scrollbarDraggable&&S.scrollbar.disableDraggable(),S.params.loop&&S.destroyLoop(),a&&S.cleanupStyles(),S.disconnectObservers(),S.params.zoom&&S.zoom&&S.zoom.destroy(),S.params.keyboardControl&&S.disableKeyboardControl&&S.disableKeyboardControl(),S.params.mousewheelControl&&S.disableMousewheelControl&&S.disableMousewheelControl(),S.params.a11y&&S.a11y&&S.a11y.destroy(),S.params.history&&!S.params.replaceState&&window.removeEventListener("popstate",S.history.setHistoryPopState),S.params.hashnav&&S.hashnav&&S.hashnav.destroy(),S.emit("onDestroy"),e!==!1&&(S=null)},S.init(),S}};t.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1,lteIE9:function(){var e=document.createElement("div");return e.innerHTML="<!--[if lte IE 9]><i></i><![endif]-->",1===e.getElementsByTagName("i").length}()},device:function(){var e=navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),t=e.match(/(iPad).*OS\s([\d_]+)/),s=e.match(/(iPod)(.*OS\s([\d_]+))?/),i=!t&&e.match(/(iPhone\sOS)\s([\d_]+)/);return{ios:t||i||s,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),t=0;t<a.length;t++)if(a[t]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}(),passiveListener:function(){var e=!1;try{var a=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("testPassiveListener",null,a)}catch(e){}return e}(),gestures:function(){return"ongesturestart"in window}()},plugins:{}};for(var s=(function(){var e=function(e){var a=this,t=0;for(t=0;t<e.length;t++)a[t]=e[t];return a.length=e.length,this},a=function(a,t){var s=[],i=0;if(a&&!t&&a instanceof e)return a;if(a)if("string"==typeof a){var r,n,o=a.trim();if(o.indexOf("<")>=0&&o.indexOf(">")>=0){var l="div";for(0===o.indexOf("<li")&&(l="ul"),0===o.indexOf("<tr")&&(l="tbody"),0!==o.indexOf("<td")&&0!==o.indexOf("<th")||(l="tr"),0===o.indexOf("<tbody")&&(l="table"),0===o.indexOf("<option")&&(l="select"),n=document.createElement(l),n.innerHTML=a,i=0;i<n.childNodes.length;i++)s.push(n.childNodes[i])}else for(r=t||"#"!==a[0]||a.match(/[ .<>:~]/)?(t||document).querySelectorAll(a):[document.getElementById(a.split("#")[1])],i=0;i<r.length;i++)r[i]&&s.push(r[i])}else if(a.nodeType||a===window||a===document)s.push(a);else if(a.length>0&&a[0].nodeType)for(i=0;i<a.length;i++)s.push(a[i]);return new e(s)};return e.prototype={addClass:function(e){if("undefined"==typeof e)return this;for(var a=e.split(" "),t=0;t<a.length;t++)for(var s=0;s<this.length;s++)this[s].classList.add(a[t]);return this},removeClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var s=0;s<this.length;s++)this[s].classList.remove(a[t]);return this},hasClass:function(e){return!!this[0]&&this[0].classList.contains(e)},toggleClass:function(e){for(var a=e.split(" "),t=0;t<a.length;t++)for(var s=0;s<this.length;s++)this[s].classList.toggle(a[t]);return this},attr:function(e,a){if(1===arguments.length&&"string"==typeof e)return this[0]?this[0].getAttribute(e):void 0;for(var t=0;t<this.length;t++)if(2===arguments.length)this[t].setAttribute(e,a);else for(var s in e)this[t][s]=e[s],this[t].setAttribute(s,e[s]);return this},removeAttr:function(e){for(var a=0;a<this.length;a++)this[a].removeAttribute(e);return this},data:function(e,a){if("undefined"!=typeof a){for(var t=0;t<this.length;t++){var s=this[t];s.dom7ElementDataStorage||(s.dom7ElementDataStorage={}),s.dom7ElementDataStorage[e]=a}return this}if(this[0]){var i=this[0].getAttribute("data-"+e);return i?i:this[0].dom7ElementDataStorage&&e in this[0].dom7ElementDataStorage?this[0].dom7ElementDataStorage[e]:void 0}},transform:function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this},on:function(e,t,s,i){function r(e){var i=e.target;if(a(i).is(t))s.call(i,e);else for(var r=a(i).parents(),n=0;n<r.length;n++)a(r[n]).is(t)&&s.call(r[n],e)}var n,o,l=e.split(" ");for(n=0;n<this.length;n++)if("function"==typeof t||t===!1)for("function"==typeof t&&(s=arguments[1],i=arguments[2]||!1),o=0;o<l.length;o++)this[n].addEventListener(l[o],s,i);else for(o=0;o<l.length;o++)this[n].dom7LiveListeners||(this[n].dom7LiveListeners=[]),this[n].dom7LiveListeners.push({listener:s,liveListener:r}),this[n].addEventListener(l[o],r,i);return this},off:function(e,a,t,s){for(var i=e.split(" "),r=0;r<i.length;r++)for(var n=0;n<this.length;n++)if("function"==typeof a||a===!1)"function"==typeof a&&(t=arguments[1],s=arguments[2]||!1),this[n].removeEventListener(i[r],t,s);else if(this[n].dom7LiveListeners)for(var o=0;o<this[n].dom7LiveListeners.length;o++)this[n].dom7LiveListeners[o].listener===t&&this[n].removeEventListener(i[r],this[n].dom7LiveListeners[o].liveListener,s);return this},once:function(e,a,t,s){function i(n){t(n),r.off(e,a,i,s)}var r=this;"function"==typeof a&&(a=!1,t=arguments[1],s=arguments[2]),r.on(e,a,i,s)},trigger:function(e,a){for(var t=0;t<this.length;t++){var s;try{s=new window.CustomEvent(e,{detail:a,bubbles:!0,cancelable:!0})}catch(t){s=document.createEvent("Event"),s.initEvent(e,!0,!0),s.detail=a}this[t].dispatchEvent(s)}return this},transitionEnd:function(e){function a(r){if(r.target===this)for(e.call(this,r),t=0;t<s.length;t++)i.off(s[t],a)}var t,s=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],i=this;if(e)for(t=0;t<s.length;t++)i.on(s[t],a);return this},width:function(){return this[0]===window?window.innerWidth:this.length>0?parseFloat(this.css("width")):null},outerWidth:function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null},height:function(){return this[0]===window?window.innerHeight:this.length>0?parseFloat(this.css("height")):null},outerHeight:function(e){return this.length>0?e?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null},offset:function(){if(this.length>0){var e=this[0],a=e.getBoundingClientRect(),t=document.body,s=e.clientTop||t.clientTop||0,i=e.clientLeft||t.clientLeft||0,r=window.pageYOffset||e.scrollTop,n=window.pageXOffset||e.scrollLeft;return{top:a.top+r-s,left:a.left+n-i}}return null},css:function(e,a){var t;if(1===arguments.length){if("string"!=typeof e){for(t=0;t<this.length;t++)for(var s in e)this[t].style[s]=e[s];return this}if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(t=0;t<this.length;t++)this[t].style[e]=a;return this}return this},each:function(e){for(var a=0;a<this.length;a++)e.call(this[a],a,this[a]);return this},html:function(e){if("undefined"==typeof e)return this[0]?this[0].innerHTML:void 0;for(var a=0;a<this.length;a++)this[a].innerHTML=e;return this},text:function(e){if("undefined"==typeof e)return this[0]?this[0].textContent.trim():null;for(var a=0;a<this.length;a++)this[a].textContent=e;return this},is:function(t){if(!this[0])return!1;var s,i;if("string"==typeof t){var r=this[0];if(r===document)return t===document;if(r===window)return t===window;if(r.matches)return r.matches(t);if(r.webkitMatchesSelector)return r.webkitMatchesSelector(t);if(r.mozMatchesSelector)return r.mozMatchesSelector(t);if(r.msMatchesSelector)return r.msMatchesSelector(t);for(s=a(t),i=0;i<s.length;i++)if(s[i]===this[0])return!0;return!1}if(t===document)return this[0]===document;if(t===window)return this[0]===window;if(t.nodeType||t instanceof e){for(s=t.nodeType?[t]:t,i=0;i<s.length;i++)if(s[i]===this[0])return!0;return!1}return!1},index:function(){if(this[0]){for(var e=this[0],a=0;null!==(e=e.previousSibling);)1===e.nodeType&&a++;return a}},eq:function(a){if("undefined"==typeof a)return this;var t,s=this.length;return a>s-1?new e([]):a<0?(t=s+a,new e(t<0?[]:[this[t]])):new e([this[a]])},append:function(a){var t,s;for(t=0;t<this.length;t++)if("string"==typeof a){var i=document.createElement("div");for(i.innerHTML=a;i.firstChild;)this[t].appendChild(i.firstChild)}else if(a instanceof e)for(s=0;s<a.length;s++)this[t].appendChild(a[s]);else this[t].appendChild(a);return this},prepend:function(a){var t,s;for(t=0;t<this.length;t++)if("string"==typeof a){var i=document.createElement("div");for(i.innerHTML=a,s=i.childNodes.length-1;s>=0;s--)this[t].insertBefore(i.childNodes[s],this[t].childNodes[0])}else if(a instanceof e)for(s=0;s<a.length;s++)this[t].insertBefore(a[s],this[t].childNodes[0]);else this[t].insertBefore(a,this[t].childNodes[0]);return this},insertBefore:function(e){for(var t=a(e),s=0;s<this.length;s++)if(1===t.length)t[0].parentNode.insertBefore(this[s],t[0]);else if(t.length>1)for(var i=0;i<t.length;i++)t[i].parentNode.insertBefore(this[s].cloneNode(!0),t[i])},insertAfter:function(e){for(var t=a(e),s=0;s<this.length;s++)if(1===t.length)t[0].parentNode.insertBefore(this[s],t[0].nextSibling);else if(t.length>1)for(var i=0;i<t.length;i++)t[i].parentNode.insertBefore(this[s].cloneNode(!0),t[i].nextSibling)},next:function(t){return new e(this.length>0?t?this[0].nextElementSibling&&a(this[0].nextElementSibling).is(t)?[this[0].nextElementSibling]:[]:this[0].nextElementSibling?[this[0].nextElementSibling]:[]:[])},nextAll:function(t){var s=[],i=this[0];if(!i)return new e([]);for(;i.nextElementSibling;){var r=i.nextElementSibling;t?a(r).is(t)&&s.push(r):s.push(r),i=r}return new e(s)},prev:function(t){return new e(this.length>0?t?this[0].previousElementSibling&&a(this[0].previousElementSibling).is(t)?[this[0].previousElementSibling]:[]:this[0].previousElementSibling?[this[0].previousElementSibling]:[]:[])},prevAll:function(t){var s=[],i=this[0];if(!i)return new e([]);for(;i.previousElementSibling;){var r=i.previousElementSibling;t?a(r).is(t)&&s.push(r):s.push(r),i=r}return new e(s)},parent:function(e){for(var t=[],s=0;s<this.length;s++)e?a(this[s].parentNode).is(e)&&t.push(this[s].parentNode):t.push(this[s].parentNode);return a(a.unique(t))},parents:function(e){for(var t=[],s=0;s<this.length;s++)for(var i=this[s].parentNode;i;)e?a(i).is(e)&&t.push(i):t.push(i),i=i.parentNode;return a(a.unique(t))},find:function(a){for(var t=[],s=0;s<this.length;s++)for(var i=this[s].querySelectorAll(a),r=0;r<i.length;r++)t.push(i[r]);return new e(t)},children:function(t){for(var s=[],i=0;i<this.length;i++)for(var r=this[i].childNodes,n=0;n<r.length;n++)t?1===r[n].nodeType&&a(r[n]).is(t)&&s.push(r[n]):1===r[n].nodeType&&s.push(r[n]);return new e(a.unique(s))},remove:function(){for(var e=0;e<this.length;e++)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},add:function(){var e,t,s=this;for(e=0;e<arguments.length;e++){var i=a(arguments[e]);for(t=0;t<i.length;t++)s[s.length]=i[t],s.length++}return s}},a.fn=e.prototype,a.unique=function(e){for(var a=[],t=0;t<e.length;t++)a.indexOf(e[t])===-1&&a.push(e[t]);return a},a}()),i=["jQuery","Zepto","Dom7"],r=0;r<i.length;r++)window[i[r]]&&e(window[i[r]]);var n;n="undefined"==typeof s?window.Dom7||window.Zepto||window.jQuery:s,n&&("transitionEnd"in n.fn||(n.fn.transitionEnd=function(e){function a(r){if(r.target===this)for(e.call(this,r),t=0;t<s.length;t++)i.off(s[t],a)}var t,s=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],i=this;if(e)for(t=0;t<s.length;t++)i.on(s[t],a);return this}),"transform"in n.fn||(n.fn.transform=function(e){for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransform=t.MsTransform=t.msTransform=t.MozTransform=t.OTransform=t.transform=e}return this}),"transition"in n.fn||(n.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var t=this[a].style;t.webkitTransitionDuration=t.MsTransitionDuration=t.msTransitionDuration=t.MozTransitionDuration=t.OTransitionDuration=t.transitionDuration=e}return this}),"outerWidth"in n.fn||(n.fn.outerWidth=function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null})),window.Swiper=t}(), true?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper});
//# sourceMappingURL=maps/swiper.min.js.map


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_musiclibrary_mHeader_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_musiclibrary_mHeader_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_musiclibrary_mHeader_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_musiclibrary_MusicComponent_vue__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_musiclibrary_MusicComponent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_musiclibrary_MusicComponent_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_musiclibrary_mFooter_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_musiclibrary_mFooter_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_musiclibrary_mFooter_vue__);
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        mHeader: __WEBPACK_IMPORTED_MODULE_0__components_musiclibrary_mHeader_vue___default.a,
        MusicComponent: __WEBPACK_IMPORTED_MODULE_1__components_musiclibrary_MusicComponent_vue___default.a,
        mFooter: __WEBPACK_IMPORTED_MODULE_2__components_musiclibrary_mFooter_vue___default.a
    }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_styles_swiper_min_css__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_styles_swiper_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_styles_swiper_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_libs_jq__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_libs_jq___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_libs_jq__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_libs_swiper_min__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_libs_swiper_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__assets_libs_swiper_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_libs_iscroll_probe__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_libs_iscroll_probe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_libs_iscroll_probe__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({

    mounted: function () {
        var swiper = new __WEBPACK_IMPORTED_MODULE_2__assets_libs_swiper_min___default.a(".content", {
            onSlideChangeEnd: function () {
                __WEBPACK_IMPORTED_MODULE_1__assets_libs_jq___default()("nav li").eq(swiper.activeIndex).addClass("active").siblings().removeClass("active");
            },
            onTouchMove: function () {
                if (swiper.activeIndex == 0) {
                    if (swiper.touches.diff > 100) {
                        __WEBPACK_IMPORTED_MODULE_1__assets_libs_jq___default()(".sideSlide").stop().animate({ "left": 0 });
                        __WEBPACK_IMPORTED_MODULE_1__assets_libs_jq___default()(".mark").show();
                    }
                }
            }
        });

        var swiper1 = new __WEBPACK_IMPORTED_MODULE_2__assets_libs_swiper_min___default.a(".con", {
            loop: true,
            autoplay: 2000,
            nested: true, //选择内部swiper时，阻止外部运行
            pagination: ".swiper-pagination"
        });

        //    下拉刷新、上拉加载
        var pullDown = __WEBPACK_IMPORTED_MODULE_1__assets_libs_jq___default()("#pullDown");
        var pullUp = __WEBPACK_IMPORTED_MODULE_1__assets_libs_jq___default()("#pullUp");
        var pullDownOffset = pullDown.height();
        var myScroll = new __WEBPACK_IMPORTED_MODULE_3__assets_libs_iscroll_probe___default.a(".wrapper", {
            scrollbars: false,
            probeType: 1,
            mouseWheel: true,
            startY: -pullDown.height()
        });
        //下拉开始
        myScroll.on("scrollStart", function () {
            console.log("start");
            if (pullDown.hasClass('loading')) {
                pullDown.attr('class', '');
            } else if (pullUp.hasClass('loading')) {
                pullUp.attr('class', '');
            }
        });
        //scrollmove
        myScroll.on("scroll", function () {
            console.log("scroll");
            console.log(this.directionY);
            if (this.y > 5 && !pullDown.hasClass('flip')) {
                pullDown.addClass('flip');
                pullDown.find('.pullDownLabel').html('松开刷新...');
            } else if (this.y < 5 && pullDown.hasClass('flip')) {
                pullDown.attr('class', '');
                pullDown.find('.pullDownLabel').html('下拉刷新...');
            } else if (this.y < this.maxScrollY - 5 && !pullUp.hasClass('flip')) {
                pullUp.addClass('flip');
                pullUp.find('.pullUpLabel').html('松开加载...');
            } else if (this.y > this.maxScrollY + 5 && pullUp.hasClass('flip')) {
                pullDown.attr('class', '');
                pullUp.find('.pullUpLabel').html('上拉加载更多...');
            }
        });
        //scroll end
        myScroll.on("scrollEnd", function () {
            console.log("end");
            if (pullDown.hasClass('flip')) {
                pullDown.addClass('loading');
                pullDown.find('.pullDownLabel').html('刷新中...');
                setTimeout(function () {
                    myScroll.refresh();
                    myScroll.scrollTo(0, -pullDownOffset, 500);
                }, 1000);
            } else if (pullUp.hasClass('flip')) {
                pullUp.addClass('loading');
                pullUp.find('.pullUpLabel').html('努力加载中...');
                pullUpAction();
            }
        });

        //上拉加载更多。。。。
        function pullUpAction() {
            __WEBPACK_IMPORTED_MODULE_1__assets_libs_jq___default.a.ajax({
                type: "get",
                url: "data/music.json",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        var oLi = '<dl><dt><img src="' + data[i].imgUrl + '"/><div class="num"><span class="iconfont icon-tingyinle"></span>' + data[i].clickNum + '</div></dt> <dd><p>' + data[i].title + '</p><p><img src="assets/images/b.png"/>' + data[i].singer + '</p> </dd></dl>';
                        __WEBPACK_IMPORTED_MODULE_1__assets_libs_jq___default()(".MucList").append(oLi);
                    }
                }
            });
            setTimeout(function () {
                myScroll.refresh();
            }, 2000);
        }
    }
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_font_iconfont_css__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_font_iconfont_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_font_iconfont_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_styles_index_css__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_styles_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_styles_index_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n@font-face {font-family: \"iconfont\";\n  src: url(" + __webpack_require__(4) + "); /* IE9*/\n  src: url(" + __webpack_require__(4) + "#iefix) format('embedded-opentype'), \n  url(" + __webpack_require__(26) + ") format('woff'), \n  url(" + __webpack_require__(25) + ") format('truetype'), \n  url(" + __webpack_require__(24) + "#iconfont) format('svg'); /* iOS 4.1- */\n}\n\n.iconfont {\n  font-family:\"iconfont\" !important;\n  font-size:16px;\n  font-style:normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-shanchu:before { content: \"\\E614\"; }\n\n.icon-gengduo:before { content: \"\\E619\"; }\n\n.icon-fanhui:before { content: \"\\E604\"; }\n\n.icon-heart:before { content: \"\\E667\"; }\n\n.icon-xiazai:before { content: \"\\E62C\"; }\n\n.icon-ttpodicon:before { content: \"\\E62F\"; }\n\n.icon-22:before { content: \"\\E616\"; }\n\n.icon-mima:before { content: \"\\E736\"; }\n\n.icon-guanbi:before { content: \"\\E610\"; }\n\n.icon-shangyishou:before { content: \"\\E644\"; }\n\n.icon-xiala:before { content: \"\\E62B\"; }\n\n.icon-weibiaoti1:before { content: \"\\E61D\"; }\n\n.icon-fenxiang:before { content: \"\\E631\"; }\n\n.icon-peoplefun:before { content: \"\\E613\"; }\n\n.icon-tubiaoqinggan:before { content: \"\\E6B9\"; }\n\n.icon-huatong:before { content: \"\\E609\"; }\n\n.icon-wo:before { content: \"\\E6A3\"; }\n\n.icon-shipin:before { content: \"\\E606\"; }\n\n.icon-zuijinbofang:before { content: \"\\E676\"; }\n\n.icon-ci:before { content: \"\\E6E0\"; }\n\n.icon-yijianfankui:before { content: \"\\E62A\"; }\n\n.icon-play-o:before { content: \"\\E608\"; }\n\n.icon-caidan01:before { content: \"\\E607\"; }\n\n.icon-wechaticon16:before { content: \"\\E61F\"; }\n\n.icon-alarm:before { content: \"\\E600\"; }\n\n.icon-tuijian:before { content: \"\\E648\"; }\n\n.icon-shuaxin:before { content: \"\\E64F\"; }\n\n.icon-zanting:before { content: \"\\E61E\"; }\n\n.icon-danquxunhuan:before { content: \"\\E62D\"; }\n\n.icon-tinggeshiqu:before { content: \"\\E811\"; }\n\n.icon-yunpan:before { content: \"\\E645\"; }\n\n.icon-sq:before { content: \"\\E8A9\"; }\n\n.icon-gequ:before { content: \"\\E618\"; }\n\n.icon-tingyinle:before { content: \"\\E601\"; }\n\n.icon-caijian:before { content: \"\\E61A\"; }\n\n.icon-11178:before { content: \"\\E629\"; }\n\n.icon-youjiancaidanfufeixiazai:before { content: \"\\E967\"; }\n\n.icon-11:before { content: \"\\E72E\"; }\n\n.icon-xiala-copy:before { content: \"\\E60F\"; }\n\n.icon-m-members:before { content: \"\\E6B8\"; }\n\n.icon-bendi:before { content: \"\\E63E\"; }\n\n.icon-fuxuan01:before { content: \"\\E632\"; }\n\n.icon-wxbsousuotuiguang:before { content: \"\\E620\"; }\n\n.icon-shuruzhengquetishi:before { content: \"\\E699\"; }\n\n.icon-liuyan-alt:before { content: \"\\E630\"; }\n\n.icon-fanhui1:before { content: \"\\E666\"; }\n\n.icon-jiantou-copy:before { content: \"\\E628\"; }\n\n.icon-yinle:before { content: \"\\E6B7\"; }\n\n.icon-wodejifen:before { content: \"\\E640\"; }\n\n.icon-caidan:before { content: \"\\E65A\"; }\n\n.icon-shangla:before { content: \"\\E60C\"; }\n\n.icon-shangla-copy:before { content: \"\\E612\"; }\n\n.icon-yinle1:before { content: \"\\E621\"; }\n\n.icon-iconfontlove2:before { content: \"\\E60A\"; }\n\n.icon-bofangjindutiao:before { content: \"\\E623\"; }\n\n.icon-suiji2:before { content: \"\\E60D\"; }\n\n.icon-zhenlingzheng-copy:before { content: \"\\E602\"; }\n\n.icon-danquxunhuan1:before { content: \"\\E624\"; }\n\n.icon-xiayishou:before { content: \"\\E64D\"; }\n\n.icon-caidan1:before { content: \"\\E625\"; }\n\n.icon-wenzi:before { content: \"\\E615\"; }\n\n.icon-shu:before { content: \"\\E663\"; }\n\n.icon-wusunyinzhi:before { content: \"\\E60B\"; }\n\n.icon-shouyinji:before { content: \"\\E605\"; }\n\n.icon-pifu-copy:before { content: \"\\E603\"; }\n\n.icon-xiugai:before { content: \"\\E617\"; }\n\n.icon-tiyanguan:before { content: \"\\E611\"; }\n\n.icon-yanji_dingshiguanji:before { content: \"\\E60E\"; }\n\n.icon-xunhuan:before { content: \"\\E819\"; }\n\n.icon-quanshengzhengzhuang:before { content: \"\\E646\"; }\n\n.icon-shanzi-:before { content: \"\\E6F9\"; }\n\n.icon-58b471:before { content: \"\\E622\"; }\n\n.icon-selected:before { content: \"\\E668\"; }\n\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\r\n/**\r\n * Yo框架全局基础方法\r\n -----------------------\r\n * Yo内置了包括响应式方案，CSS3兼容性方案，厂商前缀方案，iconfont方案，flex布局等全局方法\r\n *\r\n * @class classes\r\n * @module Yo\r\n */\r\n/**\r\n * 给需要的属性加厂家前缀\r\n * @method prefix\r\n * @param {String} $property 指定属性\r\n * @param {String} $value 指定属性值\r\n */\r\n/**\r\n * 四则运算\r\n * @method calc\r\n * @param {String} $property 指定需要进行计算的CSS属性\r\n * @param {String} $value 与原生CSS语法一致，使用方式如：@include calc(width, 100% - 0.1rem);\r\n */\r\n/**\r\n * 定义渐变色值\r\n * @method gradient\r\n * @param {String} $type 指定渐变的4种类型：linear, repeating-linear, radial, repeating-radial\r\n * @param {String} $gradient 指定渐变取值，与w3c最新原生语法一致\r\n */\r\n/**\r\n * 定义响应式方案\r\n * @method responsive\r\n * @param {String} $media 指定媒体查询条件\r\n */\r\n/**\r\n * 定义字体图标\r\n * @method yofont\r\n */\r\n/**\r\n * 滤镜\r\n * @method filter\r\n * @param {String} $filter 取值与原生语法一致\r\n */\r\n/**\r\n * 定义UA默认外观\r\n * @method appearance\r\n * @param {String} $appearance 指定UA外观类型\r\n */\r\n/**\r\n * 定义是否可以选中元素\r\n * @method user-select\r\n * @param {String} $user-select 指定是否可以选中\r\n */\r\n/**\r\n * 定义背景图像缩放（Android Browser2.3.*还需要厂商前缀）\r\n * @method background-size\r\n * @param {String | Length} $background-size 指定背景图缩放值\r\n */\r\n/**\r\n * 定义背景裁减（Android Browser2.3.*还需要厂商前缀）\r\n * @method background-clip\r\n * @param {String} $background-clip 指定背景图缩放值\r\n */\r\n/**\r\n * 定义背景显示区域（Android Browser2.3.*还需要厂商前缀）\r\n * @method background-origin\r\n * @param {String} $background-origin 指定背景图缩放值\r\n */\r\n/**\r\n * 定义盒模型\r\n * @method box-sizing\r\n * @param {String} $box-sizing 的2个值分别为：content-box(标准盒模型) | border-box(怪异盒模型)\r\n */\r\n/**\r\n * 定义圆角\r\n * @method border-radius\r\n * @param {String} $border-radius 取值与原生语法一致\r\n */\r\n/**\r\n * 定义简单变换\r\n * @method transform\r\n * @param {String} $transform 取值与原生语法一致\r\n */\r\n/**\r\n * 定义变换原点\r\n * @method transform-origin\r\n * @param {String} $transform-origin 取值与原生语法一致\r\n */\r\n/**\r\n * 定义动画\r\n * @method animation\r\n * @param {String} $animation 取值与原生语法一致\r\n */\r\n/**\r\n * 定义补间\r\n * @method transition\r\n * @param {String} $transition 取值与原生语法一致\r\n */\r\n/**\r\n * 定义显示类型为伸缩盒\r\n * @method flexbox\r\n * @param {String} $flexbox 默认值：flex，取值与最新原生语法一致\r\n */\r\n/**\r\n * 定义伸缩盒子元素如何分配空间\r\n * @method flex\r\n * @param {String} $flex 默认值：1，取值与最新原生语法一致\r\n * @param {String} $direction 默认值: row\r\n */\r\n/**\r\n * 定义伸缩盒子元素的排版顺序\r\n * @method order\r\n * @param {String} $order 默认值：1，取值与最新原生语法一致\r\n */\r\n/**\r\n * 定义伸缩盒子元素的流动方向\r\n * @method flex-direction\r\n * @param {String} $flex-direction 默认值：row，取值与最新原生语法一致\r\n */\r\n/**\r\n * 定义伸缩盒子元素溢出排版\r\n * @method flex-wrap\r\n * @param {String} $flex-wrap 默认值：nowrap，取值与最新原生语法一致\r\n */\r\n/**\r\n * 定义伸缩盒子元素的水平对齐方式\r\n * @method justify-content\r\n * @param {String} $justify-content 默认值：center，取值与最新原生语法一致\r\n */\r\n/**\r\n * 定义伸缩盒子元素的垂直对齐方式\r\n * @method align-items\r\n * @param {String} $align-items 默认值：center，取值与最新原生语法一致\r\n */\r\n/**\r\n * 定义伸缩盒子元素自身的垂直对齐方式\r\n * @method align-self\r\n * @param {String} $align-self 默认值：center，取值与最新原生语法一致\r\n */\r\n/**\r\n * 定义root root-scroll\r\n * @method root-scroll\r\n * @param {String} $root-scroll 指定scroll类型，取值overflow属性的标准值\r\n */\r\n/**\r\n * 定义是否有滚动条\r\n * @method overflow\r\n * @param {String} $overflow 默认值：auto，取值与最新原生语法一致\r\n */\r\n/**\r\n * 生成矩形方法\r\n * @method rect\r\n * @param {Length} $width 定义矩形的长度\r\n * @param {Length} $height 定义矩形的高度\r\n */\r\n/**\r\n * 生成正方形方法\r\n * @method square\r\n * @param {Length} $size 定义正方形的边长\r\n */\r\n/**\r\n * 生成圆形方法\r\n * @method circle\r\n * @param {Length} $size 定义圆的半径长度\r\n * @param {Length} $radius 定义圆的圆角半径长度\r\n */\r\n/**\r\n * 生成全屏方法\r\n * @method fullscreen\r\n * @param {Integer} $z-index 定义层叠级别\r\n */\r\n/**\r\n * 清除浮动方案\r\n * @method clearfix\r\n */\r\n/**\r\n * 链接处理方法\r\n * @method link\r\n * @param {Color} $color 定义链接颜色\r\n */\r\n/**\r\n * 强制换行方案\r\n * @method wrap\r\n */\r\n/**\r\n * 单行文本溢出显示方案\r\n * @method ellipsis\r\n * @param {Boolen} $ellipsis 定义是否需要省略号\r\n */\r\n/**\r\n * 文字隐藏方案\r\n * @method texthide\r\n */\r\n/**\r\n * 清除间隙方案-容器\r\n * @method killspace\r\n */\r\n/**\r\n * 清除间隙方案-子级\r\n * @method killspace-item\r\n */\r\n/**\r\n * 未知尺寸元素垂直居中解决方案-容器\r\n * @method valign\r\n */\r\n/**\r\n * 未知尺寸元素垂直居中解决方案-子级\r\n * @method valign-item\r\n */\r\n/**\r\n * 已经尺寸元素垂直居中解决方案\r\n * @method alignment\r\n * @param {Length} $width 居中元素的宽度\r\n * @param {Length} $height 居中元素的高度\r\n */\r\n/* border */\r\ni {\r\n  font-style: normal; }\r\n\r\n/*内容的背景色*/\r\n/*作用不很多*/\r\n/*普通字体颜色*/\r\n/*图标颜色*/\r\n/*按钮的颜色*/\r\n/*播放按钮的颜色*/\r\n/*普通字体hover时的color*/\r\n/*list  lianbiao*/\r\n/*列表*/\r\n/*一像素边框*/\r\n.border {\r\n  border: none;\r\n  position: relative; }\r\n\r\n.border:after {\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: 0;\r\n  width: 100%;\r\n  height: 1px;\r\n  border-bottom: 1px solid #d0d0d0;\r\n  transform: scaleY(0.5); }\r\n\r\n.border1 {\r\n  border: none;\r\n  position: relative; }\r\n\r\n.border1:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 1px;\r\n  border-bottom: 1px solid #d0d0d0;\r\n  transform: scaleY(0.5); }\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0; }\r\n\r\nbody {\r\n  background-color: #f4f5f7;\r\n  font-family: \"Microsoft Yahei\";\r\n  font-size: 14px;\r\n  overflow: hidden; }\r\n\r\nimg {\r\n  display: block; }\r\n\r\nhtml {\r\n  font-size: 31.25vw; }\r\n\r\nul li, nav li {\r\n  list-style: none; }\r\n\r\n.header {\r\n  display: flex;\r\n  height: 0.54rem;\r\n  line-height: 0.53rem; }\r\n  .header .left-btn, .header .right-btn {\r\n    width: 0.5rem;\r\n    text-align: center; }\r\n    .header .left-btn a, .header .right-btn a {\r\n      color: #fff;\r\n      text-decoration: none; }\r\n      .header .left-btn a span, .header .right-btn a span {\r\n        font-size: 20px; }\r\n  .header .page-title {\r\n    flex: 1;\r\n    color: #fff; }\r\n\r\n.btn {\r\n  width: 100%;\r\n  height: 0.4rem; }\r\n  .btn .reg {\r\n    padding: 0 0.05rem;\r\n    width: 92%;\r\n    margin: 0 auto;\r\n    display: block;\r\n    height: 0.4rem;\r\n    line-height: 0.4rem;\r\n    text-align: center;\r\n    font-size: 16px;\r\n    background-color: #ff6a6e;\r\n    color: #fff;\r\n    text-decoration: none;\r\n    font-weight: bold;\r\n    margin-top: 0.3rem;\r\n    border-radius: 0.04rem; }\r\n\r\n.mark {\r\n  width: 100%;\r\n  height: 100%;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  z-index: 90;\r\n  display: none; }\r\n\r\n.share {\r\n  width: 100%;\r\n  background: #fff;\r\n  z-index: 99;\r\n  position: absolute;\r\n  left: 0;\r\n  bottom: -4.08rem; }\r\n  .share ul {\r\n    width: 90%;\r\n    padding: 0 5%; }\r\n    .share ul li {\r\n      height: 0.5rem;\r\n      line-height: 0.5rem;\r\n      border-bottom: 1px solid #eee;\r\n      color: #333333; }\r\n      .share ul li span {\r\n        margin-right: 0.1rem;\r\n        color: #ff6a6e; }\r\n\r\n#pullDown,\r\n#pullUp {\r\n  background: #f4f5f7;\r\n  height: 0.4rem;\r\n  line-height: 0.4rem;\r\n  font-weight: bold;\r\n  font-size: 14px;\r\n  color: #888;\r\n  width: 100%;\r\n  text-align: center; }\r\n\r\n#pullDown .pullDownIcon,\r\n#pullUp .pullUpIcon {\r\n  display: inline-block;\r\n  float: left;\r\n  position: absolute;\r\n  left: 30%;\r\n  width: 0.4rem;\r\n  height: 0.4rem;\r\n  line-height: 0.4rem;\r\n  background: url(" + __webpack_require__(28) + ") 0 0 no-repeat;\r\n  -webkit-background-size: 0.4rem 0.8rem;\r\n  background-size: 0.4rem 0.8rem;\r\n  -webkit-transition-property: -webkit-transform;\r\n  -webkit-transition-duration: 250ms; }\r\n\r\n#pullDown .pullDownLabel,\r\n#pullUp .pullUpLabel {\r\n  margin-left: 0.2rem;\r\n  display: inline-block;\r\n  height: 0.4rem;\r\n  line-height: 0.4rem; }\r\n\r\n#pullDown .pullDownIcon {\r\n  -webkit-transform: rotate(0deg) translateZ(0); }\r\n\r\n#pullUp .pullUpIcon {\r\n  -webkit-transform: rotate(-180deg) translateZ(0); }\r\n\r\n#pullDown.flip .pullDownIcon {\r\n  -webkit-transform: rotate(-180deg) translateZ(0); }\r\n\r\n#pullUp.flip .pullUpIcon {\r\n  -webkit-transform: rotate(0deg) translateZ(0); }\r\n\r\n#pullDown.loading .pullDownIcon,\r\n#pullUp.loading .pullUpIcon {\r\n  background-position: 0 100%;\r\n  -webkit-transform: rotate(0deg) translateZ(0);\r\n  -webkit-transition-duration: 0ms;\r\n  -webkit-animation-name: loading;\r\n  -webkit-animation-duration: 2s;\r\n  -webkit-animation-iteration-count: infinite;\r\n  -webkit-animation-timing-function: linear; }\r\n\r\n@-webkit-keyframes loading {\r\n  from {\r\n    -webkit-transform: rotate(0deg) translateZ(0); }\r\n  to {\r\n    -webkit-transform: rotate(360deg) translateZ(0); } }\r\n.sideSlide {\r\n  width: 2.7rem;\r\n  height: 100%;\r\n  position: fixed;\r\n  left: -2.7rem;\r\n  top: 0;\r\n  background: #f4f5f7;\r\n  z-index: 100; }\r\n  .sideSlide .slideTop {\r\n    width: 100%;\r\n    height: 1rem;\r\n    padding-bottom: 0.2rem;\r\n    background-color: #ff6a6e;\r\n    position: relative;\r\n    color: #fff; }\r\n    .sideSlide .slideTop .pic {\r\n      position: absolute;\r\n      left: 0.15rem;\r\n      top: 0.2rem; }\r\n    .sideSlide .slideTop a {\r\n      color: #333333;\r\n      text-decoration: none; }\r\n    .sideSlide .slideTop i {\r\n      position: absolute;\r\n      left: 0.8rem;\r\n      top: 0.35rem; }\r\n    .sideSlide .slideTop span {\r\n      position: absolute;\r\n      right: 0.12rem;\r\n      top: 0.14rem; }\r\n  .sideSlide .slideMiddle {\r\n    width: 100%; }\r\n    .sideSlide .slideMiddle li {\r\n      line-height: 0.4rem;\r\n      height: 0.4rem;\r\n      padding: 0 0.18rem;\r\n      font-weight: bold;\r\n      color: #696969; }\r\n      .sideSlide .slideMiddle li span {\r\n        font-size: 18px;\r\n        padding-right: 0.3rem; }\r\n      .sideSlide .slideMiddle li span.close {\r\n        font-size: 14px;\r\n        color: #ff6a6e;\r\n        float: right;\r\n        padding: 0; }\r\n  .sideSlide .slideBottom {\r\n    width: 100%;\r\n    display: flex;\r\n    margin-top: 0.5rem; }\r\n    .sideSlide .slideBottom li {\r\n      flex-grow: 1;\r\n      height: 0.3rem;\r\n      line-height: 0.3rem;\r\n      text-align: center;\r\n      font-size: 14px;\r\n      color: #757575;\r\n      font-weight: bold; }\r\n    .sideSlide .slideBottom li:nth-of-type(1) {\r\n      border-right: 1px solid #9d9d9d; }\r\n\r\nfooter {\r\n  width: 100%;\r\n  height: 0.5rem;\r\n  position: fixed;\r\n  bottom: 0;\r\n  background: #fff; }\r\n\r\n.footer {\r\n  width: 100%;\r\n  height: 0.5rem;\r\n  position: fixed;\r\n  bottom: 0;\r\n  background: #fff;\r\n  z-index: 50; }\r\n\r\n.musicPlay {\r\n  width: 100%;\r\n  padding-left: 0.1rem; }\r\n\r\n.muicLeft {\r\n  width: 50%;\r\n  float: left; }\r\n  .muicLeft dl {\r\n    position: relative;\r\n    height: 0.45rem;\r\n    padding: 0.02rem 0; }\r\n  .muicLeft dt {\r\n    float: left;\r\n    width: 0.45rem;\r\n    height: 0.45rem;\r\n    padding-bottom: 0.15rem; }\r\n    .muicLeft dt img {\r\n      width: 100%;\r\n      height: 100%; }\r\n  .muicLeft dd:nth-of-type(1) {\r\n    float: left;\r\n    width: 50%;\r\n    padding-left: 0.08rem; }\r\n    .muicLeft dd:nth-of-type(1) p {\r\n      height: 0.24rem;\r\n      line-height: 0.24rem; }\r\n    .muicLeft dd:nth-of-type(1) p:nth-of-type(1) {\r\n      font-size: 12px;\r\n      color: #333333; }\r\n    .muicLeft dd:nth-of-type(1) p:nth-of-type(2) {\r\n      font-size: 10px;\r\n      color: #999999; }\r\n\r\n.musicRight {\r\n  width: 50%;\r\n  display: flex;\r\n  justify-content: space-around;\r\n  text-align: center; }\r\n  .musicRight li {\r\n    flex: 1;\r\n    line-height: 0.48rem; }\r\n    .musicRight li span {\r\n      font-size: 18px;\r\n      color: #ff6a6e; }\r\n\r\n.blur {\r\n  -webkit-filter: blur(30px);\r\n  /* Chrome, Opera */\r\n  -moz-filter: blur(30px);\r\n  -ms-filter: blur(30px);\r\n  filter: blur(30px); }\r\n\r\n.scrollBar {\r\n  position: absolute;\r\n  width: 0;\r\n  height: 0.03rem;\r\n  left: 0;\r\n  bottom: 0;\r\n  background-color: #ff6a6e;\r\n  z-index: 19; }\r\n\r\n.header1 header {\r\n  width: 100%;\r\n  height: 0.6rem;\r\n  font-size: 16px;\r\n  background-color: #fff; }\r\n  .header1 header ul {\r\n    width: 100%;\r\n    height: 0.6rem;\r\n    display: flex;\r\n    justify-content: space-around;\r\n    line-height: 0.6rem;\r\n    font-weight: bold; }\r\n    .header1 header ul li {\r\n      flex-grow: 1;\r\n      text-align: center; }\r\n      .header1 header ul li a {\r\n        color: #333333;\r\n        text-decoration: none; }\r\n    .header1 header ul li:nth-of-type(1) {\r\n      font-size: 20px; }\r\n    .header1 header ul li:nth-of-type(5) {\r\n      font-size: 20px; }\r\n    .header1 header ul li a.active {\r\n      color: #ff6a6e; }\r\n.header1 nav {\r\n  display: flex;\r\n  width: 100%;\r\n  color: #666666;\r\n  height: 0.3rem;\r\n  line-height: 0.3rem;\r\n  justify-content: space-around; }\r\n  .header1 nav li {\r\n    font-size: 14px;\r\n    font-weight: bold;\r\n    text-align: center;\r\n    flex-grow: 1; }\r\n  .header1 nav li.active {\r\n    color: #ff6a6e;\r\n    z-index: 2;\r\n    border-bottom: 2px solid #ff6a6e; }\r\n\r\n.content {\r\n  width: 100%;\r\n  position: absolute;\r\n  top: 0rem;\r\n  bottom: 0.5rem;\r\n  /*推荐歌单*/ }\r\n  .content .con {\r\n    width: 100%;\r\n    height: 1.5rem; }\r\n    .content .con img {\r\n      width: 100%;\r\n      height: 100%; }\r\n    .content .con .page .swiper-pagination-bullet {\r\n      background: #fff;\r\n      opacity: 1; }\r\n    .content .con .page .swiper-pagination-bullet-active {\r\n      background: #ff6a6e;\r\n      opacity: 1; }\r\n  .content .icon {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    padding-top: 0.23rem;\r\n    height: 0.26rem;\r\n    line-height: 0.26rem; }\r\n    .content .icon span {\r\n      display: block;\r\n      font-size: 0.26rem;\r\n      color: #ff6a6e;\r\n      flex-grow: 1;\r\n      text-align: center; }\r\n  .content .recomm {\r\n    width: 100%;\r\n    height: 0.44rem;\r\n    display: flex;\r\n    line-height: 0.44rem;\r\n    font-size: 14px;\r\n    color: #333333;\r\n    font-weight: bold; }\r\n    .content .recomm li {\r\n      flex-grow: 1;\r\n      text-align: center; }\r\n  .content .reco {\r\n    overflow: hidden;\r\n    overflow-y: auto; }\r\n  .content .musicList {\r\n    height: auto; }\r\n  .content .musicList h3 {\r\n    font-size: 14px;\r\n    width: 100%;\r\n    height: 0.48rem;\r\n    line-height: 0.48rem;\r\n    color: #333333;\r\n    text-align: center; }\r\n    .content .musicList h3 a {\r\n      color: #333333;\r\n      text-decoration: none; }\r\n    .content .musicList h3 span {\r\n      padding-left: 0.05rem; }\r\n  .content .List {\r\n    width: 100%;\r\n    overflow: hidden;\r\n    justify-content: space-between;\r\n    display: flex;\r\n    flex-flow: row wrap; }\r\n    .content .List dl {\r\n      flex: 1 33%;\r\n      font-size: 0.12rem;\r\n      height: 1.5rem; }\r\n      .content .List dl dt {\r\n        position: relative; }\r\n      .content .List dl img {\r\n        width: 1rem;\r\n        height: 1rem;\r\n        margin: 0 auto; }\r\n      .content .List dl .num {\r\n        position: absolute;\r\n        right: 0.05rem;\r\n        bottom: 0.06rem;\r\n        font-size: 10px;\r\n        color: #fff; }\r\n      .content .List dl dd {\r\n        width: 1rem;\r\n        margin: 0 auto; }\r\n  .content .newList {\r\n    width: 96%;\r\n    padding: 0 0.02%rem;\r\n    margin: 0 auto; }\r\n    .content .newList dl {\r\n      position: relative;\r\n      height: 0.45rem;\r\n      padding-bottom: 0.15rem; }\r\n    .content .newList dt {\r\n      float: left;\r\n      width: 0.45rem;\r\n      height: 0.45rem;\r\n      padding-bottom: 0.15rem; }\r\n      .content .newList dt img {\r\n        width: 100%;\r\n        height: 100%; }\r\n    .content .newList dd:nth-of-type(1) {\r\n      float: left;\r\n      width: 75%;\r\n      padding-left: 0.08rem; }\r\n      .content .newList dd:nth-of-type(1) p {\r\n        height: 0.24rem;\r\n        line-height: 0.24rem; }\r\n      .content .newList dd:nth-of-type(1) p:nth-of-type(1) {\r\n        font-size: 12px;\r\n        color: #333333; }\r\n      .content .newList dd:nth-of-type(1) p:nth-of-type(2) {\r\n        font-size: 10px;\r\n        color: #999999; }\r\n    .content .newList .menu {\r\n      position: absolute;\r\n      right: 0.05rem;\r\n      top: 0.18rem;\r\n      color: #999; }\r\n  .content .List1 {\r\n    height: 1.5rem;\r\n    display: flex;\r\n    flex-flow: row wrap; }\r\n    .content .List1 dl {\r\n      flex: 1 33%;\r\n      font-size: 0.12rem;\r\n      height: 1.5rem; }\r\n      .content .List1 dl dt {\r\n        position: relative; }\r\n      .content .List1 dl img {\r\n        width: 1rem;\r\n        height: 1rem;\r\n        margin: 0 auto; }\r\n      .content .List1 dl .num {\r\n        position: absolute;\r\n        right: 0.05rem;\r\n        bottom: 0.06rem;\r\n        font-size: 10px;\r\n        color: #fff; }\r\n      .content .List1 dl dd {\r\n        width: 1rem;\r\n        margin: 0 auto; }\r\n  .content .MVList {\r\n    width: 100%;\r\n    overflow: hidden;\r\n    display: flex;\r\n    flex-flow: row wrap;\r\n    justify-content: space-around; }\r\n    .content .MVList dl {\r\n      flex: 1 50%;\r\n      font-size: 0.12rem;\r\n      height: 1.5rem; }\r\n      .content .MVList dl dt {\r\n        position: relative;\r\n        height: 1.05rem;\r\n        width: 1.55rem;\r\n        margin: 0 auto; }\r\n        .content .MVList dl dt .num {\r\n          position: absolute;\r\n          right: 0.05rem;\r\n          bottom: 0.06rem;\r\n          font-size: 10px;\r\n          color: #fff; }\r\n        .content .MVList dl dt img {\r\n          width: 100%;\r\n          height: 100%;\r\n          float: left; }\r\n      .content .MVList dl dd p:nth-of-type(2) {\r\n        font-size: 14px;\r\n        color: #999;\r\n        width: 1.55rem;\r\n        margin: 0 auto; }\r\n      .content .MVList dl dd p:nth-of-type(1) {\r\n        font-size: 14px;\r\n        color: #333333;\r\n        width: 1.55rem;\r\n        margin: 0 auto; }\r\n  .content .voice {\r\n    width: 100%;\r\n    overflow: hidden; }\r\n    .content .voice p {\r\n      float: left;\r\n      width: 25%;\r\n      height: 0.66rem;\r\n      text-align: center;\r\n      font-size: 14px; }\r\n      .content .voice p span {\r\n        display: block;\r\n        font-size: 24px;\r\n        color: #ff6a6e; }\r\n  .content .top {\r\n    overflow: hidden; }\r\n    .content .top .title {\r\n      height: 0.5rem;\r\n      float: left;\r\n      line-height: 0.5rem;\r\n      color: #333333;\r\n      padding-left: 0.1rem; }\r\n      .content .top .title span {\r\n        color: #999; }\r\n    .content .top .fenlei {\r\n      float: right;\r\n      font-size: 14px;\r\n      height: 0.5rem;\r\n      color: #333333;\r\n      line-height: 0.5rem;\r\n      padding-right: 0.1rem; }\r\n      .content .top .fenlei li {\r\n        float: left;\r\n        padding: 0 0.07rem; }\r\n      .content .top .fenlei li.active {\r\n        color: #ff6a6e; }\r\n  .content .MucList {\r\n    width: 100%;\r\n    overflow: hidden;\r\n    display: flex;\r\n    flex-flow: row wrap; }\r\n    .content .MucList dl {\r\n      flex: 1 50%;\r\n      font-size: 0.12rem;\r\n      margin-bottom: 0.15rem; }\r\n      .content .MucList dl dt {\r\n        position: relative;\r\n        width: 1.5rem;\r\n        height: 1.5rem;\r\n        margin: 0 auto; }\r\n        .content .MucList dl dt .num {\r\n          position: absolute;\r\n          right: 0.05rem;\r\n          bottom: 0.06rem;\r\n          font-size: 10px;\r\n          color: #fff; }\r\n        .content .MucList dl dt img {\r\n          width: 100%;\r\n          height: 100%;\r\n          float: left;\r\n          vertical-align: middle; }\r\n      .content .MucList dl dd p:nth-of-type(2) {\r\n        font-size: 14px;\r\n        color: #999;\r\n        width: 1.55rem;\r\n        margin: 0 auto; }\r\n        .content .MucList dl dd p:nth-of-type(2) img {\r\n          float: left;\r\n          padding-right: 0.12rem; }\r\n      .content .MucList dl dd p:nth-of-type(1) {\r\n        font-size: 14px;\r\n        color: #333333;\r\n        width: 1.55rem;\r\n        margin: 0 auto; }\r\n  .content .song {\r\n    width: 100%; }\r\n    .content .song .wrapper {\r\n      width: 100%;\r\n      height: 100%; }\r\n\r\n.pai {\r\n  overflow: hidden;\r\n  overflow-y: auto; }\r\n\r\n.order {\r\n  width: 94%;\r\n  padding: 0 3%; }\r\n  .order h3 {\r\n    height: 0.5rem;\r\n    line-height: 0.5rem; }\r\n  .order .paiCon {\r\n    width: 100%; }\r\n    .order .paiCon dl {\r\n      margin-bottom: 0.15rem;\r\n      overflow: hidden; }\r\n      .order .paiCon dl a {\r\n        color: #000; }\r\n    .order .paiCon dt {\r\n      width: 0.75rem;\r\n      height: 0.75rem;\r\n      float: left; }\r\n      .order .paiCon dt img {\r\n        width: 100%;\r\n        height: 100%; }\r\n    .order .paiCon dd {\r\n      width: 72%;\r\n      float: right; }\r\n      .order .paiCon dd p {\r\n        width: 100%;\r\n        white-space: nowrap;\r\n        text-overflow: ellipsis;\r\n        overflow: hidden;\r\n        font-size: 14px;\r\n        color: #666666;\r\n        height: 0.2rem;\r\n        line-height: 0.2rem; }\r\n\r\n.diantai {\r\n  overflow: hidden;\r\n  overflow-y: auto; }\r\n  .diantai .dianCon {\r\n    width: 92%;\r\n    padding: 0 3% 0 5%; }\r\n    .diantai .dianCon .dianLeft {\r\n      width: 0.7rem;\r\n      text-align: center;\r\n      float: left;\r\n      position: fixed; }\r\n      .diantai .dianCon .dianLeft li {\r\n        line-height: 0.45rem; }\r\n      .diantai .dianCon .dianLeft li.active {\r\n        color: #ff6a6e;\r\n        background: url(" + __webpack_require__(27) + ") no-repeat left center; }\r\n    .diantai .dianCon .dianRight {\r\n      float: right;\r\n      width: 2.24rem; }\r\n      .diantai .dianCon .dianRight .theme1 {\r\n        position: relative;\r\n        border: 0;\r\n        height: 0.28rem; }\r\n      .diantai .dianCon .dianRight .theme1:after {\r\n        content: \"\";\r\n        position: absolute;\r\n        left: 0;\r\n        bottom: 0;\r\n        top: 0.16rem;\r\n        width: 100%;\r\n        height: 1px;\r\n        border-bottom: 1px solid #e4e4e4;\r\n        transform: scaleY(0.5); }\r\n      .diantai .dianCon .dianRight .te {\r\n        position: absolute;\r\n        left: 42%;\r\n        top: 0.08rem;\r\n        background: #f4f5f7;\r\n        z-index: 3; }\r\n      .diantai .dianCon .dianRight .feature {\r\n        width: 100%;\r\n        display: flex;\r\n        flex-flow: row wrap; }\r\n        .diantai .dianCon .dianRight .feature dl {\r\n          flex: 1 50%; }\r\n          .diantai .dianCon .dianRight .feature dl dt {\r\n            width: 1rem;\r\n            height: 1rem;\r\n            position: relative;\r\n            margin: 0 auto; }\r\n            .diantai .dianCon .dianRight .feature dl dt img {\r\n              width: 100%;\r\n              height: 100%; }\r\n            .diantai .dianCon .dianRight .feature dl dt .num {\r\n              position: absolute;\r\n              right: 0.05rem;\r\n              bottom: 0.03rem;\r\n              font-size: 10px;\r\n              color: #fff; }\r\n          .diantai .dianCon .dianRight .feature dl dd {\r\n            height: 0.35rem;\r\n            line-height: 0.35rem;\r\n            text-align: center; }\r\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/**\n * Swiper 3.4.0\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * \n * http://www.idangero.us/swiper/\n * \n * Copyright 2016, Vladimir Kharlampidi\n * The iDangero.us\n * http://www.idangero.us/\n * \n * Licensed under MIT\n * \n * Released on: October 16, 2016\n */\n.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;z-index:1}.swiper-container-no-flexbox .swiper-slide{float:left}.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-moz-box-orient:vertical;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-o-transform:translate(0,0);-ms-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.swiper-container-multirow>.swiper-wrapper{-webkit-box-lines:multiple;-moz-box-lines:multiple;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;-moz-transition-timing-function:ease-out;-ms-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-slide{-webkit-flex-shrink:0;-ms-flex:0 0 auto;flex-shrink:0;width:100%;height:100%;position:relative}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;-ms-flex-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-transition-property:-webkit-transform,height;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform,height}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-wp8-horizontal{-ms-touch-action:pan-y;touch-action:pan-y}.swiper-wp8-vertical{-ms-touch-action:pan-x;touch-action:pan-x}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;-moz-background-size:27px 44px;-webkit-background-size:27px 44px;background-size:27px 44px;background-position:center;background-repeat:no-repeat}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");left:10px;right:auto}.swiper-button-prev.swiper-button-black,.swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-prev.swiper-button-white,.swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");right:10px;left:auto}.swiper-button-next.swiper-button-black,.swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next.swiper-button-white,.swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-pagination{position:absolute;text-align:center;-webkit-transition:.3s;-moz-transition:.3s;-o-transition:.3s;transition:.3s;-webkit-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-white .swiper-pagination-bullet{background:#fff}.swiper-pagination-bullet-active{opacity:1;background:#007aff}.swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}.swiper-pagination-black .swiper-pagination-bullet-active{background:#000}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0,-50%,0);-moz-transform:translate3d(0,-50%,0);-o-transform:translate(0,-50%);-ms-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:5px 0;display:block}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 5px}.swiper-pagination-progress{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progress .swiper-pagination-progressbar{background:#007aff;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);-ms-transform:scale(0);-o-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;-moz-transform-origin:left top;-ms-transform-origin:left top;-o-transform-origin:left top;transform-origin:left top}.swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar{-webkit-transform-origin:right top;-moz-transform-origin:right top;-ms-transform-origin:right top;-o-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progress{width:100%;height:4px;left:0;top:0}.swiper-container-vertical>.swiper-pagination-progress{width:4px;height:100%;left:0;top:0}.swiper-pagination-progress.swiper-pagination-white{background:rgba(255,255,255,.5)}.swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar{background:#fff}.swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar{background:#000}.swiper-container-3d{-webkit-perspective:1200px;-moz-perspective:1200px;-o-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-ms-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,right top,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-coverflow .swiper-wrapper,.swiper-container-flip .swiper-wrapper{-ms-perspective:1200px}.swiper-container-cube,.swiper-container-flip{overflow:visible}.swiper-container-cube .swiper-slide,.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-cube .swiper-slide .swiper-slide,.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active,.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top,.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-slide{visibility:hidden;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;-moz-transform-origin:100% 0;-ms-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;background:#000;opacity:.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;-moz-transition-timing-function:ease-out;-ms-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;-moz-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-zoom-container{width:100%;height:100%;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-moz-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-moz-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;object-fit:contain}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;-moz-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s steps(12,end) infinite;-moz-animation:swiper-preloader-spin 1s steps(12,end) infinite;animation:swiper-preloader-spin 1s steps(12,end) infinite}.swiper-lazy-preloader:after{display:block;content:\"\";width:100%;height:100%;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");background-position:50%;-webkit-background-size:100%;background-size:100%;background-repeat:no-repeat}.swiper-lazy-preloader-white:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\")}@-webkit-keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg)}}@keyframes swiper-preloader-spin{100%{transform:rotate(360deg)}}", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./iconfont.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./iconfont.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./swiper.min.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./swiper.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgRm9udEZvcmdlIDIwMTIwNzMxIGF0IFN1biBKYW4gIDEgMTM6MjI6NTEgMjAxNwogQnkgYWRtaW4KPC9tZXRhZGF0YT4KPGRlZnM+Cjxmb250IGlkPSJpY29uZm9udCIgaG9yaXotYWR2LXg9IjEwMjQiID4KICA8Zm9udC1mYWNlIAogICAgZm9udC1mYW1pbHk9Imljb25mb250IgogICAgZm9udC13ZWlnaHQ9IjUwMCIKICAgIGZvbnQtc3RyZXRjaD0ibm9ybWFsIgogICAgdW5pdHMtcGVyLWVtPSIxMDI0IgogICAgcGFub3NlLTE9IjIgMCA2IDMgMCAwIDAgMCAwIDAiCiAgICBhc2NlbnQ9Ijg5NiIKICAgIGRlc2NlbnQ9Ii0xMjgiCiAgICB4LWhlaWdodD0iNzkyIgogICAgYmJveD0iMCAtMjEyIDEyMDggODk2IgogICAgdW5kZXJsaW5lLXRoaWNrbmVzcz0iMCIKICAgIHVuZGVybGluZS1wb3NpdGlvbj0iMCIKICAgIHVuaWNvZGUtcmFuZ2U9IlUrMDA3OC1FOTY3IgogIC8+CjxtaXNzaW5nLWdseXBoIAogLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSIubm90ZGVmIiAKIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm5vdGRlZiIgCiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Ii5udWxsIiBob3Jpei1hZHYteD0iMCIgCiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Im5vbm1hcmtpbmdyZXR1cm4iIGhvcml6LWFkdi14PSIzNDEiIAogLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ4IiB1bmljb2RlPSJ4IiBob3Jpei1hZHYteD0iMTAwMSIgCmQ9Ik0yODEgNTQzcS0yNyAtMSAtNTMgLTFoLTgzcS0xOCAwIC0zNi41IC02dC0zMi41IC0xOC41dC0yMyAtMzJ0LTkgLTQ1LjV2LTc2aDkxMnY0MXEwIDE2IC0wLjUgMzB0LTAuNSAxOHEwIDEzIC01IDI5dC0xNyAyOS41dC0zMS41IDIyLjV0LTQ5LjUgOWgtMTMzdi05N2gtNDM4djk3ek05NTUgMzEwdi01MnEwIC0yMyAwLjUgLTUydDAuNSAtNTh0LTEwLjUgLTQ3LjV0LTI2IC0zMHQtMzMgLTE2dC0zMS41IC00LjVxLTE0IC0xIC0yOS41IC0wLjUKdC0yOS41IDAuNWgtMzJsLTQ1IDEyOGgtNDM5bC00NCAtMTI4aC0yOWgtMzRxLTIwIDAgLTQ1IDFxLTI1IDAgLTQxIDkuNXQtMjUuNSAyM3QtMTMuNSAyOS41dC00IDMwdjE2N2g5MTF6TTE2MyAyNDdxLTEyIDAgLTIxIC04LjV0LTkgLTIxLjV0OSAtMjEuNXQyMSAtOC41cTEzIDAgMjIgOC41dDkgMjEuNXQtOSAyMS41dC0yMiA4LjV6TTMxNiAxMjNxLTggLTI2IC0xNCAtNDhxLTUgLTE5IC0xMC41IC0zN3QtNy41IC0yNXQtMyAtMTV0MSAtMTQuNQp0OS41IC0xMC41dDIxLjUgLTRoMzdoNjdoODFoODBoNjRoMzZxMjMgMCAzNCAxMnQyIDM4cS01IDEzIC05LjUgMzAuNXQtOS41IDM0LjVxLTUgMTkgLTExIDM5aC0zNjh6TTMzNiA0OTh2MjI4cTAgMTEgMi41IDIzdDEwIDIxLjV0MjAuNSAxNS41dDM0IDZoMTg4cTMxIDAgNTEuNSAtMTQuNXQyMC41IC01Mi41di0yMjdoLTMyN3oiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic2hhbmNodSIgdW5pY29kZT0iJiN4ZTYxNDsiIApkPSJNMzQ0LjUgMTA1cTExLjUgMCAxOS41IDh0OCAyMHYzMDZxMCAxMiAtOCAyMHQtMTkuNSA4dC0xOS41IC04dC04IC0yMHYtMzA2cTAgLTEyIDggLTIwdDE5LjUgLTh6TTUxMS41IDEwNXExMS41IDAgMjAgOHQ4LjUgMjB2MzA2cTAgMTIgLTguNSAyMHQtMjAgOHQtMTkuNSAtOHQtOCAtMjB2LTMwNnEwIC0xMiA4IC0yMHQxOS41IC04ek02NzkuNSAxMDVxMTEuNSAwIDE5LjUgOHQ4IDIwdjMwNnEwIDEyIC04IDIwdC0xOS41IDh0LTIwIC04CnQtOC41IC0yMHYtMzA2cTAgLTEyIDguNSAtMjB0MjAgLTh6TTgxOSA3NDZoLTExNnEtOSAzNyAtMzkgNjAuNXQtNjggMjMuNWgtMTY4cS0zOCAwIC02OCAtMjMuNXQtMzkgLTYwLjVoLTExNnEtNDYgMCAtNzkgLTMyLjV0LTMzIC03OC41di0yOGgyOHYtMjhoNTZ2LTUzMHEwIC00NiAzMi41IC03OXQ3OS41IC0zM2g0NDZxNDYgMCA3OSAzM3QzMyA3OXY1MzBoNTV2MjhoMjh2MjhxMCA0NiAtMzIuNSA3OC41dC03OC41IDMyLjV6TTQyOCA3NzRoMTY4CnEzMSAwIDQ4IC0yOGgtMjY0cTE2IDI4IDQ4IDI4ek03OTEgNDlxMCAtMjMgLTE2LjUgLTM5LjV0LTM5LjUgLTE2LjVoLTQ0NnEtMjQgMCAtNDIgMTYuNXQtMTggMzkuNWw0IDUzMGg1NTh2LTUzMHpNMTQ5IDYzNXEwIDIzIDE2LjUgMzkuNXQzOS41IDE2LjVoNjE0cTIzIDAgMzkuNSAtMTYuNXQxNi41IC0zOS41aC03MjZ6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImdlbmdkdW8iIHVuaWNvZGU9IiYjeGU2MTk7IiAKZD0iTTEyMiA0MjBxLTQ5IDAgLTg0IC0zNC41dC0zNSAtODMuNXQzNSAtODR0ODQgLTM1dDgzLjUgMzV0MzQuNSA4NHQtMzQuNSA4My41dC04My41IDM0LjV6TTUwMCA0MjBxLTQ5IDAgLTg0IC0zNC41dC0zNSAtODMuNXQzNSAtODR0ODQgLTM1dDg0IDM1dDM1IDg0dC0zNSA4My41dC04NCAzNC41ek05MDIgNDIwcS00OSAwIC04NCAtMzQuNXQtMzUgLTgzLjV0MzUgLTg0dDg0IC0zNXQ4My41IDM1dDM0LjUgODR0LTM0LjUgODMuNQp0LTgzLjUgMzQuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iZmFuaHVpIiB1bmljb2RlPSImI3hlNjA0OyIgCmQ9Ik02MjkgNjUybC0yOTggLTMwOHYwbC00MyAtNDRsNDMgLTQ0djBsMjk4IC0zMDhsNDMgNDRsLTI5OSAzMDhsMjk5IDMwOHoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iaGVhcnQiIHVuaWNvZGU9IiYjeGU2Njc7IiAKZD0iTTk2MiA0NTNxMCA4MiAtMzUgMTQ1cS0xNiAzMCAtMzggNTF0LTQ4IDMycS0xOSA4IC0zOSAxMnEtMjAgMyAtNDAgM3EtMjYgMCAtNTMgLTZxLTQxIC05IC04NCAtMzFxLTI3IC0xNCAtNTMgLTMycS0zMCAtMjEgLTU3IC00NXEtMSAtMiAtMyAtM2wtMyAzcS0yMCAxOCAtNDEgMzRxLTQ2IDMzIC05MCA1NHEtMjggMTIgLTU2IDE5cS0zMCA3IC01OSA3djBxLTIxIDAgLTQwIC0zcS0yMCAtNCAtNDAgLTEydjBxLTI1IC0xMSAtNDcgLTMyCnEtMTcgLTE2IC0zMCAtMzdxLTIwIC0zMSAtMzIgLTcxcS0xMSAtNDIgLTExIC04OHEwIC0yOCA0IC01N3YwcTMgLTE4IDEwIC0zOHExMyAtMzMgMzkgLTcycTIwIC0zMCA0OSAtNjVxNDMgLTUyIDEwNSAtMTExcTcwIC02NyAxNTUgLTEzOHE0MSAtMzQgNzIgLTU3bDE1IC0xMmwxNiAxMnEyNyAyMCA2MyA1MHE1MyA0MyAxMDEgODdxNDcgNDIgODcgODJxMzQgMzQgNjIgNjZxNDggNTQgNzYgOTlxMTcgMjYgMjYgNDlxMTEgMjUgMTUgNDh2MApxNCAyOSA0IDU3ek00OTQgNTI2djB2MHYwek01MzEgNTI2djB2MHYwdjB6TTkwNyA0MDN2MHEtMiAtMTIgLTcgLTI3cS0xMSAtMjcgLTM0IC02MnEtMTkgLTI4IC00NiAtNjBxLTQxIC01MCAtMTAxIC0xMDhxLTY4IC02NSAtMTUyIC0xMzRxLTI2IC0yMiAtNTEgLTQycS0xIC0xIC00IC0zcS0yMyAxOCAtNDcgMzlxLTUzIDQzIC0xMDAgODZxLTQ2IDQxIC04NCA3OXEtMzMgMzMgLTYwIDYzcS00NSA1MSAtNzEgOTNxLTE0IDIyIC0yMiA0MS41CnQtMTAgMzQuNXYwcS00IDI2IC00IDUwcTAgNjkgMjggMTIxcTEzIDIyIDI5IDM4cTE1IDE1IDMyIDIxdjBxMTQgNiAzMCA5cTE0IDMgMzAgM3EyMCAwIDQyIC01cTM0IC03IDcxIC0yN3EyNCAtMTIgNDcgLTI4cTI3IC0xOSA1MiAtNDFxOCAtNyAxNCAtMTRxMiAtMiA0IC0zcTAgLTEgMSAtMXYwdjB2MHYwdjBsMTggLTIwbDE5IDIwdjB2MHYwcTcgOCAyMSAyMHExOCAxNiAzNyAzMHE0MSAzMCA4MCA0N3EyNCAxMSA0NiAxNnEyNCA2IDQ3IDYKcTE1IDAgMzAgLTN0MzAgLTlxMTYgLTYgMzEgLTIxcTEzIC0xMiAyMyAtMjdxMTYgLTI2IDI1IC01OHExMCAtMzUgMTAgLTc0cTAgLTI1IC00IC01MHoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ieGlhemFpIiB1bmljb2RlPSImI3hlNjJjOyIgCmQ9Ik00OTYgNTlxMSAtMSAyIC0yLjV0MyAtMi41djB2MHE1IC0zIDEwLjUgLTN0MTAuNSAzdjBoMWwyLjUgMi41bDIuNSAyLjVsMzA0IDMwNXE2IDUgNiAxM3QtNS41IDEzLjV0LTEzLjUgNS41dC0xNCAtNWwtMjc0IC0yNzV2NTMwcTAgOCAtNS41IDEzLjV0LTEzLjUgNS41dC0xMy41IC01LjV0LTUuNSAtMTMuNXYtNTMwbC0yNzUgMjc1cS02IDUgLTEzLjUgNXQtMTMgLTUuNXQtNS41IC0xMy41dDUgLTEzek04NzYgLTI2aC03MjkKcS04IDAgLTEzLjUgLTUuNXQtNS41IC0xMy41dDUuNSAtMTMuNXQxMy41IC01LjVoNzI5cTggMCAxNCA1LjV0NiAxMy41dC02IDEzLjV0LTE0IDUuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0idHRwb2RpY29uIiB1bmljb2RlPSImI3hlNjJmOyIgCmQ9Ik05MTIgLTEwOXYwcTAgNSAtMSA5cS0yMCAxNDcgLTEyOSAyNDdxLTU3IDUyIC0xMjkgNzlxNjMgMzggMTAwIDEwMnQzNyAxNDBxMCAxMTcgLTgzIDE5OS41dC0xOTkuNSA4Mi41dC0xOTkuNSAtODIuNXQtODMgLTE5OS41cTAgLTc2IDM3IC0xNDB0MTAwIC0xMDJxLTcyIC0yNyAtMTI5IC03OXEtMTA4IC05OSAtMTI4IC0yNDRxLTIgLTUgLTIgLTExdi00djBxMCAtMTQgMTAgLTI0LjV0MjQgLTEwLjV0MjQgMTB0MTEgMjRsLTEgNHYxdjQKcTE4IDEyMCAxMDggMjAydDIxMSA4OGgxNy41aDE3LjVxMTIxIC02IDIxMS41IC04OHQxMDcuNSAtMjAzdjB2LTNsMSAtNHYtMXEwIC0xNCA5LjUgLTI0dDIzLjUgLTEwdDI0IDEwdDEwIDI0djR6TTI5MSA0NjhxMCA4OSA2My41IDE1Mi41dDE1MyA2My41dDE1Mi41IC02My41dDYzIC0xNTIuNXEwIC04NCAtNTYuNSAtMTQ2dC0xMzkuNSAtNjloLTE5LjVoLTE5LjVxLTgzIDcgLTE0MCA2OXQtNTcgMTQ2eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSIyMiIgdW5pY29kZT0iJiN4ZTYxNjsiIApkPSJNNTEyIDYzNWgtNDQ3di02NzBoNGg1M2gzOTBoMzkwaDUzaDR2NjcwaC00NDd6TTg4MyA2MDVsLTM3MSAtMzQ2bC0zNzEgMzQ2aDc0MnpNODgzIC01aC03NDJsMjgzIDI2NGwtMjIgMjFsLTMwNSAtMjg1aC0ydjYxMGgybDQxNSAtMzg3bDQxNSAzODdoMnYtNjEwaC0ybC0zMDUgMjg1bC0yMiAtMjF6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Im1pbWEiIHVuaWNvZGU9IiYjeGU3MzY7IiAKZD0iTTc2MCAzNzF2MTAzcTAgNSAtMC41IDE0dC01IDM0dC0xMyA0OHQtMjYuNSA1MC41dC00Mi41IDQ3LjV0LTY0LjUgMzR0LTg5LjUgMTR0LTg5LjUgLTEzLjV0LTY0LjUgLTM0LjV0LTQyLjUgLTQ3dC0yNiAtNTEuNXQtMTMgLTQ3dC02IC0zNC41di0xNHYtMTAzaC0xMDR2LTQ4NGg2OTF2NDg0aC0xMDR6TTU1MyAxMDR2LTExM2gtNjl2MTEzcS0zNCAyMCAtMzQgNTlxMCAyOSAyMCA0OS41dDQ4LjUgMjAuNXQ0OSAtMjAuNXQyMC41IC00OS41CnEwIC0zOSAtMzUgLTU5ek02OTEgMzcxaC0zNDV2MTAzcTAgMTQgMiAyOS41dDEyLjUgNDN0MjcuNSA0OHQ1MSAzNi41dDc5LjUgMTZ0ODAgLTE2dDUxLjUgLTM2LjV0MjcgLTQ4dDEyIC00M3QyIC0yOS41di0xMDN6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Imd1YW5iaSIgdW5pY29kZT0iJiN4ZTYxMDsiIApkPSJNNzYxIDk3bC0yMDMgMjAzbDIwMyAyMDNsLTQ2IDQ2bC0yMDMgLTIwM2wtMjAzIDIwM2wtNDYgLTQ2bDIwMyAtMjAzbC0yMDMgLTIwM2w0NiAtNDZsMjAzIDIwM2wyMDMgLTIwM3oiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic2hhbmd5aXNob3UiIHVuaWNvZGU9IiYjeGU2NDQ7IiAKZD0iTTUxMS41IDgwOHEtMTAzLjUgMCAtMTk4IC00MC41dC0xNjIuNSAtMTA4LjV0LTEwOCAtMTYyLjV0LTQwIC0xOTh0NDAgLTE5Ny41dDEwOCAtMTYydDE2Mi41IC0xMDguNXQxOTggLTQwLjV0MTk3LjUgNDAuNXQxNjIuNSAxMDguNXQxMDguNSAxNjJ0NDAgMTk3LjV0LTQwIDE5OHQtMTA4LjUgMTYyLjV0LTE2Mi41IDEwOC41dC0xOTcuNSA0MC41ek01MTEuNSAtMTU0cS05Mi41IDAgLTE3NyAzNnQtMTQ1IDk2LjV0LTk2LjUgMTQ0LjUKdC0zNiAxNzYuNXQzNiAxNzd0OTYuNSAxNDV0MTQ1IDk2LjV0MTc3IDM2dDE3Ni41IC0zNnQxNDQuNSAtOTYuNXQ5Ni41IC0xNDV0MzYgLTE3N3QtMzYgLTE3Ni41dC05Ni41IC0xNDQuNXQtMTQ0LjUgLTk2LjV0LTE3Ni41IC0zNnpNNjY3IDUzOHEtMTQgMCAtMjIgLTEybC0yNDkgLTIwNGwtNiAtNHEtOCAtOCAtOCAtMTl0OCAtMTloMXYwbDQgLTRsMjUwIC0yMDNxOSAtMTEgMjIgLTExaDJxMTAgMSAxOCA4cTAgMSAxIDFxNiA3IDYgMTZ2MnY0MjIKcTAgMTEgLTggMTl0LTE5IDh6TTQ1MSAyOThsMTg5IDE1NXYtMzA4ek0zNTQuNSA1MTBxLTExLjUgMCAtMTkgLTh0LTcuNSAtMTl2LTM2N3EwIC0xMSA4IC0xOXQxOSAtOHQxOSA3LjV0OCAxOC41djM2OHEwIDExIC04IDE5dC0xOS41IDh6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InhpYWxhIiB1bmljb2RlPSImI3hlNjJiOyIgCmQ9Ik03ODQgNDQxbC0yNzIgLTI3MWwtMjcyIDI3MWwtNDUgLTQ1bDMxNyAtMzE3bDMxNyAzMTd6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9IndlaWJpYW90aTEiIHVuaWNvZGU9IiYjeGU2MWQ7IiAKZD0iTTUwOSAtMjAxcS0xMDEgMCAtMTkzLjUgMzkuNXQtMTU5LjUgMTA2LjV0LTEwNi41IDE1OS41dC0zOS41IDE5My41dDM5LjUgMTkzLjV0MTA2LjUgMTU5dDE1OS41IDEwNi41dDE5My41IDQwdDE5My41IC00MHQxNTkuNSAtMTA2LjV0MTA2LjUgLTE1OXQzOS41IC0xOTMuNXQtMzkuNSAtMTkzLjV0LTEwNi41IC0xNTkuNXQtMTU5LjUgLTEwNi41dC0xOTMuNSAtMzkuNXpNNTA5IDc3MHEtOTYgMCAtMTgzLjUgLTM3LjV0LTE1MC41IC0xMDAuNQp0LTEwMC41IC0xNTAuNXQtMzcuNSAtMTgzLjV0MzcuNSAtMTgzLjV0MTAwLjUgLTE1MXQxNTAuNSAtMTAwLjV0MTgzLjUgLTM3dDE4My41IDM3dDE1MC41IDEwMC41dDEwMC41IDE1MXQzNy41IDE4My41dC0zNy41IDE4My41dC0xMDAuNSAxNTAuNXQtMTUwLjUgMTAwLjV0LTE4My41IDM3LjV6TTM4OCAyN2wtMTkgMThsMjU0IDI1NWwtMjU2IDI1N2wxOCAxOWwyNzYgLTI3NnoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iZmVueGlhbmciIHVuaWNvZGU9IiYjeGU2MzE7IiBob3Jpei1hZHYteD0iMTA4OCIgCmQ9Ik04NSAtMjEycS0zNSAwIC02MCAyNC41dC0yNSA1OC41djY2MnEwIDM1IDI1IDU5dDYwIDI0aDIxMnYtNjNoLTIxMnEtOSAwIC0xNSAtNnQtNiAtMTR2LTY2MnEwIC04IDYgLTEzLjV0MTUgLTUuNWg4NjBxOSAwIDE1LjUgNS41dDYuNSAxMy41djIzOGg2NHYtMjM4cTAgLTM0IC0yNSAtNTguNXQtNjEgLTI0LjVoLTg2MHYwek00NDggMThxLTIgNiAtMy41IDIxLjV0MCA1NnQ5IDgydDI5LjUgOTd0NTYgMTA0LjVxMTI4IDE4NCA0MTMgMjQ5CmwtMjMxIDEyNGwzMyA2MGwzMzMgLTE4MWwtMTk1IC0zMDlsLTU3IDM2bDEyOCAyMDNxLTI1NiAtNjAgLTM2OCAtMjIwcS02NSAtOTIgLTc5IC0yMTNxLTcgLTYxIC0xIC0xMDdsMiAtMTBsLTY4IC0xbC0xIDh2MHpNNDU3IDE5cS0xIDggLTIuNSAyNHQwIDU1LjV0OSA4MHQyOSA5NHQ1My41IDEwMC41cTE0MSAyMDEgNDcxIDI1OGw4IC00OHEtMzEwIC01MyAtNDM4IC0yMzdxLTMwIC00MiAtNDkgLTkydC0yNiAtODYuNXQtOCAtNzZ0MCAtNTAuNQp0MiAtMjFsLTQ5IC0xdjB2MHpNODg5IDMzNWwtNDEgMjZsMTU3IDI0OWwtMjcxIDE0NmwyMyA0M2wzMTcgLTE3MWwtMTg1IC0yOTN2MHpNODg5IDMzNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0icGVvcGxlZnVuIiB1bmljb2RlPSImI3hlNjEzOyIgCmQ9Ik01MTEuNSAtMTE5cS0xNTQuNSAwIC0yNzAuNSA4OS41dC0xNDggMjM2LjV2MjExdjI1OHEwIDE4IDEyLjUgMzAuNXQyOS41IDEyLjVoMTg4aDRoMzcwaDI0aDE2OHExNyAwIDI5LjUgLTEyLjV0MTIuNSAtMzAuNXYtMjE1di00M3YtMjExcS0zMiAtMTQ3IC0xNDguNSAtMjM2LjV0LTI3MSAtODkuNXpNODg0IDY3MmgtNzQ0di00NjVxMTcgLTgxIDczIC0xNDF0MTMzLjUgLTkwdDE2NS41IC0zMHQxNjUuNSAzMHQxMzMuNSA5MHQ3MyAxNDF2NDY1CnpNNjAwLjUgMzg2cS0xOS41IDAgLTMzIDE0dC0xMy41IDM0dDEzLjUgMzQuNXQzMyAxNC41dDMzLjUgLTE0LjV0MTQgLTM0LjV0LTE0IC0zNHQtMzMuNSAtMTR6TTQyMi41IDM4NnEtMTkuNSAwIC0zMyAxNHQtMTMuNSAzNHQxMy41IDM0LjV0MzMgMTQuNXQzMy41IC0xNC41dDE0IC0zNC41dC0xNCAtMzR0LTMzLjUgLTE0ek03NDIgMjU0cS0yMiAtNzkgLTg1LjUgLTEyOXQtMTQ0LjUgLTUwdC0xNDUgNTB0LTg1IDEyOWg0NjB6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InR1Ymlhb3FpbmdnYW4iIHVuaWNvZGU9IiYjeGU2Yjk7IiAKZD0iTTUxMiAtMTEwdjBxLTM4IDAgLTcwIDMycS0yMyAyMCAtMTY1IDE3OS41dC0xNDMgMTYwLjVxLTcwIDcwIC03MCAxNTkuNXQ3MCAxNjAuNWw3IDZxNjQgNjQgMTczIDY0cTQ3IDAgOTIuNSAtMTcuNXQ3OS41IC00Ni41djBxNyAtMTMgMTkuNSAtMTN0MTkuNSA3djBsNiA2cTY0IDY0IDE3MyA2NHE0NyAwIDkyLjUgLTE3LjV0ODAuNSAtNDYuNWw2IC02cTc3IC02OCA3NyAtMTYwcTAgLTkwIC03MCAtMTYwcS0xIC0xIC0xNDEgLTE1OQp0LTE2NyAtMTgxcS0zMiAtMzIgLTcwIC0zMnpNMzE0IDYwMXEtNzMgMCAtMTM1IC01MWwtNiAtN3EtNTEgLTUxIC01MSAtMTIxcTAgLTc0IDU3IC0xMjJ2MHE1MSAtNTQgMTcyIC0xODl0MTM1IC0xNTBxMjAgLTE5IDMyIC0xOXEzIDAgOCAzdDEyIDh0MTIgOHEyOSAyOSAxMzQuNSAxNDd0MTY2LjUgMTkydjBxNTggNDggNTggMTIxLjV0LTU4IDEyMS41bC02IDdxLTYyIDUxIC0xMzUgNTFxLTc2IDAgLTEyOCAtNTFxLTIgLTIgLTEwLjUgLTcKdC0xNSAtOC41dC0xOSAtN3QtMjUuNSAtMy41cS00OCAwIC02NCAzMnEtNjcgNDUgLTEzNCA0NXpNMTg2IDQzNHYwcS0xMyAwIC0xMyAyMHE4IDM0IDM4IDY0bDcgNnE2MiA1MiAxNDAgMzJxMTMgMCAxMyAtMTlxMCAtMTMgLTE5IC0xM3EtMzIgNSAtNjEuNSAtMi41dC00Ny41IC0yOS41bC0xMyA2cS0yIC0zIC04LjUgLTEyLjV0LTkgLTEzLjV0LTUgLTExdC0yLjUgLTE0cS0xMyAtMTMgLTE5IC0xM3pNNDE2IDQ5OHEtNiAwIC0xMi41IDYuNQp0LTEzLjUgNi41cS02IDcgLTYgMTlxMTAgMTAgMTkgMHExMyAtMTIgMTkgLTEycTEwIC0xMCAwIC0yMGgtNnoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iaHVhdG9uZyIgdW5pY29kZT0iJiN4ZTYwOTsiIApkPSJNNzc0IDY4OXEtNzEgMCAtMTI2IC00NHQtNzEgLTExMnEtMjEgLTIwIC0xMTkuNSAtMTEydC0xNjIuNSAtMTU0LjV0LTY0IC03MS41cTAgLTUgMiAtMTF0MiAtOS41dC00IC01LjVxLTMwIC0xOSAtNTEgLTU0dC0yNyAtNTUuNXQtNiAtMjUuNXEwIC0xNSAxIC0yNnQ1LjUgLTI2dDEyIC0yNC41dDIyLjUgLTE2LjV0MzcgLTdxMjYgMCA1Mi41IDEzLjV0NDguNSAzMy41dDQzLjUgMzkuNXQ0NSAzMy41dDQ2LjUgMTRxMzAgMCA1MiAtMjIKdDIyIC01MnEwIC0xNyAtMTcgLTQxLjV0LTM4IC00OXQtMjYgLTM2LjVxNyAtNyAyMCAtN3EzNyAzNiA1OSA3My41dDIyIDY3LjVxMCAzNSAtMjcuNSA2MXQtNjYuNSAyNnEtMjcgMCAtNjIgLTIxdC02Mi41IC00NnQtNjAuNSAtNDZ0LTU4IC0yMXEtNDcgMCAtNDcgNjdxMCA4IDMgMjJ0MTAuNSAzNHQyMy41IDQwdDM3IDMxcTYgLTUgMTcuNSAtMTkuNXQxOS41IC0yMXQxNyAtNi41cTI5OSAxNDMgNDMwIDE5MHEyMiAtNSA0NSAtNQpxODQgMCAxNDMgNTl0NTkgMTQyLjV0LTU5IDE0Mi41dC0xNDMgNTl6TTMwOSAxMzJxLTUxIDUxIC01MSA1OGwyMjQgMjA1cTM0IC01MyA2MSAtOTN0MjggLTM5djBxLTE3NSAtODUgLTI2MiAtMTMxek01OTcgMjY5bC05NCAxNDBxMCAxIDE3IDE4LjV0MzQuNSAzNXQxNy41IDE2LjVxLTEgLTE5IDEwLjUgLTU0dDI4LjUgLTU3cTI0IC0zMiA2OSAtNjBxMSAtMSAtMjAgLTEwLjVsLTQyIC0xOXpNNzc0IDMyNnEtNjcgMCAtMTE0LjUgNDcuNQp0LTQ3LjUgMTE0dDQ3LjUgMTEzLjV0MTE0LjUgNDd0MTE0LjUgLTQ3dDQ3LjUgLTExMy41dC00Ny41IC0xMTR0LTExNC41IC00Ny41eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ3byIgdW5pY29kZT0iJiN4ZTZhMzsiIApkPSJNNjcyIDY2NnEtNjcgNzEgLTE2MiA3MXQtMTYyIC03MXEtNjcgLTY5IC02NyAtMTY3dDY3IC0xNjhxMTcgLTE5IDM5IC0zM3EtODcgLTI5IC0xNDggLTkwcS0xMTcgLTExNiAtMTE4IC0zMjZxMCAtMTIgOSAtMjF0MjIgLTl2MHExMyAwIDIyIDguNXQ5IDIxLjVxMCAyMzcgMTYyIDMzMHEzNiAyMSA3OS41IDMzdDYwLjUgMTMuNXQyNyAxLjV2MHE0IDAgOCAxcTg5IDQgMTUyIDcwcTY3IDcwIDY3IDE2OHQtNjcgMTY3ek01MTAgMzIyCnEtNjkgMCAtMTE4IDUydC00OSAxMjV0NDkgMTI0LjV0MTE4IDUxLjV0MTE4IC01MS41dDQ5IC0xMjQuNXQtNDkgLTEyNXQtMTE4IC01MnpNNzYyIDIzN3EtMTEgNiAtMjMuNSAzdC0xOSAtMTR0LTMuNSAtMjMuNXQxNCAtMTguNXEzIC0xIDggLTUuNXQxOC41IC0xOXQyNC41IC0zMy41cTU3IC05NCA1NyAtMjQ4cTAgLTEyIDkgLTIxdDIyIC05dDIyIDl0OSAyMXEwIDc3IC0xNC41IDE0Mi41dC0zMi41IDEwMnQtNDEgNjUuNXQtMzMuNSAzNwp0LTE2LjUgMTJ6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InNoaXBpbiIgdW5pY29kZT0iJiN4ZTYwNjsiIApkPSJNODk1IDQ4MXYtMzU4cTAgLTkgLTggLTE0dC0xNyAtMWwtMTk3IDEwN2wtMTEgNmwtMyAxcS0yIDEgLTMgMnEtMTAgOSAtNCAyMHEzIDYgOS41IDh0MTIuNSAtMWwxODggLTEwMXYzMDRsLTE4OCAtMTAxcS04IC01IC0xNiAwdC04IDE0djE2M2gtNDg4di00NTZoNTA1cTYgMCAxMSAtNXQ1IC0xMS41dC01IC0xMS41dC0xMSAtNWgtNTIxcS03IDAgLTEyIDV0LTUgMTJ2NDg4cTAgNyA1IDExLjV0MTIgNC41aDUyMXE2IDAgMTEgLTQuNQp0NSAtMTEuNXYtMTUybDE4NyAxMDFxOSA1IDE3IDB0OCAtMTR6TTY4MyAyMDl6TTY1MCAyMzdoMzN2LTE4MGgtMzN2MTgweiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ6dWlqaW5ib2ZhbmciIHVuaWNvZGU9IiYjeGU2NzY7IiAKZD0iTTUxMiA3NDhxLTkxIDAgLTE3NCAtMzUuNXQtMTQzIC05NS41dC05NS41IC0xNDN0LTM1LjUgLTE3NHQzNS41IC0xNzR0OTUuNSAtMTQyLjV0MTQzIC05NXQxNzQgLTM1LjV0MTczLjUgMzUuNXQxNDIuNSA5NXQ5NS41IDE0Mi41dDM1LjUgMTc0dC0zNS41IDE3NHQtOTUuNSAxNDN0LTE0Mi41IDk1LjV0LTE3My41IDM1LjV6TTUxMS41IC05MnEtMTA2LjUgMCAtMTk2LjUgNTIuNXQtMTQyLjUgMTQzdC01Mi41IDE5N3Q1Mi41IDE5Ni41CnQxNDIuNSAxNDIuNXQxOTYuNSA1Mi41dDE5NyAtNTIuNXQxNDIuNSAtMTQyLjV0NTIgLTE5Ni41dC01MiAtMTk3dC0xNDIuNSAtMTQzdC0xOTcgLTUyLjV6TTc2MiAzMDBoLTIzNnYyMzdxMCA2IC03IDEwLjV0LTE2IDQuNWgtMTFxLTkgMCAtMTYgLTQuNXQtNyAtMTAuNXYtMjc3cTAgLTYgNiAtMTFxNSAtNSAxMCAtNWg3djBoMTF2MGgyNTlxNiAwIDEwLjUgNi41dDQuNSAxNi41djExcTAgOSAtNC41IDE1LjV0LTEwLjUgNi41eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJjaSIgdW5pY29kZT0iJiN4ZTZlMDsiIApkPSJNNDU4IDM3NHExMiAxIDI1IDFxMTMgMSAyOSAxaDQwaDM4cTE3IC0xIDMwIC0xLjV0MjQgLTF0MjQgLTEuNWw5IC0xdjUzbC05IC0xbC0yNCAtMnEtMTEgLTEgLTI0IC0xcS0xMyAtMSAtMzAgLTFoLTM5aC0zOXQtMzAgMXEtMTIgMCAtMjQgMWwtMjQgMmwtOSAxdi01Mmw5IDFxMTIgMSAyNCAxek0zMjIgNDk4cTggLTEwIDE1IC0yMHE3IC0xMSAxNCAtMjIuNXQxNSAtMjYuNWw0IC03bDQ2IDI1bC01IDdxLTEwIDE2IC0xNy41IDI4LjUKdC0xNS41IDIzdC0xNyAyMC41cS05IDExIC0yMCAyM2wtNSA2bC0zNyAtMjhsNSAtN3ExMSAtMTMgMTggLTIyek02NDYgMTM3bC0xIDlxLTIgMTQgLTIuNSAyNHQtMC41IDI0djEwM3YxN3QxIDExbDIgMTBoLTEwcS0xMSAwIC0yMCAtMWgtMTdxLTggLTEgLTE5IC0xaC03NHEtMTAgMCAtMTkgMXEtOSAwIC0yMSAxaC0xMGwyIC0xMGwyIC0xMnQxIC0xNnYtMTExcTAgLTggLTEgLTE1cS04IDkgLTEyIDIzbC00IDE1bC0xMCAtMTEKcS0xNyAtMjAgLTMxIC0zNHEtNyAtNiAtMTMgLTEydjE1OHEwIDE4IDIgMzZxMyAxNyA2IDI1bDcgMTRsLTE1IC0ycS0xMCAtMSAtMjcgLTJ0LTM0IC0xcS0yNCAwIC0zNy41IDF0LTIyLjUgMmwtOSAxdi01OGwxMCAzcTE1IDQgMzMgNnExNSAyIDM4IDJ2LTE4NnEwIC0xOSAtNSAtMzR0LTE0IC0yNGwtOCAtN2wxMCAtNnExNCAtOCAyNiAtMjJsNyAtOGw2IDhxNSA2IDguNSAxMXQ3LjUgOXE1IDYgOS41IDExdDExLjUgMTFsNTkgNTgKcTAgLTkgLTIgLTIwbC0xIC05aDU0djQyaDg0di0zNGg1M3pNNTA5IDIxMXY4Mmg4NHYtODJoLTg0ek03MDUgNTE2cS0xNiAtMSAtMzEgLTFxLTE2IC0xIC0zNiAtMWgtOTVxLTIxIDAgLTM3LjUgMC41dC0zMS41IDEuNXQtMjkgMmgtOXYtNTJoMTRxMjIgMiAzMSAycTE1IDEgMjkgMXExMyAwIDIzIDFoMjJoMTM2di0zNTRxMCAtOCAtMiAtMTNxLTEgLTMgLTUgLTRxLTUgLTIgLTE2IC0yaC00cS0xNSAwIC00MSA0bC0xOCAzbDEwIC0xNQpxNSAtOCA2IC0xNHExIC03IDIgLTE5bDEgLTdoOHEzNCAwIDU1IDJxMjIgMyAzNCAxMXExMyA5IDE4IDI0cTQgMTMgNCAzM3YyODN2NDBxMCAxOCAwLjUgMzB0MSAyMXQxLjUgMTVsMiAxMGwtMTAgLTFxLTE4IC0xIC0zMyAtMXpNNTEyIDc0OHEtOTEgMCAtMTc0IC0zNS41dC0xNDMgLTk1LjV0LTk1LjUgLTE0Mi41dC0zNS41IC0xNzR0MzUuNSAtMTc0dDk1LjUgLTE0Mi41dDE0MyAtOTUuNXQxNzQgLTM1LjV0MTc0IDM1LjV0MTQzIDk1LjUKdDk1LjUgMTQyLjV0MzUuNSAxNzR0LTM1LjUgMTc0dC05NS41IDE0Mi41dC0xNDMgOTUuNXQtMTc0IDM1LjV6TTc4NS41IDI3LjVxLTUzLjUgLTUzLjUgLTEyMy41IC04Mi41cS03MSAtMzEgLTE1MCAtMzF0LTE1MCAzMXEtNzAgMjkgLTEyMy41IDgyLjV0LTgyLjUgMTIyLjVxLTMwIDcyIC0zMCAxNTAuNXQzMCAxNTAuNXEyOSA2OSA4Mi41IDEyMi41dDEyMy41IDgyLjVxNzEgMzEgMTUwIDMxdDE1MCAtMzFxNzAgLTI5IDEyMy41IC04Mi41CnQ4Mi41IC0xMjIuNXEzMCAtNzIgMzAgLTE1MC41dC0zMCAtMTUwLjVxLTI5IC02OSAtODIuNSAtMTIyLjV6TTcxMiA0Nzl6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InlpamlhbmZhbmt1aSIgdW5pY29kZT0iJiN4ZTYyYTsiIApkPSJNNzc1IDQ4MmwtMTIyIDEzMmwtMzgxIC0zOTZsMTI3IC0xMjh6TTI2MSAyMDBsLTUyIC0xNzJsMTcyIDQ3ek0xNDIgLTQ0aDc0MHYtMzRoLTc0MHYzNHpNNjY3IDYyNHE0IDQgOS41IDExdDIzLjUgMjJ0MzUuNSAyMnQ0MS41IDMuNXQ0NC41IC0yNXQyNC41IC00NS41dC01IC00My41dC0yMSAtMzZ0LTIyIC0yNS41bC0xMSAtOXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0icGxheS1vIiB1bmljb2RlPSImI3hlNjA4OyIgCmQ9Ik0zODAgMTAzdjB2MXYtMXpNNTEyIDczNnEtOTEgMCAtMTc0IC0zNS41dC0xNDMgLTk1LjV0LTk1LjUgLTE0M3QtMzUuNSAtMTc0dDM1LjUgLTE3NHQ5NS41IC0xNDN0MTQzIC05NS41dDE3NCAtMzUuNXQxNzQgMzUuNXQxNDMgOTUuNXQ5NS41IDE0M3QzNS41IDE3NHQtMzUuNSAxNzR0LTk1LjUgMTQzdC0xNDMgOTUuNXQtMTc0IDM1LjV2MHpNNTEyIC0xMTVxLTExMCAwIC0yMDIuNSA1NHQtMTQ2LjUgMTQ2LjV0LTU0IDIwMi41dDU0IDIwMi41CnQxNDYuNSAxNDYuNXQyMDIgNTR0MjAyLjUgLTU0dDE0NyAtMTQ2LjV0NTQgLTIwMi41dC01NCAtMjAyLjV0LTE0NyAtMTQ2LjV0LTIwMiAtNTR2MHpNNzI1IDMxNXYwcTcgLTQgOCAtNWwtOCA1cS0zOCAyNSAtMTc0LjUgMTAyLjV0LTE0Mi41IDc3LjVxLTEyIDAgLTIwIC05cS01IC02IC04IC0xN3EtMSAtNCAtMSAtMTgzdDEgLTE4M3EzIC0xMCAxNC41IC0xN3QyMS41IC00cTUgMiA5IDVsMzAxIDE3M3EyMCA1IDE4IDI2cTEgMTAgLTQuNSAxOC41CnQtMTQuNSAxMC41djB6TTQzNCAxNTB2MjczbDIzNyAtMTM3ek00MzQgMTUweiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJjYWlkYW4wMSIgdW5pY29kZT0iJiN4ZTYwNzsiIApkPSJNNjQgMjF2NjdoODk1di02N2gtODk1ek02NCAzMzVoODk1di02OGgtODk1djY4ek02NCA1ODFoODk1di02N2gtODk1djY3eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ3ZWNoYXRpY29uMTYiIHVuaWNvZGU9IiYjeGU2MWY7IiAKZD0iTTc2MSAtNjdoLTQ5OHEtNDIgMCAtNzEuNSAyOS41dC0yOS41IDcxLjV2NDAwcTAgNDIgMjcuNSA3MS41dDY2LjUgMjkuNWg2NHYtNjBoLTY0cS0xNCAwIC0yNCAtMTJ0LTEwIC0yOXYtNDAwcTAgLTE3IDEyIC0yOS41dDI5IC0xMi41aDQ5OHExNyAwIDI5IDEyLjV0MTIgMjkuNXY0MDBxMCAxNyAtMTAgMjl0LTI0IDEyaC02NHY2MGg2NHEzOSAwIDY2LjUgLTI5LjV0MjcuNSAtNzEuNXYtNDAwcTAgLTQyIC0yOS41IC03MS41CnQtNzEuNSAtMjkuNXpNNjgxIDM1My41cS04IDguNSAtMjAgOXQtMjAgLTcuNWwtMTAxIC05MnY0MTJxMCAxMSAtOCAxOS41dC0yMCA4LjV0LTIwIC04LjV0LTggLTE5LjV2LTQxMGwtOTYgOTBxLTggOCAtMjAgNy41dC0yMCAtOXQtNy41IC0yMHQ4LjUgLTE5LjVsMTQzIC0xMzZsMSAtMWw0IC0ydi0xbDQgLTJ2MHExIDAgNCAtMWgwLjVoMC41cTMgLTEgNiAtMXQ1IDFoMS41aDAuNXEzIDEgNCAxbDIgMXQzIDJsMSAxcTEgMCAxLjUgMC41CmwwLjUgMC41bDE0OCAxMzZxOSA4IDkuNSAyMHQtNy41IDIwLjV6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImFsYXJtIiB1bmljb2RlPSImI3hlNjAwOyIgCmQ9Ik04NjAgMzlxLTQ0IDMzIC02OCA4MXQtMjQgMTAzdjE1NHEwIDk1IC01Ny41IDE3MHQtMTQ3LjUgMTAxdjM2cTAgMzIgLTIyLjUgNTQuNXQtNTQgMjIuNXQtNTQgLTIyLjV0LTIyLjUgLTU0LjV2LTM2cS05MCAtMjYgLTE0Ny41IC0xMDF0LTU3LjUgLTE3MHYtMTU0cTAgLTU1IC0yNCAtMTAzdC02OCAtODFxLTE1IC0xMSAtOSAtMjguNXQyNCAtMTcuNWgyMzNxLTMgLTEzIC0zIC0yNnEwIC01MyAzNy41IC05MC41dDkwLjUgLTM3LjUKdDkwLjUgMzcuNXQzNy41IDkwLjVxMCAxMyAtMiAyNmgyMzNxMTggMCAyNCAxNy41dC05IDI4LjV2MHpNNDYxIDY4NHEwIDExIDcuNSAxOC41dDE4IDcuNXQxOCAtNy41dDcuNSAtMTguNXYtMjdxLTEzIDEgLTI1LjUgMXQtMjUuNSAtMXYyN3pNNTYzIC0zM3EwIC0zMiAtMjIuNSAtNTQuNXQtNTQgLTIyLjV0LTU0IDIyLjV0LTIyLjUgNTQuNXEwIDEzIDQgMjZoMTQ1cTQgLTEzIDQgLTI2ek0xOTIgNDRxMTkgMjQgMzMgNTFxMzEgNjAgMzEgMTI4CnYxNTRxMCA5NSA2Ny41IDE2Mi41dDE2MyA2Ny41dDE2MyAtNjcuNXQ2Ny41IC0xNjIuNXYtMTU0cTAgLTY4IDMwIC0xMjhxMTQgLTI3IDM0IC01MWgtNTg5djB6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InR1aWppYW4iIHVuaWNvZGU9IiYjeGU2NDg7IiAKZD0iTTY1MiAzMDloLTIxMXEtOCAwIC0xNC41IC01LjV0LTYuNSAtMTMuNXQ2LjUgLTEzLjV0MTQuNSAtNS41aDIxMXE5IDAgMTUgNS41dDYgMTMuNXQtNiAxMy41dC0xNSA1LjV6TTM4NSA0ODdoLTE0cS05IDAgLTE1IC01LjV0LTYgLTEzLjV0NiAtMTMuNXQxNSAtNS41aDE0cTkgMCAxNSA1LjV0NiAxMy41dC02IDEzLjV0LTE1IDUuNXpNMzg1IDM5OGgtMTRxLTkgMCAtMTUgLTUuNXQtNiAtMTMuNXQ2IC0xMy41dDE1IC01LjVoMTQKcTkgMCAxNSA1LjV0NiAxMy41dC02IDEzLjV0LTE1IDUuNXpNMzg1IDMwOWgtMTRxLTkgMCAtMTUgLTUuNXQtNiAtMTMuNXQ2IC0xMy41dDE1IC01LjVoMTRxOSAwIDE1IDUuNXQ2IDEzLjV0LTYgMTMuNXQtMTUgNS41ek02NTIgMzk4aC0yMTFxLTggMCAtMTQuNSAtNS41dC02LjUgLTEzLjV0Ni41IC0xMy41dDE0LjUgLTUuNWgyMTFxOSAwIDE1IDUuNXQ2IDEzLjV0LTYgMTMuNXQtMTUgNS41ek01MTEuNSA3NDdxLTkwLjUgMCAtMTczLjUgLTM1LjUKdC0xNDIuNSAtOTUuNXQtOTUgLTE0Mi41dC0zNS41IC0xNzMuNXQzNS41IC0xNzMuNXQ5NSAtMTQyLjV0MTQyLjUgLTk1LjV0MTczLjUgLTM1LjV0MTczLjUgMzUuNXQxNDMgOTUuNXQ5NSAxNDIuNXQzNSAxNzMuNXQtMzUgMTczLjV0LTk1IDE0Mi41dC0xNDMgOTUuNXQtMTczLjUgMzUuNXpNNzE3IC00MGwtMjA1IDEyMmwtMjA2IC0xMjJ2NjE0cTEgMyA0IDYuNXQxNSAxMy41dDI4LjUgMTh0NDguNSAxNi41dDcyIDExLjVoNzUKcTQwIC0zIDcyIC0xMXQ0OSAtMTd0MjguNSAtMTcuNXQxNC41IC0xNC41bDQgLTZ2LTYxNHpNNjUyIDQ4N2gtMjExcS04IDAgLTE0LjUgLTUuNXQtNi41IC0xMy41dDYuNSAtMTMuNXQxNC41IC01LjVoMjExcTkgMCAxNSA1LjV0NiAxMy41dC02IDEzLjV0LTE1IDUuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic2h1YXhpbiIgdW5pY29kZT0iJiN4ZTY0ZjsiIApkPSJNNTk4IC0xMzZxMTAwIDIxIDE3NSA5MHQxMDguNSAxNjd0MTQuNSAyMDJxLTE3IDkzIC04MyAxNzFxLTkgMTAgLTE0LjUgMTUuNXQtMTQuNSAxMXQtMTggNHQtMTkgLTguNXEtOCAtNiAtMTEgLTEydC0xIC0xNHQzLjUgLTExdDguNSAtMTR0OCAtMTFxMiAtNCA2LjUgLTkuNXQ2LjUgLTcuNXE3MSAtOTggNjQuNSAtMjEydC04OC41IC0xOTlxLTgxIC04NSAtMTk2IC05Ny41dC0yMTMgNTIuNXQtMTMwLjUgMTc1dDE0LjUgMjIxCnEzNCA4MSAxMTUuNSAxMzMuNXQxNTQuNSA0MS41cTEgLTggLTIgLTE0dC05LjUgLTEzdC04LjUgLTEwcS0zIC00IC0xNCAtMTd0LTE1LjUgLTIwdC0zIC0xOC41dDEzLjUgLTIxLjVxMTAgLTggMTguNSAtOS41dDE2LjUgMy41dDEzLjUgMTAuNXQxMyAxNXQxMi41IDEzLjVxMiAyIDE4IDIycTggMTAgMjIgMjdxMTcgMjEgMjQuNSAyOS41dDE1LjUgMjIuNXQxMCAxOHQwIDE1LjV0LTUuNSAxNWwtMTYgMTZ0LTIyIDIwdC0zMi41IDI0LjUKcS0xMyA5IC0yMCAxNXEtNyA1IC0yMSAyMHQtMjMuNSAyM3QtMjQuNSA4LjV0LTI5IC0xNC41cS0xNSAtMTQgLTExIC0yN3QxNC41IC0yMXQyMy41IC0yMC41dDE2IC0yNC41cS04NiAtMjkgLTkzIC0zMnEtNjggLTI2IC0xMjIuNSAtNzYuNXQtODUuNSAtMTEzdC00MSAtMTM0dDExIC0xMzkuNXEzMCAtMTAwIDEwMS41IC0xNzJ0MTY4IC0xMDEuNXQxOTYuNSAtNy41eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ6YW50aW5nIiB1bmljb2RlPSImI3hlNjFlOyIgCmQ9Ik01MTIgODExcS0xMDQgMCAtMTk5IC00MC41dC0xNjMgLTEwOC41dC0xMDguNSAtMTYzdC00MC41IC0xOTl0NDAuNSAtMTk5dDEwOC41IC0xNjN0MTYzIC0xMDguNXQxOTkgLTQwLjV0MTk5IDQwLjV0MTYzIDEwOC41dDEwOC41IDE2M3Q0MC41IDE5OXQtNDAuNSAxOTl0LTEwOC41IDE2M3QtMTYzIDEwOC41dC0xOTkgNDAuNXpNNTEyIC0xNjJxLTk0IDAgLTE3OS41IDM2LjV0LTE0Ny41IDk4LjV0LTk4LjUgMTQ3LjV0LTM2LjUgMTc5LjUKdDM2LjUgMTc5LjV0OTguNSAxNDcuNXQxNDcuNSA5OC41dDE3OS41IDM2LjV0MTc5LjUgLTM2LjV0MTQ3LjUgLTk4LjV0OTguNSAtMTQ3LjV0MzYuNSAtMTc5LjV0LTM2LjUgLTE3OS41dC05OC41IC0xNDcuNXQtMTQ3LjUgLTk4LjV0LTE3OS41IC0zNi41ek00MTcgNDJoLTRxLTEyIDAgLTIxIDl0LTkgMjF2NDU2cTAgMTIgOSAyMXQyMSA5aDRxMTIgMCAyMSAtOXQ5IC0yMXYtNDU2cTAgLTEyIC05IC0yMXQtMjEgLTl6TTYwOSA0NWgtMwpxLTEyIDAgLTIxIDguNXQtOSAyMS41djQ1MHEwIDEzIDkgMjEuNXQyMSA4LjVoM3ExMyAwIDIxLjUgLTguNXQ4LjUgLTIxLjV2LTQ1MHEwIC0xMyAtOC41IC0yMS41dC0yMS41IC04LjV6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImRhbnF1eHVuaHVhbiIgdW5pY29kZT0iJiN4ZTYyZDsiIApkPSJNMzM2IDEyNHEtNzMgMCAtMTI0LjUgNTEuNXQtNTEuNSAxMjQuNXQ1MS41IDEyNC41dDEyNC41IDUxLjVoMTc2cTExIDAgMTUgMTB0LTQgMTdsLTgwIDgwcS0xMSAxMiAtMjIuNSAwLjV0MC41IC0yMi41bDUyIC01M2gtMTM3cS04NiAwIC0xNDcgLTYxdC02MSAtMTQ3dDYxIC0xNDd0MTQ3IC02MXE3IDAgMTEuNSA0LjV0NC41IDExLjV0LTQuNSAxMS41dC0xMS41IDQuNXpNNjg4IDUwOHEtNyAwIC0xMS41IC00LjV0LTQuNSAtMTEuNQp0NC41IC0xMS41dDExLjUgLTQuNXE3MyAwIDEyNC41IC01MS41dDUxLjUgLTEyNC41dC01MS41IC0xMjQuNXQtMTI0LjUgLTUxLjVoLTE3NnEtMTEgMCAtMTUgLTEwdDQgLTE3bDgwIC04MHE0IC01IDExIC01dDExIDVxMTIgMTEgMCAyMmwtNTIgNTNoMTM3cTg2IDAgMTQ3IDYxdDYxIDE0N3QtNjEgMTQ3dC0xNDcgNjF6TTU0NCAxODhxNyAwIDExLjUgNC41dDQuNSAxMS41dC00LjUgMTEuNXQtMTEuNSA0LjVoLTE2djE3NnEwIDMgLTEgNgpxLTMgNiAtOSA4LjV0LTEyIDAuNXEtMyAtMSAtNSAtNGwtMzIgLTMycS0xMiAtMTEgMCAtMjJxNCAtNSAxMSAtNXQxMSA1bDUgNHYtMTM3aC0xNnEtNyAwIC0xMS41IC00LjV0LTQuNSAtMTEuNXQ0LjUgLTExLjV0MTEuNSAtNC41aDY0eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ0aW5nZ2VzaGlxdSIgdW5pY29kZT0iJiN4ZTgxMTsiIApkPSJNOTkyIDIyNGwtNjUgMTdxMTMgLTg2IC0xMCAtMTcwLjV0LTc3IC0xNTMuNWw2NSAtMTdxNTEgNzEgNzMgMTUzLjV0MTQgMTcwLjV6TTg1OCA3MTFsLTI5NCAtMTA1di01M3YtMzk4cS01NiAyMyAtMTE5IDZxLTY3IC0xOCAtMTA0LjUgLTY5LjV0LTIyLjUgLTEwNnQ3Mi41IC04MC41dDEyNC41IC04cTY0IDE3IDEwMSA2NHQyOSAxMDBoM3Y0OTFsMjEwIDc1djg0ek00NiAzMDMuNXEtMjIgLTgyLjUgLTE0IC0xNzAuNWw2NSAtMTcKcS0xMyA4NyA5LjUgMTcxLjV0NzcuNSAxNTIuNWwtNjUgMThxLTUxIC03MiAtNzMgLTE1NC41ek04NTcgMjA1bC02NSAxOHE4IC01NSAtNi41IC0xMDcuNXQtNDcuNSAtOTUuNWw2NSAtMTdxMjkgNDUgNDMgOTYuNXQxMSAxMDUuNXpNMTk4IDI3My41cS0xNCAtNTEuNSAtMTEgLTEwNS41bDY1IC0xOHEtNyA1NCA3IDEwN3Q0NyA5NmwtNjUgMTdxLTI5IC00NSAtNDMgLTk2LjV6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Inl1bnBhbiIgdW5pY29kZT0iJiN4ZTY0NTsiIApkPSJNODIyIDMzN3E1IDI0IDUgNDhxMCA5NyAtNjggMTY1dC0xNjQgNjhxLTc5IDAgLTE0MC41IC00OHQtODIuNSAtMTIycS0yMyA0IC00MiA0cS0xMTAgMCAtMTg3LjUgLTc4dC03Ny41IC0xODcuNXQ3Ny41IC0xODcuNXQxODcuNSAtNzhoNDE0aDE3djJxODQgNiAxNDEuNSA2Ny41dDU3LjUgMTQ2LjVxMCA2NyAtMzggMTIxLjV0LTEwMCA3OC41ek03NjEgLTQ0di0yaC00MzFxLTk2IDAgLTE2NCA2OHQtNjggMTY0LjV0NjggMTY0LjV0MTY0IDY4CnEzNSAwIDY5IC0xMXE4IDc1IDY0IDEyNS41dDEzMiA1MC41cTgzIDAgMTQxIC01OHQ1OCAtMTQxcTAgLTM0IC0xMyAtNzBxNjMgLTEyIDEwNC41IC02Mi41dDQxLjUgLTExNS41cTAgLTcxIC00OCAtMTIzdC0xMTggLTU4ek0zODAgMTIwcS03IDAgLTEyIC01dC01IC0xMnYtMTQ5aDM0bC0xIDE0OXEwIDcgLTQuNSAxMnQtMTEuNSA1ek01MTIgMTIwcS03IDAgLTExLjUgLTQuNXQtNC41IC0xMC41di0xNTFoMzN2MTUxcTAgNiAtNSAxMC41CnQtMTIgNC41ek02NDUgMTIwcS03IDAgLTEyIC00LjV0LTUgLTEwLjV2LTE1MWgzNHYxNTFxMCA2IC01IDEwLjV0LTEyIDQuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic3EiIHVuaWNvZGU9IiYjeGU4YTk7IiAKZD0iTTQxMiAzMjVoLTAuNWgtMS41aC05MXEtMTQgMCAtMjQuNSAxMC41dC0xMC41IDI0LjV0MTAuNSAyNC41dDI0LjUgMTAuNWgxLjVoMWgxaDEuNWgxMzVxOSAwIDE1LjUgNi41dDYuNSAxNS41dC02LjUgMTV0LTE1LjUgNmgtMTM1aC0xLjVoLTFoLTFoLTEuNXEtMzIgMCAtNTUuNSAtMjN0LTIzLjUgLTU1cTAgLTMwIDIwLjUgLTUydDQ5LjUgLTI1cTQgLTEgNSAtMWg5NHExNCAwIDI0LjUgLTEwLjV0MTAuNSAtMjV0LTEwLjUgLTI0LjUKdC0yNC41IC0xMGgtMTQ3cS05IDAgLTE1LjUgLTYuNXQtNi41IC0xNS41dDYuNSAtMTV0MTUuNSAtNmgxNTFoNHEzMCA0IDUwLjUgMjZ0MjAuNSA1MnEwIDMxIC0yMiA1NHQtNTQgMjR6TTc3NCAxOTdxMTIgMTYgMTIgMzZ2MTQycTAgMjcgLTE5LjUgNDUuNXQtNDcuNSAxOC41aC0xMzFxLTI3IDAgLTQ2LjUgLTE4LjV0LTE5LjUgLTQ1LjV2LTE0MnEwIC0yNiAxOS41IC00NXQ0Ni41IC0xOWgxMzFxOCAwIDE4IDNsMTQgLTEzcTYgLTcgMTUgLTcKdDE1LjUgNi41dDYuNSAxNS41dC02IDE1ek03NDIgMjMzbC0xIC00bC0yNCAyNHEtNyA2IC0xNiA2dC0xNS41IC02LjV0LTYuNSAtMTUuNXQ3IC0xNWw5IC05aC0xMDdxLTkgMCAtMTUuNSA2dC02LjUgMTR2MTQycTAgOSA2LjUgMTV0MTUuNSA2aDEzMXExMCAwIDE2LjUgLTZ0Ni41IC0xNXYtMTQyek04NjYgNTU5aC03MDhxLTM5IDAgLTY2LjUgLTI3LjV0LTI3LjUgLTY2LjV2LTMzMHEwIC0zOSAyNy41IC02Ni41dDY2LjUgLTI3LjVoNzA4CnEzOSAwIDY2LjUgMjcuNXQyNy41IDY2LjV2MzMwcTAgMzkgLTI3LjUgNjYuNXQtNjYuNSAyNy41ek05MTMgMTM1cTAgLTIwIC0xNCAtMzMuNXQtMzMgLTEzLjVoLTcwOHEtMTkgMCAtMzMgMTMuNXQtMTQgMzMuNXYzMzBxMCAyMCAxNCAzMy41dDMzIDEzLjVoNzA4cTE5IDAgMzMgLTEzLjV0MTQgLTMzLjV2LTMzMHoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iZ2VxdSIgdW5pY29kZT0iJiN4ZTYxODsiIApkPSJNNzE4IDUxMmwtMjQgMjJxLTI5IDI3IC01NyAxOXEtMjkgLTggLTM4IC00MWwtNjMgLTI4M3EtMjkgMzYgLTcyIDQ2cS0xNiA1IC0zMyA1cS00NiAwIC04Mi41IC0yOC41dC00Ny41IC03My41cS0xNCAtNTQgMTQuNSAtMTAydDgyLjUgLTYycTE2IC00IDMzIC00cTQ3IDAgODMuNSAyOC41dDQ3LjUgNzMuNXYwdjB2MGw2NSAyOTBsNjkgLTYxcTM2IC0zNCA2OCAtMjBxMzAgMTMgMzAgNjRxMCA0MSAtMTQuNSA2My41dC02MS41IDYzLjV6Ck01MTMgMTI1bC0xIC0xcS04IC0zMyAtMzggLTUxdC02MyAtOXEtMzQgOCAtNTEuNSAzOHQtOS41IDYzcTcgMjggMzAgNDUuNXQ1MSAxNy41cTExIDAgMjEgLTJxMzMgLTkgNTEgLTM4LjV0MTAgLTYyLjV6TTc0MSAzNzFsLTEwIDhsLTkyIDgwbDkgMzlxMiA1IDEgNXEzIDAgMTEgLTdsMjQgLTIycTQxIC0zNyA0OS41IC01MHQ4LjUgLTM5cTAgLTggLTEgLTE0ek01MTIgNzM1cS04OCAwIC0xNjkgLTM0LjV0LTEzOSAtOTIuNXQtOTIuNSAtMTM5CnQtMzQuNSAtMTY5dDM0LjUgLTE2OXQ5Mi41IC0xMzl0MTM5IC05Mi41dDE2OSAtMzQuNXQxNjkgMzQuNXQxMzkgOTIuNXQ5Mi41IDEzOXQzNC41IDE2OXQtMzQuNSAxNjl0LTkyLjUgMTM5dC0xMzkgOTIuNXQtMTY5IDM0LjV6TTUxMiAtODRxLTEwNCAwIC0xOTIuNSA1MS41dC0xNDAgMTQwdC01MS41IDE5Mi41dDUxLjUgMTkyLjV0MTQwIDE0MHQxOTIuNSA1MS41dDE5Mi41IC01MS41dDE0MCAtMTQwdDUxLjUgLTE5Mi41dC01MS41IC0xOTIuNQp0LTE0MCAtMTQwdC0xOTIuNSAtNTEuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0idGluZ3lpbmxlIiB1bmljb2RlPSImI3hlNjAxOyIgCmQ9Ik0yNTIgMzA0aC0yM3EtODIgMCAtMTM3IC01NXQtNTUgLTEzNi41dDU1IC0xMzZ0MTM3IC01NC41aDIzcTExIDAgMTguNSA3LjV0Ny41IDE3LjV2MzMxcTAgMTEgLTcuNSAxOC41dC0xOC41IDcuNXpNMjI3IC0yN3EtNTkgMCAtOTguNSA0MHQtMzkuNSA5OS41dDM5LjUgOTkuNXQ5OC41IDQxdi0yODB6TTc5NSAzMDRoLTIzcS0xMSAwIC0xOC41IC03LjV0LTcuNSAtMTguNXYtMzMxcTAgLTEwIDcuNSAtMTcuNXQxOC41IC03LjVoMjMKcTgyIDAgMTM3IDU0LjV0NTUgMTM2dC01NSAxMzYuNXQtMTM3IDU1ek03OTcgLTI3djI4MHE1OSAtMSA5OC41IC00MXQzOS41IC05OS41dC0zOS41IC05OS41dC05OC41IC00MHpNNzQ2IDM0NnEwIC0xMSA3LjUgLTE4LjV0MTggLTcuNXQxOCA3LjV0Ny41IDE4LjV2NDdxMCAxMTggLTgzLjUgMjAxLjV0LTIwMS41IDgzLjV0LTIwMS41IC04My41dC04My41IC0yMDEuNXYtNDdxMCAtMTEgNy41IC0xOC41dDE4IC03LjV0MTggNy41dDcuNSAxOC41CnY0N3EwIDk3IDY4LjUgMTY1LjV0MTY1LjUgNjguNXQxNjUuNSAtNjguNXQ2OC41IC0xNjUuNXYtNDd6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImNhaWppYW4iIHVuaWNvZGU9IiYjeGU2MWE7IiAKZD0iTTkxNiA2MWgtODF2LTgxcTAgLTExIC04IC0xOC41dC0xOSAtOC41aDQ1cTM3IDAgNjMuNSAyNi41dDI2LjUgNjMuNXY0NXEwIC0xMSAtOCAtMTl0LTE5IC04ek0xNzEgLTQ3aDYzN3EtMTEgMSAtMTkgOC41dC04IDE4LjV2ODFoLTU5MnY1OTJoLTgxcS0xMSAwIC0xOSA4dC04IDE5di02MzdxMCAtMzcgMjYuNSAtNjMuNXQ2My41IC0yNi41ek04NTMgODE1aC02ODJxLTM3IDAgLTYzLjUgLTI2LjV0LTI2LjUgLTYzLjV2LTQ1cTAgMTEgOCAxOQp0MTkgOGg4MXY4MXEwIDExIDggMTl0MTkgOHQxOSAtOHQ4IC0xOXYtODFoNDI3bC01MCAtNTRoLTM3N3YtNDk5bDU4NiA2MTJsMzkgLTM4bC01ODggLTYxM2g1MDF2NDA0bDU0IDUzdi00NTdoODFxMTEgMCAxOSAtOHQ4IC0xOXY2MzdxMCAzNyAtMjYuNSA2My41dC02My41IDI2LjV6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9IjExMTc4IiB1bmljb2RlPSImI3hlNjI5OyIgCmQ9Ik01MDAgNDg0bDM4MyA2M3YtNTE5cTAgLTMyIC0yMiAtNTYuNXQtNjAgLTMzLjVxLTQxIC0xMCAtNzUuNSA1dC00Mi41IDQ2LjV0MTUuNSA2MXQ2NC41IDM5LjVxMzcgOSA3MCAtMnYzMTNsLTI4MSAtNTJsLTEgLTM4OXEwIC0yNyAtMjMgLTUxLjV0LTU4IC0zMi41cS00MSAtMTAgLTc3IDUuNXQtNDAgNDQuNXEtOCAzMiAxNSA2MXQ2NCAzOXEzNiA5IDY4IC0ydjQ2MHpNMzU3IDI5NGwxIDQ4MXE0IDAgMTIgLTAuNXQzMS41IC04LjV0NDcgLTIyCnQ1NS41IC00Ni41dDYxIC03Ny41cTAgMyAtMC41IDl0LTQuNSAyMy41dC0xMS41IDM0dC0yMy41IDM4dC0zOCAzOC41cS00MyAzMCAtNzUgNTV0LTQ2IDM4LjV0LTIyLjUgMjN0LTkuNSAxMy41bC0xIDNxLTEzIC0yIC0yMSAtOHQtOSAtMTJsLTIgLTZ2LTUwNnEtMzUgMTMgLTc1IDNxLTQ1IC0xMSAtNzAuNSAtNDMuNXQtMTYuNSAtNjYuNXE1IC0zMiA0NC41IC00OS41dDgzLjUgLTYuNXEzOSAxMCA2NCAzNi41dDI2IDU2LjV2MHpNNjM1IDYwNQpxMTMgMyAyMiAxMnQ5IDIwdjB2MTY3aDQuNXQxMSAtMi41dDE2LjUgLTcuNXQxOS41IC0xNi41dDIxLjUgLTI3LjVxMCAyOSAtMjggNTBxLTI0IDE3IC0zNyAyOC41dC0xNSAxNC41bC0xIDNxLTEwIC0xIC0xMSAtOHYtMTc3cS0xMiA1IC0yNyAxcS0xNSAtMyAtMjQgLTE0LjV0LTYgLTIzLjVxMiAtMTEgMTUuNSAtMTd0MjkuNSAtMnpNODE1IDYwNHExMCAzIDE2IDl0NiAxNHYxMTZxMyAxIDggMHQxOCAtMTAuNXQyNCAtMjYuNXEwIDIwIC0xOSAzNQpxLTE2IDExIC0yNS41IDE5dC0xMC41IDExbC0xIDJxLTMgLTEgLTUgLTIuNXQtMiAtMi41bC0xIC0xdi0xMjNxLTggMyAtMTggMHEtMTEgLTIgLTE3IC0xMHQtNCAtMTZxMSAtOCAxMSAtMTJ0MjAgLTJ6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InlvdWppYW5jYWlkYW5mdWZlaXhpYXphaSIgdW5pY29kZT0iJiN4ZTk2NzsiIApkPSJNODM1IDE1NWgtNTJ2MTdoMTdoMzV2MzVoLTM1bDM1IDg3aC0zNWwtMzUgLTY5bC0zNSA2OWgtMzVsMzUgLTg3aC0zNXYtMzVoNTN2LTE3aC01M3YtMzVoNTN2LTM1aDM1djM1aDUydjM1ek03NjcuNSAwcS03OS41IDAgLTEzNS41IDU2LjV0LTU2IDEzNnQ1NiAxMzUuNXQxMzUuNSA1NnQxMzYgLTU2dDU2LjUgLTEzNS41dC01Ni41IC0xMzZ0LTEzNiAtNTYuNXpNMTc2IDIzMGwxNSAtNzZxNyAtMzggNDAgLTY1dDcyIC0yN2gyMzQKcTEwIDAgMTcgN3Q3IDE3dC03IDE3dC0xNyA3aC0yMzRxLTIyIDAgLTQxLjUgMTZ0LTIzLjUgMzhsLTE1IDc1cS0yIDEwIC0xMCAxNS41dC0xOCAzLjV0LTE1LjUgLTEwdC0zLjUgLTE4ek01MzYgMzUwdjMzMnEwIDEwIC03IDE3dC0xNyA3dC0xNyAtN3QtNyAtMTd2LTMzMmwtMTQyIDE0MXEtNyA3IC0xNyA3dC0xNyAtN3QtNyAtMTd0NyAtMTdsMTgzIC0xODJxNyAtNyAxNyAtN3QxNyA3bDE4MyAxODJxNyA3IDcgMTd0LTcgMTd0LTE3IDcKdC0xNyAtN3oiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iMTEiIHVuaWNvZGU9IiYjeGU3MmU7IiAKZD0iTTc0NCA0MTF2MGwtNDA5IDQwOXEtMTEgMTIgLTI4IDEycS0xNSAwIC0yNiAtMTF0LTExIC0yNi41dDExIC0yNi41aC0xbDM4NCAtMzg0bC0zODMgLTM4M3YtMWgtMXYwcS0xMCAtMTEgLTEwIC0yNnEwIC0xNiAxMSAtMjd0MjYgLTExcTE2IDAgMjYgMTF2MGgxdjFsNDEwIDQxMHYwcTExIDExIDExIDI2LjV0LTExIDI2LjV2MHpNNzQ0IDQxMXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ieGlhbGEtY29weSIgdW5pY29kZT0iJiN4ZTYwZjsiIApkPSJNOTg2IDM1bC0zODQgMzc2cS0zIDUgLTEwIDExLjV0LTMxIDE3dC01MiAxMC41cS0yNCAwIC00NiAtNi41dC0zMiAtMTMuNWwtMTAgLTdsLTM4NyAtMzg4cTEgLTUgMi41IC0xMS41dDkgLTIxLjV0MTcuNSAtMjN0MjkuNSAtNi41dDQzLjUgMTkuNXExMyA5IDgzIDU5dDEzMy41IDk1bDYzLjUgNDVxNCAyIDEyLjUgNC41dDMzIDd0NDggNC41dDUzIC03dDUyLjUgLTIzcTM3IC0yNiAxMDQuNSAtNzV0MTE2LjUgLTg1bDQ5IC0zNgpxNCAtMiAxMCAtNHQyMS41IC0zdDI4LjUgMi41dDI1IDE4dDE2IDQwLjV2MHpNOTc2IDM3OWwtMzgzIDM3N3EtNCA1IC0xMC41IDExdC0zMC41IDE3dC01MiAxMXEtMjQgMCAtNDYuNSAtN3QtMzEuNSAtMTNsLTEwIC03bC0zODcgLTM4OXExIC00IDIuNSAtMTAuNXQ5IC0yMS41dDE3LjUgLTIzdDI5LjUgLTYuNXQ0My41IDE5LjVxMTMgOSA4MyA1OWwxMzMgOTVsNjMgNDVxNSAyIDEzLjUgNC41dDMzIDYuNXQ0Ny41IDQuNXQ1MyAtNi41dDUzIC0yNApxMzYgLTI1IDEwMy41IC03NHQxMTcuNSAtODVsNDkgLTM3bDkgLTN0MjIgLTMuNXQyOSAyLjV0MjUgMTguNXQxNSAzOS41eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJtLW1lbWJlcnMiIHVuaWNvZGU9IiYjeGU2Yjg7IiAKZD0iTTI3NSAtNDVoNDk3bDcxIDE0OGgtNjQ1ek03NDQgMGgtNDQybC0zMCA1OGg1MDBsLTI4IC01OHYwek03NjcgNjAwbC0xMzIgLTIzNGwtMTMwIDMzMmwtMTI2IC0zMzBsLTEyMiAyMzJsLTI5IC0yODJsLTE3MCAxMTVsMTI4IC0yOTNoNjY4bDExNiAzMDFsLTE2NiAtMTI2ek04MjMgMTg0aC02MDhsLTU0IDEyNmwxMDQgLTcxbDIyIDIwOWw5OSAtMTg5bDEyMCAzMTVsMTIyIC0zMTNsMTEyIDE5OWwzMCAtMjI4bDEwMiA3OHpNMjggNTAzCnEwIC0xNyAxMi41IC0yOXQyOS41IC0xMnQyOS41IDEydDEyLjUgMjkuNXQtMTIuNSAyOS41dC0yOS41IDEydC0yOS41IC0xMnQtMTIuNSAtMzB2MHYwek00NjUgNzYzcTAgLTE3IDEyIC0yOS41dDI5LjUgLTEyLjV0MjkuNSAxMi41dDEyIDI5LjV0LTEyIDI5LjV0LTI5LjUgMTIuNXQtMjkuNSAtMTIuNXQtMTIgLTI5LjV2MHYwek05MTQgNTAzcTAgLTE3IDEyLjUgLTI5dDI5LjUgLTEydDI5LjUgMTJ0MTIuNSAyOS41dC0xMi41IDI5LjUKdC0yOS41IDEydC0yOS41IC0xMnQtMTIuNSAtMzB2MHYwek05MTQgNTAzeiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJiZW5kaSIgdW5pY29kZT0iJiN4ZTYzZTsiIApkPSJNNDk2IDY0MGwtNjQgMTEyaC0zMDRxLTIwIDEgLTM0IC00dC0yMCAtMTMuNXQtOCAtMTUuNXQtMiAtMTV2LTY4OGg4OTZ2NjI0aC00NjR6TTExMiA3MDRoMjg4bDM3IC02NGgtMzI1djY0ek05MTIgNjRoLTgwMHY1MjhoODAwdi01Mjh6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImZ1eHVhbjAxIiB1bmljb2RlPSImI3hlNjMyOyIgCmQ9Ik01MTIgODMxcS05MSAwIC0xNzMuNSAtMzUuNXQtMTQyLjUgLTk1LjV0LTk1LjUgLTE0Mi41dC0zNS41IC0xNzMuNXQzNS41IC0xNzMuNXQ5NS41IC0xNDIuNXQxNDIuNSAtOTUuNXQxNzMuNSAtMzUuNXQxNzMuNSAzNS41dDE0Mi41IDk1LjV0OTUuNSAxNDIuNXQzNS41IDE3My41dC0zNS41IDE3My41dC05NS41IDE0Mi41dC0xNDIuNSA5NS41dC0xNzMuNSAzNS41ek01MTIgLTEzcS0xMDggMCAtMTk5LjUgNTN0LTE0NC41IDE0NC41CnQtNTMgMTk5LjV0NTMgMTk5LjV0MTQ0LjUgMTQ0LjV0MTk5LjUgNTN0MTk5LjUgLTUzdDE0NC41IC0xNDQuNXQ1MyAtMTk5LjV0LTUzIC0xOTkuNXQtMTQ0LjUgLTE0NC41dC0xOTkuNSAtNTN6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Ind4YnNvdXN1b3R1aWd1YW5nIiB1bmljb2RlPSImI3hlNjIwOyIgCmQ9Ik05MzggMTI2bC0yMjMgMjIzcTM3IDcyIDM3IDE1M3EwIDg5IC00NCAxNjUuNXQtMTIwLjUgMTIxdC0xNjYgNDQuNXQtMTY2IC00NC41dC0xMjEgLTEyMXQtNDQuNSAtMTY2dDQ0LjUgLTE2NnQxMjEgLTEyMC41dDE2NS41IC00NHQxNjcgNDVsMjIwIC0yMjBxMjYgLTI3IDY0LjUgLTI3dDY1LjUgMjd0MjcgNjV0LTI3IDY1ek0xMzMgNTAxLjVxMCAxMTkuNSA4NC41IDIwNHQyMDQgODQuNXQyMDQgLTg0LjV0ODQuNSAtMjAzLjUKcTAgLTczIC0zNC41IC0xMzZ0LTkyLjUgLTEwM3EtMSAwIC0yIC0xbC0xIC0xcS03MiAtNDggLTE1OSAtNDhxLTExOSAwIC0yMDMuNSA4NC41dC04NC41IDIwNHpNOTA3LjUgMjYuNXEtMTQuNSAtMTQuNSAtMzUgLTE0LjV0LTM0LjUgMTRsLTIxNCAyMTRxMzkgMzEgNjggNzJsMjE2IC0yMTZxMTQgLTE0IDE0IC0zNC41dC0xNC41IC0zNXpNMjE1IDUwOHExIDUgMyAxMi41dDEwIDI5LjV0MTguNSA0Mi41dDMwIDQ2dDQyLjUgNDQuNXQ1NyAzMwp0NzMgMTdxLTUgMSAtMTQuNSAxLjV0LTM2LjUgLTEuNXQtNTAuNSAtNy41dC01MiAtMjEuNXQtNDcgLTM5dC0yOSAtNjMuNXQtNC41IC05My41djB6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InNodXJ1emhlbmdxdWV0aXNoaSIgdW5pY29kZT0iJiN4ZTY5OTsiIApkPSJNNTI0LjUgNzc5cS0xMDkuNSAwIC0yMDIuNSAtNTMuNXQtMTQ3IC0xNDYuNXQtNTQgLTIwMi41dDU0IC0yMDIuNXQxNDcgLTE0N3QyMDIuNSAtNTR0MjAyIDU0dDE0Ni41IDE0N3Q1NCAyMDIuNXQtNTQgMjAyLjV0LTE0Ni41IDE0Ni41dC0yMDIgNTMuNXpNNDMxIDE5MmgtM3EtMTMgMSAtMjIgMTJsLTE0NyAxOTBxLTggMTAgLTYuNSAyM3QxMiAyMC41dDIzIDZ0MjAuNSAtMTEuNWwxMjcgLTE2M2wzMDggMjgzcTEwIDkgMjMgOC41CnQyMS41IC0xMHQ4IC0yMi41dC0xMC41IC0yMmwtMzMzIC0zMDZxLTkgLTggLTIxIC04eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJsaXV5YW4tYWx0IiB1bmljb2RlPSImI3hlNjMwOyIgCmQ9Ik01MTIgLTMycS0xMyAwIC0yMyA5bC05NiA5NnEtOSAxMCAtOSAyM3Q5LjUgMjIuNXQyMi41IDkuNXQyMiAtOWw3NCAtNzRsNzMgNzRxMTAgOSAyMyA5aDIyNHExMyAwIDIyLjUgOS41dDkuNSAyMi41djUxMnEwIDEzIC05LjUgMjIuNXQtMjIuNSA5LjVoLTY0MHEtMTMgMCAtMjIuNSAtOS41dC05LjUgLTIyLjV2LTUxMnEwIC0xMyA5LjUgLTIyLjV0MjIuNSAtOS41aDk2cTEzIDAgMjIuNSAtOS41dDkuNSAtMjIuNXQtOS41IC0yMi41CnQtMjIuNSAtOS41aC05NnEtNDAgMCAtNjggMjh0LTI4IDY4djUxMnEwIDQwIDI4IDY4dDY4IDI4aDY0MHE0MCAwIDY4IC0yOHQyOCAtNjh2LTUxMnEwIC00MCAtMjggLTY4dC02OCAtMjhoLTIxMWwtODYgLTg3cS0xMCAtOSAtMjMgLTl6TTMzNiAzODRxLTIwIDAgLTM0IDE0dC0xNCAzNHQxNCAzNHQzNCAxNHQzNCAtMTR0MTQgLTM0dC0xNCAtMzR0LTM0IC0xNHpNNTI4IDM4NHEtMjAgMCAtMzQgMTR0LTE0IDM0dDE0IDM0dDM0IDE0dDM0IC0xNAp0MTQgLTM0dC0xNCAtMzR0LTM0IC0xNHpNNzIwIDM4NHEtMjAgMCAtMzQgMTR0LTE0IDM0dDE0IDM0dDM0IDE0dDM0IC0xNHQxNCAtMzR0LTE0IC0zNHQtMzQgLTE0eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJmYW5odWkxIiB1bmljb2RlPSImI3hlNjY2OyIgCmQ9Ik0yNSA3MzJsMzg0IC0zNzZxMyAtNSAxMCAtMTEuNXQzMSAtMTd0NTIgLTEwLjVxMjQgMCA0NiA2LjV0MzIgMTMuNWwxMCA3bDM4NiAzODhxMCA1IC0xLjUgMTEuNXQtOSAyMS41dC0xOCAyM3QtMjkuNSA2LjV0LTQzIC0xOS41cS0xNCAtOSAtODMuNSAtNTl0LTEzMyAtOTVsLTYzLjUgLTQ1cS01IC0yIC0xMyAtNC41dC0zMyAtN3QtNDggLTQuNXQtNTIuNSA3dC01Mi41IDIzcS04MiA1NyAtMjcwIDE5NnEtNCAyIC0xMCA0dC0yMiAzCnQtMjguNSAtMi41dC0yNC41IC0xOHQtMTYgLTQwLjV2MHpNMzQgMzg4bDM4NCAtMzc3cTMgLTUgMTAgLTExdDMxIC0xN3Q1MiAtMTFxMjQgMCA0NiA3dDMyIDEzbDEwIDdsMzg3IDM4OXEtMSA0IC0yLjUgMTAuNXQtOSAyMS41dC0xNy41IDIzdC0yOS41IDYuNXQtNDMuNSAtMTkuNXEtMTMgLTkgLTgzIC01OXQtMTMzLjUgLTk1bC02My41IC00NXEtNCAtMiAtMTIuNSAtNC41dC0zMyAtNi41dC00OCAtNC41dC01MyA2LjV0LTUyLjUgMjMKcS04MiA1NyAtMjcwIDE5NnEtNCAyIC0xMCA0dC0yMS41IDN0LTI4LjUgLTIuNXQtMjUgLTE4dC0xNiAtMzkuNXYweiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJqaWFudG91LWNvcHkiIHVuaWNvZGU9IiYjeGU2Mjg7IiAKZD0iTTc0NSAyNDhoLTQ2MWwyMzAgLTMxMXpNNjQxIDQ2NnYtMTgxaC0yNTZ2MTgxaDI1NnpNNjQxIDY1MnYtMTIyaC0yNTZ2MTIyaDI1NnpNNjQxIDgzM3YtOTFoLTI1NnY5MWgyNTZ6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InlpbmxlIiB1bmljb2RlPSImI3hlNmI3OyIgCmQ9Ik0xIDY2OWg1MzJ2LTQxaC01MzJ2NDF6TTEgNDg1aDUzMnYtNDFoLTUzMnY0MXpNMSAzMDFoNTMydi00MWgtNTMydjQxek03MzcgNjQ1bDI4NyAtMzdxMCA0MiAtMTAuNSA3OHQtMjUgNjF0LTQzIDQ2LjV0LTUwLjUgMzQuNXQtNjMgMjd0LTY1IDIwLjV0LTcwIDE4LjVoLTF2LTMwdi0yMTR2LTUzM2gtMTI1cS04MyAwIC0xMjIgLTM1LjV0LTM5IC04NS41cTAgLTIxIDguNSAtNDF0MjYgLTM5LjV0NTEgLTMxLjV0NzguNSAtMTJxMzQgMCA2MSA3CnQ0NCAxOS41dDI5LjUgMjkuNXQxNy41IDM3dDguNSA0MS41dDMgNDMuNXQwLjUgNDNxLTEgMTYgLTEgMjR2NTI4ek05NzkgNjU1bC0yNDIgMzF2MTU1cTExNCAtMzEgMTcxLjUgLTcwLjV0NzAuNSAtMTE1LjV6TTY2Ni41IC01OXEtMjcuNSAtMjggLTkyLjUgLTI4cS0zMyAwIC01Ny41IDcuNXQtMzYuNSAxNy41dC0xOSAyM3QtOC41IDIwLjV0LTEuNSAxNC41cTAgMzggMzEuNSA1OXQ4OC41IDIxaDEyNXYtMzFoMXEtMyAtNzYgLTMwLjUgLTEwNHoKIiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9IndvZGVqaWZlbiIgdW5pY29kZT0iJiN4ZTY0MDsiIApkPSJNOTQ3IDU0M3EwIDQwIC01MCA3MXE1MCAzMiA1MCA3MXEwIDQ2IC02NC41IDc5LjV0LTE2MS41IDQ5LjV0LTIwOSAxNnQtMjA5IC0xNnQtMTYxLjUgLTQ5LjV0LTY0LjUgLTc5LjVxMCAtMzkgNTAgLTcxcS01MCAtMzEgLTUwIC03MXQ1MSAtNzJxLTUxIC0zMSAtNTEgLTcxdDUwIC03MXEtNTAgLTMxIC01MCAtNzF0NTAgLTcxcS01MCAtMzIgLTUwIC03MXEwIC00NiA2NC41IC03OS41dDE2MS41IC00OS41dDIwOSAtMTZ0MjA5IDE2CnQxNjEuNSA0OS41dDY0LjUgNzkuNXEwIDM5IC01MCA3MXE1MCAzMSA1MCA3MXQtNTAgNzFxNTAgMzEgNTAgNzF0LTUxIDcxcTUxIDMyIDUxIDcyek04MzUgNDk5cS0xOSAtNyAtNDIgLTE0cS0yNiAtNyAtNTggLTE0cS0xMDAgLTE5IC0yMjMgLTE5dC0yMjMgMTlxLTMyIDcgLTU4IDE0cS0yMyA3IC00MiAxNHEtNTkgMjQgLTU5IDQ0dDU4IDQzcTEwMyAtMzYgMjYxIC00M3EzMiAtMiA2MyAtMnQ2MyAycTE1OCA3IDI2MSA0M3E1OCAtMjMgNTggLTQzCnQtNTkgLTQ0ek04OTQgNDAwcTAgLTIwIC01NyAtNDNxLTE5IC04IC00MSAtMTRxLTI2IC04IC01NyAtMTRxLTEwMSAtMjAgLTIyNyAtMjB0LTIyNyAyMHEtMzEgNiAtNTcgMTRxLTIyIDYgLTQxIDE0cS01NyAyMyAtNTcgNDN0NTkgNDNxMTAwIC0zNSAyNTMgLTQycTM1IC0yIDcwIC0ydDcwIDJxMTUzIDcgMjUzIDQycTU5IC0yMyA1OSAtNDN6TTg5NCAyNThxMCAtMjAgLTU4IC00M3EtMTkgLTggLTQyIC0xNHEtMjYgLTggLTU3IC0xNApxLTEwMCAtMjAgLTIyNSAtMjB0LTIyNSAyMHEtMzEgNiAtNTcgMTRxLTIzIDYgLTQyIDE0cS01OCAyMyAtNTggNDN0NTcgNDNxOTcgLTM1IDI0OCAtNDNxMzggLTIgNzcgLTJ0NzcgMnExNTEgOCAyNDggNDNxNTcgLTIzIDU3IC00M3pNODk0IDExNnEwIC0xMCAtMTUuNSAtMjEuNXQtNDggLTI0dC03Ni41IC0yMi41dC0xMDcuNSAtMTYuNXQtMTM0LjUgLTYuNXQtMTM0LjUgNi41dC0xMDcuNSAxNi41dC03Ni41IDIyLjV0LTQ4IDI0CnQtMTUuNSAyMS41cTAgMTkgNTggNDNxMTI3IC00NSAzMjQgLTQ1dDMyNCA0NXE1OCAtMjQgNTggLTQzek0xMzAgNjg1cTAgMTAgMTUuNSAyMnQ0OCAyNHQ3Ni41IDIyLjV0MTA3LjUgMTd0MTM0LjUgNi41dDEzNC41IC02LjV0MTA3LjUgLTE3dDc2LjUgLTIyLjV0NDggLTI0dDE1LjUgLTIycTAgLTE5IC01OCAtNDNxLTE5IC03IC00MiAtMTRxLTI2IC04IC01NyAtMTRxLTEwMCAtMjAgLTIyNSAtMjB0LTIyNSAyMHEtMzEgNiAtNTcgMTQKcS0yMyA3IC00MiAxNHEtNTggMjQgLTU4IDQzeiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJjYWlkYW4iIHVuaWNvZGU9IiYjeGU2NWE7IiBob3Jpei1hZHYteD0iMTM1NiIgCmQ9Ik0yMTcgNjczcTAgLTI0IDE3IC00MXQ0MSAtMTd0NDEuNSAxN3QxNy41IDQxLjV0LTE3LjUgNDEuNXQtNDEuNSAxN3QtNDEgLTE3LjV0LTE3IC00MS41djB6TTIxNyA2NzN6TTIxMCAzODRxMCAtMjUgMTcgLTQydDQxIC0xN3Q0MS41IDE3dDE3LjUgNDEuNXQtMTcuNSA0MS41dC00MS41IDE3dC00MSAtMTd0LTE3IC00MXYwek0yMTAgMzg0ek0yMTAgOTNxMCAtMjUgMTcgLTQydDQxIC0xN3Q0MS41IDE3dDE3LjUgNDEuNXQtMTcuNSA0MS41CnQtNDEuNSAxN3QtNDEgLTE3dC0xNyAtNDF2MHpNMjEwIDkzek0xMTQ1IDY3NnEwIC0yMyAtMTUgLTM5LjV0LTM2IC0xNi41aC02MDZxLTIyIDAgLTM3IDE2LjV0LTE1IDM5LjV2MHEwIDIzIDE1IDM5LjV0MzcgMTYuNWg2MDZxMjEgMCAzNiAtMTYuNXQxNSAtMzkuNXYwdjB6TTExNDUgNjc2ek0xMTQ1IDM4NnEwIC0yMyAtMTUgLTM5dC0zNiAtMTZoLTYwNnEtMjIgMCAtMzcgMTZ0LTE1IDM5djBxMCAyMyAxNSAzOS41dDM3IDE2LjVoNjA2CnEyMSAwIDM2IC0xNi41dDE1IC0zOS41djB2MHpNMTE0NSAzODZ6TTExNDUgOTVxMCAtMjMgLTE1IC0zOXQtMzYgLTE2aC02MDZxLTIyIDAgLTM3IDE2dC0xNSAzOXYwcTAgMjMgMTUgMzkuNXQzNyAxNi41aDYwNnEyMSAwIDM2IC0xNi41dDE1IC0zOS41djB2MHpNMTE0NSA5NXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic2hhbmdsYSIgdW5pY29kZT0iJiN4ZTYwYzsiIApkPSJNODY1IDEyOWw3NSA3NWwtMzUwIDM1MHYwbC03NCA3NGgtMXYwbC03NSAtNzV2MGwtMzQ1IC0zNDVsNzUgLTc0bDM0NSAzNDV6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InNoYW5nbGEtY29weSIgdW5pY29kZT0iJiN4ZTYxMjsiIApkPSJNMzgwIDU1aDI2NHYtMTE3aC0yNjR2MTE3ek0zODAgMjMwaDI2NHYtMTE3aC0yNjR2MTE3ek02NDQgNTEwaC0yNjR2LTIyMWgyNjR2MjIxek03OTkgNDkzcTI3IDAgMzUgMTV0LTExIDM0bC0yNTcgMjYwcS0yMSAxOCAtMzAgMjQuNXQtMjEuNSA2dC0yMSAtNi41dC0zMC41IC0yNGwtMjYyIC0yNjBxLTE5IC0xOSAtMTEgLTM0dDM1IC0xNWg1NzR6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InlpbmxlMSIgdW5pY29kZT0iJiN4ZTYyMTsiIApkPSJNMjAyIDQwMGgtMzFxMCA5MiA0NS41IDE3MC41dDEyNCAxMjQuNXQxNzEuNSA0NnQxNzEuNSAtNDZ0MTI0IC0xMjQuNXQ0NS41IC0xNzAuNWgtMzFoLTMxcTAgMTE1IC04MS41IDE5N3QtMTk3LjUgODJ0LTE5Ny41IC04MnQtODEuNSAtMTk3aC0zMXpNMzg4IDI3NWgxMDh2LTIxN2gtMTA4cS00NSAwIC03NyAzMnQtMzIgNzd0MzIgNzYuNXQ3NyAzMS41ek0zODIgMTE0aDk5di00MHYxODZ2LTQwaC05OXEtMjMgMCAtMzkuNSAtMTUuNQp0LTE2LjUgLTM3LjV0MTYuNSAtMzcuNXQzOS41IC0xNS41ek01OTAgMjc1di0xNTVxMCAtNSA0LjUgLTEwdDEwLjUgLTVoMTQwbC00NyAtNDd2MjE3aDIzaDI0di0yMTdoLTE0MHEtMjQgMCAtNDMgMTguNXQtMTkgNDMuNXYxNTVoMjNoMjR6TTQ5NiA0MzF2LTM3M2gtNDZ2MzczaDQ2ek0xNzEgODl2LTMxcS03MSAwIC0xMjEgNTB0LTUwIDEyMXQ1MCAxMjF0MTIxIDUwdi0zMnYtMzFxLTQ1IDAgLTc3IC0zMS41dC0zMiAtNzYuNXQzMiAtNzcKdDc3IC0zMnYtMzF6TTg1MyA4OXYtMzFxNzEgMCAxMjEgNTB0NTAgMTIxdC01MCAxMjF0LTEyMSA1MHYtMzJ2LTMxcTQ1IDAgNzcgLTMxLjV0MzIgLTc2LjV0LTMyIC03N3QtNzcgLTMydi0zMXpNMTcxIDQwMGg2MnYtMzQyaC02MnYzNDJ6TTc5MSA0MDBoNjJ2LTM0MmgtNjJ2MzQyeiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJpY29uZm9udGxvdmUyIiB1bmljb2RlPSImI3hlNjBhOyIgaG9yaXotYWR2LXg9IjEwODciIApkPSJNNzkzIDQ5M3EtMTEgMzMgLTM0IDU3cS0yMCAyMCAtNDUgMzF0LTUzIDExcS00MyAwIC04MCAtMjdxLTE5IC0xMyAtMzMgLTMzcS0xIC0xIC0yIC0yLjV0LTIgLTIuNXEtMyA0IC00IDZxLTE2IDE5IC0zNCAzM3EtMzcgMjYgLTgyIDI2cS0yNyAwIC01MyAtMTF0LTQ2IC0zMnEtMjMgLTI0IC0zNSAtNTZxLTEyIC0zNCAtMTEgLTc1cTIgLTYyIDQ0IC0xMjRxMzIgLTQ3IDg2IC05MnE2MCAtNDkgMTIyIC03OXE2IC00IDEzIC00cTYgMCAxMSAyCnE2NyAzNiAxMjEgODF0ODUgOTJxNDEgNjIgNDMgMTI0cTIgNDEgLTExIDc1djB6TTc3NCA0MTlxLTMgLTk5IC0xMTcgLTE5NHEtNTUgLTQ2IC0xMTMgLTc2cS02MCAzMCAtMTE2IDc2cS0xMTUgOTUgLTExOSAxOTRxLTIgNjkgMzcgMTA5cTMzIDM0IDc5IDM0cTM2IDAgNjYuNSAtMjN0NDcuNSAtNjRsNSAtMTJ2MHYwbDYgMTJxMTYgNDEgNDYgNjR0NjUgMjNxNDUgMCA3NiAtMzNxNDAgLTQxIDM3IC0xMTB2MHpNMTAxMyA1ODMKcS0zOSA5MiAtMTA5LjUgMTYzdC0xNjIuNSAxMTBxLTk1IDQwIC0xOTkgNDB0LTIwMCAtNDBxLTkyIC0zOSAtMTYyLjUgLTExMHQtMTA5LjUgLTE2M3EtNDAgLTk1IC00MCAtMTk5dDQwIC0xOTlxMzkgLTkyIDEwOS41IC0xNjN0MTYyLjUgLTExMHE5NiAtNDAgMjAwIC00MHQxOTkgNDBxOTIgMzkgMTYyLjUgMTEwdDEwOS41IDE2M3E0MSA5NSA0MSAxOTl0LTQxIDE5OXYwek0xMDIwIDM4NHEwIC05NyAtMzggLTE4NS41dC0xMDIgLTE1Mwp0LTE1Mi41IC0xMDIuNXQtMTg2IC0zOHQtMTg2IDM4dC0xNTIuNSAxMDIuNXQtMTAyIDE1M3QtMzggMTg1LjV0MzggMTg1LjV0MTAyIDE1M3QxNTMgMTAyLjV0MTg2IDM4dDE4NS41IC0zOHQxNTIuNSAtMTAyLjV0MTAyIC0xNTN0MzggLTE4NS41djB6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImJvZmFuZ2ppbmR1dGlhbyIgdW5pY29kZT0iJiN4ZTYyMzsiIApkPSJNNTEyIC03OXEtOTQgMCAtMTgwIDM3cS04MyAzNSAtMTQ3IDk5dC05OSAxNDdxLTM3IDg2IC0zNyAxODB0MzcgMTgwcTM1IDgzIDk5IDE0N3QxNDcgOTlxODYgMzcgMTgwIDM3dDE4MCAtMzdxODMgLTM1IDE0NyAtOTl0OTkgLTE0N3EzNyAtODYgMzcgLTE4MHQtMzcgLTE4MHEtMzUgLTgzIC05OSAtMTQ3dC0xNDcgLTk5cS04NiAtMzcgLTE4MCAtMzd6TTUxMiA4MzBxLTkxIDAgLTE3My41IC0zNS41dC0xNDIgLTk1dC05NSAtMTQyCnQtMzUuNSAtMTczLjV0MzUuNSAtMTczLjV0OTUgLTE0MnQxNDIgLTk1dDE3My41IC0zNS41dDE3My41IDM1LjV0MTQyIDk1dDk1IDE0MnQzNS41IDE3My41dC0zNS41IDE3My41dC05NSAxNDJ0LTE0MiA5NXQtMTczLjUgMzUuNXpNNTEyIDM4NHpNMjQ3IDM4NHEwIDExMCA3Ny41IDE4Ny41dDE4Ny41IDc3LjV0MTg3LjUgLTc3LjV0NzcuNSAtMTg3LjV0LTc3LjUgLTE4Ny41dC0xODcuNSAtNzcuNXQtMTg3LjUgNzcuNXQtNzcuNSAxODcuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic3VpamkyIiB1bmljb2RlPSImI3hlNjBkOyIgCmQ9Ik01MTggNDUzbC0zMCA0NHE1IDcgMTAgMTNxMzAgNDEgNjcgNjkuNXQ3MiA0M3Q3My41IDIxdDcwIDUuNXQ2NC41IC03bC03NyA3OHEtMTAgMTAgMCAxOWwxOSAyMHExMCA5IDE5IDBsMTQ3IC0xNDhsNyAtM3Ywdi05djB2LTQ3cS03MSAyOCAtMTMzLjUgMzUuNXQtMTA3LjUgLTAuNXQtODUgLTMwdC02NiAtNDd0LTUwIC01N3pNOTU4IDIxNnYtNDd2MHYtOWwtNiAtM2wtMTQ3IC0xNDZxLTkgLTEwIC0xOSAwbC0xOSAxOXEtMTAgMTAgMCAxOQpsNzcgNzdxLTMzIC01IC02NC41IC02dC03MCA1LjV0LTczLjUgMjF0LTcxLjUgNDN0LTY3LjUgNjguNXEtMjggMzcgLTU5IDgxdC00OSA3MHQtNDEgNTZ0LTQxIDQ2LjV0LTQzIDM0dC01Mi41IDI2dC02NCAxNHQtODMuNSA2LjV2NTZxNCAxIDEyIDIuNXQzMyAxLjV0NTEgLTQuNXQ2My41IC0yMHQ3My41IC00MC41dDc4LjUgLTcwLjV0NzkuNSAtMTA1LjVxNCAtNiAxMyAtMjBxMTQgLTI0IDIyLjUgLTM4dDI4IC00MHQzNSAtNDEuNXQ0MS41IC0zNgp0NTEgLTMxdDYwIC0xOS41dDcyIC04dDgzLjUgMTB0OTYuNSAyOXpNMzU5IDMxNWwzMyAtNDhxLTQ3IC01NSAtOTcuNSAtOTB0LTkwIC00N3QtNzIuNSAtMTUuNXQtNTAgLTAuNXQtMTggNHY1NnE4MSAxIDEzNC41IDE3LjV0ODcuNSA0NHQ3MyA3OS41eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ6aGVubGluZ3poZW5nLWNvcHkiIHVuaWNvZGU9IiYjeGU2MDI7IiAKZD0iTTc1MyAzNDh2MTI3cTAgMTAzIC02NCAxNzNxLTMzIDM3IC03OCA1NnEtNyAyNSAtMjcgNDNxLTI3IDI0IC02My41IDI0dC02My41IC0yNHEtMjAgLTE4IC0yNyAtNDNxLTQ1IC0xOSAtNzggLTU2cS02NCAtNzAgLTY0IC0xNzN2LTEyN2wtNDkgLTY2cS0xNiAtMTggLTE2IC00MnYtMzVxMCAtMjYgMTguNSAtNDQuNXQ0NC41IC0xOC41aDE4NHEtMjMgLTIyIC0yMyAtNTVxMCAtMzEgMjIgLTUzdDUzIC0yMnEzNCAwIDU1IDIwLjV0MjEgNTQuNQpxMCAzMyAtMjMgNTVoMTgwcTI2IDAgNDQuNSAxOC41dDE4LjUgNDQuNXYzNXEwIDI0IC0xNiA0MnpNNTIyIDY3cS04IDAgLTE0IDZ0LTYgMTQuNXQ2IDE0LjV0MTQuNSA2dDE0LjUgLTZ0NiAtMTVxMCAtMTAgLTQuNSAtMTV0LTE2LjUgLTV6TTc2MyAyMDVxMCAtOCAtOCAtOGgtNDY5cS04IDAgLTggOHYzNXEwIDMgMiA2bDEgMWw1MyA3MHE5IDEwIDkgMjR2MTM0cTAgODEgNTAgMTM2cTI5IDMyIDcwIDQ2bDE2IDZsMiAxOHEyIDE0IDEzIDI1CnExMSAxMCAyNi41IDEwdDI2LjUgLTEwdDEzIC0yNmwyIC0xN2wxNiAtNnE0MSAtMTQgNzAgLTQ2cTUwIC01NSA1MCAtMTM2di0xMzRxMCAtMTQgOSAtMjRsNTIgLTY5bDIgLTJxMiAtMyAyIC02di0zNXpNOTYgNDQ3cTAgNzEgNDYgMTI1cTggOSA3IDIwLjV0LTEwIDE4LjV0LTIwLjUgNi41dC0xOC41IC05LjVxLTU5IC03MCAtNTkgLTE2MXEwIC05NCA2MSAtMTY0cTkgLTEwIDIxIC0xMHExMSAwIDE5IDdxOCA4IDkgMTl0LTcgMjAKcS00OCA1NSAtNDggMTI4ek0xOTcgNTM2LjVxLTkgNy41IC0yMC41IDYuNXQtMTguNSAtOXEtMjggLTM0IC0yOSAtODd0MjYgLTg5cTggLTExIDIyIC0xMXE5IDAgMTYgNnE5IDcgMTEgMTguNXQtNSAyMC41cS0xNSAyMCAtMTQuNSA1My41dDE1LjUgNTIuNXE4IDggNyAxOS41dC0xMCAxOXpNOTI1IDYwOHEtNyA5IC0xOC41IDkuNXQtMjAgLTYuNXQtOS41IC0xOC41dDYgLTIwLjVxNDYgLTU0IDQ2IC0xMjVxMCAtNzMgLTQ4IC0xMjgKcS03IC05IC02LjUgLTIwdDkuNSAtMTlxOCAtNyAxOCAtN3ExMyAwIDIxIDEwcTYxIDcwIDYxIDE2NHEwIDkxIC01OSAxNjF6TTg2OCA1MzRxLTggOCAtMTkgOXQtMjAgLTYuNXQtMTAgLTE5dDcgLTE5LjVxMTUgLTE5IDE1LjUgLTUyLjV0LTE0LjUgLTUzLjVxLTcgLTkgLTUuNSAtMjAuNXQxMS41IC0xOC41cTcgLTYgMTYgLTZxMTQgMCAyMiAxMXEyNyAzNiAyNiA4OXQtMjkgODd6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImRhbnF1eHVuaHVhbjEiIHVuaWNvZGU9IiYjeGU2MjQ7IiBob3Jpei1hZHYteD0iMTIwOCIgCmQ9Ik01NjcgNzE1aC0xODlxLTc1IDAgLTE0NSAtMjguNXQtMTIzIC04MS41cS0xMTAgLTExMSAtMTEwIC0yNjhxMCAtNDYgMTMgLTEwM3E0IC0xMyAxNiAtMjJ0MjYgLTlxOCAwIDExIDJxMTcgNCAyNS41IDE5LjV0My41IDMzLjVxLTExIDM1IC0xMSA3OXEwIDEyMiA4NiAyMDh0MjA4IDg2aDE3M3E0IDQ1IDE2IDg0ek05NDggMjQwcS0zNiAtNzUgLTEwNyAtMTIwLjV0LTE1NiAtNDUuNWgtMzk2djc2cTAgMTggLTEwLjUgMjQuNXQtMjYuNSAtMy41CmwtMTgxIC0xMTNxLTE2IC05IC0xNiAtMjN0MTYgLTI0bDE4NCAtMTE4cTE1IC0xMCAyNS41IC00dDEwLjUgMjV2NzZoMzk3cTc1IDAgMTQ1IDI4LjV0MTIzIDgxLjVxNzEgNzIgOTQgMTYxcS01NyAtMTggLTEwMiAtMjF6TTkxOSA4OTZxLTEyMCAwIC0yMDQuNSAtODQuNXQtODQuNSAtMjA0LjV0ODQuNSAtMjA0LjV0MjA0LjUgLTg0LjV0MjA0LjUgODQuNXQ4NC41IDIwNC41dC04NC41IDIwNC41dC0yMDQuNSA4NC41ek05NzEgNDUyaC01NXYyMTgKcS0zMCAtMjcgLTc2IC00MnY1OHEyMSAzIDQ3IDIxcTMyIDIxIDQyIDM0aDQydi0yODl6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InhpYXlpc2hvdSIgdW5pY29kZT0iJiN4ZTY0ZDsiIApkPSJNNTYzIDM4N2wtMjE0IDE2MnEtMiAxIC00IDB0LTIgLTN2LTMyNHEwIC0yIDIgLTN0NCAwbDIxNCAxNjJxMiAxIDIgM3QtMiAzek02NzcgNTQ5aC03NHEtNCAwIC00IC00di0zMjJxMCAtNCA0IC00aDc0cTQgMCA0IDR2MzIycTAgNCAtNCA0ek01MTIgODAycTg1IDAgMTYzIC0zM3E3NCAtMzIgMTMyIC05MHQ5MCAtMTMycTMzIC03OCAzMyAtMTYzdC0zMyAtMTYzcS0zMiAtNzQgLTkwIC0xMzJ0LTEzMiAtOTBxLTc4IC0zMyAtMTYzIC0zMwp0LTE2MyAzM3EtNzQgMzIgLTEzMiA5MHQtOTAgMTMycS0zMyA3OCAtMzMgMTYzdDMzIDE2M3EzMiA3NCA5MCAxMzJ0MTMyIDkwcTc4IDMzIDE2MyAzM3pNNTEyIDgzMnEtOTEgMCAtMTc0IC0zNS41dC0xNDMgLTk1LjV0LTk1LjUgLTE0M3QtMzUuNSAtMTc0dDM1LjUgLTE3NHQ5NS41IC0xNDN0MTQzIC05NS41dDE3NCAtMzUuNXQxNzQgMzUuNXQxNDMgOTUuNXQ5NS41IDE0M3QzNS41IDE3NHQtMzUuNSAxNzR0LTk1LjUgMTQzdC0xNDMgOTUuNQp0LTE3NCAzNS41djB6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImNhaWRhbjEiIHVuaWNvZGU9IiYjeGU2MjU7IiAKZD0iTTUxMiA2NjZ6TTQzNSA2NjUuNXEwIDMxLjUgMjIuNSA1NHQ1NC41IDIyLjV0NTQuNSAtMjIuNXQyMi41IC01NHQtMjIuNSAtNTR0LTU0LjUgLTIyLjV0LTU0LjUgMjIuNXQtMjIuNSA1NHpNNTEyIDM4NHpNNDM1IDM4NHEwIDMyIDIyLjUgNTQuNXQ1NC41IDIyLjV0NTQuNSAtMjIuNXQyMi41IC01NC41dC0yMi41IC01NC41dC01NC41IC0yMi41dC01NC41IDIyLjV0LTIyLjUgNTQuNXpNNTEyIDEwMnpNNDM1IDEwMi41CnEwIDMxLjUgMjIuNSA1NHQ1NC41IDIyLjV0NTQuNSAtMjIuNXQyMi41IC01NHQtMjIuNSAtNTR0LTU0LjUgLTIyLjV0LTU0LjUgMjIuNXQtMjIuNSA1NHoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0id2VuemkiIHVuaWNvZGU9IiYjeGU2MTU7IiAKZD0iTTEyOCA4OTZoODMydi02NGg2NGgtODk2djY0ek02NCA4MzJoNjR2LTgzMmgtNjR2ODMyek05NjAgODMyaDY0di04MzJoLTY0djgzMnpNNTEyIDU3Nmg2NHYtMzg0djBoLTY0djM4NHpNMTI4IDBoODMydi02NGgtODMydjY0ek0zODQgNTc2aDMyMHY2NGgtMzIwdi02NHoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic2h1IiB1bmljb2RlPSImI3hlNjYzOyIgCmQ9Ik04MzkgNjY3di01NDdxLTEgLTMgLTIgLTdxLTE0IC02MCAtNzcgLTc4cS0xIDAgLTE2IC0zaC00NjJxLTEwIDIgLTExIDJxLTY0IDE1IC04MSA3NHEwIDEgLTMgMTJ2NTQ3cTEgMSAxIDJxMTAgNjAgNzMgODFxMSAxIDIxIDVoNDYybDQgLTFxNjQgLTExIDg2IC02N3EwIC0xIDUgLTIwek00OTAgNzIydi04di0yMTZxMCAtNiAtMSAtMTBxLTIgLTkgLTkgLTEyLjV0LTE1IC0wLjVxLTMgMSAtOCA1cS0zOSAyNyAtNTYgMzlxLTUgNCAtOSAwCnEtMTUgLTEwIC01NiAtMzlxLTUgLTQgLTggLTVxLTggLTMgLTE1LjUgMC41dC05LjUgMTIuNXYxMHYyMTZ2OGgtMTBxLTcgLTEgLTEyIC0xcS0yNSAtNCAtNDMgLTIyLjV0LTE4IC00Ni41cTEgLTYxIDEgLTQ1M3YtN2wyIDJxMzEgMzAgNzYgMzBoNDI3cTQ2IDAgNzcgLTMybDIgLTJ2NXY0NjFxMCAyNSAtMTcgNDNxLTIzIDIzIC01NyAyM2gtMjM1aC02ek01MTIgNzBoMjEycTMwIDAgNTEgMTdxMTkgMTcgMTkuNSA0MS41dC0xNy41IDQyLjUKcS0yMSAxOSAtNTEgMTlxLTE4NyAxIC00MjggMHEtMjQgMCAtNDMgLTEzcS0yNSAtMTggLTI1LjUgLTQ3dDI1LjUgLTQ3cTE5IC0xMyA0NSAtMTNoMjEyek0zMzggNTI1cTQxIDI4IDQ1IDMxcTEzIDkgMjcgMHE4IC01IDIxLjUgLTE1dDE4LjUgLTEzbDQgLTN2MTk3aC0xMTZ2LTE5N3oiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0id3VzdW55aW56aGkiIHVuaWNvZGU9IiYjeGU2MGI7IiAKZD0iTTkyOCAxMjhoLTgzMnY1MTJoODMydi01MTJ6TTk5MiA3MDRoLTk2MHYtNjQwaDk2MHY2NDB6TTIzOSA1NDN2LTE5MmgxNjB2LTY0aC0xNjB2LTY0aDIyNHYxOTJoLTE2MHY2NGgxNjB2NjRoLTE5MmgtMzJ6TTc1MSAyODh2MjU2aC0yMjR2LTMyMGgyNTZ2NjRoLTMyek02ODcgMjg4aC05NnYxOTJoOTZ2LTE5MnoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ic2hvdXlpbmppIiB1bmljb2RlPSImI3hlNjA1OyIgCmQ9Ik05NDQgNDc5cTAgNTYgLTQwIDk1LjV0LTk3IDM5LjVoLTQwN2wyODMgMTE0bC0yOSA3M2wtNDg2IC0xOTZsLTYgLTNsLTIgLTF2MHEtMzYgLTE2IC01Ny41IC00OXQtMjEuNSAtNzN2LTM3N3EwIC01NiA0MCAtOTUuNXQ5NyAtMzkuNWg1ODlxNTcgMCA5NyAzOS41dDQwIDk1LjV2Mzc3ek03ODcgNDVoLTU0OXEtMzIgMCAtNTUgMjN0LTIzIDU1djMzNXEwIDMyIDIzIDU1dDU1IDIzaDU0OXEzMyAwIDU2IC0yM3QyMyAtNTV2LTMzNQpxMCAtMzIgLTIzIC01NXQtNTYgLTIzek0zNDYgNDE4cS01MyAwIC05MC41IC0zNy41dC0zNy41IC05MHQzNy41IC05MHQ5MC41IC0zNy41dDkwLjUgMzcuNXQzNy41IDkwdC0zNy41IDkwdC05MC41IDM3LjV6TTM0NiAyNDFxLTIxIDAgLTM1LjUgMTQuNXQtMTQuNSAzNXQxNC41IDM1dDM1LjUgMTQuNXQzNS41IC0xNC41dDE0LjUgLTM1dC0xNC41IC0zNXQtMzUuNSAtMTQuNXpNNTMyIDM5OWg3OHYtNzloLTc4djc5ek01MzIgMjYxaDc4di03OApoLTc4djc4ek02NjkgMzk5aDEzN3YtNzloLTEzN3Y3OXpNNjY5IDI2MWgxMzd2LTc4aC0xMzd2Nzh6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InBpZnUtY29weSIgdW5pY29kZT0iJiN4ZTYwMzsiIApkPSJNMzY1IDJxLTE0IDMgLTE1IDNxLTMwIDkgLTQ5IDMzLjV0LTIwIDU2LjV2MzEydjZxLTIwIC04IC0yMyAtOXEtMyAtMiAtOSAtNC41dC0xMSAtNC41bC0xMCAtNHEtMTUgLTcgLTI0IDZxLTUyIDcyIC05NCAxMjlxLTEzIDE4IDggMjdxMTI0IDU0IDIwNCA4OXExMyA2IDMyIDEzcTEgMCAxMSAyaDUwcTEzIC01IDEzIC0yMHExIC0zIDIgLThxNSAtMzUgMzcgLTU4dDczIC02cTQ0IDE4IDUzIDY4cTQgMjAgMTMgMjRoNTFxMjcgLTcgMjggLTgKcTE3IC03IDM2LjUgLTE1LjV0NDIuNSAtMTguNXQzNiAtMTZxMiAtMSAxMDEgLTQ0bDYgLTNxMTggLTggNiAtMjVxLTEgLTIgLTI1IC0zNXEtNTQgLTc0IC02OCAtOTNxLTQgLTUgLTcgLTdxLTcgLTYgLTE4IC0ybC00OSAyMWwtNSAydi02di0zMTFxMCAtMzMgLTIwIC01OC41dC01MiAtMzMuNXEtMSAwIC0xMiAtMmgtMjkydjB6TTE0MiA1MzJsMiAtM3E2MyAtODcgNzcgLTEwNnEyIC0zIDYgLTFxMyAxIDI0LjUgMTB0MzIuNSAxNXExMiA1IDE5IDAKdDcgLTE3cS0xIC03OCAtMSAtMzM0cTAgLTI4IDE5IC00N3Q0NyAtMTloMjcycTggMCAxNSAxcTIzIDUgMzcgMjN0MTQgNDJ2Mjk3djQycTAgMTIgMTAgMTRxNyAxIDEzIC0ycTI2IC0xMCA1OSAtMjVxNSAtMiA4IDJxMTMgMTkgNzUgMTA0bDIgNGwtMiAxcS0xODAgNzkgLTIwNiA5MXEtMTEgNCAtNTAgNXEtNiAtNDEgLTM2IC02OXEtMzEgLTMwIC03MSAtMzFxLTM3IC0xIC02NiAxOXEtNDEgMzAgLTQ5IDgxaC0zMnQtOSAtMgpxLTMwIC0xMyAtMTQzIC02M3EtNSAtMiAtNzQgLTMyeiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ4aXVnYWkiIHVuaWNvZGU9IiYjeGU2MTc7IiAKZD0iTTkwMS41IDQ2MnEtMTIuNSAwIC0yMS41IC05dC05IC0yMnYtNDMwaC03MTh2NzY4aDM4NHExMyAwIDIyIDl0OSAyMS41dC05IDIxLjV0LTIyIDloLTM5NnEtMjAgMCAtMzQuNSAtMTR0LTE0LjUgLTM0di03OTRxMCAtMjAgMTQuNSAtMzQuNXQzNC41IC0xNC41aDc0MnEyMCAwIDM0LjUgMTQuNXQxNC41IDM0LjV2NDQzcTAgMTMgLTkgMjJ0LTIxLjUgOXpNNzU4IDc1M2wxMTcgLTExN2wtNDIxIC00MTJsLTEyMiAtM2w0IDEyMHpNNzU4IDg0MApsLTQ4MiAtNDcybC04IC0yMTBsMjEyIDVsNDgzIDQ3MnoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0idGl5YW5ndWFuIiB1bmljb2RlPSImI3hlNjExOyIgCmQ9Ik04MjAgNzAyaC02MTNxLTYgMCAtMTAuNSAtNC41dC00LjUgLTEwLjV2LTYwNXEwIC02IDQuNSAtMTF0MTAuNSAtNWgxMzRxNiAwIDEwLjUgNXQ0LjUgMTF2M2wtNiA0NWgzMjhsLTYgLTQ1cS0xIC0xIC0xIC0zcTAgLTYgNC41IC0xMXQxMS41IC01aDEzM3E3IDAgMTEgNXQ0IDExdjYwNXEwIDYgLTQgMTAuNXQtMTEgNC41ek0yMjMgNjUycTU1IC00NSAxMjAgLTcxcTMxIC0xMiA2MyAtMjBxLTEwIC01MSAtMzQgLTEwOC41dC00MCAtODUKdC0zMCAtNDcuNWgtNzl2MzMyek0yMjMgOTd2MTkyaDc1bDI1IC0xOTJoLTEwMHpNNDk5IDE4MWgtMTU2bC0xNiAxMjJxMTQgMjEgMzEgNTB0NDIuNSA4OC41dDM1LjUgMTEzLjVxMzEgLTUgNjMgLTZ2LTM2OHpNMzU1IDYxMHEtNTkgMjMgLTEwOCA2MWg1MzNxLTQ5IC0zOCAtMTA3IC02MXEtNzYgLTMxIC0xNTkgLTMxcS04NCAwIC0xNTkgMzF6TTY4NCAxODFoLTE1NXYzNjhxMzEgMSA2MiA2cTExIC01NCAzNiAtMTEzLjV0NDIgLTg4LjUKdDMyIC01MHpNODA1IDk3aC0xMDFsMjYgMTkyaDc1di0xOTJ6TTgwNSAzMjBoLTc5cS0xNCAyMSAtMzAgNDh0LTQwLjUgODQuNXQtMzMuNSAxMDguNXEzMiA4IDYyIDIwcTI3IDExIDYyLjUgMzJ0NTguNSAzOXYtMzMyeiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ5YW5qaV9kaW5nc2hpZ3VhbmppIiB1bmljb2RlPSImI3hlNjBlOyIgCmQ9Ik02NjggNzQ1di00NXExMTAgLTQ0IDE3OC41IC0xNDR0NjguNSAtMjIzcTAgLTEwNyAtNTIuNSAtMTk4LjV0LTE0MyAtMTQ0LjV0LTE5Ni41IC01M3QtMTk2LjUgNTN0LTE0MyAxNDQuNXQtNTIuNSAxOTguNXEwIDEyMyA2OC41IDIyM3QxNzguNSAxNDR2NDVxLTEyOCAtNDYgLTIwOC41IC0xNTl0LTgwLjUgLTI1M3EwIC0xMjAgNTggLTIyMXQxNTggLTE1OS41dDIxOCAtNTguNXQyMTggNTguNXQxNTggMTU5LjV0NTggMjIxCnEwIDE0MCAtODAuNSAyNTN0LTIwOC41IDE1OXpNNTQzIDM1M3Y0OThxMCAxMSAtNiAxOHQtMTQgN3QtMTQgLTd0LTYgLTE4di00OThoLTJ2LTQwaDI2NXExMCAwIDE3IDUuNXQ3IDE0dC03IDE0LjV0LTE3IDZoLTIyM3oiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ieHVuaHVhbiIgdW5pY29kZT0iJiN4ZTgxOTsiIApkPSJNOTQ0IDczM2wtMTUwIDE1M3EtNyAxMCAtMjAuNSAxMHQtMjMuNSAtMTBxLTE2IC0yMiAwIC00NGw5OSAtOTloLTQ3M3EtMTI1IDAgLTIxNCAtODkuNXQtODkgLTIxNi41cTAgLTEzIDkgLTIydDIyIC05dDIxLjUgOXQ4LjUgMjJxMCAxMDIgNzEgMTczLjV0MTcxIDcxLjVoNDgwbC0xMTMgLTExNnEtNyAtOCAtNyAtMjF0Ny41IC0yM3QyMC41IC0xMHQyNCAxMGwxNTYgMTYwcTEwIDE1IDEwIDIzcTAgMjEgLTEwIDI4ek0xNjUgNDIKbDExMiAtMTE2cTggLTcgOCAtMjAuNXQtNy41IC0yMy41dC0yMSAtMTB0LTIzLjUgMTBsLTE1MyAxNjRxLTE0IDEzIC03IDM0cTAgMyA3IDE3bDE1MCAxNTNxNyA3IDIwLjUgN3QyMy41IC03cTE2IC0yMiAwIC00NWwtOTkgLTk4aDQ0MnExMDAgMCAxNzEgNzEuNXQ3MSAxNzMuNXEwIDEyIDkgMjF0MjEuNSA5dDIxLjUgLTl0OSAtMjFxMCAtMTI4IC04OC41IC0yMTd0LTIxNC41IC04OXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0icXVhbnNoZW5nemhlbmd6aHVhbmciIHVuaWNvZGU9IiYjeGU2NDY7IiAKZD0iTTU2MiA3NjRxLTIxIDMgLTQzIDNxLTEwMyAwIC0xOTEgLTUydC0xNDEgLTE0MS41dC01NyAtMTk2LjVsMTcgMjVxLTM2IC0xNSAtNTcuNSAtNDh0LTIxLjUgLTczcTAgLTU0IDM2LjUgLTkydDg4LjUgLTM4aDExbC0zIDI4bC0yNCAtMTNxNTIgLTk4IDE0My41IC0xNTQuNXQxOTguNSAtNTYuNXExMDYgMCAxOTYuNSA1NS41dDE0Mi41IDE1MC41bC0yMyAtMTRxNTEgMCA4NyAzOHQzNiA5MnEwIDM1IC0xNyA2NS41dC00NiA0Ny41bDEzIC0yNApxLTEgMTI5IC03NCAyMzNxLTYgMTAgLTE3LjUgMTEuNXQtMjAuNSAtNXQtMTAuNSAtMTguNXQ0LjUgLTIxcTYzIC05MCA2NCAtMjAxdi0xNmwxNCAtOHEzNiAtMjEgMzYgLTY0cTAgLTMwIC0yMC41IC01MS41dC00OS41IC0yMi41aC0xNmwtNyAtMTRxLTQ1IC04MiAtMTIzIC0xMjkuNXQtMTY5IC00Ny41cS05MiAwIC0xNzEgNDguNXQtMTIzIDEzMi41bC04IDE2bC0xOCAtMXEtMyAtMSAtNiAtMXEtMjkgMCAtNDkuNSAyMS41dC0yMC41IDUyLjUKcTAgMjMgMTIgNDEuNXQzMiAyNi41bDE3IDd2MThxNiAxNDEgMTAzIDIzOC41dDIzMiA5Ny41cTE5IDAgMzcgLTJxMTIgLTIgMjAuNSA1LjV0MTAgMTkuNXQtNS41IDIxdC0xOSAxMHYwek03MDAgMjUycS0zIC02IC02IC0xMXEtMjcgLTUxIC03NS41IC04MC41dC0xMDUuNSAtMjkuNXEtNTkgMCAtMTA5LjUgMzN0LTc2LjUgODhxLTUgMTAgLTE2IDE0dC0yMSAtMS41dC0xMy41IC0xNi41dDEuNSAtMjJxMzMgLTY5IDk2LjUgLTExMHQxMzguNSAtNDEKcTcyIDAgMTMzIDM3dDk2IDEwMXEzIDcgNyAxM3E1IDExIDEgMjJ0LTE0IDE2LjV0LTIwLjUgMS41dC0xNS41IC0xNHYwek02NDMgNzc0cTMwIC0xIDUxIC0yM3EyMiAtMjIgMjIgLTU0dC0yMS41IC01NXQtNTIuNSAtMjN0LTUzIDIycS04IDkgLTE5IDguNXQtMTkgLTguNXQtOCAtMjB0OCAtMjBxMzggLTM5IDkxLjUgLTM5dDkxIDQwdDM3IDk1LjV0LTM4LjUgOTQuNXEtMzcgMzggLTg4IDM5cS0xMSAwIC0xOS41IC04LjV0LTguNSAtMjB0OCAtMjAKdDE5IC04LjV2MHpNNzE2IDQxN3ExNyAtMTcgMTcgLTQxcTAgLTIzIC0xNiAtNDB0LTM5IC0xN3QtMzkgMTd0LTE2IDQwLjV0MTYgNDB0MzkgMTYuNXEyMiAwIDM4IC0xNnpNMzkxIDQxN3ExNyAtMTcgMTcgLTQxcTAgLTIzIC0xNiAtNDB0LTM4LjUgLTE3dC0zOC41IDE3dC0xNiA0MC41dDE2IDQwdDM4IDE2LjV0MzggLTE2eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJzaGFuemktIiB1bmljb2RlPSImI3hlNmY5OyIgCmQ9Ik01MTYgMzA3cS01NCAwIC0xMDEuNSAtMjR0LTc5LjUgLTY1bDE3NiAtNzRsLTQ2IC0yMHE3IC0xMCAyMS41IC0xN3QyNi41IC03djB2MHExMiAwIDI1LjUgNi41dDIxLjUgMTUuNWwtNDcgMjFsMTc4IDgzcS0zMiAzOCAtNzcuNSA1OS41dC05Ny41IDIxLjV6TTUxNiA2MzZxLTE1MSAwIC0yNzQgLTgyLjV0LTE4MSAtMjE2LjVsMjI3IC05OHEzOSA1NCA5OSA4NnQxMjkgMzJxNjcgMCAxMjUgLTI5LjV0OTcgLTc5LjVsMjI2IDEwNgpxLTYxIDEyNyAtMTgxLjUgMjA0LjV0LTI2Ni41IDc3LjV6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9IjU4YjQ3MSIgdW5pY29kZT0iJiN4ZTYyMjsiIApkPSJNNTEyIDg3MnEtMjAyIDAgLTM0NSAtMTQzdC0xNDMgLTM0NXQxNDMgLTM0NXQzNDUgLTE0M3QzNDUgMTQzdDE0MyAzNDV0LTE0MyAzNDV0LTM0NSAxNDN6TTc0OSAxOTJsLTQ1IC00NWwtMTgxIDE4MWwtMTgxIC0xODFsLTQ2IDQ1bDE4MSAxODFsLTE4MSAxODFsNDYgNDZsMTgxIC0xODFsMTgxIDE4MWw0NSAtNDZsLTE4MSAtMTgxeiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJzZWxlY3RlZCIgdW5pY29kZT0iJiN4ZTY2ODsiIApkPSJNNTA3LjUgODE0cS0xMTYuNSAwIC0yMTUgLTU3dC0xNTYgLTE1NS41dC01Ny41IC0yMTV0NTcuNSAtMjE1dDE1NiAtMTU1LjV0MjE0LjUgLTU3dDIxNSA1N3QxNTYgMTU1LjV0NTcgMjE1dC01NyAyMTV0LTE1NS41IDE1NS41dC0yMTUgNTd6TTQ3NSAyMjVsLTE5NCAxNzdsMzIgMTZsMTUxIC0xMDVsMjIxIDIzNWg0OXoiIC8+CiAgPC9mb250Pgo8L2RlZnM+PC9zdmc+Cg=="

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "data:application/x-font-ttf;base64,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AGkAbgB0ACAAKAB2ADAALgA5ADQAKQAgAC0AbAAgADgAIAAtAHIAIAA1ADAAIAAtAEcAIAAyADAAMAAgAC0AeAAgADEANAAgAC0AdwAgACIARwAiACAALQBmACAALQBzAGkAYwBvAG4AZgBvAG4AdAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE0AAAABAAIAWwECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBEwEUARUBFgEXARgBGQEaARsBHAEdAR4BHwEgASEBIgEjASQBJQEmAScBKAEpASoBKwEsAS0BLgEvATABMQEyATMBNAE1ATYBNwE4ATkBOgE7ATwBPQE+AT8BQAFBAUIBQwFEAUUBRgFHAUgBSQFKB3NoYW5jaHUHZ2VuZ2R1bwZmYW5odWkFaGVhcnQGeGlhemFpCXR0cG9kaWNvbgIyMgRtaW1hBmd1YW5iaQtzaGFuZ3lpc2hvdQV4aWFsYQp3ZWliaWFvdGkxCGZlbnhpYW5nCXBlb3BsZWZ1bg10dWJpYW9xaW5nZ2FuB2h1YXRvbmcCd28Gc2hpcGluDHp1aWppbmJvZmFuZwJjaQx5aWppYW5mYW5rdWkGcGxheS1vCGNhaWRhbjAxDHdlY2hhdGljb24xNgVhbGFybQd0dWlqaWFuB3NodWF4aW4HemFudGluZwxkYW5xdXh1bmh1YW4LdGluZ2dlc2hpcXUGeXVucGFuAnNxBGdlcXUJdGluZ3lpbmxlB2NhaWppYW4FMTExNzgYeW91amlhbmNhaWRhbmZ1ZmVpeGlhemFpAjExCnhpYWxhLWNvcHkJbS1tZW1iZXJzBWJlbmRpCGZ1eHVhbjAxEXd4YnNvdXN1b3R1aWd1YW5nEnNodXJ1emhlbmdxdWV0aXNoaQpsaXV5YW4tYWx0B2Zhbmh1aTEMamlhbnRvdS1jb3B5BXlpbmxlCXdvZGVqaWZlbgZjYWlkYW4Hc2hhbmdsYQxzaGFuZ2xhLWNvcHkGeWlubGUxDWljb25mb250bG92ZTIPYm9mYW5namluZHV0aWFvBnN1aWppMhJ6aGVubGluZ3poZW5nLWNvcHkNZGFucXV4dW5odWFuMQl4aWF5aXNob3UHY2FpZGFuMQV3ZW56aQNzaHULd3VzdW55aW56aGkJc2hvdXlpbmppCXBp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ARQrLbA3LLAuKyMgLkawAiVGUlggPFkusSQBFCstsDgssC8riiAgPLAEI0KKOCMgLkawAiVGUlggPFkusSQBFCuwBEMusCQrLbA5LLAAFrAEJbAEJiAuRyNHI2GwBkUrIyA8IC4jOLEkARQrLbA6LLEJBCVCsAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgR7AEQ7CAYmAgsAArIIqKYSCwAkNgZCOwA0NhZFBYsAJDYRuwA0NgWbADJbCAYmGwAiVGYTgjIDwjOBshICBGI0ewACsjYTghWbEkARQrLbA7LLAuKy6xJAEUKy2wPCywLyshIyAgPLAEI0IjOLEkARQrsARDLrAkKy2wPSywABUgR7AAI0KyAAEBFRQTLrAqKi2wPiywABUgR7AAI0KyAAEBFRQTLrAqKi2wPyyxAAEUE7ArKi2wQCywLSotsEEssAAWRSMgLiBGiiNhOLEkARQrLbBCLLAJI0KwQSstsEMssgAAOistsEQssgABOistsEUssgEAOistsEYssgEBOistsEcssgAAOystsEgssgABOystsEkssgEAOystsEossgEBOystsEsssgAANystsEwssgABNystsE0ssgEANystsE4ssgEBNystsE8ssgAAOSstsFAssgABOSstsFEssgEAOSstsFIssgEBOSstsFMssgAAPCstsFQssgABPCstsFUssgEAPCstsFYssgEBPCstsFcssgAAOCstsFgssgABOCstsFkssgEAOCstsFossgEBOCstsFsssDArLrEkARQrLbBcLLAwK7A0Ky2wXSywMCuwNSstsF4ssAAWsDArsDYrLbBfLLAxKy6xJAEUKy2wYCywMSuwNCstsGEssDErsDUrLbBiLLAxK7A2Ky2wYyywMisusSQBFCstsGQssDIrsDQrLbBlLLAyK7A1Ky2wZiywMiuwNistsGcssDMrLrEkARQrLbBoLLAzK7A0Ky2waSywMyuwNSstsGossDMrsDYrLbBrLCuwCGWwAyRQeLABFTAtAABLuADIUlixAQGOWbkIAAgAYyCwASNEILADI3CwDkUgIEu4AA5RS7AGU1pYsDQbsChZYGYgilVYsAIlYbABRWMjYrACI0SzCgkFBCuzCgsFBCuzDg8FBCtZsgQoCUVSRLMKDQYEK7EGAUSxJAGIUViwQIhYsQYDRLEmAYhRWLgEAIhYsQYBRFlZWVm4Af+FsASNsQUARAAAAA=="

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "data:application/font-woff;base64,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"

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkzMzg4M0YyQ0E2MjExRTZBNENBQkQ4RDMwNjM2OEExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkzMzg4M0YzQ0E2MjExRTZBNENBQkQ4RDMwNjM2OEExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTMzODgzRjBDQTYyMTFFNkE0Q0FCRDhEMzA2MzY4QTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTMzODgzRjFDQTYyMTFFNkE0Q0FCRDhEMzA2MzY4QTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5jVAXvAAAAfklEQVR42mL8tWI1A/Pz5zGML15OZACC/xLi+X8lJJawMH76HM10/cY0BkZGXpAE4/v30/5xczMw/i+r+sDw8SM/AzMzAxj8/cvAwM//kYkBB2D6o6KSzfD//2ewShAGsv+oKOew/OflWfpPQ52R8eUriOXiYvn/eXmXAAQYAFn2MFVEcLQSAAAAAElFTkSuQmCC"

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAACgCAMAAACsXRuGAAAAt1BMVEX////FxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcU7SVrkAAAAPHRSTlMAAPONxyCMRvCjM2n59gzeD/xssVo52Akwh6sDpeTbckJLZroqfhUnRernVxifG9XDgb2ZzzxjeLThEmBcLCjmAAACDklEQVR4Xu2Y124yQQyFM9sh9BJafgik956/7fs/V4RCwiITbMdjCSGfKy4On7THnuLZ8yGTyRWUr1W54NgNIC4Dbm+VrQ+tbQxoQAMa0IAGnO4vtR44WBquCcBuJadrSslwQucNaBm2qbyHEQ3YqNN4l3fUKpdpMV7Q26ZF4T3S+5AU49OIA8RjvLpxDCAeY/PIcYB4jKf8tTzcxDt2fGBt/D3v19kPgK5fRQLkAt0MCZANdIdIgGxg7WBjgHygO1kTY/NVMla8QeBvJwHCGP84CRDG+PefBAhjrHTlo9n/InDiY9a7XfLazgewd//Jqze8AN15sAiw7Gu87XwAW/7m5ec5b+j8AXsveT6uSYAwxmrf7xNBZ+aYQJPJZDLh+20aRlkWhen8twdgnCyO0SCJfQDjUv6lUuwBmOQFJXJgGhSBQSoGhvmKQnFNo1VgBD3MmmarwAx6WDWFQOhh1RR+MvSwagqLwqw7/ndW3UkfCD2bhJcAephAvJGYn4y3OrMouIfZNriH19i4h7v0cI9ww4ce4ZEEPTt6/uJ+UdS4H28G1C9qV9yPLyjUL1vyuB/dlLh+dNtE/dpA+SdrF0XeNsqNLV96+puDfPvaaukfUvJjVP+gl19F9C9L8uuc/oVTfiXWv7TLxwr9wUc+msmHR/3xVj6A6z8RSBej/jMLp+76T1X6j2m7eP6aTO9STHV4CXebKAAAAABJRU5ErkJggg=="

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(37)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(33),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3e501fc8",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\3stage\\vue-studs-templat\\15-Music重构\\src\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e501fc8", Component.options)
  } else {
    hotAPI.reload("data-v-3e501fc8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(39)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(35),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9a3d347e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\3stage\\vue-studs-templat\\15-Music重构\\src\\components\\musiclibrary\\MusicComponent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MusicComponent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9a3d347e", Component.options)
  } else {
    hotAPI.reload("data-v-9a3d347e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(40)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(36),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a4ca5522",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\3stage\\vue-studs-templat\\15-Music重构\\src\\components\\musiclibrary\\mFooter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mFooter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a4ca5522", Component.options)
  } else {
    hotAPI.reload("data-v-a4ca5522", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(38)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(34),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-62658d3e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "D:\\3stage\\vue-studs-templat\\15-Music重构\\src\\components\\musiclibrary\\mHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62658d3e", Component.options)
  } else {
    hotAPI.reload("data-v-62658d3e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('m-header'), _vm._v(" "), _c('music-component'), _vm._v(" "), _c('m-footer')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3e501fc8", module.exports)
  }
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header1"
  }, [_c('header', [_c('ul', [_c('li', {
    staticClass: "slide"
  }, [_c('span', {
    staticClass: "iconfont icon-caidan"
  })]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "assets/html/mine.html"
    }
  }, [_vm._v("我的")])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "active",
    attrs: {
      "href": "index.html"
    }
  }, [_vm._v("乐库")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "assets/html/find.html"
    }
  }, [_vm._v("发现")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "assets/html/search.html"
    }
  }, [_c('span', {
    staticClass: "iconfont icon-wxbsousuotuiguang"
  })])])])]), _vm._v(" "), _c('nav', {
    staticClass: "border"
  }, [_c('li', {
    staticClass: "active"
  }, [_vm._v("推荐")]), _vm._v(" "), _c('li', [_vm._v("歌单")]), _vm._v(" "), _c('li', [_vm._v("排行榜")]), _vm._v(" "), _c('li', [_vm._v("电台")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-62658d3e", module.exports)
  }
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " content swiper-container"
  }, [_c('div', {
    staticClass: "swiper-wrapper"
  }, [_c('div', {
    staticClass: "swiper-slide reco"
  }, [_c('div', {
    staticClass: "swiper-container con"
  }, [_c('div', {
    staticClass: "swiper-wrapper"
  }, [_c('div', {
    staticClass: "swiper-slide"
  }, [_c('img', {
    attrs: {
      "src": "assets/images/ban1.jpg"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide"
  }, [_c('img', {
    attrs: {
      "src": "assets/images/ban2.jpg"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide"
  }, [_c('img', {
    attrs: {
      "src": "assets/images/ban3.jpg"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide"
  }, [_c('img', {
    attrs: {
      "src": "assets/images/ban22.jpg"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide"
  }, [_c('img', {
    attrs: {
      "src": "assets/images/ban31.jpg"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide"
  }, [_c('img', {
    attrs: {
      "src": "assets/images/banner1.jpg"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide"
  }, [_c('img', {
    attrs: {
      "src": "assets/images/banner1.png"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide"
  }, [_c('img', {
    attrs: {
      "src": "assets/images/banner2.png"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide"
  }, [_c('img', {
    attrs: {
      "src": "assets/images/banner5.png"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "swiper-pagination page"
  })]), _vm._v(" "), _c('div', {
    staticClass: "icon"
  }, [_c('span', {
    staticClass: "iconfont icon-tuijian"
  }), _vm._v(" "), _c('span', {
    staticClass: "iconfont icon-shouyinji"
  }), _vm._v(" "), _c('span', {
    staticClass: "iconfont icon-caijian"
  })]), _vm._v(" "), _c('ul', {
    staticClass: "recomm"
  }, [_c('li', [_vm._v("每日推荐")]), _vm._v(" "), _c('li', [_vm._v("私人FM")]), _vm._v(" "), _c('li', [_vm._v("铃音DIY")])]), _vm._v(" "), _c('div', {
    staticClass: "musicList"
  }, [_c('h3', [_vm._v("推荐歌单"), _c('span', {
    staticClass: "iconfont icon-weibiaoti1"
  })]), _vm._v(" "), _c('div', {
    staticClass: "List"
  }, [_c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img17.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("4万")])]), _vm._v(" "), _c('dd', [_vm._v("最新台湾偶像剧原声")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/chang9.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("7万")])]), _vm._v(" "), _c('dd', [_vm._v("暖心圣诞欢乐颂")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img14.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("6万")])]), _vm._v(" "), _c('dd', [_vm._v("一首小清新、净化雾霾天")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img04.png"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("9万")])]), _vm._v(" "), _c('dd', [_vm._v("影视剧里缠绵悱恻的对唱")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img03.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("6万")])]), _vm._v(" "), _c('dd', [_vm._v("爱上慵懒，无限循环R&B")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img04.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("4万")])]), _vm._v(" "), _c('dd', [_vm._v("超清/无损音乐专区")])])]), _vm._v(" "), _c('h3', [_c('a', {
    attrs: {
      "href": "assets/html/newSong.html"
    }
  }, [_vm._v("新歌速递"), _c('span', {
    staticClass: "iconfont icon-weibiaoti1"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "newList"
  }, [_c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/big1.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("Christmas Love")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("Justin Biebar")])]), _vm._v(" "), _c('dd', {
    staticClass: "iconfont icon-caidan1 menu"
  })]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/zhu4.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("Ho Ho Santa")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("Kimuri Maunvaa...")])]), _vm._v(" "), _c('dd', {
    staticClass: "iconfont icon-caidan1 menu"
  })]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/small.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("恶作剧之后")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("李玉玺")])]), _vm._v(" "), _c('dd', {
    staticClass: "iconfont icon-caidan1 menu"
  })]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/tu50.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("宠儿")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("林宥嘉")])]), _vm._v(" "), _c('dd', {
    staticClass: "iconfont icon-caidan1 menu"
  })]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/tu51.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("我们的最后")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("任贤齐+梁汉文")])]), _vm._v(" "), _c('dd', {
    staticClass: "iconfont icon-caidan1 menu"
  })]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pic4.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("长城电影推广曲")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("张靓颖")])]), _vm._v(" "), _c('dd', {
    staticClass: "iconfont icon-caidan1 menu"
  })]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/tu52.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("别闹")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("本兮")])]), _vm._v(" "), _c('dd', {
    staticClass: "iconfont icon-caidan1 menu"
  })]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/tu53.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("yes IDo")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("Justin Biebar")])]), _vm._v(" "), _c('dd', {
    staticClass: "iconfont icon-caidan1 menu"
  })]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/zhu5.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("黯然销魂掌")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("李代沫")])]), _vm._v(" "), _c('dd', {
    staticClass: "iconfont icon-caidan1 menu"
  })]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/xin7.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("态度")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("谭轩辕")])]), _vm._v(" "), _c('dd', {
    staticClass: "iconfont icon-caidan1 menu"
  })])]), _vm._v(" "), _c('h3', [_c('a', {
    attrs: {
      "href": "assets/html/album.html"
    }
  }, [_vm._v("精选专辑 "), _c('span', {
    staticClass: "iconfont icon-weibiaoti1"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "List1"
  }, [_c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/chang5.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_vm._v("2016-12-09")])]), _vm._v(" "), _c('dd', [_vm._v("爱音乐星专访")]), _vm._v(" "), _c('dd', [_vm._v("爱音乐")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/tu53.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_vm._v("2016-12-02")])]), _vm._v(" "), _c('dd', [_vm._v("放弃我，抓紧我")]), _vm._v(" "), _c('dd', [_vm._v("群星")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img14.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_vm._v("2016-12-16")])]), _vm._v(" "), _c('dd', [_vm._v("寂寞更生")]), _vm._v(" "), _c('dd', [_vm._v("郁可唯")])])]), _vm._v(" "), _c('h3', [_c('a', {
    attrs: {
      "href": "assets/html/onlyMusic.html"
    }
  }, [_vm._v("音乐专栏"), _c('span', {
    staticClass: "iconfont icon-weibiaoti1"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "newList"
  }, [_c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/xin7.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("西藏-燃灯节")]), _vm._v(" "), _c('p', [_vm._v("燃灯节，藏地最美的一个夜晚")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/ban4.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("2016这些歌手被综艺救活")]), _vm._v(" "), _c('p', [_vm._v("综艺让他们开启歌唱事业第二春")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pic41.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("2016年度影视原声最佳作")]), _vm._v(" "), _c('p', [_vm._v("最热门影视金曲一网打尽")])])])]), _vm._v(" "), _c('h3', [_c('a', {
    attrs: {
      "href": "assets/html/mv.html"
    }
  }, [_vm._v("热门MV"), _c('span', {
    staticClass: "iconfont icon-weibiaoti1"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "MVList"
  }, [_c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/ge7.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-shipin"
  }), _vm._v("454")])]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("愚人的国度")]), _vm._v(" "), _c('p', [_vm._v("孙燕姿")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/zhu4.png"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-shipin"
  }), _vm._v("174")])]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("你给我听好")]), _vm._v(" "), _c('p', [_vm._v("陈奕迅")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/tu2.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-shipin"
  }), _vm._v("241")])]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("最好的事")]), _vm._v(" "), _c('p', [_vm._v("吴思贤/范玮琪")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/tu34.png"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-shipin"
  }), _vm._v("338")])]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("一笑倾城")]), _vm._v(" "), _c('p', [_vm._v("汪苏泷")])])])]), _vm._v(" "), _c('h3', [_vm._v("本周精选集"), _c('span', {
    staticClass: "iconfont icon-weibiaoti1"
  })]), _vm._v(" "), _c('div', {
    staticClass: "List"
  }, [_c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pic25.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("4509")])]), _vm._v(" "), _c('dd', [_vm._v("这些歌里满是眼泪")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/tu44.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("4282")])]), _vm._v(" "), _c('dd', [_vm._v("hold住全场")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pic9.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("7788")])]), _vm._v(" "), _c('dd', [_vm._v("一人一首代表做歌曲大赏")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pic13.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("1545")])]), _vm._v(" "), _c('dd', [_vm._v("二胡唢呐声中的爱与众")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pic23.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("3111")])]), _vm._v(" "), _c('dd', [_vm._v("原谅不美好，忘掉小烦恼")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img06.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("9068")])]), _vm._v(" "), _c('dd', [_vm._v("欧美|那些耳熟能详的外国旋律")])])]), _vm._v(" "), _c('h3', [_vm._v("有声精品"), _c('span', {
    staticClass: "iconfont icon-weibiaoti1"
  })]), _vm._v(" "), _c('div', {
    staticClass: "voice"
  }, [_c('p', [_c('span', {
    staticClass: "iconfont icon-shu"
  }), _vm._v("\n                        有声书\n                    ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-11178"
  }), _vm._v("\n                        音乐\n                    ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-peoplefun"
  }), _vm._v("\n                        娱乐\n                    ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-shanzi-"
  }), _vm._v("\n                        相声评书\n                    ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-tiyanguan"
  }), _vm._v("\n                        3D体验馆\n                    ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-huatong"
  }), _vm._v("\n                        脱口秀\n                    ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-quanshengzhengzhuang"
  }), _vm._v("\n                        儿童\n                    ")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-tubiaoqinggan"
  }), _vm._v("\n                        情感生活\n                    ")])])])]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide song"
  }, [_c('div', {
    staticClass: "wrapper"
  }, [_c('div', {
    staticClass: "scroller"
  }, [_c('div', {
    attrs: {
      "id": "pullDown"
    }
  }, [_c('span', {
    staticClass: "pullDownIcon"
  }), _vm._v(" "), _c('span', {
    staticClass: "pullDownLabel"
  }, [_vm._v("下拉刷新...")])]), _vm._v(" "), _c('div', {
    staticClass: "top"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("\n                            分类\n                            "), _c('span', {
    staticClass: "iconfont icon-xiala"
  })]), _vm._v(" "), _c('ul', {
    staticClass: "fenlei"
  }, [_c('li', {
    staticClass: "active"
  }, [_vm._v("最热")]), _vm._v(" "), _c('li', [_vm._v("最新")])])]), _vm._v(" "), _c('div', {
    staticClass: "new"
  }, [_c('div', {
    staticClass: "MucList"
  }, [_c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img10.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("4万")])]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("来自二次元的可爱符")]), _vm._v(" "), _c('p', [_c('img', {
    attrs: {
      "src": "assets/images/b.png"
    }
  }), _vm._v("恋人")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img18.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("4万")])]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("二十首暖歌伴你浓情圣诞")]), _vm._v(" "), _c('p', [_c('img', {
    attrs: {
      "src": "assets/images/b.png"
    }
  }), _vm._v("长腿")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img17.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("241")])]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("台湾最新偶像剧影视原声")]), _vm._v(" "), _c('p', [_c('img', {
    attrs: {
      "src": "assets/images/b.png"
    }
  }), _vm._v("在一起")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img16.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("9万")])]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("暖心圣诞欢乐颂")]), _vm._v(" "), _c('p', [_c('img', {
    attrs: {
      "src": "assets/images/b.png"
    }
  }), _vm._v("teddy")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img01.jpg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("6万")])]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("一首小清新，净化雾霾天")]), _vm._v(" "), _c('p', [_c('img', {
    attrs: {
      "src": "assets/images/b.png"
    }
  }), _vm._v("baga")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/img04.png"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("2万")])]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("影视剧里缠绵悱恻的对唱")]), _vm._v(" "), _c('p', [_c('img', {
    attrs: {
      "src": "assets/images/b.png"
    }
  }), _vm._v("怂")])])])])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "pullUp"
    }
  }, [_c('span', {
    staticClass: "pullUpIcon"
  }), _vm._v(" "), _c('span', {
    staticClass: "pullUpLabel"
  }, [_vm._v("查看更多")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide pai"
  }, [_c('div', {
    staticClass: "order"
  }, [_c('h3', [_vm._v("爱音乐官方榜")]), _vm._v(" "), _c('div', {
    staticClass: "paiCon"
  }, [_c('dl', [_c('a', {
    attrs: {
      "href": "assets/html/mv.html"
    }
  }, [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/mv.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("音乐MV榜")]), _vm._v(" "), _c('p', [_vm._v("1 天赋（锦绣未央片尾曲）唐嫣+罗晋")]), _vm._v(" "), _c('p', [_vm._v("2 下一秒（微微一笑很倾城片尾曲）张碧晨")]), _vm._v(" "), _c('p', [_vm._v("3 为你化成风 M.C THE MAX")])])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai12.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("24小时热歌榜")]), _vm._v(" "), _c('p', [_vm._v("1 该忘的日子 郭静")]), _vm._v(" "), _c('p', [_vm._v("2 当爱来敲门 放弃我抓紧我主题曲")]), _vm._v(" "), _c('p', [_vm._v("3 死了都要爱 GEM邓紫棋")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai13.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("网络歌曲榜")]), _vm._v(" "), _c('p', [_vm._v("1 空空空空 金丹")]), _vm._v(" "), _c('p', [_vm._v("2 追光使者 洛天依")]), _vm._v(" "), _c('p', [_vm._v("3 远方的远方还是远方 凤凰传奇")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai3.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("KTV点歌榜")]), _vm._v(" "), _c('p', [_vm._v("1 Sugar Maroon5")]), _vm._v(" "), _c('p', [_vm._v("2 一吻之间（青年医生）张碧晨")]), _vm._v(" "), _c('p', [_vm._v("3 趁早 张惠妹")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai4.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("劲爆DJ舞曲榜")]), _vm._v(" "), _c('p', [_vm._v("1 一万次为你心痛 龙奔")]), _vm._v(" "), _c('p', [_vm._v("2 不该遇见你 雨宗林")]), _vm._v(" "), _c('p', [_vm._v("3 别把疼你的人弄丢了 雨宗林")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai5.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("经典老歌榜")]), _vm._v(" "), _c('p', [_vm._v("1 浪人情歌 伍佰")]), _vm._v(" "), _c('p', [_vm._v("2 容易受伤的女人 王菲")]), _vm._v(" "), _c('p', [_vm._v("3 放弃你是我的错 曾春年")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai6.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("音乐发烧榜")]), _vm._v(" "), _c('p', [_vm._v("1 当我孤单时你会想起谁-和谐组合")]), _vm._v(" "), _c('p', [_vm._v("2 一个人的寂寞两个人的错 黄华")]), _vm._v(" "), _c('p', [_vm._v("3 咱们结婚吧 杨泉")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai7.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("影视金曲榜")]), _vm._v(" "), _c('p', [_vm._v("1 暖人（放弃我抓紧我插曲）张磊")]), _vm._v(" "), _c('p', [_vm._v("2 黯然销魂掌 李代沫")]), _vm._v(" "), _c('p', [_vm._v("3 讨厌喜欢你 （恶作剧之吻片头插曲）")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai8.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("下载")]), _vm._v(" "), _c('p', [_vm._v("1 姊妹2016 张惠妹")]), _vm._v(" "), _c('p', [_vm._v("2 呵护 梁静茹")]), _vm._v(" "), _c('p', [_vm._v("3 暖人 张磊")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai10.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("经典粤语榜")]), _vm._v(" "), _c('p', [_vm._v("1 公子多情 刘美君")]), _vm._v(" "), _c('p', [_vm._v("2 一切也愿意 蔡国权")]), _vm._v(" "), _c('p', [_vm._v("3 天才白痴梦 谭咏麟")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai11.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("搞笑铃音榜")]), _vm._v(" "), _c('p', [_vm._v("1 天气预报下人命币 爱音乐")]), _vm._v(" "), _c('p', [_vm._v("2 我家公鸡在洗澡 米伟")]), _vm._v(" "), _c('p', [_vm._v("3 搞笑的来电铃声 张洋")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/pai12.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("下载Top100")]), _vm._v(" "), _c('p', [_vm._v("1  姊妹2016 张惠妹")]), _vm._v(" "), _c('p', [_vm._v("2 下一秒（微微一笑很倾城片尾曲）张碧晨")]), _vm._v(" "), _c('p', [_vm._v("3 为你化成风 M.C THE MAX")])])])]), _vm._v(" "), _c('h3', [_vm._v("全球媒体榜")]), _vm._v(" "), _c('div', {
    staticClass: "paiCon"
  }, [_c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/wor1.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("英国UK榜")]), _vm._v(" "), _c('p', [_vm._v("1 天赋（锦绣未央片尾曲）唐嫣+罗晋")]), _vm._v(" "), _c('p', [_vm._v("2 下一秒（微微一笑很倾城片尾曲）张碧晨")]), _vm._v(" "), _c('p', [_vm._v("3 为你化成风 M.C THE MAX")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/wor2.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("韩国音乐榜")]), _vm._v(" "), _c('p', [_vm._v("1 该忘的日子 郭静")]), _vm._v(" "), _c('p', [_vm._v("2 当爱来敲门 放弃我抓紧我主题曲")]), _vm._v(" "), _c('p', [_vm._v("3 死了都要爱 GEM邓紫棋")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/wor3.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("中国Top排行榜")]), _vm._v(" "), _c('p', [_vm._v("1 空空空空 金丹")]), _vm._v(" "), _c('p', [_vm._v("2 追光使者 洛天依")]), _vm._v(" "), _c('p', [_vm._v("3 远方的远方还是远方 凤凰传奇")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/wor4.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("香港RTHK电台榜")]), _vm._v(" "), _c('p', [_vm._v("1 Sugar Maroon5")]), _vm._v(" "), _c('p', [_vm._v("2 一吻之间（青年医生）张碧晨")]), _vm._v(" "), _c('p', [_vm._v("3 趁早 张惠妹")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/wor5.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("iTunes音乐榜")]), _vm._v(" "), _c('p', [_vm._v("1 一万次为你心痛 龙奔")]), _vm._v(" "), _c('p', [_vm._v("2 不该遇见你 雨宗林")]), _vm._v(" "), _c('p', [_vm._v("3 别把疼你的人弄丢了 雨宗林")])])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/wor6.png"
    }
  })]), _vm._v(" "), _c('dd', [_c('h4', [_vm._v("美国billboard榜")]), _vm._v(" "), _c('p', [_vm._v("1 浪人情歌 伍佰")]), _vm._v(" "), _c('p', [_vm._v("2 容易受伤的女人 王菲")]), _vm._v(" "), _c('p', [_vm._v("3 放弃你是我的错 曾春年")])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "swiper-slide diantai"
  }, [_c('div', {
    staticClass: "dianCon"
  }, [_c('ul', {
    staticClass: "dianLeft"
  }, [_c('li', {
    staticClass: "active"
  }, [_vm._v("特色")]), _vm._v(" "), _c('li', [_vm._v("风格")]), _vm._v(" "), _c('li', [_vm._v("场景")]), _vm._v(" "), _c('li', [_vm._v("心情")]), _vm._v(" "), _c('li', [_vm._v("年代")]), _vm._v(" "), _c('li', [_vm._v("主题")]), _vm._v(" "), _c('li', [_vm._v("语言")])]), _vm._v(" "), _c('div', {
    staticClass: "dianRight"
  }, [_c('div', {
    staticClass: "theme1"
  }, [_c('span', {
    staticClass: "te"
  }, [_vm._v("特色")])]), _vm._v(" "), _c('div', {
    staticClass: "feature sele"
  }, [_c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/zhu7.png"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("4万")])]), _vm._v(" "), _c('dd', [_vm._v("热歌")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/zhu7.png"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("4万")])]), _vm._v(" "), _c('dd', [_vm._v("热歌")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/zhu7.png"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("4万")])]), _vm._v(" "), _c('dd', [_vm._v("热歌")])]), _vm._v(" "), _c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/zhu7.png"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "num"
  }, [_c('span', {
    staticClass: "iconfont icon-tingyinle"
  }), _vm._v("4万")])]), _vm._v(" "), _c('dd', [_vm._v("热歌")])])])])])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9a3d347e", module.exports)
  }
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('footer', {
    staticClass: "footer border"
  }, [_c('div', {
    staticClass: "musicPlay  border1"
  }, [_c('div', {
    staticClass: "muicLeft"
  }, [_c('dl', [_c('dt', [_c('img', {
    attrs: {
      "src": "assets/images/tu53.jpg"
    }
  })]), _vm._v(" "), _c('dd', [_c('p', [_vm._v("yes IDo")]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "iconfont icon-wusunyinzhi"
  }), _vm._v("Justin Biebar")])])])]), _vm._v(" "), _c('ul', {
    staticClass: "musicRight"
  }, [_c('li', [_c('span', {
    staticClass: "iconfont icon-play-o"
  })]), _vm._v(" "), _c('li', [_c('span', {
    staticClass: "iconfont icon-xiayishou"
  })]), _vm._v(" "), _c('li', [_c('span', {
    staticClass: "iconfont icon-yinle"
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "scrollBar"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a4ca5522", module.exports)
  }
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6d43241e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e501fc8\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3e501fc8\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3d405354", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62658d3e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mHeader.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62658d3e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mHeader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("d9a6d18a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9a3d347e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MusicComponent.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9a3d347e\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MusicComponent.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("9abf9a60", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a4ca5522\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mFooter.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-a4ca5522\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./mFooter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.3.4
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}
/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

var warn = noop;
var tip = noop;
var formatComponentName = (null); // work around flow check

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    } )); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      child.data && child.data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      if (isReservedProp[key] || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "development" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || {});
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    vnode.functionalOptions = Ctor.options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "development" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return this
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode.ssrContext
  }
});

Vue$3.version = '2.3.4';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (isUndef(value)) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("development" !== 'production' &&
              typeof console !== 'undefined' &&
              !bailed
            ) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if ("development" !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    "development" !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, warn$3)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, warn$3)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el)
  }
  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}}"
}

function genForScopedSlot (key, el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el)) +
    '})'
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ }),
/* 43 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 44 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ })
/******/ ]);