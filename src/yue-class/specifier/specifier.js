import util from "../util";
import clsNames from "../classproname";
import Univer from "./specs/univer";
import Static from "./specs/static";
import Private from "./specs/private";
import Void from "./specs/void";

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
    let resKey = util.resOptKey( keyStr );
    let objName = resKey[ resKey.length-1 ];

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