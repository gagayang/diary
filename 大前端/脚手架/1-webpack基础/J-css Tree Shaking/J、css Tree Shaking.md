## J、css Tree Shaking

npm仓库名称：purifycss-webpack-fixed，安装对应的包：

```
npm i -D purifycss-webpack purify-css -D
```

实验条件：

app/page1/1.js

app/page1/1.css  

app/index.js  

index.html

  

index.html中有一个id为app的div节点，在app/page1/1.js中创建一个类名是content的节点div，append到app中，在app/page1/1.css中书写了#app{}， .content{} .hahah{}三个样式，然后在webpack.config.js中书写：

 ```
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
plugins: [
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, './index.html')),
    })
  ],
```

这个时候只会打包app的样式到生成的css文件中去，而不会打包app/page1/1.j模块中的样式，所以需要改动如下：

```
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, './index.html')),
      paths: glob.sync(path.join(__dirname, './a/*.js')),
    })
```

  
这个打包出来的css就包含#app{} 和 .content{} ，并且去掉 .haha{}  

  

## 以上配置成功的必要条件：

1、purifycss-webpack purify-css 缺一不可

2、打包的new PurifyCSSPlugin配置的path，必须包含写了css的路径，不然不会处理

（ps：这里可以实验一下.vue文件的处理）

3、要能够tree shaking，必须依靠ExtractTextPlugins插件生成独立的css才行，打包后如果样式还在js中，purifycss不会生效。