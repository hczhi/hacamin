(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commons"],{

/***/ "./node_modules/_process@0.11.10@process/browser.js":
/*!**********************************************************!*\
  !*** ./node_modules/_process@0.11.10@process/browser.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/_setimmediate@1.0.5@setimmediate/setImmediate.js":
/*!***********************************************************************!*\
  !*** ./node_modules/_setimmediate@1.0.5@setimmediate/setImmediate.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../_webpack@4.16.3@webpack/buildin/global.js */ "./node_modules/_webpack@4.16.3@webpack/buildin/global.js"), __webpack_require__(/*! ./../_process@0.11.10@process/browser.js */ "./node_modules/_process@0.11.10@process/browser.js")))

/***/ }),

/***/ "./node_modules/_timers-browserify@2.0.10@timers-browserify/main.js":
/*!**************************************************************************!*\
  !*** ./node_modules/_timers-browserify@2.0.10@timers-browserify/main.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/_setimmediate@1.0.5@setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../_webpack@4.16.3@webpack/buildin/global.js */ "./node_modules/_webpack@4.16.3@webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/_vue-loader@14.2.3@vue-loader/lib/runtime/component-normalizer.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/_vue-loader@14.2.3@vue-loader/lib/runtime/component-normalizer.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
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
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/_vue@2.5.16@vue/dist/vue.runtime.esm.js":
/*!**************************************************************!*\
  !*** ./node_modules/_vue@2.5.16@vue/dist/vue.runtime.esm.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

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
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

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
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
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
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

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
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

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
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
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
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
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
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
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
})

/*  */

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

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
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

