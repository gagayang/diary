## 06、 提取公共代码（MPA生效）

webpack.optimize.CommonsChunkPlugin

这里有几个在CommonsChunkPlugin配置里面的概念提前说一下：  
name: 打包的文件名称  
minChunk: 支持整数和Infinity两种写法，整数一般写2，表示文件重复两次就进行公共提取，Infinity，最大程度保持原文件内容打包  
chunks: 需要打包文件的范围，比如： chunks: \[‘c’,‘b’\]表示从entry里面的c和b文件名的文件进行重复代码提取。

当我们的应用是单一页面应用的时候，并不会使用这个策略，比如如下的配置：  
文件夹目录：  
src  
a.js  
b.js  
base.js  
subA.js  
subB.js  
文件关系：  
a引用了subA.js和subB.js，subA和subB引用了base.js,  
b引用了subA.js和subB.js，subA和subB引用了base.js：  
这个时候webpack.config.js配置如下：(这里的配置和b.js没关系)

```
123456789101112131415161718const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    'a': './src/a.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    })
  ]
}

```

这个时候会打包出两个文件：

```
123             Asset     Size  Chunks             Chunk Names
     a.460f53db.js  1.14 kB       0  [emitted]  a
common.460f53db.js   5.8 kB       1  [emitted]  common

```

查看文件我们可以看到：【重点】  
a文件引用的subA和subB文件的内容，以及subA和subB对于base文件内容的引用都打包在了a.460f53db.js文件中，而common.460f53db.js文件中只有webpack自己的代码。

结论：webpack.optimize.CommonsChunkPlugin 并不会对单一页面应用的打包生效（对业务代码进行提取）

如果我们把目录下b.js配置到webpack.config.js的入口，配置如下，再进行打包：

```
12345678910111213141516171819const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    'a': './src/a.js',
    'b': './src/b.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    })
  ]
}

```

这个时候我们查看打包的结果：

```
12345678910111213Eat-you-you-you:web01 longwang$ webpack
Hash: 675e36d954b04da966ff
Version: webpack 3.10.0
Time: 91ms
             Asset       Size  Chunks             Chunk Names
     b.675e36d9.js  409 bytes       0  [emitted]  b
     a.675e36d9.js  409 bytes       1  [emitted]  a
common.675e36d9.js    6.56 kB       2  [emitted]  common
   [0] ./src/subA.js 38 bytes {2} [built]
   [1] ./src/base.js 24 bytes {2} [built]
   [2] ./src/subB.js 38 bytes {2} [built]
   [3] ./src/a.js 59 bytes {1} [built]
   [4] ./src/b.js 59 bytes {0} [built]

```

可以看出a开头和b开头的js文件十分的小，而common开头的文件特别的大，打开查看内容，可以看到subA和subB的内容，以及base的内容都打包进了common开头的文件，common开头的文件包含了webpack本省的代码，以及公共 的业务代码。

### 将lodash单独打包：

这里进行测试：  
准备工作：安装lodash，然后在subA和subB中进行引用：  
备注：以下内容关于CommonsChunkPlugin的个数，以及配置，可以随意进行尝试。

```
12345678910111213141516171819202122232425const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    'a': './src/a.js',
    'b': './src/b.js',
    'vendor': 'lodash'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      chunk: ['a', 'b']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ]
}

```

这个时候会打包生成4个文件  
a.xx.js  
b.xx.js  
vendor.xx.js  
common.xx.js  
这里的common会将a和b中公共代码进行提取  
vendor会存放lodash的代码  
注意打包的大小

如果我们想将第三方依赖和webpack的代码打包到一起，并且重复的业务代码也打包到一起，我们可以配置如下：

```
1234567891011121314151617181920const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    'a': './src/a.js',
    'b': './src/b.js',
    'vendor': 'lodash'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks:2
    })
  ]
}

```

最细分的打包：

```
12345678910111213141516171819202122232425const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    'a': './src/a.js',
    'b': './src/b.js',
    'vendor': 'lodash'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks:2,
      chunks: ['a', 'b']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks:Infinity
    })
  ]
}

```

打包结果：

```
12345678910111213141516171819Eat-you-you-you:web01 longwang$ webpack
Hash: cbefe81102111aa11856
Version: webpack 3.10.0
Time: 429ms
               Asset       Size  Chunks                    Chunk Names
  common.cbefe811.js    1.33 kB       0  [emitted]         common
  vendor.cbefe811.js     542 kB       1  [emitted]  [big]  vendor
       b.cbefe811.js  409 bytes       2  [emitted]         b
       a.cbefe811.js  409 bytes       3  [emitted]         a
manifest.cbefe811.js    5.84 kB       4  [emitted]         manifest
   [1] ./src/subA.js 89 bytes {0} [built]
   [2] ./src/base.js 24 bytes {0} [built]
   [3] ./src/subB.js 92 bytes {0} [built]
   [4] ./src/a.js 59 bytes {3} [built]
   [5] (webpack)/buildin/global.js 509 bytes {1} [built]
   [6] (webpack)/buildin/module.js 517 bytes {1} [built]
   [7] ./src/b.js 59 bytes {2} [built]
    + 1 hidden module


```

common.cbefe811.js: 公共代码抽取（从b.cbefe811.js和 a.cbefe811.js中进行抽取）  
vendor.cbefe811.js： lodash的代码  
b.cbefe811.js： b入口  
a.cbefe811.js： a入口  
manifest.cbefe811.js： webpack的配置文件js