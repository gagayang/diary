## 08、css模块化 + PostCss

## （1） style-loader: 创建style标签

- style-loader/url: 0.19.1版本以前可以使用，配合file-loader一起使用，可以将import的css单独抽离成link标签插入到html中。（不建议这么做，网络请求过多）
    
- style-loader/useable 可以让css通过js来控制import的这个css是否生效。（这个方法也比较鸡肋）
    
- style-loader配置项：【重点】：(以下配置合适于0.19.1及低版本,1.0.0以上版本都会报错)  
    inserAt：插入位置  
    inserInto： 插入到DOM  
    singleton： 是否只使用一个style标签（IE浏览器对于style标签个数有限制）  
    trandform： 转化，浏览器环境下，插入页面前
    

使用：

```
1npm i style-loader css-loader -S

```

项目目录：  
src  
css  
base.css  
commons.css  
app.js  
index.html  
src下面包含css和app.js，css包含base.css和common.css，index.html引用打包好的a.bundle.js：

```
1234567891011121314151617181920212223242526webpack.config.js最简单的配置：
const path = require('path')
module.exports = {
  entry: {
    'a': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}

```

这个时候在浏览器中生成的css会以style的形式存放到html页面中：  

### styl-loader/url + file-loader 的使用

#### 注意点：

- 这个做法只适合于style-loader 0.19.1以及低版本，style-loader 升级到1.0.0以后不在支持这种styl-lodaer/url的配置。

如果我们想将import的css通过link标签存放到html中（这种操作比较小众，也不太常用，因为越多的link标签，会导致过多的网络请求），我们需要借助styl-loader/url 和file-loader来完成。

```
1npm i file-loader -S

```

```
123456789101112131415161718192021222324252627webpack.config.js配置：
const path = require('path')
module.exports = {
  entry: {
    'a': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          {
            loader: 'style-loader/url'
          },
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  }
}

```

我们在app.js中import ‘./css/base.css’ 和 import ‘./css/common.css’，两次引入，就会在html中添加两个link标签，如下：  

### styl-loader/useable + css-loader 的使用

#### 注意点：

- 这个做法只适合于style-loader 0.19.1以及低版本，style-loader 升级到1.0.0以后不在支持这种styl-lodaer/url的配置。

```
1234567891011121314151617181920212223242526const path = require('path')
module.exports = {
  entry: {
    'a': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          {
            loader: 'style-loader/useable'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}

```

在app.js中我们写了这样一个demo来控制其base这个css是否生效：

```
123456789101112import base from './css/base.css'
import common from './css/common.css'

let flag = false
setInterval(function () {
  if (flag) {
    base.use()
  } else {
    base.unuse()
  }
  flag = !flag
}, 1000)

```

### style-loader配置项

```
12345678910111213141516171819202122232425262728293031const path = require('path')
module.exports = {
  entry: {
    'a': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // insertInto: '#aa',  //测试无效
              singleton: true, // 将多个style标签组合成一个插入html
              transform: './css.transform.js' // 将css进行二次加工
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}

```

在webpack.config.js同级目录下新建文件css.tranform.js:  
这个commonjs规则的函数是运行在浏览器下面，并且是加载css的时候才会调用

```
1234567module.exports = function(css) {
  if (window.innerWidth > 750) {
    return css.replace('#ccc', 'red')
  } else {
    return css.replace('#ccc', 'green')
  }
}

```

## （2） css-loader: 让js能够import css

- 注意： 以下配置适合于0.28.11左右的版本，目前大版本已经更新到3.2.0，使用如下配置报错  
    配置参数：  
    1、alias  
    2、importLoder（@import）  
    3、Minimize（是否压缩）  
    4、modules（是否开启css-modules）(因为less/scss的原因，这种模式也是越来越少使用)

关于css-modules：  
：local 本地  
：golbal 全局  
composes 继承(默认要写在继承的最上面)  
composes……from path 从某一个文件引入一段样式

```
12345678910111213141516171819202122232425262728293031const path = require('path')
module.exports = {
  entry: {
    'a': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              // minimize: true,
              modules: true, //开启css-modules
              localIdentName: '[path][name]_[local]-[hash:base64:5]' // 自定义css名
            }
          }
        ]
      }
    ]
  }
}

```

业务代码中的编写：  
index.html

```
12345<body>
<div id="app"></div>
<script src="./dist/a.bundle.js"></script>
</body>
</html>

```

base.css

```
1234567body{
    background-color: #ccc;
}

.bigBox{
    border: 4px solid #000;
}

```

common.css

```
1234567891011h2{
    font-size: 40px;
    color: green;
}

.smallBox{
    composes: bigBox from './base.css';
    width: 100px;
    height: 100px;
    border-radius: 10px;
}

```

app.js

```
123456import './css/base.css'
import common from './css/common.css'

const a = document.getElementById('app')
console.log(common.smallBox)
a.innerHTML = '<div class="'+ common.smallBox +'">123</div>'

```

最后编译出来在浏览器的html中的呈现：

