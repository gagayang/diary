### HTML5 Blob 实现文件下载功能

原理其实很简单，就是将文本或者JS字符串信息（即后台返回来的在服务器上没有具体路径的动态文件，如导出数据功能）借助Blob转换成二进制，然后，作为 a 标签的 href 属性，配合download属性，实现下载功能，缺点是如果文件太大会下载失败。

下面是导出数据的一个实例：

```
12345678910111213141516171819202122232425262728293031323334
$("#exportAll").on("click",function(){     //点击【全部导出】
    //layer.load();
    var province = $('#operatingData select[name=\'province\'] option:selected').val();  //查询条件（省）
    var city = $('#operatingData select[name=\'city\'] option:selected').val();    //查询条件（市）

    var url = '/xxx/excelAllDownload';      //【全部导出】请求url
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.responseType = "blob";   //返回类型blob
    xhr.onload = function () {   //定义请求完成的处理函数
        //layer.closeAll('loading');
        if (this.status === 200) {
            var blob = this.response;
            var reader = new FileReader();
            reader.readAsDataURL(blob);   // 转换为base64，可以直接放入a标签href
            reader.onload = function (e) {
                var a = document.createElement('a');   // 转换完成，创建一个a标签用于下载
                a.download = 'XX数据.xlsx';
                a.href = e.target.result;
                $("body").append(a);    // 修复firefox中无法触发click
                a.click();
                $(a).remove();
            }
        }else if(this.status === 504){
            alert('导出失败，请求超时');
            //layer.msg('导出失败，请求超时', {icon: 2});
        }else{
            alert('导出失败');
            //layer.msg('导出失败', {icon: 2});
        }
    };
    xhr.send("province=" + province + "&city=" + city);
})
```

上面是在服务器动态生成excel文件时使用的下载方式，因为对应的 URL 并不存在，我们就不能简单的指定 href 属性。

但是不同浏览器对 Blob （类文件对象）有不同的大小限制，这种借助Blob转换成二进制 实现下载功能的方式并不能导出数据量过多的数据到excel文件（即不能下载太大的文件），且有兼容性问题。

所以，我们可以通过 JavaScript 对服务器发出一个请求，通知它去生成某个文件，然后把对应的 URL 返回给客户端。代码如下：（此时的请求结果为一个已经存在于服务器上面的静态文件的路径）

```
1234567891011121314151617181920212223242526
$("#exportAll").on("click",function(){     //点击【全部导出】
    var url = '/xxx/excelAllDownload';     //【全部导出】请求url
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.responseType = "blob";   //返回类型blob
    xhr.onload = function () {   //定义请求完成的处理函数
        if (this.status === 200) {
            //方式一实现静态文件下载，不能自定义下载文件名字
            //location.href = "json/abc.xlsx";  //this.response（返回的服务器上的静态文件路径）

            //方式二实现静态文件下载，可以自定义下载文件名字
            var a = document.createElement('a');  //创建a标签用于下载
            a.download = 'XXX数据.xlsx';
            a.href = "json/abc.xlsx";  //this.response（返回的服务器上的静态文件路径）
            $("body").append(a);       // 修复firefox中无法触发click
            a.click();
            $(a).remove();
        }else if(this.status === 504){
            alert('导出失败，请求超时');
        }else{
            alert('导出失败');
        }
    };
    xhr.send();
})
```

参考文章：
[如何用 JavaScript 下载文件 - scarlex - SegmentFault 思否](https://segmentfault.com/a/1190000005863250)

[JS前端下载文本文件小技巧：1、download属性；2、借助Blob转换成二进制下载 - 古兰精 - 博客园](https://www.cnblogs.com/goloving/p/7651636.html)
