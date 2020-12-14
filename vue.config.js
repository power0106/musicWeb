module.exports = {
    publicPath: './',
    devServer: {
        proxy: { //解决跨域问题
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/
                target: 'https://autumnfish.cn/',
                // target: 'http://m.kugou.com/',
                // target: 'http://mobilecdnbj.kugou.com/v3',
                // 允许跨域
                changeOrigin: true,
                // ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};