## M、第三方库

常用方式：

1、webpack.providePlugin

2、imports-loader

3、window

  

1、webpack.providePlugin  

```
resolve: {    
  alias: { // 指名jquery寻找的路径，这个适合于手动引入的库，而不是node_modules      
    jquery$: path.resolve(__dirname, './libs/jquery.js')    
  }  
},  
plugins: 
[    
  new autoClean(),    
  new webpack.ProvidePlugin({      
    _: 'lodash', // 从node_modules中去寻找      
    $: 'jquery'    
  })  
]
```

  

2、imports-loader

webpack3中modul.rules最后写上：

```
{
        test: path.resolve(__dirname, './index.js'),
        use: [
          {
            loader: 'imports-loader',
            options: {
              _: 'lodash'
            }
          }
        ]
      }
```

  
done