const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: 'development',
    devtool: 'source-map',
    resolve: { // 解析
        modules: [ // 模块1
            path.resolve(__dirname, ''), // 根目录下 解析 根目录下vue文件夹index.js为入口
            path.resolve(__dirname, 'node_modules') // node_modules
        ]
    },
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        })
    ]
};

module.exports = config;