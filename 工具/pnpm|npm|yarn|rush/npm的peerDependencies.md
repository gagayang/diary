来源：https://segmentfault.com/a/1190000022435060

## 问题引出

今天在运行之前的一个react工程时，浏览器上抛了一个奇怪的错误：

```
Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
```

为什么说奇怪呢？是因为这个工程之前是可以运行的，我重新装了一遍依赖之后就不能跑了，真是喜闻乐见了😢。

根据错误提示，这应该是 `React Hooks` 报的错，通过排除法，确认是我之前封装的一个组件有问题，这个组件是通过npm包安装使用的。只要在项目中去除这个组件，报错就消失了，但是具体出了什么问题，只能祭出 `Google` 大法了。

果然，有人遇到了跟我一样的问题，在 [react 官网](https://link.segmentfault.com/?enc=0726vyLv%2BS7pbrKxzBQZxQ%3D%3D.vH4EmQ2hpZiEeWMmsq5ztYQPTrfowVd1pTwgRT%2BjomemMsV3n6sxwNhVgT7qCaz9IXzD7Dp8miIZHlfl%2BWWbUBBztwfu%2BS5I5Tu3beQ8wK4%3D)找到了此报错的详细说明：

归纳总结一下可能是一下几个原因导致的：

* **React 和 React DOM 版本不匹配**
* **打破了 Hook 的规则**
  你只能在当 React 渲染函数组件时调用 Hook：
  * ✅ 在函数组件的顶层调用它们。
  * ✅ 在自定义 Hook 的顶层调用它们。
* **重复的 React**

关于第一点，官网解释说有可能使用了不支持 `React Hook` 的 `react-dom` 版本(<16.8.0),这点通过确认 `package.json` 中的 `react-dom` 版本号得以排除。

再看第二点，关于 `Hooks` 用法的问题，因为这段代码以前跑成功过，而且通过检查，也可以很确定的排除了。

最后只剩下第三点，仔细看一下，这一点官网也做了详细的描述：

> In order for Hooks to work, the react import from your application code needs to resolve to the same module as the react import from inside the react-dom package.If these react imports resolve to two different exports objects, you will see this warning. This may happen if you accidentally end up with two copies of the react package.

嗯，看到这个描述有点豁然开朗的感觉，为了使 Hook 正常工作，应用代码中的 react 依赖以及 react-dom 的 package 内部使用的 react 依赖，必须解析为同一个模块。
如果这些 react 依赖解析为两个不同的导出对象，你就会看到本警告。这么分析完应该就是我封装的组件中依赖的 react 和 react-dom 的版本号和主工程中所依赖的 react 和 react-dom 的版本号不一致导致的。

找到了导致报错的原因，那么要如何解决呢？

现在想要实现的效果是：

在我开发的 packageA 里面依赖的 `react` 和 `react-dom` 的版本号应该和主系统中安装的 `react` 和 `react-dom` 的版本号保持一致，并且 packageA 被安装到主系统中之后，就应该依赖于主系统中的 `react` 和 `react-dom`。

继续看完文档，其中有一句话引起了我的注意：

> For example, maybe a library you’re using incorrectly specifies react as a dependency (rather than a peer dependency).

这里提示我说我使用的库可能错误地指定 `react` 作为 `dependency`（而不是 `peer dependency`）。

很好，这里出现了一个 `package.json` 中的配置项叫做 `peerDependencies`,正常开发中我们经常接触到 `dependencies` 和 `devDependencies`, 那么 `peerDependencies` 又是什么鬼？

## 初识peerDependencies

`peerDependencies` 在我们进行一些插件开发的时候会经常用到，比如 `jQuery-ui` 的开发依赖于 `jQuery`，`html-webpack-plugin` 的开发依赖于 `webpack`等。

总结一下有如下特点：

* 插件正确运行的前提是，核心依赖库必须先下载安装，不能脱离核心依赖库而被单独依赖并引用；
* 插件入口api 的设计必须要符合核心依赖库的规范；
* 插件的核心逻辑运行在依赖库的调用中；
* 在项目实践中，同一插件体系下，核心依赖库版本最好是相同的；

举个栗子🌰：

假设现在有一个 helloWorld 工程,已经在其 package.json 的 `dependencies` 中声明了 packageA，有两个插件 plugin1 和 plugin2 他们也依赖 packageA，如果在插件中使用 `dependencies` 而不是 `peerDependencies` 来声明 packageA，那么 `$ npm install` 安装完 plugin1 和 plugin2 之后的依赖图是这样的：

```
.
├── helloWorld
│   └── node_modules
│       ├── packageA
│       ├── plugin1
│       │   └── nodule_modules
│       │       └── packageA
│       └── plugin2
│       │   └── nodule_modules
│       │       └── packageA
```

从上面的依赖图可以看出，helloWorld 本身已经安装了一次packageA，但是因为因为在
plugin1 和 plugin2 中的 `dependencies` 也声明了 packageA，所以最后 packageA 会被安装三次，有两次安装是冗余的。

而 `peerDependency` 就可以避免类似的核心依赖库被重复下载的问题。

如果在 plugin1 和 plugin2 的 package.json 中使用 `peerDependency` 来声明核心依赖库，例如：

**`plugin1/package.json`**

```
{
  "peerDependencies": {
    "packageA": "1.0.1"
  }
}
```

**`plugin2/package.json`**

```
{
  "peerDependencies": {
    "packageA": "1.0.1"
  }
}
```

在主系统中声明一下 packageA:

**`helloWorld/package.json`**

```
{
  "dependencies": {
    "packageA": "1.0.1"
  }
}
```

此时在主系统中执行 `$ npm install` 生成的依赖图就是这样的：

```
.
├── helloWorld
│   └── node_modules
│       ├── packageA
│       ├── plugin1
│       └── plugin2
```

可以看到这时候生成的依赖图是扁平的，packageA 也只会被安装一次。

因此我们总结下在插件使用 `dependencies` 声明依赖库的特点：

* 如果用户显式依赖了核心库，则可以忽略各插件的 `peerDependency` 声明；
* 如果用户没有显式依赖核心库，则按照插件 `peerDependencies` 中声明的版本将库安装到项目根目录中；
* 当用户依赖的版本、各插件依赖的版本之间不相互兼容，会报错让用户自行修复；

## 总结

明白了 `peerDependencies` 的用法，那么回到开头的问题来，问题就迎刃而解了。

首先在主系统的 `package.json` 中的 `dependencies` 声明下 `react` 和 `react-dom` 的版本：

`主系统package.json`

```
{
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
}
```

接着在组件库的 `package.json` 中的 `peerDependencies` 声明 `react` 和 `react-dom` 的版本：

`组件的package.json`

```
{
  "peerDependencies": {
    "react": ">=16.12.0",
    "react-dom": ">=16.12.0"
  }
}
```

这样在主系统中执行 `$ npm install` 之后，主系统和组件库就能共用主系统的 `node_module` 中安装的 `react` 和 `react-dom` 了。

到这里，终于可以大声喊出一句 "奥利给！"，问题圆满解决ღ( ´･ᴗ･` )比心。
