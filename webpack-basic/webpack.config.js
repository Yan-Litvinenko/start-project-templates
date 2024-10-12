const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    entry: path.resolve(__dirname, './src/js/index.js'),
    mode: 'development',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
    },
    plugins: addPlugins(),
    optimization: optimization(),
    resolve: {
        extensions: ['.js'],
        fallback: {
            util: false,
        },
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 8080,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]__[local]___[hash:base64:5]',
                            },
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]__[local]--[hash:base64:5]',
                            },
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(mp3|wav|ogg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|woff|woff2)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|jpg|jpeg|svg|avif|webp|ico$)/,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};

function optimization() {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    };

    if (isProd) {
        config.minimizer = [
            new TerserWebpackPlugin(),
            new CssMinimizerWebpackPlugin(),
        ];
    }

    return config;
}

function addPlugins() {
    const plugins = [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        // new FaviconsWebpackPlugin({
        //     logo: './src/assets/images/favicon.png',
        //     cache: true,
        //     inject: true,
        //     favicons: {
        //         background: '#000',
        //         icons: {
        //             android: true,
        //             appleIcon: true,
        //             favicons: true,
        //             windows: false,
        //             yandex: false,
        //             firefox: false,
        //             coast: false,
        //             appleStartup: false,
        //         },
        //     },
        // }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
        new DotenvWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ];

    if (isDev) {
        plugins.push(new ESLintPlugin({ extensions: ['.js'] }));
    }

    return plugins;
}
