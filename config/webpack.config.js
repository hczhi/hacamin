const HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    path = require('path'),
    vue = require('vue'),
    glob = require('glob'),
    fs = require('fs'),
    os = require('os'),
    UglifyJsParallelPlugin = require('webpack-uglify-parallel'),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),


    entries = {}, // js入口
    newEntries = {},
    buildRoot = 'build/',
    jsRoot = 'src/js/',
    htmlRoot = 'src/html/',
    htmls = glob.sync('src/html/**/*.html'),
    htmlCfgs = []; // HtmlWebpackPlugin配置项
//动态获取入口文件，使得html、js的路径一致
htmls.forEach((filepath) => {
    let paths = filepath.split('/'), // 以 html/user_center/index.html 截断成数组为例
        file = paths.pop(), // 如 index.html
        path = paths.join('/') + '/', // 如html/user_center/
        names = /^([\s\S]+).html$/i.exec(file),
        devPath = path, // 如html/user_center/
        prefix = devPath.slice(htmlRoot.length); // 如user_center/;
    if (names) {

        newEntries[prefix + names[1]] = [__dirname + '/' + jsRoot + prefix + names[1]];

        //生成html文件
        htmlCfgs.push(new HtmlWebpackPlugin({
            filename: prefix + names[1]+'.html', //http访问路径
            template: __dirname + '/src/html/'+prefix + names[1]+'.html', //实际文件路径
            inject: 'body',
            //templateContent: contentText,
            chunks: ['vendor','commons', prefix + names[1]],
            //排序
            chunksSortMode: 'manual'
        }));
    }
});
console.log(newEntries,"==========")
//公共依赖
/*newEntries.vue = [path.resolve(__dirname, 'src/commonjs/js/vue.js')];
newEntries.zepto = [path.resolve(__dirname, 'src/commonjs/js/zepto.js')];*/

htmlCfgs.push(new MiniCssExtractPlugin({
    filename: 'css/[name].css'
}));

htmlCfgs.push(new OptimizeCssAssetsPlugin({
  assetNameRegExp:  /\.css$/g,
  cssProcessor: require('cssnano'),
  cssProcessorOptions: { discardComments: { removeAll: true } },
  canPrint: true
}));


if (process.env.NODE_ENV) {
    
    //转移目录文件
    htmlCfgs.push(
        new CopyWebpackPlugin((() => {
            let copyList = [
                    {
                        from: 'src/commonjs/js',
                        to: 'build/js/commonjs/js'
                    },
                    {
                        from: 'src/commonjs/css',
                        to: 'build/js/commonjs/css'
                    },
                    /*{
                        from: 'src/images',
                        to: 'build/images'
                    },
                    {
                        from: 'src/fonts',
                        to: 'build/fonts'
                    }*/
                ],
                arr = [];

            copyList.forEach((v) => {
                arr.push({
                    from: path.resolve(__dirname, v.from),
                    to: path.resolve(__dirname, v.to)
                });
            });
            return arr;
        })())
    );
}

module.exports = {
    entry: newEntries,
    output: {
        path: path.resolve(__dirname, buildRoot),
        filename: "js/[name].js?v=" + new Date().getTime()
    },

    module: { //在配置文件里添加JSON loader
        rules: [{
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', //在webpack的module部分的loaders里进行配置即可
                query: {
                    presets: ['es2015']
                }
            },
            // 为了统计代码覆盖率，对 js 文件加入 istanbul-instrumenter-loader
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                include: /src|packages/,
                enforce: 'post',
                use: [{
                    loader: "istanbul-instrumenter-loader",
                    options: {
                        esModules: true
                    },
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader?name=images/[name].[ext]'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader?name=font/[name].[ext]'
                }]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'style-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            // Provide path to the file with resources
                            resources: ['./src/commonjs/css/global.scss', './src/commonjs/css/mixins/mixins.scss']
                          },
                    },
                ]                
                
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            'scss': 'style-loader!css-loader!sass-loader!post-loader',
                            // 为了统计代码覆盖率，对 vue 文件加入 istanbul-instrumenter-loader
                            preLoaders: {
                                js: 'istanbul-instrumenter-loader?esModules=true'
                            }
                        }
                    }
                }]
            }, 
            {
              test: path.resolve(__dirname, 'src/commonjs/js/zepto.js'),
              loader: 'exports-loader?window.Zepto!script-loader'
            }

        ]
    },

    //webpack 4.x 新增写法
    optimization: {
        splitChunks: {
            cacheGroups: {
                //打包重复出现的代码
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    name: "vendor",
                    priority: -10,
                    enforce: true
                },
                //打包第三方类库
                commons: {
                    test : /\.js$/, 
                    chunks: "initial",
                    name: "commons",
                },
                styles: {
                  name: 'styles',
                  test: /\.css$/,
                  chunks: 'initial',
                }
            }   
        }
    },

    resolve: {
        alias: {
            // vue: path.resolve(__dirname, 'src/commonjs/js/vue.js'),
            //zepto: path.resolve(__dirname, 'src/commonjs/js/zepto.js'),
            _vue: path.resolve(__dirname, 'src/components'),
            _css: path.resolve(__dirname, 'src/css'),
            _com: path.resolve(__dirname, 'src/commonjs'),
        },
        //extensions: ['.js', '.vue', '.json'],
    },

    
    plugins: htmlCfgs,

    externals: {
        vue: 'Vue',
        zepto: 'Zepto'
    },


    devServer: {
        contentBase: "./src", //本地服务器所加载的页面所在的目录
        //historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true,
        host: 'localhost', //改成本机ip地址或'localhost'，用Ip地址的目的是让局域网的网段都可以访问该服务
        port: 9191
    },
};