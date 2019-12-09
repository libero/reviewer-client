/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const commonConfig = merge([
    {
        entry: {
            main: './index.tsx',
            config: './config.ts',
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: 'index.ejs',
                filename: 'index.html',
                inject: false
            }),
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
        },
    },
]);

const developmentConfig = merge([
    parts.output({ filename: '[name].bundle.js' }),
    parts.devServer(),
    parts.loaders(),
    parts.copyFiles(),
    parts.generateSourceMaps({ type: 'eval' })
]);

const productionConfig = merge([
    parts.output({ filename: '[name].[contenthash].js' }),
    parts.clean(),
    parts.loaders(),
    parts.minifyCSS(),
    parts.minifyJS(),
    parts.splitBundles(),
    parts.copyFiles(),
    parts.generateSourceMaps({ type: 'source-map' }),
    parts.newRelic(),
]);

module.exports = mode => {
    if (mode === 'production') {
        return merge(commonConfig, productionConfig, { mode })
    } else {
        return merge(commonConfig, developmentConfig, { mode })
    }
}


