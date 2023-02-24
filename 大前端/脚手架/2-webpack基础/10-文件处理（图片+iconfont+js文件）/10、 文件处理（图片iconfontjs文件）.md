## 10、 文件处理（图片+iconfont+js文件）

图片处理  
字体文件  
第三方js库

## 1、图片处理

### 图片处理场景

1、css中引入图片 （file-loader）cf  
2、合成雪碧图 (postcss-sprites) hp  
3、压缩图片 (img-loader) iy  
4、Base64编码 (url-loader) ub

### 1、file-loader使用：

当我们在项目css中引用了图片，如果不使用这个插件，就会打包编译的时候报错，简易的配置如下，在moudle.rules下面配置：

```
12345678{
  test: /\.(png|jpg|jpeg|gif)$/,
  use: [
    {
      loader: 'file-loader'
    }
  ]
}

```

这个时候打包到浏览器上显示出来：  
  
这个路径是相对css文件的，所以找不到图片，这个时候更改一下配置：

```
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384const path = require('path')
const webpack = require('webpack')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
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
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/', //  输出文件夹目录
              publicPath: 'images/', // 和最外层的output配置一样
              useRelativePath: true // 开启相对路径
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
    // purifyCSS要放到ExtractTextWebpaclPlugin之后
    new PurifyCSS({
      paths: glob.sync([
        path.join(__dirname, './*.html'),
        path.join(__dirname, './src/*.js')
      ])
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}

```

### 2、url-loader使用：

当我们把上面的配置改成：

```
1234567891011121314// {
//   loader: 'file-loader',
//   options: {
//     outputPath: 'images/',
//     publicPath: 'images/',
//     useRelativePath: true
//   }
// }
{
  loader: 'url-loader',
  options: {
    limit: 2000
  }
}

```

这个时候我们在项目中使用的图片是1kb< 2000，这个时候这些图片就会被转换成base64位编码，放入css中（打包结果就是小于2000b的图片不会以图片形式输出单独文件，会被打包到css中，css体积变大）  
刷新：正常显示。  
当我们把limit调整成1200，部分图片被转化成base64，部分还是以图片形式输出：  
  
刷新页面，这个时候还是正常展示

#### 注意点 ：

- 刷新的时候，图片会闪动，base64编码不会闪动。
- outputPath和publicpath关系：在最外层的output里面有一个publicPath，决定了文件打包的目标目录dist，然后这里的outputPath决定了图片打包后放在dist目录下层的images目录中，外面的publicPath加上loader里面的publicPath，合起来就是静态资源访问路径 dist/images/xx.png

### 2、img-loader使用：

这里要压缩img图片，需要配合imagemin-pngquant这个插件

```
1npm i imagemin-pngquant -S

```

然后配置如下：

```
12345678910111213141516171819202122232425262728293031{
  test: /\.(png|jpg|jpeg|gif)$/,
  use: [
    // {
    //   loader: 'file-loader',
    //   options: {
    //     outputPath: 'images/',
    //     publicPath: 'images/'
    //   }
    // }
    {
      loader: 'url-loader',
      options: {
        name: '[name]-[hash:5].min.[ext]', //ext 代表原文件是png就是png，是jpg就是jpg……
        limit: 1000,
        outputPath: 'images/',
        publicPath: 'images/'
      }
    },
    {
      loader: "img-loader",
      options: {
        plugins: [
          require("imagemin-pngquant")({
            quality: [0.7,0.8] // the quality of zip
          })
        ]
      }
    }
  ]
}

```

这里有一个注意点：如果图片的大小是1200kb，设置的url-loader的limit是1100，本来这个图片不会被base64编码，但是被压缩0.7-0.8倍后，图片大小变成840-960，这个时候就会base64编码，如果不想编码，就需要把这个1100的限制也乘以0.7最保险。

#### 接下来我们适配retina屏幕：

在postcss-loader这里配置如下：

```
12345678910111213 {
   loader: 'postcss-loader',
   options: {
     ident: 'postcss',
     plugins: [
       require('postcss-sprites')({
         spritePath: 'dist/assets',
         retina: true
       }),
       require('postcss-cssnext')()
     ]
   }
 }

```

