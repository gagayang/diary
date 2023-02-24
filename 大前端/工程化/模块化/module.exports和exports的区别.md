## module.exports和exports的区别

在学习Node.js时，经常能看到两种导出模块的方式：module.exports和exports。

```
12
console.log(exports);//输出：{}
console.log(module);//输出：Module {..., exports: {}, ...} （注：...代表省略了其他一些属性）
```

从打印我们可以看出，module.exports和exports一开始都是一个空对象{}，实际上，这两个对象指向同一块内存。这也就是说module.exports和exports是等价的（有个前提：不去改变它们指向的内存地址）。

例如：exports.age = 18和module.export.age = 18，这两种写法是一致的（都相当于给最初的空对象{}添加了一个属性，通过require得到的就是{age: 18}）。

### 但是

require引入的对象本质上是module.exports。这就产生了一个问题，当 module.exports和exports指向的不是同一块内存时，exports的内容就会失效。
例如：

```
12
module.exports = {name: '萤火虫叔叔'}；
exports = {name: '萤火虫老阿姨'}
```

此时module.exports指向了一块新的内存（该内存的内容为{name: ‘萤火虫叔叔’}），exports指向了另一块新的内存（该内存的内容为{name: ‘萤火虫老阿姨’}）。require得到的是{name: ‘萤火虫叔叔’}。

附上代码（在main.js中引入people.js）：

```
123
//people.js
module.exports = {name: '萤火虫叔叔'}；
exports = {name: '萤火虫老阿姨'};
```

```
123
//main.js
let people = require('./people');
console.log(people);//输出：{name: '萤火虫叔叔'}
```

## 总结

### 1、其实就是下面这样：

```
123456789
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '',
  loaded: false,
  children: [],
  paths:[] 
  }
```

Module里面包含了exports对象，并且Module.exports和exports都是指向了同一个内存地址，当我们赋值简单数据类型的时候，比如a=2，相当于在一个空对象上添加了一个key：a，对应的value是2，这种情况下Module.exports和exports没有区别，但是当我们导出是一个对象，等于Module.exports = 一个新对象，Module.exports和exports之间的地址关系就没有关系了，Module.exports还能正常导出一个对象，exports失效，所以当:

```
1234567
一个文件导出：
exports = {name: '萤火虫老阿姨'};
另外一个文件：
let people = require('./test');
console.log(people);
打印结果：
{}
```

所以保险起见，还是用Module.exports吧

### 2、测试

```
1
module.exports = {name: '萤火虫老阿姨'};
```

```
123456789101112
var i = 0;
setInterval(() => {
    i++;
    if (i< 3) {
        const p = require('./test')
        console.log(p.name);
        p.name = 'ppp'
    } else {
        const p = require('./test')
        console.log(p.name);
    }
},1000)
```

打印结果：

```
123456789
萤火虫老阿姨
ppp
ppp
ppp
ppp
ppp
ppp
ppp
ppp
```

结论：
1、暴露出来的对象是浅拷贝关系，引用改动了value，原来的对象的value也会变。
2、上面的动态引用，第一次引用改变了value，后面引用也是发生变化后的引用值。
