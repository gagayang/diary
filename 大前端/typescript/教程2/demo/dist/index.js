"use strict";
var Person = /** @class */ (function () {
    function Person(_name) {
        this.name = 'temp-wang';
        this.name = _name;
    }
    Person.prototype.eat = function (what) {
        console.log("".concat(this.name, " is eat ").concat(what));
    };
    return Person;
}());
