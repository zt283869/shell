"use strict"
var path =require("path");

module.exports = {
    entry:[path.resolve(__dirname,"app/main")],
    output:{
        filename:"main.bundle.js",
        path:path.resolve(__dirname,"build")
    },
    resolve:{
        alias:{
            "vue":"vue/dist/vue.js"
        }
    },
    module:{
        rules:[
            {test:/\.vue$/,loader:"vue-loader"},
            {test:/\.css$/,loader:"style-loader!css-loader"},
            {test:/\.js$/,
                exclude: /node_modules/,
                loader:"babel-loader",
                query:{presets:["es2015","stage-1"],
                    plugins: ['transform-runtime', ["component", [
                        { "libraryName": "mint-ui", "style": true }
                    ]]] }
            },
            { test: /\.(eot|svg|ttf|woff|woff2)$/ , loader: 'file-loader' }
        ]
    }
}