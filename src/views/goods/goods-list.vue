<template>
    <!-- 表格卡片 -->
    <el-card class="box-card">
        <!-- 标题表头 具名插槽 -->
        <div slot="header">
            <span>商品列表</span>
        </div>

        <!-- 表格 -->
        <el-table
         ref="multipleTable" 
         :data="tableData" 
         :style="{ width: tableWidth +'px' }" 
         size="medium">

         <!-- 通过设置 type="expand" 和 Scoped slot 可以开启展开行功能，el-table-column 的模板会被渲染成为展开行的内容，展开行可访问的属性与使用自定义列模板时的 Scoped slot 相同。 -->
            <!-- 展开行 -->
            <el-table-column type="expand">
                <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">

                    <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="所属分类">
                    <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="商品价格">
                    <span>{{ props.row.price }}</span>
                    </el-form-item>
                    <el-form-item label="商品图片">
                    <span>{{ props.row.imgUrl }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                    <span>{{ props.row.ctime | formatDateYMDhms}}</span>
                    </el-form-item>
                    <el-form-item label="商品评价">
                    <span>{{ props.row.rating }}</span>
                    </el-form-item>
                    <el-form-item label="商品销量">
                    <span>{{ props.row.sellCount }}</span>
                    </el-form-item>
                    <el-form-item label="商品描述">
                    <span>{{ props.row.goodsDesc }}</span>
                    </el-form-item>
                </el-form>
                </template>
            </el-table-column>


            <!-- 行数据 -->
            <!-- 商品名称 -->
            <el-table-column prop="name" label="商品名称">
            </el-table-column>
            <!-- 所属分类 -->
            <el-table-column prop="category" label="所属分类">
            </el-table-column>
            <!-- 商品价格 -->
            <el-table-column prop="price" label="商品价格">
            </el-table-column>
            <!-- 商品图片 -->
            <el-table-column label="商品图片">
                <template slot-scope="scope">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="API+scope.row.imgUrl"
                    fit="contain"></el-image>
                </template>
            </el-table-column>
            <!-- 商品描述 -->
            <el-table-column prop="goodsDesc" label="商品描述">
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column label="操作" width="160">
                <!-- 匿名的作用域插槽 -->
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="confirmDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- 分页 -->
        <!-- current-page 当前页码 -->
        <!-- page-sizes 选择数据要显示的条数 -->
        <!-- page-size 当前数据显示条数 -->
        <!-- total 数据总条数 -->
        <!-- layout 组件布局 -->
        <el-pagination 
         class="pagination" 
         background @size-change="handleSizeChange"
         @current-change="handleCurrentChange" 
         :current-page="currentPage" 
         :page-sizes="[3,5]"
         :page-size="pageSize" 
         layout="total, sizes, prev, pager, next, jumper" 
         :total="total">
        </el-pagination>


        <!-- 弹出编辑会话框 -->
        <!-- visible 是否显示会话框 -->
        <!-- <el-dialog title="编辑账号" :visible.sync="dialogFormVisible" width="400px">
            <el-form :model="formData" label-width="90px" size="small">
                <el-form-item label="账号">
                    <el-input v-model="formData.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组">
                    <el-select v-model="formData.userGroup" placeholder="请选择用户组">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogFormVisible = false; editGoods();">确 定</el-button>
            </div>
        </el-dialog> -->
    </el-card>
</template>

<script>
// 解构ajax接口函数
import { getGoodsListReq, delGoodsReq, editGoodsReq } from '@/api/goods.js';
// 导入适配屏幕宽度的mixin
import mixinTableWidth from '@/mixins/mixinTableWidth';
export default {
    data() {
        return {
            // 列表数据
            tableData: [],
            // 当前页
            currentPage: 1,
            // 页面大小
            pageSize: 3,
            // 列表数据总条数
            total: 0,
            // 弹框表单数据
            formData: {},
            // 控制弹框显示
            dialogFormVisible: false,
            // 默认请求地址
            API: 'http://localhost:5000',
        }
    },
    methods: {
        // 指定数据显示条数
        handleSizeChange(val) {
            // 更新页面大小数据
            this.pageSize = val;
            // 从头开始显示
            this.currentPage = 1;
            // 再次发送请求
            this.getData();
        },
        // 指定当前页
        handleCurrentChange(val) {
            // 更新当前页数据
            this.currentPage = val;
            // 再次发送请求
            this.getData();
        },
        // 异步获取列表数据
        async getData() {
            // 获取数据
            let currentPage = this.currentPage;
            let pageSize = this.pageSize;
            // 发送请求
            let res = await getGoodsListReq({ currentPage, pageSize });
            // 解构数据
            let { data, total } = res.data;

            // 当获取列表为空 且当前页不是第一页时 重新拉取上一页的数据
            if (data.length === 0 && this.currentPage > 1) {
                --this.currentPage;
                this.getData();
            }

            // 更新数据 赋值
            this.tableData = data;
            this.total = total;
            // console.log('data :>> ', this.tableData);
            
        },
        // 编辑按钮
        handleEdit(row) {
            // 显示编辑弹窗
            this.dialogFormVisible = true;
            // 数据回填 脱绑(浅拷贝)
            this.formData = { ...row };
        },
        // 确认编辑
        async editGoods() {
            // 发送请求
            let res = await editGoodsReq(this.formData);
            // 解构数据
            let { code, msg } = res.data;
            // 判断
            if (code === 0) {
                // 拉取列表数据
                this.getData();
            }
        },
        // 删除商品
        async handleDelete(row) {
            // 获取数据
            let { id } = row;
            // 发送请求
            let res = await delGoodsReq({ id });
            // 解构数据
            let { code, msg } = res.data;
            // 判断
            if (code === 0) {
                // 刷新列表
                this.getData();
            } 
        },
        // 确认删除框
        confirmDelete(row) {
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 确认删除
                this.handleDelete(row);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        
    },
    // 页面创建的生命周期
    created() {
        // 页面初始化 发送请求获取列表
        this.getData();
    },
    // 应用mixin公共逻辑
    mixins: [mixinTableWidth],

}
</script>

<style lang="scss" scoped>
.demo-table-expand {
    width: 100% !important;
    font-size: 0;
    margin-left: 56px;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.pagination {
    margin: 16px 0;
}
</style>