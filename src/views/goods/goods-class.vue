<template>
    
    <el-card>
        <div class="header df jcsb aic" slot="header">
            <span>商品分类</span>
            <el-button type="primary" size="small">添加分类</el-button>
        </div>
        
        <!-- 表格 -->
        <el-table :data="tableData" :style="{width: tableWidth + 'px'}">
            <!-- 序号列 -->
            <el-table-column type="index" label="序号"></el-table-column>
            <!-- 分类名称 -->
            <el-table-column label="分类名称">
                <template slot-scope="scope">
                    <span v-if="!scope.row.isEdit">{{scope.row.cateName}}</span>
                    <el-input v-else v-model="scope.row.cateName" size="small"></el-input>
                </template>
            </el-table-column>
            <!-- 是否启用 -->
            <el-table-column label="是否启用">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.state"
                     active-color="#13ce66" inactive-color="#ff4949"
                     :disabled="!scope.row.isEdit">
                    </el-switch>
                </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" width="160">
                <!-- 匿名的作用域插槽 -->
                <template slot-scope="scope">
                    <el-button size="mini"
                     :type="scope.row.isEdit?'success':''"
                     @click="scope.row.isEdit = !scope.row.isEdit; editCate(scope.row);"
                     >
                        {{scope.row.isEdit?'完成':'编辑'}}
                     </el-button>
                    <el-button size="mini" type="danger" @click="confirmDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <!-- current-page 当前页码 -->
        <!-- page-size 当前数据显示条数 -->
        <!-- total 数据总条数 -->
        <!-- layout 组件布局 -->
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
// 引入ajax接口函数
import { getCateListReq, editCateReq, delCateReq } from '@/api/goods.js';
// 引入自适应表格宽度mixin
import mixinTableWidth from '@/mixins/mixinTableWidth';
export default {
    data() {
        return {
            // 商品分类数据
            tableData: [],
            // 当前页
            currentPage: 1,
            // 每页条数
            pageSize: 5,
            // 总条数
            total: 0,
        }
    },
    methods: {
        // 获取商品分类数据
        async getData() {
            // 配置参数
            let currentPage = this.currentPage;
            let pageSize = this.pageSize;
            // 发送请求
            let res = await getCateListReq({currentPage, pageSize});
            // 解构数据
            let {total, data} = res.data;
            // 修改数据
            data.forEach(v=>{
                // state数据处理
                v.state = v.state ? true : false;
                // 增加商品分类是否可编辑字段
                v.isEdit = false;
            });
            // 数据赋值
            this.tableData = data;
            this.total = total;

            // 当获取列表为空 且当前页不是第一页时 重新拉取上一页的数据
            if (data.length === 0 && this.currentPage > 1) {
                --this.currentPage;
                this.getData();
            }
        },
        // 修改商品分类
        async editCate(row) {
            // 编辑状态下直接返回  点击完成发送请求
            if(row.isEdit)  return;
            // 参数处理  浅拷贝row 对row中的state属性进行重构
            let data = {...row, state: row.state?1:0};
            // 发送请求
            let res = await editCateReq(data);
        },
        // 确认删除商品分类
        confirmDelete(row) {
            this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 删除商品分类
                // 处理数据
                let id = row.id;
                // 发送请求
                let res = await delCateReq({ id });
                // 解构数据
                let {code} = res.data;
                // 判断 删除成功重新拉取数据
                if(code === 0){
                    this.getData();
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 跳转分页
        handleCurrentChange(val){
            // 数据赋值
            this.currentPage = val;
            // 拉取数据
            this.getData();
        },
    },
    // 生命周期 页面创建时
    created () {
        this.getData();
    },
    // 混入器
    mixins: [mixinTableWidth],
}
</script>

<style lang="scss" scoped>
.pagination{
    margin-top: 16px;
}
</style>