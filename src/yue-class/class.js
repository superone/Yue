import Extend from "./methods/extend";
import Flugin from "./flugin/flugin";
import Include from "./methods/include";
import Prototype from "./methods/prototype";
import Constructor from "./methods/constructor";

function constra(){
    let Class = Constructor();

    Class.extend = Extend;
    Class.flugin = Flugin;
    Class.include = Include;
    Class.prototype = Prototype();
    Class.prototype.constructor = Class;

    return Class;
}

const Class = constra();
export default Class;