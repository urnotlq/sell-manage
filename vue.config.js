module.exports = {
    // 打包上线配置项
    productionSourceMap: false, // 去掉打包生成的map文件
    assetsDir: 'static', // 静态资源目录名称
    publicPath: './', // 打包后的位置（与静态资源同时使用 ！必须项）
    // webpack配置项
    configureWebpack: config => {
        return {
            // 外部扩展 ————使用cdn引入库 
            // 1、在public/index.html 的head中引入script和css标签
            // 2、在src 中找到引入插件语句 import..  注释掉
            externals: {
                // '插件名': '全局变量'
                'echarts': 'echarts',
                // 'vue': 'Vue',
                // 'element-ui': 'ELEMENT',
                // 'vue-router': 'VueRouter',
            },
        }
    },

    css: { //css处理器
        loaderOptions: {
            sass: {
                //prependData: `@import "~@/assets/scss/_setting.scss";`, 前面加不加~都行 也可以混合
                prependData: `@import "@/assets/scss/_setting.scss";@import "~@/assets/scss/_mixin.scss";`,
            },
        },
    },
}