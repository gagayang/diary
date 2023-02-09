## 最近接手商城App营销工具的开发，遇到坑点：

1、商家营销工具lynx启动项目启动参考：

[https://bytedance.feishu.cn/wiki/wikcnxXL7ezBP9GkaIvX8knKMXg](https://bytedance.feishu.cn/wiki/wikcnxXL7ezBP9GkaIvX8knKMXg)

文档坑点：

直接通过eden mono install可能安装依赖失败，先yarn install一下

依赖安装完毕后，有需要编译lynx的步骤，不然项目运行不起来，目前依赖的组件库：

eden mono build**  **@i18n-ecom/mux-lynx-components

eden mono build**  **@i18n-ecom/mux-icons

eden mono build**  **@i18n-ecom/mux-color

启动项目警告剔除，可以在子应用的speedy.config.js中添加：

```
compilerNGOptions: {

	disableAnonymousStateWarning: true,

	disableStaticAnalysisWarning: true,

	disableDeprecatedWarning: true,

}
```

2、投屏

苹果：有线+quickTime player，摄像头选择iPhone

安卓：第三方软件，傲软创投

3、bifrost手机安装的坑

小米手机+安卓11以上版本不能安装biforst

Mac安装的bifrost防火墙默认拦截，重启也只能是默认拦截，导致代理失败，目前还没找到原因，准备用Charles，代理教程文档：[https://blog.csdn.net/qq_20113327/article/details/122299433](https://blog.csdn.net/qq_20113327/article/details/122299433)

bifrost 问题排查：

[https://bytedance.feishu.cn/wiki/wikcnGH3m9kbzZH6MY7w4JYfKlc#spS0kU](https://bytedance.feishu.cn/wiki/wikcnGH3m9kbzZH6MY7w4JYfKlc#spS0kU)

[https://bytedance.feishu.cn/wiki/wikcn015Kcoyh2xRLBJNs8I3n4c](https://bytedance.feishu.cn/wiki/wikcn015Kcoyh2xRLBJNs8I3n4c)

内网开发步骤：

1、vscode打开项目：18n_ecom_shop_monorepo/packages/apps/seller-app-lynx-promotion

2、手机usb链接（代码需要安装USBPlugins插件）电脑（iOS），打开SellerCenter调试包，开启Enable boe ， lynx Devtool（该devtool再反复调试刷新链接过程中可能会自动关闭，第3步模拟器如果一直展示不出来，需要确认该步是否开启）

3、以上路径（子应用）下运行：yarn run start，运行起来后浏览器会弹出模拟器，确认链接手机（该步骤可能需要多次重启项目/连接手机/刷新网页，配合查看 lynx Devtool是否一直开启），等模拟器能够正常展示页面后，开启chalres

4、开启chalres，将手机网络手动代理到chalres（Mac 的ip + 8888端口）

10.79.248.77
