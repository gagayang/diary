## F、js Tree Shaking

场景： 

1、常规优化

2、第三方资源包的只用到了一两个函数工具，然后整个库都引入了

  

比如我们写了如下三个方法：  

```
export function aaa () {
  return 'aaa'
}


export function bbb () {
  return 'bbb'
}


export function ccc () {
  return 'ccc'
}
```

  
在别的js文件中只引用了aaa，打包结果，只是提示没有使用，但是不会删除：

```
/***/ (function(module, __webpack_exports__, __webpack_require__) {


"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = aaa;
/* unused harmony export bbb */
/* unused harmony export ccc */
function aaa() {
  return 'aaa';
}
function bbb() {
  return 'bbb';
}
function ccc() {
  return 'ccc';
}


/***/ })
/******/ ]);
```

  

插件：

```
 plugins: [
      new webpack.optimize.UglifyJsPlugin()
  ]
```

  
结果：代码被压缩，并且只留下aaa函数

```
...){"use strict";function r(){return"aaa"}e.a=r}]);...
```

  

## 对于第三方库：lodash，babel-polyfill同样生效

额外思考：

比如lodash，我们通过上面的配置，可以将lodash从500kb+压缩到70kb+，但是教程里面通过插件babel-plugin-lodash的配置，可以压缩到几kb，这个可以再尝试尝试