/*
    开发环境配置
    loader: 1 download 2 use
    plugins: 1 download 2 import 3 use
    运行指令
        webpack 
        npx webpack serve
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    //loader配置
    module: {
        rules: [
            {
                // 下载less less-loader style-loader css-loader
                test: /\.less$/,
                // use数组中loader执行顺序， 右->左 下->上
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                // 下载 url-loader file-loader
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                //图片小于8kb，就会被base64处理
                // 优：减少请求数量（减轻服务器压力）
                // 缺：图片体积更大（文件请求速度更慢）
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule: false, // 关闭es6模块化
                    outputPath: 'images',
                }
            },
            {
                // 处理html中img
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                exclude: /\.(html|js|css|scss|less|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'media',
                }
            },

        ]
    },
    // plugins配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    mode: 'development', // mode: 'production',

    // 开发服务器devServer
    // 自动化（自动编译，自动打开浏览器，自动刷新～～）
    // 启动命令-> npx webpack server
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        port: 3000,
        open: true
    }
};
