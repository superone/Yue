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

var Univer = function (prm, isBase, tools) {
    // let name = prm.name;
    let own = prm.own;

    // own[name] = obj;

    return own;
};

var Static = function (prm, isBase, tools) {
    let name = prm.name;
    let obj = prm.obj;
    let own = prm.own;

    own[name] = obj;

    return obj;
};

var Public = function (prm, isBase, tools) {
    // let name = prm.name;
    let obj = prm.obj;
    return obj;
};

var Private = function (prm, isBase, tools) {
    let name = prm.name;
    let obj = prm.obj;
    let own = prm.own;
    let res = prm.resKey;
    //own[ name ] = obj;
    if (tools.util.isFunction(obj)) {
        let opt = {
            target: obj,
            type: tools.util.getType(obj),
            res: res,
            scope: own,
            args: []
        };

        let fn = getMethod(opt);

        tools.util._definedPros(own, name, {
            get() {
                return () => {

                    let fnArgs = Array.prototype.slice.call(arguments, 0);
                    for (let i = 0, len = opt.args.length; i < len; i++) {
                        if (typeof fnArgs[i] === 'undefined') {
                            fnArgs[i] = undefined;
                        }
                    }

                    fnArgs.push(function () {
                        console.log('this is super');
                    });
                    fnArgs.push("This is fnBody-txt");

                    fn.apply(opt.scope, fnArgs);
                };
            }
        });
    }

    return obj;
};

function getMethod(opt) {

    let target = opt,
        tmpStr = "";
    let fn = target.target;
    let fnStr = fn.toString(),
        fnBody = "",
        args = [];
    let reg = /(?:\/\*[\s\S]*?\*\/|\/\/.*?\r?\n|[^{])+\{([\s\S]*)\}$/;
    let regP = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    args = fnStr.match(regP)[1].replace(/\s/g, '').split(',');
    let i = args.length;

    while (i--) {
        if (args[i] === "") args.splice(i, 1);
    }
    args = args.map(function (v) {
        return v ? ['\'', v, '\''].join('') : v;
    });
    opt.args = args.map(function (v) {
        return v;
    });

    args.push('\'Super\'');
    if (reg.test(fnStr)) {
        fnBody = reg.exec(fnStr)[1];
        fnBody += ";console.log('this is new fnBody');";
        fnBody += "console.log(fnBody);";

        tmpStr = ["new Function(", args.toString() ? args.toString() + ',' : "", "'fnBody',fnBody)"].join('');
        fn = eval(tmpStr); // new Function('Super' , 'fnBody' , fnBody );
    }

    return fn;
}

var Void = function (prm, isBase, tools) {
    // let name = prm.name;
    let own = prm.own;

    // own[name] = obj;

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

    let names = getNames(resed);

    opt.value = value;
    opt.key = key;
    opt.name = names.name; // opt name
    opt.injects = names.injects; // injects
    opt.retype = names.returnTp; //return types
    opt.specs = names.specs; //specifiers

    if (opt.specs.length > 0) {
        //If have not base speci
        if (!util.inArr(opt.specs[0], specifiers.base)) {
            opt.specs.splice(0, 0, 'Public');
        }
    } else opt.specs.push('Public');

    opt.type = util.getType(value);
    opt.res = resed;
    opt.private = util.inArr('Private', resed);
    opt.const = util.inArr('Const', resed);
    opt.overwrite = util.inArr('Overwrite', resed);
    opt.static = util.inArr('Static', resed);

    return opt;
}

function getNames(resed) {
    let reg = /^\(.+\)$/; //name()
    let regR = /^[^\(\)\s]+\([^\(\)]+\)$/; //name()
    let regA = /^\((.+)\)([a-z|A-Z|_|$|\d]+)\((.+)\)$/; //(return types)name(injects)
    let nameIndex = resed.length - 1;

    let name = resed[nameIndex];
    let ret = {
        name: "",
        injects: [],
        returnTp: [],
        specs: []
    };

    name = name.trim();

    while (!regA.test(name)) {
        if (reg.test(name)) {
            name = resed[--nameIndex] + name;
        } else if (regR.test(name)) {
            //name = resed[ nameIndex-1 ] + name ;
            if (!regA.test(resed[nameIndex - 1] + name)) {
                name = ['( )', name].join('');
            } else {
                name = resed[nameIndex - 1] + name;
            }
        } else {
            name = ['( )', name, '( )'].join('');
        }
    }

    let r = regA.exec(name);
    ret.name = r[2].trim();
    ret.injects = r[3].trim() ? r[3].trim().split(',') : [];
    ret.returnTp = r[1].trim() ? r[1].trim().split('|') : [];

    ret.specs = Array.prototype.slice.call(resed, 0, nameIndex);

    return ret;
}

let Protected;
let Overwrite;

var specifiers = {
    "Public": Public,
    "Private": Private,
    "Static": Static,
    "Protected": Protected || Univer,
    "Override": Overwrite || Univer,
    'Univer': Univer,
    "Const": Void,
    "base": ['Public', 'Private', 'Static', 'Protected'],
    "baseEx": ['Const', 'Override'],

    done(resKey, opt) {

        let specs = resKey.specs;
        let name = resKey.name;
        let obj = resKey.value;

        for (let i in specs) {
            let handle = util.isFunction(this[specs[i]]) ? this[specs[i]] : this['Univer'];

            handle({
                own: opt.own,
                name,
                obj,
                resKey
            }, i == 0, { util, clsNames });
        }

        return this;
    },

    add(key, handle) {
        if (!this[key]) {
            this[key] = handle;
        }
    }
};



function applySpecifier(keyStr, object, own) {
    let resKey = resOpt(keyStr, object); //util.resOptKey( keyStr );
    let spec = specifiers;
    //应用specifiers 

    spec.done(resKey, {
        own,
        object
    });
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
