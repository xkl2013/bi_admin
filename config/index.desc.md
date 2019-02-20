#  index.js  文件用于config文件的整体配置
## 选用插件及依赖
```
- happypack                  开辟进程提升编译速度   参考地址:https://www.jianshu.com/p/b9bf995f3712
- mini-css-extract-plugin    只在webpack4能用 参考地址:https://www.jianshu.com/p/91e60af11cc9
- cache-loader               在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里。
-
```

## dev环境下
- portfinder                 用于寻找端口插件,
- friendly-errors-webpack-plugin   用于优雅的将抛出error
- node-notifier                    用于优雅的总端输出异常错误



## build下配置