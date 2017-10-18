function Classo(){
    var _name = '';
    Object.defineProperty(this, "name" , {
        value : "chenbo",
        get : function(){
            return _name;
        },

        set : function( str ){
            _name = str;
        }
    });
}

var Co = new Classo();

Co.name;

function set (){

}