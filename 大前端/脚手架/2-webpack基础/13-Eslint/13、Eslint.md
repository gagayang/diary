## 13、Eslint

eslint  
eslint-loader  
eslint-plugin-html（检查html中的js）  
eslint-friendly-formatter(警告/错误提示)

配置eslint的地方：（三选一）

1、webpack config  
2、根目录.eslintrc.\*文件  
3、package.json中的eslintConfig

标准来源：[JavaScript Standard Style](https://standardjs.com/)

插件：  
eslint-config-standard  
eslint-plugin-promise  
eslint-plugin-standard  
eslint-plugin-import  
eslint-plugin-node  
eslint-config-xxx

eslint-loader的options：  
options.failOnEarning（默认false，如果是true，出现错误或者警告都会编译失败，并且通过failOnError来抛出错误/警告）  
options.failOnError  
options.formatter (设置友好提示)  
options.outputReaport(输出错误/警告的报告)

devServer.overlay :让错误/警告直接在浏览器上展示出来

### 练习

```
1npm i eslint eslint eslint-loader eslint-plugin-html eslint-friendly-formatter -S

```

在webpack.config.js中配置：

```
123456789101112131415161718{
 test: /\.js$/,
 use: [
   {
     loader: 'babel-loader',
     options: {
       presets: ['env'],
       plugins: ['lodash']
     }
   },
   {
     loader: 'eslint-loader',
     options: {
       formatter: require('eslint-friendly-formatter')
     }
   }
 ]
}

```

安装插件:

```
1234567npm i 
eslint-config-standard
eslint-plugin-promise
eslint-plugin-standard
eslint-plugin-import
eslint-plugin-node
-S

```

在根目录新建：.eslintrc.js:

```
1234567891011121314151617181920{
  test: /\.js$/,
  include: [path.resolve(__dirname, 'src')],
  exclude: [path.resolve(__dirname, 'src/libs')], // 如果libs中人为引用了第三方库
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: ['env'],
        plugins: ['lodash']
      }
    },
    {
      loader: 'eslint-loader',
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }
  ]
}

```

我们在之前的配置中，有三种情况可以引入jquery到全局，有的引入方式在当前配置到标准的eslint中会报警告，所以看情况选取一种进行配置，同时，这种eslint的标准配置会导致我们引入的全局变量报警告，这个时候，需要在eslinttrc.js文件中将这个人为加入的全局变量进行声明：

```
1234567891011121314module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'html' // 这个就是eslint-plugin-html
  ],
  golbals: {
    $:true
  },
  rules: {
    'indent': ['error', 4], // 锁进变成4
    'eol-last': ['error', 'never'] // 去掉最后一行代码必须回车
  }
}
```