const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            hash: true,
            inject: true,
        }),
        new HtmlWebpackPlugin({
            filename: 'case.html',
            template: path.resolve(__dirname, '../src/static/views/case.html'),
            hash: true,
            inject: true,
        })
    ],
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                    name: '[name].[ext]'
                }
            }, {
                test: /\.(mov|mp4)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'videos',
                    name: '[name].[ext]'
                }
            }, {
                test: /\.(woff|woff2|otf|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts'
                }
            }
        ]
    }
}