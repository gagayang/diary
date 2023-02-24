# 详解，从后端导出文件到前端（Blob）下载过程

前言

对于不是从事音视频方面的同学来说，很多情况下都是通过 window.location.href 来下载文件。这种方式，一般是前后端的登录态是基于 Cookie + Session 的方式，由于浏览器默认会将本地的 cookie 塞到 HTTP 请求首部字段的 Set-Cookie 中，从而实现来带用户的 SessionId，所以，我们也就可以用 window.location.href 来打开一个链接下载文件。

当然，还有一种情况，不需要登录态的校验（比较che）。

众所周知，还有另一种登录态的处理方式 JWT (JSON Web Token)。这种情况，一般会要求，前端在下载文件的时候在请求首部字段中添加 Token 首部字段。那么，这样一来，我们就不能直接通过 window.location.href 来下载文件。

不过，幸运的是我们有 Blob，它是浏览器端的类文件对象，基于二进制数据，我们可以通过它来优雅地处理文件下载，不限于音视频、PDF、Excel 等等。所以，今天我们就从后端导出文件到 HTTP 协议、非简单请求下的预检请求、以及最后的 Blob 处理文件，了解一番何为其然、如何使其然？

后端（Koa2）导出文件（Excel）

首先，我们从后端导出文件讲起。这里，我选择 Koa2 来实现 Excel 的导出，然后搭配 node-xlsx 这个库，从而实现 Excel 的二进制数据的导出。它看起来会是这样：

const xlsx = require("node-xlsx")

router.get("/excelExport", async function (ctx, next) {

    // 数据查询的结果

    const res = [

    ["name", "age"],

    ["五柳", "22"],

    ];

    // 生成 excel 对应的 buffer 二进制文件

    const excelFile = xlsx.build([{name: "firstSheet", data: res}])

    // 设置文件名相关的响应首部字段

    ctx.set("Content-Disposition", "attachment;filename=test.xlsx;filename*=UTF-8")

    // 返回给前端

    ctx.body = buffer;

  });

这里就不对数据库查询做展开，只是模拟了一下查询后的结果 res

然后我们用浏览器请求一下这个接口，我们会看到在响应首部（Response Headers）字段中的 Content-Type 为 application/octet-stream，它是二进制文件默认的 MIME 类型。

Connection: keep-alive

Content-Disposition: attachment;filename=test.xlsx;filename*=UTF-8

Content-Length: 14584

Content-Type: application/octet-stream

Date: Sun, 23 Aug 2020 11:33:16 GMT

MIME 类型，即 Multipurpose Internal Mail Extension，用于表示文件、文档或字节流。

HTTP 协议认识二进制文件流

如果，我们没有参与后端返回 Excel 的这个过程。那么，HTTP 协议可以帮助我们减少交流，并且懂得我们前端需要如何进行相应的处理。这里会涉及到三个 HTTP 实体首部字段：

Content-Type

Content-Length

Content-Disposition

那么，我们分别来看看它们在 HTTP 文件传输过程中的特殊意义。

Content-Type

Content-Type 我想这个老生常谈的实体首部字段，大家不会陌生。它用来说明实体主体内容对象的媒体类型，遵循 type/subtype 的结构。常见的有 text/plain、text/html、image/jpeg、application/json、application/javascript 等等。

在我们这里二进制文件，它没有特定的 subtype，即都是以 application/octet-stream 作为 Content-Type 的值。即如上面我们所看到：

Content-Type: application/octet-stream

1

所以，只要我们熟悉 Content-Type，那么在开发中的交流成本就可以减少。

Content-Length

Content-Length 又是一个眼熟的实体首部字段，它表示传输的实体主体的大小，单位为字节。而在我们这个栗子，表示传输的 Excel 二进制文件大小为 14584。

Content-Disposition

Content-Disposition 这个实体首部字段，我想前端同学大多数是会有陌生感。它用来表示实体主体内容是用于显示在浏览器内或作为文件下载。它对应的 value 有这么几个内容：

formdata，表示实体主体是 formdata 的形式。

inline，表示实体主体内容显示在浏览器内。

attachment，表示实体主体内容作为文件下载。

filename，表示文件编码格式或文件名，例如 filename*=UTF-8 表示文件的编码，filename=test.xlsx 表示下载时的文件名。

