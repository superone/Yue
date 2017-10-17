import util from "../util";
import clsNames from "../classproname";
import Univer from "./specs/univer";
import Static from "./specs/static";
import Public from "./specs/public";
import Private from "./specs/private";
import Void from "./specs/void";
import Resolve from "./resolve/index";

let Protected, Overwrite;

export var specifiers = {
    "Public" : Public,
    "Private" : Private,
    "Static" : Static,
    "Protected" : Protected || Univer,
    "Override": Overwrite || Univer, 
    'Univer': Univer,
    "Const" : Void,
    "base" : ['Public','Private','Static','Protected'],
    "baseEx" : ['Const','Override'],

    done( resKey , opt ){

        let specs = resKey.specs;
        let name = resKey.name;
        let obj = resKey.value;
        let cls = opt.Cls;

        for(let i in specs){
            let handle = util.isFunction( this[ specs[i] ] ) ? 
                         this[ specs[i] ] : 
                         this['Univer'];

            handle(
                {
                    own : opt.own , 
                    name , 
                    obj ,
                    resKey,
                    cls
                }, 
                i == 0,
                { util , clsNames } 
            );
        }
        
        return this;
    },

    add ( key , handle ){
        if( !this[key] ){
            this[ key ] = handle;
        }
    }
}

export function getSpecifier( str ){
    return typeof specifiers[str] === "function" ? specifiers[str] : Univer;
};

export function applySpecifier( keyStr , object , own , Cls){
    let resKey = Resolve( keyStr , object );//util.resOptKey( keyStr );
    let objName = resKey.name;
    let spec = specifiers;

    //应用specifiers
    spec.done( resKey , {
        own,
        object,
        Cls
    });
}

export function installation(){

}