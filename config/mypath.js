module.exports = {
    devHtmls: 'src/components/*/*.html',
    buildRoot: '../../../ying/ycf_demo/m/', //测试联调模式文件生成路径
    testHtmls: 'src/components/*/*/*.html',  
    cdnRoot: './ying/ycf_demo/m/',//cdn文件生成路径
    cdnPath: './ying/ycf_demo/m',//cdn文件访问地址
    version:'1.0',//版本号
    publicPath:'http://localhost:9191/',//本地开发模式
    testPublicPath:'/ying/ycf_demo/m' //测试联调模式文件访问地址
}