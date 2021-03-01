# uniapp2wxpack自定义插件  
### 此插件的作用是修正部分uniapp版本打包之后easycom配置的node-modules目录为绝对路径  
**!!! 必须在uniapp2wxpack 3.4.0及以上使用**  
````javascript
// projectToSubPackageConfig.js
module.exports={
    // ......以上配置部分省略
    // 插件
    plugins: [
        // 条件编译插件应该在混写插件之前使用
        'jsPreProcessPlugin', // js条件编译
        'cssPreProcessPlugin', // css条件编译
        'htmlPreProcessPlugin', // html条件编译
        'setLibrary',
        require('./correctNodeModulesPath')
    ]
}

````
