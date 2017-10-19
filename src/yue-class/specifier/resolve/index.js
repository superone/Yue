import util from "../../util";
import result from "./result";
import { specifiers } from "../specifier";

/*
* key , value
* return object for resolve the specifiers
*/
export default function Resolve ( key , value ){

    let resed = util.resOptKey( key );
    let opt = result();

    let nameIndex = resed.length - 1;
    let name = resed[ nameIndex ];  //option name
    let injects = [];   //inject list
    let rType = [];     //return type

    let names = getNames(resed);

    opt.value = value;
    opt.key = key;
    opt.name = names.name; // opt name
    opt.injects = names.injects; // injects
    opt.retype = names.returnTp; //return types
    opt.specs = names.specs;  //specifiers

    if( opt.specs.length>0 ){
        //If have not base speci
        if( !util.inArr(opt.specs[0] , specifiers.base ) ){
            opt.specs.splice( 0 , 0 , 'Public');
        }
    }else opt.specs.push('Public');
    

    opt.type = util.getType( value );
    opt.res = resed;
    opt.private = util.inArr( 'Private' , resed );
    opt.const = util.inArr('Const' , resed );
    opt.overwrite = util.inArr('Overwrite' , resed);
    opt.static = util.inArr('Static' , resed);

    return opt;
}

function getNames( resed ){
    let reg = /^\(.+\)$/; //name()
    let regR = /^[^\(\)\s]+\([^\(\)]+\)$/; //name()
    let regA = /^\((.+)\)([a-z|A-Z|_|$|\d]+)\((.+)\)$/; //(return types)name(injects)
    let nameIndex = resed.length-1 , tmp;

    let name = resed[ nameIndex ];
    let ret = {
        name : "",
        injects : [],
        returnTp : [],
        specs : []
    };

    name = name.trim();

    while( !regA.test( name ) ){
        if( reg.test(name)){
            name = resed[ --nameIndex ] + name ;
        }else if( regR.test(name) ){
            //name = resed[ nameIndex-1 ] + name ;
            if( !regA.test( resed[ nameIndex-1 ] + name ) ){
                name = ['( )', name ].join('')
            }else{
                name = resed[ nameIndex-1 ] + name ;
            }
        }else{
            name = ['( )', name , '( )'].join('');
        }
    }

    let r = regA.exec( name );
    ret.name = r[2].trim();
    ret.injects = r[3].trim() ? r[3].trim().split(',') : [];
    ret.returnTp = r[1].trim() ? r[1].trim().split('|') : [];

    ret.specs = Array.prototype.slice.call(resed , 0 ,nameIndex)

    return ret;
}