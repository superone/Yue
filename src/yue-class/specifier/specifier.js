import util from "../util";
import clsNames from "../classproname";
import Univer from "./specs/univer";
import Static from "./specs/static";
import Private from "./specs/private";
import Void from "./specs/void";
import Resolve from "./resolve/index";

const specifiers = {
    "Public" : Univer,
    "Static" : Static,
    "Event" : Univer,
    "Private" : Private,
    "Void" : Void
}

export function getSpecifier( str ){
    return typeof specifiers[str] === "function" ? specifiers[str] : Univer;
};

export function applySpecifier( keyStr , object , own ){
    let resKey = Resolve( keyStr , object );//util.resOptKey( keyStr );
    let objName = resKey.name;

    
    for( let i in resKey ){
        //如果定义指令
        if( i< resKey.length-1 ){
            getSpecifier( resKey[i] ).call(
                own , 
                objName , 
                object , 
                own , 
                { util , clsNames }
            );
        }else if( i == 0){
            own[ objName ] = object;
        }
    }
}

export function installation(){

}