```
1234567891011121314151617181920212223242526272829<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
<style>body{
    background-color: #ccc;
}

.src-css-base_bigBox-RpKKT{
    border: 4px solid #000;
}</style><style>h2{
    font-size: 40px;
    color: green;
}

.src-css-common_smallBox-3jfWE{
    width: 100px;
    height: 100px;
    border-radius: 10px;
}
</style>
</head>
<body>
<div id="app">
<div class="src-css-common_smallBox-3jfWE src-css-base_bigBox-RpKKT">123</div>
</div>
<script src="./dist/a.bundle.js"></script>
</body>

```

## （3）配置less/scss

```
1npm i less node-sass less-loader sass-loader -S

```

```
1234567891011121314151617181920212223242526272829303132const path = require('path')
module.exports = {
  entry: {
    'a': './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/'
  },
  module: {
    rules: [
      {
        test: /.less/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  }
}
注意点：
1、解析是自下而上进行的
2、这里配置了less-loader,然后再给css-loader配置的css-modules，发现报错，不兼容，也可能是版本的原因造成的。

```

## （4）提取css

css的提取，主要是两种：一种是初始化的时候代码，一种是异步加载的css  
两种方案：  
1、extract-loader  
2、ExtracttextWebpackPlugin (主流)

ExtracttextWebpackPlugin的配置：

```
1npm i extract-text-webpack-plugin webpack@3.10.0 -S

```

```
123456789101112131415161718192021222324252627282930313233343536373839const path = require('path')
const ExtractTextWebpaclPlugin = require('extract-text-webpack-plugin') 第一步：引入
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
        use: ExtractTextWebpaclPlugin.extract({ 第三步： 改写这里的配置，记住格式
          fallback:{
            loader: 'style-loader'
          },
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      }
    ]
  },
  plugins: [ 第二步： plugins中new一个ExtractTextWebpaclPlugin
    new ExtractTextWebpaclPlugin({
      filename: '[name].min.css',
      allChunks: false // 是否将异步的css一起打包（一起打包的好处就是做缓存）
    })
  ]
}

```

注意点：  
1、这里打包生成的css文件a.min.css并不会直接引入html，需要手动插入。  
2、如果想指定异步打包出来的文件，文件名是我们定义的，可以在webpack.config.js中配置：

```
123456output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist/',
    chunkFilename: '[name].bundle.js' // 异步模块打包名称
  },

```

3、如果需要将css文件进行压缩，压缩的配置还是在css-loader那里进行配置。  
当我们想把异步加载的css也打包在一起，这个时候需要将allChunks字段改成true：  
对应我们写一个组件：

```
12345678910111213141516b.js的内容:

import './b.less'

b.less的内容:

.b{
  background-color: #fff;
  font-size: 45px;
}

app.js中异步引入：

import(/* webpackChunkName: 'b' */'./components/b.js').then(function () {
  console.log('done');
})

```

如果将allChunks设置成true：b.less的内容会被打包到a.min.css中去，如果设置成false，会被保留在b.bundle.js中

## (5) PostCss in webpack

有关概念：  
1、PostCSS  
2、Autoprefixer  
3、css-nano（优化/压缩，css-loader的底层就是css-nano）  
4、css-next (让你能够使用下一代css eg：css变量 自定义选择器 calc（）)

PostCSS： a tool for transforming css with javascript  
这里的transform是在编译阶段，前面接触到的transform的那个函数是在css插入浏览器到时候执行。

```
12以下带上版本号是为了在webpack3环境里做演示
npm i postcss@6.0.14 postcss-loader@2.0.9 autoprefixer@7.2.3 cssnano@3.10.0 postcss-cssnext@3.0.2 -S

```

- Autoprefixer  
    比如我们要对某一个需要做兼容对属性添加前缀，添加前的打包结果a.min.css：
    
    ```
    1234.bigBox {
      border: 4px solid #000;
      transition: 1s ease;
    }
    
    ```
    
    添加postcss配置:注意添加位置
    
    ```
    123456789101112131415161718192021222324252627282930313233343536373839404142434445464748const path = require('path')
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
                      require('autoprefixer')()
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
        })
      ]
    }
    
    ```
    
- postcss-cssnext的使用  
    注意点： 使用了postcss-cssnext，就不用再使用autoprefixer，postcss-cssnext包含了autoprefixer
    

```
123456789 {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        require('postcss-cssnext')()
      ]
    }
  }

```

如果配置了postcss-cssnext，我们尝试在less文件中写一个变量：：root：

```
1234567891011121314151617@bg: red; // less的变量
body{
    background-color: @bg;
}

.bigBox{
    border: 4px solid #000;
    transition: 1s ease;
}

:root { // css的变量
  --mainColor: green;
}

.a{
  color: var(--mainColor)
}

```

编译出来：

```
1234567891011body {
  background-color: red;
}
.bigBox {
  border: 4px solid #000;
  -webkit-transition: 1s ease;
  transition: 1s ease;
}
.a {
  color: green;
}
```