name，表示 formdata 上传文件时，对应 type 为 file 的 input 的 name 值，例如 `<input type="file" name="upload" />`，此时对应的 name 则为 upload。

需要注意的是，对于 Content-Disposition 的 formdata 它仅仅是一个信息提示的作用，并不是实现实体主体内容为 formdata，这是 Content-Type 负责的。

那么回到，今天这个栗子，它的 Content-Disposition 为:

Content-Disposition: attachment;filename=test.xlsx;filename*=UTF-8

1

所以，现在我们知道它主要做了这么几件事：

告知浏览器需要将二进制文件作为附件下载

附件的文件名为 test.xlsx

附件对应的编码为 UTF-8

Blob 优雅地处理文件（Excel）下载

为什么说是优雅？因为，Blob 它可以处理很多类型文件，并且是受控的，你可以控制从接收到二进制文件流、到转化为 Blob、再到用其他 API 来实现下载文件。因为，如果是 window.location.href 下载文件，诚然也可以达到一样的效果，但是你无法在拿到二进制文件流到下载文件之间做个性化的操作。

并且，在复杂情况下的文件处理，Blob 必然是首要选择，例如分片上传、下载、音视频文件的拼接等等。所以，在这里我也推崇大家使用 Blob 处理文件下载。

并且，值得一提的是 XMLHttpRequest 默认支持了设置 responseType，通过设置 reposponseType 为 blob，可以直接将拿到的二进制文件转化为 Blob。

当然 axios 也支持设置 reponseType，并且我们也可以设置 responseType 为 arraybuffer，但是我想没这个必要拐弯抹角。

然后，在拿到二进制文件对应的 Blob 对象后，我们需要进行下载操作，这里我们来认识一下这两种使用 Blob 实现文件下载的方式。

URL.createObjectURL

在浏览器端，我们要实现下载文件，无非就是借助 a 标签来指向一个文件的下载地址。所以 window.location.href 的本质也是这样。也因此，在我们拿到了二进制文件对应的 Blob 对象后，我们需要为这个 Blob 对象创建一个指向它的下载地址 URL。

而 URL.createObjectURL 方法则可以实现接收 File 或 Blob 对象，创建一个 DOMString，包含了对应的 URL，指向 Blob 或 File 对象，它看起来会是这样：

"blob:http://localhost:8080/a48aa254-866e-4c66-ba79-ae71cf5c1cb3"

1

完整的使用 Blob 和 URL.createObjectURL 下载文件的 util 函数：

export const downloadFile = (fileStream, name, extension, type = "") => {

  const blob = new Blob([fileStream], {type});

  const fileName = `${name}.${extension}`;

  if ("download" in document.createElement("a")) {

    const elink = document.createElement("a");

    elink.download = fileName;

    elink.style.display = "none";

    elink.href = URL.createObjectURL(blob);

    document.body.appendChild(elink);

    elink.click();

    URL.revokeObjectURL(elink.href);

    document.body.removeChild(elink);

  } else {

    navigator.msSaveBlob(blob, fileName);

  }

};

FileReader

同样地，FileReader 对象也可以使得我们对 Blob 对象生成一个下载地址 URL，它和 URL.createObject 一样可以接收 File 或 Blob 对象。

这个过程，主要由两个函数完成 readAsDataURL 和 onload，前者用于将 Blob 或 File 对象转为对应的 URL，后者用于接收前者完成后的 URL，它会在 e.target.result 上。

完整的使用 Blob 和 FileReader 下载文件的 util 函数：

const readBlob2Url = (blob, type) =>{

  return new Promise(resolve => {

    const reader = new FileReader()

    reader.onload = function (e) {

    resolve(e.target.result)

    }

    reader.readAsDataURL(blob)

  })

}

写在最后

如果，仅仅是用一个 Blob 这个浏览器 API 处理文件下载，可能带给你的收益并没有多少。但是，通过了解从后端文件导出、HTTP 协议、Blob 处理文件下载这整个过程，就可以构建一个完整的技术思维体系，从而获取其中的收益。唯有知其然，方能使其然。 这也是前段时间看到的很符合我们作为一个不断学习的从业者的态度。也因此，良好的技术知识储备，能让我们拥有很好的编程思维和设计思想。
