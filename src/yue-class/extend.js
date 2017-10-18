import Constructor from "./constructor";
import Prototype from "./prototype";
import Flugin from "./flugin/flugin";
import { inArr , resOptKey } from "./util";
import { getSpecifier , applySpecifier } from "./specifier/specifier";
import { optionsName , superName } from "./classproname";


function applyStatic( Cls ){
    let opt = Cls[ optionsName ] || {};
    let tmp;

    for(let key in opt ){
        tmp = resOptKey( key );
        if( inArr( "Static" , tmp ) ){
            applySpecifier( key , opt[key] , Cls );
        }
    }
}

const extend = function( props ){
    props = props || {};
    var prototype = Prototype();
    
    var Class = Constructor();

    Class.extend = extend;
    Class.flugin = Flugin;
    Class[ optionsName ] = props;
    Class[ optionsName ][ superName ] = this;

    applyStatic( Class );

    Class.prototype = prototype;
    Class.prototype.constructor = Class;

    return Class;
}

export default extend;