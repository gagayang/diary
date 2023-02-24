来源：https://juejin.cn/post/6908344595998998542

## 没啥大用的开篇

作为一个社会底层的前端打工人，页面优化应该大多都有做过或者了解过，毕竟如果写出来一个项目别人访问某个页面的时候先来个十几秒的白屏，可能早被老板打死了。。。

页面优化方面设计到的点很多，对应这些点的解决方案也有很多。比如常见的图片懒加载，其中一个解决方式就是先用 `data-src`的值引用图片地址，等当前图片到了可视区域的时候再把 `data-src`换成 `src`，这样等减少很多不必要的请求,不会因为一下加载过多导致请求阻塞。这种属于我们手动代码来实现的页面优化，下面的 `preload`,`prefetch`属于浏览器本身提供的优化方案。

> 注：浏览器加载资源的时候对各个资源优先级进行计算和排序，然后才会根据这个优先级来加载资源。就像干旱地区中水资源是最重要的一样，浏览器也也对页面上js,css，图片，字体文件等等有个重要程度的排序

所以看 `preload`，`prefetch`之前需要了解一下浏览器加载资源的优先级。

## 资源优先级

 **在控制台显示** ，5级分别为：Highest、High、Medium、Low、Lowest； 这5级是直接在控制台就可以看到的。（`priority`选项）
