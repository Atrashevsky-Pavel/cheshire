const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const optimization = () => {
    const config = {};
    if (isProd) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            },
                        },
                    ],
                }
            }),
            new TerserWebpackPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false
            })
        ]
    }
    return config;
};
//'whatwg-fetch'
// '@babel/polyfill',
module.exports = {
    mode: 'development',
    entry: {
        main: [ './src/index.js'],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),

    devServer: {
        port: 4200,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    devtool: isDev ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        }
                    },
                    "postcss-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                use: ['file-loader']
            }

        ]
    }
};

if (isDev) {
    module.exports.plugins.push(
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    )
}

// "browserslist": "> 0.5%, not dead",
