function Parent() {
  this.name = 'arzh'
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child() {

}

//主要精髓所在
Child.prototype = new Parent()
// Child.prototype.constructor = Child

var arzhChild = new Child()

// arzhChild.getName() // 'arzh'

console.log(Child.prototype.constructor)
