import Extend from "./extend";
import Flugin from "./flugin/flugin";
import Prototype from "./prototype";
import Constructor from "./constructor";

let Class = Constructor();
Class.extend = Extend;
Class.flugin = Flugin;
Class.prototype = Prototype();
Class.prototype.constructor = Class;

export default Class;