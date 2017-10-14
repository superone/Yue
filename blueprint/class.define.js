/**
 * 
 * Use Example @ class defined
 */

import underscore from 'underscore';
import jquery from 'jquery';
import someConfig from '../sys/conf'

var subClass = Class.extend({
    //for yue-component + yue-vdom

    '@Yue Injects' :{
        _    : underscore,
        $    : jquery , 
        conf : someConfig
    },

    '@Yue init' : function(){

    },

    '@ render' : function(){

    },

    render(){
        $render();
    },

    "Private Const config" : {

    },

    "Private Const data" : {
        curIndex : 1
    },

    'Private doSomething( conf )': function( e , conf ){

        console.log(['This is config options :' , 
                    JSON.stringify(conf) , '' ].join(''));


    },

    "Static showMessage( _ )" : function( _ ){
        console.log("This is static function");
    },

    "Overwrite Object[] showAlert( $ )" : function( $ ){

    },

    "Event Listen(whenShowDosomething) showSomething" : function(){

    },

    "Private (Void|Object)showTemp" : function(){

    },

    dosomeThing(){  //public (Any)dosomeThing

    }
});