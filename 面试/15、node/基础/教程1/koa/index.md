# 图片上传需求

1、上传图片和生成图片链接

2、附加功能：限制图片大小和类型，生成高中低三挡的图片链接，生成CDN

上传方案：

1、推荐阿里云OSS等云服务，推荐在生产环境下使用

2、直接上传到自己服务器，不推荐在生产环境下使用，一是因为不稳定，二是对于分布式部署不是太友好

koa-bodyparser: 只支持json和form

koa-body： 支持文件

koa-static:  生成静态目录（链接）

# api

![](./468db350-0d42-4e5f-94c8-eb7a5505fe56.jpg)

接口是有版本的概念的，以上是常见的服务端接口版本携带策略

路由分模块注册：

第一步：编写子路由：

![](./e001ccc5-f077-4a30-9f6e-30833aa0f6f3.jpg)

第二步：导入子路由注册：

![](./5d7541f0-44a7-4e0b-99fc-75e3d6ef5549.jpg)

tips：我们发现这里的路由都是手动引入，再手动注册，其实有点麻烦，我们其实可以自己读取目录循环进行注册，其实也有第三方包来做这个事情：require-directory

![](./1f1c7f34-3f7a-4007-9138-af9ea0bb2332.jpg)

这里判断obj是否instanceOf Router是因为我们默认子路由模块都只导出了router（约定路由模块只导出路由对象），但是哪天有一个模块导出变成了moduled.exports = { router, xxx }，这个时候如果不做instanceOf Router的判断，就会报错

以上代码的书写方式不太好看，app.js里面内容过多，我们通过类的思想将上面的代码进行重新组织：

第一步，新建一个core文件夹用来放置初始化的类：

![](./9fb9d32d-48e3-4bb5-9fdc-9e25e76b7c0d.jpg)

第二步：

引入该函数，传入app

![](./0098981e-d894-4c69-8c37-cd40678fd78d.jpg)

需要改造的地方：文件的引入最好用绝对路径，放置文件路径不对导致的报错：文件的当前绝对路径可以通过：process.cwd()来获取，替换上面的’../app/api’：

![](./3d44ab43-8729-4f14-aec7-d19ae72b6ce1.jpg)

nodemon的使用：

![](./d93bbb5e-4b79-42d7-9904-ccf9aaf739b7.jpg)

参数获取：

![](./bc2e61c6-b54a-4be1-9563-5e8c1804b7be.jpg)

异常处理：

正常一个函数的异常我们是可以通过try catch来捕获的，但是异步的异常是捕获不到的：

![](./926c5caa-423b-4956-bf39-4afb36853297.jpg)

当js出现了promise async/await后这个问题就好解决很多了：

如下写法是不对的，不应该对settimeout进行返回

![](./9e14278b-8cf7-49ae-b2cb-eab00045b6cf.jpg)

应该是对setTimeout进行promise包装，通过reject来返回异常即可：

```
async function a() {
  try{
    await b()
  } catch(err) {
    console.log(err, 11)
  }
}
async function b () {
   return new Promise((resolve, reject) => {
     setTimeout(() => {
      reject('1111')
     }, 1000)
   })
}
a()
```

当我们没写await的时候，其实try catch就不能正常捕获异常了，如果在node环境一旦出现了promise的异常没有被捕获处理就会有警告:

![](./49fa0ed3-41cf-4c6f-9186-d925ca7b1617.jpg)



那我们要是对所有可能出现异常的地方都写try catch，显然不可能，所以需要有一个全局的错误拦截，这就需要借助洋葱模型，通过try next上的错误来进行拦截：

![](./48223321-8ae3-4927-8896-701c1d3804a1.jpg)

新建一个自定义中间件的文件夹，然后导出这个函数，在app.js上进行app.use(catchError)注册

如下：当我们对一个请求，出现请求参数错误的时候，我们将错误throw出来，然后让catchError进行捕获：

![](./62bbb6d3-a289-4c67-8031-82aed4ab629b.jpg)

