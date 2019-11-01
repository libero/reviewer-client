module.exports = ({ config }) => {
    config.module.rules.push(
        {
            test: /\.scss$/,
            use: [
                { loader: 'style-loader', options: { sourceMap: true } },
                { loader: 'css-loader', options: { sourceMap: true } },
                { loader: 'sass-loader', options: { sourceMap: true } },
            ],
        },
        {
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('awesome-typescript-loader'),
                },
            ],
        },
    );
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
