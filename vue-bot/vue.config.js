module.exports = {
  configureWebpack: (config) => {
    // add new rules
    config.module.rules.push({
      test: /\.coffee$/,
      use: ['coffee-loader'],
    });
    // modify existing one
    // use wabpack chain
    const imgRuleIndex = config.module.rules.findIndex((index) => index.test.source.includes(('png|jpe?g|gif')));
    const newRule = {
      test: /\.(png|jpe?g|gif)(\?.*)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            limit: 5000,
            name: 'img[name].[hash:8].[ext]',
          }
        },
      ],
    };
    config.module.rules.splice(imgRuleIndex, 1, newRule);
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigins: true,
      },
    },
  },
};
