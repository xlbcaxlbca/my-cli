const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output:{
        filename: "[name].[hash:6].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    mode: "development",
    module:{
        rules: [
            //处理css
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            //处理scss
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
                options: {
                    presets: ["es2015"]
                }
            },
            //处理图片
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash:6].[ext]"
                        }
                    }
                ]
            },
            //处理字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[hash:6].[ext]"
                        }
                    }
                ]

            },
            //vue
            {
                test: /\.vue$/,
                use: ["vue-loader"]
            }
        ]
    },
    plugins: [
        //删除文件------npm run build才会在dist中反应出来，devServer模式不会。 
        // new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({template : 'src/index.html'}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({ 
            _: "lodash",
            $: "jquery"
        })
    ],
    //server
    devServer:{
        contentBase: path.resolve(__dirname, "dist"),
        inline: true,
        hot: true
    },
    resolve:{
        modules:["node_modules"],
        extensions: [".js", ".json", ".vue", ".css"],
        alias: {
            "vue$": 'vue/dist/vue.esm.js'
        },
    },
    //打包时排除依赖
    externals: {
        jquery: "jQuery",
        lodash: {
            commonjs: "lodash",
            amd: "lodash",
            root: "_" // indicates global variable
        }
    }
}