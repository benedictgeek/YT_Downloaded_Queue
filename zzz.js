"use strict";
exports.__esModule = true;
var Person = /** @class */ (function () {
    function Person(_a) {
        var name = _a.name;
        this.myname = name;
    }
    Person.prototype.greet = function () {
        return this.myname;
    };
    return Person;
}());
var p = new Person({ name: "Shola" });
console.log(p.greet());
