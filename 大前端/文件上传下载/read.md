## 下载

文章1：【这应该是你见过的最全前端下载总结】（有读后感）

[https://juejin.cn/post/6844903763359039501](https://juejin.cn/post/6844903763359039501)

文章2：前端通过table下载excel （js-xlsx和file saver简单应用）

[https://segmentfault.com/a/1190000038344526](https://segmentfault.com/a/1190000038344526)

### 文章1：

### 对这片文章的校准：

【1】、a标签下载：设置download标签，已经可以让chrome、火狐、safari识别，然后对png、pdf进行预览和下载，docx、xlsx不管是否添加download，都是执行下载（因为不能识别，download添加内容，可以让下载的文件名被改写）

【2】、a标签下载：canvas.toDataURL只能用于图片，不能用于pdf，canvas.toDataURL属性存在跨域问题，需要设置image的crossorigin anonymous 属性，这个属性作用：

img是我们在web开发中比较常用的一个标签，它代表着文档中的一个图像元素。HTML5给这个标签新增加了一个 `crossorigin`属性，这个属性决定了图片获取过程中是否开启 `CORS`功能

#### 使用场景

在最近的项目开发中，有一个需求是让用户输入一个任意图片的url地址，在前端预览图片并让用户裁剪，再将裁剪好的图片上传到后端的服务器上。这里输入的图片地址很有可能来自第三方站点，这就涉及到一个跨域的问题，如果仅仅是展示预览图片的话是没有什么问题的，但这里裁剪图片时需要将裁剪好的图片进行base64编码，如果没有使用 `crossorign`开启 `CORS`功能的话，在使用 `canvas`的 `<br/>`

#### `<a href="http://ilucas.me/2017/04/19/crossorign-attribute-img-tag/#crossorigin%E5%B1%9E%E6%80%A7" title="crossorigin属性"></a>crossorigin属性`

`这个属性有两个值可选：<br/><code spellcheck="false">anonymous</code>：如果使用这个值的话就会在请求中的<code spellcheck="false">header</code>中的带上<code spellcheck="false">Origin</code>属性，但请求不会带上<code spellcheck="false">cookie</code>和其他的一些认证信息。<br/><code spellcheck="false">use-credentials</code>：这个就同时会在跨域请求中带上<code spellcheck="false">cookie</code>和其他的一些认证信息。<br/>在使用这两个值时都需要server端在response的header中带上<code spellcheck="false">Access-Control-Allow-Credentials</code>属性。<br/>可以通过server的配置文件来开启这个属性：<a href="https://github.com/h5bp/server-configs-apache/blob/fc379c45f52a09dd41279dbf4e60ae281110a5b0/src/.htaccess#L36-L53">server开启Access-Control-Allow-Credentials</a><br/>前端写法：`

```
var img = new Image,
    canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    src = "http://example.com/image"; // insert image url here
img.crossOrigin = "anonymous";
img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage( img, 0, 0 );
    localStorage.setItem( "savedImageData", canvas.toDataURL("image/png") );
}
img.src = src;
// make sure the load event fires for cached images too
if ( img.complete || img.complete === undefined ) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
}
```

#### `<br/>`

#### `safari浏览器的bug`

`在safari浏览器中发现一个bug，即用户选择本地的图片文件时，如果使用了<code spellcheck="false">crossorigin</code>话也会报错，解决办法是判断图片的地址是否是以<code spellcheck="false">http</code>开头的，即：`

```
if (path.substring(0, 4).toLowerCase() === 'http') {
  img.crossOrigin = 'anonymous'
}
```

`<br/>对于crossOrigin的解释，这片文章也很到位：`

`<a href="https://www.zhangxinxu.com/wordpress/2018/02/crossorigin-canvas-getimagedata-cors/">https://www.zhangxinxu.com/wordpress/2018/02/crossorigin-canvas-getimagedata-cors/</a><br/>`

`“<code spellcheck="false">crossOrigin=anonymous</code><span>相对于告诉对方服务器，你不需要带任何非匿名信息过来。例如cookie，因此，当前浏览器肯定是安全的。</span>`

`<span>就好比你要去别人家里拿一件衣服，</span><code spellcheck="false">crossOrigin=anonymous</code><span>相对于告诉对方，我只要衣服，其他都不要。如果不说，可能对方在衣服里放个窃听器什么的，就不安全了，浏览器就会阻止。</span>”`

`<br/>`

`【3】<span>a标签下载：</span><span>通过canvas转换成DataUrl（或者再进一步转换成BolbUrl），这种方式，只能处理图片文件，比如docx，xlsx，txt，json都不能被a标签的href接受变成一个可访问链接</span>`

`<br/>`

`<br/>`
