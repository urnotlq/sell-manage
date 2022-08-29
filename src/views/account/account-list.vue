<template>
    <!-- 表格卡片 -->
    <el-card class="box-card">
        <!-- 标题表头 具名插槽 -->
        <div slot="header">
            <span>账号列表</span>
        </div>

        <!-- 表格 -->
        <el-table ref="multipleTable" :data="tableData" style="width: 100%">
            <!-- 全选 反选 -->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!-- 账号列 -->
            <el-table-column prop="account" label="账号">
            </el-table-column>
            <!-- 用户组列 -->
            <el-table-column prop="userGroup" label="用户组">
            </el-table-column>
            <!-- 日期列 -->
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <!-- 操作按钮 -->
            <el-table-column label="操作" width="160">
                <!-- 匿名的作用域插槽 -->
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <!-- 分页 -->
        <!-- current-page 当前页码 -->
        <!-- page-sizes 选择数据要显示的条数 -->
        <!-- page-size 当前数据显示条数 -->
        <!-- total 数据总条数 -->
        <!-- layout 组件布局 -->
        <el-pagination class="pagination"
         background
         @size-change="handleSizeChange" 
         @current-change="handleCurrentChange"
         :current-page="currentPage"
         :page-sizes="[5,10,15,20]"
         :page-size="5"
         layout="total, sizes, prev, pager, next, jumper"
         :total="16">
        </el-pagination>

        <!-- 操作按钮 -->
        <div>
            <el-button size="small" type="danger">批量删除</el-button>
            <el-button size="small" type="primary">取消选择</el-button>
        </div>
    </el-card>
</template>

<script>
    export default {
    data() {
        return {
            tableData: [
                {
                account : '王小虎1',
                userGroup: '超级管理员',
                date: '2016-05-03',
                },
                {
                account : '王小虎2',
                userGroup: '超级管理员',
                date: '2016-05-03',
                },
                {
                account : '王小虎3',
                userGroup: '超级管理员',
                date: '2016-05-03',
                },
                {
                account : '王小虎4',
                userGroup: '超级管理员',
                date: '2016-05-03',
                },
                {
                account : '王小虎5',
                userGroup: '超级管理员',
                date: '2016-05-03',
                },
            ],
            currentPage: 1,

        }
    },
    methods: {
        // 编辑按钮
        handleEdit(index, row) {
            console.log(index, row);
        },
        // 删除按钮
        handleDelete(index, row) {
            console.log(index, row);
        },
        // 指定数据显示条数
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        // 指定当前页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    }
</script>

<style lang="scss" scoped>
    .pagination{
        margin: 16px 0 ;
    }
</style>