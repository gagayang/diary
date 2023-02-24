import-local

// importLocal作用：当全局node_modules和本地node_modules中，存在相同的库，则优先加载本地

// 看 import-local 的源码就会知道，import-local 实际上是把 webpack-cli/bin/cli.js 进行一次 path.join("webpack-cli", "bin/cli.js")，得到一个所谓的本地路径，然后再把__filename 和这个本地路径求一次相对路径，如果相对路径是一个空字符串，则代表本地没有其它可以访问的 webpack-cli cli.js, 此时 importLocal(__filename) 返回 null，如果本地没有其它的 webpack-cli，这里肯定是不会进入执行的

通常来讲，全局安装一个脚手架后，本地是不需要安装脚手架的。但是当我们本地安装脚手架的时候，意味着我们项目里用到了这个脚手架。当与全局冲突的时候，比如全局和本地都有这个脚手架，但是版本不同，那么我们应该使用本地的脚手架。这就是 `import-local`的作用。

同样importLocal在开发脚手架的时候，可以用来判断，是否本地安装了相同的库，如果没有，就进入本地开发模式的代码中：

比如：

#! /usr/bin/env node

const importLocal = require('import-local');

if (importLocal(__filename)) {

} else {

}

```
'use strict';
const path = require('path');
const resolveCwd = require('resolve-cwd');
const pkgDir = require('pkg-dir');

module.exports = filename => {
	// pkgDir.sync是为了获取 当前参数(地址) 包含package.json的模块目录，也就是会从path.dirname(filename)逐层向上找，直到找到package.json为止所得到的路径。即path.dirname(filename)所在包目录
	// 这里filename是C:\Users\yuhua7\Desktop\视频\web架构师学习笔记\lerna源码学习\lerna\core\lerna\cli.js
	// 这里globalDir是C:\Users\yuhua7\Desktop\视频\web架构师学习笔记\lerna源码学习\lerna\core\lerna
	const globalDir = pkgDir.sync(path.dirname(filename));

	// 找出globalDir与filename的相对路径，也就是以globalDir为参照到filename的路径
	// 结果为cli.js
	const relativePath = path.relative(globalDir, filename);

	// 拿到filename所在包的package.json
	const pkg = require(path.join(globalDir, 'package.json'));

	// path.join(pkg.name, relativePath)把包名lerna和cli.js进行合并，合并结果为lerna/cli.js
	// 然后resolveCwd.silent('lerna/cli.js')来判断当前本地是否有这个文件,结果为C:\Users\yuhua7\Desktop\视频\web架构师学习笔记\lerna源码学习\lerna\core\lerna\cli.js
	// import-local包的核心代码就这么一句——resolveCwd.silent()
	const localFile = resolveCwd.silent(path.join(pkg.name, relativePath));

	// 判断本地是否有这个文件，则require()该文件，require就是执行该文件
	return localFile && path.relative(localFile, filename) !== '' ? require(localFile) : null;
};
```

比如我们开发的xes-cli里面有一个独立的包：@xes-cli/cli包，他的路径在xes-cli/core/cli/bin/index.js，当我们把这个包发布后再在根目录安装它，以下这段逻辑就会走到：

```
#!/usr/bin/env node
const importLocal = require('import-local')
if (importLocal(__dirname)) {
  require('npmlog').info('xes', '正在使用xes本地脚手架') // 会进入这里
} else {
  require('../lib/cli.js')(process.argv.slice(2))
}
```

此时__dirname = /Users/wanglong/personProject/xes-cli/core/cli/bin，当我们把这个包卸载后，再运行：此时__dirname = /Users/wanglong/personProject/xes-cli/core/cli/bin，可以看出路劲是一样的，但是importLocal执行不一样
