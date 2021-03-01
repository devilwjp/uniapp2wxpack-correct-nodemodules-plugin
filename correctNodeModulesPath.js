/**
 * (必须在uniapp2wxpack 3.4.0及以上版本使用) uniapp2wxpack自定义插件，用于projectToSubPackageConfig.js的plugins中
 * 此插件的作用是修正部分uniapp版本打包之后easycom配置的node-modules目录为绝对路径
 * 修改绝对路径为相对路径
 */
const path = require('path')
const env = process.env.NODE_ENV === 'production' ? 'build' : 'dev'
// // uniapp打包后的原始路径
const basePath = path.resolve(process.cwd(), `./dist/${env}/mp-${process.env.PACK_TYPE}`)
function correctNodeModulesPath (content, {fromAbsolute, fromRelative}) {
    let updated = false
    if (path.extname(fromAbsolute) !== '.json') return content
    if (!fromAbsolute.startsWith(basePath)) return content

    // 判断来自于uni-app编译目录的json文件
    const json = JSON.parse(content)
    const {usingComponents} = json


    if (!usingComponents || typeof usingComponents !== 'object') return content

    Object.keys(usingComponents).forEach((componentName) => {
        const componentPath = usingComponents[componentName]
        if (!componentPath.startsWith('/node-modules')) return

        //判断路径是 /node-modules开头
        updated = true
        usingComponents[componentName] = path.relative(path.dirname(`/${fromRelative}`), componentPath).replace(/\\/g, '/')
    })
    // 输出修改后的json
    if (updated) return JSON.stringify(json)

    return content
}
module.exports = correctNodeModulesPath
