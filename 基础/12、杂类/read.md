常见git操作l

```
git branch 查看本地所有分支
git status 查看当前状态 
git commit 提交 
git branch -a 查看所有的分支
git branch -r 查看远程所有分支
git commit -am "init" 提交并且加注释 
git remote add origin git@192.168.1.119:ndshow
git push origin master 将文件给推到服务器上 
git remote show origin 显示远程库origin里的资源 
git push origin master:develop
git push origin master:hb-dev 将本地库与服务器上的库进行关联 
git checkout --track origin/dev 切换到远程dev分支
git branch -D master develop 删除本地库develop
git checkout -b dev 建立一个新的本地分支dev
git merge origin/dev 将分支dev与当前分支进行合并
git checkout dev 切换到本地dev分支
git remote show 查看远程库
git add .
git rm 文件名(包括路径) 从git中删除指定文件
git clone git://github.com/schacon/grit.git 从服务器上将代码给拉下来
git config --list 看所有用户
git ls-files 看已经被提交的
git rm [file name] 删除一个文件
git commit -a 提交当前repos的所有的改变
git add [file name] 添加一个文件到git index
git commit -v 当你用－v参数的时候可以看commit的差异
git commit -m "This is the message describing the commit" 添加commit信息
git commit -a -a是代表add，把所有的change加到git index里然后再commit
git commit -a -v 一般提交命令
git log 看你commit的日志
git diff 查看尚未暂存的更新
git rm a.a 移除文件(从暂存区和工作区中删除)
git rm --cached a.a 移除文件(只从暂存区中删除)
git commit -m "remove" 移除文件(从Git中删除)
git rm -f a.a 强行移除修改后文件(从暂存区和工作区中删除)
git diff --cached 或 $ git diff --staged 查看尚未提交的更新
git stash push 将文件给push到一个临时空间中
git stash pop 将文件从临时空间pop下来

```

### 用过哪些设计模式？[重点是知道别人在问啥，知道有这个概念]

* 工厂模式：

  * 工厂模式解决了重复实例化的问题，但还有一个问题,那就是识别问题，因为根本无法
  * 主要好处就是可以消除对象间的耦合，通过使用工程方法而不是 `new`关键字
* 构造函数模式

  * 使用构造函数的方法，即解决了重复实例化的问题，又解决了对象识别的问题，该模式与工厂模式的不同之处在于
  * 直接将属性和方法赋值给 `this`对象;

## 模块化规范有哪些？

https://www.cnblogs.com/echoyya/p/14577243.html

程。

# 手把手教你用npm发布包

https://blog.csdn.net/taoerchun/article/details/82531549

综合面试题-面试之道

https://juejin.cn/book/6844733763675488269/section/6844733763759374344


nginx基础：

https://juejin.cn/post/6844903619465068551



serviceless普及：

[https://juejin.cn/post/6844904185427673095](https://juejin.cn/post/6844904185427673095) （讲的很浅）

[https://juejin.cn/post/6844903844745330695](https://juejin.cn/post/6844903844745330695) （浅，但是讲的很全很容易懂）









-