![开启优先级](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a24b5eaa687045328643fa39c2abc747~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 资源的默认优先级：

1. html、css、font资源优先级最高
2. 然后是preload资源、script、xhr请求
3. 图片视频、音频
4. 最低的是prefetch预读取的资源。

这里只是默认优先级，实际还会根据一定的条件去进行调整。

1. 一般来说，我们发送的xhr请求都是异步请求，如果是同步的会调整为最高。
2. 对于图片来说，会根据图片是否在可见视图内来改变优先级，现代浏览器为了首屏体验会把视口可见图片优先级提升为high。
3. 对于添加了 `defer`/`async`属性标签的脚本的优先级会全部降为Low。 然后，对于没有添加该属性的脚本，根据该脚本在文档中的位置是在浏览器展示的第一张图片之前还是之后，又可分为两类。在之前的 `(标记early**)`它会被定为High优先级，在之后的 `(标记late**)`会被设置为Medium优先级。

下面先来个示例：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>test</title>
    <style type="text/css">
      @font-face {
        font-family: 'tt';
        src: url('./webfont.ttf');
      }
      .custom-font {
        font-family: 'tt';
        font-size: 80px;
      }
    </style>
  </head>
  <body>
    <p class="custom-font">HEAD</p>
    <img style="width: 100px; height: 100px" src="./750-480.png" alt="" />
    <video
      style="width: 100px; height: 100px"
      src="./bbffe1b327a80bbfe118fdbf70ff6c4e.mp4"
    ></video>
    <script src="./a.js"></script>
    <script src="./b.js" defer></script>
    <script>
      window.addEventListener('load',() => {
      	// 引入图片
        const img = document.createElement('img')
        img.src = './test.png'
        document.body.appendChild(img)
        // 引入js
        const js = document.createElement('script')
        js.src = './c.js'
        document.body.appendChild(js)
        // 引入css
        const css = document.createElement('link')
        css.href = './style.css'
        css.rel = 'stylesheet'
        document.head.appendChild(css)
      })
    </script>
  </body>
</html>
复制代码
```

然后下图是执行结果

![结果](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/228fe237710049aead0175aa153af055~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

然后根据最上方的优先级排序来看下这个结果图

```js
html优先级最高：
// 所以index.html是第一个加载的

对于图片来说，会根据图片是否在可见视图内来改变优先级，
现代浏览器为了首屏体验会把视口可见图片优先级提升为high：
// 当前视口内的图片750-480是第二个加载的

根据该脚本在文档中的位置是在浏览器展示的第一张图片之前还是之后，又可分为两类。
在之前的`(标记early**)`它会被定为High优先级，
在之后的`(标记late**)`会被设置为Medium优先级：
// 在750-480图片后面的a.js被标记为medium，是第三个加载的

对于添加了defer/async属性标签的脚本的优先级会全部降为Low：
// b.js设置了defer，标记为low，是第四个加载的。

font资源优先级最高：
字体文件webfont.ttf标记为highest，但是为什么是第五个加载的，
因为字体文件由css引入，在css加载后然后解析的时候才会进行加载，所以它反而落在了后面
复制代码
```

**注意：** 我们这里讨论的是资源加载优先级，但是平时页面解析、执行顺序也别忘了。

以上这些是页面一开始引入的资源，下面的资源是通过动态创建

```js
注意我们创建标签的顺序是   图片 -> js -> css
在图上可以看到三者的标记是 low  -> low -> highest
对于css和图片两者是按照优先级来加载的，但是c.js并没有。因为引入了js，当前js的代码会同步执行，所以c.js直接就加载了。
再一次强调：这里讨论的是资源加载优先级，但是平时页面解析、执行顺序也别忘了
复制代码
```

这里说了这么多，顺序好像是知道了，但是知道不知道好像也没啥关系。这个和preload，prefetch有啥关系，和我页面进行优化又有啥关系。

#### 预加载-preload

preload可以指明哪些资源是在当前页面加载完成后**即刻**需要的。对于这种即刻需要的资源，肯定是越早获取越好，preload就是指定这种资源的

> 可以看下面例子：两个例子皆是来自 [juejin.cn/post/689368…](https://juejin.cn/post/6893681741240909832 "https://juejin.cn/post/6893681741240909832")

![preload](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80e08544d9f34106b69503b547d62a52~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

可以看到：

页面首次加载时文字会出现短暂的字体样式闪动，原因上方已经看到了，是字体文件由css引入，在css解析后才会进行加载，加载完成之前浏览器只能使用默认字体。也就是说，字体文件加载的时机太迟。这里就可以用preload进行预加载

```html
<link rel="preload" as="font" href="./webfont.ttf" />
复制代码
```

对比上面的加载顺序图，可以很明显看到字体文件加载顺序提前了。
![字体使用preload](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2c17806993746fea41d14df5a28ff18~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 链接预取-prefetch

prefetch告诉浏览器那些资源是**以后可能**会用到的，浏览器完成当前页面的加载后空闲时间来进行下载，并将其存储在缓存中。当用户访问其中一个预取文档时，便可以快速的从浏览器缓存中得到。（这里注意是“可能”会用到，也有可能不会用到，而preload的话就肯定会用到）

![prefetch之前](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2542ea0956b9426f95e265bace99c6bd~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

进入选择礼券页面的时候，图片会有个加载的过程，这里就可以使用prefetch

```js
<link rel="prefetch" href="static/img/ticket_bg.a5bb7c33.png">
复制代码
```

改完之后效果：

![prefetch之后](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16baed9624c34053875a4202f43f0914~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

在项目中使用前后效果就像上面的例子所示，通俗的解释一下。

---

场景一：

秋风渐进，天气越来越凉，鸡小黄为了以后不得老寒腿也找出来必备的秋裤

* 用preload之前：
  反正有秋裤，等以后冻得腿冷再穿，现在着啥急穿。—— 鸡小黄这么想着

  感觉到冷的时候，俩腿冻的抖抖抖了一整天——鸡小黄，卒。
* 用preload之后：

  虽然还没太感觉到冷，还是先拿出秋裤穿上吧 —— 鸡小黄做了明智的决定，所以冻得腿抖的事件根本没有发生，暂时未卒

---

场景二：

岁数越来越大了，好像头发越来越白了，是不是需要准备点黑芝麻，黑米之类的保养一下秀发——鸡小黄摸了摸自己的头发

用了prefetch：

在不加班的时候，他就去买了十几斤黑芝麻，黑米等等等囤了起来。

* 可能的结果一：
  万万没想到的是，作为社会底层的cv工程师 —— 头发确实没白，但是秃了。。。鸡小黄吐血两升，卒
* 可能的结果二：

  时光荏苒，鸡小黄的头发确实也越来越白了，因为从一开始就坚持着食补，所以相比于其他鸡，鸡小黄的秀发还算是乌黑亮丽。 —— 鸡小黄很高兴，未卒

---

实际项目中可用,但是两者的兼容性都不太好，好在不支持preload和prefetch的浏览器会自动忽略它，因此可以将它们作为一种渐进增强功能，优化我们页面的资源加载，提升性能和用户体验。

这里额外提一嘴：用vue-cli生成的项目一般都会默认使用这俩属性，具体可看 [cli.vuejs.org/zh/guide/ht…](https://link.juejin.cn?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Fhtml-and-static-assets.html%23preload "https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload")

preload的建议保留，prefetch的话看自己是否需要再决定是否保留

## 附：兼容性

preload

![preload兼容性](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24099e43655c429eafd5f6a04199eb9c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

prefetch

![prefetch](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e955420928fc463fb60b68092d7d0d80~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 参考文章

> 浏览器页面资源加载过程与优化 [juejin.cn/post/684490…](https://juejin.cn/post/6844903545016156174 "https://juejin.cn/post/6844903545016156174")
>
> 使用 Preload&Prefetch 优化前端页面的资源加载 [juejin.cn/post/689368…](https://juejin.cn/post/6893681741240909832 "https://juejin.cn/post/6893681741240909832")
>
> 通过rel="preload"进行内容预加载 [developer.mozilla.org/zh-CN/docs/…](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTML%2FPreloading_content "https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content")
>
> Link prefetching [developer.mozilla.org/zh-CN/docs/…](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FLink_prefetching_FAQ "https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Link_prefetching_FAQ")

## 万年不变的END

理解暂时如此，如果有不足或者错误的地方还望不吝赐教
