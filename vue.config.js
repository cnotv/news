module.exports = {
  devServer: {
    proxy: {
      '^/desktopapi': {
        target: 'https://gateway.reddit.com/desktopapi',
        ws: true,
        changeOrigin: true
      },
      '^/r': {
        target: 'https://www.reddit.com',
        ws: true,
        changeOrigin: true
      },
    },
  },
  pwa: {
    name: 'cnotv-news',
    themeColor: '#333333',
    msTileColor: '#333333',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      display: 'portrait',
      background_color: '#333333'
    },
  }
}
