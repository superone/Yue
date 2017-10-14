import Extend from "./extend";
import Prototype from "./prototype";
import Constructor from "./constructor";

let Class = Constructor();
Class.extend = Extend;
Class.prototype = Prototype();
Class.prototype.constructor = Class;

export default Class;