常见Content-Type类型有四种：

1. application/x-www-form-urlencoded 常见的form提交
2. multipart/form-data 文件提交
3. application/json 提交json格式的数据
4. text/xml 提交xml格式的数据

常见处理表单的node插件：
bodyparser,multer,formidable，除了这三个，还有multiparty、busboy等，multiparty性能上不如busboy，而multer是busboy的顶层封装，效率又提升了一个档次。

Bodyparser中间件
这个中间件用于处理第1,3种content-type 的body非常的方便，但不能用于处理multipart类型的body，具体api可见GitHub，提供了四种方法

1. bodyParser.json() 将body解析为json
2. bodyParser.text() 将body解析为文本
3. bodyParser.raw() 将body解析为二进制
4. bodyParser.urlencoded() 将编码为URLEncoder的body解析出来

### Bodyparser中间件的使用：最常用的就是最后一个方法，放到中间键中，直接解析出请求内容，demo如下：

```
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.post('/', function (req, res) {
    console.log(req.body.name)
})
app.listen('3000')
```

```
<form action="#" method="post" enctype="application/x-www-form-urlencoded"> 
    <input type="text" name="name">
    <input type="text" name="age">
    <input type="submit" value="提交">
</form>
```

⚠️；// 这里换成 application/json 解析效果一样，换成multipart/form-data解析不出来

Multer 中间件
只处理类型是multipart/form-data的body。
它的主要功能是： .single(‘photo’) .array(‘photos’, 12) .fields([])分别对应处理上传文件，批量上传和分类上传，同时也带有处理纯文字的功能，用上面三个方法不带参数即可。

Formidable 中间件
用于处理表单和上传文件，功能大而全,可配置项非常多，最大的区别是还提供了一个对象,用于处理各种事件。

```
1234567
var form = new formidable.IncomingForm()
form.on('fileBegin', function(name, file) {
});
.on('file', function(name, file) {
});
.on('error', function(err) {
});
```

在实际开发中，很明显可以用bodyparser和multer来分别处理表单和文件，也可以只用formidable，按需取用即可。

### Formidable 中间件的使用：

```
12345
<form action="#" method="post" enctype="text/plain">
    <input type="text" name="name">
    <input type="text" name="age">
    <input type="submit" value="提交">
</form>
```

const express = require(‘express’)
const formidable = require(‘formidable’)
const app = express()
app.use(express.static(’./public’))
app.post(’/’, function (req, res) {
var form = new formidable.IncomingForm();
form.parse(req, function(err, fields, files) {
console.log(fields)
console.log(files)
});
})
app.listen(‘3000’)

结果：
在没有文件的情况下；
除了text/plain提交的方式，其他的提交方式都可以读取出来提交的参数

在有文件的情况下，只测试了multipart/form-data ， 这个时候提交，普通表单域和文件都可以提交上传。
⚠️：
fileds字段是普通字段，files是文件
