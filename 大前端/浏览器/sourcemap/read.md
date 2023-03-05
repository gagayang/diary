sourcemap就是对行列上的字符，包括文件名进行位置标记，然后把标记后的内容进行base64  VLQ 转码，这里是原理，在实际应用中，

比如用webpack：

开发环境：我们会尽量让映射源码的关系变得清晰，比如：devtool:'eval-source-map'

生产环境：一般我们用来定位行号不显示源码，不然源码也就直接暴露，所以线上我们是关闭源码或者配置：nosources-source-map



sourcemap的思考：

根据这两篇文章引起的思考：

https://juejin.cn/post/7133395389482270756

https://one-more-tech.gitlab.io/SourceMap-%E5%88%B0%E5%BA%95%E8%A6%81%E4%B8%8D%E8%A6%81%E6%89%93%E5%8C%85%E5%88%B0%E7%BA%BF%E4%B8%8A%E4%BB%A3%E7%A0%81%E4%B8%AD%EF%BC%9F/index/

一般情况，我们用webpack打包dev是用的source-map模式，线上是无sourcemap的，并且默认有inline模式和非inline模式（inline模式会把sourcemap打包到压缩的js文件中），一般是建议不要用inline，并且处于安全考虑线上不要有sourcemap，但是没有sourcemap，线上出现问题，调试又不方便，如果有一些监控平台需要sourcemap，要是build 的时候没有生成sourcemap，又很麻烦，那么build 的时候到底要不要生成sourcemap呢

（没想通）
