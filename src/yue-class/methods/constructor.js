import { initName } from "./classproname";

export default function(){
    
    function fn ( props ){
        return constructorFn.apply( this , arguments );
    }
    
    function constructorFn( props ){
        let o = props || {};
        let initFn = function(){};
    
        if( this instanceof fn ){
            //new
            initFn = o['init'] ? o['init'] : initFn;
            //init the object
            fn.prototype[initName].call( this , props , fn );
            initFn.apply( this , arguments );
        }else{
            //extend
            return fn.extend( o );
        }
    }

    return fn;
}
