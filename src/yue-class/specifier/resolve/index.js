import util from "../../util";
import result from "./result";

export function resOpt ( key , value ){

    let resed = util.resOptKey( key );
    let opt = result();

    opt.value = value;
    opt.key = key;
    opt.type = util.getType( value );
    opt.res = resed;
    opt.private = util.inArr( 'Private' , resed );
    opt.const = util.inArr('Const' , resed );
    opt.overwrite = util.inArr('Overwrite' , resed);
}