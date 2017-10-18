var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = (function () {
    function Base() {
        this.sex = {
            a: {
                c: 'fds',
                d: 'fd'
            }
        };
        this.name = "chenbo";
    }
    Base.prototype.show = function () {
        console.log('Its show');
    };
    Base.prototype.showName = function () {
        console.log(name);
        this.show();
    };
    return Base;
}());
var Ext = (function (_super) {
    __extends(Ext, _super);
    function Ext() {
        var _this = _super.call(this) || this;
        _this.title = "manager";
        return _this;
    }
    Ext.prototype.showName = function () {
        _super.prototype.showName.call(this);
        console.log('fds');
    };
    return Ext;
}(Base));
var ext = new Ext();
