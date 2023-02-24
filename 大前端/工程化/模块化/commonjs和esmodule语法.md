## commonjs和esmodule语法

## CommonJS 规范

> 每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

CommonJS 模块化的写法，需要 node 等环境支持。
在浏览器中无法直接解析和运行，需要先编译。

### CommonJS 导出

* 写法 1

```
module.exports = {
    // 在此对象中定义导出的变量或函数
    flag: true,
    name: "xxx",
    add(num1, num2){
        return num1 + num2;
    },
}
```

* 写法 2

```
// 在这里定义变量，函数。

module.exports = {
    导出名称1: 导出的成员1，
    导出名称2: 导出的成员2，
}
```

* 写法 3（简写）

```
// 在这里定义变量，函数。

module.exports = {
    导出的成员1，
    导出的成员2，
}
```

### CommonJS 导入

* 写法 1 (对象解构赋值)

```
let {flag, name, add} = require('./xxx.js');

```

* 写法 2 (导入对象)

```
const xxx = require('./xxx.js')

// 使用：
xxx.导出的成员1;
xxx.导出的成员2;
```

## ES6 的模块化实现

在浏览器中使用 ES6 模块化，需要声明 js 的 type 为 `module`,

```
<script src = './xxx.js' type='module'></script>
```

ES6 模块导出* 写法 1（先定义，再导出）

```
// 在这里定义变量，函数。
flag: true,
name: "xxx",
add(num1, num2){
    return num1 + num2;
},

// 导出
export {
    flag, name, add
}
```

* 写法 2（直接导出）

```
// 导出变量
export let myFlag = true;

// 导出函数
export function sum(a, b){
    return a + b;
}

// 导出类
export class Person{
    name: 'jgrass',
    run(){
        console.log(`${this.name} run`)
    }
}

```

* 写法 3（export default）

export default 只能有一个，使用方导入时可以自定义命名。
所以，一般使用 export default 导出一个对象，而不是单个的变量或者函数。

```
// 导出 aaa.js

let address = "广州市";
export default address

// 导入 bbb.js
import addr/*自定义命名*/ from './aaa.js'
```

```
// 导出 aaa.js

// 不命名，外部使用者命名
export default function(args){

}

// 导入 bbb.js
import myFunction/*自定义命名*/ from './aaa.js'

let args = {};
myFunction(args);
```

```
// 导出 aaa.js

// 导出对象，不命名，外部使用者命名
export default {
    name: "jgrass.cc"
}

// 导入 bbb.js
import obj/*自定义命名*/ from './aaa.js'
let n = obj.name;
```

### ES6 模块导入

* 方式 1（使用命名导入）

```
import {flag, add, Person} from "./xxx.js"

let p = new Persion();
p.run();
```

* 方式 2（统一全部导入，使用自定义命名对象导入）

```
import * as xModule/*自定义命名*/ from "./xxx.js"

let f = xModule.flag;

```

* 方式 3（导入 default 导出的）

```
import myModule/*自定义命名，没有大括号*/ from "./xxx.js"
```
