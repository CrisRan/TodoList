const   HtmlWebpack     =   require('html-webpack-plugin'),
        MiniCssExtract  =   require('mini-css-extract-plugin'),
        CopyPlugin      =   require('copy-webpack-plugin'),
        CssMinimizer    =   require('css-minimizer-webpack-plugin'),
        Terser          =   require('terser-webpack-plugin');
        
module.exports = {
    mode:'production',
    output: {
        clean: true,
        filename:'main.[contenthash].js' //Nombre del archivo index.js
    },
    module: {
        rules:[
            {
                test:/\.html$/,
                loader:'html-loader',
                options:{
                    sources:false
                }
            },
            {
                test:/\.css$/,
                exclude:/style.css$/,
                use:['style-loader', 'css-loader']
            },
            {
                test:/style.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test:/\.(png|jpe|gif)$/,
                loader:'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    optimization:{
        minimize: true,
        minimizer:[
            new CssMinimizer(),
            new Terser()
        ]
    },
    plugins:[
        new HtmlWebpack({
            title: 'Mi webpack app',
            filename:'index.html',
            template:'./src/index.html'
        }),
        new MiniCssExtract({
            filename:'[name].[fullhash].css',
            ignoreOrder:false
        }),
        new CopyPlugin({
            patterns:[
                {from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]

}