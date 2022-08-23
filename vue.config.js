module.exports = {
    css: { //css处理器
        loaderOptions: {
            sass: {
                //prependData: `@import "~@/assets/scss/_setting.scss";`, 前面加不加~都行 也可以混合
                prependData: `@import "@/assets/scss/_setting.scss";@import "~@/assets/scss/_mixin.scss";`,
            },
        },
    },
}