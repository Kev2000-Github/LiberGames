const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
    entry: {
        index: path.resolve(__dirname,'src')
    },
    output: {
        path: path.resolve(__dirname,'public','dist'),
        filename: 'bundle-[name].js'
    },
    mode:'development',
    devServer:{
        historyApiFallback: true
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use: ['style-loader','css-loader'],
            },
            {
                test: /\.html/,
                use: 'html-loader',
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'public','index.html'),
            title: 'Plugins'
        })
    ]
}