const _type = Object.prototype.toString;
const _definedPros = Object.defineProperty;

export function toNumber (val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
}

export function toString (val) {
    return val == null
      ? ''
      : typeof val === 'object'
        ? JSON.stringify(val, null, 2)
        : String(val)
  }


  export function inArr( v , arr ){
    arr = arr || [];

    for(let i in arr){
       if( arr[i] === v ){
           return true;
       }
    }

    return false;
}

export function resOptKey( str ){
    let tmp;
    str = str ? str : "";
    str = str.trim();
    str = str.replace( /\s+/g ,  " " );

    tmp = str.split(" ");
    return tmp;
}

export function clone( obj ){
    if ( null == obj || !inArr( getType(obj) , ["Object","Array","Function"] ) ) return obj;

    if ( isArray(obj) ) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    if ( isObject(obj) ) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    if ( isFunction(obj) ) {        
        return obj;
    }

    throw new Error("Unable to copy object! Its type isn't supported:[" + getType(obj) +"]" );
}

export function mergeObject(){
    let _slice = Array.prototype.slice;
    let first = _slice.call(arguments , 0,1)[0];
    let deep = false , start = 0;

    if( isBoolean( first ) ){
        if(first) deep = true;
        start = 1;
    }

    let newObject = _slice.call(arguments , start , start + 1);
    newObject = newObject[0];
    let objArr = _slice.call(arguments , start+1 );

    for( let i in objArr ){
        if( isObject( objArr[i] ) ){
            for (let attr in objArr[i]) {
                if ( objArr[i].hasOwnProperty(attr) ){
                    if( deep ){
                        newObject[attr] = clone( objArr[i][attr] );
                    }else{
                        newObject[attr] = objArr[i][attr] ;
                    }
                }
            }
        }
    }

    return newObject;
}

export function getType(  v ){
    return _type.call( v ).slice(8,-1);
}

export function isBoolean( v ){
    return _type.call( v ).slice(8,-1) == "Boolean";
}

export function isFunction( v ){
    return _type.call( v ).slice(8,-1) == "Function";
}

export function isArray( v ){
    return _type.call( v ).slice(8,-1) == "Array";
}

export function isObject( v ){
    return _type.call( v ).slice(8,-1) == "Object";
}

const util = {
    toNumber,
    toString,
    inArr,
    resOptKey,

    clone,
    mergeObject,
    getType,
    isBoolean,
    isFunction,
    isArray,
    isObject,

    _definedPros
}

export default util;