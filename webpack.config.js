/*
loader: 1 download 2 use
plugins: 1 download 2 import 3 use
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    //loader配置
    module: {
        rules: [
            {
                // 下载style-loader css-loader
                test: /\.css$/,
                // use数组中loader执行顺序， 右->左 下->上
                use: [
                    // 创建style标签，将js中样资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，里边内容是样式字符串
                    'css-loader'
                ]
            },
            {
                // 下载less less-loader
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 下载less less-loader
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                exclude: /\.(css|js|html|less|jpg|png)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
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
                    esModule: false,
                    name: '[hash:10].[ext]'
                }
            },
            {
                // 处理html的img
                test: /\.html$/,
                loader: 'html-loader',
            },

        ]
    },
    // plugins配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],

    mode: 'development',
    // mode: 'production',

    // 开发服务器devServer
    // 自动化（自动编译，自动打开浏览器，自动刷新～～）
    // 启动命令-> npx webpack server
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    }
};