这里时候图片的格式【必须是】[xxx@2x.png](mailto:xxx@2x.png)这个格式引入，对应的容器，如果之前写的是width：100px，high：100px,这个时候就要改动成50px,50px了。

## 2、 iconfont的引入

这里：[Iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/) 下载需要的字体图标（加入购物车再下载）

- 步骤1:将下载的demo中的css文件的内容拷贝到自己的工程中（默认font-family是：iconfont）
- 步骤2:在html中引用如下：

```
1  <span class="iconfont icon-xxx"></span

```

### 科普iconfont主流引入方式：

关于字体图标的引入，目前主流有三种方案：  
unicode / font css / Symbol

#### (1)unicode：

Unicode 是字体在网页端最原始的应用方式，特点是：

- 兼容性最好，支持 IE6+，及所有现代浏览器。
- 支持按字体的方式去动态调整图标大小，颜色等等。
- 但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色。

第一步：拷贝项目下面生成的 @font-face

```
123456789@font-face {
  font-family: 'iconfont';
  src: url('iconfont.eot');
  src: url('iconfont.eot?#iefix') format('embedded-opentype'),
      url('iconfont.woff2') format('woff2'),
      url('iconfont.woff') format('woff'),
      url('iconfont.ttf') format('truetype'),
      url('iconfont.svg#iconfont') format('svg');
}

```

第二步：定义使用 iconfont 的样式

```
1234567.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

```

第三步：挑选相应图标并获取字体编码，应用于页面

```
1<span class="iconfont">&#x33;</span>

```

#### (2)font-css:

font-class 是 Unicode 使用方式的一种变种，主要是解决 Unicode 书写不直观，语意不明确的问题。

与 Unicode 使用方式相比，具有如下特点：

- 兼容性良好，支持 IE8+，及所有现代浏览器。
- 相比于 Unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。
- 因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 Unicode 引用。
- 不过因为本质上还是使用的字体，所以多色图标还是不支持的。

第一步：引入项目下面生成的 fontclass 代码：

```
1<link rel="stylesheet" href="./iconfont.css">

```

第二步：挑选相应图标并获取类名，应用于页面：

```
1<span class="iconfont icon-xxx"></span>

```

#### (3)Symbol 引用

这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇文章 这种用法其实是做了一个 SVG 的集合，与另外两种相比具有如下特点：

- 支持多色图标了，不再受单色限制。
- 通过一些技巧，支持像字体那样，通过 font-size, color 来调整样式。
- 兼容性较差，支持 IE9+，及现代浏览器。
- 浏览器渲染 SVG 的性能一般，还不如 png。

第一步：引入项目下面生成的 symbol 代码：

```
1<script src="./iconfont.js"></script>

```

第二步：加入通用 CSS 代码（引入一次就行）：

```
123456789<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

```

第三步：挑选相应图标并获取类名，应用于页面：

```
123<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-xxx"></use>
</svg>

```

## 3、第三方js引入

让文件一次引入多模块使用的方法：

- webpack.providePlugin
- imports-loader
- 挂在到window上

### 使用webpack.providePlugin

比如我们全局要使用lodash，可以将lodash的CDN地址手动写入index.html，也可以npm i lodash，然后plugins中配置：

```
123new webpack.ProvidePlugin({
  _: 'lodash'
}),

```

如果这个js不是npm安装，也不是CDN引入，是自己写的一个utils，比如就是我们自己写的query，在src/common/jq.js里面，这个时候需要配置如下：

```
12345resolve: {
  alias: {
    jquery$: path.resolve(__dirname, 'src/common/jq.js')
  }
},

```

```
123new webpack.ProvidePlugin({
  $: 'jquery'
}),

```

### 使用imports-loader

```
1npm i imports-loader -S

```

在module.rules中书写：

```
1234567891011{
  test: path.resolve(__dirname, 'src/app.js'),
  use:[
    {
      loader: 'imports-loader',
      options: {
        $: 'jquery'
      }
    }
  ]
}

```

他的作用和

```
123new webpack.ProvidePlugin({
  $: 'jquery'
}),

```

一样,不管是npm安装还是通过resolve添加的别名都能够被识别。