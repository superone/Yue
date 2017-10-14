import { initName } from "./classproname";

export default function(){

    function fn ( options ){
       let o = options || {};
       let initFn = function(){};
   
       if( this instanceof fn ){
           //new
           initFn = o['init'] ? o['init'] : initFn;
           //init the object
           fn.prototype[initName].call( this , options , fn );
           initFn.apply( this , arguments );
   
       }else{
           //extend
           return fn.extend( o );
       }
   }

   return fn;

}