var _Set;
/* istanbul ignore if */ // $flow-disable-line
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

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
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
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
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

  generateComponentTrace = function (vm) {
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

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
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
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
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
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
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
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
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
    defineReactive(obj, keys[i]);
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
function protoAugment (target, src, keys) {
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
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
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
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
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
      childOb = !shallow && observe(newVal);
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
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
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
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
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
if (true) {
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
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
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
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
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
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
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
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

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
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
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
      } else if (true) {
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
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
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

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
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
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
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
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
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
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
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
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
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

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
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
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
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

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
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

var mark;
var measure;

if (true) {
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
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
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
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
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
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
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
      if (true) {
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
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
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
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
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
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
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

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
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

function add (event, fn, once) {
  if (once) {
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
  target = undefined;
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
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
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
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
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
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
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
var isUpdatingChildComponent = false;

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
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
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
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
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
    if (true) {
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
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
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
  if (true) {
    isUpdatingChildComponent = true;
  }

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

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
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
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
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
  popTarget();
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
  if (true) {
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
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
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

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
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
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
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
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
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
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
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
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
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
    if (true) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
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

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
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
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
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
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
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
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
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

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
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
  asProp,
  isSync
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
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
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
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
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

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
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
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

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
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
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
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
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
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
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
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (true) {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {}
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
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
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
    if (true) {
      initProxy(vm);
    } else {}
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
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

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

function Vue (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
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
    installedPlugins.push(plugin);
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
    if ("development" !== 'production' && name) {
      validateComponentName(name);
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
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
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

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
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
    defineReactive: defineReactive
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

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
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
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
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
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
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
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



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

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

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

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
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
	setStyleScope: setStyleScope
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
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

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
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
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
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
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
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
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
        creatingElmInVPre--;
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

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
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
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
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
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

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
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
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
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

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

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
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
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
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
            } else if (true) {
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

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
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
}

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
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
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
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
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
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
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
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
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
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
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
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

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
}

/*  */

/*  */









// add a raw attr (use this in preTransforms)








// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
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
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
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
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

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
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

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
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
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

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
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
  // make sure to clone it if it's reactive, since the user likely wants
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
}

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
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
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
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
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
    mergeVNodeHook(vnode, 'insert', function () {
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
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
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
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
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
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
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
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

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

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
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
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
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
  return options.every(function (o) { return !looseEqual(o, value); })
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
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
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
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
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
}

var platformDirectives = {
  model: directive,
  show: show
}

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
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
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
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
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

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
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
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

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
        } else if (true) {
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
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

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
      /* istanbul ignore if */
      if (this._hasMove) {
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
}

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
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        "development" !== 'production' &&
        "development" !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ("development" !== 'production' &&
      "development" !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../_webpack@4.16.3@webpack/buildin/global.js */ "./node_modules/_webpack@4.16.3@webpack/buildin/global.js"), __webpack_require__(/*! ./../../_timers-browserify@2.0.10@timers-browserify/main.js */ "./node_modules/_timers-browserify@2.0.10@timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/_webpack@4.16.3@webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/_webpack@4.16.3@webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/common/css/global.scss":
/*!************************************!*\
  !*** ./src/common/css/global.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/ycf/ycf.css":
/*!*************************!*\
  !*** ./src/ycf/ycf.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/ycf/ycf.js":
/*!************************!*\
  !*** ./src/ycf/ycf.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (A, e) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = e(__webpack_require__(/*! Vue */ "./node_modules/_vue@2.5.16@vue/dist/vue.runtime.esm.js")) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! Vue */ "./node_modules/_vue@2.5.16@vue/dist/vue.runtime.esm.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(window, function (A) {
  return function (A) {
    var e = {};function t(n) {
      if (e[n]) return e[n].exports;var r = e[n] = { i: n, l: !1, exports: {} };return A[n].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
    }return t.m = A, t.c = e, t.d = function (A, e, n) {
      t.o(A, e) || Object.defineProperty(A, e, { configurable: !1, enumerable: !0, get: n });
    }, t.r = function (A) {
      Object.defineProperty(A, "__esModule", { value: !0 });
    }, t.n = function (A) {
      var e = A && A.__esModule ? function () {
        return A.default;
      } : function () {
        return A;
      };return t.d(e, "a", e), e;
    }, t.o = function (A, e) {
      return Object.prototype.hasOwnProperty.call(A, e);
    }, t.p = "./mybuild", t(t.s = 207);
  }([function (A, e, t) {
    "use strict";
    function n(A, e, t, n, r, a, o, i) {
      var s = _typeof((A = A || {}).default);"object" !== s && "function" !== s || (A = A.default);var l,
          u = "function" == typeof A ? A.options : A;if (e && (u.render = e, u.staticRenderFns = t, u._compiled = !0), n && (u.functional = !0), a && (u._scopeId = a), o ? (l = function l(A) {
        (A = A || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (A = __VUE_SSR_CONTEXT__), r && r.call(this, A), A && A._registeredComponents && A._registeredComponents.add(o);
      }, u._ssrRegister = l) : r && (l = i ? function () {
        r.call(this, this.$root.$options.shadowRoot);
      } : r), l) if (u.functional) {
        u._injectStyles = l;var c = u.render;u.render = function (A, e) {
          return l.call(e), c(A, e);
        };
      } else {
        var B = u.beforeCreate;u.beforeCreate = B ? [].concat(B, l) : [l];
      }return { exports: A, options: u };
    }t.d(e, "a", function () {
      return n;
    });
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = c(t(73)),
        r = c(t(203)),
        a = c(t(202)),
        o = c(t(72)),
        i = c(t(201)),
        s = c(t(170)),
        l = c(t(167)),
        u = c(t(166));function c(A) {
      return A && A.__esModule ? A : { default: A };
    }var B = { con: n.default, runrem: r.default, html2canvas: i.default, lazy: s.default, modalHelper: a.default, yDate: o.default, ajax: l.default, scratch: u.default };B.con.isrem && B.runrem(), e.default = B;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
      return function (A, e) {
        if (Array.isArray(A)) return A;if (Symbol.iterator in Object(A)) return function (A, e) {
          var t = [],
              n = !0,
              r = !1,
              a = void 0;try {
            for (var o, i = A[Symbol.iterator](); !(n = (o = i.next()).done) && (t.push(o.value), !e || t.length !== e); n = !0) {}
          } catch (A) {
            r = !0, a = A;
          } finally {
            try {
              !n && i.return && i.return();
            } finally {
              if (r) throw a;
            }
          }return t;
        }(A, e);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        r = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }();var a = /^#([a-f0-9]{3})$/i,
        o = function o(A) {
      var e = A.match(a);return !!e && [parseInt(e[1][0] + e[1][0], 16), parseInt(e[1][1] + e[1][1], 16), parseInt(e[1][2] + e[1][2], 16), null];
    },
        i = /^#([a-f0-9]{6})$/i,
        s = function s(A) {
      var e = A.match(i);return !!e && [parseInt(e[1].substring(0, 2), 16), parseInt(e[1].substring(2, 4), 16), parseInt(e[1].substring(4, 6), 16), null];
    },
        l = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        u = function u(A) {
      var e = A.match(l);return !!e && [Number(e[1]), Number(e[2]), Number(e[3]), null];
    },
        c = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/,
        B = function B(A) {
      var e = A.match(c);return !!(e && e.length > 4) && [Number(e[1]), Number(e[2]), Number(e[3]), Number(e[4])];
    },
        d = function d(A) {
      return [Math.min(A[0], 255), Math.min(A[1], 255), Math.min(A[2], 255), A.length > 3 ? A[3] : null];
    },
        f = function f(A) {
      var e = g[A.toLowerCase()];return e || !1;
    },
        h = function () {
      function A(e) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A);var t = Array.isArray(e) ? d(e) : o(e) || u(e) || B(e) || f(e) || s(e) || [0, 0, 0, null],
            r = n(t, 4),
            a = r[0],
            i = r[1],
            l = r[2],
            c = r[3];this.r = a, this.g = i, this.b = l, this.a = c;
      }return r(A, [{ key: "isTransparent", value: function value() {
          return 0 === this.a;
        } }, { key: "toString", value: function value() {
          return null !== this.a && 1 !== this.a ? "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")" : "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        } }]), A;
    }();e.default = h;var g = { transparent: [0, 0, 0, 0], aliceblue: [240, 248, 255, null], antiquewhite: [250, 235, 215, null], aqua: [0, 255, 255, null], aquamarine: [127, 255, 212, null], azure: [240, 255, 255, null], beige: [245, 245, 220, null], bisque: [255, 228, 196, null], black: [0, 0, 0, null], blanchedalmond: [255, 235, 205, null], blue: [0, 0, 255, null], blueviolet: [138, 43, 226, null], brown: [165, 42, 42, null], burlywood: [222, 184, 135, null], cadetblue: [95, 158, 160, null], chartreuse: [127, 255, 0, null], chocolate: [210, 105, 30, null], coral: [255, 127, 80, null], cornflowerblue: [100, 149, 237, null], cornsilk: [255, 248, 220, null], crimson: [220, 20, 60, null], cyan: [0, 255, 255, null], darkblue: [0, 0, 139, null], darkcyan: [0, 139, 139, null], darkgoldenrod: [184, 134, 11, null], darkgray: [169, 169, 169, null], darkgreen: [0, 100, 0, null], darkgrey: [169, 169, 169, null], darkkhaki: [189, 183, 107, null], darkmagenta: [139, 0, 139, null], darkolivegreen: [85, 107, 47, null], darkorange: [255, 140, 0, null], darkorchid: [153, 50, 204, null], darkred: [139, 0, 0, null], darksalmon: [233, 150, 122, null], darkseagreen: [143, 188, 143, null], darkslateblue: [72, 61, 139, null], darkslategray: [47, 79, 79, null], darkslategrey: [47, 79, 79, null], darkturquoise: [0, 206, 209, null], darkviolet: [148, 0, 211, null], deeppink: [255, 20, 147, null], deepskyblue: [0, 191, 255, null], dimgray: [105, 105, 105, null], dimgrey: [105, 105, 105, null], dodgerblue: [30, 144, 255, null], firebrick: [178, 34, 34, null], floralwhite: [255, 250, 240, null], forestgreen: [34, 139, 34, null], fuchsia: [255, 0, 255, null], gainsboro: [220, 220, 220, null], ghostwhite: [248, 248, 255, null], gold: [255, 215, 0, null], goldenrod: [218, 165, 32, null], gray: [128, 128, 128, null], green: [0, 128, 0, null], greenyellow: [173, 255, 47, null], grey: [128, 128, 128, null], honeydew: [240, 255, 240, null], hotpink: [255, 105, 180, null], indianred: [205, 92, 92, null], indigo: [75, 0, 130, null], ivory: [255, 255, 240, null], khaki: [240, 230, 140, null], lavender: [230, 230, 250, null], lavenderblush: [255, 240, 245, null], lawngreen: [124, 252, 0, null], lemonchiffon: [255, 250, 205, null], lightblue: [173, 216, 230, null], lightcoral: [240, 128, 128, null], lightcyan: [224, 255, 255, null], lightgoldenrodyellow: [250, 250, 210, null], lightgray: [211, 211, 211, null], lightgreen: [144, 238, 144, null], lightgrey: [211, 211, 211, null], lightpink: [255, 182, 193, null], lightsalmon: [255, 160, 122, null], lightseagreen: [32, 178, 170, null], lightskyblue: [135, 206, 250, null], lightslategray: [119, 136, 153, null], lightslategrey: [119, 136, 153, null], lightsteelblue: [176, 196, 222, null], lightyellow: [255, 255, 224, null], lime: [0, 255, 0, null], limegreen: [50, 205, 50, null], linen: [250, 240, 230, null], magenta: [255, 0, 255, null], maroon: [128, 0, 0, null], mediumaquamarine: [102, 205, 170, null], mediumblue: [0, 0, 205, null], mediumorchid: [186, 85, 211, null], mediumpurple: [147, 112, 219, null], mediumseagreen: [60, 179, 113, null], mediumslateblue: [123, 104, 238, null], mediumspringgreen: [0, 250, 154, null], mediumturquoise: [72, 209, 204, null], mediumvioletred: [199, 21, 133, null], midnightblue: [25, 25, 112, null], mintcream: [245, 255, 250, null], mistyrose: [255, 228, 225, null], moccasin: [255, 228, 181, null], navajowhite: [255, 222, 173, null], navy: [0, 0, 128, null], oldlace: [253, 245, 230, null], olive: [128, 128, 0, null], olivedrab: [107, 142, 35, null], orange: [255, 165, 0, null], orangered: [255, 69, 0, null], orchid: [218, 112, 214, null], palegoldenrod: [238, 232, 170, null], palegreen: [152, 251, 152, null], paleturquoise: [175, 238, 238, null], palevioletred: [219, 112, 147, null], papayawhip: [255, 239, 213, null], peachpuff: [255, 218, 185, null], peru: [205, 133, 63, null], pink: [255, 192, 203, null], plum: [221, 160, 221, null], powderblue: [176, 224, 230, null], purple: [128, 0, 128, null], rebeccapurple: [102, 51, 153, null], red: [255, 0, 0, null], rosybrown: [188, 143, 143, null], royalblue: [65, 105, 225, null], saddlebrown: [139, 69, 19, null], salmon: [250, 128, 114, null], sandybrown: [244, 164, 96, null], seagreen: [46, 139, 87, null], seashell: [255, 245, 238, null], sienna: [160, 82, 45, null], silver: [192, 192, 192, null], skyblue: [135, 206, 235, null], slateblue: [106, 90, 205, null], slategray: [112, 128, 144, null], slategrey: [112, 128, 144, null], snow: [255, 250, 250, null], springgreen: [0, 255, 127, null], steelblue: [70, 130, 180, null], tan: [210, 180, 140, null], teal: [0, 128, 128, null], thistle: [216, 191, 216, null], tomato: [255, 99, 71, null], turquoise: [64, 224, 208, null], violet: [238, 130, 238, null], wheat: [245, 222, 179, null], white: [255, 255, 255, null], whitesmoke: [245, 245, 245, null], yellow: [255, 255, 0, null], yellowgreen: [154, 205, 50, null] };e.TRANSPARENT = new h([0, 0, 0, 0]);
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseBoundCurves = e.calculatePaddingBoxPath = e.calculateBorderBoxPath = e.parsePathForBorder = e.parseDocumentSize = e.calculateContentBox = e.calculatePaddingBox = e.parseBounds = e.Bounds = void 0;var n = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        r = o(t(15)),
        a = o(t(195));function o(A) {
      return A && A.__esModule ? A : { default: A };
    }var i = e.Bounds = function () {
      function A(e, t, n, r) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.left = e, this.top = t, this.width = n, this.height = r;
      }return n(A, null, [{ key: "fromClientRect", value: function value(e, t, n) {
          return new A(e.left + t, e.top + n, e.width, e.height);
        } }]), A;
    }(),
        s = (e.parseBounds = function (A, e, t) {
      return i.fromClientRect(A.getBoundingClientRect(), e, t);
    }, e.calculatePaddingBox = function (A, e) {
      return new i(A.left + e[3].borderWidth, A.top + e[0].borderWidth, A.width - (e[1].borderWidth + e[3].borderWidth), A.height - (e[0].borderWidth + e[2].borderWidth));
    }, e.calculateContentBox = function (A, e, t) {
      var n = e[0].value,
          r = e[1].value,
          a = e[2].value,
          o = e[3].value;return new i(A.left + o + t[3].borderWidth, A.top + n + t[0].borderWidth, A.width - (t[1].borderWidth + t[3].borderWidth + o + r), A.height - (t[0].borderWidth + t[2].borderWidth + n + a));
    }, e.parseDocumentSize = function (A) {
      var e = A.body,
          t = A.documentElement;if (!e || !t) throw new Error("");var n = Math.max(Math.max(e.scrollWidth, t.scrollWidth), Math.max(e.offsetWidth, t.offsetWidth), Math.max(e.clientWidth, t.clientWidth)),
          r = Math.max(Math.max(e.scrollHeight, t.scrollHeight), Math.max(e.offsetHeight, t.offsetHeight), Math.max(e.clientHeight, t.clientHeight));return new i(0, 0, n, r);
    }, e.parsePathForBorder = function (A, e) {
      switch (e) {case 0:
          return s(A.topLeftOuter, A.topLeftInner, A.topRightOuter, A.topRightInner);case 1:
          return s(A.topRightOuter, A.topRightInner, A.bottomRightOuter, A.bottomRightInner);case 2:
          return s(A.bottomRightOuter, A.bottomRightInner, A.bottomLeftOuter, A.bottomLeftInner);case 3:default:
          return s(A.bottomLeftOuter, A.bottomLeftInner, A.topLeftOuter, A.topLeftInner);}
    }, function (A, e, t, n) {
      var r = [];return A instanceof a.default ? r.push(A.subdivide(.5, !1)) : r.push(A), t instanceof a.default ? r.push(t.subdivide(.5, !0)) : r.push(t), n instanceof a.default ? r.push(n.subdivide(.5, !0).reverse()) : r.push(n), e instanceof a.default ? r.push(e.subdivide(.5, !1).reverse()) : r.push(e), r;
    }),
        l = (e.calculateBorderBoxPath = function (A) {
      return [A.topLeftOuter, A.topRightOuter, A.bottomRightOuter, A.bottomLeftOuter];
    }, e.calculatePaddingBoxPath = function (A) {
      return [A.topLeftInner, A.topRightInner, A.bottomRightInner, A.bottomLeftInner];
    }, e.parseBoundCurves = function (A, e, t) {
      var n = t[l.TOP_LEFT][0].getAbsoluteValue(A.width),
          a = t[l.TOP_LEFT][1].getAbsoluteValue(A.height),
          o = t[l.TOP_RIGHT][0].getAbsoluteValue(A.width),
          i = t[l.TOP_RIGHT][1].getAbsoluteValue(A.height),
          s = t[l.BOTTOM_RIGHT][0].getAbsoluteValue(A.width),
          c = t[l.BOTTOM_RIGHT][1].getAbsoluteValue(A.height),
          B = t[l.BOTTOM_LEFT][0].getAbsoluteValue(A.width),
          d = t[l.BOTTOM_LEFT][1].getAbsoluteValue(A.height),
          f = [];f.push((n + o) / A.width), f.push((B + s) / A.width), f.push((a + d) / A.height), f.push((i + c) / A.height);var h = Math.max.apply(Math, f);h > 1 && (n /= h, a /= h, o /= h, i /= h, s /= h, c /= h, B /= h, d /= h);var g = A.width - o,
          w = A.height - c,
          Q = A.width - s,
          p = A.height - d;return { topLeftOuter: n > 0 || a > 0 ? u(A.left, A.top, n, a, l.TOP_LEFT) : new r.default(A.left, A.top), topLeftInner: n > 0 || a > 0 ? u(A.left + e[3].borderWidth, A.top + e[0].borderWidth, Math.max(0, n - e[3].borderWidth), Math.max(0, a - e[0].borderWidth), l.TOP_LEFT) : new r.default(A.left + e[3].borderWidth, A.top + e[0].borderWidth), topRightOuter: o > 0 || i > 0 ? u(A.left + g, A.top, o, i, l.TOP_RIGHT) : new r.default(A.left + A.width, A.top), topRightInner: o > 0 || i > 0 ? u(A.left + Math.min(g, A.width + e[3].borderWidth), A.top + e[0].borderWidth, g > A.width + e[3].borderWidth ? 0 : o - e[3].borderWidth, i - e[0].borderWidth, l.TOP_RIGHT) : new r.default(A.left + A.width - e[1].borderWidth, A.top + e[0].borderWidth), bottomRightOuter: s > 0 || c > 0 ? u(A.left + Q, A.top + w, s, c, l.BOTTOM_RIGHT) : new r.default(A.left + A.width, A.top + A.height), bottomRightInner: s > 0 || c > 0 ? u(A.left + Math.min(Q, A.width - e[3].borderWidth), A.top + Math.min(w, A.height + e[0].borderWidth), Math.max(0, s - e[1].borderWidth), c - e[2].borderWidth, l.BOTTOM_RIGHT) : new r.default(A.left + A.width - e[1].borderWidth, A.top + A.height - e[2].borderWidth), bottomLeftOuter: B > 0 || d > 0 ? u(A.left, A.top + p, B, d, l.BOTTOM_LEFT) : new r.default(A.left, A.top + A.height), bottomLeftInner: B > 0 || d > 0 ? u(A.left + e[3].borderWidth, A.top + p, Math.max(0, B - e[3].borderWidth), d - e[2].borderWidth, l.BOTTOM_LEFT) : new r.default(A.left + e[3].borderWidth, A.top + A.height - e[2].borderWidth) };
    }, { TOP_LEFT: 0, TOP_RIGHT: 1, BOTTOM_RIGHT: 2, BOTTOM_LEFT: 3 }),
        u = function u(A, e, t, n, o) {
      var i = (Math.sqrt(2) - 1) / 3 * 4,
          s = t * i,
          u = n * i,
          c = A + t,
          B = e + n;switch (o) {case l.TOP_LEFT:
          return new a.default(new r.default(A, B), new r.default(A, B - u), new r.default(c - s, e), new r.default(c, e));case l.TOP_RIGHT:
          return new a.default(new r.default(A, e), new r.default(A + s, e), new r.default(c, B - u), new r.default(c, B));case l.BOTTOM_RIGHT:
          return new a.default(new r.default(c, e), new r.default(c, e + u), new r.default(A + s, B), new r.default(A, B));case l.BOTTOM_LEFT:default:
          return new a.default(new r.default(c, B), new r.default(c - s, B), new r.default(A, e + u), new r.default(A, e));}
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.calculateLengthFromValueWithUnit = e.LENGTH_TYPE = void 0;var n,
        r = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        a = t(7);(n = a) && n.__esModule;var o = e.LENGTH_TYPE = { PX: 0, PERCENTAGE: 1 },
        i = function () {
      function A(e) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.type = "%" === e.substr(e.length - 1) ? o.PERCENTAGE : o.PX;var t = parseFloat(e);this.value = isNaN(t) ? 0 : t;
      }return r(A, [{ key: "isPercentage", value: function value() {
          return this.type === o.PERCENTAGE;
        } }, { key: "getAbsoluteValue", value: function value(A) {
          return this.isPercentage() ? A * (this.value / 100) : this.value;
        } }], [{ key: "create", value: function value(e) {
          return new A(e);
        } }]), A;
    }();e.default = i;e.calculateLengthFromValueWithUnit = function (A, e, t) {
      switch (t) {case "px":case "%":
          return new i(e + t);case "em":case "rem":
          var n = new i(e);return n.value *= "em" === t ? parseFloat(A.style.font.fontSize) : function A(e) {
            var t = e.parent;return t ? A(t) : parseFloat(e.style.font.fontSize);
          }(A), n;default:
          return new i("0");}
    };
  }, function (A, e) {
    A.exports = function (A) {
      var e = [];return e.toString = function () {
        return this.map(function (e) {
          var t = function (A, e) {
            var t = A[1] || "",
                n = A[3];if (!n) return t;if (e && "function" == typeof btoa) {
              var r = (o = n, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */"),
                  a = n.sources.map(function (A) {
                return "/*# sourceURL=" + n.sourceRoot + A + " */";
              });return [t].concat(a).concat([r]).join("\n");
            }var o;return [t].join("\n");
          }(e, A);return e[2] ? "@media " + e[2] + "{" + t + "}" : t;
        }).join("");
      }, e.i = function (A, t) {
        "string" == typeof A && (A = [[null, A, ""]]);for (var n = {}, r = 0; r < this.length; r++) {
          var a = this[r][0];"number" == typeof a && (n[a] = !0);
        }for (r = 0; r < A.length; r++) {
          var o = A[r];"number" == typeof o[0] && n[o[0]] || (t && !o[2] ? o[2] = t : t && (o[2] = "(" + o[2] + ") and (" + t + ")"), e.push(o));
        }
      }, e;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });e.contains = function (A, e) {
      return 0 != (A & e);
    }, e.distance = function (A, e) {
      return Math.sqrt(A * A + e * e);
    }, e.copyCSSStyles = function (A, e) {
      for (var t = A.length - 1; t >= 0; t--) {
        var n = A.item(t);"content" !== n && e.style.setProperty(n, A.getPropertyValue(n));
      }return e;
    }, e.SMALL_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        a = t(2),
        o = (n = a) && n.__esModule ? n : { default: n },
        i = t(6),
        s = t(9),
        l = t(37),
        u = t(194),
        c = t(193),
        B = t(192),
        d = t(191),
        f = t(190),
        h = t(189),
        g = t(14),
        w = t(188),
        Q = t(187),
        p = t(68),
        U = t(69),
        C = t(67),
        F = t(38),
        v = t(186),
        E = t(66),
        m = t(185),
        y = t(184),
        H = t(183),
        _ = t(182),
        b = t(3),
        N = t(65),
        T = t(35);var I = ["INPUT", "TEXTAREA", "SELECT"],
        S = function () {
      function A(e, t, n, r) {
        var a = this;!function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.parent = t, this.tagName = e.tagName, this.index = r, this.childNodes = [], this.listItems = [], "number" == typeof e.start && (this.listStart = e.start);var i = e.ownerDocument.defaultView,
            S = i.pageXOffset,
            M = i.pageYOffset,
            D = i.getComputedStyle(e, null),
            L = (0, c.parseDisplay)(D.display),
            O = "radio" === e.type || "checkbox" === e.type,
            x = (0, C.parsePosition)(D.position);if (this.style = { background: O ? N.INPUT_BACKGROUND : (0, s.parseBackground)(D, n), border: O ? N.INPUT_BORDERS : (0, l.parseBorder)(D), borderRadius: (e instanceof i.HTMLInputElement || e instanceof HTMLInputElement) && O ? (0, N.getInputBorderRadius)(e) : (0, u.parseBorderRadius)(D), color: O ? N.INPUT_COLOR : new o.default(D.color), display: L, float: (0, B.parseCSSFloat)(D.float), font: (0, d.parseFont)(D), letterSpacing: (0, f.parseLetterSpacing)(D.letterSpacing), listStyle: L === c.DISPLAY.LIST_ITEM ? (0, g.parseListStyle)(D) : null, lineBreak: (0, h.parseLineBreak)(D.lineBreak), margin: (0, w.parseMargin)(D), opacity: parseFloat(D.opacity), overflow: -1 === I.indexOf(e.tagName) ? (0, Q.parseOverflow)(D.overflow) : Q.OVERFLOW.HIDDEN, overflowWrap: (0, p.parseOverflowWrap)(D.overflowWrap ? D.overflowWrap : D.wordWrap), padding: (0, U.parsePadding)(D), position: x, textDecoration: (0, F.parseTextDecoration)(D), textShadow: (0, v.parseTextShadow)(D.textShadow), textTransform: (0, E.parseTextTransform)(D.textTransform), transform: (0, m.parseTransform)(D), visibility: (0, y.parseVisibility)(D.visibility), wordBreak: (0, H.parseWordBreak)(D.wordBreak), zIndex: (0, _.parseZIndex)(x !== C.POSITION.STATIC ? D.zIndex : "auto") }, this.isTransformed() && (e.style.transform = "matrix(1,0,0,1,0,0)"), L === c.DISPLAY.LIST_ITEM) {
          var P = (0, T.getListOwner)(this);if (P) {
            var R = P.listItems.length;P.listItems.push(this), this.listIndex = e.hasAttribute("value") && "number" == typeof e.value ? e.value : 0 === R ? "number" == typeof P.listStart ? P.listStart : 1 : P.listItems[R - 1].listIndex + 1;
          }
        }"IMG" === e.tagName && e.addEventListener("load", function () {
          a.bounds = (0, b.parseBounds)(e, S, M), a.curvedBounds = (0, b.parseBoundCurves)(a.bounds, a.style.border, a.style.borderRadius);
        }), this.image = K(e, n), this.bounds = O ? (0, N.reformatInputBounds)((0, b.parseBounds)(e, S, M)) : (0, b.parseBounds)(e, S, M), this.curvedBounds = (0, b.parseBoundCurves)(this.bounds, this.style.border, this.style.borderRadius);
      }return r(A, [{ key: "getClipPaths", value: function value() {
          var A = this.parent ? this.parent.getClipPaths() : [];return this.style.overflow !== Q.OVERFLOW.VISIBLE ? A.concat([(0, b.calculatePaddingBoxPath)(this.curvedBounds)]) : A;
        } }, { key: "isInFlow", value: function value() {
          return this.isRootElement() && !this.isFloating() && !this.isAbsolutelyPositioned();
        } }, { key: "isVisible", value: function value() {
          return !(0, i.contains)(this.style.display, c.DISPLAY.NONE) && this.style.opacity > 0 && this.style.visibility === y.VISIBILITY.VISIBLE;
        } }, { key: "isAbsolutelyPositioned", value: function value() {
          return this.style.position !== C.POSITION.STATIC && this.style.position !== C.POSITION.RELATIVE;
        } }, { key: "isPositioned", value: function value() {
          return this.style.position !== C.POSITION.STATIC;
        } }, { key: "isFloating", value: function value() {
          return this.style.float !== B.FLOAT.NONE;
        } }, { key: "isRootElement", value: function value() {
          return null === this.parent;
        } }, { key: "isTransformed", value: function value() {
          return null !== this.style.transform;
        } }, { key: "isPositionedWithZIndex", value: function value() {
          return this.isPositioned() && !this.style.zIndex.auto;
        } }, { key: "isInlineLevel", value: function value() {
          return (0, i.contains)(this.style.display, c.DISPLAY.INLINE) || (0, i.contains)(this.style.display, c.DISPLAY.INLINE_BLOCK) || (0, i.contains)(this.style.display, c.DISPLAY.INLINE_FLEX) || (0, i.contains)(this.style.display, c.DISPLAY.INLINE_GRID) || (0, i.contains)(this.style.display, c.DISPLAY.INLINE_LIST_ITEM) || (0, i.contains)(this.style.display, c.DISPLAY.INLINE_TABLE);
        } }, { key: "isInlineBlockOrInlineTable", value: function value() {
          return (0, i.contains)(this.style.display, c.DISPLAY.INLINE_BLOCK) || (0, i.contains)(this.style.display, c.DISPLAY.INLINE_TABLE);
        } }]), A;
    }();e.default = S;var K = function K(A, e) {
      if (A instanceof A.ownerDocument.defaultView.SVGSVGElement || A instanceof SVGSVGElement) {
        var t = new XMLSerializer();return e.loadImage("data:image/svg+xml," + encodeURIComponent(t.serializeToString(A)));
      }switch (A.tagName) {case "IMG":
          var n = A;return e.loadImage(n.currentSrc || n.src);case "CANVAS":
          var r = A;return e.loadCanvas(r);case "IFRAME":
          var a = A.getAttribute("data-html2canvas-internal-iframe-key");if (a) return a;}return null;
    };
  }, function (A, e, t) {
    var n,
        r,
        a = {},
        o = (n = function n() {
      return window && document && document.all && !window.atob;
    }, function () {
      return void 0 === r && (r = n.apply(this, arguments)), r;
    }),
        i = function (A) {
      var e = {};return function (A) {
        if ("function" == typeof A) return A();if (void 0 === e[A]) {
          var t = function (A) {
            return document.querySelector(A);
          }.call(this, A);if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
            t = t.contentDocument.head;
          } catch (A) {
            t = null;
          }e[A] = t;
        }return e[A];
      };
    }(),
        s = null,
        l = 0,
        u = [],
        c = t(130);function B(A, e) {
      for (var t = 0; t < A.length; t++) {
        var n = A[t],
            r = a[n.id];if (r) {
          r.refs++;for (var o = 0; o < r.parts.length; o++) {
            r.parts[o](n.parts[o]);
          }for (; o < n.parts.length; o++) {
            r.parts.push(Q(n.parts[o], e));
          }
        } else {
          var i = [];for (o = 0; o < n.parts.length; o++) {
            i.push(Q(n.parts[o], e));
          }a[n.id] = { id: n.id, refs: 1, parts: i };
        }
      }
    }function d(A, e) {
      for (var t = [], n = {}, r = 0; r < A.length; r++) {
        var a = A[r],
            o = e.base ? a[0] + e.base : a[0],
            i = { css: a[1], media: a[2], sourceMap: a[3] };n[o] ? n[o].parts.push(i) : t.push(n[o] = { id: o, parts: [i] });
      }return t;
    }function f(A, e) {
      var t = i(A.insertInto);if (!t) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n = u[u.length - 1];if ("top" === A.insertAt) n ? n.nextSibling ? t.insertBefore(e, n.nextSibling) : t.appendChild(e) : t.insertBefore(e, t.firstChild), u.push(e);else if ("bottom" === A.insertAt) t.appendChild(e);else {
        if ("object" != _typeof(A.insertAt) || !A.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r = i(A.insertInto + " " + A.insertAt.before);t.insertBefore(e, r);
      }
    }function h(A) {
      if (null === A.parentNode) return !1;A.parentNode.removeChild(A);var e = u.indexOf(A);e >= 0 && u.splice(e, 1);
    }function g(A) {
      var e = document.createElement("style");return A.attrs.type = "text/css", w(e, A.attrs), f(A, e), e;
    }function w(A, e) {
      Object.keys(e).forEach(function (t) {
        A.setAttribute(t, e[t]);
      });
    }function Q(A, e) {
      var t, n, r, a;if (e.transform && A.css) {
        if (!(a = e.transform(A.css))) return function () {};A.css = a;
      }if (e.singleton) {
        var o = l++;t = s || (s = g(e)), n = C.bind(null, t, o, !1), r = C.bind(null, t, o, !0);
      } else A.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (t = function (A) {
        var e = document.createElement("link");return A.attrs.type = "text/css", A.attrs.rel = "stylesheet", w(e, A.attrs), f(A, e), e;
      }(e), n = function (A, e, t) {
        var n = t.css,
            r = t.sourceMap,
            a = void 0 === e.convertToAbsoluteUrls && r;(e.convertToAbsoluteUrls || a) && (n = c(n));r && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");var o = new Blob([n], { type: "text/css" }),
            i = A.href;A.href = URL.createObjectURL(o), i && URL.revokeObjectURL(i);
      }.bind(null, t, e), r = function r() {
        h(t), t.href && URL.revokeObjectURL(t.href);
      }) : (t = g(e), n = function (A, e) {
        var t = e.css,
            n = e.media;n && A.setAttribute("media", n);if (A.styleSheet) A.styleSheet.cssText = t;else {
          for (; A.firstChild;) {
            A.removeChild(A.firstChild);
          }A.appendChild(document.createTextNode(t));
        }
      }.bind(null, t), r = function r() {
        h(t);
      });return n(A), function (e) {
        if (e) {
          if (e.css === A.css && e.media === A.media && e.sourceMap === A.sourceMap) return;n(A = e);
        } else r();
      };
    }A.exports = function (A, e) {
      if ("undefined" != typeof DEBUG && DEBUG && "object" != (typeof document === "undefined" ? "undefined" : _typeof(document))) throw new Error("The style-loader cannot be used in a non-browser environment");(e = e || {}).attrs = "object" == _typeof(e.attrs) ? e.attrs : {}, e.singleton || "boolean" == typeof e.singleton || (e.singleton = o()), e.insertInto || (e.insertInto = "head"), e.insertAt || (e.insertAt = "bottom");var t = d(A, e);return B(t, e), function (A) {
        for (var n = [], r = 0; r < t.length; r++) {
          var o = t[r];(i = a[o.id]).refs--, n.push(i);
        }A && B(d(A, e), e);for (r = 0; r < n.length; r++) {
          var i;if (0 === (i = n[r]).refs) {
            for (var s = 0; s < i.parts.length; s++) {
              i.parts[s]();
            }delete a[i.id];
          }
        }
      };
    };var p,
        U = (p = [], function (A, e) {
      return p[A] = e, p.filter(Boolean).join("\n");
    });function C(A, e, t, n) {
      var r = t ? "" : n.css;if (A.styleSheet) A.styleSheet.cssText = U(e, r);else {
        var a = document.createTextNode(r),
            o = A.childNodes;o[e] && A.removeChild(o[e]), o.length ? A.insertBefore(a, o[e]) : A.appendChild(a);
      }
    }
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseBackgroundImage = e.parseBackground = e.calculateBackgroundRepeatPath = e.calculateBackgroundPosition = e.calculateBackgroungPositioningArea = e.calculateBackgroungPaintingArea = e.calculateGradientBackgroundSize = e.calculateBackgroundSize = e.BACKGROUND_ORIGIN = e.BACKGROUND_CLIP = e.BACKGROUND_SIZE = e.BACKGROUND_REPEAT = void 0;var n = l(t(2)),
        r = l(t(4)),
        a = l(t(196)),
        o = l(t(15)),
        i = t(3),
        s = t(69);function l(A) {
      return A && A.__esModule ? A : { default: A };
    }var u = e.BACKGROUND_REPEAT = { REPEAT: 0, NO_REPEAT: 1, REPEAT_X: 2, REPEAT_Y: 3 },
        c = e.BACKGROUND_SIZE = { AUTO: 0, CONTAIN: 1, COVER: 2, LENGTH: 3 },
        B = e.BACKGROUND_CLIP = { BORDER_BOX: 0, PADDING_BOX: 1, CONTENT_BOX: 2 },
        d = e.BACKGROUND_ORIGIN = B,
        f = function A(e) {
      switch (function (A, e) {
        if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, A), e) {case "contain":
          this.size = c.CONTAIN;break;case "cover":
          this.size = c.COVER;break;case "auto":
          this.size = c.AUTO;break;default:
          this.value = new r.default(e);}
    },
        h = (e.calculateBackgroundSize = function (A, e, t) {
      var n = 0,
          r = 0,
          o = A.size;if (o[0].size === c.CONTAIN || o[0].size === c.COVER) {
        var i = t.width / t.height,
            s = e.width / e.height;return i < s != (o[0].size === c.COVER) ? new a.default(t.width, t.width / s) : new a.default(t.height * s, t.height);
      }return o[0].value && (n = o[0].value.getAbsoluteValue(t.width)), o[0].size === c.AUTO && o[1].size === c.AUTO ? r = e.height : o[1].size === c.AUTO ? r = n / e.width * e.height : o[1].value && (r = o[1].value.getAbsoluteValue(t.height)), o[0].size === c.AUTO && (n = r / e.height * e.width), new a.default(n, r);
    }, e.calculateGradientBackgroundSize = function (A, e) {
      var t = A.size,
          n = t[0].value ? t[0].value.getAbsoluteValue(e.width) : e.width,
          r = t[1].value ? t[1].value.getAbsoluteValue(e.height) : t[0].value ? n : e.height;return new a.default(n, r);
    }, new f("auto")),
        g = (e.calculateBackgroungPaintingArea = function (A, e) {
      switch (e) {case B.BORDER_BOX:
          return (0, i.calculateBorderBoxPath)(A);case B.PADDING_BOX:default:
          return (0, i.calculatePaddingBoxPath)(A);}
    }, e.calculateBackgroungPositioningArea = function (A, e, t, n) {
      var r = (0, i.calculatePaddingBox)(e, n);switch (A) {case d.BORDER_BOX:
          return e;case d.CONTENT_BOX:
          var a = t[s.PADDING_SIDES.LEFT].getAbsoluteValue(e.width),
              o = t[s.PADDING_SIDES.RIGHT].getAbsoluteValue(e.width),
              l = t[s.PADDING_SIDES.TOP].getAbsoluteValue(e.width),
              u = t[s.PADDING_SIDES.BOTTOM].getAbsoluteValue(e.width);return new i.Bounds(r.left + a, r.top + l, r.width - a - o, r.height - l - u);case d.PADDING_BOX:default:
          return r;}
    }, e.calculateBackgroundPosition = function (A, e, t) {
      return new o.default(A[0].getAbsoluteValue(t.width - e.width), A[1].getAbsoluteValue(t.height - e.height));
    }, e.calculateBackgroundRepeatPath = function (A, e, t, n, r) {
      switch (A.repeat) {case u.REPEAT_X:
          return [new o.default(Math.round(r.left), Math.round(n.top + e.y)), new o.default(Math.round(r.left + r.width), Math.round(n.top + e.y)), new o.default(Math.round(r.left + r.width), Math.round(t.height + n.top + e.y)), new o.default(Math.round(r.left), Math.round(t.height + n.top + e.y))];case u.REPEAT_Y:
          return [new o.default(Math.round(n.left + e.x), Math.round(r.top)), new o.default(Math.round(n.left + e.x + t.width), Math.round(r.top)), new o.default(Math.round(n.left + e.x + t.width), Math.round(r.height + r.top)), new o.default(Math.round(n.left + e.x), Math.round(r.height + r.top))];case u.NO_REPEAT:
          return [new o.default(Math.round(n.left + e.x), Math.round(n.top + e.y)), new o.default(Math.round(n.left + e.x + t.width), Math.round(n.top + e.y)), new o.default(Math.round(n.left + e.x + t.width), Math.round(n.top + e.y + t.height)), new o.default(Math.round(n.left + e.x), Math.round(n.top + e.y + t.height))];default:
          return [new o.default(Math.round(r.left), Math.round(r.top)), new o.default(Math.round(r.left + r.width), Math.round(r.top)), new o.default(Math.round(r.left + r.width), Math.round(r.height + r.top)), new o.default(Math.round(r.left), Math.round(r.height + r.top))];}
    }, e.parseBackground = function (A, e) {
      return { backgroundColor: new n.default(A.backgroundColor), backgroundImage: Q(A, e), backgroundClip: g(A.backgroundClip), backgroundOrigin: w(A.backgroundOrigin) };
    }, function (A) {
      switch (A) {case "padding-box":
          return B.PADDING_BOX;case "content-box":
          return B.CONTENT_BOX;}return B.BORDER_BOX;
    }),
        w = function w(A) {
      switch (A) {case "padding-box":
          return d.PADDING_BOX;case "content-box":
          return d.CONTENT_BOX;}return d.BORDER_BOX;
    },
        Q = function Q(A, e) {
      var t = C(A.backgroundImage).map(function (A) {
        if ("url" === A.method) {
          var t = e.loadImage(A.args[0]);A.args = t ? [t] : [];
        }return A;
      }),
          n = A.backgroundPosition.split(","),
          r = A.backgroundRepeat.split(","),
          a = A.backgroundSize.split(",");return t.map(function (A, e) {
        var t = (a[e] || "auto").trim().split(" ").map(p),
            o = (n[e] || "auto").trim().split(" ").map(U);return { source: A, repeat: function (A) {
            switch (A.trim()) {case "no-repeat":
                return u.NO_REPEAT;case "repeat-x":case "repeat no-repeat":
                return u.REPEAT_X;case "repeat-y":case "no-repeat repeat":
                return u.REPEAT_Y;case "repeat":
                return u.REPEAT;}return u.REPEAT;
          }("string" == typeof r[e] ? r[e] : r[0]), size: t.length < 2 ? [t[0], h] : [t[0], t[1]], position: o.length < 2 ? [o[0], o[0]] : [o[0], o[1]] };
      });
    },
        p = function p(A) {
      return "auto" === A ? h : new f(A);
    },
        U = function U(A) {
      switch (A) {case "bottom":case "right":
          return new r.default("100%");case "left":case "top":
          return new r.default("0%");case "auto":
          return new r.default("0");}return new r.default(A);
    },
        C = e.parseBackgroundImage = function (A) {
      var e = /^\s$/,
          t = [],
          n = [],
          r = "",
          a = null,
          o = "",
          i = 0,
          s = 0,
          l = function l() {
        var A = "";if (r) {
          '"' === o.substr(0, 1) && (o = o.substr(1, o.length - 2)), o && n.push(o.trim());var e = r.indexOf("-", 1) + 1;"-" === r.substr(0, 1) && e > 0 && (A = r.substr(0, e).toLowerCase(), r = r.substr(e)), "none" !== (r = r.toLowerCase()) && t.push({ prefix: A, method: r, args: n });
        }n = [], r = o = "";
      };return A.split("").forEach(function (A) {
        if (0 !== i || !e.test(A)) {
          switch (A) {case '"':
              a ? a === A && (a = null) : a = A;break;case "(":
              if (a) break;if (0 === i) return void (i = 1);s++;break;case ")":
              if (a) break;if (1 === i) {
                if (0 === s) return i = 0, void l();s--;
              }break;case ",":
              if (a) break;if (0 === i) return void l();if (1 === i && 0 === s && !r.match(/^url$/i)) return n.push(o.trim()), void (o = "");}0 === i ? r += A : o += A;
        }
      }), l(), t;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(126), e.default = { name: "y-col", data: function data() {
        return {};
      }, props: { tag: { type: String, default: "div" }, span: { type: Number, default: 24 }, offset: Number, right: Number, left: Number }, computed: {}, render: function render(A) {
        var e = this,
            t = [],
            n = {};return this.$parent.gutter && (n.paddingLeft = this.$parent.gutter / 2 + "px", n.paddingRight = n.paddingLeft), ["span", "offset", "left", "right"].forEach(function (A) {
          (e[A] || 0 === e[A]) && t.push("span" !== A ? "y-col-" + A + "--" + e[A] : "y-col--" + e[A]);
        }), A(this.tag, { class: ["y-col", t], style: n }, this.$slots.default);
      } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(144), e.default = { name: "y-row", data: function data() {
        return {};
      }, props: { tag: { type: String, default: "div" }, type: String, gutter: Number, justify: { type: String, default: "start" }, align: { type: String, default: "start" } }, computed: { style: function style() {
          var A = {};return this.gutter && (A.marginLeft = "-" + this.gutter / 2 + "px", A.marginRight = A.marginLeft), A;
        } }, render: function render(A) {
        return A(this.tag, { class: ["y-row", "start" !== this.justify ? "is-justify-" + this.justify : "", "start" !== this.align ? "is-align-" + this.align : ""], style: this.style }, this.$slots.default);
      } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = t(63),
        r = function r(A) {
      return 0 === A[0] && 255 === A[1] && 0 === A[2] && 255 === A[3];
    },
        a = { get SUPPORT_RANGE_BOUNDS() {
        var A = function (A) {
          if (A.createRange) {
            var e = A.createRange();if (e.getBoundingClientRect) {
              var t = A.createElement("boundtest");t.style.height = "123px", t.style.display = "block", A.body.appendChild(t), e.selectNode(t);var n = e.getBoundingClientRect(),
                  r = Math.round(n.height);if (A.body.removeChild(t), 123 === r) return !0;
            }
          }return !1;
        }(document);return Object.defineProperty(a, "SUPPORT_RANGE_BOUNDS", { value: A }), A;
      }, get SUPPORT_SVG_DRAWING() {
        var A = function (A) {
          var e = new Image(),
              t = A.createElement("canvas"),
              n = t.getContext("2d");e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try {
            n.drawImage(e, 0, 0), t.toDataURL();
          } catch (A) {
            return !1;
          }return !0;
        }(document);return Object.defineProperty(a, "SUPPORT_SVG_DRAWING", { value: A }), A;
      }, get SUPPORT_BASE64_DRAWING() {
        return function (A) {
          var e = function (A, e) {
            var t = new Image(),
                n = A.createElement("canvas"),
                r = n.getContext("2d");return new Promise(function (A) {
              t.src = e;var a = function a() {
                try {
                  r.drawImage(t, 0, 0), n.toDataURL();
                } catch (e) {
                  return A(!1);
                }return A(!0);
              };t.onload = a, t.onerror = function () {
                return A(!1);
              }, !0 === t.complete && setTimeout(function () {
                a();
              }, 500);
            });
          }(document, A);return Object.defineProperty(a, "SUPPORT_BASE64_DRAWING", { value: function value() {
              return e;
            } }), e;
        };
      }, get SUPPORT_FOREIGNOBJECT_DRAWING() {
        var A = "function" == typeof Array.from && "function" == typeof window.fetch ? function (A) {
          var e = A.createElement("canvas");e.width = 100, e.height = 100;var t = e.getContext("2d");t.fillStyle = "rgb(0, 255, 0)", t.fillRect(0, 0, 100, 100);var a = new Image(),
              o = e.toDataURL();a.src = o;var i = (0, n.createForeignObjectSVG)(100, 100, 0, 0, a);return t.fillStyle = "red", t.fillRect(0, 0, 100, 100), (0, n.loadSerializedSVG)(i).then(function (e) {
            t.drawImage(e, 0, 0);var a = t.getImageData(0, 0, 100, 100).data;t.fillStyle = "red", t.fillRect(0, 0, 100, 100);var i = A.createElement("div");return i.style.backgroundImage = "url(" + o + ")", i.style.height = "100px", r(a) ? (0, n.loadSerializedSVG)((0, n.createForeignObjectSVG)(100, 100, 0, 0, i)) : Promise.reject(!1);
          }).then(function (A) {
            return t.drawImage(A, 0, 0), r(t.getImageData(0, 0, 100, 100).data);
          }).catch(function (A) {
            return !1;
          });
        }(document) : Promise.resolve(!1);return Object.defineProperty(a, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: A }), A;
      }, get SUPPORT_CORS_IMAGES() {
        var A = void 0 !== new Image().crossOrigin;return Object.defineProperty(a, "SUPPORT_CORS_IMAGES", { value: A }), A;
      }, get SUPPORT_RESPONSE_TYPE() {
        var A = "string" == typeof new XMLHttpRequest().responseType;return Object.defineProperty(a, "SUPPORT_RESPONSE_TYPE", { value: A }), A;
      }, get SUPPORT_CORS_XHR() {
        var A = "withCredentials" in new XMLHttpRequest();return Object.defineProperty(a, "SUPPORT_CORS_XHR", { value: A }), A;
      } };e.default = a;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        r = t(66),
        a = t(64);var o = function () {
      function A(e, t, n) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.text = e, this.parent = t, this.bounds = n;
      }return n(A, null, [{ key: "fromTextNode", value: function value(e, t) {
          var n = s(e.data, t.style.textTransform);return new A(n, t, (0, a.parseTextBounds)(n, t, e));
        } }]), A;
    }();e.default = o;var i = /(^|\s|:|-|\(|\))([a-z])/g,
        s = function s(A, e) {
      switch (e) {case r.TEXT_TRANSFORM.LOWERCASE:
          return A.toLowerCase();case r.TEXT_TRANSFORM.CAPITALIZE:
          return A.replace(i, l);case r.TEXT_TRANSFORM.UPPERCASE:
          return A.toUpperCase();default:
          return A;}
    };function l(A, e, t) {
      return A.length > 0 ? e + t.toUpperCase() : A;
    }
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseListStyle = e.parseListStyleType = e.LIST_STYLE_TYPE = e.LIST_STYLE_POSITION = void 0;var n = t(9),
        r = e.LIST_STYLE_POSITION = { INSIDE: 0, OUTSIDE: 1 },
        a = e.LIST_STYLE_TYPE = { NONE: -1, DISC: 0, CIRCLE: 1, SQUARE: 2, DECIMAL: 3, CJK_DECIMAL: 4, DECIMAL_LEADING_ZERO: 5, LOWER_ROMAN: 6, UPPER_ROMAN: 7, LOWER_GREEK: 8, LOWER_ALPHA: 9, UPPER_ALPHA: 10, ARABIC_INDIC: 11, ARMENIAN: 12, BENGALI: 13, CAMBODIAN: 14, CJK_EARTHLY_BRANCH: 15, CJK_HEAVENLY_STEM: 16, CJK_IDEOGRAPHIC: 17, DEVANAGARI: 18, ETHIOPIC_NUMERIC: 19, GEORGIAN: 20, GUJARATI: 21, GURMUKHI: 22, HEBREW: 22, HIRAGANA: 23, HIRAGANA_IROHA: 24, JAPANESE_FORMAL: 25, JAPANESE_INFORMAL: 26, KANNADA: 27, KATAKANA: 28, KATAKANA_IROHA: 29, KHMER: 30, KOREAN_HANGUL_FORMAL: 31, KOREAN_HANJA_FORMAL: 32, KOREAN_HANJA_INFORMAL: 33, LAO: 34, LOWER_ARMENIAN: 35, MALAYALAM: 36, MONGOLIAN: 37, MYANMAR: 38, ORIYA: 39, PERSIAN: 40, SIMP_CHINESE_FORMAL: 41, SIMP_CHINESE_INFORMAL: 42, TAMIL: 43, TELUGU: 44, THAI: 45, TIBETAN: 46, TRAD_CHINESE_FORMAL: 47, TRAD_CHINESE_INFORMAL: 48, UPPER_ARMENIAN: 49, DISCLOSURE_OPEN: 50, DISCLOSURE_CLOSED: 51 },
        o = e.parseListStyleType = function (A) {
      switch (A) {case "disc":
          return a.DISC;case "circle":
          return a.CIRCLE;case "square":
          return a.SQUARE;case "decimal":
          return a.DECIMAL;case "cjk-decimal":
          return a.CJK_DECIMAL;case "decimal-leading-zero":
          return a.DECIMAL_LEADING_ZERO;case "lower-roman":
          return a.LOWER_ROMAN;case "upper-roman":
          return a.UPPER_ROMAN;case "lower-greek":
          return a.LOWER_GREEK;case "lower-alpha":
          return a.LOWER_ALPHA;case "upper-alpha":
          return a.UPPER_ALPHA;case "arabic-indic":
          return a.ARABIC_INDIC;case "armenian":
          return a.ARMENIAN;case "bengali":
          return a.BENGALI;case "cambodian":
          return a.CAMBODIAN;case "cjk-earthly-branch":
          return a.CJK_EARTHLY_BRANCH;case "cjk-heavenly-stem":
          return a.CJK_HEAVENLY_STEM;case "cjk-ideographic":
          return a.CJK_IDEOGRAPHIC;case "devanagari":
          return a.DEVANAGARI;case "ethiopic-numeric":
          return a.ETHIOPIC_NUMERIC;case "georgian":
          return a.GEORGIAN;case "gujarati":
          return a.GUJARATI;case "gurmukhi":
          return a.GURMUKHI;case "hebrew":
          return a.HEBREW;case "hiragana":
          return a.HIRAGANA;case "hiragana-iroha":
          return a.HIRAGANA_IROHA;case "japanese-formal":
          return a.JAPANESE_FORMAL;case "japanese-informal":
          return a.JAPANESE_INFORMAL;case "kannada":
          return a.KANNADA;case "katakana":
          return a.KATAKANA;case "katakana-iroha":
          return a.KATAKANA_IROHA;case "khmer":
          return a.KHMER;case "korean-hangul-formal":
          return a.KOREAN_HANGUL_FORMAL;case "korean-hanja-formal":
          return a.KOREAN_HANJA_FORMAL;case "korean-hanja-informal":
          return a.KOREAN_HANJA_INFORMAL;case "lao":
          return a.LAO;case "lower-armenian":
          return a.LOWER_ARMENIAN;case "malayalam":
          return a.MALAYALAM;case "mongolian":
          return a.MONGOLIAN;case "myanmar":
          return a.MYANMAR;case "oriya":
          return a.ORIYA;case "persian":
          return a.PERSIAN;case "simp-chinese-formal":
          return a.SIMP_CHINESE_FORMAL;case "simp-chinese-informal":
          return a.SIMP_CHINESE_INFORMAL;case "tamil":
          return a.TAMIL;case "telugu":
          return a.TELUGU;case "thai":
          return a.THAI;case "tibetan":
          return a.TIBETAN;case "trad-chinese-formal":
          return a.TRAD_CHINESE_FORMAL;case "trad-chinese-informal":
          return a.TRAD_CHINESE_INFORMAL;case "upper-armenian":
          return a.UPPER_ARMENIAN;case "disclosure-open":
          return a.DISCLOSURE_OPEN;case "disclosure-closed":
          return a.DISCLOSURE_CLOSED;case "none":default:
          return a.NONE;}
    },
        i = (e.parseListStyle = function (A) {
      var e = (0, n.parseBackgroundImage)(A.getPropertyValue("list-style-image"));return { listStyleType: o(A.getPropertyValue("list-style-type")), listStyleImage: e.length ? e[0] : null, listStylePosition: i(A.getPropertyValue("list-style-position")) };
    }, function (A) {
      switch (A) {case "inside":
          return r.INSIDE;case "outside":default:
          return r.OUTSIDE;}
    });
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = t(16);e.default = function A(e, t) {
      !function (A, e) {
        if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, A), this.type = n.PATH.VECTOR, this.x = e, this.y = t;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });e.PATH = { VECTOR: 0, BEZIER_CURVE: 1, CIRCLE: 2 };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(1);(n = r) && n.__esModule;t(77), e.default = { name: "y-payment", data: function data() {
        return {};
      }, props: { data: { type: Array, default: null }, selectedColor: { type: String, default: "#ffd699" }, value: { type: Boolean, default: 0 } }, created: function created() {
        console.log(this.selectedColor);
      }, methods: { handleClick: function handleClick(A) {
          this.$emit("input", A);
        } } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(81), e.default = { name: "y-progress", data: function data() {
        return { animate_percent: 0, animate_text: 0, strokeDasharray: 90 * Math.PI };
      }, props: { color: { type: String, default: "#ffd699" }, type: { type: String, default: "line" }, barWidth: { type: Number, default: 25 }, textInside: { type: Boolean, default: !1 }, percent: { type: Number, default: 0, required: !0 }, showInfo: { type: Boolean, default: !0 }, animate: { type: Boolean, default: !1 }, duration: { type: Number, default: 3e3 }, circleWidth: { type: Number, default: 100 } }, computed: { barStyle: function barStyle() {
          return this.animate ? { background: this.color, width: this.animate_percent + "%" } : { background: this.color, width: this.percent + "%" };
        }, step: function step() {
          return this.duration >= 0 ? this.duration / this.percent : 3e3;
        }, strokeDashoffset: function strokeDashoffset() {
          return this.animate ? (1 - this.animate_percent / 100) * this.strokeDasharray : (1 - this.percent / 100) * this.strokeDasharray;
        } }, watch: { percent: function percent(A, e) {
          console.log(A, e), this.handleAnimation();
        } }, methods: { handleAnimation: function handleAnimation() {
          var A = this,
              e = null;A.animate && A.percent && (e = A.showInfo ? setInterval(function () {
            A.animate_percent++, A.animate_text++, A.animate_percent == A.percent && clearInterval(e);
          }, A.step) : setInterval(function () {
            A.animate_percent++, A.animate_percent == A.percent && clearInterval(e);
          }, A.step));
        } }, mounted: function mounted() {
        this.handleAnimation();
      } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(85);var n = o(t(58)),
        r = o(t(10)),
        a = o(t(11));o(t(1));function o(A) {
      return A && A.__esModule ? A : { default: A };
    }e.default = { name: "y-registerBox", data: function data() {
        return { show_panel: !0 };
      }, components: { "y-col": r.default, "y-row": a.default, "y-message-box": n.default }, methods: { close: function close() {} }, computed: {}, props: { show_tips: { type: Boolean, default: !0 } }, mounted: function mounted() {} };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(89);var n,
        r = t(1);(n = r) && n.__esModule;e.default = { name: "y-search", data: function data() {
        return {};
      }, props: { value: { required: !0 }, btnText: { type: String, default: "搜索" }, placeHolder: { type: String, default: "请输入关键词" }, disable: { type: Boolean, default: !1 }, autoFocus: { default: !1 }, prefixIcon: { type: String, default: "icon-sousuo" } }, mounted: function mounted() {
        !this.disable && this.autoFocus && this.$refs.inputref.focus();
      }, watch: { disable: { handler: function handler(A, e) {
            this.autoFocus && !A && this.$refs.inputref.focus();
          }, deep: !0 } }, methods: { search: function search(A) {
          this.$emit("search");
        }, input: function input(A) {
          this.$emit("input", A);
        } } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(96);var n = o(t(10)),
        r = o(t(11)),
        a = (o(t(1)), o(t(94)));function o(A) {
      return A && A.__esModule ? A : { default: A };
    }e.default = { name: "y-steps", data: function data() {
        return {};
      }, components: { "y-col": n.default, "y-row": r.default }, methods: {}, computed: { currentBg_width: function currentBg_width() {
          var A = 1;return this.steps_current == this.steps_data.length && (A = 0), (2 * this.steps_current - A) / (2 * this.steps_data.length) * 100 + "%";
        }, currentTip_left: function currentTip_left() {
          return (2 * this.steps_current - 1) / (2 * this.steps_data.length) * 100 + "%";
        } }, props: { steps_data: [Array], steps_current: Number, show_tips: { type: Boolean, default: !0 }, color: { type: String, default: "#6DC054" }, image: { default: a.default } }, mounted: function mounted() {} };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(100);var n,
        r = t(1);(n = r) && n.__esModule;e.default = { name: "y-swiperitem", props: { fullScreen: { type: Boolean, default: !1 } }, data: function data() {
        return { overImg: !1 };
      }, mounted: function mounted() {
        var A = this.$slots.default[0].elm.naturalHeight;this.$slots.default[0].elm.naturalWidth, document.documentElement.clientWidth || document.body.clientWidth;A > (document.documentElement.clientHeight || document.body.clientHeight) + 1 && (this.overImg = !0), this.$parent && this.$parent.swipeItemCreated(this);
      }, destroyed: function destroyed() {
        this.$parent && this.$parent.swipeItemDestroyed(this);
      }, updated: function updated() {}, methods: {}, computed: { fullImg: function fullImg() {
          var A = this.$parent.fullScreen;return A && !this.overImg ? "fullItem" : A && this.overImg ? "fullOver" : void 0;
        } } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(106);a(t(1));var n = t(104),
        r = a(t(103));function a(A) {
      return A && A.__esModule ? A : { default: A };
    }Vue.component(r.default.name, r.default), e.default = { name: "y-swiper", created: function created() {
        this.dragState = {};
      }, data: function data() {
        return { ready: !1, dragging: !1, userScrolling: !1, animating: !1, index: 0, pages: [], timer: null, reInitTimer: null, noDrag: !1, totalIndex: 0 };
      }, props: { speed: { type: Number, default: 300 }, defaultIndex: { type: Number, default: 0 }, disabled: { type: Boolean, default: !1 }, auto: { type: Number, default: 3e3 }, continuous: { type: Boolean, default: !0 }, showIndicators: { type: Boolean, default: !0 }, showClose: { type: Boolean, default: !1 }, showPage: { type: Boolean, default: !1 }, showBtn: { type: Boolean, default: !1 }, noDragWhenSingle: { type: Boolean, default: !0 }, prevent: { type: Boolean, default: !1 }, propagation: { type: Boolean, default: !1 }, fullScreen: { type: Boolean, default: !1 }, closevalue: { type: Boolean, default: !1 } }, model: { prop: "closevalue", event: "close" }, methods: { swipeItemCreated: function swipeItemCreated(A) {
          var e = this;this.ready && (clearTimeout(this.reInitTimer), this.reInitTimer = setTimeout(function () {
            e.reInitPages(A);
          }, 100));
        }, swipeItemDestroyed: function swipeItemDestroyed() {
          var A = this;this.ready && (clearTimeout(this.reInitTimer), this.reInitTimer = setTimeout(function () {
            A.reInitPages();
          }, 100));
        }, translate: function translate(A, e, t, r) {
          var a = this,
              o = arguments;if (t) {
            this.animating = !0, A.style.webkitTransition = "-webkit-transform " + t + "ms ease-in-out", setTimeout(function () {
              A.style.webkitTransform = "translate3d(" + e + "px, 0, 0)";
            }, 50);var i = !1,
                s = function s() {
              i || (i = !0, a.animating = !1, A.style.webkitTransition = "", A.style.webkitTransform = "", r && r.apply(a, o));
            };(0, n.once)(A, "webkitTransitionEnd", s), setTimeout(s, t + 100);
          } else A.style.webkitTransition = "", A.style.webkitTransform = "translate3d(" + e + "px, 0, 0)";
        }, reInitPages: function reInitPages(A) {
          var e = this.$children;this.totalIndex = e.length, this.noDrag = 1 === e.length && this.noDragWhenSingle;var t = [];this.index = A || this.defaultIndex;var r = A || this.defaultIndex;console.log("ddd"), e.forEach(function (A, e) {
            t.push(A.$el), (0, n.removeClass)(A.$el, "is-active"), e === r && setTimeout(function () {
              (0, n.addClass)(A.$el, "is-active");
            }, 10);
          }), this.pages = t, console.log("页面", this.pages);
        }, doAnimate: function doAnimate(A, e) {
          var t = this;if (0 !== this.$children.length && (e || !(this.$children.length < 2))) {
            var r,
                a,
                o,
                i,
                s,
                l,
                u = this.speed || 300,
                c = this.index,
                B = this.pages,
                d = B.length;e && "goto" !== A ? (r = e.prevPage, o = e.currentPage, a = e.nextPage, i = e.pageWidth, s = e.offsetLeft) : (e = e || {}, i = this.$el.clientWidth, o = B[c], "goto" === A ? (r = e.prevPage, a = e.nextPage) : (r = B[c - 1], a = B[c + 1]), this.continuous && B.length > 1 && (r || (r = B[B.length - 1]), a || (a = B[0])), r && (r.style.display = "block", this.translate(r, -i)), a && (a.style.display = "block", this.translate(a, i)));var f = this.$children[c].$el;"prev" === A ? (c > 0 && (l = c - 1), this.continuous && 0 === c && (l = d - 1)) : "next" === A ? (c < d - 1 && (l = c + 1), this.continuous && c === d - 1 && (l = 0)) : "goto" === A && e.newIndex > -1 && e.newIndex < d && (l = e.newIndex);var h = function h() {
              if (void 0 !== l) {
                var A = t.$children[l].$el;(0, n.removeClass)(f, "is-active"), (0, n.addClass)(A, "is-active"), t.index = l, t.$emit("change", l, c);
              }r && (r.style.display = ""), a && (A.style.display = ""), e.move && t.circulate();
            };setTimeout(function () {
              "next" === A ? (t.translate(o, -i, u, h), a && t.translate(a, 0, u)) : "prev" === A ? (t.translate(o, i, u, h), r && t.translate(r, 0, u)) : "goto" === A ? r ? (t.translate(o, i, u, h), t.translate(r, 0, u)) : a && (t.translate(o, -i, u, h), t.translate(a, 0, u)) : (t.translate(o, 0, u, h), void 0 !== s ? (r && s > 0 && t.translate(r, -1 * i, u), a && s < 0 && t.translate(a, i, u)) : (r && t.translate(r, -1 * i, u), a && t.translate(a, i, u)));
            }, 10);
          }
        }, next: function next() {
          this.doAnimate("next");
        }, prev: function prev() {
          this.doAnimate("prev");
        }, btnPrev: function btnPrev() {
          if (!this.continuous && 0 == this.index) return !1;this.doAnimate("prev");
        }, btnNext: function btnNext() {
          if (!this.continuous && this.index == this.pages.length - 1) return !1;this.doAnimate("next");
        }, goto: function goto(A) {
          this.index !== A && (A < this.index ? this.doAnimate("goto", { newIndex: A, prevPage: this.pages[A] }) : this.doAnimate("goto", { newIndex: A, newPage: this.pages[A] }));
        }, doOnTouchStart: function doOnTouchStart(A) {
          if (!this.noDrag && !this.disabled) {
            var e = this.$el,
                t = this.dragState,
                n = A.changedTouches ? A.changedTouches[0] : A;t.startTime = new Date(), t.startLeft = n.pageX, t.startTop = n.pageY, t.startTopAbsolute = n.clientY, t.pageWidth = e.offsetWidth, t.pageHeight = e.offsetHeight;var r = this.$children[this.index - 1],
                a = this.$children[this.index],
                o = this.$children[this.index + 1];this.continuous && this.pages.length > 1 && (r || (r = this.$children[this.$children.length - 1]), o || (o = this.$children[0])), t.prevPage = r ? r.$el : null, t.dragPage = a ? a.$el : null, t.nextPage = o ? o.$el : null, t.prevPage && (t.prevPage.style.display = "block"), t.nextPage && (t.nextPage.style.display = "block");
          }
        }, doOnTouchMove: function doOnTouchMove(A) {
          if (!this.noDrag && !this.disabled) {
            var e = this.dragState,
                t = A.changedTouches ? A.changedTouches[0] : A;e.currentLeft = t.pageX, e.currentTop = t.pageY, e.currentTopAbsolute = t.clientY;var n = e.currentLeft - e.startLeft,
                r = e.currentTopAbsolute - e.startTopAbsolute,
                a = Math.abs(n),
                o = Math.abs(r);if (a < 5 || a >= 5 && o >= 1.73 * a) this.userScrolling = !0;else {
              this.userScrolling = !1, A.preventDefault();var i = (n = Math.min(Math.max(1 - e.pageWidth, n), e.pageWidth - 1)) < 0 ? "next" : "prev";if (e.prevPage && "prev" === i) this.translate(e.prevPage, n - e.pageWidth);else if (e.nextPage && "next" === i) this.translate(e.nextPage, n + e.pageWidth);else {
                var s = e.pageWidth,
                    l = n;n = -1 / 6 / s * l * (Math.abs(l) - 2 * s);
              }this.translate(e.dragPage, n);
            }
          }
        }, doOnTouchEnd: function doOnTouchEnd() {
          if (!this.noDrag && !this.disabled) {
            var A = this.dragState,
                e = new Date() - A.startTime,
                t = null,
                n = A.currentLeft - A.startLeft,
                r = A.currentTop - A.startTop,
                a = A.pageWidth,
                o = this.index,
                i = this.pages.length;if (e < 300) {
              var s = Math.abs(n) < 5 && Math.abs(r) < 5;(isNaN(n) || isNaN(r)) && (s = !0), s && this.$children[this.index].$emit("tap");
            }e < 300 && void 0 === A.currentLeft || ((e < 300 || Math.abs(n) > a / 2) && (t = n < 0 ? "next" : "prev"), this.continuous || (0 === o && "prev" === t || o === i - 1 && "next" === t) && (t = null), this.$children.length < 2 && (t = null), this.doAnimate(t, { offsetLeft: n, pageWidth: A.pageWidth, prevPage: A.prevPage, currentPage: A.dragPage, nextPage: A.nextPage, move: !0 }), this.dragState = {});
          }
        }, dragStartEvent: function dragStartEvent(A) {
          this.prevent && A.preventDefault(), this.propagation && A.stopPropagation(), this.animating || (this.dragging = !0, this.userScrolling = !1, this.doOnTouchStart(A));
        }, dragMoveEvent: function dragMoveEvent(A) {
          this.dragging && this.doOnTouchMove(A);
        }, dragEndEvent: function dragEndEvent(A) {
          if (this.userScrolling) return this.dragging = !1, void (this.dragState = {});this.dragging && (this.doOnTouchEnd(A), this.dragging = !1);
        }, circulate: function circulate() {
          var A = this;clearInterval(this.timer), this.auto > 0 && !this.fullScreen && (console.log("开启自动循环"), this.timer = setInterval(function () {
            A.dragging || A.animating || A.next();
          }, this.auto));
        }, close: function close() {
          console.log("点击关闭按钮"), this.$emit("close", !0);
        } }, destroyed: function destroyed() {
        this.timer && (clearInterval(this.timer), this.timer = null), this.reInitTimer && (clearTimeout(this.reInitTimer), this.reInitTimer = null);
      }, mounted: function mounted() {
        this.ready = !0, this.circulate(), console.log("关闭值", this.closevalue), this.reInitPages();var A = this.$el;A.addEventListener("touchstart", this.dragStartEvent), A.addEventListener("touchmove", this.dragMoveEvent), A.addEventListener("touchend", this.dragEndEvent), A.addEventListener("mousedown", this.dragStartEvent), A.addEventListener("mousemove", this.dragMoveEvent), A.addEventListener("mouseup", this.dragEndEvent);
      } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(112);var n = a(t(10)),
        r = a(t(11));a(t(1));function a(A) {
      return A && A.__esModule ? A : { default: A };
    }e.default = { name: "y-tabbar", data: function data() {
        return {};
      }, components: { "y-col": n.default, "y-row": r.default }, methods: { tabbarclick: function tabbarclick(A) {
          this.$emit("tabbare-emit", A);
        } }, computed: { color: function color() {
          return this.tabbar.color ? this.tabbar.color : "#999";
        }, selectedColor: function selectedColor() {
          return this.tabbar.selectedColor ? this.tabbar.selectedColor : "#333";
        }, backgroundColor: function backgroundColor() {
          return this.tabbar.backgroundColor ? this.tabbar.backgroundColor : "#fff";
        }, borderStyle: function borderStyle() {
          return this.tabbar.borderStyle ? this.tabbar.borderStyle : "#fff";
        } }, props: { tabbar: Object, tabbar_current: Number }, mounted: function mounted() {} };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(118);var n = r(t(57));r(t(1));function r(A) {
      return A && A.__esModule ? A : { default: A };
    }e.default = { name: "y-yuncalendar", data: function data() {
        return {};
      }, components: { "y-calendar": n.default }, methods: { maskClick: function maskClick() {
          this.$emit("mask-click");
        }, clickDate: function clickDate(A, e, t, n) {
          this.$emit("click-date", A, e, t, n);
        }, greet: function greet(A) {
          var e = A.target.scrollTop;0 == e && this.$emit("scrollToTop"), e >= this.MaxScrollTop && this.$emit("scrollToBottom");
        } }, computed: { selectDayWeek: function selectDayWeek() {
          return this.select_date ? "周" + ["日", "一", "二", "三", "四", "五", "六"][this.select_date.week] : "";
        } }, props: { show_calendar: { type: Boolean, default: !0 }, show_thead: { type: Boolean, default: !0 }, date_data: { type: Array, default: [] }, position: { type: String, default: "bottom" }, height: { type: String, default: "90%" }, color: { type: String, default: "#ff7124" }, width: { type: String, default: "100%" }, select_date: { type: Object } }, mounted: function mounted() {} };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(122), e.default = { name: "y-button", data: function data() {
        return {};
      }, props: { type: { type: String, default: "defalut" }, size: { type: String, default: "medium" }, pill: Boolean, disabled: { type: Boolean }, nativeType: { type: String, defalut: "button" }, autofocus: { type: Boolean, default: !1 } }, methods: { handleClick: function handleClick(A) {
          this.$emit("click", A);
        }, handleFocus: function handleFocus(A) {
          this.$emit("focus", A);
        }, handleBlur: function handleBlur(A) {
          this.$emit("blur", A);
        } } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(129), e.default = { name: "y-input", data: function data() {
        return { currentValue: this.value, prefixOffset: null, suffixOffset: null, hovering: !1, focused: !1 };
      }, props: { value: { type: [String, Number], default: "" }, status: { type: [String], default: "primary" }, placeholder: String, size: String, name: String, form: String, id: String, maxlength: Number, minlength: Number, readonly: Boolean, autofocus: Boolean, disabled: { type: Boolean, default: !1 }, noboder: { type: Boolean, default: !1 }, type: { type: String, default: "text" }, suffixIcon: String, prefixIcon: String, label: String, clearable: { type: Boolean, default: !1 } }, computed: { inputSize: function inputSize() {
          return this.size;
        }, showClear: function showClear() {
          return this.clearable && !this.disabled && "" !== this.currentValue && (this.focused || this.hovering);
        }, inputDisabled: function inputDisabled() {
          return this.disabled;
        } }, mounted: function mounted() {}, methods: { handleBlur: function handleBlur(A) {
          this.focused = !1, this.$emit("blur", this.currentValue);
        }, handleFocus: function handleFocus(A) {
          this.focused = !0, this.$emit("focus", A);
        }, clear: function clear() {
          this.$emit("input", ""), this.$emit("change", ""), this.$emit("clear"), this.currentValue = "";
        } } };
  }, function (A, e, t) {
    "use strict";
    function n(A, e) {
      var t,
          n = void 0,
          r = void 0;try {
        n = A.toString().split(".")[1].length;
      } catch (A) {
        n = 0;
      }try {
        r = e.toString().split(".")[1].length;
      } catch (A) {
        r = 0;
      }return t = Math.pow(10, Math.max(n, r)), (Math.round(A * t) + Math.round(e * t)) / t;
    }Object.defineProperty(e, "__esModule", { value: !0 }), t(136), e.default = { name: "y-ranger", model: { prop: "value", event: "change" }, props: { max: { type: Number, default: 100 }, min: { type: Number, default: 0 }, value: { type: Number, default: 1 }, disabled: { type: Boolean, default: !1 }, readonly: { type: Boolean, default: !1 }, pcdisabled: { type: Boolean, default: !1 }, precision: { type: Number, default: 0 }, step: { type: Number, default: 1 } }, data: function data() {
        return { plusDisabled: !1, minusDisabled: !1, currentValue: this.value };
      }, watch: {}, computed: {}, methods: { plus: function plus(A) {
          this.plusDisabled || (this.changeValue(1), A.preventDefault());
        }, minus: function minus(A) {
          A.preventDefault(), this.minusDisabled || this.changeValue(0);
        }, keyDown: function keyDown(A) {
          this.pcdisabled || (38 === A.keyCode ? (console.log("加"), A.preventDefault(), this.plus(A)) : 40 === A.keyCode && (console.log("减"), A.preventDefault(), this.minus(A)));
        }, changeValue: function changeValue(A) {
          if (!this.disabled) {
            var e = Number(this.value),
                t = Number(this.step);if (!isNaN(e)) {
              if (1 === A) {
                if (!(n(e, t) <= this.max)) return;e = e;
              } else if (0 === A) {
                if (!(n(e, -t) >= this.min)) return;e = e;
              }e = n(e, A ? t : -t), this.changeVal(e), this.setValue(e);
            }
          }
        }, handleInput: function handleInput(A) {
          var e = A.target.value.trim(),
              t = e.replace("-", "");this.minusDisabled = !1, this.plusDisabled = !1;var r = !1;e.indexOf("-") > -1 && (r = !0);var a = this.min,
              o = this.max,
              i = this.step,
              s = this.precision,
              l = "" === e ? 0 : Number(t);r && (l = "-" + l);var u = function (A, e) {
            var t,
                n,
                r = A.toString(),
                a = e.toString(),
                o = arguments[2];return t = (a.split(".")[1] ? a.split(".")[1].length : 0) - (r.split(".")[1] ? r.split(".")[1].length : 0), n = Number(r.replace(".", "")) / Number(a.replace(".", "")) * Math.pow(10, t), "number" != typeof o ? Number(n) : Number(n.toFixed(parseInt(o)));
          }(l - a, i),
              c = r ? Math.ceil(u) : Math.floor(u),
              B = Number.isInteger(u);if (console.log("触发input事件"), isNaN(t)) return console.log("格式不正确"), void (A.target.value = this.currentValue);if (!B) return console.log("不符合间隔", c), console.log("--", i), console.log("值：", c * i), console.log("等于", n(a, c * i)), void (A.target.value = n(a, c * i).toFixed(s));if (l > o) console.log("大于最大值"), this.plusDisabled = !0, A.target.value = o.toFixed(s), this.setValue(o);else if (l < a) {
            if (console.log("小于最小值", a), "" == l) return;this.minusDisabled = !0, A.target.value = a.toFixed(s), this.setValue(a);
          }
        }, handleChange: function handleChange(A) {
          var e = A.target.value.trim(),
              t = this.min,
              n = this.max,
              r = "" === e ? this.currentValue : Number(e);this.plusDisabled = !1, this.minusDisabled = !1, console.log("触发change:", r), isNaN(r) && "" !== e ? A.target.value = this.currentValue : r >= n ? (this.plusDisabled = !0, this.setValue(n), A.target.value = n.toFixed(this.precision)) : r <= t ? (this.minusDisabled = !0, this.setValue(t), A.target.value = t.toFixed(this.precision)) : (A.target.value = this.currentValue, this.setValue(r));
        }, changeVal: function changeVal(A) {
          var e = Number(A);if (isNaN(A)) this.plusDisabled = !0, this.minusDisabled = !0;else {
            var t = this.step;this.plusDisabled = e + t > this.max, this.minusDisabled = e - t < this.min, console.log("状态value：减：", e - this.step), console.log("状态最小值", this.min);
          }
        }, setValue: function setValue(A) {
          var e = this;this.precision && (A = (A = Number(A)).toFixed(this.precision)), this.$nextTick(function () {
            e.currentValue = A, console.log("修改后的值", e.currentValue), e.$emit("change", e.currentValue);
          });
        }, handleFocus: function handleFocus(A) {
          this.$emit("focus", A);
        }, handleBlur: function handleBlur(A) {
          this.$emit("blur", A);
        } }, mounted: function mounted() {
        this.currentValue = Number(this.currentValue).toFixed(this.precision), console.log("值", this.currentValue), this.changeVal(this.currentValue), this.disabled && (this.plusDisabled = !0, this.minusDisabled = !0);
      } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(140), e.default = { name: "y-ranger", model: { prop: "value", event: "change" }, props: { value: { default: 0, required: !0 }, max: { type: Number, default: 100 }, min: { type: Number, default: 0 }, step: { type: Number, default: 1 }, disabled: { type: Boolean, default: !1 }, displayValue: { type: Boolean, default: !0 }, range: { type: Boolean, default: !1 }, gapShow: { type: Boolean, default: !1 }, trackColor: { type: String, default: "#bdbdbd" }, fillColor: { type: String, default: "#ff7800" }, thumbColor: { type: String, default: "#ff7800" }, valueColor: { type: String, default: "#ff7800" } }, data: function data() {
        return { dragging: !1, active: !1, gap: [], firstValue: 0, secondValue: 0, direct: 3, firstValueShow: !1, secondValueShow: !1, firstBtn: "", secondBtn: "", touchRanger: "" };
      }, computed: { percent: function percent() {
          var A = void 0;return (A = this.range ? (this.value[0] - this.min) / (this.max - this.min) * 100 : (this.value - this.min) / (this.max - this.min) * 100) > 100 ? 100 : A < 0 ? 0 : A;
        }, percentValue: function percentValue() {
          return this.value >= this.max ? this.max : this.value <= this.min ? this.min : this.value;
        }, percentSecond: function percentSecond() {
          var A = (this.value[1] - this.min) / (this.max - this.min) * 100;return A > 100 ? 100 : A < 0 ? 0 : A;
        } }, methods: { init: function init() {
          this.touchRanger = this.$el.querySelector(".y-ranger__thumb").offsetWidth / 2, this.firstBtn = this.$el.querySelector(".firstBtn"), this.firstBtn.addEventListener("touchstart", this.handleTouchStart), this.gapShow && this.gapInit(), this.range && (this.rangeInit(), this.secondBtn = this.$el.querySelector(".secondBtn"), console.log("按鈕dom", this.secondBtn), this.secondBtn.addEventListener("touchstart", this.handleTouchStart));
        }, rangeInit: function rangeInit() {
          this.value;this.firstValue = this.value[0], this.secondValue = this.value[1];
        }, gapInit: function gapInit() {
          for (var A = (this.max - this.min) / this.step, e = 1; e <= A; e++) {
            var t = 100 / A * e;this.gap.push(t);
          }
        }, handleTouchStart: function handleTouchStart(A) {
          if (!this.disabled || this.range) {
            var e = A.touches[0].clientX,
                t = this.getLeft(this.firstBtn),
                n = this.getLeft(this.secondBtn),
                r = Math.abs(t - e),
                a = Math.abs(n - e);if (this.direct = 3, a <= this.touchRanger && (this.direct = 1), r <= this.touchRanger && (this.direct = 0), this.disabled && this.range) return 0 === this.direct && this.showFirstValue(), void (1 === this.direct && this.showSecondValue());this.setValue(A.touches[0]), document.addEventListener("touchmove", this.handleTouchMove), document.addEventListener("touchup", this.handleTouchEnd), document.addEventListener("touchend", this.handleTouchEnd), A.preventDefault(), this.onDragStart(A);
          } else this.displayValue && this.showValue();
        }, handleTouchEnd: function handleTouchEnd(A) {
          this.disabled || (document.removeEventListener("touchmove", this.handleTouchMove), document.removeEventListener("touchup", this.handleTouchEnd), document.removeEventListener("touchend", this.handleTouchEnd), this.onDragStop(A));
        }, handleTouchMove: function handleTouchMove(A) {
          this.onDragUpdate(A.touches[0]);
        }, onDragStart: function onDragStart(A) {
          this.dragging = !0, this.active = !0, this.$emit("drag-start", A);
        }, onDragUpdate: function onDragUpdate(A) {
          var e = this;this.dragRunning || (this.dragRunning = !0, window.requestAnimationFrame(function () {
            e.dragRunning = !1, e.disabled || e.setValue(A);
          }));
        }, onDragStop: function onDragStop(A) {
          this.dragging = !1, this.active = !1, this.$emit("drag-stop", A), this.range && (this.firstValueShow = !1, this.secondValueShow = !1);
        }, showValue: function showValue() {
          var A = this;this.dragging = !0;var e = setTimeout(function () {
            A.dragging = !1, clearTimeout(e);
          }, 2e3);
        }, showFirstValue: function showFirstValue() {
          var A = this;this.firstValueShow = !0;var e = setTimeout(function () {
            A.firstValueShow = !1, clearTimeout(e);
          }, 2e3);
        }, showSecondValue: function showSecondValue() {
          var A = this;this.secondValueShow = !0;var e = setTimeout(function () {
            A.secondValueShow = !1, clearTimeout(e);
          }, 2e3);
        }, setValue: function setValue(A) {
          var e = this.$el,
              t = this.max,
              n = this.min,
              r = this.step,
              a = (A.clientX - e.getBoundingClientRect().left) / e.offsetWidth * (t - n);if (a = Math.round(a / r) * r + n, (a = parseFloat(a.toFixed(2))) > t ? a = t : a < n && (a = n), this.range) {
            var o = [];1 === this.direct && (this.secondValue = a, this.secondValueShow = !0), 0 === this.direct && (this.firstValue = a, this.firstValueShow = !0), o[1] = this.secondValue, o[0] = this.firstValue, this.$emit("change", o);
          } else this.$emit("change", a);
        }, getLeft: function getLeft(A) {
          for (var e = A.offsetLeft; null != A.offsetParent;) {
            e += (A = A.offsetParent).offsetLeft;
          }return e;
        } }, mounted: function mounted() {
        this.init();
      } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(147), e.default = { name: "y-scroll", props: { upMethod: { type: Function, default: void 0, required: !1 }, bottomMethod: { type: Function, default: void 0, required: !1 }, topOffset: { type: Number, default: 60 }, upPullText: { type: String, default: "下拉刷新" }, upDropText: { type: String, default: "释放刷新" }, upLoadText: { type: String, default: "正在刷新..." }, bottomLoadText: { type: String, default: "加载中..." }, bottomShow: { type: Boolean, default: !0 }, bottomStop: { type: Boolean, default: !1 }, upStop: { type: Boolean, default: !1 }, upIcon: { type: String }, bottomIcon: { type: String } }, data: function data() {
        return { top: 0, upText: "", startY: 0, currentY: 0, scrollTop: 0, upStatus: 0, scrollParent: null, direction: "", upDropped: !1, bottomDropped: !1, scrollLoad: !1, topHeight: 0, bottomHeight: 0 };
      }, watch: { upStop: function upStop(A) {
          A ? this.removeUpMethods() : this.bindUpMethods();
        }, bottomStop: function bottomStop(A) {
          A ? this.removeBottomMethods() : this.bindBottomMethods();
        } }, methods: { init: function init() {
          var A = this;this.upText = this.upPullText, this.scrollParent = this.getScrollEventTarget(this.$el), this.$nextTick(function () {
            A.queryHeight(), A.upMethod && !A.upStop && A.bindUpMethods(), A.bottomMethod && !A.bottomStop && A.bindBottomMethods();
          });
        }, queryHeight: function queryHeight() {
          var A = void 0,
              e = void 0;A = this.$el.querySelector(".y-scroll__top") ? this.$el.querySelector(".y-scroll__top") : this.$slots.upContent[0].elm, this.upMethod ? this.topHeight = A.clientHeight : this.topHeight = 0, A.style = "margin-top: -" + this.topHeight + "px", e = this.$el.querySelector(".y-scroll__bottom") ? this.$el.querySelector(".y-scroll__bottom") : this.$slots.bottomContent[0].elm, this.bottomMethod && this.bottomShow ? this.bottomHeight = e.clientHeight : this.bottomHeight = 0, e.style = "margin-bottom: -" + this.bottomHeight + "px";
        }, bindUpMethods: function bindUpMethods() {
          this.$el.addEventListener("touchstart", this.touchStart), this.$el.addEventListener("touchmove", this.touchMove), this.$el.addEventListener("touchend", this.touchEnd);
        }, removeUpMethods: function removeUpMethods() {
          this.$el.removeEventListener("touchstart", this.touchStart), this.$el.removeEventListener("touchmove", this.touchMove), this.$el.removeEventListener("touchend", this.touchEnd);
        }, bindBottomMethods: function bindBottomMethods() {
          this.scrollParent.addEventListener("scroll", this.onScroll);
        }, removeBottomMethods: function removeBottomMethods() {
          this.scrollParent.removeEventListener("scroll", this.onScroll);
        }, touchStart: function touchStart(A) {
          this.startY = A.touches[0].clientY, this.scrollTop = this.getScrollTop(this.scrollParent), this.bottomDropped = !1, this.upStatus || (this.upDropped = !1);
        }, touchMove: function touchMove(A) {
          if (!(this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom)) {
            this.currentY = A.touches[0].clientY;var e = (this.currentY - this.startY) / 2;this.direction = e > 0 ? 0 : 1, !this.direction && this.upMethod && 0 == this.scrollTop && 2 != this.upStatus && (A.preventDefault(), A.stopPropagation(), this.top = e - this.scrollTop, this.top = this.top < 0 ? 0 : this.top, this.upText = this.top >= this.topOffset ? this.upDropText : this.upPullText, this.top >= this.topOffset && (console.log("触发变化"), this.upStatus = 1, this.$emit("topEvent", 1)));
          }
        }, touchEnd: function touchEnd() {
          0 === this.direction && this.top > 0 && 0 === this.scrollTop ? (this.upDropped = !0, this.upText = this.upLoadText, this.upStatus = 2, this.top = this.topHeight, this.$emit("topEvent", 2), this.upMethod(this.upDone)) : this.upDone();
        }, upDone: function upDone() {
          var A = this;this.top = 0, setTimeout(function () {
            A.upStatus = 0, A.$emit("topEvent", 0);
          }, 200);
        }, onScroll: function onScroll() {
          if (!this.scrollLoad) {
            this.$el.clientHeight - this.getScrollTop(this.scrollParent) - (this.scrollParent === window ? document.documentElement.clientHeight || document.body.clientHeight : this.scrollParent.clientHeight) <= 10 && (console.log("滚动到底部，触发上拉事件"), this.bottomDropped = !0, this.scrollLoad = !0, this.bottomShow ? this.top = -this.bottomHeight : this.top = 0, this.bottomMethod(this.bottomDone));
          }
        }, bottomDone: function bottomDone() {
          this.top = 0, this.bottomDropped = !1, this.scrollLoad = !1;
        }, getScrollEventTarget: function getScrollEventTarget(A) {
          for (var e = A; e && "HTML" !== e.tagName && "BODY" !== e.tagName && 1 === e.nodeType;) {
            var t = document.defaultView.getComputedStyle(e).overflowY;if ("scroll" === t || "auto" === t) return e;e = e.parentNode;
          }return window;
        }, getScrollTop: function getScrollTop(A) {
          return A === window ? Math.max(window.pageYOffset || 0, document.documentElement.scrollTop) : A.scrollTop;
        } }, mounted: function mounted() {
        this.init();
      } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(153), e.default = { data: function data() {
        return { timer: "", top: "50%", left: "50%", onClose: null, visible: !1, show_mask: !0, show_close: !1, delay: 4e3, message: "", width: "auto", auto_close: !0, transition_name: "toast-fade" };
      }, methods: { startTimer: function startTimer() {
          var A = this;this.timer && window.clearTimeout(this.timer), this.auto_close && (this.timer = window.setTimeout(function () {
            A.close();
          }, this.delay));
        }, clearTimer: function clearTimer() {
          this.timer && window.clearTimeout(this.timer);
        }, close: function close() {
          this.clearTimer(), "function" == typeof this.onClose && this.onClose && this.onClose(), this.visible = !1, this.show_mask = !1;
        } }, mounted: function mounted() {
        this.startTimer();
      } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(159);r(t(1));var n = r(t(74));r(t(72));function r(A) {
      return A && A.__esModule ? A : { default: A };
    }e.default = { name: "y-calendar", data: function data() {
        return { MaxScrollTop: 0 };
      }, components: { "y-popup": n.default }, methods: { maskClick: function maskClick() {
          this.$emit("mask-click");
        }, clickDate: function clickDate(A, e, t, n) {
          this.$emit("click-date", A, e, t, n);
        }, greet: function greet(A) {
          var e = A.target.scrollTop;0 == e && this.$emit("scrollToTop"), e >= this.MaxScrollTop && this.$emit("scrollToBottom");
        } }, computed: { calendarData: function calendarData() {
          return this.date_data;
        } }, watch: {}, props: { show_calendar: { type: Boolean, default: !1 }, show_thead: { type: Boolean, default: !0 }, date_data: { type: Array, default: [] }, position: { type: String, default: "bottom" }, height: { type: String, default: "auto" }, color: { type: String, default: "#ff7124" }, width: { type: String, default: "100%" } }, beforeMount: function beforeMount() {
        this.id = ~~(100 * Math.random()), this.classname = "y-calendar--" + this.id;
      }, mounted: function mounted() {}, updated: function updated() {
        var A = this;setTimeout(function () {
          var e = document.querySelector("." + A.classname + " .y-calendar__header"),
              t = document.querySelector("." + A.classname + " .y-calendar__footer"),
              n = document.querySelector("." + A.classname + " .y-calendar__weeks"),
              r = document.querySelector("." + A.classname + " .y-calendar__content"),
              a = document.querySelector("." + A.classname + " .y-popup__panel"),
              o = document.querySelector("." + A.classname + " .y-calendar__tables"),
              i = e.clientHeight,
              s = t.clientHeight,
              l = n.clientHeight,
              u = o.clientHeight,
              c = a.clientHeight;r.style.height = c - i - s - l + "px", A.MaxScrollTop = u - r.clientHeight, console.log(c, i, s, l);
        }, 300);
      } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(162);var n,
        r = t(1);(n = r) && n.__esModule;e.default = { name: "y-messagebox", data: function data() {
        return {};
      }, components: {}, created: function created() {}, computed: {}, props: { transition_name: { type: String, default: "messageBox-fade" }, show_mask: { type: Boolean, default: !0 }, animate_type: { type: String, default: "1" }, show_panel: { type: Boolean, default: !1 }, show_close: { type: Boolean, default: !0 }, show_header: { type: Boolean, default: !1 }, show_footer: { type: Boolean, default: !0 } }, methods: { closeDialog: function closeDialog() {
          this.$emit("close");
        } } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), t(205);var n,
        r = t(1);(n = r) && n.__esModule;var a = { bottom: "fadeUp", top: "fadeDown", left: "fadeLeft", right: "fadeRight" },
        o = { bottom: "100%", top: "100%", left: "60%", right: "60%" },
        i = { bottom: "auto", top: "auto", left: "100%", right: "100%" };e.default = { name: "y-popup", props: { value: { type: Boolean, required: !0 }, width: { type: String }, height: { type: String }, position: { type: String, default: "bottom" }, hideOnClickMask: { type: Boolean, default: !0 }, panelClass: { type: String, default: "" }, showMask: { type: Boolean, default: !0 } }, data: function data() {
        return { transitionClass: a[this.position], currentShow: !1 };
      }, components: {}, methods: { maskClick: function maskClick() {
          this.hideOnClickMask && (this.currentShow = !1), this.$emit("mask-click");
        }, noScroll: function noScroll(A) {
          A.preventDefault();
        }, addListenScroll: function addListenScroll() {
          document.querySelector(".y-popup__mask").addEventListener("touchmove", this.noScroll, !1);
        }, removeListenScroll: function removeListenScroll() {
          document.querySelector(".y-popup__mask").removeEventListener("touchmove", this.noScroll, !1);
        } }, computed: { panelStyle: function panelStyle() {
          var A = { width: this.width || o[this.position], height: this.height || i[this.position] };return A[this.position] = 0, A;
        } }, watch: { value: function value(A) {
          A ? this.addListenScroll() : this.removeListenScroll(), this.currentShow = A;
        }, currentShow: function currentShow(A) {
          this.$emit("input", A);
        } } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.createCounterText = e.inlineListItemElement = e.getListOwner = void 0;var n = t(6),
        r = s(t(7)),
        a = s(t(13)),
        o = t(14),
        i = t(62);function s(A) {
      return A && A.__esModule ? A : { default: A };
    }var l = ["OL", "UL", "MENU"],
        u = (e.getListOwner = function (A) {
      var e = A.parent;if (!e) return null;do {
        if (-1 !== l.indexOf(e.tagName)) return e;e = e.parent;
      } while (e);return A.parent;
    }, e.inlineListItemElement = function (A, e, t) {
      var i = e.style.listStyle;if (i) {
        var s = A.ownerDocument.defaultView.getComputedStyle(A, null),
            l = A.ownerDocument.createElement("html2canvaswrapper");switch ((0, n.copyCSSStyles)(s, l), l.style.position = "absolute", l.style.bottom = "auto", l.style.display = "block", l.style.letterSpacing = "normal", i.listStylePosition) {case o.LIST_STYLE_POSITION.OUTSIDE:
            l.style.left = "auto", l.style.right = A.ownerDocument.defaultView.innerWidth - e.bounds.left - e.style.margin[1].getAbsoluteValue(e.bounds.width) + 7 + "px", l.style.textAlign = "right";break;case o.LIST_STYLE_POSITION.INSIDE:
            l.style.left = e.bounds.left - e.style.margin[3].getAbsoluteValue(e.bounds.width) + "px", l.style.right = "auto", l.style.textAlign = "left";}var u = void 0,
            c = e.style.margin[0].getAbsoluteValue(e.bounds.width),
            B = i.listStyleImage;if (B) {
          if ("url" === B.method) {
            var d = A.ownerDocument.createElement("img");d.src = B.args[0], l.style.top = e.bounds.top - c + "px", l.style.width = "auto", l.style.height = "auto", l.appendChild(d);
          } else {
            var f = .5 * parseFloat(e.style.font.fontSize);l.style.top = e.bounds.top - c + e.bounds.height - 1.5 * f + "px", l.style.width = f + "px", l.style.height = f + "px", l.style.backgroundImage = s.listStyleImage;
          }
        } else "number" == typeof e.listIndex && (u = A.ownerDocument.createTextNode(p(e.listIndex, i.listStyleType, !0)), l.appendChild(u), l.style.top = e.bounds.top - c + "px");var h = A.ownerDocument.body;h.appendChild(l), u ? (e.childNodes.push(a.default.fromTextNode(u, e)), h.removeChild(l)) : e.childNodes.push(new r.default(l, e, t, 0));
      }
    }, { integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"] }),
        c = { integers: [9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["Ք", "Փ", "Ւ", "Ց", "Ր", "Տ", "Վ", "Ս", "Ռ", "Ջ", "Պ", "Չ", "Ո", "Շ", "Ն", "Յ", "Մ", "Ճ", "Ղ", "Ձ", "Հ", "Կ", "Ծ", "Խ", "Լ", "Ի", "Ժ", "Թ", "Ը", "Է", "Զ", "Ե", "Դ", "Գ", "Բ", "Ա"] },
        B = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["י׳", "ט׳", "ח׳", "ז׳", "ו׳", "ה׳", "ד׳", "ג׳", "ב׳", "א׳", "ת", "ש", "ר", "ק", "צ", "פ", "ע", "ס", "נ", "מ", "ל", "כ", "יט", "יח", "יז", "טז", "טו", "י", "ט", "ח", "ז", "ו", "ה", "ד", "ג", "ב", "א"] },
        d = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["ჵ", "ჰ", "ჯ", "ჴ", "ხ", "ჭ", "წ", "ძ", "ც", "ჩ", "შ", "ყ", "ღ", "ქ", "ფ", "ჳ", "ტ", "ს", "რ", "ჟ", "პ", "ო", "ჲ", "ნ", "მ", "ლ", "კ", "ი", "თ", "ჱ", "ზ", "ვ", "ე", "დ", "გ", "ბ", "ა"] },
        f = function f(A, e, t, n, r, a) {
      return A < e || A > t ? p(A, r, a.length > 0) : n.integers.reduce(function (e, t, r) {
        for (; A >= t;) {
          A -= t, e += n.values[r];
        }return e;
      }, "") + a;
    },
        h = function h(A, e, t, n) {
      var r = "";do {
        t || A--, r = n(A) + r, A /= e;
      } while (A * e >= e);return r;
    },
        g = function g(A, e, t, n, r) {
      var a = t - e + 1;return (A < 0 ? "-" : "") + (h(Math.abs(A), a, n, function (A) {
        return (0, i.fromCodePoint)(Math.floor(A % a) + e);
      }) + r);
    },
        w = function w(A, e) {
      var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ". ",
          n = e.length;return h(Math.abs(A), n, !1, function (A) {
        return e[Math.floor(A % n)];
      }) + t;
    },
        Q = function Q(A, e, t, r, a, i) {
      if (A < -9999 || A > 9999) return p(A, o.LIST_STYLE_TYPE.CJK_DECIMAL, a.length > 0);var s = Math.abs(A),
          l = a;if (0 === s) return e[0] + l;for (var u = 0; s > 0 && u <= 4; u++) {
        var c = s % 10;0 === c && (0, n.contains)(i, 1) && "" !== l ? l = e[c] + l : c > 1 || 1 === c && 0 === u || 1 === c && 1 === u && (0, n.contains)(i, 2) || 1 === c && 1 === u && (0, n.contains)(i, 4) && A > 100 || 1 === c && u > 1 && (0, n.contains)(i, 8) ? l = e[c] + (u > 0 ? t[u - 1] : "") + l : 1 === c && u > 0 && (l = t[u - 1] + l), s = Math.floor(s / 10);
      }return (A < 0 ? r : "") + l;
    },
        p = e.createCounterText = function (A, e, t) {
      var n = t ? ". " : "",
          r = t ? "、" : "",
          a = t ? ", " : "";switch (e) {case o.LIST_STYLE_TYPE.DISC:
          return "•";case o.LIST_STYLE_TYPE.CIRCLE:
          return "◦";case o.LIST_STYLE_TYPE.SQUARE:
          return "◾";case o.LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO:
          var i = g(A, 48, 57, !0, n);return i.length < 4 ? "0" + i : i;case o.LIST_STYLE_TYPE.CJK_DECIMAL:
          return w(A, "〇一二三四五六七八九", r);case o.LIST_STYLE_TYPE.LOWER_ROMAN:
          return f(A, 1, 3999, u, o.LIST_STYLE_TYPE.DECIMAL, n).toLowerCase();case o.LIST_STYLE_TYPE.UPPER_ROMAN:
          return f(A, 1, 3999, u, o.LIST_STYLE_TYPE.DECIMAL, n);case o.LIST_STYLE_TYPE.LOWER_GREEK:
          return g(A, 945, 969, !1, n);case o.LIST_STYLE_TYPE.LOWER_ALPHA:
          return g(A, 97, 122, !1, n);case o.LIST_STYLE_TYPE.UPPER_ALPHA:
          return g(A, 65, 90, !1, n);case o.LIST_STYLE_TYPE.ARABIC_INDIC:
          return g(A, 1632, 1641, !0, n);case o.LIST_STYLE_TYPE.ARMENIAN:case o.LIST_STYLE_TYPE.UPPER_ARMENIAN:
          return f(A, 1, 9999, c, o.LIST_STYLE_TYPE.DECIMAL, n);case o.LIST_STYLE_TYPE.LOWER_ARMENIAN:
          return f(A, 1, 9999, c, o.LIST_STYLE_TYPE.DECIMAL, n).toLowerCase();case o.LIST_STYLE_TYPE.BENGALI:
          return g(A, 2534, 2543, !0, n);case o.LIST_STYLE_TYPE.CAMBODIAN:case o.LIST_STYLE_TYPE.KHMER:
          return g(A, 6112, 6121, !0, n);case o.LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH:
          return w(A, "子丑寅卯辰巳午未申酉戌亥", r);case o.LIST_STYLE_TYPE.CJK_HEAVENLY_STEM:
          return w(A, "甲乙丙丁戊己庚辛壬癸", r);case o.LIST_STYLE_TYPE.CJK_IDEOGRAPHIC:case o.LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL:
          return Q(A, "零一二三四五六七八九", "十百千萬", "負", r, 14);case o.LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL:
          return Q(A, "零壹貳參肆伍陸柒捌玖", "拾佰仟萬", "負", r, 15);case o.LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL:
          return Q(A, "零一二三四五六七八九", "十百千萬", "负", r, 14);case o.LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL:
          return Q(A, "零壹贰叁肆伍陆柒捌玖", "拾佰仟萬", "负", r, 15);case o.LIST_STYLE_TYPE.JAPANESE_INFORMAL:
          return Q(A, "〇一二三四五六七八九", "十百千万", "マイナス", r, 0);case o.LIST_STYLE_TYPE.JAPANESE_FORMAL:
          return Q(A, "零壱弐参四伍六七八九", "拾百千万", "マイナス", r, 7);case o.LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL:
          return Q(A, "영일이삼사오육칠팔구", "십백천만", "마이너스 ", a, 7);case o.LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL:
          return Q(A, "零一二三四五六七八九", "十百千萬", "마이너스 ", a, 0);case o.LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL:
          return Q(A, "零壹貳參四五六七八九", "拾百千", "마이너스 ", a, 7);case o.LIST_STYLE_TYPE.DEVANAGARI:
          return g(A, 2406, 2415, !0, n);case o.LIST_STYLE_TYPE.GEORGIAN:
          return f(A, 1, 19999, d, o.LIST_STYLE_TYPE.DECIMAL, n);case o.LIST_STYLE_TYPE.GUJARATI:
          return g(A, 2790, 2799, !0, n);case o.LIST_STYLE_TYPE.GURMUKHI:
          return g(A, 2662, 2671, !0, n);case o.LIST_STYLE_TYPE.HEBREW:
          return f(A, 1, 10999, B, o.LIST_STYLE_TYPE.DECIMAL, n);case o.LIST_STYLE_TYPE.HIRAGANA:
          return w(A, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");case o.LIST_STYLE_TYPE.HIRAGANA_IROHA:
          return w(A, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");case o.LIST_STYLE_TYPE.KANNADA:
          return g(A, 3302, 3311, !0, n);case o.LIST_STYLE_TYPE.KATAKANA:
          return w(A, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", r);case o.LIST_STYLE_TYPE.KATAKANA_IROHA:
          return w(A, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", r);case o.LIST_STYLE_TYPE.LAO:
          return g(A, 3792, 3801, !0, n);case o.LIST_STYLE_TYPE.MONGOLIAN:
          return g(A, 6160, 6169, !0, n);case o.LIST_STYLE_TYPE.MYANMAR:
          return g(A, 4160, 4169, !0, n);case o.LIST_STYLE_TYPE.ORIYA:
          return g(A, 2918, 2927, !0, n);case o.LIST_STYLE_TYPE.PERSIAN:
          return g(A, 1776, 1785, !0, n);case o.LIST_STYLE_TYPE.TAMIL:
          return g(A, 3046, 3055, !0, n);case o.LIST_STYLE_TYPE.TELUGU:
          return g(A, 3174, 3183, !0, n);case o.LIST_STYLE_TYPE.THAI:
          return g(A, 3664, 3673, !0, n);case o.LIST_STYLE_TYPE.TIBETAN:
          return g(A, 3872, 3881, !0, n);case o.LIST_STYLE_TYPE.DECIMAL:default:
          return g(A, 48, 57, !0, n);}
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });e.toCodePoints = function (A) {
      for (var e = [], t = 0, n = A.length; t < n;) {
        var r = A.charCodeAt(t++);if (r >= 55296 && r <= 56319 && t < n) {
          var a = A.charCodeAt(t++);56320 == (64512 & a) ? e.push(((1023 & r) << 10) + (1023 & a) + 65536) : (e.push(r), t--);
        } else e.push(r);
      }return e;
    }, e.fromCodePoint = function () {
      if (String.fromCodePoint) return String.fromCodePoint.apply(String, arguments);var A = arguments.length;if (!A) return "";for (var e = [], t = -1, n = ""; ++t < A;) {
        var r = arguments.length <= t ? void 0 : arguments[t];r <= 65535 ? e.push(r) : (r -= 65536, e.push(55296 + (r >> 10), r % 1024 + 56320)), (t + 1 === A || e.length > 16384) && (n += String.fromCharCode.apply(String, e), e.length = 0);
      }return n;
    };for (var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), a = 0; a < n.length; a++) {
      r[n.charCodeAt(a)] = a;
    }e.decode = function (A) {
      var e = .75 * A.length,
          t = A.length,
          n = void 0,
          a = 0,
          o = void 0,
          i = void 0,
          s = void 0,
          l = void 0;"=" === A[A.length - 1] && (e--, "=" === A[A.length - 2] && e--);var u = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.slice ? new ArrayBuffer(e) : new Array(e),
          c = Array.isArray(u) ? u : new Uint8Array(u);for (n = 0; n < t; n += 4) {
        o = r[A.charCodeAt(n)], i = r[A.charCodeAt(n + 1)], s = r[A.charCodeAt(n + 2)], l = r[A.charCodeAt(n + 3)], c[a++] = o << 2 | i >> 4, c[a++] = (15 & i) << 4 | s >> 2, c[a++] = (3 & s) << 6 | 63 & l;
      }return u;
    }, e.polyUint16Array = function (A) {
      for (var e = A.length, t = [], n = 0; n < e; n += 2) {
        t.push(A[n + 1] << 8 | A[n]);
      }return t;
    }, e.polyUint32Array = function (A) {
      for (var e = A.length, t = [], n = 0; n < e; n += 4) {
        t.push(A[n + 3] << 24 | A[n + 2] << 16 | A[n + 1] << 8 | A[n]);
      }return t;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseBorder = e.BORDER_SIDES = e.BORDER_STYLE = void 0;var n,
        r = t(2),
        a = (n = r) && n.__esModule ? n : { default: n };var o = e.BORDER_STYLE = { NONE: 0, SOLID: 1 },
        i = e.BORDER_SIDES = { TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3 },
        s = Object.keys(i).map(function (A) {
      return A.toLowerCase();
    });e.parseBorder = function (A) {
      return s.map(function (e) {
        var t = new a.default(A.getPropertyValue("border-" + e + "-color")),
            n = function (A) {
          switch (A) {case "none":
              return o.NONE;}return o.SOLID;
        }(A.getPropertyValue("border-" + e + "-style")),
            r = parseFloat(A.getPropertyValue("border-" + e + "-width"));return { borderColor: t, borderStyle: n, borderWidth: isNaN(r) ? 0 : r };
      });
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTextDecoration = e.TEXT_DECORATION_LINE = e.TEXT_DECORATION = e.TEXT_DECORATION_STYLE = void 0;var n,
        r = t(2),
        a = (n = r) && n.__esModule ? n : { default: n };var o = e.TEXT_DECORATION_STYLE = { SOLID: 0, DOUBLE: 1, DOTTED: 2, DASHED: 3, WAVY: 4 },
        i = e.TEXT_DECORATION = { NONE: null },
        s = e.TEXT_DECORATION_LINE = { UNDERLINE: 1, OVERLINE: 2, LINE_THROUGH: 3, BLINK: 4 },
        l = function l(A) {
      switch (A) {case "underline":
          return s.UNDERLINE;case "overline":
          return s.OVERLINE;case "line-through":
          return s.LINE_THROUGH;}return s.BLINK;
    };e.parseTextDecoration = function (A) {
      var e,
          t = "none" === (e = A.textDecorationLine ? A.textDecorationLine : A.textDecoration) ? null : e.split(" ").map(l);return null === t ? i.NONE : { textDecorationLine: t, textDecorationColor: A.textDecorationColor ? new a.default(A.textDecorationColor) : null, textDecorationStyle: function (A) {
          switch (A) {case "double":
              return o.DOUBLE;case "dotted":
              return o.DOTTED;case "dashed":
              return o.DASHED;case "wavy":
              return o.WAVY;}return o.SOLID;
        }(A.textDecorationStyle) };
    };
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { staticClass: "y-payment" }, [t("h3", { staticClass: "y-payment__title" }, [A._t("default", [A._v("支付方式")])], 2), A._v(" "), A._l(A.data, function (e, n) {
        return t("div", { key: n, staticClass: "y-payment__method", on: { click: function click(e) {
              A.handleClick(n);
            } } }, [t("img", { staticClass: "y-payment__icon", attrs: { src: e.img } }), A._v(" "), t("div", { staticClass: "y-payment__container" }, [t("div", { staticClass: "y-payment__content" }, [t("h5", [A._v(A._s(e.title))]), A._v(" "), t("p", [A._v(A._s(e.description))])]), A._v(" "), t("span", { staticClass: "y-payment__select" }, [t("svg", { directives: [{ name: "show", rawName: "v-show", value: A.value === n, expression: "value===index" }], attrs: { "aria-hidden": "true", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg" } }, [t("path", { attrs: { fill: A.selectedColor, d: "M0.20928 497.391904A511.891223 511.891223 0 1 0 526.817376 0.217554 511.891223 511.891223 0 0 0 0.20928 497.391904z m809.427997-109.416749l-340.407664 319.932015a46.07021 46.07021 0 0 1-63.986403 0L218.402914 512.108777a46.07021 46.07021 0 1 1 67.185723-63.986403l153.567367 162.525463L745.650874 320.149568a46.07021 46.07021 0 1 1 63.986403 67.185723" } })])])])]);
      })], 2);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { staticClass: "y-progress", class: "y-progress--" + A.type }, ["line" === A.type ? t("div", { staticClass: "y-progress-bar", style: { height: A.barWidth + "px" } }, [t("div", { staticClass: "y-progress-bar__outterBox" }, [t("div", { staticClass: "y-progress-bar__innerBox", style: A.barStyle }, [A.textInside && A.showInfo ? t("div", { staticClass: "y-progress-bar__text y-progress-bar__text--in" }, [A._v(A._s(A.animate ? A.animate_text : A.percent) + "%")]) : A._e(), A._v(" "), A.$slots.icon ? t("div", { staticClass: "y-progress-bar__icon" }, [A._t("icon")], 2) : A._e()])]), A._v(" "), !A.textInside && A.showInfo ? t("div", { staticClass: "y-progress-bar__text y-progress-bar__text--out" }, [A._v(A._s(A.animate ? A.animate_text : A.percent) + "%")]) : A._e()]) : t("div", { staticClass: "y-progress-circle", style: { height: A.circleWidth + "px", width: A.circleWidth + "px" } }, [t("svg", { staticClass: "y-progress-circle__svg", attrs: { viewBox: "0 0 100 100" } }, [t("circle", { attrs: { cx: "50", cy: "50", r: "45", "stroke-width": "5", stroke: "rgb(234, 237, 244)", fill: "none" } }), A._v(" "), t("circle", { attrs: { cx: "50", cy: "50", r: "45", "stroke-width": "5", stroke: A.color, fill: "none", "stroke-linecap": "round", "stroke-dasharray": A.strokeDasharray, "stroke-dashoffset": A.strokeDashoffset } })]), A._v(" "), A.showInfo ? t("div", { staticClass: "y-progress-circle__text" }, [A._v(A._s(A.animate ? A.animate_text : A.percent) + "%")]) : A._e()])]);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { staticClass: "y-registerBox" }, [t("y-message-box", { attrs: { show_panel: A.show_panel }, on: { close: A.close } }, [t("template", { slot: "header" }, [t("div", { staticClass: "header" }, [A._v("\n                 注册分销商账号\n             ")])]), A._v(" "), t("template", { staticStyle: { padding: "0" }, slot: "body" }, [t("div", { staticClass: "y-registerBox__body" }, [t("div", { staticClass: "y-registerBox__box" }, [t("div", { staticClass: "y-registerBox__lable" }, [A._v("\n                  公司名称\n                ")]), A._v(" "), t("input", { staticClass: "y-registerBox__input", attrs: { type: "text", placeholder: "请输入公司名称" } })]), A._v(" "), t("div", { staticClass: "y-registerBox__box" }, [t("div", { staticClass: "y-registerBox__lable" }, [A._v("\n                  联系人姓名\n                ")]), A._v(" "), t("input", { staticClass: "y-registerBox__input", attrs: { type: "text", placeholder: "请输入姓名" } })]), A._v(" "), t("div", { staticClass: "y-registerBox__box" }, [t("div", { staticClass: "y-registerBox__lable" }, [A._v("\n                  联系人手机\n                ")]), A._v(" "), t("input", { staticClass: "y-registerBox__input", attrs: { type: "text", placeholder: "请输入手机" } })]), A._v(" "), t("div", { staticClass: "y-registerBox__box" }, [t("div", { staticClass: "y-registerBox__lable" }, [A._v("\n                  登录密码\n                ")]), A._v(" "), t("input", { staticClass: "y-registerBox__input", attrs: { type: "text", placeholder: "请输入登录密码" } })])])])], 2)], 1);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { staticClass: "y-search" }, [t("div", { staticClass: "y-search__box" }, [A.prefixIcon ? t("i", { staticClass: "icon iconfont", class: A.prefixIcon }) : A._e(), A._v(" "), t("input", { ref: "inputref", staticClass: "y-search__input", attrs: { placeholder: A.placeHolder }, domProps: { value: A.value }, on: { input: function input(e) {
            A.input(e.target.value);
          } } })]), A._v(" "), t("span", { staticClass: "y-search__btn", on: { click: function click(e) {
            return e.stopPropagation(), A.search(e);
          } } }, [A._v(A._s(A.btnText))]), A._v(" "), t("div", { directives: [{ name: "show", rawName: "v-show", value: A.disable, expression: "disable" }], staticClass: "y-search__mask" })]);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { staticClass: "y-steps" }, [A.show_tips ? t("div", { staticClass: "y-steps__currentTips", style: { left: A.currentTip_left, backgroundImage: "url(" + A.image + ")" } }) : A._e(), A._v(" "), t("div", { staticClass: "y-steps__bg" }, [t("y-row", { staticClass: "y-steps__childBox" }, A._l(A.steps_data, function (e, n) {
        return t("y-col", { key: n, staticClass: "y-steps__child" }, [n <= A.steps_current - 1 ? t("div", { staticClass: "y-steps__ball y-steps__ball--current", style: { background: A.color } }) : t("div", { staticClass: "y-steps__ball " }), A._v(" "), t("div", { staticClass: "y-steps__text" }, [A._t(e.slot)], 2)]);
      })), A._v(" "), t("div", { staticClass: "y-steps__currentBg", style: { width: A.currentBg_width, background: A.color } }), A._v(" "), t("div", { staticClass: "y-steps__bg2" })], 1)]);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { directives: [{ name: "show", rawName: "v-show", value: !A.closevalue, expression: "!closevalue" }], staticClass: "y-swiper", class: { fullWarp: A.fullScreen } }, [t("div", { ref: "wrap", staticClass: "y-swiper__wrap" }, [A._t("default")], 2), A._v(" "), t("div", { directives: [{ name: "show", rawName: "v-show", value: A.showIndicators, expression: "showIndicators" }], staticClass: "y-indicators" }, A._l(A.pages, function (e, n) {
        return t("div", { key: n, staticClass: "y-indicators__spot", class: { active: n === A.index } });
      })), A._v(" "), t("div", { directives: [{ name: "show", rawName: "v-show", value: A.showPage, expression: "showPage" }], staticClass: "y-page", class: { fullPage: A.fullScreen } }, [A._v("\n    " + A._s(A.index + 1) + " / " + A._s(A.totalIndex) + "\n  ")]), A._v(" "), t("div", { directives: [{ name: "show", rawName: "v-show", value: A.showBtn, expression: "showBtn" }], staticClass: "y-btn" }, [t("div", { staticClass: "y-btn__left", on: { click: A.btnPrev } }, [t("i", { staticClass: "iconfont icon-jiantou arrowleft" })]), A._v(" "), t("div", { staticClass: "y-btn__right", on: { click: A.btnNext } }, [t("i", { staticClass: "iconfont icon-jiantou" })])]), A._v(" "), t("div", { directives: [{ name: "show", rawName: "v-show", value: A.showClose, expression: "showClose" }], staticClass: "y-close", on: { click: A.close } }, [t("i", { staticClass: "iconfont icon-qingkong" })])]);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this.$createElement;return (this._self._c || A)("div", { staticClass: "y-swiperitem", class: this.fullImg }, [this._t("default")], 2);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("y-row", { staticClass: "y-tabBar", style: { color: A.color, background: A.backgroundColor, "border-top-color": A.borderStyle } }, A._l(A.tabbar.list, function (e, n) {
        return t("y-col", { key: "text", staticClass: "y-tabBar__child" }, [t("div", { on: { click: function click(e) {
              A.tabbarclick(n);
            } } }, [e.iconPath ? t("div", [[A.tabbar_current == n ? t("img", { staticClass: "y-tabBar__img", attrs: { src: e.selectedIconPath ? e.selectedIconPath : e.iconPath } }) : t("img", { staticClass: "y-tabBar__img", attrs: { src: e.iconPath } })]], 2) : A._e(), A._v(" "), A.tabbar_current == n ? t("div", { staticClass: "y-tabBar__text", class: { "y-tabBar__text--big": !e.iconPath }, style: { color: A.selectedColor } }, [A._v(A._s(e.text) + "\n           "), e.addention && !e.iconPath ? t("span", { staticClass: "y-tabBar__redpoint" }) : A._e()]) : t("div", { staticClass: "y-tabBar__text", class: { "y-tabBar__text--big": !e.iconPath }, style: { color: A.color } }, [A._v(A._s(e.text) + "\n         "), e.addention && !e.iconPath ? t("span", { staticClass: "y-tabBar__redpoint" }) : A._e()])])]);
      }));
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { staticClass: "y-yuncalendar" }, [t("y-calendar", { attrs: { show_thead: A.show_thead, show_calendar: A.show_calendar, date_data: A.date_data, position: A.position, height: A.height, width: A.width, color: A.color }, on: { "mask-click": A.maskClick, "click-date": A.clickDate } }, [t("template", { slot: "header" }, [t("div", { staticClass: "y-yuncalendar__header" }, [t("p", { staticClass: "y-yuncalendar__headText" }, [A._v("使用日期")]), A._v(" "), t("div", { staticClass: "y-yuncalendar__selectday" }, [t("i", { staticStyle: { background: "#ff7124" } }), A._v(A._s(A.select_date.format)), t("span", [A._v(A._s(A.selectDayWeek))])])])]), A._v(" "), t("template", { slot: "footer" }, [t("div", { staticClass: "y-yuncalendar__footer" }, [t("div", { staticClass: "y-yuncalendar__submit", staticStyle: { background: "#ff7124" } }, [A._v("确定")])])])], 2)], 1);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement;return (A._self._c || e)("button", { class: ["y-button", "y-button--" + A.type + " y-button--" + A.size, { "is-pill": A.pill, "is-disabled": A.disabled }], attrs: { type: A.nativeType, autofocus: A.autofocus }, on: { focus: A.handleFocus, click: A.handleClick, blur: A.handleBlur } }, [A._t("default")], 2);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { staticClass: "y-input", class: [A.inputSize ? "y-input--" + A.inputSize : ""] }, [[t("input", A._b({ directives: [{ name: "model", rawName: "v-model:value", value: A.currentValue, expression: "currentValue", arg: "value" }], staticClass: "y-input__inner", class: [{ "is-error": "error" == A.status, "is-disabled": A.inputDisabled, "y-input--prefix": A.$slots.prefix || A.prefixIcon, "y-input--suffix": A.$slots.suffix || A.suffixIcon, "is-noboder": A.noboder }], attrs: { type: "text" }, domProps: { value: A.currentValue }, on: { blur: A.handleBlur, focus: A.handleFocus, input: function input(e) {
            e.target.composing || (A.currentValue = e.target.value);
          } } }, "input", A.$props, !1)), A._v(" "), A.$slots.suffix || A.suffixIcon || A.showClear ? t("span", { staticClass: "y-input__suffix" }, [A.showClear ? [t("span", { staticClass: "y-input__suffix-inner" }, [t("i", { staticClass: "iconfont icon-qingkong", on: { click: A.clear } })])] : [A.suffixIcon ? t("span", { staticClass: "y-input__suffix-inner" }, [t("i", { staticClass: "iconfont", class: A.suffixIcon })]) : A._e()]], 2) : A._e(), A._v(" "), A.$slots.prefix || A.prefixIcon || A.showClear ? t("span", { staticClass: "y-input__prefix" }, [A.prefixIcon ? t("span", { staticClass: "y-input__prefix-inner" }, [t("i", { staticClass: "iconfont", class: A.prefixIcon })]) : A._e()]) : A._e()]], 2);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { staticClass: "y-inputNumber" }, [t("div", { staticClass: "y-inputNumber__btn minus", class: { disabled: A.minusDisabled }, on: { click: A.minus } }, [A._v("\n        -\n    ")]), A._v(" "), t("div", { staticClass: "y-inputNumber__input" }, [t("input", { attrs: { disabled: A.disabled, autofocus: A.autofocus, readonly: A.readonly, placeholder: A.placeholder }, domProps: { value: A.currentValue }, on: { input: A.handleInput, change: A.handleChange, focus: A.handleFocus, blur: A.handleBlur, keydown: function keydown(e) {
            return e.stopPropagation(), A.keyDown(e);
          } } })]), A._v(" "), t("div", { staticClass: "y-inputNumber__btn plus", class: { disabled: A.plusDisabled }, on: { click: A.plus } }, [A._v("\n        +\n    ")])]);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { staticClass: "y-ranger" }, [t("input", { attrs: { type: "hidden" }, domProps: { value: A.value } }), A._v(" "), t("transition", { attrs: { name: "fade" } }, [!A.range && A.displayValue ? t("div", { directives: [{ name: "show", rawName: "v-show", value: !A.range && A.dragging && A.displayValue, expression: "!range && dragging && displayValue" }], staticClass: "y-ranger__valuebox", style: { left: A.percent + "%" } }, [A._t("slotValue", [t("div", { staticClass: "y-ranger__value", style: { backgroundColor: A.valueColor } }, [t("span", { staticClass: "y-ranger--text" }, [A._v(A._s(A.percentValue))])])])], 2) : A._e()]), A._v(" "), t("transition", { attrs: { name: "fade" } }, [A.range ? t("div", { directives: [{ name: "show", rawName: "v-show", value: A.displayValue && A.firstValueShow, expression: "displayValue && firstValueShow" }], staticClass: "y-ranger__valuebox", style: { left: A.percent + "%" } }, [A._t("slotFirstValue", [t("div", { staticClass: "y-ranger__value", style: { backgroundColor: A.valueColor } }, [t("span", { staticClass: "y-ranger--text" }, [A._v(A._s(A.value[0]))])])])], 2) : A._e()]), A._v(" "), t("transition", { attrs: { name: "fade" } }, [A.range ? t("div", { directives: [{ name: "show", rawName: "v-show", value: A.displayValue && A.secondValueShow, expression: "displayValue && secondValueShow" }], staticClass: "y-ranger__valuebox", style: { left: A.percentSecond + "%" } }, [A._t("slotSecondValue", [t("div", { staticClass: "y-ranger__value", style: { backgroundColor: A.valueColor } }, [t("span", { staticClass: "y-ranger--text" }, [A._v(A._s(A.value[1]))])])])], 2) : A._e()]), A._v(" "), t("div", { staticClass: "y-ranger__track", style: { backgroundColor: A.trackColor } }), A._v(" "), t("div", { staticClass: "y-ranger__gap", style: { backgroundColor: A.trackColor } }, A._l(A.gap, function (A, e) {
        return t("div", { key: e, staticClass: "y-ranger__stop", style: { left: A + "%" } });
      })), A._v(" "), A.range ? A._e() : t("div", { staticClass: "y-ranger__fill", style: { width: A.percent + "%", backgroundColor: A.fillColor } }), A._v(" "), A.range ? t("div", { staticClass: "y-ranger__fill", style: { width: Math.abs(A.percentSecond - A.percent) + "%", left: Math.min(A.percentSecond, A.percent) + "%", backgroundColor: A.fillColor } }) : A._e(), A._v(" "), t("div", { staticClass: "y-ranger__thumb firstBtn", style: { left: A.percent + "%" } }, [t("div", { staticClass: "y-ranger--inner", style: { borderColor: A.thumbColor } })]), A._v(" "), A.range ? t("div", { staticClass: "y-ranger__thumb secondBtn", style: { left: A.percentSecond + "%" } }, [t("div", { staticClass: "y-ranger--inner", style: { borderColor: A.thumbColor } })]) : A._e()], 1);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("div", { staticClass: "y-scroll" }, [t("div", { staticClass: "y-scroll__content ", class: { "is-dropped": A.upDropped || A.bottomDropped }, style: { transform: "translate3d(0, " + A.top + "px, 0)", webkitTransform: "translate3d(0, " + A.top + "px, 0)" } }, [A._t("upContent", [A.upMethod ? t("div", { staticClass: "y-scroll__top" }, [t("div", { directives: [{ name: "show", rawName: "v-show", value: 0 == A.upStatus, expression: "upStatus == 0" }], staticClass: "y-scroll--load" }, [t("span", { staticClass: "y-scroll__text" }, [A._v(A._s(A.upPullText))])]), A._v(" "), t("div", { directives: [{ name: "show", rawName: "v-show", value: 1 == A.upStatus, expression: "upStatus == 1" }], staticClass: "y-scroll--load" }, [t("span", { staticClass: "y-scroll__text" }, [A._v(A._s(A.upDropText))])]), A._v(" "), t("div", { directives: [{ name: "show", rawName: "v-show", value: 2 == A.upStatus, expression: "upStatus == 2" }], staticClass: "y-scroll--load" }, [A.upIcon ? t("img", { staticClass: "icon-img", attrs: { src: A.upIcon } }) : A._e(), A._v(" "), A.upIcon ? A._e() : t("i", { staticClass: "iconfont icon-loading" }), A._v(" "), t("span", { staticClass: "y-scroll__text" }, [A._v(A._s(A.upLoadText))])])]) : A._e()]), A._v(" "), A._t("default"), A._v(" "), A._t("bottomContent", [A.bottomMethod && A.bottomShow ? t("div", { staticClass: "y-scroll__bottom" }, [A.bottomIcon ? t("img", { staticClass: "icon-img", attrs: { src: A.bottomIcon } }) : A._e(), A._v(" "), A.bottomIcon ? A._e() : t("i", { staticClass: "iconfont icon-loading" }), A._v(" "), t("span", { staticClass: "y-scroll__text" }, [A._v(A._s(A.bottomLoadText))])]) : A._e()])], 2)]);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("transition", { attrs: { name: A.transition_name } }, [A.visible ? t("div", { staticClass: "y-toast" }, [A.show_mask ? t("div", { staticClass: "y-toast__mask", on: { click: A.close } }) : A._e(), A._v(" "), t("div", { class: ["y-toast__panel"], style: { left: A.left, top: A.top, width: A.width } }, [t("div", { staticClass: "y-toast__content" }, [A._v(A._s(A.message))]), A._v(" "), A.show_close ? t("i", { class: ["y-toast__close", "iconfont", "icon-qingkong"], on: { click: A.close } }) : A._e()])]) : A._e()]);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("y-popup", { staticClass: "y-calendar", class: [A.classname], attrs: { position: A.position, height: A.height, width: A.width }, on: { "mask-click": A.maskClick }, model: { value: A.show_calendar, callback: function callback(e) {
            A.show_calendar = e;
          }, expression: "show_calendar" } }, [t("template", { slot: "content" }, [t("div", { staticClass: "y-calendar__header" }, [A._t("header")], 2), A._v(" "), t("div", { staticClass: "content" }, [t("div", { staticClass: "y-calendar__weeks" }, [t("span", { style: { color: A.color } }, [A._v("日")]), A._v(" "), t("span", [A._v("一")]), A._v(" "), t("span", [A._v("二")]), A._v(" "), t("span", [A._v("三")]), A._v(" "), t("span", [A._v("四")]), A._v(" "), t("span", [A._v("五")]), A._v(" "), t("span", { style: { color: A.color } }, [A._v("六")])]), A._v(" "), t("div", { staticClass: "y-calendar__content", on: { scroll: A.greet } }, [t("div", { staticClass: "y-calendar__tables" }, A._l(A.calendarData, function (e, n) {
        return t("table", { staticClass: "y-calendar__table", attrs: { cellpadding: "0", cellspacing: "0" } }, [A.show_thead ? t("thead", [t("tr", { staticClass: "y-calendar__month" }, [t("td"), A._v(" "), t("td"), A._v(" "), t("td"), A._v(" "), t("td"), A._v(" "), t("td"), A._v(" "), t("td", { attrs: { colspan: "2" } }, [t("div", { staticClass: "y-calendar__thead" }, [A._v("\n                                        " + A._s(e.content[0][6].year) + "-" + A._s(e.content[0][6].month) + "\n                                    ")])])])]) : A._e(), A._v(" "), t("tbody", A._l(e.content, function (e, r) {
          return t("tr", A._l(e, function (e, a) {
            return t("td", { on: { click: function click(t) {
                  A.clickDate(e.format, n, r, a);
                } } }, [t("div", { staticClass: "y-calendar__td" }, [e.day ? [t("div", { staticClass: "y-calendar__tdcontent", class: { "y-calendar__tdcontent--select": e.select, "y-calendar__tdcontent--forbit": e.forbit, "y-calendar__tdcontent--between": e.between }, style: { background: e.select ? A.color : "" } }, [e.label ? t("div", { staticClass: "y-calendar__label", style: { background: A.color } }, [A._v("\n                                                    " + A._s(e.label) + "\n                                                ")]) : A._e(), A._v(" "), t("div", { staticClass: "day" }, [e.isToday ? [A._v("\n                                                        今天\n                                                    ")] : [A._v("\n                                                        " + A._s(e.day) + "\n                                                    ")]], 2), A._v(" "), e.text ? t("div", { staticClass: "text", style: { color: e.select ? "#fff" : A.color } }, [A._v(A._s(e.text))]) : A._e()])] : A._e()], 2)]);
          }));
        }))]);
      }))])]), A._v(" "), t("div", { staticClass: "y-calendar__footer" }, [A._t("footer")], 2)])], 2);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("transition", { attrs: { name: A.transition_name } }, [A.show_panel ? t("div", { staticClass: "y-messageBox" }, [A.show_mask ? t("div", { staticClass: "y-messageBox__mask", on: { click: A.closeDialog } }) : A._e(), A._v(" "), t("div", { staticClass: "y-messageBox__panel" }, [A.show_close ? t("div", [[A.$slots.close ? A._t("close") : t("i", { staticClass: "y-messageBox__close iconfont icon-qingkong", on: { click: A.closeDialog } })]], 2) : A._e(), A._v(" "), t("div", { directives: [{ name: "show", rawName: "v-show", value: A.show_header || A.$slots.header, expression: "show_header||$slots.header" }], staticClass: "y-messageBox__header" }, [A.$slots.header ? A._t("header") : A._e()], 2), A._v(" "), t("div", { staticClass: "y-messageBox__body" }, [A._t("body")], 2), A._v(" "), t("div", { directives: [{ name: "show", rawName: "v-show", value: A.show_footer, expression: "show_footer" }], staticClass: "y-messageBox__footer" }, [A.$slots.footer ? A._t("footer") : t("div", { staticClass: "default", on: { click: A.closeDialog } }, [t("span", [A._v("确定")])])], 2)])]) : A._e()]);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.d(e, "a", function () {
      return n;
    }), t.d(e, "b", function () {
      return r;
    });var n = function n() {
      var A = this,
          e = A.$createElement,
          t = A._self._c || e;return t("transition", { attrs: { name: "popup-fade", "enter-class": A.transitionClass, "leave-to-class": A.transitionClass } }, [t("div", { directives: [{ name: "show", rawName: "v-show", value: A.currentShow, expression: "currentShow" }], staticClass: "y-popup" }, [A.showMask ? t("div", { staticClass: "y-popup__mask", on: { click: A.maskClick } }) : A._e(), A._v(" "), t("div", { staticClass: "y-popup__panel", class: [A.panelClass], style: A.panelStyle }, [A.$slots.content ? A._t("content") : A._e()], 2)])]);
    },
        r = [];n._withStripped = !0;
  }, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(32),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(54),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/widgets/ycfCalendar/src/ycfCalendar.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(33),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(55),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/widgets/ycfMessageBox/src/ycfMessageBox.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (A) {
      return typeof A === "undefined" ? "undefined" : _typeof(A);
    } : function (A) {
      return A && "function" == typeof Symbol && A.constructor === Symbol && A !== Symbol.prototype ? "symbol" : typeof A === "undefined" ? "undefined" : _typeof(A);
    };function r(A, e, t) {
      if (!t) {
        var n = Object.getOwnPropertyNames(A),
            r = Object.getOwnPropertyNames(e);if (n.length != r.length) return !1;
      }for (var a = t || n, o = 0; o < a.length; o++) {
        var i = a[o];if (A[i] !== e[i]) return !1;
      }return !0;
    }function a(A, e, t) {
      return new Date(A, e - 1, t).getTime();
    }function o(A) {
      return i(A, "overflow") + i(A, "overflow-y") + i(A, "overflow-x");
    }function i(A, e) {
      return "undefined" != typeof getComputedStyle ? getComputedStyle(A, null).getPropertyValue(e) : A.style[e];
    }e.isArray = function (A) {
      return Array.isArray ? Array.isArray(A) : "[object Array]" === Object.prototype.toString.call(A);
    }, e.isNumber = function (A) {
      return 1 * A == 1 * A;
    }, e.deepClone = function A(e) {
      var t;if (null == e || "object" != (void 0 === e ? "undefined" : n(e))) return e;if (e instanceof Date) return (t = new Date()).setTime(e.getTime()), t;if (e instanceof Array) {
        t = [];for (var r = 0, a = e.length; r < a; r++) {
          t[r] = A(e[r]);
        }return t;
      }if (e instanceof Object) {
        for (var o in t = {}, e) {
          e.hasOwnProperty(o) && (t[o] = A(e[o]));
        }return t;
      }
    }, e.isArrDuckEqual = function (A, e, t) {
      if (A.length != e.length) return !1;for (var n = 0; n < A.length; n++) {
        if (!r(A[n], e[n], t)) return !1;
      }return !0;
    }, e.duckIndexOf = function (A, e, t) {
      var n = -1;return A.forEach(function (A, a) {
        -1 == n && r(A, e, t) && (n = a);
      }), n;
    }, e.isObjectDuckEqual = r, e.getStamp = a, e.getMonthDateNum = function (A, e) {
      return (a(A, 1 * e + 1, 1) - a(A, e, 1)) / 864e5;
    }, e.getNum = function (A) {
      return A.replace(/[^\d|.]*/g, "");
    }, e.getLetter = function (A) {
      return A.replace(/[^a-z]+/gi, "");
    }, e.range = function (A, e, t) {
      return A > e && (A = e), A < t && (A = t), A;
    }, e.getUrlParam = function (A) {
      var e = new RegExp("(^|&)" + A + "=([^&]*)(&|$)"),
          t = window.location.search.substr(1).match(e);return null != t ? unescape(t[2]) : null;
    }, e.getRatio = function () {
      var A = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;return window.devicePixelRatio || A;
    }, e.removeArr = function (A, e) {
      if (A.length) {
        var t = A.indexOf(e);return t > -1 ? A.splice(t, 1) : void 0;
      }
    }, e.throttle = function (A, e) {
      var t = null,
          n = 0;return function () {
        if (!t) {
          var r = this,
              a = arguments,
              o = function o() {
            n = Date.now(), t = !1, A.apply(r, a);
          };Date.now() - n >= e ? o() : t = setTimeout(o, e);
        }
      };
    }, e.some = function (A, e) {
      for (var t = !1, n = 0, r = A.length; n < r; n++) {
        if (e(A[n])) {
          t = !0;break;
        }
      }return t;
    }, e.noop = function () {}, e.find = function (A, e) {
      for (var t = void 0, n = 0, r = A.length; n < r; n++) {
        if (e(A[n])) {
          t = A[n];break;
        }
      }return t;
    }, e.scrollParent = function (A) {
      for (var e = A; e;) {
        var t = e === document.body,
            n = e === document.documentElement;if (t || n) break;if (!e.parentNode) break;if (/(scroll|auto)/.test(o(e))) return e;e = e.parentNode;
      }return window;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Proxy = void 0;var n,
        r = t(12),
        a = (n = r) && n.__esModule ? n : { default: n };e.Proxy = function (A, e) {
      if (!e.proxy) return Promise.reject(null);var t = e.proxy;return new Promise(function (n, r) {
        var o = a.default.SUPPORT_CORS_XHR && a.default.SUPPORT_RESPONSE_TYPE ? "blob" : "text",
            i = a.default.SUPPORT_CORS_XHR ? new XMLHttpRequest() : new XDomainRequest();if (i.onload = function () {
          if (i instanceof XMLHttpRequest) {
            if (200 === i.status) {
              if ("text" === o) n(i.response);else {
                var A = new FileReader();A.addEventListener("load", function () {
                  return n(A.result);
                }, !1), A.addEventListener("error", function (A) {
                  return r(A);
                }, !1), A.readAsDataURL(i.response);
              }
            } else r("");
          } else n(i.responseText);
        }, i.onerror = r, i.open("GET", t + "?url=" + encodeURIComponent(A) + "&responseType=" + o), "text" !== o && i instanceof XMLHttpRequest && (i.responseType = o), e.imageTimeout) {
          var s = e.imageTimeout;i.timeout = s, i.ontimeout = function () {
            return r("");
          };
        }i.send();
      });
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.FontMetrics = void 0;var n = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        r = t(6);e.FontMetrics = function () {
      function A(e) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this._data = {}, this._document = e;
      }return n(A, [{ key: "_parseMetrics", value: function value(A) {
          var e = this._document.createElement("div"),
              t = this._document.createElement("img"),
              n = this._document.createElement("span"),
              a = this._document.body;if (!a) throw new Error("");e.style.visibility = "hidden", e.style.fontFamily = A.fontFamily, e.style.fontSize = A.fontSize, e.style.margin = "0", e.style.padding = "0", a.appendChild(e), t.src = r.SMALL_IMAGE, t.width = 1, t.height = 1, t.style.margin = "0", t.style.padding = "0", t.style.verticalAlign = "baseline", n.style.fontFamily = A.fontFamily, n.style.fontSize = A.fontSize, n.style.margin = "0", n.style.padding = "0", n.appendChild(this._document.createTextNode("Hidden Text")), e.appendChild(n), e.appendChild(t);var o = t.offsetTop - n.offsetTop + 2;e.removeChild(n), e.appendChild(this._document.createTextNode("Hidden Text")), e.style.lineHeight = "normal", t.style.verticalAlign = "super";var i = t.offsetTop - e.offsetTop + 2;return a.removeChild(e), { baseline: o, middle: i };
        } }, { key: "getMetrics", value: function value(A) {
          var e = A.fontFamily + " " + A.fontSize;return void 0 === this._data[e] && (this._data[e] = this._parseMetrics(A)), this._data[e];
        } }]), A;
    }();
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.breakWords = e.fromCodePoint = e.toCodePoints = void 0;var n = t(181);Object.defineProperty(e, "toCodePoints", { enumerable: !0, get: function get() {
        return n.toCodePoints;
      } }), Object.defineProperty(e, "fromCodePoint", { enumerable: !0, get: function get() {
        return n.fromCodePoint;
      } });var r,
        a = t(7),
        o = ((r = a) && r.__esModule, t(68));e.breakWords = function (A, e) {
      for (var t = (0, n.LineBreaker)(A, { lineBreak: e.style.lineBreak, wordBreak: e.style.overflowWrap === o.OVERFLOW_WRAP.BREAK_WORD ? "break-word" : e.style.wordBreak }), r = [], a = void 0; !(a = t.next()).done;) {
        r.push(a.value.slice());
      }return r;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }();var r = function () {
      function A(e) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.element = e;
      }return n(A, [{ key: "render", value: function value(A) {
          var e = this;this.options = A, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.canvas.width = Math.floor(A.width) * A.scale, this.canvas.height = Math.floor(A.height) * A.scale, this.canvas.style.width = A.width + "px", this.canvas.style.height = A.height + "px", A.logger.log("ForeignObject renderer initialized (" + A.width + "x" + A.height + " at " + A.x + "," + A.y + ") with scale " + A.scale);var t = a(Math.max(A.windowWidth, A.width) * A.scale, Math.max(A.windowHeight, A.height) * A.scale, A.scrollX * A.scale, A.scrollY * A.scale, this.element);return o(t).then(function (t) {
            return A.backgroundColor && (e.ctx.fillStyle = A.backgroundColor.toString(), e.ctx.fillRect(0, 0, A.width * A.scale, A.height * A.scale)), e.ctx.drawImage(t, -A.x * A.scale, -A.y * A.scale), e.canvas;
          });
        } }]), A;
    }();e.default = r;var a = e.createForeignObjectSVG = function (A, e, t, n, r) {
      var a = "http://www.w3.org/2000/svg",
          o = document.createElementNS(a, "svg"),
          i = document.createElementNS(a, "foreignObject");return o.setAttributeNS(null, "width", A), o.setAttributeNS(null, "height", e), i.setAttributeNS(null, "width", "100%"), i.setAttributeNS(null, "height", "100%"), i.setAttributeNS(null, "x", t), i.setAttributeNS(null, "y", n), i.setAttributeNS(null, "externalResourcesRequired", "true"), o.appendChild(i), i.appendChild(r), o;
    },
        o = e.loadSerializedSVG = function (A) {
      return new Promise(function (e, t) {
        var n = new Image();n.onload = function () {
          return e(n);
        }, n.onerror = t, n.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(A));
      });
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTextBounds = e.TextBounds = void 0;var n,
        r = t(3),
        a = t(38),
        o = t(12),
        i = (n = o) && n.__esModule ? n : { default: n },
        s = t(62);var l = e.TextBounds = function A(e, t) {
      !function (A, e) {
        if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, A), this.text = e, this.bounds = t;
    },
        u = (e.parseTextBounds = function (A, e, t) {
      for (var n = 0 !== e.style.letterSpacing ? (0, s.toCodePoints)(A).map(function (A) {
        return (0, s.fromCodePoint)(A);
      }) : (0, s.breakWords)(A, e), r = n.length, o = t.parentNode ? t.parentNode.ownerDocument.defaultView : null, B = o ? o.pageXOffset : 0, d = o ? o.pageYOffset : 0, f = [], h = 0, g = 0; g < r; g++) {
        var w = n[g];if (e.style.textDecoration !== a.TEXT_DECORATION.NONE || w.trim().length > 0) {
          if (i.default.SUPPORT_RANGE_BOUNDS) f.push(new l(w, c(t, h, w.length, B, d)));else {
            var Q = t.splitText(w.length);f.push(new l(w, u(t, B, d))), t = Q;
          }
        } else i.default.SUPPORT_RANGE_BOUNDS || (t = t.splitText(w.length));h += w.length;
      }return f;
    }, function (A, e, t) {
      var n = A.ownerDocument.createElement("html2canvaswrapper");n.appendChild(A.cloneNode(!0));var a = A.parentNode;if (a) {
        a.replaceChild(n, A);var o = (0, r.parseBounds)(n, e, t);return n.firstChild && a.replaceChild(n.firstChild, n), o;
      }return new r.Bounds(0, 0, 0, 0);
    }),
        c = function c(A, e, t, n, a) {
      var o = A.ownerDocument.createRange();return o.setStart(A, e), o.setEnd(A, e + t), r.Bounds.fromClientRect(o.getBoundingClientRect(), n, a);
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.reformatInputBounds = e.inlineSelectElement = e.inlineTextAreaElement = e.inlineInputElement = e.getInputBorderRadius = e.INPUT_BACKGROUND = e.INPUT_BORDERS = e.INPUT_COLOR = void 0;var n = c(t(13)),
        r = t(9),
        a = t(37),
        o = c(t(177)),
        i = c(t(15)),
        s = c(t(2)),
        l = c(t(4)),
        u = (t(3), t(64), t(6));function c(A) {
      return A && A.__esModule ? A : { default: A };
    }e.INPUT_COLOR = new s.default([42, 42, 42]);var B = new s.default([165, 165, 165]),
        d = new s.default([222, 222, 222]),
        f = { borderWidth: 1, borderColor: B, borderStyle: a.BORDER_STYLE.SOLID },
        h = (e.INPUT_BORDERS = [f, f, f, f], e.INPUT_BACKGROUND = { backgroundColor: d, backgroundImage: [], backgroundClip: r.BACKGROUND_CLIP.PADDING_BOX, backgroundOrigin: r.BACKGROUND_ORIGIN.PADDING_BOX }, new l.default("50%")),
        g = [h, h],
        w = [g, g, g, g],
        Q = new l.default("3px"),
        p = [Q, Q],
        U = [p, p, p, p],
        C = (e.getInputBorderRadius = function (A) {
      return "radio" === A.type ? w : U;
    }, e.inlineInputElement = function (A, e) {
      if ("radio" === A.type || "checkbox" === A.type) {
        if (A.checked) {
          var t = Math.min(e.bounds.width, e.bounds.height);e.childNodes.push("checkbox" === A.type ? [new i.default(e.bounds.left + .39363 * t, e.bounds.top + .79 * t), new i.default(e.bounds.left + .16 * t, e.bounds.top + .5549 * t), new i.default(e.bounds.left + .27347 * t, e.bounds.top + .44071 * t), new i.default(e.bounds.left + .39694 * t, e.bounds.top + .5649 * t), new i.default(e.bounds.left + .72983 * t, e.bounds.top + .23 * t), new i.default(e.bounds.left + .84 * t, e.bounds.top + .34085 * t), new i.default(e.bounds.left + .39363 * t, e.bounds.top + .79 * t)] : new o.default(e.bounds.left + t / 4, e.bounds.top + t / 4, t / 4));
        }
      } else C(F(A), A, e, !1);
    }, e.inlineTextAreaElement = function (A, e) {
      C(A.value, A, e, !0);
    }, e.inlineSelectElement = function (A, e) {
      var t = A.options[A.selectedIndex || 0];C(t && t.text || "", A, e, !1);
    }, e.reformatInputBounds = function (A) {
      return A.width > A.height ? (A.left += (A.width - A.height) / 2, A.width = A.height) : A.width < A.height && (A.top += (A.height - A.width) / 2, A.height = A.width), A;
    }, function (A, e, t, r) {
      var a = e.ownerDocument.body;if (A.length > 0 && a) {
        var o = e.ownerDocument.createElement("html2canvaswrapper");(0, u.copyCSSStyles)(e.ownerDocument.defaultView.getComputedStyle(e, null), o), o.style.position = "absolute", o.style.left = t.bounds.left + "px", o.style.top = t.bounds.top + "px", r || (o.style.whiteSpace = "nowrap");var i = e.ownerDocument.createTextNode(A);o.appendChild(i), a.appendChild(o), t.childNodes.push(n.default.fromTextNode(i, t)), a.removeChild(o);
      }
    }),
        F = function F(A) {
      var e = "password" === A.type ? new Array(A.value.length + 1).join("•") : A.value;return 0 === e.length ? A.placeholder || "" : e;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = e.TEXT_TRANSFORM = { NONE: 0, LOWERCASE: 1, UPPERCASE: 2, CAPITALIZE: 3 };e.parseTextTransform = function (A) {
      switch (A) {case "uppercase":
          return n.UPPERCASE;case "lowercase":
          return n.LOWERCASE;case "capitalize":
          return n.CAPITALIZE;}return n.NONE;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = e.POSITION = { STATIC: 0, RELATIVE: 1, ABSOLUTE: 2, FIXED: 3, STICKY: 4 };e.parsePosition = function (A) {
      switch (A) {case "relative":
          return n.RELATIVE;case "absolute":
          return n.ABSOLUTE;case "fixed":
          return n.FIXED;case "sticky":
          return n.STICKY;}return n.STATIC;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = e.OVERFLOW_WRAP = { NORMAL: 0, BREAK_WORD: 1 };e.parseOverflowWrap = function (A) {
      switch (A) {case "break-word":
          return n.BREAK_WORD;case "normal":default:
          return n.NORMAL;}
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parsePadding = e.PADDING_SIDES = void 0;var n,
        r = t(4),
        a = (n = r) && n.__esModule ? n : { default: n };e.PADDING_SIDES = { TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3 };var o = ["top", "right", "bottom", "left"];e.parsePadding = function (A) {
      return o.map(function (e) {
        return new a.default(A.getPropertyValue("padding-" + e));
      });
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }();var r = function () {
      function A(e, t, n) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.enabled = "undefined" != typeof window && e, this.start = n || Date.now(), this.id = t;
      }return n(A, [{ key: "child", value: function value(e) {
          return new A(this.enabled, e, this.start);
        } }, { key: "log", value: function value() {
          if (this.enabled && window.console && window.console.log) {
            for (var A = arguments.length, e = Array(A), t = 0; t < A; t++) {
              e[t] = arguments[t];
            }Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - this.start + "ms", this.id ? "html2canvas (" + this.id + "):" : "html2canvas:"].concat([].slice.call(e, 0)));
          }
        } }, { key: "error", value: function value() {
          if (this.enabled && window.console && window.console.error) {
            for (var A = arguments.length, e = Array(A), t = 0; t < A; t++) {
              e[t] = arguments[t];
            }Function.prototype.bind.call(window.console.error, window.console).apply(window.console, [Date.now() - this.start + "ms", this.id ? "html2canvas (" + this.id + "):" : "html2canvas:"].concat([].slice.call(e, 0)));
          }
        } }]), A;
    }();e.default = r;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        r = t(16),
        a = t(38);var o = function o(A, e) {
      var t = Math.max.apply(null, A.colorStops.map(function (A) {
        return A.stop;
      })),
          n = 1 / Math.max(1, t);A.colorStops.forEach(function (A) {
        e.addColorStop(n * A.stop, A.color.toString());
      });
    },
        i = function () {
      function A(e) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.canvas = e || document.createElement("canvas");
      }return n(A, [{ key: "render", value: function value(A) {
          this.ctx = this.canvas.getContext("2d"), this.options = A, this.canvas.width = Math.floor(A.width * A.scale), this.canvas.height = Math.floor(A.height * A.scale), this.canvas.style.width = A.width + "px", this.canvas.style.height = A.height + "px", this.ctx.scale(this.options.scale, this.options.scale), this.ctx.translate(-A.x, -A.y), this.ctx.textBaseline = "bottom", A.logger.log("Canvas renderer initialized (" + A.width + "x" + A.height + " at " + A.x + "," + A.y + ") with scale " + this.options.scale);
        } }, { key: "clip", value: function value(A, e) {
          var t = this;A.length && (this.ctx.save(), A.forEach(function (A) {
            t.path(A), t.ctx.clip();
          })), e(), A.length && this.ctx.restore();
        } }, { key: "drawImage", value: function value(A, e, t) {
          this.ctx.drawImage(A, e.left, e.top, e.width, e.height, t.left, t.top, t.width, t.height);
        } }, { key: "drawShape", value: function value(A, e) {
          this.path(A), this.ctx.fillStyle = e.toString(), this.ctx.fill();
        } }, { key: "fill", value: function value(A) {
          this.ctx.fillStyle = A.toString(), this.ctx.fill();
        } }, { key: "getTarget", value: function value() {
          return this.canvas.getContext("2d").setTransform(1, 0, 0, 1, 0, 0), Promise.resolve(this.canvas);
        } }, { key: "path", value: function value(A) {
          var e = this;this.ctx.beginPath(), Array.isArray(A) ? A.forEach(function (A, t) {
            var n = A.type === r.PATH.VECTOR ? A : A.start;0 === t ? e.ctx.moveTo(n.x, n.y) : e.ctx.lineTo(n.x, n.y), A.type === r.PATH.BEZIER_CURVE && e.ctx.bezierCurveTo(A.startControl.x, A.startControl.y, A.endControl.x, A.endControl.y, A.end.x, A.end.y);
          }) : this.ctx.arc(A.x + A.radius, A.y + A.radius, A.radius, 0, 2 * Math.PI, !0), this.ctx.closePath();
        } }, { key: "rectangle", value: function value(A, e, t, n, r) {
          this.ctx.fillStyle = r.toString(), this.ctx.fillRect(A, e, t, n);
        } }, { key: "renderLinearGradient", value: function value(A, e) {
          var t = this.ctx.createLinearGradient(A.left + e.direction.x1, A.top + e.direction.y1, A.left + e.direction.x0, A.top + e.direction.y0);o(e, t), this.ctx.fillStyle = t, this.ctx.fillRect(A.left, A.top, A.width, A.height);
        } }, { key: "renderRadialGradient", value: function value(A, e) {
          var t = this,
              n = A.left + e.center.x,
              r = A.top + e.center.y,
              a = this.ctx.createRadialGradient(n, r, 0, n, r, e.radius.x);if (a) if (o(e, a), this.ctx.fillStyle = a, e.radius.x !== e.radius.y) {
            var i = A.left + .5 * A.width,
                s = A.top + .5 * A.height,
                l = e.radius.y / e.radius.x,
                u = 1 / l;this.transform(i, s, [1, 0, 0, l, 0, 0], function () {
              return t.ctx.fillRect(A.left, u * (A.top - s) + s, A.width, A.height * u);
            });
          } else this.ctx.fillRect(A.left, A.top, A.width, A.height);
        } }, { key: "renderRepeat", value: function value(A, e, t, n, r) {
          this.path(A), this.ctx.fillStyle = this.ctx.createPattern(this.resizeImage(e, t), "repeat"), this.ctx.translate(n, r), this.ctx.fill(), this.ctx.translate(-n, -r);
        } }, { key: "renderTextNode", value: function value(A, e, t, n, r) {
          var o = this;this.ctx.font = [t.fontStyle, t.fontVariant, t.fontWeight, t.fontSize, t.fontFamily].join(" "), A.forEach(function (A) {
            if (o.ctx.fillStyle = e.toString(), r && A.text.trim().length ? r.slice(0).reverse().forEach(function (e) {
              o.ctx.shadowColor = e.color.toString(), o.ctx.shadowOffsetX = e.offsetX * o.options.scale, o.ctx.shadowOffsetY = e.offsetY * o.options.scale, o.ctx.shadowBlur = e.blur, o.ctx.fillText(A.text, A.bounds.left, A.bounds.top + A.bounds.height);
            }) : o.ctx.fillText(A.text, A.bounds.left, A.bounds.top + A.bounds.height), null !== n) {
              var i = n.textDecorationColor || e;n.textDecorationLine.forEach(function (e) {
                switch (e) {case a.TEXT_DECORATION_LINE.UNDERLINE:
                    var n = o.options.fontMetrics.getMetrics(t).baseline;o.rectangle(A.bounds.left, Math.round(A.bounds.top + n), A.bounds.width, 1, i);break;case a.TEXT_DECORATION_LINE.OVERLINE:
                    o.rectangle(A.bounds.left, Math.round(A.bounds.top), A.bounds.width, 1, i);break;case a.TEXT_DECORATION_LINE.LINE_THROUGH:
                    var r = o.options.fontMetrics.getMetrics(t).middle;o.rectangle(A.bounds.left, Math.ceil(A.bounds.top + r), A.bounds.width, 1, i);}
              });
            }
          });
        } }, { key: "resizeImage", value: function value(A, e) {
          if (A.width === e.width && A.height === e.height) return A;var t = this.canvas.ownerDocument.createElement("canvas");return t.width = e.width, t.height = e.height, t.getContext("2d").drawImage(A, 0, 0, A.width, A.height, 0, 0, e.width, e.height), t;
        } }, { key: "setOpacity", value: function value(A) {
          this.ctx.globalAlpha = A;
        } }, { key: "transform", value: function value(A, e, t, n) {
          this.ctx.save(), this.ctx.translate(A, e), this.ctx.transform(t[0], t[1], t[2], t[3], t[4], t[5]), this.ctx.translate(-A, -e), n(), this.ctx.restore();
        } }]), A;
    }();e.default = i;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (A) {
      return typeof A === "undefined" ? "undefined" : _typeof(A);
    } : function (A) {
      return A && "function" == typeof Symbol && A.constructor === Symbol && A !== Symbol.prototype ? "symbol" : typeof A === "undefined" ? "undefined" : _typeof(A);
    },
        r = { formatNum: function formatNum(A) {
        return (A = ~~A) < 10 ? "0" + A : A;
      }, getYMD: function getYMD() {
        for (var A = arguments.length, e = Array(A), t = 0; t < A; t++) {
          e[t] = arguments[t];
        }var n = e.length;return 1 === n ? e[0][0] + "-" + r.formatNum(~~e[0][1]) + "-" + r.formatNum(~~e[0][2]) : 3 === n ? e[0] + "-" + r.formatNum(~~e[1]) + "-" + r.formatNum(~~e[2]) : r.getCurDate();
      }, getCurDate: function getCurDate(A, e) {
        e = e || "-";var t = new Date(),
            n = t.getFullYear(),
            a = r.formatNum(t.getMonth() + 1),
            o = r.formatNum(t.getDate()),
            i = n + e + a + e + o;return "y" === A ? i = n : "m" === A ? i = a : "d" === A && (i = o), i;
      }, formatTime: function formatTime(A, e, t) {
        var n = A ? A.toString().length : 0,
            a = Number(A),
            o = a ? 13 !== n ? Number(A + "000") : a : A;A = o ? new Date(o) : "", t = t || "-", e = e || !1, A || (A = new Date());var i = A.getFullYear(),
            s = A.getMonth() + 1,
            l = A.getDate(),
            u = A.getHours(),
            c = A.getMinutes(),
            B = A.getSeconds();return [i, s, l].map(r.formatNum).join(t) + (e ? " " + [u, c, B].map(r.formatNum).join(":") : "");
      }, getDayNum: function getDayNum() {
        var A = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date().getFullYear(),
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date().getMonth() + 1;A = ~~A, e = ~~e;var t = new Date(A + "-" + r.formatNum(e) + "-01");return t.setMonth(e), t.setDate(0), t.getDate();
      }, isToday: function isToday() {
        for (var A = arguments.length, e = Array(A), t = 0; t < A; t++) {
          e[t] = arguments[t];
        }var n = e.length,
            a = new Date(r.getCurDate()).getTime();return 1 === n ? new Date(e[0]).getTime() === a : 3 === n && new Date(r.getYMD(e)).getTime() === a;
      }, monthDistance: function monthDistance(A, e) {
        var t = A.split("-").map(function (A) {
          return ~~A;
        }),
            n = e.split("-").map(function (A) {
          return ~~A;
        });return 12 * (n[0] - t[0]) + n[1] - t[1];
      }, dayDistance: function dayDistance(A, e) {
        var t = new Date(A);return (new Date(e) - t) / 24 / 60 / 60 / 1e3;
      }, getLastMonth: function getLastMonth(A, e) {
        return A = ~~A, 1 >= (e = ~~e) ? [A - 1, 12] : [A, e - 1];
      }, getNextMonth: function getNextMonth(A, e) {
        return A = ~~A, 12 <= (e = ~~e) ? [A + 1, 1] : [A, e + 1];
      }, getMonthLine: function getMonthLine() {
        var A = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date().getFullYear(),
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Date().getMonth() + 1,
            t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;A = ~~A, e = ~~e;var n = new Date(A + "-" + r.formatNum(e) + "-01"),
            a = r.getDayNum(A, e);return Math.ceil(((n.getDay() + 7 - t) % 7 + a) / 7);
      }, getAfterDate: function getAfterDate() {
        var A = arguments.length;return 2 === A ? r.formatTime(new Date(arguments.length <= 0 ? void 0 : arguments[0]).getTime() + 24 * ~~(arguments.length <= 1 ? void 0 : arguments[1]) * 60 * 60 * 1e3) : 4 === A ? r.formatTime(new Date(r.getYMD(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1], arguments.length <= 2 ? void 0 : arguments[2])).getTime() + 24 * ~~(arguments.length <= 3 ? void 0 : arguments[3]) * 60 * 60 * 1e3) : void 0;
      }, extend: function extend() {
        var A = Object.prototype.hasOwnProperty,
            e = Object.prototype.propertyIsEnumerable;function t(e, t, a) {
          var o = t[a];if (void 0 !== o && null !== o) {
            if (A.call(e, a) && (void 0 === e[a] || null === e[a])) throw new TypeError("Cannot convert undefined or null to object (" + a + ")");var i, s;!A.call(e, a) || (s = void 0 === (i = o) ? "undefined" : n(i), null === i || "object" !== s && "function" !== s) ? e[a] = o : e[a] = r(Object(e[a]), t[a]);
          }
        }function r(n, r) {
          if (n === r) return n;for (var a in r = Object(r)) {
            A.call(r, a) && t(n, r, a);
          }if (Object.getOwnPropertySymbols) for (var o = Object.getOwnPropertySymbols(r), i = 0; i < o.length; i++) {
            e.call(r, o[i]) && t(n, r, o[i]);
          }return n;
        }return function (A) {
          A = function (A) {
            if (null === A || void 0 === A) throw new TypeError("Cannot convert undefined or null to object");return Object(A);
          }(A);for (var e = 1; e < arguments.length; e++) {
            r(A, arguments[e]);
          }return A;
        };
      }, assign: function assign() {
        return r.extend().apply(void 0, arguments);
      }, createYear: function createYear(A) {
        var e = { year: new Date().getFullYear(), month: 1, otherMonth: !1, firstDay: 0 },
            t = [];r.assign(e, A);for (var n = 0; n < 12; n++) {
          var a = r.getNextMonth(e.year, e.month);t.push(r.createDate(e)), e.year = a[0], e.month = a[1];
        }return t;
      }, createMonths: function createMonths(A) {
        var e = { year: new Date().getFullYear(), month: 1, otherMonth: !1, firstDay: 0, num: 3 },
            t = [];r.assign(e, A);for (var n = 0; n < e.num; n++) {
          var a = r.getNextMonth(e.year, e.month);t.push(r.createDate(e)), e.year = a[0], e.month = a[1];
        }return t;
      }, createDate: function createDate(A) {
        var e = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, otherMonth: !1, firstDay: 0 };r.assign(e, A);for (var t = e.year, n = e.month, a = e.firstDay, o = e.otherMonth, i = r.getDayNum(t, n), s = r.getMonthLine(t, n, a), l = function () {
          for (var A = [], e = 0; e < s; e++) {
            for (var t = [], n = 0; n < 7; n++) {
              t.push({});
            }A.push(t);
          }return A;
        }(), u = 0, c = 0; c < i; c++) {
          var B = c + 1,
              d = B,
              f = new Date(t, n - 1, B).getDay(),
              h = (7 + f - a) % 7,
              g = r.getYMD(t, n, B),
              w = r.isToday(t, n, B);l[u][h] = { year: t, month: r.formatNum(n), day: d, week: f, format: g, isToday: w }, 6 === h && u++;
        }if (o) {
          for (var Q = new Date(t, n - 1, 1), p = new Date(t, n - 1, i), U = (7 + Q.getDay() - a) % 7, C = (7 + p.getDay() - a) % 7, F = 6 - C, v = r.getLastMonth(t, n), E = r.getNextMonth(t, n), m = v[0], y = v[1], H = E[0], _ = E[1], b = r.getDayNum(v[0], v[1]), N = U - 1, T = 0; N >= 0; N--, T++) {
            var I = new Date(m, y - 1, b - T).getDay(),
                S = b - T,
                K = r.getYMD(m, y, S);l[0][N] = { year: m, month: r.formatNum(_), day: S, week: I, format: K, isLastMonth: !0, isOtherMonth: !0 };
          }for (var M = 0; M < F; M++) {
            var D = new Date(H, _ - 1, M + 1).getDay(),
                L = M + 1,
                O = r.getYMD(H, _, L);l[s - 1][M + C + 1] = { year: H, month: r.formatNum(_), day: L, week: D, format: O, isNextMonth: !0, isOtherMonth: !0 };
          }
        }return { year: e.year, month: r.formatNum(e.month), content: l };
      }, dateToStr: function dateToStr(A, e) {
        if ("string" == typeof A) return A;e = e || "yyyy-MM-dd";var t = { "M+": A.getMonth() + 1, "d+": A.getDate(), "h+": A.getHours(), "m+": A.getMinutes(), "s+": A.getSeconds(), "w+": "日一二三四五六".charAt(A.getDay()), "q+": Math.floor((A.getMonth() + 3) / 3), S: A.getMilliseconds() };for (var n in new RegExp("(y+)").test(e) && (e = e.replace(RegExp.$1, (A.getFullYear() + "").substr(4 - RegExp.$1.length))), t) {
          new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? t[n] : ("00" + t[n]).substr(("" + t[n]).length)));
        }return e;
      }, compareDate: function compareDate(A, e) {
        return !!A && (e || (e = r.getCurDate()), (new Date(A) - new Date(e)) / 864e5);
      }, formatDate: function formatDate(A) {
        var e = function e(A) {
          var e;return (e = A.replace(/\//g, "-").split("-"))[0] + "-" + r.formatNum(e[1]) + "-" + r.formatNum(e[2]);
        };if ("object" === (void 0 === (A += "") ? "undefined" : n(A))) return A;if (isNaN(Number(A))) {
          var t = "",
              a = "";if (/ /.test(A)) {
            var o = A.split(" ");t = e(o[0]), a = " " + function (A) {
              var e;return e = A.split(":"), r.formatNum(e[0]) + ":" + r.formatNum(e[1]) + ":" + r.formatNum(e[2]);
            }(o[1]);
          } else t = e(A);return new Date(t + a);
        }return new Date(Number(13 !== A.length ? A + "000" : A));
      }, countdown: function countdown(A) {
        var e,
            t,
            n = "",
            a = new Date(),
            o = { dimension: "day", targetDate: "" },
            i = "00",
            s = "00",
            l = "00",
            u = "00",
            c = "00",
            B = "00",
            d = "00",
            f = !1;return "string" == typeof A ? n = A : (r.assign(o, A), n = o.targetDate), e = r.formatDate(n) - a + 60 * a.getTimezoneOffset() * 1e3, t = o.dimension, e > 0 ? ("year" === t && (s = ~~(e / 1e3 / 60 / 60 / 24 / 30 - 12 * (i = ~~(e / 1e3 / 60 / 60 / 24 / 365)))), "month" === t && (s = ~~(e / 1e3 / 60 / 60 / 24 / 30 - 12 * (i = 0))), "day" === t && (i = 0, s = 0), d = ~~(e - 365 * i * 24 * 60 * 60 * 1e3 - 24 * s * 30 * 60 * 60 * 1e3 - 24 * (l = ~~(e / 1e3 / 60 / 60 / 24 - 365 * i - 30 * s)) * 60 * 60 * 1e3 - 60 * (u = ~~(e / 1e3 / 60 / 60 - 365 * i * 24 - 30 * s * 24 - 24 * l)) * 60 * 1e3 - 60 * (c = ~~(e / 1e3 / 60 - 365 * i * 24 * 60 - 30 * s * 24 * 60 - 24 * l * 60 - 60 * u)) * 1e3 - 1e3 * (B = ~~(e / 1e3 - 365 * i * 24 * 60 * 60 - 30 * s * 24 * 60 * 60 - 24 * l * 60 * 60 - 60 * u * 60 - 60 * c)))) : f = !0, { year: r.formatNum(i), month: r.formatNum(s), day: r.formatNum(l), hour: r.formatNum(u), minute: r.formatNum(c), second: r.formatNum(B), milliseconds: r.formatNum((d + "").slice(0, 2)), isOver: f };
      } };e.default = r;
  }, function (A, e, t) {
    "use strict";
    A.exports = { isrem: !0 };
  }, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(34),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(56),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/widgets/ycfPopup/src/ycfPopup.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    function n(A, e) {
      for (var t = [], n = {}, r = 0; r < e.length; r++) {
        var a = e[r],
            o = a[0],
            i = { id: A + ":" + r, css: a[1], media: a[2], sourceMap: a[3] };n[o] ? n[o].parts.push(i) : t.push(n[o] = { id: o, parts: [i] });
      }return t;
    }t.r(e), t.d(e, "default", function () {
      return f;
    });var r = "undefined" != typeof document;if ("undefined" != typeof DEBUG && DEBUG && !r) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var a = {},
        o = r && (document.head || document.getElementsByTagName("head")[0]),
        i = null,
        s = 0,
        l = !1,
        u = function u() {},
        c = null,
        B = "data-vue-ssr-id",
        d = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(A, e, t, r) {
      l = t, c = r || {};var o = n(A, e);return h(o), function (e) {
        for (var t = [], r = 0; r < o.length; r++) {
          var i = o[r];(s = a[i.id]).refs--, t.push(s);
        }e ? h(o = n(A, e)) : o = [];for (r = 0; r < t.length; r++) {
          var s;if (0 === (s = t[r]).refs) {
            for (var l = 0; l < s.parts.length; l++) {
              s.parts[l]();
            }delete a[s.id];
          }
        }
      };
    }function h(A) {
      for (var e = 0; e < A.length; e++) {
        var t = A[e],
            n = a[t.id];if (n) {
          n.refs++;for (var r = 0; r < n.parts.length; r++) {
            n.parts[r](t.parts[r]);
          }for (; r < t.parts.length; r++) {
            n.parts.push(w(t.parts[r]));
          }n.parts.length > t.parts.length && (n.parts.length = t.parts.length);
        } else {
          var o = [];for (r = 0; r < t.parts.length; r++) {
            o.push(w(t.parts[r]));
          }a[t.id] = { id: t.id, refs: 1, parts: o };
        }
      }
    }function g() {
      var A = document.createElement("style");return A.type = "text/css", o.appendChild(A), A;
    }function w(A) {
      var e,
          t,
          n = document.querySelector("style[" + B + '~="' + A.id + '"]');if (n) {
        if (l) return u;n.parentNode.removeChild(n);
      }if (d) {
        var r = s++;n = i || (i = g()), e = U.bind(null, n, r, !1), t = U.bind(null, n, r, !0);
      } else n = g(), e = function (A, e) {
        var t = e.css,
            n = e.media,
            r = e.sourceMap;n && A.setAttribute("media", n);c.ssrId && A.setAttribute(B, e.id);r && (t += "\n/*# sourceURL=" + r.sources[0] + " */", t += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");if (A.styleSheet) A.styleSheet.cssText = t;else {
          for (; A.firstChild;) {
            A.removeChild(A.firstChild);
          }A.appendChild(document.createTextNode(t));
        }
      }.bind(null, n), t = function t() {
        n.parentNode.removeChild(n);
      };return e(A), function (n) {
        if (n) {
          if (n.css === A.css && n.media === A.media && n.sourceMap === A.sourceMap) return;e(A = n);
        } else t();
      };
    }var Q,
        p = (Q = [], function (A, e) {
      return Q[A] = e, Q.filter(Boolean).join("\n");
    });function U(A, e, t, n) {
      var r = t ? "" : n.css;if (A.styleSheet) A.styleSheet.cssText = p(e, r);else {
        var a = document.createTextNode(r),
            o = A.childNodes;o[e] && A.removeChild(o[e]), o.length ? A.insertBefore(a, o[e]) : A.appendChild(a);
      }
    }
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(17),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(39),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/module/ycfPayment/src/ycfPayment.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(78),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(18),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(40),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/module/ycfProgress/src/ycfProgress.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(82),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(19),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(41),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/module/ycfRegisterBox/src/ycfRegisterBox.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(86),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    (A.exports = t(5)(!1)).push([A.i, "", ""]);
  }, function (A, e, t) {
    var n = t(90);"string" == typeof n && (n = [[A.i, n, ""]]);var r = { hmr: !0, transform: void 0, insertInto: void 0 };t(8)(n, r);n.locals && (A.exports = n.locals);
  }, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(20),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(42),
        i = t(0),
        s = !1;var l = function l(A) {
      s || t(91);
    },
        u = Object(i.a)(r.a, o.a, o.b, !1, l, null, null);u.options.__file = "src/module/ycfSearch/src/ycfSearch.vue", e.default = u.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(92),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  }, function (A, e) {
    A.exports = "./imgycf/ycf_gou.png";
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(21),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(43),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/module/ycfSteps/src/ycfSteps.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(97),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    (A.exports = t(5)(!1)).push([A.i, "", ""]);
  }, function (A, e, t) {
    var n = t(101);"string" == typeof n && (n = [[A.i, n, ""]]);var r = { hmr: !0, transform: void 0, insertInto: void 0 };t(8)(n, r);n.locals && (A.exports = n.locals);
  }, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(22),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(45),
        i = t(0),
        s = !1;var l = function l(A) {
      s || t(102);
    },
        u = Object(i.a)(r.a, o.a, o.b, !1, l, null, null);u.options.__file = "src/module/ycfSwiper/src/ycfSwiperItem.vue", e.default = u.exports;
  }, function (A, e, t) {
    "use strict";
    var n = document.addEventListener ? function (A, e, t) {
      A && e && t && A.addEventListener(e, t, !1);
    } : function (A, e, t) {
      A && e && t && A.attachEvent("on" + e, t);
    },
        r = document.removeEventListener ? function (A, e, t) {
      A && e && A.removeEventListener(e, t, !1);
    } : function (A, e, t) {
      A && e && A.detachEvent("on" + e, t);
    };A.exports = { on: n, off: r, once: function once(A, e, t) {
        n(A, e, function n() {
          t && t.apply(this, arguments), r(A, e, n);
        });
      }, addClass: function addClass(A, e) {
        if (A) {
          for (var t = A.className, n = (e || "").split(" "), r = 0, a = n.length; r < a; r++) {
            var o = n[r];o && (A.classList ? A.classList.add(o) : hasClass(A, o) || (t += " " + o));
          }A.classList || (A.className = t);
        }
      }, removeClass: function removeClass(A, e) {
        if (A && e) {
          for (var t = e.split(" "), n = " " + A.className + " ", r = 0, a = t.length; r < a; r++) {
            var o = t[r];o && (A.classList ? A.classList.remove(o) : hasClass(A, o) && (n = n.replace(" " + o + " ", " ")));
          }A.classList || (A.className = trim(n));
        }
      } };
  },, function (A, e, t) {}, function (A, e, t) {
    (A.exports = t(5)(!1)).push([A.i, "", ""]);
  }, function (A, e, t) {
    var n = t(107);"string" == typeof n && (n = [[A.i, n, ""]]);var r = { hmr: !0, transform: void 0, insertInto: void 0 };t(8)(n, r);n.locals && (A.exports = n.locals);
  }, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(23),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(44),
        i = t(0),
        s = !1;var l = function l(A) {
      s || t(108);
    },
        u = Object(i.a)(r.a, o.a, o.b, !1, l, null, null);u.options.__file = "src/module/ycfSwiper/src/ycfSwiper.vue", e.default = u.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(109),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    (A.exports = t(5)(!1)).push([A.i, "", ""]);
  }, function (A, e, t) {
    var n = t(113);"string" == typeof n && (n = [[A.i, n, ""]]);var r = { hmr: !0, transform: void 0, insertInto: void 0 };t(8)(n, r);n.locals && (A.exports = n.locals);
  }, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(24),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(46),
        i = t(0),
        s = !1;var l = function l(A) {
      s || t(114);
    },
        u = Object(i.a)(r.a, o.a, o.b, !1, l, null, null);u.options.__file = "src/module/ycfTabBar/src/ycfTabBar.vue", e.default = u.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(115),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(25),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(47),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/module/ycfYunCalendar/src/ycfYunCalendar.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(119),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(26),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(48),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/widgets/button/src/button.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(123),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      vue.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(10),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      vue.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e) {
    A.exports = function (A) {
      var e = "undefined" != typeof window && window.location;if (!e) throw new Error("fixUrls requires window.location");if (!A || "string" != typeof A) return A;var t = e.protocol + "//" + e.host,
          n = t + e.pathname.replace(/\/[^\/]*$/, "/");return A.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (A, e) {
        var r,
            a = e.trim().replace(/^"(.*)"$/, function (A, e) {
          return e;
        }).replace(/^'(.*)'$/, function (A, e) {
          return e;
        });return (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a) ? A : (r = 0 === a.indexOf("//") ? a : 0 === a.indexOf("/") ? t + a : n + a.replace(/^\.\//, ""), "url(" + JSON.stringify(r) + ")")
        );
      });
    };
  }, function (A, e, t) {
    (A.exports = t(5)(!1)).push([A.i, "", ""]);
  }, function (A, e, t) {
    var n = t(131);"string" == typeof n && (n = [[A.i, n, ""]]);var r = { hmr: !0, transform: void 0, insertInto: void 0 };t(8)(n, r);n.locals && (A.exports = n.locals);
  }, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(27),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(49),
        i = t(0),
        s = !1;var l = function l(A) {
      s || t(132);
    },
        u = Object(i.a)(r.a, o.a, o.b, !1, l, null, null);u.options.__file = "src/widgets/input/src/input.vue", e.default = u.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(133),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      vue.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(28),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(50),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/widgets/inputNumber/src/inputNumber.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(137),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      vue.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(29),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(51),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/widgets/ranger/src/ranger.vue", e.default = s.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(141),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      vue.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(11),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      vue.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    (A.exports = t(5)(!0)).push([A.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", { version: 3, sources: [], names: [], mappings: "", file: "scroll.vue", sourceRoot: "" }]);
  }, function (A, e, t) {
    var n = t(148);"string" == typeof n && (n = [[A.i, n, ""]]), n.locals && (A.exports = n.locals);(0, t(75).default)("70c1de26", n, !1, {});
  }, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(30),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(52),
        i = t(0),
        s = !1;var l = function l(A) {
      s || t(149);
    },
        u = Object(i.a)(r.a, o.a, o.b, !1, l, null, null);u.options.__file = "src/widgets/scroll/src/scroll.vue", e.default = u.exports;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(150),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      vue.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    t.r(e);var n = t(31),
        r = t.n(n);for (var a in n) {
      "default" !== a && function (A) {
        t.d(e, A, function () {
          return n[A];
        });
      }(a);
    }var o = t(53),
        i = t(0),
        s = Object(i.a)(r.a, o.a, o.b, !1, null, null, null);s.options.__file = "src/widgets/toast/src/toast.vue", e.default = s.exports;
  }, function (e, t) {
    e.exports = A;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = a(t(155)),
        r = a(t(154));function a(A) {
      return A && A.__esModule ? A : { default: A };
    }var o = n.default.extend(r.default),
        i = void 0;e.default = function (A) {
      return "string" == typeof (A = A || {}) && (A = { message: A }), (i = new o({ data: A })).vm = i.$mount(), document.body.appendChild(i.$el), i.vm.visible = !0, i;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(156),
        a = (n = r) && n.__esModule ? n : { default: n };e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(57),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(58),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  }, function (A, e) {
    A.exports = function () {
      throw new Error("define cannot be used indirect");
    };
  }, function (A, e) {
    var t;t = function () {
      return this;
    }();try {
      t = t || Function("return this")() || (0, eval)("this");
    } catch (A) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (t = window);
    }A.exports = t;
  }, function (A, e, t) {
    "use strict";
    (function (n) {
      var r,
          a = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (A) {
        return typeof A === "undefined" ? "undefined" : _typeof(A);
      } : function (A) {
        return A && "function" == typeof Symbol && A.constructor === Symbol && A !== Symbol.prototype ? "symbol" : typeof A === "undefined" ? "undefined" : _typeof(A);
      };(function () {
        CanvasRenderingContext2D.prototype.roundRect = function (A, e, t, n, r) {
          var a = Math.min(t, n);return r > a / 2 && (r = a / 2), this.beginPath(), this.moveTo(A + r, e), this.arcTo(A + t, e, A + t, e + n, r), this.arcTo(A + t, e + n, A, e + n, r), this.arcTo(A, e + n, A, e, r), this.arcTo(A, e, A + t, e, r), this.closePath(), this;
        }, "function" != typeof Object.assign && Object.defineProperty(Object, "assign", { value: function value(A, e) {
            if (null == A) throw new TypeError("Cannot convert undefined or null to object");for (var t = Object(A), n = 1; n < arguments.length; n++) {
              var r = arguments[n];if (null != r) for (var a in r) {
                Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
              }
            }return t;
          }, writable: !0, configurable: !0 });var n = function n(A) {
          var e,
              t = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()),
              n = t ? "touchstart" : "mousedown",
              r = t ? "touchmove" : "mousemove",
              a = Object.assign({ target: "canvas", imgsrc: "", color: "#eee", touchRadius: 20, rate: 50, radius: 0, fn_firstTouch: function fn_firstTouch() {}, fn_firstTouch_Done: !1, fn_move: function fn_move() {}, handle: function handle() {}, success: function success() {} }, A);(e = document.querySelectorAll(a.target)).forEach(function (A, o) {
            var i,
                s,
                l = A,
                u = a.touchRadius,
                c = document.createElement("canvas"),
                B = c.getContext("2d"),
                d = Number(getComputedStyle(e[o], null).width.replace("px", "")),
                f = Number(getComputedStyle(e[o], null).height.replace("px", "")),
                h = !1,
                g = new Image(),
                w = function w(A, e, t) {
              var n = A.getBoundingClientRect();return { x: e - n.left * (A.width / n.width), y: t - n.top * (A.height / n.height) };
            },
                Q = function Q(A, e, t, n) {
              B.fillStyle = n || "#eee", B.beginPath(), B.moveTo(A, e), B.arc(A, e, t, 0, 2 * Math.PI, !1), B.fill();
            },
                p = function p(A) {
              c.id = "clip-" + o, c.width = d, c.height = f, a.imgsrc ? (g.onload = function () {
                !function (A) {
                  var e = document.createElement("canvas"),
                      t = e.getContext("2d");e.width = c.width, e.height = c.height, t.drawImage(A, 0, 0, c.width, c.height);var n = B.createPattern(e, "no-repeat");B.roundRect(0, 0, c.width, c.height, a.radius), B.fillStyle = n, B.fill();
                }(this);
              }, g.crossOrigin = "anonymous", g.src = a.imgsrc) : (B.rect(0, 0, c.width, c.height), B.fillStyle = a.color, B.fill()), l.appendChild(c), A && A.call(l);
            },
                U = function U() {
              l.removeChild(l.querySelector("canvas"));
            };t ? (document.addEventListener("touchmove", function (A) {
              h && A.preventDefault();
            }, !1), document.addEventListener("touchend", function (A) {
              h = !1;
            }, !1)) : document.addEventListener("mouseup", function (A) {
              h = !1;
            }, !1), i = a.fn_firstTouch, c.addEventListener(n, function (A) {
              var e, n, r;if (!c.touched) {
                try {
                  i().then(function () {
                    a.fn_firstTouch_Done = !0;
                  }).fail(function () {
                    a.fn_firstTouch_Done = !0;
                  });
                } catch (A) {
                  a.fn_firstTouch_Done = !0;
                }c.touched = !0;
              }h = !0, e = t ? A.touches[0].clientX : A.clientX, n = t ? A.touches[0].clientY : A.clientY, r = w(c, e, n), B.globalCompositeOperation = "destination-out", Q.call(B, r.x, r.y, u);
            }, !1), c.addEventListener(r, function (A) {
              var e, n, r;if (!t && !h) return !1;e = t ? A.touches[0].clientX : A.clientX, n = t ? A.touches[0].clientY : A.clientY, r = w(c, e, n), B.globalCompositeOperation = "destination-out", Q.call(B, r.x, r.y, u), function (A, e, t) {
                for (var n = A.getImageData(0, 0, e, t).data, r = [], a = 0, o = n.length; a < o; a += 4) {
                  0 === n[a + 3] && r.push(a);
                }return (r.length / (n.length / 4) * 100).toFixed(2);
              }(B, d, f) > a.rate && !a.handleExecuted && (clearInterval(s), s = setInterval(function () {
                a.fn_firstTouch_Done && (clearInterval(s), a.handle(), U(), a.handleExecuted = !0);
              }, 16)), A.preventDefault();
            }, !1), p(a.success());
          });
        };void 0 !== A && "object" === a(e) && t(164).cmd ? A.exports = n : void 0 === (r = function () {
          return n;
        }.call(e, t, e, A)) || (A.exports = r);
      }).call("undefined" != typeof window ? window : n);
    }).call(this, t(165));
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n;"undefined" != typeof Zepto && (void 0 === Zepto.Callbacks && function (A) {
      A.Callbacks = function (e) {
        var t = void 0,
            n = void 0,
            r = void 0,
            a = void 0,
            o = void 0,
            i = void 0,
            s = [],
            l = !(e = A.extend({}, e)).once && [],
            u = function A(u) {
          for (t = e.memory && u, n = !0, i = a || 0, a = 0, o = s.length, r = !0; s && i < o; ++i) {
            if (!1 === s[i].apply(u[0], u[1]) && e.stopOnFalse) {
              t = !1;break;
            }
          }r = !1, s && (l ? l.length && A(l.shift()) : t ? s.length = 0 : c.disable());
        },
            c = { add: function add() {
            if (s) {
              var n = s.length,
                  i = function t(n) {
                A.each(n, function (A, n) {
                  "function" == typeof n ? e.unique && c.has(n) || s.push(n) : n && n.length && "string" != typeof n && t(n);
                });
              };i(arguments), r ? o = s.length : t && (a = n, u(t));
            }return this;
          }, remove: function remove() {
            return s && A.each(arguments, function (e, t) {
              for (var n = void 0; (n = A.inArray(t, s, n)) > -1;) {
                s.splice(n, 1), r && (n <= o && --o, n <= i && --i);
              }
            }), this;
          }, has: function has(e) {
            return !(!s || !(e ? A.inArray(e, s) > -1 : s.length));
          }, empty: function empty() {
            return o = s.length = 0, this;
          }, disable: function disable() {
            return s = l = t = void 0, this;
          }, disabled: function disabled() {
            return !s;
          }, lock: function lock() {
            return l = void 0, t || c.disable(), this;
          }, locked: function locked() {
            return !l;
          }, fireWith: function fireWith(A, e) {
            return !s || n && !l || (e = [A, (e = e || []).slice ? e.slice() : e], r ? l.push(e) : u(e)), this;
          }, fire: function fire() {
            return c.fireWith(this, arguments);
          }, fired: function fired() {
            return !!n;
          } };return c;
      };
    }(Zepto), void 0 === Zepto.Deferred && function (A) {
      var e = Array.prototype.slice;function t(e) {
        var n = [["resolve", "done", A.Callbacks({ once: 1, memory: 1 }), "resolved"], ["reject", "fail", A.Callbacks({ once: 1, memory: 1 }), "rejected"], ["notify", "progress", A.Callbacks({ memory: 1 })]],
            r = "pending",
            a = { state: function state() {
            return r;
          }, always: function always() {
            return o.done(arguments).fail(arguments), this;
          }, then: function then() {
            var e = arguments;return t(function (t) {
              A.each(n, function (n, r) {
                var i = A.isFunction(e[n]) && e[n];o[r[1]](function () {
                  var e = i && i.apply(this, arguments);if (e && A.isFunction(e.promise)) e.promise().done(t.resolve).fail(t.reject).progress(t.notify);else {
                    var n = this === a ? t.promise() : this,
                        o = i ? [e] : arguments;t[r[0] + "With"](n, o);
                  }
                });
              }), e = null;
            }).promise();
          }, promise: function promise(e) {
            return null != e ? A.extend(e, a) : a;
          } },
            o = {};return A.each(n, function (A, e) {
          var t = e[2],
              i = e[3];a[e[1]] = t.add, i && t.add(function () {
            r = i;
          }, n[1 ^ A][2].disable, n[2][2].lock), o[e[0]] = function () {
            return o[e[0] + "With"](this === o ? a : this, arguments), this;
          }, o[e[0] + "With"] = t.fireWith;
        }), a.promise(o), e && e.call(o, o), o;
      }A.when = function (n) {
        var r = e.call(arguments),
            a = r.length,
            o = 0,
            i = 1 !== a || n && A.isFunction(n.promise) ? a : 0,
            s = 1 === i ? n : t(),
            l = void 0,
            u = void 0,
            c = void 0,
            B = function B(A, t, n) {
          return function (r) {
            t[A] = this, n[A] = arguments.length > 1 ? e.call(arguments) : r, n === l ? s.notifyWith(t, n) : --i || s.resolveWith(t, n);
          };
        };if (a > 1) for (l = new Array(a), u = new Array(a), c = new Array(a); o < a; ++o) {
          r[o] && A.isFunction(r[o].promise) ? r[o].promise().done(B(o, c, r)).fail(s.reject).progress(B(o, u, l)) : --i;
        }return i || s.resolveWith(c, r), s.promise();
      }, A.Deferred = t;
    }(Zepto)), n = function n(A) {
      return $.ajax({ type: A.type || "get", url: A.url, data: A.data, dataType: A.dataType || "json", timeout: A.timeout || 6e4 });
    }, e.default = n;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        r = t(59);var a = {},
        o = function () {
      function A(e) {
        var t = e.el,
            n = e.src,
            r = e.error,
            a = e.loading,
            o = e.bindType,
            i = e.$parent,
            s = e.options,
            l = e.elRender;!function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.el = t, this.src = n, this.error = r, this.loading = a, this.bindType = o, this.naturalHeight = 0, this.naturalWidth = 0, this.options = s, this.rect = null, this.$parent = i, this.elRender = l, this.initState(), this.render("loading", !1);
      }return n(A, [{ key: "initState", value: function value() {
          "dataset" in this.el ? this.el.dataset.src = this.src : this.el.setAttribute("data-src", this.src), this.state = { error: !1, loaded: !1, rendered: !1 };
        } }, { key: "render", value: function value(A, e) {
          this.elRender(this, A, e);
        } }, { key: "update", value: function value(A) {
          var e = A.src,
              t = A.loading,
              n = A.error,
              r = this.src;this.src = e, this.loading = t, this.error = n, r !== this.src && this.initState();
        } }, { key: "getRect", value: function value() {
          this.rect = this.el.getBoundingClientRect();
        } }, { key: "checkInView", value: function value() {
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;return this.getRect(), this.rect.top < window.innerHeight * this.options.preLoad && this.rect.bottom > this.options.preLoadTop && this.rect.left < window.innerWidth * this.options.preLoad && this.rect.right > 0;
        } }, { key: "renderLoading", value: function value(A) {
          var e = this;this.loadImageAsync({ src: this.loading }, function (t) {
            e.render("loading", !1), A();
          }, function () {
            A();
          });
        } }, { key: "load", value: function value() {
          var A = this,
              e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r.noop;if (!this.state.error) return this.state.loaded || a[this.src] ? (this.state.loaded = !0, e(), this.render("loaded", !0)) : void this.renderLoading(function () {
            A.loadImageAsync({ src: A.src }, function (t) {
              A.naturalHeight = t.naturalHeight, A.naturalWidth = t.naturalWidth, A.state.loaded = !0, A.state.error = !1, A.render("loaded", !1), a[A.src] = 1, e();
            }, function (e) {
              A.state.error = !0, A.state.loaded = !1, A.render("error", !1);
            });
          });e();
        } }, { key: "loadImageAsync", value: function value(A, e, t) {
          var n = new Image();n.src = A.src, n.onload = function () {
            e({ naturalHeight: n.naturalHeight, naturalWidth: n.naturalWidth, src: n.src });
          }, n.onerror = function (A) {
            t(A);
          };
        } }, { key: "destroy", value: function value() {
          this.el = null, this.src = null, this.error = null, this.loading = null, this.bindType = null;
        } }]), A;
    }();e.default = o;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }();e.default = function (A) {
      return function () {
        function e(t) {
          var n = this,
              r = t.preLoad,
              o = t.error,
              i = t.loading,
              s = t.throttleTime,
              l = t.preLoadTop;t.listenEvents;!function (A, e) {
            if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
          }(this, e), this.listenerQueue = [], this.targetIndex = 0, this.targetQueue = [], this.parent = "", this.options = { throttleTime: s || 200, preLoad: r || 1.3, preLoadTop: l || 0, error: o, loading: i, listenEvents: ["scroll", "wheel", "mousewheel", "resize", "animationend", "transitionend", "touchmove"] }, this.lazyThrottle = (0, a.throttle)(this.loadImg.bind(this), this.options.throttleTime), this.lazyThrottle(), A.nextTick(function () {
            return n.lazyThrottle();
          });
        }return n(e, [{ key: "loadImg", value: function value() {
            var A = this;this.listenerQueue.forEach(function (e, t) {
              e.state.error || !e.state.loaded ? e.checkInView(A.parent) && e.load() : A.listenerQueue.splice(t, 1);
            });
          } }, { key: "initListen", value: function value(A, e) {
            var t = this,
                n = { on: function on(A, e, t) {
                var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];A.addEventListener(e, t, n);
              }, off: function off(A, e, t) {
                var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];A.removeEventListener(e, t, n);
              } };this.options.listenEvents.forEach(function (r) {
              return n[e ? "on" : "off"](A, r, t.lazyThrottle);
            });
          } }, { key: "addListenerTarget", value: function value(A) {
            if (A) {
              var e = (0, a.find)(this.targetQueue, function (e) {
                return e.el === A;
              });return e ? e.childrenCount++ : (e = { el: A, id: ++this.targetIndex, childrenCount: 1, listened: !0 }, this.initListen(e.el, !0), this.targetQueue.push(e)), this.targetIndex;
            }
          } }, { key: "removeListenerTarget", value: function value(A) {
            var e = this;this.targetQueue.forEach(function (t, n) {
              t.el === A && (t.childrenCount--, t.childrenCount || (e.initListen(t.el, !1), e.targetQueue.splice(n, 1), t = null));
            });
          } }, { key: "elRenderer", value: function value(A, e, t) {
            if (A.el) {
              var n = A.el,
                  r = A.bindType,
                  a = void 0;switch (e) {case "loading":
                  a = A.loading;break;case "error":
                  a = A.error;break;default:
                  a = A.src;}r ? n.style[r] = 'url("' + a + '")' : n.getAttribute("src") !== a && n.setAttribute("src", a), n.setAttribute("lazy", e);
            }
          } }, { key: "add", value: function value(e, t, n) {
            var r = this;if ((0, a.some)(this.listenerQueue, function (A) {
              return A.el === e;
            })) return this.update(e, bindding), A.nextTick(this.lazyThrottle);var o = t.value,
                l = this.options.loading,
                u = this.options.error,
                c = void 0;A.nextTick(function () {
              c = function (A) {
                var e = A;for (; e;) {
                  var t = e === document.body,
                      n = e === document.documentElement;if (t || n) break;if (!e.parentNode) break;if (/(scroll|auto)/.test(s(e))) return e;e = e.parentNode;
                }return window;
              }(e), r.parent = c;var n = new i.default({ bindType: t.arg, $parent: c, el: e, loading: l, error: u, src: o, elRender: r.elRenderer.bind(r), options: r.options });r.listenerQueue.push(n), r.addListenerTarget(window), r.addListenerTarget(c), r.lazyThrottle(), A.nextTick(function () {
                return r.lazyThrottle();
              });
            });
          } }, { key: "update", value: function value(e, t) {
            var n = this,
                r = binding.value,
                o = this.options.loading,
                i = this.options.error,
                s = (0, a.find)(this.listenerQueue, function (A) {
              return A.el === e;
            });s && s.update({ src: r, loading: o, error: i }), this.lazyThrottle(), A.nextTick(function () {
              return n.lazyThrottle();
            });
          } }, { key: "remove", value: function value(A) {
            if (A) {
              var e = (0, a.find)(this.listenerQueue, function (e) {
                return e.el === A;
              });e && (this.removeListenerTarget(e.$parent), this.removeListenerTarget(window), (0, a.removeArr)(this.listenerQueue, e) && e.destroy());
            }
          } }]), e;
      }();
    };var r,
        a = t(59),
        o = t(168),
        i = (r = o) && r.__esModule ? r : { default: r };function s(A) {
      return l(A, "overflow") + l(A, "overflow-y") + l(A, "overflow-x");
    }function l(A, e) {
      return "undefined" != typeof getComputedStyle ? getComputedStyle(A, null).getPropertyValue(e) : A.style[e];
    }
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(169),
        a = (n = r) && n.__esModule ? n : { default: n };e.default = { install: function install(A) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            t = new ((0, a.default)(A))(e);A.prototype.$Lazyload = t, A.directive("lazy", { bind: t.add.bind(t), update: t.update.bind(t), componentUpdated: t.lazyThrottle.bind(t), unbind: t.remove.bind(t) });
      } };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseContent = e.resolvePseudoContent = e.popCounters = e.parseCounterReset = e.TOKEN_TYPE = e.PSEUDO_CONTENT_ITEM_TYPE = void 0;var n = function () {
      return function (A, e) {
        if (Array.isArray(A)) return A;if (Symbol.iterator in Object(A)) return function (A, e) {
          var t = [],
              n = !0,
              r = !1,
              a = void 0;try {
            for (var o, i = A[Symbol.iterator](); !(n = (o = i.next()).done) && (t.push(o.value), !e || t.length !== e); n = !0) {}
          } catch (A) {
            r = !0, a = A;
          } finally {
            try {
              !n && i.return && i.return();
            } finally {
              if (r) throw a;
            }
          }return t;
        }(A, e);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        r = t(35),
        a = t(14),
        o = e.PSEUDO_CONTENT_ITEM_TYPE = { TEXT: 0, IMAGE: 1 },
        i = e.TOKEN_TYPE = { STRING: 0, ATTRIBUTE: 1, URL: 2, COUNTER: 3, COUNTERS: 4, OPENQUOTE: 5, CLOSEQUOTE: 6 },
        s = (e.parseCounterReset = function (A, e) {
      if (!A || !A.counterReset || "none" === A.counterReset) return [];for (var t = [], r = A.counterReset.split(/\s*,\s*/), a = r.length, o = 0; o < a; o++) {
        var i = r[o].split(/\s+/),
            s = n(i, 2),
            l = s[0],
            u = s[1];t.push(l);var c = e.counters[l];c || (c = e.counters[l] = []), c.push(parseInt(u || 0, 10));
      }return t;
    }, e.popCounters = function (A, e) {
      for (var t = A.length, n = 0; n < t; n++) {
        e.counters[A[n]].pop();
      }
    }, e.resolvePseudoContent = function (A, e, t) {
      if (!e || !e.content || "none" === e.content || "-moz-alt-content" === e.content || "none" === e.display) return null;var r = s(e.content),
          a = r.length,
          l = [],
          B = "",
          d = e.counterIncrement;if (d && "none" !== d) {
        var f = d.split(/\s+/),
            h = n(f, 2),
            g = h[0],
            w = h[1],
            Q = t.counters[g];Q && (Q[Q.length - 1] += void 0 === w ? 1 : parseInt(w, 10));
      }for (var p = 0; p < a; p++) {
        var U = r[p];switch (U.type) {case i.STRING:
            B += U.value || "";break;case i.ATTRIBUTE:
            A instanceof HTMLElement && U.value && (B += A.getAttribute(U.value) || "");break;case i.COUNTER:
            var C = t.counters[U.name || ""];C && (B += c([C[C.length - 1]], "", U.format));break;case i.COUNTERS:
            var F = t.counters[U.name || ""];F && (B += c(F, U.glue, U.format));break;case i.OPENQUOTE:
            B += u(e, !0, t.quoteDepth), t.quoteDepth++;break;case i.CLOSEQUOTE:
            t.quoteDepth--, B += u(e, !1, t.quoteDepth);break;case i.URL:
            B && (l.push({ type: o.TEXT, value: B }), B = ""), l.push({ type: o.IMAGE, value: U.value || "" });}
      }return B && l.push({ type: o.TEXT, value: B }), l;
    }, e.parseContent = function (A, e) {
      if (e && e[A]) return e[A];for (var t = [], n = A.length, r = !1, a = !1, o = !1, s = "", u = "", c = [], B = 0; B < n; B++) {
        var d = A.charAt(B);switch (d) {case "'":case '"':
            a ? s += d : (r = !r, o || r || (t.push({ type: i.STRING, value: s }), s = ""));break;case "\\":
            a ? (s += d, a = !1) : a = !0;break;case "(":
            r ? s += d : (o = !0, u = s, s = "", c = []);break;case ")":
            if (r) s += d;else if (o) {
              switch (s && c.push(s), u) {case "attr":
                  c.length > 0 && t.push({ type: i.ATTRIBUTE, value: c[0] });break;case "counter":
                  if (c.length > 0) {
                    var f = { type: i.COUNTER, name: c[0] };c.length > 1 && (f.format = c[1]), t.push(f);
                  }break;case "counters":
                  if (c.length > 0) {
                    var h = { type: i.COUNTERS, name: c[0] };c.length > 1 && (h.glue = c[1]), c.length > 2 && (h.format = c[2]), t.push(h);
                  }break;case "url":
                  c.length > 0 && t.push({ type: i.URL, value: c[0] });}o = !1, s = "";
            }break;case ",":
            r ? s += d : o && (c.push(s), s = "");break;case " ":case "\t":
            r ? s += d : s && (l(t, s), s = "");break;default:
            s += d;}"\\" !== d && (a = !1);
      }return s && l(t, s), e && (e[A] = t), t;
    }),
        l = function l(A, e) {
      switch (e) {case "open-quote":
          A.push({ type: i.OPENQUOTE });break;case "close-quote":
          A.push({ type: i.CLOSEQUOTE });}
    },
        u = function u(A, e, t) {
      var n = A.quotes ? A.quotes.split(/\s+/) : ["'\"'", "'\"'"],
          r = 2 * t;return r >= n.length && (r = n.length - 2), e || ++r, n[r].replace(/^["']|["']$/g, "");
    },
        c = function c(A, e, t) {
      for (var n = A.length, o = "", i = 0; i < n; i++) {
        i > 0 && (o += e || ""), o += (0, r.createCounterText)(A[i], (0, a.parseListStyleType)(t || "decimal"), !1);
      }return o;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ResourceStore = void 0;var n,
        r = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        a = t(12),
        o = (n = a) && n.__esModule ? n : { default: n },
        i = t(60);function s(A, e) {
      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
    }var l = function () {
      function A(e, t, n) {
        s(this, A), this.options = e, this._window = n, this.origin = this.getOrigin(n.location.href), this.cache = {}, this.logger = t, this._index = 0;
      }return r(A, [{ key: "loadImage", value: function value(A) {
          var e = this;if (this.hasResourceInCache(A)) return A;if (g(A)) return this.cache[A] = Q(A, this.options.imageTimeout || 0), A;if (!w(A) || o.default.SUPPORT_SVG_DRAWING) {
            if (!0 === this.options.allowTaint || f(A) || this.isSameOrigin(A)) return this.addImage(A, A, !1);if (!this.isSameOrigin(A)) {
              if ("string" == typeof this.options.proxy) return this.cache[A] = (0, i.Proxy)(A, this.options).then(function (A) {
                return Q(A, e.options.imageTimeout || 0);
              }), A;if (!0 === this.options.useCORS && o.default.SUPPORT_CORS_IMAGES) return this.addImage(A, A, !0);
            }
          }
        } }, { key: "inlineImage", value: function value(A) {
          var e = this;return f(A) ? Q(A, this.options.imageTimeout || 0) : this.hasResourceInCache(A) ? this.cache[A] : this.isSameOrigin(A) || "string" != typeof this.options.proxy ? this.xhrImage(A) : this.cache[A] = (0, i.Proxy)(A, this.options).then(function (A) {
            return Q(A, e.options.imageTimeout || 0);
          });
        } }, { key: "xhrImage", value: function value(A) {
          var e = this;return this.cache[A] = new Promise(function (t, n) {
            var r = new XMLHttpRequest();if (r.onreadystatechange = function () {
              if (4 === r.readyState) if (200 !== r.status) n("Failed to fetch image " + A.substring(0, 256) + " with status code " + r.status);else {
                var e = new FileReader();e.addEventListener("load", function () {
                  var A = e.result;t(A);
                }, !1), e.addEventListener("error", function (A) {
                  return n(A);
                }, !1), e.readAsDataURL(r.response);
              }
            }, r.responseType = "blob", e.options.imageTimeout) {
              var a = e.options.imageTimeout;r.timeout = a, r.ontimeout = function () {
                return n("");
              };
            }r.open("GET", A, !0), r.send();
          }).then(function (A) {
            return Q(A, e.options.imageTimeout || 0);
          }), this.cache[A];
        } }, { key: "loadCanvas", value: function value(A) {
          var e = String(this._index++);return this.cache[e] = Promise.resolve(A), e;
        } }, { key: "hasResourceInCache", value: function value(A) {
          return void 0 !== this.cache[A];
        } }, { key: "addImage", value: function value(A, e, t) {
          var n = this;var r = function r(A) {
            return new Promise(function (r, a) {
              var o = new Image();if (o.onload = function () {
                return r(o);
              }, A && !t || (o.crossOrigin = "anonymous"), o.onerror = a, o.src = e, !0 === o.complete && setTimeout(function () {
                r(o);
              }, 500), n.options.imageTimeout) {
                var i = n.options.imageTimeout;setTimeout(function () {
                  return a("");
                }, i);
              }
            });
          };return this.cache[A] = h(e) && !w(e) ? o.default.SUPPORT_BASE64_DRAWING(e).then(r) : r(!0), A;
        } }, { key: "isSameOrigin", value: function value(A) {
          return this.getOrigin(A) === this.origin;
        } }, { key: "getOrigin", value: function value(A) {
          var e = this._link || (this._link = this._window.document.createElement("a"));return e.href = A, e.href = e.href, e.protocol + e.hostname + e.port;
        } }, { key: "ready", value: function value() {
          var A = this,
              e = Object.keys(this.cache),
              t = e.map(function (e) {
            return A.cache[e].catch(function (A) {
              return null;
            });
          });return Promise.all(t).then(function (A) {
            return new u(e, A);
          });
        } }]), A;
    }();e.default = l;var u = e.ResourceStore = function () {
      function A(e, t) {
        s(this, A), this._keys = e, this._resources = t;
      }return r(A, [{ key: "get", value: function value(A) {
          var e = this._keys.indexOf(A);return -1 === e ? null : this._resources[e];
        } }]), A;
    }(),
        c = /^data:image\/svg\+xml/i,
        B = /^data:image\/.*;base64,/i,
        d = /^data:image\/.*/i,
        f = function f(A) {
      return d.test(A);
    },
        h = function h(A) {
      return B.test(A);
    },
        g = function g(A) {
      return "blob" === A.substr(0, 4);
    },
        w = function w(A) {
      return "svg" === A.substr(-3).toLowerCase() || c.test(A);
    },
        Q = function Q(A, e) {
      return new Promise(function (t, n) {
        var r = new Image();r.onload = function () {
          return t(r);
        }, r.onerror = n, r.src = A, !0 === r.complete && setTimeout(function () {
          t(r);
        }, 500), e && setTimeout(function () {
          return n("");
        }, e);
      });
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.cloneWindow = e.DocumentCloner = void 0;var n = function () {
      return function (A, e) {
        if (Array.isArray(A)) return A;if (Symbol.iterator in Object(A)) return function (A, e) {
          var t = [],
              n = !0,
              r = !1,
              a = void 0;try {
            for (var o, i = A[Symbol.iterator](); !(n = (o = i.next()).done) && (t.push(o.value), !e || t.length !== e); n = !0) {}
          } catch (A) {
            r = !0, a = A;
          } finally {
            try {
              !n && i.return && i.return();
            } finally {
              if (r) throw a;
            }
          }return t;
        }(A, e);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        r = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        a = t(3),
        o = t(60),
        i = B(t(172)),
        s = t(6),
        l = t(9),
        u = B(t(71)),
        c = t(171);function B(A) {
      return A && A.__esModule ? A : { default: A };
    }var d = e.DocumentCloner = function () {
      function A(e, t, n, r, a) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.referenceElement = e, this.scrolledElements = [], this.copyStyles = r, this.inlineImages = r, this.logger = n, this.options = t, this.renderer = a, this.resourceLoader = new i.default(t, n, window), this.pseudoContentData = { counters: {}, quoteDepth: 0 }, this.documentElement = this.cloneNode(e.ownerDocument.documentElement);
      }return r(A, [{ key: "inlineAllImages", value: function value(A) {
          var e = this;if (this.inlineImages && A) {
            var t = A.style;Promise.all((0, l.parseBackgroundImage)(t.backgroundImage).map(function (A) {
              return "url" === A.method ? e.resourceLoader.inlineImage(A.args[0]).then(function (A) {
                return A && "string" == typeof A.src ? 'url("' + A.src + '")' : "none";
              }).catch(function (A) {
                0;
              }) : Promise.resolve("" + A.prefix + A.method + "(" + A.args.join(",") + ")");
            })).then(function (A) {
              A.length > 1 && (t.backgroundColor = ""), t.backgroundImage = A.join(",");
            }), A instanceof HTMLImageElement && this.resourceLoader.inlineImage(A.src).then(function (e) {
              if (e && A instanceof HTMLImageElement && A.parentNode) {
                var t = A.parentNode,
                    n = (0, s.copyCSSStyles)(A.style, e.cloneNode(!1));t.replaceChild(n, A);
              }
            }).catch(function (A) {
              0;
            });
          }
        } }, { key: "inlineFonts", value: function value(A) {
          var e = this;return Promise.all(Array.from(A.styleSheets).map(function (e) {
            return e.href ? fetch(e.href).then(function (A) {
              return A.text();
            }).then(function (A) {
              return h(A, e.href);
            }).catch(function (A) {
              return [];
            }) : f(e, A);
          })).then(function (A) {
            return A.reduce(function (A, e) {
              return A.concat(e);
            }, []);
          }).then(function (A) {
            return Promise.all(A.map(function (A) {
              return fetch(A.formats[0].src).then(function (A) {
                return A.blob();
              }).then(function (A) {
                return new Promise(function (e, t) {
                  var n = new FileReader();n.onerror = t, n.onload = function () {
                    var A = n.result;e(A);
                  }, n.readAsDataURL(A);
                });
              }).then(function (e) {
                return A.fontFace.setProperty("src", 'url("' + e + '")'), "@font-face {" + A.fontFace.cssText + " ";
              });
            }));
          }).then(function (t) {
            var n = A.createElement("style");n.textContent = t.join("\n"), e.documentElement.appendChild(n);
          });
        } }, { key: "createElementClone", value: function value(A) {
          var e = this;if (this.copyStyles && A instanceof HTMLCanvasElement) {
            var t = A.ownerDocument.createElement("img");try {
              return t.src = A.toDataURL(), t;
            } catch (A) {
              0;
            }
          }if (A instanceof HTMLIFrameElement) {
            var n = A.cloneNode(!1),
                r = m();n.setAttribute("data-html2canvas-internal-iframe-key", r);var o = (0, a.parseBounds)(A, 0, 0),
                i = o.width,
                l = o.height;return this.resourceLoader.cache[r] = H(A, this.options).then(function (A) {
              return e.renderer(A, { async: e.options.async, allowTaint: e.options.allowTaint, backgroundColor: "#ffffff", canvas: null, imageTimeout: e.options.imageTimeout, logging: e.options.logging, proxy: e.options.proxy, removeContainer: e.options.removeContainer, scale: e.options.scale, foreignObjectRendering: e.options.foreignObjectRendering, useCORS: e.options.useCORS, target: new u.default(), width: i, height: l, x: 0, y: 0, windowWidth: A.ownerDocument.defaultView.innerWidth, windowHeight: A.ownerDocument.defaultView.innerHeight, scrollX: A.ownerDocument.defaultView.pageXOffset, scrollY: A.ownerDocument.defaultView.pageYOffset }, e.logger.child(r));
            }).then(function (e) {
              return new Promise(function (t, r) {
                var a = document.createElement("img");a.onload = function () {
                  return t(e);
                }, a.onerror = r, a.src = e.toDataURL(), n.parentNode && n.parentNode.replaceChild((0, s.copyCSSStyles)(A.ownerDocument.defaultView.getComputedStyle(A), a), n);
              });
            }), n;
          }if (A instanceof HTMLStyleElement && A.sheet && A.sheet.cssRules) {
            var c = [].slice.call(A.sheet.cssRules, 0).reduce(function (A, t) {
              try {
                return t && t.cssText ? A + t.cssText : A;
              } catch (n) {
                return e.logger.log("Unable to access cssText property", t.name), A;
              }
            }, ""),
                B = A.cloneNode(!1);return B.textContent = c, B;
          }return A.cloneNode(!1);
        } }, { key: "cloneNode", value: function value(A) {
          var e = A.nodeType === Node.TEXT_NODE ? document.createTextNode(A.nodeValue) : this.createElementClone(A),
              t = A.ownerDocument.defaultView,
              n = A instanceof t.HTMLElement ? t.getComputedStyle(A) : null,
              r = A instanceof t.HTMLElement ? t.getComputedStyle(A, ":before") : null,
              a = A instanceof t.HTMLElement ? t.getComputedStyle(A, ":after") : null;this.referenceElement === A && e instanceof t.HTMLElement && (this.clonedReferenceElement = e), e instanceof t.HTMLBodyElement && F(e);for (var o = (0, c.parseCounterReset)(n, this.pseudoContentData), i = (0, c.resolvePseudoContent)(A, r, this.pseudoContentData), l = A.firstChild; l; l = l.nextSibling) {
            l.nodeType === Node.ELEMENT_NODE && ("SCRIPT" === l.nodeName || l.hasAttribute("data-html2canvas-ignore") || "function" == typeof this.options.ignoreElements && this.options.ignoreElements(l)) || this.copyStyles && "STYLE" === l.nodeName || e.appendChild(this.cloneNode(l));
          }var u = (0, c.resolvePseudoContent)(A, a, this.pseudoContentData);if ((0, c.popCounters)(o, this.pseudoContentData), A instanceof t.HTMLElement && e instanceof t.HTMLElement) switch (r && this.inlineAllImages(w(A, e, r, i, Q)), a && this.inlineAllImages(w(A, e, a, u, p)), !n || !this.copyStyles || A instanceof HTMLIFrameElement || (0, s.copyCSSStyles)(n, e), this.inlineAllImages(e), 0 === A.scrollTop && 0 === A.scrollLeft || this.scrolledElements.push([e, A.scrollLeft, A.scrollTop]), A.nodeName) {case "CANVAS":
              this.copyStyles || g(A, e);break;case "TEXTAREA":case "SELECT":
              e.value = A.value;}return e;
        } }]), A;
    }(),
        f = function f(A, e) {
      return (A.cssRules ? Array.from(A.cssRules) : []).filter(function (A) {
        return A.type === CSSRule.FONT_FACE_RULE;
      }).map(function (A) {
        for (var t = (0, l.parseBackgroundImage)(A.style.getPropertyValue("src")), n = [], r = 0; r < t.length; r++) {
          if ("url" === t[r].method && t[r + 1] && "format" === t[r + 1].method) {
            var a = e.createElement("a");a.href = t[r].args[0], e.body && e.body.appendChild(a);var o = { src: a.href, format: t[r + 1].args[0] };n.push(o);
          }
        }return { formats: n.filter(function (A) {
            return (/^woff/i.test(A.format)
            );
          }), fontFace: A.style };
      }).filter(function (A) {
        return A.formats.length;
      });
    },
        h = function h(A, e) {
      var t = document.implementation.createHTMLDocument(""),
          n = document.createElement("base");n.href = e;var r = document.createElement("style");return r.textContent = A, t.head && t.head.appendChild(n), t.body && t.body.appendChild(r), r.sheet ? f(r.sheet, t) : [];
    },
        g = function g(A, e) {
      try {
        if (e) {
          e.width = A.width, e.height = A.height;var t = A.getContext("2d"),
              n = e.getContext("2d");t ? n.putImageData(t.getImageData(0, 0, A.width, A.height), 0, 0) : n.drawImage(A, 0, 0);
        }
      } catch (A) {}
    },
        w = function w(A, e, t, n, r) {
      if (t && t.content && "none" !== t.content && "-moz-alt-content" !== t.content && "none" !== t.display) {
        var a = e.ownerDocument.createElement("html2canvaspseudoelement");if ((0, s.copyCSSStyles)(t, a), n) for (var o = n.length, i = 0; i < o; i++) {
          var u = n[i];switch (u.type) {case c.PSEUDO_CONTENT_ITEM_TYPE.IMAGE:
              var B = e.ownerDocument.createElement("img");B.src = (0, l.parseBackgroundImage)("url(" + u.value + ")")[0].args[0], B.style.opacity = "1", a.appendChild(B);break;case c.PSEUDO_CONTENT_ITEM_TYPE.TEXT:
              a.appendChild(e.ownerDocument.createTextNode(u.value));}
        }return a.className = U + " " + C, e.className += r === Q ? " " + U : " " + C, r === Q ? e.insertBefore(a, e.firstChild) : e.appendChild(a), a;
      }
    },
        Q = ":before",
        p = ":after",
        U = "___html2canvas___pseudoelement_before",
        C = "___html2canvas___pseudoelement_after",
        F = function F(A) {
      v(A, "." + U + Q + '{\n    content: "" !important;\n    display: none !important;\n}\n         .' + C + p + '{\n    content: "" !important;\n    display: none !important;\n}');
    },
        v = function v(A, e) {
      var t = A.ownerDocument.createElement("style");t.innerHTML = e, A.appendChild(t);
    },
        E = function E(A) {
      var e = n(A, 3),
          t = e[0],
          r = e[1],
          a = e[2];t.scrollLeft = r, t.scrollTop = a;
    },
        m = function m() {
      return Math.ceil(Date.now() + 1e7 * Math.random()).toString(16);
    },
        y = /^data:text\/(.+);(base64)?,(.*)$/i,
        H = function H(A, e) {
      try {
        return Promise.resolve(A.contentWindow.document.documentElement);
      } catch (t) {
        return e.proxy ? (0, o.Proxy)(A.src, e).then(function (A) {
          var e = A.match(y);return e ? "base64" === e[2] ? window.atob(decodeURIComponent(e[3])) : decodeURIComponent(e[3]) : Promise.reject();
        }).then(function (e) {
          return _(A.ownerDocument, (0, a.parseBounds)(A, 0, 0)).then(function (A) {
            var t = A.contentWindow.document;t.open(), t.write(e);var n = b(A).then(function () {
              return t.documentElement;
            });return t.close(), n;
          });
        }) : Promise.reject();
      }
    },
        _ = function _(A, e) {
      var t = A.createElement("iframe");return t.className = "html2canvas-container", t.style.visibility = "hidden", t.style.position = "fixed", t.style.left = "-10000px", t.style.top = "0px", t.style.border = "0", t.width = e.width.toString(), t.height = e.height.toString(), t.scrolling = "no", t.setAttribute("data-html2canvas-ignore", "true"), A.body ? (A.body.appendChild(t), Promise.resolve(t)) : Promise.reject("");
    },
        b = function b(A) {
      var e = A.contentWindow,
          t = e.document;return new Promise(function (n, r) {
        e.onload = A.onload = t.onreadystatechange = function () {
          var e = setInterval(function () {
            t.body.childNodes.length > 0 && "complete" === t.readyState && (clearInterval(e), n(A));
          }, 50);
        };
      });
    },
        N = (e.cloneWindow = function (A, e, t, n, r, a) {
      var o = new d(t, n, r, !1, a),
          i = A.defaultView.pageXOffset,
          s = A.defaultView.pageYOffset;return _(A, e).then(function (r) {
        var a = r.contentWindow,
            l = a.document,
            u = b(r).then(function () {
          o.scrolledElements.forEach(E), a.scrollTo(e.left, e.top), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || a.scrollY === e.top && a.scrollX === e.left || (l.documentElement.style.top = -e.top + "px", l.documentElement.style.left = -e.left + "px", l.documentElement.style.position = "absolute");var t = Promise.resolve([r, o.clonedReferenceElement, o.resourceLoader]),
              i = n.onclone;return o.clonedReferenceElement instanceof a.HTMLElement || o.clonedReferenceElement instanceof A.defaultView.HTMLElement || o.clonedReferenceElement instanceof HTMLElement ? "function" == typeof i ? Promise.resolve().then(function () {
            return i(l);
          }).then(function () {
            return t;
          }) : t : Promise.reject("");
        });return l.open(), l.write(N(document.doctype) + "<html></html>"), function (A, e, t) {
          !A.defaultView || e === A.defaultView.pageXOffset && t === A.defaultView.pageYOffset || A.defaultView.scrollTo(e, t);
        }(t.ownerDocument, i, s), l.replaceChild(l.adoptNode(o.documentElement), l.documentElement), l.close(), u;
      });
    }, function (A) {
      var e = "";return A && (e += "<!DOCTYPE ", A.name && (e += A.name), A.internalSubset && (e += A.internalSubset), A.publicId && (e += '"' + A.publicId + '"'), A.systemId && (e += '"' + A.systemId + '"'), e += ">"), e;
    });
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = /([+-]?\d*\.?\d+)(deg|grad|rad|turn)/i;e.parseAngle = function (A) {
      var e = A.match(n);if (e) {
        var t = parseFloat(e[1]);switch (e[2].toLowerCase()) {case "deg":
            return Math.PI * t / 180;case "grad":
            return Math.PI / 200 * t;case "rad":
            return t;case "turn":
            return 2 * Math.PI * t;}
      }return null;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.transformWebkitRadialGradientArgs = e.parseGradient = e.RadialGradient = e.LinearGradient = e.RADIAL_GRADIENT_SHAPE = e.GRADIENT_TYPE = void 0;var n = function () {
      return function (A, e) {
        if (Array.isArray(A)) return A;if (Symbol.iterator in Object(A)) return function (A, e) {
          var t = [],
              n = !0,
              r = !1,
              a = void 0;try {
            for (var o, i = A[Symbol.iterator](); !(n = (o = i.next()).done) && (t.push(o.value), !e || t.length !== e); n = !0) {}
          } catch (A) {
            r = !0, a = A;
          } finally {
            try {
              !n && i.return && i.return();
            } finally {
              if (r) throw a;
            }
          }return t;
        }(A, e);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        r = (l(t(7)), t(174)),
        a = l(t(2)),
        o = t(4),
        i = l(o),
        s = t(6);function l(A) {
      return A && A.__esModule ? A : { default: A };
    }function u(A, e) {
      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
    }var c = /^(to )?(left|top|right|bottom)( (left|top|right|bottom))?$/i,
        B = /^([+-]?\d*\.?\d+)% ([+-]?\d*\.?\d+)%$/i,
        d = /(px)|%|( 0)$/i,
        f = /^(from|to|color-stop)\((?:([\d.]+)(%)?,\s*)?(.+?)\)$/i,
        h = /^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*(?:(left|center|right)|([\d.]+)(px|r?em|%))\s+(?:(top|center|bottom)|([\d.]+)(px|r?em|%)))?(?:\s|$)/i,
        g = e.GRADIENT_TYPE = { LINEAR_GRADIENT: 0, RADIAL_GRADIENT: 1 },
        w = e.RADIAL_GRADIENT_SHAPE = { CIRCLE: 0, ELLIPSE: 1 },
        Q = { left: new i.default("0%"), top: new i.default("0%"), center: new i.default("50%"), right: new i.default("100%"), bottom: new i.default("100%") },
        p = e.LinearGradient = function A(e, t) {
      u(this, A), this.type = g.LINEAR_GRADIENT, this.colorStops = e, this.direction = t;
    },
        U = e.RadialGradient = function A(e, t, n, r) {
      u(this, A), this.type = g.RADIAL_GRADIENT, this.colorStops = e, this.shape = t, this.center = n, this.radius = r;
    },
        C = (e.parseGradient = function (A, e, t) {
      var n = e.args,
          r = e.method,
          a = e.prefix;return "linear-gradient" === r ? F(n, t, !!a) : "gradient" === r && "linear" === n[0] ? F(["to bottom"].concat(T(n.slice(3))), t, !!a) : "radial-gradient" === r ? v(A, "-webkit-" === a ? N(n) : n, t) : "gradient" === r && "radial" === n[0] ? v(A, T(N(n.slice(1))), t) : void 0;
    }, function (A, e, t) {
      for (var n = [], r = e; r < A.length; r++) {
        var o = A[r],
            s = d.test(o),
            l = o.lastIndexOf(" "),
            u = new a.default(s ? o.substring(0, l) : o),
            c = s ? new i.default(o.substring(l + 1)) : r === e ? new i.default("0%") : r === A.length - 1 ? new i.default("100%") : null;n.push({ color: u, stop: c });
      }for (var B = n.map(function (A) {
        var e = A.color,
            n = A.stop;return { color: e, stop: 0 === t ? 0 : n ? n.getAbsoluteValue(t) / t : null };
      }), f = B[0].stop, h = 0; h < B.length; h++) {
        if (null !== f) {
          var g = B[h].stop;if (null === g) {
            for (var w = h; null === B[w].stop;) {
              w++;
            }for (var Q = w - h + 1, p = (B[w].stop - f) / Q; h < w; h++) {
              f = B[h].stop = f + p;
            }
          } else f = g;
        }
      }return B;
    }),
        F = function F(A, e, t) {
      var n = (0, r.parseAngle)(A[0]),
          a = c.test(A[0]),
          o = a || null !== n || B.test(A[0]),
          i = o ? null !== n ? E(t ? n - .5 * Math.PI : n, e) : a ? y(A[0], e) : H(A[0], e) : E(Math.PI, e),
          l = o ? 1 : 0,
          u = Math.min((0, s.distance)(Math.abs(i.x0) + Math.abs(i.x1), Math.abs(i.y0) + Math.abs(i.y1)), 2 * e.width, 2 * e.height);return new p(C(A, l, u), i);
    },
        v = function v(A, e, t) {
      var n = e[0].match(h),
          r = n && ("circle" === n[1] || void 0 !== n[3] && void 0 === n[5]) ? w.CIRCLE : w.ELLIPSE,
          a = {},
          i = {};n && (void 0 !== n[3] && (a.x = (0, o.calculateLengthFromValueWithUnit)(A, n[3], n[4]).getAbsoluteValue(t.width)), void 0 !== n[5] && (a.y = (0, o.calculateLengthFromValueWithUnit)(A, n[5], n[6]).getAbsoluteValue(t.height)), n[7] ? i.x = Q[n[7].toLowerCase()] : void 0 !== n[8] && (i.x = (0, o.calculateLengthFromValueWithUnit)(A, n[8], n[9])), n[10] ? i.y = Q[n[10].toLowerCase()] : void 0 !== n[11] && (i.y = (0, o.calculateLengthFromValueWithUnit)(A, n[11], n[12])));var s = { x: void 0 === i.x ? t.width / 2 : i.x.getAbsoluteValue(t.width), y: void 0 === i.y ? t.height / 2 : i.y.getAbsoluteValue(t.height) },
          l = b(n && n[2] || "farthest-corner", r, s, a, t);return new U(C(e, n ? 1 : 0, Math.min(l.x, l.y)), r, s, l);
    },
        E = function E(A, e) {
      var t = e.width,
          n = e.height,
          r = .5 * t,
          a = .5 * n,
          o = (Math.abs(t * Math.sin(A)) + Math.abs(n * Math.cos(A))) / 2,
          i = r + Math.sin(A) * o,
          s = a - Math.cos(A) * o;return { x0: i, x1: t - i, y0: s, y1: n - s };
    },
        m = function m(A) {
      return Math.acos(A.width / 2 / ((0, s.distance)(A.width, A.height) / 2));
    },
        y = function y(A, e) {
      switch (A) {case "bottom":case "to top":
          return E(0, e);case "left":case "to right":
          return E(Math.PI / 2, e);case "right":case "to left":
          return E(3 * Math.PI / 2, e);case "top right":case "right top":case "to bottom left":case "to left bottom":
          return E(Math.PI + m(e), e);case "top left":case "left top":case "to bottom right":case "to right bottom":
          return E(Math.PI - m(e), e);case "bottom left":case "left bottom":case "to top right":case "to right top":
          return E(m(e), e);case "bottom right":case "right bottom":case "to top left":case "to left top":
          return E(2 * Math.PI - m(e), e);case "top":case "to bottom":default:
          return E(Math.PI, e);}
    },
        H = function H(A, e) {
      var t = A.split(" ").map(parseFloat),
          r = n(t, 2),
          a = r[0],
          o = r[1],
          i = a / 100 * e.width / (o / 100 * e.height);return E(Math.atan(isNaN(i) ? 1 : i) + Math.PI / 2, e);
    },
        _ = function _(A, e, t, n) {
      return [{ x: 0, y: 0 }, { x: 0, y: A.height }, { x: A.width, y: 0 }, { x: A.width, y: A.height }].reduce(function (A, r) {
        var a = (0, s.distance)(e - r.x, t - r.y);return (n ? a < A.optimumDistance : a > A.optimumDistance) ? { optimumCorner: r, optimumDistance: a } : A;
      }, { optimumDistance: n ? 1 / 0 : -1 / 0, optimumCorner: null }).optimumCorner;
    },
        b = function b(A, e, t, n, r) {
      var a = t.x,
          o = t.y,
          i = 0,
          l = 0;switch (A) {case "closest-side":
          e === w.CIRCLE ? i = l = Math.min(Math.abs(a), Math.abs(a - r.width), Math.abs(o), Math.abs(o - r.height)) : e === w.ELLIPSE && (i = Math.min(Math.abs(a), Math.abs(a - r.width)), l = Math.min(Math.abs(o), Math.abs(o - r.height)));break;case "closest-corner":
          if (e === w.CIRCLE) i = l = Math.min((0, s.distance)(a, o), (0, s.distance)(a, o - r.height), (0, s.distance)(a - r.width, o), (0, s.distance)(a - r.width, o - r.height));else if (e === w.ELLIPSE) {
            var u = Math.min(Math.abs(o), Math.abs(o - r.height)) / Math.min(Math.abs(a), Math.abs(a - r.width)),
                c = _(r, a, o, !0);l = u * (i = (0, s.distance)(c.x - a, (c.y - o) / u));
          }break;case "farthest-side":
          e === w.CIRCLE ? i = l = Math.max(Math.abs(a), Math.abs(a - r.width), Math.abs(o), Math.abs(o - r.height)) : e === w.ELLIPSE && (i = Math.max(Math.abs(a), Math.abs(a - r.width)), l = Math.max(Math.abs(o), Math.abs(o - r.height)));break;case "farthest-corner":
          if (e === w.CIRCLE) i = l = Math.max((0, s.distance)(a, o), (0, s.distance)(a, o - r.height), (0, s.distance)(a - r.width, o), (0, s.distance)(a - r.width, o - r.height));else if (e === w.ELLIPSE) {
            var B = Math.max(Math.abs(o), Math.abs(o - r.height)) / Math.max(Math.abs(a), Math.abs(a - r.width)),
                d = _(r, a, o, !1);l = B * (i = (0, s.distance)(d.x - a, (d.y - o) / B));
          }break;default:
          i = n.x || 0, l = void 0 !== n.y ? n.y : i;}return { x: i, y: l };
    },
        N = e.transformWebkitRadialGradientArgs = function (A) {
      var e = "",
          t = "",
          n = "",
          r = "",
          a = 0,
          o = /^(left|center|right|\d+(?:px|r?em|%)?)(?:\s+(top|center|bottom|\d+(?:px|r?em|%)?))?$/i,
          i = /^\d+(px|r?em|%)?(?:\s+\d+(px|r?em|%)?)?$/i,
          s = A[a].match(o);s && a++;var l = A[a].match(/^(circle|ellipse)?\s*(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)?$/i);l && (e = l[1] || "", "contain" === (n = l[2] || "") ? n = "closest-side" : "cover" === n && (n = "farthest-corner"), a++);var u = A[a].match(i);u && a++;var c = A[a].match(o);c && a++;var B = A[a].match(i);B && a++;var d = c || s;d && d[1] && (r = d[1] + (/^\d+$/.test(d[1]) ? "px" : ""), d[2] && (r += " " + d[2] + (/^\d+$/.test(d[2]) ? "px" : "")));var f = B || u;return f && (t = f[0], f[1] || (t += "px")), !r || e || t || n || (t = r, r = ""), r && (r = "at " + r), [[e, n, t, r].filter(function (A) {
        return !!A;
      }).join(" ")].concat(A.slice(a));
    },
        T = function T(A) {
      return A.map(function (A) {
        return A.match(f);
      }).map(function (e, t) {
        if (!e) return A[t];switch (e[1]) {case "from":
            return e[4] + " 0%";case "to":
            return e[4] + " 100%";case "color-stop":
            return "%" === e[3] ? e[4] + " " + e[2] : e[4] + " " + 100 * parseFloat(e[2]) + "%";}
      });
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = function () {
      return function (A, e) {
        if (Array.isArray(A)) return A;if (Symbol.iterator in Object(A)) return function (A, e) {
          var t = [],
              n = !0,
              r = !1,
              a = void 0;try {
            for (var o, i = A[Symbol.iterator](); !(n = (o = i.next()).done) && (t.push(o.value), !e || t.length !== e); n = !0) {}
          } catch (A) {
            r = !0, a = A;
          } finally {
            try {
              !n && i.return && i.return();
            } finally {
              if (r) throw a;
            }
          }return t;
        }(A, e);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        a = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        o = t(3),
        i = (t(61), t(175)),
        s = t(13),
        l = (n = s) && n.__esModule ? n : { default: n },
        u = t(9),
        c = t(37);var B = function () {
      function A(e, t) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.target = e, this.options = t, e.render(t);
      }return a(A, [{ key: "renderNode", value: function value(A) {
          A.isVisible() && (this.renderNodeBackgroundAndBorders(A), this.renderNodeContent(A));
        } }, { key: "renderNodeContent", value: function value(A) {
          var e = this,
              t = function t() {
            if (A.childNodes.length && A.childNodes.forEach(function (t) {
              if (t instanceof l.default) {
                var n = t.parent.style;e.target.renderTextNode(t.bounds, n.color, n.font, n.textDecoration, n.textShadow);
              } else e.target.drawShape(t, A.style.color);
            }), A.image) {
              var t = e.options.imageStore.get(A.image);if (t) {
                var n = (0, o.calculateContentBox)(A.bounds, A.style.padding, A.style.border),
                    r = "number" == typeof t.width && t.width > 0 ? t.width : n.width,
                    a = "number" == typeof t.height && t.height > 0 ? t.height : n.height;r > 0 && a > 0 && e.target.clip([(0, o.calculatePaddingBoxPath)(A.curvedBounds)], function () {
                  e.target.drawImage(t, new o.Bounds(0, 0, r, a), n);
                });
              }
            }
          },
              n = A.getClipPaths();n.length ? this.target.clip(n, t) : t();
        } }, { key: "renderNodeBackgroundAndBorders", value: function value(A) {
          var e = this,
              t = !A.style.background.backgroundColor.isTransparent() || A.style.background.backgroundImage.length,
              n = A.style.border.some(function (A) {
            return A.borderStyle !== c.BORDER_STYLE.NONE && !A.borderColor.isTransparent();
          }),
              r = function r() {
            var n = (0, u.calculateBackgroungPaintingArea)(A.curvedBounds, A.style.background.backgroundClip);t && e.target.clip([n], function () {
              A.style.background.backgroundColor.isTransparent() || e.target.fill(A.style.background.backgroundColor), e.renderBackgroundImage(A);
            }), A.style.border.forEach(function (t, n) {
              t.borderStyle === c.BORDER_STYLE.NONE || t.borderColor.isTransparent() || e.renderBorder(t, n, A.curvedBounds);
            });
          };if (t || n) {
            var a = A.parent ? A.parent.getClipPaths() : [];a.length ? this.target.clip(a, r) : r();
          }
        } }, { key: "renderBackgroundImage", value: function value(A) {
          var e = this;A.style.background.backgroundImage.slice(0).reverse().forEach(function (t) {
            "url" === t.source.method && t.source.args.length ? e.renderBackgroundRepeat(A, t) : /gradient/i.test(t.source.method) && e.renderBackgroundGradient(A, t);
          });
        } }, { key: "renderBackgroundRepeat", value: function value(A, e) {
          var t = this.options.imageStore.get(e.source.args[0]);if (t) {
            var n = (0, u.calculateBackgroungPositioningArea)(A.style.background.backgroundOrigin, A.bounds, A.style.padding, A.style.border),
                r = (0, u.calculateBackgroundSize)(e, t, n),
                a = (0, u.calculateBackgroundPosition)(e.position, r, n),
                o = (0, u.calculateBackgroundRepeatPath)(e, a, r, n, A.bounds),
                i = Math.round(n.left + a.x),
                s = Math.round(n.top + a.y);this.target.renderRepeat(o, t, r, i, s);
          }
        } }, { key: "renderBackgroundGradient", value: function value(A, e) {
          var t = (0, u.calculateBackgroungPositioningArea)(A.style.background.backgroundOrigin, A.bounds, A.style.padding, A.style.border),
              n = (0, u.calculateGradientBackgroundSize)(e, t),
              r = (0, u.calculateBackgroundPosition)(e.position, n, t),
              a = new o.Bounds(Math.round(t.left + r.x), Math.round(t.top + r.y), n.width, n.height),
              s = (0, i.parseGradient)(A, e.source, a);if (s) switch (s.type) {case i.GRADIENT_TYPE.LINEAR_GRADIENT:
              this.target.renderLinearGradient(a, s);break;case i.GRADIENT_TYPE.RADIAL_GRADIENT:
              this.target.renderRadialGradient(a, s);}
        } }, { key: "renderBorder", value: function value(A, e, t) {
          this.target.drawShape((0, o.parsePathForBorder)(t, e), A.borderColor);
        } }, { key: "renderStack", value: function value(A) {
          var e = this;if (A.container.isVisible()) {
            var t = A.getOpacity();t !== this._opacity && (this.target.setOpacity(A.getOpacity()), this._opacity = t);var n = A.container.style.transform;null !== n ? this.target.transform(A.container.bounds.left + n.transformOrigin[0].value, A.container.bounds.top + n.transformOrigin[1].value, n.transform, function () {
              return e.renderStackContent(A);
            }) : this.renderStackContent(A);
          }
        } }, { key: "renderStackContent", value: function value(A) {
          var e = f(A),
              t = r(e, 5),
              n = t[0],
              a = t[1],
              o = t[2],
              i = t[3],
              s = t[4],
              l = d(A),
              u = r(l, 2),
              c = u[0],
              B = u[1];this.renderNodeBackgroundAndBorders(A.container), n.sort(h).forEach(this.renderStack, this), this.renderNodeContent(A.container), B.forEach(this.renderNode, this), i.forEach(this.renderStack, this), s.forEach(this.renderStack, this), c.forEach(this.renderNode, this), a.forEach(this.renderStack, this), o.sort(h).forEach(this.renderStack, this);
        } }, { key: "render", value: function value(A) {
          return this.options.backgroundColor && this.target.rectangle(this.options.x, this.options.y, this.options.width, this.options.height, this.options.backgroundColor), this.renderStack(A), this.target.getTarget();
        } }]), A;
    }();e.default = B;var d = function d(A) {
      for (var e = [], t = [], n = A.children.length, r = 0; r < n; r++) {
        var a = A.children[r];a.isInlineLevel() ? e.push(a) : t.push(a);
      }return [e, t];
    },
        f = function f(A) {
      for (var e = [], t = [], n = [], r = [], a = [], o = A.contexts.length, i = 0; i < o; i++) {
        var s = A.contexts[i];s.container.isPositioned() || s.container.style.opacity < 1 || s.container.isTransformed() ? s.container.style.zIndex.order < 0 ? e.push(s) : s.container.style.zIndex.order > 0 ? n.push(s) : t.push(s) : s.container.isFloating() ? r.push(s) : a.push(s);
      }return [e, t, n, r, a];
    },
        h = function h(A, e) {
      return A.container.style.zIndex.order > e.container.style.zIndex.order ? 1 : A.container.style.zIndex.order < e.container.style.zIndex.order ? -1 : A.container.index > e.container.index ? 1 : -1;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = t(16);e.default = function A(e, t, r) {
      !function (A, e) {
        if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, A), this.type = n.PATH.CIRCLE, this.x = e, this.y = t, this.radius = r;
    };
  }, function (A, e, t) {
    "use strict";
    A.exports = "KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA";
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.Trie = e.createTrieFromBase64 = e.UTRIE2_INDEX_2_MASK = e.UTRIE2_INDEX_2_BLOCK_LENGTH = e.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = e.UTRIE2_INDEX_1_OFFSET = e.UTRIE2_UTF8_2B_INDEX_2_LENGTH = e.UTRIE2_UTF8_2B_INDEX_2_OFFSET = e.UTRIE2_INDEX_2_BMP_LENGTH = e.UTRIE2_LSCP_INDEX_2_LENGTH = e.UTRIE2_DATA_MASK = e.UTRIE2_DATA_BLOCK_LENGTH = e.UTRIE2_LSCP_INDEX_2_OFFSET = e.UTRIE2_SHIFT_1_2 = e.UTRIE2_INDEX_SHIFT = e.UTRIE2_SHIFT_1 = e.UTRIE2_SHIFT_2 = void 0;var n = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        r = t(36);var a = e.UTRIE2_SHIFT_2 = 5,
        o = e.UTRIE2_SHIFT_1 = 11,
        i = e.UTRIE2_INDEX_SHIFT = 2,
        s = e.UTRIE2_SHIFT_1_2 = o - a,
        l = e.UTRIE2_LSCP_INDEX_2_OFFSET = 65536 >> a,
        u = e.UTRIE2_DATA_BLOCK_LENGTH = 1 << a,
        c = e.UTRIE2_DATA_MASK = u - 1,
        B = e.UTRIE2_LSCP_INDEX_2_LENGTH = 1024 >> a,
        d = e.UTRIE2_INDEX_2_BMP_LENGTH = l + B,
        f = e.UTRIE2_UTF8_2B_INDEX_2_OFFSET = d,
        h = e.UTRIE2_UTF8_2B_INDEX_2_LENGTH = 32,
        g = e.UTRIE2_INDEX_1_OFFSET = f + h,
        w = e.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 65536 >> o,
        Q = e.UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << s,
        p = e.UTRIE2_INDEX_2_MASK = Q - 1,
        U = (e.createTrieFromBase64 = function (A) {
      var e = (0, r.decode)(A),
          t = Array.isArray(e) ? (0, r.polyUint32Array)(e) : new Uint32Array(e),
          n = Array.isArray(e) ? (0, r.polyUint16Array)(e) : new Uint16Array(e),
          a = n.slice(12, t[4] / 2),
          o = 2 === t[5] ? n.slice((24 + t[4]) / 2) : t.slice(Math.ceil((24 + t[4]) / 4));return new U(t[0], t[1], t[2], t[3], a, o);
    }, e.Trie = function () {
      function A(e, t, n, r, a, o) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.initialValue = e, this.errorValue = t, this.highStart = n, this.highValueIndex = r, this.index = a, this.data = o;
      }return n(A, [{ key: "get", value: function value(A) {
          var e = void 0;if (A >= 0) {
            if (A < 55296 || A > 56319 && A <= 65535) return e = ((e = this.index[A >> a]) << i) + (A & c), this.data[e];if (A <= 65535) return e = ((e = this.index[l + (A - 55296 >> a)]) << i) + (A & c), this.data[e];if (A < this.highStart) return e = g - w + (A >> o), e = this.index[e], e += A >> a & p, e = ((e = this.index[e]) << i) + (A & c), this.data[e];if (A <= 1114111) return this.data[this.highValueIndex];
          }return this.errorValue;
        } }]), A;
    }());
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.LineBreaker = e.inlineBreakOpportunities = e.lineBreakAtIndex = e.codePointsToCharacterClasses = e.UnicodeTrie = e.BREAK_ALLOWED = e.BREAK_NOT_ALLOWED = e.BREAK_MANDATORY = e.classes = e.LETTER_NUMBER_MODIFIER = void 0;var n,
        r = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        a = function () {
      return function (A, e) {
        if (Array.isArray(A)) return A;if (Symbol.iterator in Object(A)) return function (A, e) {
          var t = [],
              n = !0,
              r = !1,
              a = void 0;try {
            for (var o, i = A[Symbol.iterator](); !(n = (o = i.next()).done) && (t.push(o.value), !e || t.length !== e); n = !0) {}
          } catch (A) {
            r = !0, a = A;
          } finally {
            try {
              !n && i.return && i.return();
            } finally {
              if (r) throw a;
            }
          }return t;
        }(A, e);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        o = t(179),
        i = t(178),
        s = (n = i) && n.__esModule ? n : { default: n },
        l = t(36);var u = e.LETTER_NUMBER_MODIFIER = 50,
        c = 10,
        B = 13,
        d = 15,
        f = 17,
        h = 18,
        g = 19,
        w = 20,
        Q = 21,
        p = 22,
        U = 24,
        C = 25,
        F = 26,
        v = 27,
        E = 28,
        m = 30,
        y = 32,
        H = 33,
        _ = 34,
        b = 35,
        N = 37,
        T = 38,
        I = 39,
        S = 40,
        K = 42,
        M = (e.classes = { BK: 1, CR: 2, LF: 3, CM: 4, NL: 5, SG: 6, WJ: 7, ZW: 8, GL: 9, SP: c, ZWJ: 11, B2: 12, BA: B, BB: 14, HY: d, CB: 16, CL: f, CP: h, EX: g, IN: w, NS: Q, OP: p, QU: 23, IS: U, NU: C, PO: F, PR: v, SY: E, AI: 29, AL: m, CJ: 31, EB: y, EM: H, H2: _, H3: b, HL: 36, ID: N, JL: T, JV: I, JT: S, RI: 41, SA: K, XX: 43 }, e.BREAK_MANDATORY = "!"),
        D = e.BREAK_NOT_ALLOWED = "×",
        L = e.BREAK_ALLOWED = "÷",
        O = e.UnicodeTrie = (0, o.createTrieFromBase64)(s.default),
        x = [m, 36],
        P = [1, 2, 3, 5],
        R = [c, 8],
        k = [v, F],
        V = P.concat(R),
        X = [T, I, S, _, b],
        z = [d, B],
        J = e.codePointsToCharacterClasses = function (A) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "strict",
          t = [],
          n = [],
          r = [];return A.forEach(function (A, a) {
        var o = O.get(A);if (o > u ? (r.push(!0), o -= u) : r.push(!1), -1 !== ["normal", "auto", "loose"].indexOf(e) && -1 !== [8208, 8211, 12316, 12448].indexOf(A)) return n.push(a), t.push(16);if (4 === o || 11 === o) {
          if (0 === a) return n.push(a), t.push(m);var i = t[a - 1];return -1 === V.indexOf(i) ? (n.push(n[a - 1]), t.push(i)) : (n.push(a), t.push(m));
        }return n.push(a), 31 === o ? t.push("strict" === e ? Q : N) : o === K ? t.push(m) : 29 === o ? t.push(m) : 43 === o ? A >= 131072 && A <= 196605 || A >= 196608 && A <= 262141 ? t.push(N) : t.push(m) : void t.push(o);
      }), [n, t, r];
    },
        Y = function Y(A, e, t, n) {
      var r = n[t];if (Array.isArray(A) ? -1 !== A.indexOf(r) : A === r) for (var a = t; a <= n.length;) {
        var o = n[++a];if (o === e) return !0;if (o !== c) break;
      }if (r === c) for (var i = t; i > 0;) {
        var s = n[--i];if (Array.isArray(A) ? -1 !== A.indexOf(s) : A === s) for (var l = t; l <= n.length;) {
          var u = n[++l];if (u === e) return !0;if (u !== c) break;
        }if (s !== c) break;
      }return !1;
    },
        G = function G(A, e) {
      for (var t = A; t >= 0;) {
        var n = e[t];if (n !== c) return n;t--;
      }return 0;
    },
        W = function W(A, e, t, n, r) {
      if (0 === t[n]) return D;var a = n - 1;if (Array.isArray(r) && !0 === r[a]) return D;var o = a - 1,
          i = a + 1,
          s = e[a],
          l = o >= 0 ? e[o] : 0,
          u = e[i];if (2 === s && 3 === u) return D;if (-1 !== P.indexOf(s)) return M;if (-1 !== P.indexOf(u)) return D;if (-1 !== R.indexOf(u)) return D;if (8 === G(a, e)) return L;if (11 === O.get(A[a]) && (u === N || u === y || u === H)) return D;if (7 === s || 7 === u) return D;if (9 === s) return D;if (-1 === [c, B, d].indexOf(s) && 9 === u) return D;if (-1 !== [f, h, g, U, E].indexOf(u)) return D;if (G(a, e) === p) return D;if (Y(23, p, a, e)) return D;if (Y([f, h], Q, a, e)) return D;if (Y(12, 12, a, e)) return D;if (s === c) return L;if (23 === s || 23 === u) return D;if (16 === u || 16 === s) return L;if (-1 !== [B, d, Q].indexOf(u) || 14 === s) return D;if (36 === l && -1 !== z.indexOf(s)) return D;if (s === E && 36 === u) return D;if (u === w && -1 !== x.concat(w, g, C, N, y, H).indexOf(s)) return D;if (-1 !== x.indexOf(u) && s === C || -1 !== x.indexOf(s) && u === C) return D;if (s === v && -1 !== [N, y, H].indexOf(u) || -1 !== [N, y, H].indexOf(s) && u === F) return D;if (-1 !== x.indexOf(s) && -1 !== k.indexOf(u) || -1 !== k.indexOf(s) && -1 !== x.indexOf(u)) return D;if (-1 !== [v, F].indexOf(s) && (u === C || -1 !== [p, d].indexOf(u) && e[i + 1] === C) || -1 !== [p, d].indexOf(s) && u === C || s === C && -1 !== [C, E, U].indexOf(u)) return D;if (-1 !== [C, E, U, f, h].indexOf(u)) for (var m = a; m >= 0;) {
        var K = e[m];if (K === C) return D;if (-1 === [E, U].indexOf(K)) break;m--;
      }if (-1 !== [v, F].indexOf(u)) for (var V = -1 !== [f, h].indexOf(s) ? o : a; V >= 0;) {
        var J = e[V];if (J === C) return D;if (-1 === [E, U].indexOf(J)) break;V--;
      }if (T === s && -1 !== [T, I, _, b].indexOf(u) || -1 !== [I, _].indexOf(s) && -1 !== [I, S].indexOf(u) || -1 !== [S, b].indexOf(s) && u === S) return D;if (-1 !== X.indexOf(s) && -1 !== [w, F].indexOf(u) || -1 !== X.indexOf(u) && s === v) return D;if (-1 !== x.indexOf(s) && -1 !== x.indexOf(u)) return D;if (s === U && -1 !== x.indexOf(u)) return D;if (-1 !== x.concat(C).indexOf(s) && u === p || -1 !== x.concat(C).indexOf(u) && s === h) return D;if (41 === s && 41 === u) {
        for (var W = t[a], j = 1; W > 0 && 41 === e[--W];) {
          j++;
        }if (j % 2 != 0) return D;
      }return s === y && u === H ? D : L;
    },
        j = (e.lineBreakAtIndex = function (A, e) {
      if (0 === e) return D;if (e >= A.length) return M;var t = J(A),
          n = a(t, 2),
          r = n[0],
          o = n[1];return W(A, o, r, e);
    }, function (A, e) {
      e || (e = { lineBreak: "normal", wordBreak: "normal" });var t = J(A, e.lineBreak),
          n = a(t, 3),
          r = n[0],
          o = n[1],
          i = n[2];return "break-all" !== e.wordBreak && "break-word" !== e.wordBreak || (o = o.map(function (A) {
        return -1 !== [C, m, K].indexOf(A) ? N : A;
      })), [r, o, "keep-all" === e.wordBreak ? i.map(function (e, t) {
        return e && A[t] >= 19968 && A[t] <= 40959;
      }) : null];
    }),
        $ = (e.inlineBreakOpportunities = function (A, e) {
      var t = (0, l.toCodePoints)(A),
          n = D,
          r = j(t, e),
          o = a(r, 3),
          i = o[0],
          s = o[1],
          u = o[2];return t.forEach(function (A, e) {
        n += (0, l.fromCodePoint)(A) + (e >= t.length - 1 ? M : W(t, s, i, e + 1, u));
      }), n;
    }, function () {
      function A(e, t, n, r) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this._codePoints = e, this.required = t === M, this.start = n, this.end = r;
      }return r(A, [{ key: "slice", value: function value() {
          return l.fromCodePoint.apply(void 0, function (A) {
            if (Array.isArray(A)) {
              for (var e = 0, t = Array(A.length); e < A.length; e++) {
                t[e] = A[e];
              }return t;
            }return Array.from(A);
          }(this._codePoints.slice(this.start, this.end)));
        } }]), A;
    }());e.LineBreaker = function (A, e) {
      var t = (0, l.toCodePoints)(A),
          n = j(t, e),
          r = a(n, 3),
          o = r[0],
          i = r[1],
          s = r[2],
          u = t.length,
          c = 0,
          B = 0;return { next: function next() {
          if (B >= u) return { done: !0 };for (var A = D; B < u && (A = W(t, i, o, ++B, s)) === D;) {}if (A !== D || B === u) {
            var e = new $(t, A, c, B);return c = B, { value: e, done: !1 };
          }return { done: !0 };
        } };
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = t(36);Object.defineProperty(e, "toCodePoints", { enumerable: !0, get: function get() {
        return n.toCodePoints;
      } }), Object.defineProperty(e, "fromCodePoint", { enumerable: !0, get: function get() {
        return n.fromCodePoint;
      } });var r = t(180);Object.defineProperty(e, "LineBreaker", { enumerable: !0, get: function get() {
        return r.LineBreaker;
      } });
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });e.parseZIndex = function (A) {
      var e = "auto" === A;return { auto: e, order: e ? 0 : parseInt(A, 10) };
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = e.WORD_BREAK = { NORMAL: "normal", BREAK_ALL: "break-all", KEEP_ALL: "keep-all" };e.parseWordBreak = function (A) {
      switch (A) {case "break-all":
          return n.BREAK_ALL;case "keep-all":
          return n.KEEP_ALL;case "normal":default:
          return n.NORMAL;}
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = e.VISIBILITY = { VISIBLE: 0, HIDDEN: 1, COLLAPSE: 2 };e.parseVisibility = function (A) {
      switch (A) {case "hidden":
          return n.HIDDEN;case "collapse":
          return n.COLLAPSE;case "visible":default:
          return n.VISIBLE;}
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTransform = void 0;var n,
        r = t(4),
        a = (n = r) && n.__esModule ? n : { default: n };var o = function o(A) {
      return parseFloat(A.trim());
    },
        i = /(matrix|matrix3d)\((.+)\)/,
        s = (e.parseTransform = function (A) {
      var e = l(A.transform || A.webkitTransform || A.mozTransform || A.msTransform || A.oTransform);return null === e ? null : { transform: e, transformOrigin: s(A.transformOrigin || A.webkitTransformOrigin || A.mozTransformOrigin || A.msTransformOrigin || A.oTransformOrigin) };
    }, function (A) {
      if ("string" != typeof A) {
        var e = new a.default("0");return [e, e];
      }var t = A.split(" ").map(a.default.create);return [t[0], t[1]];
    }),
        l = function l(A) {
      if ("none" === A || "string" != typeof A) return null;var e = A.match(i);if (e) {
        if ("matrix" === e[1]) {
          var t = e[2].split(",").map(o);return [t[0], t[1], t[2], t[3], t[4], t[5]];
        }var n = e[2].split(",").map(o);return [n[0], n[1], n[4], n[5], n[12], n[13]];
      }return null;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseTextShadow = void 0;var n,
        r = t(2),
        a = (n = r) && n.__esModule ? n : { default: n };var o = /^([+-]|\d|\.)$/i;e.parseTextShadow = function (A) {
      if ("none" === A || "string" != typeof A) return null;for (var e = "", t = !1, n = [], r = [], i = 0, s = null, l = function l() {
        e.length && (t ? n.push(parseFloat(e)) : s = new a.default(e)), t = !1, e = "";
      }, u = function u() {
        n.length && null !== s && r.push({ color: s, offsetX: n[0] || 0, offsetY: n[1] || 0, blur: n[2] || 0 }), n.splice(0, n.length), s = null;
      }, c = 0; c < A.length; c++) {
        var B = A[c];switch (B) {case "(":
            e += B, i++;break;case ")":
            e += B, i--;break;case ",":
            0 === i ? (l(), u()) : e += B;break;case " ":
            0 === i ? l() : e += B;break;default:
            0 === e.length && o.test(B) && (t = !0), e += B;}
      }return l(), u(), 0 === r.length ? null : r;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = e.OVERFLOW = { VISIBLE: 0, HIDDEN: 1, SCROLL: 2, AUTO: 3 };e.parseOverflow = function (A) {
      switch (A) {case "hidden":
          return n.HIDDEN;case "scroll":
          return n.SCROLL;case "auto":
          return n.AUTO;case "visible":default:
          return n.VISIBLE;}
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseMargin = void 0;var n,
        r = t(4),
        a = (n = r) && n.__esModule ? n : { default: n };var o = ["top", "right", "bottom", "left"];e.parseMargin = function (A) {
      return o.map(function (e) {
        return new a.default(A.getPropertyValue("margin-" + e));
      });
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = e.LINE_BREAK = { NORMAL: "normal", STRICT: "strict" };e.parseLineBreak = function (A) {
      switch (A) {case "strict":
          return n.STRICT;case "normal":default:
          return n.NORMAL;}
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });e.parseLetterSpacing = function (A) {
      if ("normal" === A) return 0;var e = parseFloat(A);return isNaN(e) ? 0 : e;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });e.parseFont = function (A) {
      return { fontFamily: A.fontFamily, fontSize: A.fontSize, fontStyle: A.fontStyle, fontVariant: A.fontVariant, fontWeight: function (A) {
          switch (A) {case "normal":
              return 400;case "bold":
              return 700;}var e = parseInt(A, 10);return isNaN(e) ? 400 : e;
        }(A.fontWeight) };
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = e.FLOAT = { NONE: 0, LEFT: 1, RIGHT: 2, INLINE_START: 3, INLINE_END: 4 };e.parseCSSFloat = function (A) {
      switch (A) {case "left":
          return n.LEFT;case "right":
          return n.RIGHT;case "inline-start":
          return n.INLINE_START;case "inline-end":
          return n.INLINE_END;}return n.NONE;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = e.DISPLAY = { NONE: 1, BLOCK: 2, INLINE: 4, RUN_IN: 8, FLOW: 16, FLOW_ROOT: 32, TABLE: 64, FLEX: 128, GRID: 256, RUBY: 512, SUBGRID: 1024, LIST_ITEM: 2048, TABLE_ROW_GROUP: 4096, TABLE_HEADER_GROUP: 8192, TABLE_FOOTER_GROUP: 16384, TABLE_ROW: 32768, TABLE_CELL: 65536, TABLE_COLUMN_GROUP: 1 << 17, TABLE_COLUMN: 1 << 18, TABLE_CAPTION: 1 << 19, RUBY_BASE: 1 << 20, RUBY_TEXT: 1 << 21, RUBY_BASE_CONTAINER: 1 << 22, RUBY_TEXT_CONTAINER: 1 << 23, CONTENTS: 1 << 24, INLINE_BLOCK: 1 << 25, INLINE_LIST_ITEM: 1 << 26, INLINE_TABLE: 1 << 27, INLINE_FLEX: 1 << 28, INLINE_GRID: 1 << 29 },
        r = function r(A, e) {
      return A | function (A) {
        switch (A) {case "block":
            return n.BLOCK;case "inline":
            return n.INLINE;case "run-in":
            return n.RUN_IN;case "flow":
            return n.FLOW;case "flow-root":
            return n.FLOW_ROOT;case "table":
            return n.TABLE;case "flex":
            return n.FLEX;case "grid":
            return n.GRID;case "ruby":
            return n.RUBY;case "subgrid":
            return n.SUBGRID;case "list-item":
            return n.LIST_ITEM;case "table-row-group":
            return n.TABLE_ROW_GROUP;case "table-header-group":
            return n.TABLE_HEADER_GROUP;case "table-footer-group":
            return n.TABLE_FOOTER_GROUP;case "table-row":
            return n.TABLE_ROW;case "table-cell":
            return n.TABLE_CELL;case "table-column-group":
            return n.TABLE_COLUMN_GROUP;case "table-column":
            return n.TABLE_COLUMN;case "table-caption":
            return n.TABLE_CAPTION;case "ruby-base":
            return n.RUBY_BASE;case "ruby-text":
            return n.RUBY_TEXT;case "ruby-base-container":
            return n.RUBY_BASE_CONTAINER;case "ruby-text-container":
            return n.RUBY_TEXT_CONTAINER;case "contents":
            return n.CONTENTS;case "inline-block":
            return n.INLINE_BLOCK;case "inline-list-item":
            return n.INLINE_LIST_ITEM;case "inline-table":
            return n.INLINE_TABLE;case "inline-flex":
            return n.INLINE_FLEX;case "inline-grid":
            return n.INLINE_GRID;}return n.NONE;
      }(e);
    };e.parseDisplay = function (A) {
      return A.split(" ").reduce(r, 0);
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.parseBorderRadius = void 0;var n,
        r = function () {
      return function (A, e) {
        if (Array.isArray(A)) return A;if (Symbol.iterator in Object(A)) return function (A, e) {
          var t = [],
              n = !0,
              r = !1,
              a = void 0;try {
            for (var o, i = A[Symbol.iterator](); !(n = (o = i.next()).done) && (t.push(o.value), !e || t.length !== e); n = !0) {}
          } catch (A) {
            r = !0, a = A;
          } finally {
            try {
              !n && i.return && i.return();
            } finally {
              if (r) throw a;
            }
          }return t;
        }(A, e);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        a = t(4),
        o = (n = a) && n.__esModule ? n : { default: n };var i = ["top-left", "top-right", "bottom-right", "bottom-left"];e.parseBorderRadius = function (A) {
      return i.map(function (e) {
        var t = A.getPropertyValue("border-" + e + "-radius").split(" ").map(o.default.create),
            n = r(t, 2),
            a = n[0],
            i = n[1];return void 0 === i ? [a, a] : [a, i];
      });
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        a = t(16),
        o = t(15),
        i = (n = o) && n.__esModule ? n : { default: n };var s = function s(A, e, t) {
      return new i.default(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t);
    },
        l = function () {
      function A(e, t, n, r) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.type = a.PATH.BEZIER_CURVE, this.start = e, this.startControl = t, this.endControl = n, this.end = r;
      }return r(A, [{ key: "subdivide", value: function value(e, t) {
          var n = s(this.start, this.startControl, e),
              r = s(this.startControl, this.endControl, e),
              a = s(this.endControl, this.end, e),
              o = s(n, r, e),
              i = s(r, a, e),
              l = s(o, i, e);return t ? new A(this.start, n, o, l) : new A(l, i, a, this.end);
        } }, { key: "reverse", value: function value() {
          return new A(this.end, this.endControl, this.startControl, this.start);
        } }]), A;
    }();e.default = l;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });e.default = function A(e, t) {
      !function (A, e) {
        if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, A), this.width = e, this.height = t;
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = function () {
      function A(A, e) {
        for (var t = 0; t < e.length; t++) {
          var n = e[t];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(A, n.key, n);
        }
      }return function (e, t, n) {
        return t && A(e.prototype, t), n && A(e, n), e;
      };
    }(),
        a = t(7);(n = a) && n.__esModule, t(67);var o = function () {
      function A(e, t, n) {
        !function (A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, A), this.container = e, this.parent = t, this.contexts = [], this.children = [], this.treatAsRealStackingContext = n;
      }return r(A, [{ key: "getOpacity", value: function value() {
          return this.parent ? this.container.style.opacity * this.parent.getOpacity() : this.container.style.opacity;
        } }, { key: "getRealParentStackingContext", value: function value() {
          return !this.parent || this.treatAsRealStackingContext ? this : this.parent.getRealParentStackingContext();
        } }]), A;
    }();e.default = o;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.NodeParser = void 0;var n = l(t(197)),
        r = l(t(7)),
        a = l(t(13)),
        o = t(65),
        i = t(35),
        s = t(14);function l(A) {
      return A && A.__esModule ? A : { default: A };
    }e.NodeParser = function (A, e, t) {
      var a = 0,
          o = new r.default(A, null, e, a++),
          i = new n.default(o, null, !0);return c(A, o, i, e, a), i;
    };var u = ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"],
        c = function A(e, t, l, c, f) {
      for (var h, g = e.firstChild; g; g = h) {
        h = g.nextSibling;var w = g.ownerDocument.defaultView;if (g instanceof w.Text || g instanceof Text || w.parent && g instanceof w.parent.Text) g.data.trim().length > 0 && t.childNodes.push(a.default.fromTextNode(g, t));else if (g instanceof w.HTMLElement || g instanceof HTMLElement || w.parent && g instanceof w.parent.HTMLElement) {
          if (-1 === u.indexOf(g.nodeName)) {
            var Q = new r.default(g, t, c, f++);if (Q.isVisible()) {
              "INPUT" === g.tagName ? (0, o.inlineInputElement)(g, Q) : "TEXTAREA" === g.tagName ? (0, o.inlineTextAreaElement)(g, Q) : "SELECT" === g.tagName ? (0, o.inlineSelectElement)(g, Q) : Q.style.listStyle && Q.style.listStyle.listStyleType !== s.LIST_STYLE_TYPE.NONE && (0, i.inlineListItemElement)(g, Q, c);var p = "TEXTAREA" !== g.tagName,
                  U = B(Q, g);if (U || d(Q)) {
                var C = U || Q.isPositioned() ? l.getRealParentStackingContext() : l,
                    F = new n.default(Q, C, U);C.contexts.push(F), p && A(g, Q, F, c, f);
              } else l.children.push(Q), p && A(g, Q, l, c, f);
            }
          }
        } else if (g instanceof w.SVGSVGElement || g instanceof SVGSVGElement || w.parent && g instanceof w.parent.SVGSVGElement) {
          var v = new r.default(g, t, c, f++),
              E = B(v, g);if (E || d(v)) {
            var m = E || v.isPositioned() ? l.getRealParentStackingContext() : l,
                y = new n.default(v, m, E);m.contexts.push(y);
          } else l.children.push(v);
        }
      }
    },
        B = function B(A, e) {
      return A.isRootElement() || A.isPositionedWithZIndex() || A.style.opacity < 1 || A.isTransformed() || f(A, e);
    },
        d = function d(A) {
      return A.isPositioned() || A.isFloating();
    },
        f = function f(A, e) {
      return "BODY" === e.nodeName && A.parent instanceof r.default && A.parent.style.background.backgroundColor.isTransparent();
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 }), e.renderElement = void 0;var n = function () {
      return function (A, e) {
        if (Array.isArray(A)) return A;if (Symbol.iterator in Object(A)) return function (A, e) {
          var t = [],
              n = !0,
              r = !1,
              a = void 0;try {
            for (var o, i = A[Symbol.iterator](); !(n = (o = i.next()).done) && (t.push(o.value), !e || t.length !== e); n = !0) {}
          } catch (A) {
            r = !0, a = A;
          } finally {
            try {
              !n && i.return && i.return();
            } finally {
              if (r) throw a;
            }
          }return t;
        }(A, e);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        r = (d(t(70)), t(198)),
        a = d(t(176)),
        o = d(t(63)),
        i = d(t(12)),
        s = t(3),
        l = t(173),
        u = t(61),
        c = t(2),
        B = d(c);function d(A) {
      return A && A.__esModule ? A : { default: A };
    }e.renderElement = function A(e, t, d) {
      var f = e.ownerDocument,
          h = new s.Bounds(t.scrollX, t.scrollY, t.windowWidth, t.windowHeight),
          g = f.documentElement ? new B.default(getComputedStyle(f.documentElement).backgroundColor) : c.TRANSPARENT,
          w = f.body ? new B.default(getComputedStyle(f.body).backgroundColor) : c.TRANSPARENT,
          Q = e === f.documentElement ? g.isTransparent() ? w.isTransparent() ? t.backgroundColor ? new B.default(t.backgroundColor) : null : w : g : t.backgroundColor ? new B.default(t.backgroundColor) : null;return (t.foreignObjectRendering ? i.default.SUPPORT_FOREIGNOBJECT_DRAWING : Promise.resolve(!1)).then(function (i) {
        return i ? (B = new l.DocumentCloner(e, t, d, !0, A)).inlineFonts(f).then(function () {
          return B.resourceLoader.ready();
        }).then(function () {
          var A = new o.default(B.documentElement),
              n = f.defaultView,
              r = n.pageXOffset,
              a = n.pageYOffset,
              i = "HTML" === e.tagName || "BODY" === e.tagName ? (0, s.parseDocumentSize)(f) : (0, s.parseBounds)(e, r, a),
              l = i.width,
              u = i.height,
              c = i.left,
              h = i.top;return A.render({ backgroundColor: Q, logger: d, scale: t.scale, x: "number" == typeof t.x ? t.x : c, y: "number" == typeof t.y ? t.y : h, width: "number" == typeof t.width ? t.width : Math.ceil(l), height: "number" == typeof t.height ? t.height : Math.ceil(u), windowWidth: t.windowWidth, windowHeight: t.windowHeight, scrollX: t.scrollX, scrollY: t.scrollY });
        }) : (0, l.cloneWindow)(f, h, e, t, d, A).then(function (A) {
          var e = n(A, 3),
              o = e[0],
              i = e[1],
              l = e[2];var B = (0, r.NodeParser)(i, l, d),
              h = i.ownerDocument;return Q === B.container.style.background.backgroundColor && (B.container.style.background.backgroundColor = c.TRANSPARENT), l.ready().then(function (A) {
            var e = new u.FontMetrics(h);var n = h.defaultView,
                r = n.pageXOffset,
                l = n.pageYOffset,
                c = "HTML" === i.tagName || "BODY" === i.tagName ? (0, s.parseDocumentSize)(f) : (0, s.parseBounds)(i, r, l),
                g = c.width,
                w = c.height,
                p = c.left,
                U = c.top,
                C = { backgroundColor: Q, fontMetrics: e, imageStore: A, logger: d, scale: t.scale, x: "number" == typeof t.x ? t.x : p, y: "number" == typeof t.y ? t.y : U, width: "number" == typeof t.width ? t.width : Math.ceil(g), height: "number" == typeof t.height ? t.height : Math.ceil(w) };if (Array.isArray(t.target)) return Promise.all(t.target.map(function (A) {
              return new a.default(A, C).render(B);
            }));var F = new a.default(t.target, C).render(B);return !0 === t.removeContainer && o.parentNode && o.parentNode.removeChild(o), F;
          });
        });var B;
      });
    };
  }, function (A, e, t) {
    "use strict";
    var n = Object.assign || function (A) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];for (var n in t) {
          Object.prototype.hasOwnProperty.call(t, n) && (A[n] = t[n]);
        }
      }return A;
    },
        r = i(t(71)),
        a = i(t(70)),
        o = t(199);function i(A) {
      return A && A.__esModule ? A : { default: A };
    }var s = function s(A, e) {
      var t = e || {},
          i = new a.default("boolean" != typeof t.logging || t.logging);i.log("html2canvas $npm_package_version");var s = A.ownerDocument;if (!s) return Promise.reject("Provided element is not within a Document");var l = s.defaultView,
          u = { async: !0, allowTaint: !1, backgroundColor: "#ffffff", imageTimeout: 15e3, logging: !0, proxy: null, removeContainer: !0, foreignObjectRendering: !1, scale: l.devicePixelRatio || 1, target: new r.default(t.canvas), useCORS: !1, windowWidth: l.innerWidth, windowHeight: l.innerHeight, scrollX: l.pageXOffset, scrollY: l.pageYOffset };return (0, o.renderElement)(A, n({}, u, t), i);
    };s.CanvasRenderer = r.default, A.exports = s;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(200),
        a = (n = r) && n.__esModule ? n : { default: n };e.default = function (A, e) {
      var t,
          n,
          r,
          o = document.querySelector("#" + A),
          i = o.offsetWidth,
          s = o.offsetHeight,
          l = document.createElement("canvas"),
          u = l.getContext("2d"),
          c = (n = (t = u).webkitBackingStorePixelRatio || t.backingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || 1, (window.devicePixelRatio || 1) / n);return l.width = i * c, l.height = s * c, u.scale(c, c), r = { scale: c, canvas: l, width: i, height: s, useCORS: !0 }, (0, a.default)(o, r).then(function (A) {
        var t = A.getContext("2d");t.mozImageSmoothingEnabled = !1, t.webkitImageSmoothingEnabled = !1, t.msImageSmoothingEnabled = !1, t.imageSmoothingEnabled = !1;var n = "",
            r = A.toDataURL("image/jpeg");if (!e) return r;(n = document.querySelector("#" + e)).src = r, n.style.width = A.width / c + "px", n.style.height = A.height / c + "px";
      });
    };
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = void 0,
        r = { afterOpen: function afterOpen() {
        n = document.scrollingElement.scrollTop, document.body.classList.add("modal-open"), document.body.style.top = -n + "px";
      }, beforeClose: function beforeClose() {
        document.body.classList.remove("modal-open"), document.scrollingElement.scrollTop = n;
      } };e.default = r;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });e.default = function () {
      var A = document.documentElement,
          e = "orientationchange" in window ? "orientationchange" : "resize",
          t = function t() {
        var e = A.clientWidth;if (e) {
          var t = 100 * e / 750;return A.style.fontSize = t + "px", t, t;
        }
      };document.addEventListener && (window.addEventListener(e, t, !1), document.addEventListener("DOMContentLoaded", t, !1));
    };
  },, function (A, e, t) {}, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n,
        r = t(74),
        a = (n = r) && n.__esModule ? n : { default: n };a.default.install = function (A) {
      A.component(a.default.name, a.default);
    }, e.default = a.default;
  }, function (A, e, t) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var n = v(t(206)),
        r = v(t(163)),
        a = v(t(160)),
        o = v(t(157)),
        i = v(t(151)),
        s = v(t(145)),
        l = v(t(142)),
        u = v(t(138)),
        c = v(t(134)),
        B = v(t(127)),
        d = v(t(124)),
        f = v(t(120)),
        h = v(t(116)),
        g = v(t(110)),
        w = v(t(98)),
        Q = v(t(93)),
        p = v(t(87)),
        U = v(t(83)),
        C = v(t(79)),
        F = v(t(73));function v(A) {
      return A && A.__esModule ? A : { default: A };
    }var E = { ycfPopup: n.default, ycfMessageBox: r.default, ycfCalendar: a.default, toast: o.default, scroll: i.default, row: s.default, ranger: l.default, inputNumber: u.default, input: c.default, col: B.default, button: d.default, ycfYunCalendar: f.default, ycfTabBar: h.default, ycfSwiper: g.default, ycfSteps: w.default, ycfSearch: Q.default, ycfRegisterBox: p.default, ycfProgress: U.default, ycfPayment: C.default },
        m = function A(e) {
      arguments.length > 1 && void 0 !== arguments[1] && arguments[1];A.installed || Object.keys(E).forEach(function (A) {
        e.component(E[A].name, E[A]);
      });
    };"undefined" != typeof window && window.Vue && (m(window.Vue), Vue.prototype.$toast = E.toast);var y = { install: m, components: E, com: F.default };e.default = y;
  }]);
});
//# sourceMappingURL=ycf.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/_webpack@4.16.3@webpack/buildin/module.js */ "./node_modules/_webpack@4.16.3@webpack/buildin/module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=commons.js.map