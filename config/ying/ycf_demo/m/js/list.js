/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"list": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "./ying/ycf_demo/m";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([5,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/_babel-loader@7.1.5@babel-loader/lib/index.js!./node_modules/_vue-loader@14.2.3@vue-loader/lib/selector.js?type=script&index=0!./src/components/list/list.vue":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_babel-loader@7.1.5@babel-loader/lib!./node_modules/_vue-loader@14.2.3@vue-loader/lib/selector.js?type=script&index=0!./src/components/list/list.vue ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zepto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zepto */ "zepto");
/* harmony import */ var zepto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zepto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _list_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list.scss */ "./src/components/list/list.scss");
/* harmony import */ var _list_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_list_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _images_icon_firm_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/icon_firm.png */ "./src/components/list/images/icon_firm.png");
/* harmony import */ var _images_icon_firm_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_icon_firm_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ycf_ycf_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ycf/ycf.js */ "./src/ycf/ycf.js");
/* harmony import */ var ycf_ycf_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ycf_ycf_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ycf_ycf_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ycf/ycf.css */ "./src/ycf/ycf.css");
/* harmony import */ var ycf_ycf_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ycf_ycf_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _images_order_submit_payment_travelcard_icon_2x_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/order_submit_payment_travelcard_icon@2x.png */ "./src/components/list/images/order_submit_payment_travelcard_icon@2x.png");
/* harmony import */ var _images_order_submit_payment_travelcard_icon_2x_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_images_order_submit_payment_travelcard_icon_2x_png__WEBPACK_IMPORTED_MODULE_5__);
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'list',
    data() {
        return {
            img: _images_icon_firm_png__WEBPACK_IMPORTED_MODULE_2___default.a,
            data: [{
                title: '微信支付',
                description: '推荐已安装微信的用户使用',
                img: _images_order_submit_payment_travelcard_icon_2x_png__WEBPACK_IMPORTED_MODULE_5___default.a
            }, {
                title: '支付宝支付',
                description: '推荐已安装支付宝的用户使用',
                img: _images_order_submit_payment_travelcard_icon_2x_png__WEBPACK_IMPORTED_MODULE_5___default.a
            }],
            value1: 0
        };
    },
    methods: {},
    mounted: function () {
        console.log(ycf_ycf_js__WEBPACK_IMPORTED_MODULE_3___default.a);
    }

});

/***/ }),

/***/ "./node_modules/_vue-loader@14.2.3@vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-eeef07e2\",\"hasScoped\":false,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./node_modules/_vue-loader@14.2.3@vue-loader/lib/selector.js?type=template&index=0!./src/components/list/list.vue":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_vue-loader@14.2.3@vue-loader/lib/template-compiler?{"id":"data-v-eeef07e2","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/_vue-loader@14.2.3@vue-loader/lib/selector.js?type=template&index=0!./src/components/list/list.vue ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "demo" } },
    [
      _c("p", { staticClass: "demo" }, [_vm._v("这是list测试页面")]),
      _vm._v(" "),
      _c("img", { attrs: { src: _vm.img, alt: "" } }),
      _vm._v(" "),
      _c("y-payment", {
        attrs: { data: _vm.data, selectedColor: "#09f" },
        model: {
          value: _vm.value1,
          callback: function($$v) {
            _vm.value1 = $$v
          },
          expression: "value1"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (false) {}

/***/ }),

/***/ "./src/components/list/images/icon_firm.png":
/*!**************************************************!*\
  !*** ./src/components/list/images/icon_firm.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "./ying/ycf_demo/m/images/icon_firm.png?v=1.0";

/***/ }),

/***/ "./src/components/list/images/order_submit_payment_travelcard_icon@2x.png":
/*!********************************************************************************!*\
  !*** ./src/components/list/images/order_submit_payment_travelcard_icon@2x.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "./ying/ycf_demo/m/images/order_submit_payment_travelcard_icon@2x.png?v=1.0";

/***/ }),

/***/ "./src/components/list/list.js":
/*!*************************************!*\
  !*** ./src/components/list/list.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(/*! vue */ "vue");

var _vue2 = _interopRequireDefault(_vue);

var _list = __webpack_require__(/*! ./list.vue */ "./src/components/list/list.vue");

var _list2 = _interopRequireDefault(_list);

__webpack_require__(/*! _com/css/global.scss */ "./src/common/css/global.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue2.default({
	el: '#app',
	data: {},
	methods: {},
	render: function render(h) {
		return h(_list2.default);
	}
});

/***/ }),

/***/ "./src/components/list/list.scss":
/*!***************************************!*\
  !*** ./src/components/list/list.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/list/list.vue":
/*!**************************************!*\
  !*** ./src/components/list/list.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_14_2_3_vue_loader_lib_selector_type_script_index_0_list_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !babel-loader!../../../node_modules/_vue-loader@14.2.3@vue-loader/lib/selector?type=script&index=0!./list.vue */ "./node_modules/_babel-loader@7.1.5@babel-loader/lib/index.js!./node_modules/_vue-loader@14.2.3@vue-loader/lib/selector.js?type=script&index=0!./src/components/list/list.vue");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_14_2_3_vue_loader_lib_template_compiler_index_id_data_v_eeef07e2_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_14_2_3_vue_loader_lib_selector_type_template_index_0_list_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/_vue-loader@14.2.3@vue-loader/lib/template-compiler/index?{"id":"data-v-eeef07e2","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!../../../node_modules/_vue-loader@14.2.3@vue-loader/lib/selector?type=template&index=0!./list.vue */ "./node_modules/_vue-loader@14.2.3@vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-eeef07e2\",\"hasScoped\":false,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./node_modules/_vue-loader@14.2.3@vue-loader/lib/selector.js?type=template&index=0!./src/components/list/list.vue");
/* harmony import */ var _node_modules_vue_loader_14_2_3_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/_vue-loader@14.2.3@vue-loader/lib/runtime/component-normalizer */ "./node_modules/_vue-loader@14.2.3@vue-loader/lib/runtime/component-normalizer.js");
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_14_2_3_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _babel_loader_node_modules_vue_loader_14_2_3_vue_loader_lib_selector_type_script_index_0_list_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  _node_modules_vue_loader_14_2_3_vue_loader_lib_template_compiler_index_id_data_v_eeef07e2_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_14_2_3_vue_loader_lib_selector_type_template_index_0_list_vue__WEBPACK_IMPORTED_MODULE_1__["render"],
  _node_modules_vue_loader_14_2_3_vue_loader_lib_template_compiler_index_id_data_v_eeef07e2_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_14_2_3_vue_loader_lib_selector_type_template_index_0_list_vue__WEBPACK_IMPORTED_MODULE_1__["staticRenderFns"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/list/list.vue"

/* hot reload */
if (false) {}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 5:
/*!*****************************************************!*\
  !*** multi ./config/../src/components/list/list.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/czhih/Desktop/work/blog/config/../src/components/list/list.js */"./src/components/list/list.js");


/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ "zepto":
/*!********************!*\
  !*** external "$" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = $;

/***/ })

/******/ });
//# sourceMappingURL=list.js.map