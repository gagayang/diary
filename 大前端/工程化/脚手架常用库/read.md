## 用户主目录是如何通过user-home包确定的？

// user-home 实现原理： user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME

// return process.env.HOME ？ process.env.HOME || (user ? '/Users/' + user : null)



##  require规范可以加载什么类型的文件？

// .js .json .node

// .js 要求格式是 exports / module.exports 导出，比如一个txt的内容也是按照这个规范写，也能正常执行，默认除开这三个类型的后缀文件，都用js的类别来解析

// .json 会通过JSON.parse对文件进行解析，并输出一个对象

// .node -> 通过process.dlopen 调用C++ AddOns 来解析 （场景少）



## dotenv

Node.js中的dotenv库的使用，由于项目不同需求，需要配置不同环境变量，按需加载不同的环境变量文件，使用dotenv，可以完美解决这一问题。

使用dotenv，只需要将程序的环境变量配置写在.env文件中。

# .env file

```
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

然后，在Node.js程序启动时运行：

```
require('dotenv').config() // 默认读取项目根目录下的.env文件
```

接着，我们就可以在接下来的程序中方便地使用环境变量了：

```
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
```

# conifg API

```
conifg({path:'', Encoding:''})  // 可传入路径和编码方式
```




-
