/* 适配table宽度 */

// 将所有相关的js逻辑抽离到该文件中
export default {
    // 数据
    data() {
        return {
            // 表格宽度初始化最小值
            tableWidth: 514,
        }
    },
    // 方法
    methods: {
        // 计算table宽度  保留最小宽度
        calcTableWidth() {
            if (document.body.clientWidth > 754)
                this.tableWidth = document.body.clientWidth - 291;
        },
    },
    // 生命周期
    // 页面更新的生命周期操作DOM
    mounted() {
        // 初始化计算table宽度
        this.calcTableWidth();
        // 屏幕拉伸执行
        window.addEventListener('resize', this.calcTableWidth);
    },
    // 页面销毁前的生命周期 清除挂载在全局window的属性和方法
    beforeDestroy() {
        window.removeEventListener('resize', this.calcTableWidth);
    },
}