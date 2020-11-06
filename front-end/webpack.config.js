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
                test: /\.(png|jpg|svg)/,
                use: {
                    loader: 'url-loader',
                    options: {limit: 90000}
                }
            },
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
            },
            {
                test: /\.ttf$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      name: './font/[name].[ext]',
                    },
                  },
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'public','index.html'),
            title: 'Plugins'
        })
    ]
}