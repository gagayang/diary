## 04、babel的配置

### 主要步骤：

### 第一步：安装babel核心库：

```
npm i babel-loader@8.0.0-beta.0 @babel/core

```

在webpack.config.js中配置webpack：

```
module.exports = {
  entry: {
    app: './app.js'
  },
  output: {
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules'
      }
    ]
  }
}

```

### 第二步：这个时候其实babel还不知道用什么标准来进行打包，所以需要配置打包的规则，也就是babel Presets(babel的打包规则)：

es2015  
es2016  
es2017  
env  
babel-preset-react  
babel-preset-stage 0 - 3

安装preset：  
旧版babel安装：

```
npm i babel-preset-env -S

```

新版babel安装：

```
1
npm i @babel/preset-env -S

```

这样我们就可以根据里面一个字段-targets来进行配置，比如指定浏览器版本，比如：“last 2 versions”，"> 1%"等，这些数据是根据开源项目：browserslist给出的数据，can I use也是基于这个给的数据

```
module.exports = {
  entry: {
    app: './app.js'
  },
  output: {
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', {
                targets: {
                  browsers: ['> 1%', 'last 2 versions']
                }
              }]
            ]
          }
        },
        exclude: '/node_modules'
      }
    ]
  }
}

```

如上书写，我们在打包文件的底部可以找到被编译的文件:  
自己书写的内容：

```
let fun = () => {}
const NUm = 45
let arr = [1,2,3]
let arr4 = arr.map(item => item*2)
var a = new Set(arr4)

```

cmd执行：

```
1
webapck

```

被编译后（第一种配置）：

```
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fun = function fun() {};

var NUm = 45;
var arr = [1, 2, 3];
var arr4 = arr.map(function (item) {
  return item * 2;
});
var a = new Set(arr4);

/***/ })

```

如果我们改变一下webpack.config.js的配置：

```
12345678
presets: [
            [
              '@babel/preset-env', {
              targets: {
                chrome: '52'
              }
            }]
          ]

```

执行完后（第二种配置）：

```
123456789101112
/***/ (function(module, exports, __webpack_require__) {

"use strict";

let fun = () => {};

const NUm = 45;
let arr = [1, 2, 3];
let arr4 = arr.map(item => item * 2);
var a = new Set(arr4);

/***/ })

```

如上可以看出，两次配置不一样，最终编译的结果也是不同的。（谷歌已经很早就支持箭头函数了）

### 第三步：打包优化

但是只是上面的规则制定，我们发现像类似于  
new Set  
Array.prototype.includes  
Map  
Array.from  
generator(es7)  
这样的结构方法在低版本浏览器中还是不能够被直接使用的，这个时候就需要借助：  
babel polyfill  
babel runtime transform  
来抹平这种差异

- babel polyfill特点：  
    为开发应用而生，不是为了开发框架而生  
    全局垫片（全局抹平差异，可以理解成全局污染）

```
1
npm i babel-polyfill -S

```

使用方式：  
在项目中只需要：

```
1
import "babel-polyfill"

```

- babel runtime transform 特点：  
    为开发框架而生  
    局部垫片

```
12345
npm i babel-plugin-transform-runtime -D （）
npm i babel-runtime -S
新版本babel，安装如下：
npm i @babel/plugin-transform-runtime -D
npm i @babel/runtime -S

```

使用方式：  
在项目的更目录新建.babelrc文件进行配置

#### 使用babel-polyfill:

编辑app.js文件：

```
12345678910111213
import 'babel-polyfill'

let fun = () => {}
const NUm = 45
let arr = [1,2,3]
let arr4 = arr.map(item => item*2)
var a = new Set(arr4)
arr.includes(6)

// genertor
function* func() {
  console.log(45)
}

```

打包：  
这个时候会打包出一个体积很大的文件：

```
12345678910111213141516
Eat-you-you-you:webpack-practice longwang$ webpack
Hash: 086b001368ab5c1cae88
Version: webpack 3.10.0
Time: 2854ms
          Asset    Size  Chunks             Chunk Names
app.086b0013.js  2.7 kB (这个是之前的打包体积)      0  [emitted]  app
   [0] ./app.js 203 bytes {0} [built]
Eat-you-you-you:webpack-practice longwang$ webpack
Hash: 3bd57c0ce7d8316f7be1
Version: webpack 3.10.0
Time: 5327ms
          Asset    Size  Chunks                    Chunk Names
app.3bd57c0c.js  285 kB （这个是加了babel-polyfill后的体积）      0  [emitted]  [big]  app
  [93] (webpack)/buildin/global.js 507 bytes {0} [built]
 [130] ./app.js 231 bytes {0} [built]
    + 331 hidden modules

```

#### 使用@babel/runtime:

配置.babelrc文件：

```
1234567891011
{
  "presets": [
    [
      "@babel/preset-env", {
      "targets": {
        "browsers": ["> 1%", "last 2 versions"]
      }
    }]
  ],
  "plugins": ["@babel/transform-runtime"]
}

```

运行结果查看包体积：  
Eat-you-you-you:webpack-practice longwang$ webpack  
Hash: 345231e71147d9555167  
Version: webpack 3.10.0  
Time: 1171ms  
Asset Size Chunks Chunk Names  
app.345231e7.js 27.4 kB（使用@babel/runtime的效果，可以看出来体积还是相对babel-polyfill小很多） 0 \[emitted\] app  
\[0\] ./app.js 739 bytes {0} \[built\]  
\+ 3 hidden modules

综上：  
如果是开发应用，图简单，快，可以使用babel polyfill，如果是开发框架，对体积要求较高，建议使用@babel/runtime