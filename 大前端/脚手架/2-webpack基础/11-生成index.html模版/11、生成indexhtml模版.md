## 11、生成index.html模版

好处：  
1、自动将chunk（js + css）载入html，不用手动书写。  
2、之前打包的webpack自己的框架代码，被打包成manifest，其实只需要载入一次，如果把这个js直接放在html中，可以减少http 请求。  
3、在index.html中写的图片资源也被打包到dist

html-webpack-plugin  
option:

- template: 模版
- filename：文件名
- minify： 是否压缩html
- chunks： 指定需要引入的chunk
- inject： 是否将chunk注入index.html，因为有时候打包的文件名是固定的，可以手动写入inex.html，这个时候就不需要在inject

在plugins中配置如下：

```
12345678 new HtmlWebpackPlugin({
  filename: 'index.html', //默认就是index.html，可以不配置
  template: './index.html',
  inject: false,
  minify: {
    collapseWhitespace: true
  }
}),

```

为了把webpack的代码插入index.html中不在单独请求，需要如下插件：

- 方案一：inline-manifest-webpack-plugin （和html-loader配置有点问题）
- 方案二：html-webpack-inline-chunk-plugin (把各种chunk插入html)

这里使用第二种方案：

```
1npm i html-webpack-inline-chunk-plugin babel-core babel-loader babel-preset-env -S

```

在module.rules中需要配置：

```
1234567891011{
  test: /\.js$/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }
  ]
}

```

引入html-webpack-inline-chunk-plugin，配置 plugins：

```
123new HtmlInlineChunkPlugin({
  inlineChunks: ['manifest']
}),

```

这样这段webpack有关的代码就会被打包进入html中去。这里有一个注意点：当我们在使用HtmlWebpackPlugin的时候，最好不要指定： chunk: \[‘app’, …\]这样容易漏掉manifest，所以建议chunk这个字段不配置。