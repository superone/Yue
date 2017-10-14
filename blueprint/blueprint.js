export default {
    blueprint : [
        'yue-class',
        'yue-template',
        'yue-model',
        'yue-component',
        'yue-event',
        'yue-vdom',
        'yue-vm',
        'yue-redux',
        'yue-cdl',  //Component Describe Language
        'yue-loader',
        'yue-cli',
        'yue-tester'
    ]
}

// Yue.extend({
//     me(){

//     }
// });

/**
 *  yue-class
 * 
 *  Base Class
 * 
 * 
    var subClass = Class.extend({
        //for yue-component + yue-vdom

        '@Injects' :{
            _   : underscore,
            $   : jquery , 
            txt : 'hello word!'
        },

        '@init' : function(){

        },

        '@render' : function{

        },

        render(){
            $render();
        },

        "Const Mixin config" : {

        },

        "Private Const data" : {
            curIndex : 1
        },

        "Static showMessage( _ )" : function(){
            console.log("This is static function");
        },

        "Overwrite Object[] showAlert( $ )" : function(){

        },

        "Event Listen(whenShowDosomething) showSomething" : function(){

        },

        "Private (Void)showTemp" : function(){

        }

        dosomeThing(){  //public (Any)dosomeThing

        }
    });
 * 
 */





/*
 * yue-cdl
 * Component Describe Language
 * 
    $element : #app
    $style: path(../style/style.less)
    $template : path(../template/app.tpl)
    $method
        aClick : methods.hello      //map gloab param
        bClick : methods.hello2     //map gloab param
        cClick : path(../event/cClick)
    $static
        meth_1 : path(../util/methods).meth_1
    @(firstApp)
        @a-btn
            &click : aClick( $event )
        @a-btn1
            &click : bClick( $event )
 * 
 */