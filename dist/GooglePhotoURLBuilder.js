/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var COMPILED = !0, goog = goog || {};
goog.global = this || self;
goog.exportPath_ = function(a, b, c, d) {
  a = a.split(".");
  d = d || goog.global;
  a[0] in d || "undefined" == typeof d.execScript || d.execScript("var " + a[0]);
  for (var e; a.length && (e = a.shift());) {
    if (a.length || void 0 === b) {
      d = d[e] && d[e] !== Object.prototype[e] ? d[e] : d[e] = {};
    } else {
      if (!c && goog.isObject(b) && goog.isObject(d[e])) {
        for (var f in b) {
          b.hasOwnProperty(f) && (d[e][f] = b[f]);
        }
      } else {
        d[e] = b;
      }
    }
  }
};
goog.define = function(a, b) {
  var c = b;
  if (!COMPILED) {
    var d = goog.global.CLOSURE_UNCOMPILED_DEFINES, e = goog.global.CLOSURE_DEFINES;
    d && void 0 === d.nodeType && Object.prototype.hasOwnProperty.call(d, a) ? c = d[a] : e && void 0 === e.nodeType && Object.prototype.hasOwnProperty.call(e, a) && (c = e[a]);
  }
  return c;
};
goog.FEATURESET_YEAR = 2012;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.provide cannot be used within a module.");
  }
  if (!COMPILED && goog.isProvided_(a)) {
    throw Error('Namespace "' + a + '" already declared.');
  }
  goog.constructNamespace_(a);
};
goog.constructNamespace_ = function(a, b, c) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[a];
    for (var d = a; (d = d.substring(0, d.lastIndexOf("."))) && !goog.getObjectByName(d);) {
      goog.implicitNamespaces_[d] = !0;
    }
  }
  goog.exportPath_(a, b, c);
};
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.getScriptNonce_ = function(a) {
  a = (a || goog.global).document;
  return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && goog.NONCE_PATTERN_.test(a) ? a : "";
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
  if ("string" !== typeof a || !a || -1 == a.search(goog.VALID_MODULE_RE_)) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInGoogModuleLoader_()) {
    throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = a;
  if (!COMPILED) {
    if (goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
  }
};
goog.module.get = function(a) {
  return goog.module.getInternal_(a);
};
goog.module.getInternal_ = function(a) {
  if (!COMPILED) {
    if (a in goog.loadedModules_) {
      return goog.loadedModules_[a].exports;
    }
    if (!goog.implicitNamespaces_[a]) {
      return a = goog.getObjectByName(a), null != a ? a : null;
    }
  }
  return null;
};
goog.ModuleType = {ES6:"es6", GOOG:"goog"};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
};
goog.isInGoogModuleLoader_ = function() {
  return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG;
};
goog.isInEs6ModuleLoader_ = function() {
  if (goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6) {
    return !0;
  }
  var a = goog.global.$jscomp;
  return a ? "function" != typeof a.getCurrentModulePath ? !1 : !!a.getCurrentModulePath() : !1;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInGoogModuleLoader_()) {
    throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.declareModuleId = function(a) {
  if (!COMPILED) {
    if (!goog.isInEs6ModuleLoader_()) {
      throw Error("goog.declareModuleId may only be called from within an ES6 module");
    }
    if (goog.moduleLoaderState_ && goog.moduleLoaderState_.moduleName) {
      throw Error("goog.declareModuleId may only be called once per module.");
    }
    if (a in goog.loadedModules_) {
      throw Error('Module with namespace "' + a + '" already exists.');
    }
  }
  if (goog.moduleLoaderState_) {
    goog.moduleLoaderState_.moduleName = a;
  } else {
    var b = goog.global.$jscomp;
    if (!b || "function" != typeof b.getCurrentModulePath) {
      throw Error('Module with namespace "' + a + '" has been loaded incorrectly.');
    }
    b = b.require(b.getCurrentModulePath());
    goog.loadedModules_[a] = {exports:b, type:goog.ModuleType.ES6, moduleId:a};
  }
};
goog.setTestOnly = function(a) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
  }
};
goog.forwardDeclare = function(a) {
};
COMPILED || (goog.isProvided_ = function(a) {
  return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && null != goog.getObjectByName(a);
}, goog.implicitNamespaces_ = {"goog.module":!0});
goog.getObjectByName = function(a, b) {
  for (var c = a.split("."), d = b || goog.global, e = 0; e < c.length; e++) {
    if (d = d[c[e]], null == d) {
      return null;
    }
  }
  return d;
};
goog.addDependency = function(a, b, c, d) {
  !COMPILED && goog.DEPENDENCIES_ENABLED && goog.debugLoader_.addDependency(a, b, c, d);
};
goog.ENABLE_DEBUG_LOADER = !1;
goog.logToConsole_ = function(a) {
  goog.global.console && goog.global.console.error(a);
};
goog.require = function(a) {
  if (!COMPILED) {
    goog.ENABLE_DEBUG_LOADER && goog.debugLoader_.requested(a);
    if (goog.isProvided_(a)) {
      if (goog.isInModuleLoader_()) {
        return goog.module.getInternal_(a);
      }
    } else if (goog.ENABLE_DEBUG_LOADER) {
      var b = goog.moduleLoaderState_;
      goog.moduleLoaderState_ = null;
      try {
        goog.debugLoader_.load_(a);
      } finally {
        goog.moduleLoaderState_ = b;
      }
    }
    return null;
  }
};
goog.requireType = function(a) {
  return {};
};
goog.basePath = "";
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.instance_ = void 0;
  a.getInstance = function() {
    if (a.instance_) {
      return a.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a();
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.ASSUME_ES_MODULES_TRANSPILED = !1;
goog.TRUSTED_TYPES_POLICY_NAME = "goog";
goog.hasBadLetScoping = null;
goog.loadModule = function(a) {
  var b = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:"", declareLegacyNamespace:!1, type:goog.ModuleType.GOOG};
    var c = {}, d = c;
    if ("function" === typeof a) {
      d = a.call(void 0, d);
    } else if ("string" === typeof a) {
      d = goog.loadModuleFromSource_.call(void 0, d, a);
    } else {
      throw Error("Invalid module definition");
    }
    var e = goog.moduleLoaderState_.moduleName;
    if ("string" === typeof e && e) {
      goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(e, d, c !== d) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof d && null != d && Object.seal(d), goog.loadedModules_[e] = {exports:d, type:goog.ModuleType.GOOG, moduleId:goog.moduleLoaderState_.moduleName};
    } else {
      throw Error('Invalid module name "' + e + '"');
    }
  } finally {
    goog.moduleLoaderState_ = b;
  }
};
goog.loadModuleFromSource_ = function(a, b) {
  eval(goog.CLOSURE_EVAL_PREFILTER_.createScript(b));
  return a;
};
goog.normalizePath_ = function(a) {
  a = a.split("/");
  for (var b = 0; b < a.length;) {
    "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
  }
  return a.join("/");
};
goog.loadFileSync_ = function(a) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
  }
  try {
    var b = new goog.global.XMLHttpRequest();
    b.open("get", a, !1);
    b.send();
    return 0 == b.status || 200 == b.status ? b.responseText : null;
  } catch (c) {
    return null;
  }
};
goog.typeOf = function(a) {
  var b = typeof a;
  return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return "array" == b || "object" == b && "number" == typeof a.length;
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear;
};
goog.isObject = function(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b;
};
goog.getUid = function(a) {
  return Object.prototype.hasOwnProperty.call(a, goog.UID_PROPERTY_) && a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(a) {
  return !!a[goog.UID_PROPERTY_];
};
goog.removeUid = function(a) {
  null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_];
  } catch (b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if ("function" === typeof a.clone) {
      return a.clone();
    }
    if ("undefined" !== typeof Map && a instanceof Map) {
      return new Map(a);
    }
    if ("undefined" !== typeof Set && a instanceof Set) {
      return new Set(a);
    }
    b = "array" == b ? [] : {};
    for (var c in a) {
      b[c] = goog.cloneObject(a[c]);
    }
    return b;
  }
  return a;
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments);
};
goog.bindJs_ = function(a, b, c) {
  if (!a) {
    throw Error();
  }
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, d);
      return a.apply(b, e);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
};
goog.bind = function(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var d = c.slice();
    d.push.apply(d, arguments);
    return a.apply(this, d);
  };
};
goog.now = function() {
  return Date.now();
};
goog.globalEval = function(a) {
  (0,eval)(a);
};
goog.getCssName = function(a, b) {
  if ("." == String(a).charAt(0)) {
    throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
  }
  var c = function(e) {
    return goog.cssNameMapping_[e] || e;
  }, d = function(e) {
    e = e.split("-");
    for (var f = [], g = 0; g < e.length; g++) {
      f.push(c(e[g]));
    }
    return f.join("-");
  };
  d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(e) {
    return e;
  };
  d = b ? a + "-" + d(b) : d(a);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(d) : d;
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.GetMsgOptions = function() {
};
goog.getMsg = function(a, b, c) {
  c && c.html && (a = a.replace(/</g, "&lt;"));
  c && c.unescapeHtmlEntities && (a = a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
  b && (a = a.replace(/\{\$([^}]+)}/g, function(d, e) {
    return null != b && e in b ? b[e] : d;
  }));
  return a;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, !0, c);
};
goog.exportProperty = function(a, b, c) {
  a[b] = c;
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;
  a.base = function(d, e, f) {
    for (var g = Array(arguments.length - 2), l = 2; l < arguments.length; l++) {
      g[l - 2] = arguments[l];
    }
    return b.prototype[e].apply(d, g);
  };
};
goog.scope = function(a) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.scope is not supported within a module.");
  }
  a.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
  var c = b.constructor, d = b.statics;
  c && c != Object.prototype.constructor || (c = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  c = goog.defineClass.createSealingConstructor_(c, a);
  a && goog.inherits(c, a);
  delete b.constructor;
  delete b.statics;
  goog.defineClass.applyProperties_(c.prototype, b);
  null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
  return c;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
  return goog.defineClass.SEAL_CLASS_INSTANCES ? function() {
    var c = a.apply(this, arguments) || this;
    c[goog.UID_PROPERTY_] = c[goog.UID_PROPERTY_];
    return c;
  } : a;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
  for (var c in b) {
    Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
  for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) {
    c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
};
goog.identity_ = function(a) {
  return a;
};
goog.createTrustedTypesPolicy = function(a) {
  var b = null, c = goog.global.trustedTypes;
  if (!c || !c.createPolicy) {
    return b;
  }
  try {
    b = c.createPolicy(a, {createHTML:goog.identity_, createScript:goog.identity_, createScriptURL:goog.identity_});
  } catch (d) {
    goog.logToConsole_(d.message);
  }
  return b;
};
!COMPILED && goog.DEPENDENCIES_ENABLED && (goog.isEdge_ = function() {
  return !!(goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "").match(/Edge\/(\d+)(\.\d)*/i);
}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return null != a && "write" in a;
}, goog.isDocumentLoading_ = function() {
  var a = goog.global.document;
  return a.attachEvent ? "complete" != a.readyState : "loading" == a.readyState;
}, goog.findBasePath_ = function() {
  if (void 0 != goog.global.CLOSURE_BASE_PATH && "string" === typeof goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else if (goog.inHtmlDocument_()) {
    var a = goog.global.document, b = a.currentScript;
    a = b ? [b] : a.getElementsByTagName("SCRIPT");
    for (b = a.length - 1; 0 <= b; --b) {
      var c = a[b].src, d = c.lastIndexOf("?");
      d = -1 == d ? c.length : d;
      if ("base.js" == c.slice(d - 7, d)) {
        goog.basePath = c.slice(0, d - 7);
        break;
      }
    }
  }
}, goog.findBasePath_(), goog.protectScriptTag_ = function(a) {
  return a.replace(/<\/(SCRIPT)/ig, "\\x3c/$1");
}, goog.DebugLoader_ = function() {
  this.dependencies_ = {};
  this.idToPath_ = {};
  this.written_ = {};
  this.loadingDeps_ = [];
  this.depsToLoad_ = [];
  this.paused_ = !1;
  this.factory_ = new goog.DependencyFactory();
  this.deferredCallbacks_ = {};
  this.deferredQueue_ = [];
}, goog.DebugLoader_.prototype.bootstrap = function(a, b) {
  function c() {
    d && (goog.global.setTimeout(d, 0), d = null);
  }
  var d = b;
  if (a.length) {
    for (var e = [], f = 0; f < a.length; f++) {
      var g = this.getPathFromDeps_(a[f]);
      if (!g) {
        throw Error("Unregonized namespace: " + a[f]);
      }
      e.push(this.dependencies_[g]);
    }
    g = goog.require;
    var l = 0;
    for (f = 0; f < a.length; f++) {
      g(a[f]), e[f].onLoad(function() {
        ++l == a.length && c();
      });
    }
  } else {
    c();
  }
}, goog.DebugLoader_.prototype.loadClosureDeps = function() {
  this.depsToLoad_.push(this.factory_.createDependency(goog.normalizePath_(goog.basePath + "deps.js"), "deps.js", [], [], {}));
  this.loadDeps_();
}, goog.DebugLoader_.prototype.requested = function(a, b) {
  var c = this.getPathFromDeps_(a);
  if (c && (b || this.areDepsLoaded_(this.dependencies_[c].requires))) {
    var d = this.deferredCallbacks_[c];
    d && (delete this.deferredCallbacks_[c], d());
  }
}, goog.DebugLoader_.prototype.setDependencyFactory = function(a) {
  this.factory_ = a;
}, goog.DebugLoader_.prototype.load_ = function(a) {
  if (this.getPathFromDeps_(a)) {
    var b = this, c = [], d = function(e) {
      var f = b.getPathFromDeps_(e);
      if (!f) {
        throw Error("Bad dependency path or symbol: " + e);
      }
      if (!b.written_[f]) {
        b.written_[f] = !0;
        e = b.dependencies_[f];
        for (f = 0; f < e.requires.length; f++) {
          goog.isProvided_(e.requires[f]) || d(e.requires[f]);
        }
        c.push(e);
      }
    };
    d(a);
    a = !!this.depsToLoad_.length;
    this.depsToLoad_ = this.depsToLoad_.concat(c);
    this.paused_ || a || this.loadDeps_();
  } else {
    goog.logToConsole_("goog.require could not find: " + a);
  }
}, goog.DebugLoader_.prototype.loadDeps_ = function() {
  for (var a = this, b = this.paused_; this.depsToLoad_.length && !b;) {
    (function() {
      var c = !1, d = a.depsToLoad_.shift(), e = !1;
      a.loading_(d);
      var f = {pause:function() {
        if (c) {
          throw Error("Cannot call pause after the call to load.");
        }
        b = !0;
      }, resume:function() {
        c ? a.resume_() : b = !1;
      }, loaded:function() {
        if (e) {
          throw Error("Double call to loaded.");
        }
        e = !0;
        a.loaded_(d);
      }, pending:function() {
        for (var g = [], l = 0; l < a.loadingDeps_.length; l++) {
          g.push(a.loadingDeps_[l]);
        }
        return g;
      }, setModuleState:function(g) {
        goog.moduleLoaderState_ = {type:g, moduleName:"", declareLegacyNamespace:!1};
      }, registerEs6ModuleExports:function(g, l, p) {
        p && (goog.loadedModules_[p] = {exports:l, type:goog.ModuleType.ES6, moduleId:p || ""});
      }, registerGoogModuleExports:function(g, l) {
        goog.loadedModules_[g] = {exports:l, type:goog.ModuleType.GOOG, moduleId:g};
      }, clearModuleState:function() {
        goog.moduleLoaderState_ = null;
      }, defer:function(g) {
        if (c) {
          throw Error("Cannot register with defer after the call to load.");
        }
        a.defer_(d, g);
      }, areDepsLoaded:function() {
        return a.areDepsLoaded_(d.requires);
      }};
      try {
        d.load(f);
      } finally {
        c = !0;
      }
    })();
  }
  b && this.pause_();
}, goog.DebugLoader_.prototype.pause_ = function() {
  this.paused_ = !0;
}, goog.DebugLoader_.prototype.resume_ = function() {
  this.paused_ && (this.paused_ = !1, this.loadDeps_());
}, goog.DebugLoader_.prototype.loading_ = function(a) {
  this.loadingDeps_.push(a);
}, goog.DebugLoader_.prototype.loaded_ = function(a) {
  for (var b = 0; b < this.loadingDeps_.length; b++) {
    if (this.loadingDeps_[b] == a) {
      this.loadingDeps_.splice(b, 1);
      break;
    }
  }
  for (b = 0; b < this.deferredQueue_.length; b++) {
    if (this.deferredQueue_[b] == a.path) {
      this.deferredQueue_.splice(b, 1);
      break;
    }
  }
  if (this.loadingDeps_.length == this.deferredQueue_.length && !this.depsToLoad_.length) {
    for (; this.deferredQueue_.length;) {
      this.requested(this.deferredQueue_.shift(), !0);
    }
  }
  a.loaded();
}, goog.DebugLoader_.prototype.areDepsLoaded_ = function(a) {
  for (var b = 0; b < a.length; b++) {
    var c = this.getPathFromDeps_(a[b]);
    if (!c || !(c in this.deferredCallbacks_ || goog.isProvided_(a[b]))) {
      return !1;
    }
  }
  return !0;
}, goog.DebugLoader_.prototype.getPathFromDeps_ = function(a) {
  return a in this.idToPath_ ? this.idToPath_[a] : a in this.dependencies_ ? a : null;
}, goog.DebugLoader_.prototype.defer_ = function(a, b) {
  this.deferredCallbacks_[a.path] = b;
  this.deferredQueue_.push(a.path);
}, goog.LoadController = function() {
}, goog.LoadController.prototype.pause = function() {
}, goog.LoadController.prototype.resume = function() {
}, goog.LoadController.prototype.loaded = function() {
}, goog.LoadController.prototype.pending = function() {
}, goog.LoadController.prototype.registerEs6ModuleExports = function(a, b, c) {
}, goog.LoadController.prototype.setModuleState = function(a) {
}, goog.LoadController.prototype.clearModuleState = function() {
}, goog.LoadController.prototype.defer = function(a) {
}, goog.LoadController.prototype.areDepsLoaded = function() {
}, goog.Dependency = function(a, b, c, d, e) {
  this.path = a;
  this.relativePath = b;
  this.provides = c;
  this.requires = d;
  this.loadFlags = e;
  this.loaded_ = !1;
  this.loadCallbacks_ = [];
}, goog.Dependency.prototype.getPathName = function() {
  var a = this.path, b = a.indexOf("://");
  0 <= b && (a = a.substring(b + 3), b = a.indexOf("/"), 0 <= b && (a = a.substring(b + 1)));
  return a;
}, goog.Dependency.prototype.onLoad = function(a) {
  this.loaded_ ? a() : this.loadCallbacks_.push(a);
}, goog.Dependency.prototype.loaded = function() {
  this.loaded_ = !0;
  var a = this.loadCallbacks_;
  this.loadCallbacks_ = [];
  for (var b = 0; b < a.length; b++) {
    a[b]();
  }
}, goog.Dependency.defer_ = !1, goog.Dependency.callbackMap_ = {}, goog.Dependency.registerCallback_ = function(a) {
  var b = Math.random().toString(32);
  goog.Dependency.callbackMap_[b] = a;
  return b;
}, goog.Dependency.unregisterCallback_ = function(a) {
  delete goog.Dependency.callbackMap_[a];
}, goog.Dependency.callback_ = function(a, b) {
  if (a in goog.Dependency.callbackMap_) {
    for (var c = goog.Dependency.callbackMap_[a], d = [], e = 1; e < arguments.length; e++) {
      d.push(arguments[e]);
    }
    c.apply(void 0, d);
  } else {
    throw Error("Callback key " + a + " does not exist (was base.js loaded more than once?).");
  }
}, goog.Dependency.prototype.load = function(a) {
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a.loaded() : a.pause();
  } else {
    if (goog.inHtmlDocument_()) {
      var b = goog.global.document;
      if ("complete" == b.readyState && !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
        if (/\bdeps.js$/.test(this.path)) {
          a.loaded();
          return;
        }
        throw Error('Cannot write "' + this.path + '" after document load');
      }
      var c = goog.getScriptNonce_();
      if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && goog.isDocumentLoading_()) {
        var d = function(l) {
          l.readyState && "complete" != l.readyState ? l.onload = d : (goog.Dependency.unregisterCallback_(e), a.loaded());
        };
        var e = goog.Dependency.registerCallback_(d);
        c = c ? ' nonce="' + c + '"' : "";
        var f = '<script src="' + this.path + '"' + c + (goog.Dependency.defer_ ? " defer" : "") + ' id="script-' + e + '">\x3c/script>';
        f += "<script" + c + ">";
        f = goog.Dependency.defer_ ? f + ("document.getElementById('script-" + e + "').onload = function() {\n  goog.Dependency.callback_('" + e + "', this);\n};\n") : f + ("goog.Dependency.callback_('" + e + "', document.getElementById('script-" + e + "'));");
        f += "\x3c/script>";
        b.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(f) : f);
      } else {
        var g = b.createElement("script");
        g.defer = goog.Dependency.defer_;
        g.async = !1;
        c && (g.nonce = c);
        g.onload = function() {
          g.onload = null;
          a.loaded();
        };
        g.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path) : this.path;
        b.head.appendChild(g);
      }
    } else {
      goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), "deps.js" == this.relativePath ? (goog.logToConsole_("Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true."), a.loaded()) : a.pause();
    }
  }
}, goog.Es6ModuleDependency = function(a, b, c, d, e) {
  goog.Dependency.call(this, a, b, c, d, e);
}, goog.inherits(goog.Es6ModuleDependency, goog.Dependency), goog.Es6ModuleDependency.prototype.load = function(a) {
  function b(h, m) {
    var k = "", n = goog.getScriptNonce_();
    n && (k = ' nonce="' + n + '"');
    k = m ? '<script type="module" crossorigin' + k + ">" + m + "\x3c/script>" : '<script type="module" crossorigin src="' + h + '"' + k + ">\x3c/script>";
    d.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(k) : k);
  }
  function c(h, m) {
    var k = d.createElement("script");
    k.defer = !0;
    k.async = !1;
    k.type = "module";
    k.setAttribute("crossorigin", !0);
    var n = goog.getScriptNonce_();
    n && (k.nonce = n);
    m ? k.text = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScript(m) : m : k.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(h) : h;
    d.head.appendChild(k);
  }
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a.loaded() : a.pause();
  } else {
    if (goog.inHtmlDocument_()) {
      var d = goog.global.document, e = this;
      if (goog.isDocumentLoading_()) {
        var f = b;
        goog.Dependency.defer_ = !0;
      } else {
        f = c;
      }
      var g = goog.Dependency.registerCallback_(function() {
        goog.Dependency.unregisterCallback_(g);
        a.setModuleState(goog.ModuleType.ES6);
      });
      f(void 0, 'goog.Dependency.callback_("' + g + '")');
      f(this.path, void 0);
      var l = goog.Dependency.registerCallback_(function(h) {
        goog.Dependency.unregisterCallback_(l);
        a.registerEs6ModuleExports(e.path, h, goog.moduleLoaderState_.moduleName);
      });
      f(void 0, 'import * as m from "' + this.path + '"; goog.Dependency.callback_("' + l + '", m)');
      var p = goog.Dependency.registerCallback_(function() {
        goog.Dependency.unregisterCallback_(p);
        a.clearModuleState();
        a.loaded();
      });
      f(void 0, 'goog.Dependency.callback_("' + p + '")');
    } else {
      goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), a.pause();
    }
  }
}, goog.TransformedDependency = function(a, b, c, d, e) {
  goog.Dependency.call(this, a, b, c, d, e);
  this.contents_ = null;
  this.lazyFetch_ = !goog.inHtmlDocument_() || !("noModule" in goog.global.document.createElement("script"));
}, goog.inherits(goog.TransformedDependency, goog.Dependency), goog.TransformedDependency.prototype.load = function(a) {
  function b() {
    e.contents_ = goog.loadFileSync_(e.path);
    e.contents_ && (e.contents_ = e.transform(e.contents_), e.contents_ && (e.contents_ += "\n//# sourceURL=" + e.path));
  }
  function c() {
    e.lazyFetch_ && b();
    if (e.contents_) {
      f && a.setModuleState(goog.ModuleType.ES6);
      try {
        var h = e.contents_;
        e.contents_ = null;
        goog.globalEval(goog.CLOSURE_EVAL_PREFILTER_.createScript(h));
        if (f) {
          var m = goog.moduleLoaderState_.moduleName;
        }
      } finally {
        f && a.clearModuleState();
      }
      f && goog.global.$jscomp.require.ensure([e.getPathName()], function() {
        a.registerEs6ModuleExports(e.path, goog.global.$jscomp.require(e.getPathName()), m);
      });
      a.loaded();
    }
  }
  function d() {
    var h = goog.global.document, m = goog.Dependency.registerCallback_(function() {
      goog.Dependency.unregisterCallback_(m);
      c();
    }), k = goog.getScriptNonce_();
    k = "<script" + (k ? ' nonce="' + k + '"' : "") + ">" + goog.protectScriptTag_('goog.Dependency.callback_("' + m + '");') + "\x3c/script>";
    h.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(k) : k);
  }
  var e = this;
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    b(), this.contents_ && goog.global.CLOSURE_IMPORT_SCRIPT("", this.contents_) ? (this.contents_ = null, a.loaded()) : a.pause();
  } else {
    var f = this.loadFlags.module == goog.ModuleType.ES6;
    this.lazyFetch_ || b();
    var g = 1 < a.pending().length;
    if (goog.Dependency.defer_ && (g || goog.isDocumentLoading_())) {
      a.defer(function() {
        c();
      });
    } else {
      var l = goog.global.document;
      g = goog.inHtmlDocument_() && ("ActiveXObject" in goog.global || goog.isEdge_());
      if (f && goog.inHtmlDocument_() && goog.isDocumentLoading_() && !g) {
        goog.Dependency.defer_ = !0;
        a.pause();
        var p = l.onreadystatechange;
        l.onreadystatechange = function() {
          "interactive" == l.readyState && (l.onreadystatechange = p, c(), a.resume());
          "function" === typeof p && p.apply(void 0, arguments);
        };
      } else {
        goog.inHtmlDocument_() && goog.isDocumentLoading_() ? d() : c();
      }
    }
  }
}, goog.TransformedDependency.prototype.transform = function(a) {
}, goog.PreTranspiledEs6ModuleDependency = function(a, b, c, d, e) {
  goog.TransformedDependency.call(this, a, b, c, d, e);
}, goog.inherits(goog.PreTranspiledEs6ModuleDependency, goog.TransformedDependency), goog.PreTranspiledEs6ModuleDependency.prototype.transform = function(a) {
  return a;
}, goog.GoogModuleDependency = function(a, b, c, d, e) {
  goog.TransformedDependency.call(this, a, b, c, d, e);
}, goog.inherits(goog.GoogModuleDependency, goog.TransformedDependency), goog.GoogModuleDependency.prototype.transform = function(a) {
  return goog.LOAD_MODULE_USING_EVAL && void 0 !== goog.global.JSON ? "goog.loadModule(" + goog.global.JSON.stringify(a + "\n//# sourceURL=" + this.path + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + a + "\n;return exports});\n//# sourceURL=" + this.path + "\n";
}, goog.DebugLoader_.prototype.addDependency = function(a, b, c, d) {
  b = b || [];
  a = a.replace(/\\/g, "/");
  var e = goog.normalizePath_(goog.basePath + a);
  d && "boolean" !== typeof d || (d = d ? {module:goog.ModuleType.GOOG} : {});
  c = this.factory_.createDependency(e, a, b, c, d);
  this.dependencies_[e] = c;
  for (c = 0; c < b.length; c++) {
    this.idToPath_[b[c]] = e;
  }
  this.idToPath_[a] = e;
}, goog.DependencyFactory = function() {
}, goog.DependencyFactory.prototype.createDependency = function(a, b, c, d, e) {
  return e.module == goog.ModuleType.GOOG ? new goog.GoogModuleDependency(a, b, c, d, e) : e.module == goog.ModuleType.ES6 ? goog.ASSUME_ES_MODULES_TRANSPILED ? new goog.PreTranspiledEs6ModuleDependency(a, b, c, d, e) : new goog.Es6ModuleDependency(a, b, c, d, e) : new goog.Dependency(a, b, c, d, e);
}, goog.debugLoader_ = new goog.DebugLoader_(), goog.loadClosureDeps = function() {
  goog.debugLoader_.loadClosureDeps();
}, goog.setDependencyFactory = function(a) {
  goog.debugLoader_.setDependencyFactory(a);
}, goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#base") : null, goog.global.CLOSURE_NO_DEPS || goog.debugLoader_.loadClosureDeps(), goog.bootstrap = function(a, b) {
  goog.debugLoader_.bootstrap(a, b);
});
if (!COMPILED) {
  var isChrome87 = !1;
  try {
    isChrome87 = eval(goog.global.trustedTypes.emptyScript) !== goog.global.trustedTypes.emptyScript;
  } catch (a) {
  }
  goog.CLOSURE_EVAL_PREFILTER_ = goog.global.trustedTypes && isChrome87 && goog.createTrustedTypesPolicy("goog#base#devonly#eval") || {createScript:goog.identity_};
}
;var GooglePhotoURL = {FileFormats:{ORIGINAL:0, JPEG:1, PNG:2, WEBP:3, ANIMATED_WEBP:4, GIF:5, MP4:6}, OriginalFileFormats:{UNKNOWN:0, JPEG:1, PNG:2, WEBP:3, GIF:5, MP4:6}, DataTypes:{BOOLEAN:1, NUMBER:2, UINT:4, COLOR:8, PERCENT:16, STRING:32}, DEFINE:{}};
GooglePhotoURL.DEFINE.DEBUG = !0;
var $jscomp$scope$m464985988$10$Builder = function(a) {
  function b(g, l) {
    for (var p = 0, h, m, k, n, q; m = [8, 4, 3, 2, 1][p]; ++p) {
      a: {
        k = g.substr(0, m);
        for (n = 0; n < $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS.length; n += 4) {
          if ($jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[n] === k) {
            k = [$jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[n], $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[n + 1], $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[n + 2], $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[n + 3]];
            break a;
          }
        }
        k = void 0;
      }
      if (k) {
        m = g.substr(m);
        n = k[1];
        n & GooglePhotoURL.DataTypes.BOOLEAN && !m && (h = q = !0);
        n & GooglePhotoURL.DataTypes.NUMBER && !h && (q = parseFloat(m), 0 <= q && (h = !0));
        n & GooglePhotoURL.DataTypes.UINT && !h && (q = parseInt(m, 10), 0 <= q && (h = !0));
        if (n & GooglePhotoURL.DataTypes.COLOR && !h) {
          var r = m;
          var t = r.length;
          r = "#" === r.charAt(0) ? 7 === t : "0x" === r.substr(0, 2) ? 8 === t || 10 === t : !1;
          r && (h = m, q = "#" === h.charAt(0) ? 65535 * $jscomp$scope$m464985988$8$hexToUINT(h.substr(1, 2)) + 255 * $jscomp$scope$m464985988$8$hexToUINT(h.substr(3, 2)) + $jscomp$scope$m464985988$8$hexToUINT(h.substr(5, 2)) : 8 === h.length ? 65535 * $jscomp$scope$m464985988$8$hexToUINT(h.substr(2, 2)) + 255 * $jscomp$scope$m464985988$8$hexToUINT(h.substr(4, 2)) + $jscomp$scope$m464985988$8$hexToUINT(h.substr(6, 2)) : 16777215 * $jscomp$scope$m464985988$8$hexToUINT(h.substr(2, 2)) + 65535 * $jscomp$scope$m464985988$8$hexToUINT(h.substr(4, 
          2)) + 255 * $jscomp$scope$m464985988$8$hexToUINT(h.substr(6, 2)) + $jscomp$scope$m464985988$8$hexToUINT(h.substr(8, 2)), h = !0);
        }
        n & GooglePhotoURL.DataTypes.PERCENT && !h && (q = parseFloat(m), 0 <= q && 100 >= q && (h = !0));
        n & GooglePhotoURL.DataTypes.STRING && !h && m && (q = m, h = !0);
        if (h) {
          if (l) {
            k[2](this, q);
          }
          return h;
        }
      }
    }
  }
  var c = a.split("?"), d = c[0], e = c[1];
  switch($jscomp$scope$m464985988$7$getGooglePhotoGeneration(d)) {
    case 2:
      c = d.split("=");
      d = c[0];
      var f = 1 < c.length ? c.pop() : "";
      break;
    case 3:
    case 1:
      c = d.split("/");
      if (f = c[c.length - 2]) {
        -1 !== f.indexOf("-") || b(f, null) ? (c.splice(c.length - 2, 1), d = c.join("/")) : f = "";
      }
      break;
    default:
      if (GooglePhotoURL.DEFINE.DEBUG) {
        throw "Not Google Photo URL:" + a;
      }
  }
  this._normalizedURL = d;
  this._searchParams = e;
  this._upscaling = !0;
  this._mixRatio = 0;
  this._maxAge = 30;
  if (f) {
    for ($jscomp$scope$m464985988$0$currentColor = $jscomp$scope$m464985988$1$currentBackgroundColor = $jscomp$scope$m464985988$2$currentPaddingColor = void 0, f = f.split("-"); f.length;) {
      b(f.shift(), this);
    }
  }
}, $jscomp$scope$m464985988$9$uintToColorString = function(a) {
  if (16777215 < a) {
    return a = "0" + a.toString(16).substr(2), "0x" + a.substr(a.length - 8);
  }
  a = "00000" + a.toString(16).substr(2);
  return "#" + a.substr(a.length - 6);
}, $jscomp$scope$m464985988$8$hexToUINT = function(a) {
  return parseInt("0x" + a, 16);
}, $jscomp$scope$m464985988$7$getGooglePhotoGeneration = function(a) {
  return $jscomp$scope$m464985988$5$isGoogleUserContent(a) ? 0 < a.indexOf("/img/a/") ? 2 : 3 : $jscomp$scope$m464985988$6$isLegacyGoogleUserContent(a) ? 1 : 0;
}, $jscomp$scope$m464985988$6$isLegacyGoogleUserContent = function(a) {
  return 0 < a.indexOf(".bp.blogspot.com/");
}, $jscomp$scope$m464985988$5$isGoogleUserContent = function(a) {
  return 0 < a.indexOf("blogger.googleusercontent.com/img/");
};
GooglePhotoURL.Builder = $jscomp$scope$m464985988$10$Builder;
GooglePhotoURL.isGooglePhotoURL = function(a) {
  return !!$jscomp$scope$m464985988$7$getGooglePhotoGeneration(a);
};
var $jscomp$scope$m464985988$0$currentColor, $jscomp$scope$m464985988$1$currentBackgroundColor, $jscomp$scope$m464985988$2$currentPaddingColor, $jscomp$scope$m464985988$3$backgroundColorRequired, $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS = ["w", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setWidth(b);
}, function(a) {
  if (0 <= a._width && a._width !== a._height) {
    return "w" + a._width;
  }
}, "h", GooglePhotoURL.DataTypes.BOOLEAN | GooglePhotoURL.DataTypes.UINT, function(a, b) {
  !0 === b ? a.setHTMLOutputEnabled(!0) : a.setHeight(b);
}, function(a) {
  var b = [];
  0 <= a._height && a._width !== a._height && b.push("h" + a._height);
  a._htmlOutputEnabled && b.push("h");
  return b.join("-");
}, "s", GooglePhotoURL.DataTypes.BOOLEAN | GooglePhotoURL.DataTypes.UINT, function(a, b) {
  !0 === b ? a.setIgoringAspectRatio(!0) : a.setSize(b);
}, function(a) {
  var b = [];
  0 <= a._width && a._width === a._height && b.push("s" + a._width);
  if (a._ingoringAspectRatio) {
    if (GooglePhotoURL.DEFINE.DEBUG && !(0 < a._width && 0 < a._height)) {
      throw "Ignoring the aspect ratio requires both w and h to be explicitly set.";
    }
    b.push("s");
  }
  return b.join("-");
}, "nu", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setUpscaling(!1);
}, function(a) {
  if (!a._upscaling) {
    return "nu";
  }
}, "c", GooglePhotoURL.DataTypes.BOOLEAN | GooglePhotoURL.DataTypes.COLOR, function(a, b) {
  !0 === b ? a.setCropping(!0) : $jscomp$scope$m464985988$0$currentColor = b;
}, function(a) {
  if (a._cropping && !a._croppingToCircular && !a.isFreeCropping()) {
    return "c";
  }
}, "cc", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setCroppingToCircular(!0);
}, function(a) {
  if (a._croppingToCircular) {
    return "cc";
  }
}, "p", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setCroppingDifferentFocus(!0);
}, function(a) {
  if (a._croppingDifferentFocus) {
    return "p";
  }
}, "fcrop64=", GooglePhotoURL.DataTypes.STRING, function(a, b) {
  a.setFreeCropping($jscomp$scope$m464985988$8$hexToUINT(b.substr(2, 4)) / 65535 * 100, $jscomp$scope$m464985988$8$hexToUINT(b.substr(6, 4)) / 65535 * 100, $jscomp$scope$m464985988$8$hexToUINT(b.substr(10, 4)) / 65535 * 100, $jscomp$scope$m464985988$8$hexToUINT(b.substr(14, 4)) / 65535 * 100);
}, function(a) {
  function b(c) {
    c = "000" + (c / 1000 * 65535 | 0).toString(16).substr(2);
    return c.substr(c.length - 4);
  }
  if (a.isFreeCropping()) {
    return "fcrop64=1," + b(a._croppingLeft) + b(a._croppingTop) + b(a._croppingRight) + b(a._croppingBottom);
  }
}, "fh", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFlippingHorizontally(!0);
}, function(a) {
  if (a._flippingHorizontally) {
    return "fh";
  }
}, "fv", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFlippingVertically(!0);
}, function(a) {
  if (a._flippingVertically) {
    return "fv";
  }
}, "r", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setRotation(b);
}, function(a) {
  if (0 < a._rotation) {
    return "r" + a._rotation;
  }
}, "ba", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setBadge(b);
}, function(a) {
  if (0 <= a._badge) {
    return "ba" + a._badge;
  }
}, "b", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setBorderWidth(b, $jscomp$scope$m464985988$0$currentColor);
}, function(a) {
  if (0 < a._borderWidth) {
    return (0 <= a._borderColor ? "c" + $jscomp$scope$m464985988$9$uintToColorString(a._borderColor) + "-" : "") + "b" + a._borderWidth;
  }
}, "br", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setBorderRadius(b, $jscomp$scope$m464985988$1$currentBackgroundColor || $jscomp$scope$m464985988$0$currentColor);
}, function(a) {
  if (0 < a._borderRadius) {
    return $jscomp$scope$m464985988$3$backgroundColorRequired = !0, "br" + a._borderRadius;
  }
}, "bc", GooglePhotoURL.DataTypes.COLOR, function(a, b) {
  a._backgroundColor = $jscomp$scope$m464985988$1$currentBackgroundColor = b;
}, !1, "pd", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setPadding(b, $jscomp$scope$m464985988$2$currentPaddingColor || $jscomp$scope$m464985988$0$currentColor);
}, function(a) {
  if (0 < a._padding) {
    return (0 <= a._paddingColor ? "pc" + $jscomp$scope$m464985988$9$uintToColorString(a._paddingColor) + "-" : "") + "pd" + a._padding;
  }
}, "pc", GooglePhotoURL.DataTypes.COLOR, function(a, b) {
  $jscomp$scope$m464985988$2$currentPaddingColor = b;
}, !1, "fSoften=", GooglePhotoURL.DataTypes.STRING, function(a, b) {
  var c = b.split(",");
  a.setBlur(Number(c[1]), Number(c[2]));
}, function(a) {
  if (0 < a._blurringAmount) {
    return "fSoften=0," + a._blurringAmount + "," + a._mixRatio;
  }
}, "rj", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.JPEG);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.JPEG) {
    return $jscomp$scope$m464985988$3$backgroundColorRequired = !0, "rj";
  }
}, "rp", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.PNG);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.PNG) {
    return "rp";
  }
}, "rw", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.WEBP);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.WEBP) {
    return "rw";
  }
}, "rwa", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.ANIMATED_WEBP);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.ANIMATED_WEBP) {
    return "rwa";
  }
}, "rg", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.GIF);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.GIF) {
    return "rg";
  }
}, "rh", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.MP4);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.MP4) {
    return $jscomp$scope$m464985988$3$backgroundColorRequired = !0, "rh";
  }
}, "nw", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.ORIGINAL);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.ORIGINAL) {
    return "nw";
  }
}, "ft", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setLoselessCompressioEnabled(!0);
}, function(a) {
  if (a._losslessCompressioEnabled) {
    return "ft";
  }
}, "lo", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setForcingLosslessCompressionEnabled(!0);
}, function(a) {
  if (a._forcingLoselessCompressioEnabled) {
    return "lo";
  }
}, "l", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setCompressioLevel(b);
}, function(a) {
  if (0 <= a._compressioLevel) {
    return "l" + a._compressioLevel;
  }
}, "e", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setMaxAge(b);
}, function(a) {
  if (0 <= a._maxAge) {
    return "e" + a._maxAge;
  }
}, "ip", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setMetadataEnabled(!0);
}, function(a) {
  if (a._metadataEnabled) {
    return "ip";
  }
}];
$jscomp$scope$m464985988$10$Builder.prototype.getURL = function() {
  var a = this._normalizedURL, b = "", c = 3, d;
  for ($jscomp$scope$m464985988$3$backgroundColorRequired = !1; c < $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS.length; c += 4) {
    (d = $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[c](this)) && (b += "-" + d);
  }
  b = b.substr(1);
  $jscomp$scope$m464985988$3$backgroundColorRequired && 0 <= this._backgroundColor && (b = "bc" + $jscomp$scope$m464985988$9$uintToColorString(this._backgroundColor) + "-" + b);
  b && (2 === $jscomp$scope$m464985988$7$getGooglePhotoGeneration(a) ? a += "=" + b : (a = a.split("/"), a.splice(a.length - 2, 0, b), a = a.join("/")));
  return a + (this._searchParams ? "?" + this._searchParams : "");
};
$jscomp$scope$m464985988$10$Builder.prototype.getURLWithoutParams = function() {
  return this._normalizedURL + (this._searchParams ? "?" + this._searchParams : "");
};
$jscomp$scope$m464985988$10$Builder.prototype.getWidth = function() {
  return this._width;
};
$jscomp$scope$m464985988$10$Builder.prototype.setWidth = function(a) {
  this._width = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getHeight = function() {
  return this._height;
};
$jscomp$scope$m464985988$10$Builder.prototype.setHeight = function(a) {
  this._height = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getSize = function() {
  return this._width === this._height ? this._width : 0;
};
$jscomp$scope$m464985988$10$Builder.prototype.setSize = function(a) {
  this._width = this._height = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getUpscaling = function() {
  return this._upscaling;
};
$jscomp$scope$m464985988$10$Builder.prototype.setUpscaling = function(a) {
  this._upscaling = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getIgoringAspectRatio = function() {
  return this._ingoringAspectRatio;
};
$jscomp$scope$m464985988$10$Builder.prototype.setIgoringAspectRatio = function(a) {
  if (this._ingoringAspectRatio = a) {
    this._upscaling = !0;
  }
};
$jscomp$scope$m464985988$10$Builder.prototype.getCropping = function() {
  return this._cropping;
};
$jscomp$scope$m464985988$10$Builder.prototype.setCropping = function(a) {
  this._cropping = a;
  a || (this._croppingToCircular = !1);
};
$jscomp$scope$m464985988$10$Builder.prototype.getCroppingToCircular = function() {
  return this._croppingToCircular;
};
$jscomp$scope$m464985988$10$Builder.prototype.setCroppingToCircular = function(a) {
  this._cropping = this._croppingToCircular = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getCroppingDifferentFocus = function() {
  return this._croppingDifferentFocus;
};
$jscomp$scope$m464985988$10$Builder.prototype.setCroppingDifferentFocus = function(a) {
  this._croppingDifferentFocus = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.isFreeCropping = function() {
  return !(0 <= this._croppingLeft && this._croppingLeft < this._croppingRight && 100 >= this._croppingRight && 0 <= this._croppingTop && this._croppingTop < this._croppingBottom && 100 >= this._croppingBottom);
};
$jscomp$scope$m464985988$10$Builder.prototype.getFreeCropping = function() {
  return this.isFreeCropping() ? [this._croppingLeft, this._croppingTop, this._croppingRight, this._croppingBottom] : null;
};
$jscomp$scope$m464985988$10$Builder.prototype.setFreeCropping = function(a, b, c, d) {
  if (GooglePhotoURL.DEFINE.DEBUG && !(0 <= a && a <= c && 100 >= c && 0 <= b && b <= d && 100 >= d)) {
    throw "[setFreeCropping] Invalid value." + a + " " + b + " " + c + " " + d;
  }
  this._croppingLeft = a;
  this._croppingTop = b;
  this._croppingRight = c;
  this._croppingBottom = d;
  this.setCropping(0 < a + b || 200 > c + d);
};
$jscomp$scope$m464985988$10$Builder.prototype.getFlippingHorizontally = function() {
  return this._flippingHorizontally;
};
$jscomp$scope$m464985988$10$Builder.prototype.setFlippingHorizontally = function(a) {
  this._flippingHorizontally = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getFlippingVertically = function() {
  return this._flippingVertically;
};
$jscomp$scope$m464985988$10$Builder.prototype.setFlippingVertically = function(a) {
  this._flippingVertically = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getRotation = function() {
  return this._rotation;
};
$jscomp$scope$m464985988$10$Builder.prototype.setRotation = function(a) {
  if (GooglePhotoURL.DEFINE.DEBUG && (0 !== a % 90 || 0 > a || 270 < a)) {
    throw "[setRotation] Invalid value." + a;
  }
  this._rotation = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getBadge = function() {
  return this._badge;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBadge = function(a) {
  if (GooglePhotoURL.DEFINE.DEBUG && !(0 <= a && 11 >= a)) {
    throw "[setBadge] Invalid value." + a;
  }
  this._badge = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getBorderWidth = function() {
  return this._borderWidth;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBorderWidth = function(a, b) {
  this._borderWidth = a;
  0 <= b && (this._borderColor = b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getBorderColor = function() {
  return this._borderColor;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBorderColor = function(a) {
  this._borderColor = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getBorderRadius = function() {
  return this._borderRadius;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBorderRadius = function(a, b) {
  this._borderRadius = a;
  0 <= b && (this._backgroundColor = b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getBackgroundColor = function() {
  return this._backgroundColor;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBackgroundColor = function(a) {
  this._backgroundColor = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getPadding = function() {
  return this._padding;
};
$jscomp$scope$m464985988$10$Builder.prototype.setPadding = function(a, b) {
  this._padding = a;
  0 <= b && (this._paddingColor = b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getPaddingColor = function() {
  return this._paddingColor;
};
$jscomp$scope$m464985988$10$Builder.prototype.setPaddingColor = function(a) {
  this._paddingColor = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getBlur = function() {
  return this._blurringAmount;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBlur = function(a, b) {
  this._blurringAmount = a;
  0 <= b && this.setMixRatio(b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getMixRatio = function() {
  return this._mixRatio;
};
$jscomp$scope$m464985988$10$Builder.prototype.setMixRatio = function(a) {
  if (GooglePhotoURL.DEFINE.DEBUG && !(0 <= a && 100 >= a)) {
    throw "[setMixRatio] Invalid value. opt_mixRatio=" + a;
  }
  this._mixRatio = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getFileFormat = function() {
  return this._fileFormat;
};
$jscomp$scope$m464985988$10$Builder.prototype.setFileFormat = function(a, b) {
  if (GooglePhotoURL.DEFINE.DEBUG && !(GooglePhotoURL.FileFormats.ORIGINAL <= a && a <= GooglePhotoURL.FileFormats.MP4 && void 0 !== a)) {
    throw "[setFileFormat] Invalid value. fileFormat=" + a;
  }
  this._fileFormat = a;
  0 <= b && (this._backgroundColor = b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getHTMLOutputEnabled = function() {
  return this._htmlOutputEnabled;
};
$jscomp$scope$m464985988$10$Builder.prototype.setHTMLOutputEnabled = function(a) {
  this._htmlOutputEnabled = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getLosslessCompressionEnabled = function() {
  return this._losslessCompressioEnabled;
};
$jscomp$scope$m464985988$10$Builder.prototype.setLoselessCompressioEnabled = function(a) {
  this._losslessCompressioEnabled = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getForcingLosslessCompressionEnabled = function() {
  return this._forcingLoselessCompressioEnabled;
};
$jscomp$scope$m464985988$10$Builder.prototype.setForcingLosslessCompressionEnabled = function(a) {
  this._forcingLoselessCompressioEnabled = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getCompressionLevel = function() {
  return this._compressioLevel;
};
$jscomp$scope$m464985988$10$Builder.prototype.setCompressioLevel = function(a) {
  this._compressioLevel = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getMaxAge = function() {
  return this._maxAge;
};
$jscomp$scope$m464985988$10$Builder.prototype.setMaxAge = function(a) {
  this._maxAge = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getMetadataEnabled = function() {
  return this._metadataEnabled;
};
$jscomp$scope$m464985988$10$Builder.prototype.setMetadataEnabled = function(a) {
  this._metadataEnabled = a;
};
var browser = {};
window.GooglePhotoURLBuilder = GooglePhotoURL.Builder;

