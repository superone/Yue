(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Class = factory());
}(this, (function () { 'use strict';

const propsName = "__class_props__";
const optionsName = "__class_options__";
const initName = "__class_init__";
const superName = "__class_super__";
var clsNames = {
    propsName,
    optionsName,
    initName,
    superName
};

var Constructor = function () {

    function fn(props) {
        let o = props || {};
        let initFn = function () {};

        if (this instanceof fn) {
            //new
            initFn = o['init'] ? o['init'] : initFn;
            //init the object
            fn.prototype[initName].call(this, props, fn);
            initFn.apply(this, arguments);
        } else {
            //extend
            return fn.extend(o);
        }
    }

    return fn;
};

const _type = Object.prototype.toString;
const _definedPros = Object.defineProperty;

function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
}

function toString(val) {
    return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

function error(msg, code) {
    let txt = ['Error:', msg];
    if (code) {
        txt.push(['\n', 'CODE:', code].join(' '));
    }
    console.log(txt);
}

function warn(msg, code) {
    let txt = ['Warning:', msg];
    if (code) {
        txt.push(['\n', 'CODE:', code].join(' '));
    }
    console.log(txt);
}

function inArr(v, arr) {
    arr = arr || [];

    for (let i in arr) {
        if (arr[i] === v) {
            return true;
        }
    }

    return false;
}

function resOptKey(str) {
    let tmp;
    str = str ? str : "";
    str = str.trim();
    str = str.replace(/\s+/g, " ");

    tmp = str.split(" ");
    return tmp;
}

function clone(obj) {
    if (null == obj || !inArr(getType(obj), ["Object", "Array", "Function"])) return obj;

    if (isArray(obj)) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if (isObject(obj)) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    if (isFunction(obj)) {
        return obj;
    }

    throw new Error("Unable to copy object! Its type isn't supported:[" + getType(obj) + "]");
}

function mergeObject() {
    let _slice = Array.prototype.slice;
    let first = _slice.call(arguments, 0, 1)[0];
    let deep = false,
        start = 0;

    if (isBoolean(first)) {
        if (first) deep = true;
        start = 1;
    }

    let newObject = _slice.call(arguments, start, start + 1);
    newObject = newObject[0];
    let objArr = _slice.call(arguments, start + 1);

    for (let i in objArr) {
        if (isObject(objArr[i])) {
            for (let attr in objArr[i]) {
                if (objArr[i].hasOwnProperty(attr)) {
                    if (deep) {
                        newObject[attr] = clone(objArr[i][attr]);
                    } else {
                        newObject[attr] = objArr[i][attr];
                    }
                }
            }
        }
    }

    return newObject;
}

function getType(v) {
    return _type.call(v).slice(8, -1);
}

function isBoolean(v) {
    return _type.call(v).slice(8, -1) == "Boolean";
}

function isFunction(v) {
    return _type.call(v).slice(8, -1) == "Function";
}

function isArray(v) {
    return _type.call(v).slice(8, -1) == "Array";
}

function isObject(v) {
    return _type.call(v).slice(8, -1) == "Object";
}

const util = {
    toNumber,
    toString,
    inArr,
    resOptKey,
    error,
    warn,

    clone,
    mergeObject,
    getType,
    isBoolean,
    isFunction,
    isArray,
    isObject,

    _definedPros
};

var Univer = function (name, obj, own, util) {

    own[name] = obj;

    return own;
};

var Static = function (name, obj, own, util) {

    own[name] = obj;

    return obj;
};

var Private = function (name, obj, own, tools) {
    //own[ name ] = obj;
    let propsName = tools.clsNames.propsName;
    let _props_ = own[propsName];

    if (tools.util.isFunction(obj)) {
        let oriName = obj.name;

        if (!_props_[name]) {
            _props_[name] = {
                target: obj,
                type: tools.util.getType(obj),
                specis: tools.util.resOptKey(oriName),
                scope: own
            };
        }

        tools.util._definedPros(own, name, {
            get() {
                return () => {
                    let scope = this[propsName][name].scope ? this[propsName][name].scope : own;
                    this[propsName][name].target.applay(scope, arguments);
                };
            }
        });
    }

    return obj;
};

var Void = function (name, obj, own, util) {

    own[name] = obj;

    return own;
};

var result = (function () {
    return {};
})();

/*
* key , value
* return object for resolve the specifiers
*/
function resOpt(key, value) {

    let resed = util.resOptKey(key);
    let opt = result;

    let nameIndex = resed.length - 1;
    let name = resed[nameIndex]; //option name
    let injects = []; //inject list
    let reg = /^\(.+\)$/; //name()
    name = name.trim();

    if (!name) {
        util.error(["Can't find the Name!", key].join(' '));
        return;
    }

    if (reg.test(name)) {
        injects = reg.exec(name);
        injects = injects.length > 1 ? injects[1].trim() : "";
        injects = injects.replace(" ", "");
        injects = injects.split(",");

        name = resed[--nameIndex].trim();
    }

    opt.value = value;
    opt.key = key;
    opt.name = name;
    opt.injects = injects;

    opt.type = util.getType(value);
    opt.res = resed;
    opt.private = util.inArr('Private', resed);
    opt.const = util.inArr('Const', resed);
    opt.overwrite = util.inArr('Overwrite', resed);
    opt.static = util.inArr('Static', resed);

    return opt;
}

const specifiers = {
    "Public": Univer,
    "Static": Static,
    "Event": Univer,
    "Private": Private,
    "Void": Void
};

function getSpecifier(str) {
    return typeof specifiers[str] === "function" ? specifiers[str] : Univer;
}

function applySpecifier(keyStr, object, own) {
    let resKey = resOpt(keyStr, object); //util.resOptKey( keyStr );
    let objName = resKey.name;

    for (let i in resKey) {
        //如果定义指令
        if (i < resKey.length - 1) {
            getSpecifier(resKey[i]).call(own, objName, object, own, { util, clsNames });
        } else if (i == 0) {
            own[objName] = object;
        }
    }
}

function init(options, Cls) {
    if (!Cls) {
        throw new Error("Class undefined!");
    }
    let ownOptions = Cls[optionsName] || {};
    //merge Options 
    //var a = mergeObject( true , { a : 'a' , b : { c : "c"} } , { c: "c" , d: { e : 2 } });
    let newOptions = mergeObject(true, {}, options, ownOptions);
    //逐个应用key
    this[propsName] = {};
    for (let key in newOptions) {
        if (newOptions.hasOwnProperty(key)) {
            applySpecifier(key, newOptions[key], this);
        }
    }
}

const prototype = function () {
    let o = {};
    o[initName] = init;
    return o;
};

const flugin = function () {
    return function (o) {
        let own = this;
        own.prototype.flugin = own.prototype.flugin || {};
        console.log(own);
        console.log(o);
    };
}();

function applyStatic(Cls) {
    let opt = Cls[optionsName] || {};
    let tmp;

    for (let key in opt) {
        tmp = resOptKey(key);
        if (inArr("Static", tmp)) {
            applySpecifier(key, opt[key], Cls);
        }
    }
}

const extend = function (props) {
    props = props || {};
    var prototype$$1 = prototype();

    var Class = Constructor();

    Class.extend = extend;
    Class.flugin = flugin;
    Class[optionsName] = props;
    Class[optionsName][superName] = this;

    applyStatic(Class);

    Class.prototype = prototype$$1;
    Class.prototype.constructor = Class;

    return Class;
};

let Class$1 = Constructor();
Class$1.extend = extend;
Class$1.flugin = flugin;
Class$1.prototype = prototype();
Class$1.prototype.constructor = Class$1;

return Class$1;

})));
