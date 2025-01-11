import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.tsx',
    mode: isDev ? 'development' : 'production',
    output: {
        filename: isDev ? '[name].js' : '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true,
            }),
            new CssMinimizerWebpackPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                },
            },
        },
    },
    devServer: {
        port: 8080,
        hot: true,
        open: true,
        historyApiFallback: true,
        client: {
            overlay: true,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[contenthash].css',
        }),
        new DotenvWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['ts', 'tsx'],
            failOnError: isProd,
        }),
        isDev && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: isDev,
                        },
                    },
                ],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: isDev
                                    ? '[name]__[local]--[hash:base64:5]'
                                    : '[hash:base64:8]',
                            },
                            sourceMap: isDev,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024,
                    },
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    devtool: isDev ? 'eval-source-map' : false,
};

export default config;
