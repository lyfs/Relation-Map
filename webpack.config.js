const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
    return path.resolve(__dirname, dir)
}

module.exports = {
    // 指定构建环境  
    mode: "development",
    // 入口
    entry: "./relationCore/web/index.jsx",
    resolve: { extensions: ['.jsx', '.js', ] },
    // 出口
    output: {
        path: resolve("./relationCore/web/dist"),
        filename: "js/[name].[hash].js",
        publicPath: "/" // 打包后的资源的访问路径前缀
    },
    // 模块
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react']
            }
        }]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('./relationCore/web/index.html'),
            filename: resolve('./relationCore/web/dist/index.html'),
            inject: true,
            hash: true,
            minify: {
                removeComments: true, //去注释
                collapseWhitespace: true, //压缩空格
            }
        })
    ],
    // 开发环境本地启动的服务配置
    devServer: {
        contentBase: './relationCore/web/dist',
        host: 'localhost',
        port: 8080,
        open: true,
    }
}