sourcemap就是对行列上的字符，包括文件名进行位置标记，然后把标记后的内容进行base64  VLQ 转码，这里是原理，在实际应用中，

比如用webpack：

开发环境：我们会尽量让映射源码的关系变得清晰，比如：devtool:'eval-source-map'

生产环境：一般我们用来定位行号不显示源码，不然源码也就直接暴露，所以线上我们是关闭源码或者配置：nosources-source-map
