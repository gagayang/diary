## 09、tree shaking

- JS Tree Shaking
- CSS Tree shaking (不能和css module混用，可以通过purifycss设置白名单来解决)

## JS Tree Shaking

适应场景：  
常规优化  
引入第三方库的某一个功能

### 1、常规优化

当我们在utils.js中定义了abc三个函数，然后在项目中只引入了a函数使用，这个时候用webpack打包，效果如下：

```
123456789101112131415161718192021/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = a;
/* unused harmony export b */
/* unused harmony export c */
function a() {
  console.log('a')
}

function b() {
  console.log('b')
}

function c() {
  console.log('c')
}

/***/ })
/******/ ]);
总结：webpack会提示bc没有使用，但是不会删除

```

这里时候我们在webpack中引用webpack.optimize.UglifyJsPlugin这个插件就能完成js压缩和tree shaking

```
1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpaclPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: {
    'a': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /.less/,
        use: ExtractTextWebpaclPlugin.extract({
          fallback:{
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextWebpaclPlugin({
      filename: '[name].min.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}

```

```
123456789101112131415使用前打包：

Time: 2568ms
      Asset       Size  Chunks             Chunk Names
b.bundle.js  525 bytes       0  [emitted]  b
a.bundle.js    7.52 kB       1  [emitted]  a
  a.min.css  313 bytes       1  [emitted]  a
  
使用后打包：

Time: 2315ms
      Asset       Size  Chunks             Chunk Names
b.bundle.js  137 bytes       0  [emitted]  b
a.bundle.js    1.65 kB       1  [emitted]  a
  a.min.css  313 bytes       1  [emitted]  a

```

结果： a.bundle.js被压缩，并且b和c函数会被溢出。

### 2、引入第三方库的某一个功能

安装lodash：  
通过下面两种方式任意一种引入：

```
12// import * as _ from 'lodash'
import {chunk} from 'lodash'

```

最后打包的结果都一样：

```
123456Time: 1296ms
      Asset       Size  Chunks                    Chunk Names
b.bundle.js  525 bytes       0  [emitted]         b
a.bundle.js     550 kB       1  [emitted]  [big]  a
  a.min.css  313 bytes       1  [emitted]         a
看出来a.bundle.js的包很大：550kb

```

如果开启了new webpack.optimize.UglifyJsPlugin()：  
结果：

```
123456Time: 3743ms
      Asset       Size  Chunks             Chunk Names
b.bundle.js  137 bytes       0  [emitted]  b
a.bundle.js    74.2 kB       1  [emitted]  a
  a.min.css  313 bytes       1  [emitted]  a
a.bundle.js的包变成：74.2 kb(原来550kb)

```

这里可以看出，我们只是引用了lodash的一个方法，但是有74.2kb大小，其实还是很奇怪，这个时候需要考虑的问题是，这个lodash的版本是否支持tree shaking，如果还使用当前版本，可以:

```
1npm i lodash-es -S

```

然后使用的时候通过：

```
12// import * as _ from 'lodash-es'
import {chunk} from 'lodash-es'

```

来看看打包效果，这个时候打包体积还变大了  
然后用babel的方式来tree shaking

```
1npm i babel-plugin-lodash@3.3.2 babel-core@6.26.0 babel-preset-env@1.6.1 babel-loader@7.1.2 -S

```

在webpack.config.js中配置如下：

```
1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpaclPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: {
    'a': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /.less/,
        use: ExtractTextWebpaclPlugin.extract({
          fallback:{
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['lodash']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextWebpaclPlugin({
      filename: '[name].min.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}

```

打包结果：

```
1234Time: 3131ms
      Asset       Size  Chunks             Chunk Names
a.bundle.js    6.21 kB       0  [emitted]  a
  a.min.css  261 bytes       0  [emitted]  a

```

但是这个版本配合的babel会导致动态import报错：这个需要进一步查证原因。

```
123456789101112131415Time: 2350ms
      Asset     Size  Chunks             Chunk Names
a.bundle.js  1.03 kB       0  [emitted]  a
   [0] ./src/app.js 786 bytes {0} [built] [failed] [1 error]

ERROR in ./src/app.js
Module build failed: SyntaxError: Unexpected token, expected { (6:6)

  4 | import * as _ from 'lodash'
  5 | // import {chunk} from 'lodash'
> 6 | import(/* webpackChunkName: 'b' */'./components/b.js').then(function () {
    |       ^
  7 |   console.log('done');
  8 | })
  9 |

```

## CSS Tree shaking

Purify CSS  
对应的webpack插件是： purifycss-webpack

```
1npm i  glob-all purifycss-webpack purfiy-css -S

```

我们在base.less中书写了样式：

```
123456789101112.app{
  background-color: #fff;
}

.bigApp{
  font-size: 20px;
}

.smallApp{
  font-size: 10px;
}


```

然后在html中书写了div节点：

```
12<div class="app" id="app"></div>
<div class="ap"></div>

```

在app.js中动过js来改动css：

```
1234import './css/base.less'

const app = document.getElementById('app')
app.innerHTML = '<div class="smallApp"></div>'

```

最终打包结果：

```
123456789a.min.css文件：

.app {
  background-color: #fff;
}

.smallApp {
  font-size: 10px;
}

```

其中purify-css报了一个警告，这个警告一直在purify-css版本更迭过程中一直存在，可以暂时忽略：

```
1(node:5988) DeprecationWarning: Chunk.modules is deprecated. Use Chunk.getNumberOfModules/mapModules/forEachModule/containsModule instead.
```