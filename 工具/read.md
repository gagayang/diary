# 1、git官方书籍：

https://git-scm.com/book/zh/v2

# pnpmfile作用：

https://www.pnpm.cn/pnpmfile

（以下解释可能有局限性，2023-03-18）

其实就是人为干预安装的安装包的版本，当一个项目安装了多个版本的某个包A，那么我们可以干预只能某个版本的A，达到统一目的，但是可能会导致别人的项目出问题，因为强制修改了别人的版本依赖。

那我们是否可以手动统一每个包的依赖呢？对于一个monorepo，自己写的字项目基于约定肯定可以，但是有可能会使用一些封装好的脚手架，比如eden，jupiter，或者别人封装好的npm包，包里面依赖了别的版本A，这个时候就不好手动改了，可以通过.pnpmfile.cjs强制依赖版本，但是就如同上面说的，可能会出问题。

# BCP 47 language tag

也就是：IETF language tag，IETF就是The Internet Engineering Task Force (IETF，因特网工程工作小组)，就是拿来约定互联网上那个tag代表了哪个国家语言，比如：zh：中国，zh-CN，中国大陆

维基百科：https://en.wikipedia.org/wiki/IETF_language_tag

常用：https://www.techonthenet.com/js/language_tags.php


# pnpm

1、pnpm介绍：https://juejin.cn/post/6932046455733485575

2、 pnpm介绍：https://www.yuexun.me/blog/problems-with-npm-and-how-pnpm-handles-them
