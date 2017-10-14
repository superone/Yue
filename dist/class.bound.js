(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Yue = factory());
}(this, (function () {

const clone = function (obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

const extend = function (options) {
    var prototype = this.prototype;
    var newPrototype = clone(prototype);

    var classStr = Class.toString();
    console.log(classStr);
    var suClass = new Function("Class", ";");

    suClass.extend = extend;

    suClass.prototype = newPrototype;

    suClass.prototype.constructor = suClass;

    return suClass;
};

function Class(o) {
    let options = o || {};

    if (this instanceof arguments.callee) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }

        this['init'] = this['init'] ? this['init'] : function () {};

        this['init'].apply(this, arguments);
    } else {
        //extend
        return arguments.callee.extend(o);
    }
}

Class.extend = extend;

Class.prototype = {};

Class.prototype.constructor = Class;

return Class;

})));
