const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = ['react', 'react-dom', 'react-bootstrap'];

const config = {
    entry: {
        bundle: path.join(__dirname, 'src', 'index.js'),
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'build'),        
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: 'style.css'}),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: '../index.html'
        }),
        new UglifyJSPlugin()
    ]
}

module.exports = config;