匹配html节点

```js
<script>
  var html = document.querySelector("#tmpl1").innerHTML;
  html = html.replace(/<!--[\s\S]*?-->/g, '');  //去除html注释
  console.log(html)
  // html = html.replace(/>\s+([^\s<]*)\s+</g, '>$1<').trim();  //去除html标签间的多余空白
  html = html.replace(/>\s+</g, '><').trim();  //去除html标签间的多余空白
  console.log(html)


  var pattern = /([^>]*)(<([a-z/][-a-z0-9_:.]*)[^>/]*(\/*)>)([^<]*)/g,
    matchArr
  while (matchArr = pattern.exec(html)) {
      var textBefore = matchArr[1],  //获取排在标签前的文本
          elem = matchArr[2],        //获取整个开标签或闭标签
          elemName = matchArr[3],    //获取标签名
          closeSign = matchArr[4],   //判断是否为自闭合标签标记
          textAfter = matchArr[5];   //获取排在标签后的文本
          console.log(matchArr)
      // matchArr.forEach(function (o, i) {
      //     if (i > 0 && o !== "") {
      //         console.log(o, '----');  //输出各部分
      //     }
      // })
    }
</script>
```
