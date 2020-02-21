module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
    '@storybook/addon-notes/register-panel',
    '@storybook/addon-storysource',
    'storybook-dark-mode',
  ],
  webpackFinal: config => {
    config.module.rules= [
      {
          test: /\.scss$/,
          use: [
              { loader: 'style-loader', options: { sourceMap: true } },
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } },
          ],
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
          use: [{ loader: 'file-loader' }],
      },
      {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
              {
                  loader: 'url-loader',
                  options: {
                      limit: 10000,
                      mimetype: 'image/svg+xml',
                  },
              },
          ],
      },
      {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
              loader: 'file-loader',
              options: {
                  name: 'assets/fonts/[name].[ext]',
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
      {
          test: /\.stories\.tsx?$/,
          loaders: [
              {
                  loader: require.resolve('@storybook/addon-storysource/loader'),
                  options: { parser: 'typescript' },
              },
          ],
          enforce: 'pre',
      },
    ];

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};