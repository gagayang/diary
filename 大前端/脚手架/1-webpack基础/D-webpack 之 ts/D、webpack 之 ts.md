## D、webpack 之 ts

中文网：[https://www.tslang.cn/docs/home.html](https://www.tslang.cn/docs/home.html)

![](./fc375eb7-713d-4b37-9487-28eb91994648.png)  

tsconfig.json配置：

![](./a0446808-f54b-4b60-b0ec-a812824cb653.png)  

demo:

tsconfig.json配置：

![](./34b31d8d-50e3-44e7-a66b-fdaf91767eba.png)  

webpack.config.js配置：

![](./53433762-ae6f-4d28-bcec-d8df7e6456b3.png)  

app.ts:

![](./5a7711ca-b7be-4dcd-9672-1d15a4f838b3.png)  

如图：ts中直接使用了lodash.js工具库，正常编译使用

上面的简单配置，如果存在一些警告，可能不会跑出来，比如：loash的\_\_.chunk方法，传递参数的时候写成了\_\_.chunk(2)，这个时候仅仅是上面的配置，还是会正常编译，没有异常抛出，

![](./5de2e6e9-4f17-4432-a5bc-a55e7a07411a.png)  

比如安装了@types/lodash:编译就会抛出警告：

![](./5c784cb9-a0e6-4e81-9e97-4632990bacfa.png)