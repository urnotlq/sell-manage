<template>
    <div>
        <!-- 搜索表单 -->
        <div class="search">
            <span>时间范围</span>
            <el-date-picker
            size="small"
            value-format="yyyy-MM-dd HH:mm:ss" 
            v-model="date" 
            type="datetimerange"
            range-separator="至" 
            start-placeholder="开始日期" 
            end-placeholder="结束日期">
            </el-date-picker>
            <el-button size="small" type="primary" @click="getData">查询</el-button>
        </div>
        <!-- echarts图表 -->
        <div class="my-chart" ref="chartRef"></div>
    </div>
</template>

<script>
// 引入ajax函数
import { getOrderTotalReq } from '@/api/order';
// 引入过滤器处理函数
import { formatDateYMDhms } from '@/filters';
// 引入echarts组件
import * as echarts from 'echarts';
export default {
    data() {
        return {
            date: [],   // 搜索时间
        }
    },
    methods: {
        // 获取数据
        async getData() {
            // 处理参数
            let date = JSON.stringify(this.date);
            // 发送请求
            let res = await getOrderTotalReq({ date });
            // 解构数据
            let {data} = res.data;
            // 处理数据
            let xData = data.map(v => formatDateYMDhms(v.orderTime));
            let yData = data.map(v => v.orderAmount);

            // 画图
            this.randerChart(xData, yData);
            // 适配
            window.addEventListener('resize', this.myChart.resize);

        },
        // 画图函数
        randerChart(xData, yData){
            // 初始化创建实例
            this.myChart = echarts.init(this.$refs.chartRef);
            // 配置项
            let option = {
                // 提示框
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    type: 'value'
                },
                // 核心数据 一条线对应一个对象
                series: [
                    {
                        data: yData,
                        type: 'bar'
                    }
                ]
            };
            // 导入配置项
            this.myChart.setOption(option);
        }
    },
    mounted () {
        // 拉取数据
        this.getData();
    },
    // 页面销毁前移除全局属性和方法
    beforeDestroy() {
        window.removeEventListener('resize', this.myChart.resize);
    },
}
</script>

<style lang="scss" scoped>
.el-date-editor{
    margin: 0 10px;
}
.my-chart{
    width: 100%;
    height: 460px;
    background-color: #fff;
    margin-top: 30px;
}
</style>