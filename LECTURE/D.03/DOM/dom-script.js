/*! dom-script.js © yamoo9.net, 2016 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cacteil = (function (_super) {
    __extends(Cacteil, _super);
    function Cacteil(name) {
        if (name === void 0) { name = 'cacteil'; }
        _super.call(this);
        this.name = name;
    }
    Cacteil.prototype.getName = function () {
        return this.name;
    };
    return Cacteil;
}(HTMLElement));
