function Person(name) {
  this.name = name
  this.friends = ['wang1']
}
Person.prototype.des = 'des';
function Stu(num, name) {
  this.num = num;
  Person.call(this, name)
}
Stu.prototype = Object.create(Person.prototype);
Stu.prototype.constructor = Stu;
var p1 = new Stu(1001, 'wang1');
