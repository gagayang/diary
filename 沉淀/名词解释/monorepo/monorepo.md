其实就是包的重复利用方案

## 写一个demo来描述monorepo怎么使用：

1、在跟目录：npm init

2、新建packages：里面存放各个项目

3、在跟目录可以创建/api或者/components等等公共文件夹目录，这些工具可以是简单的utils，然后集中到index.js中导出，也可以是通过脚手架创建，然后通过index.js导出（如果有自身的依赖一定要安装）。

4、比如有一个/utils，里面有一个子公共工具A，通过index.js导出后，在package.json中name："@utils/a"，private：true，代表是私有包，main："index.js/ts"，代表入口

5、来到packages任意一个项目中，执行pnpm add @utils/a，就可以将包装上，然后使用：import { normalizeXX } from '@utils/a'

6、因为是monorepo进行的管理，会在跟目录存在一个文件：pnpm-workspace.yaml文件，里面会说明公共依赖有哪些，分别干啥的（有了该文件才能启动workspace的功能）

7、开发完毕，正常执行npm run build就行。

什么时候使用npm 什么时候使用pnpm？

pnpm安装依赖用用到软链，所以用了pnpm管理包，其他的命令也最好用pnpm，不要使用npm，不然会报错，或者找不到包







-
