## 15、 webpack打包结果分析

主要工具：

- Offical Analyse Tool
- webpack-bundle-analyzer

### 1、Offical Analyse Tool

mac: webpack --profile --json > stats.json  
windows: webpack --profile --json | Out-file’stats.json’ -Encoding OEM

将生成的内容json文件上传到官方地址，就会生成一个报告：  
[http://webpack.github.io/analyse](http://webpack.github.io/analyse)

「缺图」  
可以看到引用了多少个模块，chunks，webpack版本，是否有警告/错误

### 2、webpack-bundle-analyzer （社区版本，体验更好）

两种做法：

- 安装插件： BundleAnalyzerPlugin
- 使用命令行将将上面到json文件解析，和Offical Analyse Tool分析结果一样：webpack-bundle-analyzer stats.json

## 练习使用webpack-bundle-analyzer

```
1npm i webpack-bundle-analyzer -S

```

正常我们使用webpack打包，也能够看到一些简单的打包信息，接下来我们使用：webpack-bundle-analyzer，在webpack.config.js中引入，然后在plugins中添加：new BundleAnalyzerPlugin()  
这个时候再次使用webpack打包，浏览器会默认弹出一个分析页面：  
「缺图」  
从这里可以看到，块越大代表包体积越大。如果有没有抽离出来的重复代码也能够看出来，调整我们打包的策略。