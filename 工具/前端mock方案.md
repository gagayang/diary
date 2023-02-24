## mock server

## 方案1

如果只是想看看打包的dist能不能呈现，可以全局安装http-server，在当前dist目录使用cmd执行http-server，整个dist目录文件就会当作静态资源呈现
运行的时候执行： http-server --cors (避免跨域)

## 方案2

如果是本地当前工程自己在npm run dev阶段，同时带上一个mock服务，可以在webpack中添加

```
12345678910111213141516171819
npm：
const CopyWebpackPlugin = require('copy-webpack-plugin')
plugins:
new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, './static'),
    to: 'static',
    ignore: ['.*']
  }
])
proxy:
proxy: {
  '/api': {
    target: 'http://127.0.0.1:8000',
    pathRewrite: {
      '^/api': '/static/mock'
    }
  }
}
```

使用注意事项：
根目录下添加/static/mock文件夹后，可以.gitignore里面的json文件，但是不要忽略/static/mock文件夹，不然会报错。

## 方案3

如果想在本地所有工程都能使用mock服务：
npm install -g server-mock
在当前目录执行server init，就可以把当前目录变成一个静态资源呈递的服务目录了。
比如通过：server start --port 3000 指定启动端口
更多用法：[server-mock - npm](https://www.npmjs.com/package/server-mock)

注意：如果项目中：
axios.defaults.withCredentials = true
后端设置成*
res.header(‘Access-Control-Allow-Origin’, ‘*’);
这样会导致访问不通，最好的办法，开发阶段把withCredentials改成false
