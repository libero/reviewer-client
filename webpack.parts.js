const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const HtmlInjectNewRelicPlugin = require('./webpack/html-inject-newrelic');

const infraConfigPath = process.env.INFRA_CONFIG_PATH ? process.env.INFRA_CONFIG_PATH : '/etc/reviewer/config.infra.json';
const publicConfigPath = process.env.PUBLIC_CONFIG_PATH ? process.env.PUBLIC_CONFIG_PATH : '/etc/reviewer/config.public.json';
let infraConfig;

if (fs.existsSync(infraConfigPath)) {
    infraConfig = JSON.parse(fs.readFileSync(infraConfigPath, 'utf8'));
} else {
    infraConfig = {
        "port": 9000,
        "client_api_proxy_url": "http://localhost:3003/graphql",
        "client_token_exchange_proxy_url": "http://localhost:3003/authenticate/",
        "new_relic_client_license_key": "",
        "new_relic_client_app_id": ""
    };
}

exports.devServer = () => ({
    devServer: {
        stats: 'errors-only',
        host: process.env.HOST,
        historyApiFallback: true,
        port: infraConfig.port,
        open: true,
        overlay: true,
        hot: true,
        proxy: {
            '/graphql': {
                target: infraConfig.client_api_proxy_url,
                changeOrigin: true,
            },
            '/auth/': {
                target: infraConfig.client_auth_proxy_url,
                pathRewrite: {'^/auth': ''},
                changeOrigin: true
            },
            '/config': {
                bypass: function () {
                    return publicConfigPath;
                }
            }
        },
    },
});

exports.loaders = () => ({
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader', options: {sourceMap: true}},
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ]
            },
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                    },
                ],
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    { loader: 'file-loader' },
                ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml'
                    }
                }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "assets/fonts/[name].[ext]",
                    },
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
        ],
    },
});

exports.clean = () => ({
    plugins: [new CleanWebpackPlugin()],
});

exports.minifyCSS = () => ({
    plugins: [
        new OptimizeCssAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true,
                },
                safe: true,
            },
            canPrint: false,
        }),
    ],
})

exports.minifyJS = () => ({
    optimization: {
        minimizer: [new TerserPlugin({ sourceMap: true })],
    }
})

exports.splitBundles = () => ({
    plugins: [
        // Ignore all locale files of moment.js
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        },
    }
})

exports.output = ({ filename }) => ({
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename,
    }
})

exports.copyFiles = () => ({
    plugins: [
        new CopyPlugin([
            { from: './src/core/locales', to: path.resolve(__dirname, 'dist', 'locales') }
        ])
    ]
})

exports.generateSourceMaps = ({ type }) => ({
    devtool: type
})

exports.newRelic = () => ({
    plugins: [
        new HtmlInjectNewRelicPlugin({
            license: infraConfig.new_relic_client_license_key,
            applicationID: infraConfig.new_relic_client_app_id,
        }),
    ],
})