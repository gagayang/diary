## R、ESlint

## 基础插件（都要装）

：

eslint

eslint-loader

eslint-plugin-html（这是用来检查html中的scipt标签里面的js）

eslint-friendly-formatter（第三方）

  

书写地方：

1、webpack 的config 

2、.eslintrc.\*

3、package.json中的eslintConfig

  

## 扩展插件（都要装）

  

![](./776b74a7-a477-412d-9307-0cdad4bda5b4.png)  

![](./287d8f6f-2395-465c-bc08-06f6096c6945.png)  

overlay可以在浏览器中看到错误的提示

  

demo：

第一步：

![](./a109f5e7-1320-4199-b621-84924cd17c8b.png)  

第二步：建立规则：

配置.eslintrc.js文件：

![](./1acc6a3f-2c98-4f47-ad40-b02cf057ae23.png)  

第三步：

关于地方库的依赖，如果eslint对齐进行了校验，我们需要在test js的时候，include当前src文件夹，exlcude当前的libs文件夹