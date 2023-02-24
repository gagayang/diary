## G、webpack 之 css(less)

style-loader: 在html中创建style标签

css-loader： 允许js中import css

最简单的配置：

![](./a4d39cdb-538a-450c-b7f4-be54d30afaea.png)  

![](./86937aa2-fe60-4cab-9df1-1fae7b99364a.png)  

![](./92d9e3fd-ff08-4b55-b217-9ee12ea79f43.png)  

![](./6b24b2ec-8ce0-4d9d-bce8-2d2d89fde57a.png)  

  

【后期实验  开始】  

如果只使用css-loader是不行的，只是打包了，并没有插入页面，所以需要css-loader + style-loader一起使用

【后期实验  结束】  

  

  

如果我们不想通过style-loader+css-loader的方式来配置，另外一种配置方案：

style-loader/url+file-loader来配置：这个时候css的内容会以单的的css文件被放到html中，因为单独生成来css文件，还需要指定publicPath路径：

![](./3fd39596-672b-49f1-a583-015ffbca8a54.png)  

![](./4c05878c-b475-4b23-b13d-3a3051afb73b.png)  

这种配置，如果多次import css到js，就会多次生成css文件，以link标签的形式插入html，造成带宽浪费，不常用！结果如下：

![](./b24da3fa-ab14-4253-a38c-c970da081c9f.png)  

  

第二种不常用的配置：

![](./c105288d-551f-4c0a-ae6d-ce6b8b822ffc.png)  

![](./bc22a2b3-9073-4181-8f83-9e7615ce6d14.png)  

![](./e057ff4c-ebd1-41be-811e-b8889e066c82.png)  

![](./6adbe1dd-ba35-4315-b62e-8eea09cdebcd.png)  

# 

```
{
        test: /\.css/,
        use:[
          {
            loader: 'style-loader',
            options: {
              
            }
          }, 'css-loader'
        ]
      }
```

less使用：

安装依赖： less less-loader  

```
{    test: /\.less$/,    use:[      'style-load', 'css-loader', 'less-loader'    ]}
```