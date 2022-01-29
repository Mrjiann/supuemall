module.exports = {
    configureWebpack: {
        resolve: {
            // 有些路径的后缀就可以不写了，cli3默认已经配置了，可以配置了
            // extensions:[],
            alias: {
                // 内部已经配置了@别名
                // '@':'src',
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}