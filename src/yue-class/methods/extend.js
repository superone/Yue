import Constructor from "./constructor";
import Prototype from "./prototype";
import Flugin from "../flugin/flugin";
import Include from "./include";
import { inArr , resOptKey } from "../util";
import { getSpecifier , applySpecifier } from "../specifier/specifier";
import { optionsName , superName } from "./classproname";
import Resolve from "../specifier/resolve/index";


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

const Extend = function( props ){
    props = props || {};
    var prototype = Prototype();
    
    var Class = Constructor();

    Class.extend = Extend;
    Class.flugin = Flugin;
    Class.include = Include;
    Class[ optionsName ] = props;//transProps( props ) ;
    Class[ optionsName ][ superName ] = this;

    applyStatic( Class );

    Class.prototype = prototype;
    Class.prototype.constructor = Class;

    return Class;
}

function transProps( props ){
    let newProps = {};

    for(let k in props ){
        if( props.hasOwnProperty(k) ){
            newProps[ k ] = Resolve( k , props[k] );
        }
    }
    return newProps;
}

export default Extend;