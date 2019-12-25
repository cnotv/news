module.exports = {
  devServer: {
    proxy: {
      '^/r': {
        target: 'https://www.reddit.com',
        ws: true,
        changeOrigin: true
      },
    },
  },
}
