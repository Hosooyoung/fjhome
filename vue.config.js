module.exports = {
    devServer: {
        overlay: false,
        proxy: {
            '/api': {
                target: 'http://localhost:9090/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    outputDir: '../svr/public'
}