/*
* @Author: Archie
* @Date:   2017-08-09 11:19:35
* @Last Modified by:   Archie
* @Last Modified time: 2017-08-10 20:33:52
*/
var webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置

//获取html-webpack-config参数的方法
var getHtmlConfig =function(name){
    return{
        template: './src/view/'+name+'.html',
        filename: 'view/'+name+'.html',
        inject: true,
        hash: true,
        chunks: ['common',name]
    }
}


//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
    	'index' : ['./src/page/index/index.js'],
    	'login' : ['./src/page/login/index.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    externals: {
    	'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            { 
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                loader: 'url-loader?limit=100&name=resource/[name].[ext]' 
            },
            { 
                test: /\.string$/, 
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        //独立通用模块到base.js
    	new webpack.optimize.CommonsChunkPlugin({
    		name: 'common',
    		filename: 'js/base.js'
    	}),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ],
    devServer: {
        historyApiFallback: true,
        inline: true,
        //注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    }
 };

module.exports = config;

