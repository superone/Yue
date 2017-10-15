
const flugin = (function (){
    return function( o ){
        let own = this;
        own.prototype.flugin = own.prototype.flugin || {};
        console.log(own);
        console.log( o );
    }
})();

export default flugin;