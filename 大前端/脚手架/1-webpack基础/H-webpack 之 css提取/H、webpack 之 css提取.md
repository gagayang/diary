## H、webpack 之 css提取

  

安装依赖：

```
npm i extract-text-webpack-plugin webpack -S
```

上一节中通过style-loader和css-loader可以把css提取出来通过style标签插入页面

```
const ExtractTextPlugins = require('extract-text-webpack-plugin')...{
     test: /\.less$/,
     use: ExtractTextPlugins.extract({
       fallback: 'style-loader', // 如果没有被提取出来，我们还是用style-loader的方式插入页面
       use: ['css-loader', 'less-loader']
     })
}...new ExtractTextPlugins({   filename: '[name].min.css',   allChunks: false // 默认false   // 默认是只提取同步css，异步加载的css就不提取，异步的css如果是import的，就会被打包到异步的js中去   // 在代码分割的时候，是不分js还是css，都是当成文件处理，如果使用了CommonsChunkPlugin,css也会向js那样被处理 })
```

提取出来的css需要手动写到index.html中去（这里还没使用html模版）

```
<!DOCTYPE html><html lang="en"><head>  <meta charset="UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <title>Document</title>  <link rel="stylesheet" href="./dist/a.min.css"></head><body>  haha  <button id="btn">234523</button></body><script src="./dist/a.js"></script></html>
```