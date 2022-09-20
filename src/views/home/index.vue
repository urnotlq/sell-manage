<template>
    <el-card>
        <!-- <div slot="header" class="header">
            <span>后台首页</span>
        </div> -->
        <!-- 卡片组件 -->
        <card-list :cardData="cardData">
            <!-- 使用具名(slot="插槽名")作用域(slot-scope="接收参数")插槽  -->
            <template slot="img" slot-scope="scope">
                <!-- 在父组件中设置类名 在子组件中设置样式 -->
                <img class="img" :src="scope.img" alt="">
            </template>
            <!-- 使用匿名作用域(slot-scope="接收参数")插槽 -->
            <template slot-scope="scope">
                <h4>{{scope.info.name}}</h4>
                <p>{{scope.info.num | formatNumber}}</p>
            </template>
        </card-list>

        <!-- echarts -->
        <div class="my-chart" ref="chartRef"></div>
        <!-- <chart-line></chart-line> -->
    </el-card>
</template>

<script>
// 引入ajax接口函数
import { getTotalDataReq } from '@/api/order';
// 引入组件
import CardList from './CardList.vue';
import ChartLine from './ChartLine.vue';
// 引入echars
// import * as echarts from 'echarts';
export default {
    // 组件注册
    components:{
        CardList,
        ChartLine,
    },
    data() {
        return {
            cardData:[],    // 卡片数据
        }
    },
    methods: {
        async getData() {
            // 发送数据
            let res = await getTotalDataReq();
            // 解构数据
            let {
                xData,
                orderData,
                amountData,
                totalOrder,
                totalAmount,
                todayOrder,
                totayAmount,
             } = res.data;
            // 封装卡片数据
            this.cardData = [
                {
                    name: '总订单',
                    num: totalOrder,
                    img: require('@/assets/imgs/total-order.svg'),
                },
                {
                    name: '总销售额',
                    num: totalAmount,
                    img: require('@/assets/imgs/total-amount.svg'),
                },
                {
                    name: '今日订单',
                    num: todayOrder,
                    img: require('@/assets/imgs/order.svg'),
                },
                {
                    name: '今日销售额',
                    num: totayAmount,
                    img: require('@/assets/imgs/amount.svg'),
                },
            ]

            // 渲染画图
            this.randerChart(xData, orderData, amountData);
        },
        // 画图方法
        randerChart(xData, orderData, amountData) {
            // 基于准备好的dom，初始化echarts实例 挂载在this上方便调用解绑方法
            this.myChart = echarts.init(this.$refs.chartRef);
            // 图表配置项
            let option = {

                // 标题
                title: {
                    text: '数据统计',
                },
                // 提示框
                tooltip: {
                    trigger: 'axis'
                },
                // 图例
                legend: {
                    data: ['订单数据', '金额数据'],
                },
                // 直角坐标系
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                // 工具盒子
                toolbox: {
                    show: false,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                // x轴
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData,
                },
                // y轴
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: true,
                    },
                },
                // 折线信息
                series: [
                    {
                        name: '订单数据',
                        type: 'line',
                        data: orderData,
                    },
                    {
                        name: '金额数据',
                        type: 'line',
                        data: amountData,
                    },
                ]
            };
            // 绘制图表
            this.myChart.setOption(option);
            
            // 自适应图表宽度
            window.addEventListener('resize',this.myChart.resize);
        }
    },
    created() { },
    // mounted生命周期操作DOM
    mounted() {
        // 获取数据
        this.getData();
    },
    // 销毁前解绑全局的属性和方法
    beforeDestroy() {
        window.removeEventListener('resize',this.myChart.resize);
    },

}
</script>

<style lang="scss" scoped>
.el-card{
    background-color: rgba(255, 255, 255, 0);
    border:none;
    box-shadow: none;
}
.my-chart{
    width: 100%;
    height: 460px;
    margin-top: 30px;
    padding: 20px;
    box-shadow: 0 0 10px #ccc;
    background: #fff;
}
</style>