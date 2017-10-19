import { applySpecifier } from "../specifier/specifier";
import { mergeObject } from "../util";
import { propsName , initName , optionsName } from "./classproname";

function init( options , Cls ){
    if( !Cls ){
        throw new Error("Class undefined!");
    }
    let ownOptions = Cls[ optionsName ] || {};
    //merge Options 
    //var a = mergeObject( true , { a : 'a' , b : { c : "c"} } , { c: "c" , d: { e : 2 } });
    let newOptions = mergeObject( true , {} , options , ownOptions );
    //逐个应用key
    this[ propsName ] = {};
    for( let key in newOptions ){
        if( newOptions.hasOwnProperty(key) ){
            applySpecifier( key , newOptions[key] , this , Cls/*class*/);
        }
    }

}

const prototype = function(){
    let o = {};
    o[initName] = init;
    return o;
}

export default prototype;