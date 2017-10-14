import Constructor from "./constructor";
import Prototype from "./prototype";
import { inArr , resOptKey } from "./util";
import { getSpecifier , applySpecifier } from "./specifier/specifier";
import { optionsName , superName } from "./classproname";


function applyStatic( Cls ){
    let opt = Cls[ optionsName ] || {} ;
    let tmp;

    for(let key in opt ){
        tmp = resOptKey( key );
        if( inArr( "Static" , tmp ) ){
            applySpecifier( key , opt[key] , Cls );
        }
    }
}

const extend = function( options ){
    options = options || {};
    var prototype = Prototype();
    
    var Class = Constructor();

    Class.extend = extend;
    Class[ optionsName ] = options;
    Class[ optionsName ][superName] = this;

    applyStatic( Class );

    Class.prototype = prototype;
    Class.prototype.constructor = Class;

    return Class;
}

export default extend;