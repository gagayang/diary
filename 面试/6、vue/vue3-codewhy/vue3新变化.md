![1713792512172](image/导学/1713792512172.png)

![1713792604340](image/导学/1713792604340.png)

![1713792680099](image/导学/1713792680099.png)

大致顺序：

![1713792728239](image/vue3新变化/1713792728239.png)

MVC在IOS和前端中比较多的体现，在传统的js操作中，也可以理解成MVC：

一下截图的model可以是简单的counter，也可以是服务端返回大量数据

![1713795008497](image/vue3新变化/1713795008497.png)

vue强调的是MVVM模型，其实VM就是vue，vue在view和model中起到了中转的作用，controller的作用。

![1713795127947](image/vue3新变化/1713795127947.png)


## template属性：

![1713795360415](image/vue3新变化/1713795360415.png)

关于第二种方式，其实是在html中写了template标签，难道浏览器就不渲染template中的内容吗？不会

![1713795524020](image/vue3新变化/1713795524020.png)

## data属性：

![1713795696382](image/vue3新变化/1713795696382.png)


## methods属性：

![1713795814097](image/vue3新变化/1713795814097.png)

其他：

![1713795864385](image/vue3新变化/1713795864385.png)



vue3源码调试方式：

其实和上面vue2的源码调试一样

1、下载对应版本tag

2、install 

3、可能需要本地git init，然后在commit一下

4、dev脚本中添加--sourcemap

5、yarn dev

6、在vue/examples中新建demo，引入vue（packages/vue/dist/vue.golbal.js）













=

=
