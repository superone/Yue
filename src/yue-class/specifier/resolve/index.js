import util from "../../util";
import result from "./result";

/*
* key , value
* return object for resolve the specifiers
*/
export default function resOpt ( key , value ){

    let resed = util.resOptKey( key );
    let opt = result;

    let nameIndex = resed.length - 1;
    let name = resed[ nameIndex ];  //option name
    let injects = [];   //inject list
    let rType = [];     //return type

    let reg = /^\(.+\)$/; //name()
    let regA = /^\(.+\)a-z|A-Z\(.+\)$/;
    name = name.trim();

    if(!name) {
        util.error( ["Can't find the Name!" , key ].join(' ') );
        return
    }

    if( reg.test(name) ){
        injects = reg.exec( name );
        injects = injects.length > 1 ? injects[1].trim() : "";
        injects = injects.replace(" ","");
        injects = injects.split(",");
        
        name = resed[ --nameIndex ].trim();
    }

    opt.value = value;
    opt.key = key;
    opt.name = name;
    opt.injects = injects;

    opt.type = util.getType( value );
    opt.res = resed;
    opt.private = util.inArr( 'Private' , resed );
    opt.const = util.inArr('Const' , resed );
    opt.overwrite = util.inArr('Overwrite' , resed);
    opt.static = util.inArr('Static' , resed);

    return opt;
}