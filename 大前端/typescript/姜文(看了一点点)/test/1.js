"use strict";
class People {
    constructor() { }
    eat() { }
    step() {
        console.log("People=>step");
    }
}
class Stu extends People {
    constructor(username, age, address, phone) {
        //  super(username, age);
        super();
        this.phone = phone;
        this.address = address;
    }
    study() { }
}
let people = new People();
//let result = people as Stu;// 类型断言 正确
let result = people; // 类型转换 
// 以上断言和转换效果一样，转了过后一个父实例就能在调用子实例方法时候得到ts提示
result.study();
// 这种用法比较少，更多的业务场景是把父类断言成子类
let stu = new Stu("wangwu", 23, "北京", "123");
let result2 = stu; // 正确， 父子互相断言
