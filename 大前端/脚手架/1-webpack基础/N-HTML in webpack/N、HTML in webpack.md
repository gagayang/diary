## N、HTML in webpack

  

1、添加模版

  

```
npm i html-webpack-plugin@3.2.0 -S
```

  

```
resolve: {    
  alias: { // 指名jquery寻找的路径，这个适合于手动引入的库，而不是node_modules      
    jquery$: path.resolve(__dirname, './libs/jquery.js')    
  }  
}
... 
plugins: 
[    
  new autoClean(),    
  new webpack.ProvidePlugin({      
    _: 'lodash', // 从node_modules中去寻找      
    $: 'jquery'    
  })  
]
```

npm使用说明：

[https://www.npmjs.com/package/html-webpack-plugin/v/3.2.0](https://www.npmjs.com/package/html-webpack-plugin/v/3.2.0)  

  

  

2、html-loader

用途：

1、是将index.html中引用的图片资源打包到dist目录

比如在html中这么引用了img：

```
<img src="./img/te.png" data-src="./img/te.png" alt="">
```

配置如下：

```
{
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src']
            }
          }
        ]
      }
```

2、压缩html（html-webpack-plugin已经有这个功能，所以主要是是功能1）

3、在index.html中如果引用了图片，可以直接通过require的方式来书写，就会被直接打包，不需要使用插件

eg： 

```
<img src="${require('./img/te.png')}" alt="">
```