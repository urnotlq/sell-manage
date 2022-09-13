<template>
    <el-card>
        <!-- <div slot="header" class="header">
            <span>订单管理</span>
        </div> -->
        <!-- 查询表单 -->
        <el-form inline size="small" v-model="formData">
            <!-- 订单号 -->
            <el-form-item label="订单号">
                <el-input v-model="formData.orderNo" placeholder="订单号"></el-input>
            </el-form-item>
            <!-- 收货人 -->
            <el-form-item label="收货人">
                <el-input v-model="formData.consignee" placeholder="收货人"></el-input>
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item label="手机号">
                <el-input v-model="formData.phone" placeholder="手机号"></el-input>
            </el-form-item>
            <!-- 订单状态 -->
            <el-form-item label="订单状态">
                <el-select v-model="formData.orderState">
                    <el-option value="已受理">已受理</el-option>
                    <el-option value="派送中">派送中</el-option>
                    <el-option value="已完成">已完成</el-option>
                </el-select>
            </el-form-item>
            <!-- 选择时间 -->
            <el-form-item label="选择时间">
                <!-- value-format	可选，绑定值的格式。不指定则绑定值为 Date 对象 -->
                <el-date-picker
                 value-format="yyyy-MM-dd HH:mm:ss"
                 v-model="formData.date"
                 type="datetimerange"
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <!-- 操作 -->
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="tableData" :style="{width: tableWidth + 'px'}">
            <!-- 订单号 -->
            <el-table-column prop="orderNo" label="订单号" fixed ></el-table-column>
            <!-- 下单时间 -->
            <el-table-column label="下单时间">
                <template slot-scope="scope">
                    {{scope.row.orderTime | formatDateHMS}}
                </template>
            </el-table-column>
            <!-- 手机号 -->
            <el-table-column prop="phone" label="手机号" width="120px"></el-table-column>
            <!-- 收货人 -->
            <el-table-column prop="consignee" label="收货人"></el-table-column>
            <!-- 配送地址 -->
            <el-table-column prop="deliverAddress" label="配送地址" width="120px"></el-table-column>
            <!-- 送达时间 -->
            <el-table-column label="送达时间">
                <template slot-scope="scope">
                    {{scope.row.deliveryTime | formatDateHMS}}
                </template>
            </el-table-column>
            <!-- 用户备注 -->
            <el-table-column prop="remarks" label="用户备注"></el-table-column>
            <!-- 订单金额 -->
            <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
            <!-- 订单状态 -->
            <el-table-column prop="orderState" label="订单状态"></el-table-column>

            <!-- 操作 -->
            <!-- fixed	列是否固定在左侧或者右侧，true 表示固定在左侧 -->
            <!-- slot-scope 传递数据 -->
            <!-- teplate 用于循环渲染每一行数据 -->
            <el-table-column label="操作" fixed="right" width="86px">
                <template slot-scope="scope">
                    <el-button @click="viewOrder(scope.row.id)" type="text" size="small">查看</el-button>
                    <el-button @click="modifyOrder(scope.row.id)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination 
         class="pagination"  background
         @current-change="handleCurrentChange" 
         :current-page="currentPage" 
         :page-size="pageSize" 
         layout="total, prev, pager, next, jumper" 
         :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
// 引入ajax接口文件
import { getOrderListReq } from '@/api/order.js';
// 引入mixin
import mixinTableWidth from '@/mixins/mixinTableWidth.js';

export default {
    data() {
        return {
            formData: {
                orderNo: '',    // 订单号
                consignee: '',  // 收货人
                phone: '',  // 手机号
                orderState: '', // 订单状态
                date: '',   // 日期范围
            },
            currentPage: 1, // 当前页
            pageSize: 5,    // 每页条数
            total: 0,   // 总条数
            tableData: [],  // 表格数据
            searchForm: {}, // 查询数据
        }
    },
    methods: {
        // 获取数据
        async getData(searchForm = {}){
            // 参数处理 searchForm默认为空对象
            let currentPage = this.currentPage;
            let pageSize = this.pageSize;
            // 发送请求 解构有值的searchForm
            let res = await getOrderListReq({currentPage, pageSize, ...searchForm});
            // 解构数据
            let {total, data} = res.data;
            // 数据赋值
            this.total = total;
            this.tableData = data;
        },
        // 跳转分页
        handleCurrentChange(val){
            // 数据赋值
            this.currentPage = val;
            // 拉取数据
            this.getData(this.searchForm);
        },
        // 查询订单
        search() {
            // 时间数据格式处理
            let date = JSON.stringify(this.formData.date);
            // 数据脱绑
            this.searchForm = {...this.formData, date};
            // 从第一页开始显示
            this.currentPage = 1;
            // 拉取数据
            this.getData(this.searchForm);
        },
        // 查看订单
        viewOrder(id) {
            // query传参
            this.$router.push({path: '/order-detail',query:{ id }});
        },
        // 编辑订单
        modifyOrder(id) {
            // query传参
            this.$router.push({path: '/order-edit',query:{ id }});
        },
    },
    created () {
        // 拉取数据
        this.getData();
    },
    mixins: [mixinTableWidth],
}
</script>

<style lang="scss" scoped>

</style>