在我们catchError方法里面，通过error.error\_code来判断这个错误类型是否是已知类型还是未知类型：

![](./f56a29fa-1e00-46e5-8d8c-731d493c7d21.jpg)

上面对于error进行一些error\_code,request\_url等进行挂载的时候，写法并不太优雅，我们可以将error进行类的方式二次封装：

![](./38248a4d-1707-4bc9-b0b6-54cfcf6530a6.jpg)

调用地方改写：

![](./6195dfe0-3b9d-4748-b0cc-48a4b94e0e92.jpg)

![](./32b7a18e-02f5-4ef9-a0b2-1ac6c19f1bea.jpg)

上面编写的错误类型的类其实也太宽泛了，我们可以定义具体的基类来实现调用的简单化:

![](./809d7772-8c01-4af2-aadf-e60fad457ea3.jpg)

**tips:子类调用父类，一定要写super(),不然报服务器错误还查不到原因**

并且每个地方调用的时候，都需要require一些这些基类，其实还是有点麻烦，我们可以尝试将这些定义好的错误类型的类挂载到global上，具体怎么挂载，可以在上面写的InitManager类上添加一个静态方法：

![](./ed5f996c-221f-4a93-890d-72dbda4407e9.jpg)

然后再在init方法上调用一下：

```
InitManager.loadHttpExceptionmm
```

某处进行调用：

```
throw error = new golbal.errs.ParaterException()
```

这种全局挂载存在一个问题，比如ParaterException拼写错误也不会被检测到，导致程序正常执行，但是前端获取到的是404，不是预期的异常抛出

对于未知的异常：

![](./98b336e1-d322-4b7e-a66f-c835433e7ae1.jpg)

全局变量的注入：

![](./c2cfa840-3ca1-4a7f-b6a5-e47a6817159b.jpg)

如如环境变量，测试环境还是生产环境

![](./c3ea1aab-c7c0-420e-85e4-c773b10ce239.jpg)

在catchError中添加开发环境异常报错：

![](./77c90f7b-c4da-44c4-8eb6-86ebd192ff94.jpg)  

XMAPP：内置 mysql （官网下载）

navicat

安装XAMPP后，他内置了很多模块：

![](./accf8781-8c88-4e81-8f9a-8567a786e2a9.jpg)

MariaDB是mysql的一个分支，用法基本和mysql一致：

安装后启动方式：

第一步：

![](./53e1c594-d34f-413a-a0e0-288220823853.jpg)

第二步：

![](./719f301c-3a91-41b6-bbce-8e5d46958e0f.jpg)

进入navcat：

![](./dfda8c4f-fd3e-4679-a805-5f1e61b7d6ce.jpg)

![](./cb85dc4a-0bf9-4c71-b51c-6b97ff2776a6.jpg)

修改密码：

![](./c3f6c795-774c-4fe9-a415-dd49fabfec4a.jpg)

![](./9ddf05f8-b5e1-4eae-8dbe-6a62f09f4843.jpg)

新建库：

![](./8c445aa9-4eb6-4314-a198-e8c2a1dd1081.jpg)

新建表：

两种方式：

方式1：

手动在navicat里面新建表，然后一个字段一个字段的添加数据，太麻烦

方式2：

ORM的形式插入数据，通过Sequelize库来实现 

# koa2:

手册： [https://koa.bootcss.com/](https://koa.bootcss.com/)
安装koa2脚手架：sudo npm install -g koa-generator
生成koa2的项目目录：koa2 -e xx （-e代表创建ejs模版，不加这个参数代表使用jade模版）
根据提示安装依赖
启动项目： cmd提示： DEBUG=koa2demo1:\* npm start
如果是通过package.json中的npm run dev来启动，是可以热加载的（使用的nodmon来启动的）

async/await使用：

![](./a5aece71-80c0-4b74-8b82-a90b577381af.png)

![](./030aaa7f-8ce6-42ea-8438-8d5782fd1e11.png)

![](./3b5cc9f8-914f-4bec-8354-fbd6057e3667.png)
