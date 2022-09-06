<template>
    <!-- 表格卡片 -->
    <el-card class="box-card">
        <!-- 标题表头 具名插槽 -->
        <div slot="header">
            <span>账号列表</span>
        </div>

        <!-- 表格 -->
        <!-- :style="{}" 动态绑定样式 -->
        <el-table
         ref="multipleTable" 
         :data="tableData" 
         :style="{ width: tableWidth +'px' }" 
         size="medium"
         @selection-change="handleSeletionChange">
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
            <el-table-column  label="日期">
                <!-- 可选 直接通过prop属性渲染处理后的数据 -->
                <!-- 可选 通过插槽显示处理后的数据 或 *直接对数据进行处理* -->
                <!-- scope相当于一行的数据， scope.row相当于当前行的数据对象。这里就是用插槽 拿到当前行 row是个内置的属性 ，vue slot的scope传递值是父作用域中的源数据改变，值会同步改变 -->
                <template slot-scope="scope">
                    {{scope.row.ctime | formatDateYMD}}
                </template>
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
         :page-sizes="[3,5,8]"
         :page-size="pageSize" 
         layout="total, sizes, prev, pager, next, jumper" 
         :total="total">
        </el-pagination>

        <!-- 操作按钮 -->
        <div>
            <el-button 
             size="small" 
             type="danger"
             @click="batchDelSel">批量删除</el-button>
            <el-button 
             size="small" 
             type="primary"
             @click="deselect">取消选择</el-button>
        </div>

        <!-- 弹出编辑会话框 -->
        <!-- visible 是否显示会话框 -->
        <el-dialog title="编辑账号" :visible.sync="dialogFormVisible" width="400px">
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
                <el-button size="small" type="primary" @click="dialogFormVisible = false; editUser();">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
// 解构ajax接口函数
import { getUserListReq, delUserReq, editUserReq, batchDelUserReq } from '@/api/user.js';
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
            pageSize: 5,
            // 列表数据总条数
            total: 0,
            // 弹框表单数据
            formData: {},
            // 控制弹框显示
            dialogFormVisible: false,
            // 表格选项id
            ids: [],
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
            let res = await getUserListReq({ currentPage, pageSize });
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
        },
        // 编辑按钮
        handleEdit(row) {
            // 显示编辑弹窗
            this.dialogFormVisible = true;
            // 数据回填 脱绑(浅拷贝)
            this.formData = { ...row };
        },
        // 确认编辑
        async editUser() {
            // 发送请求
            let res = await editUserReq(this.formData);
            // 解构数据
            let { code, msg } = res.data;
            // 判断
            if (code === 0) {
                this.$message.success(msg);
                // 拉取列表数据
                this.getData();
            } else {
                this.$message.error(msg);
            }
        },
        // 删除账号
        async handleDelete(row) {
            // 获取数据
            let { id } = row;
            // 发送请求
            let res = await delUserReq({ id });
            // 解构数据
            let { code, msg } = res.data;
            // 判断
            if (code === 0) {
                this.$message.success('账号删除成功');
                // 刷新列表
                this.getData();
            } else {
                this.$message.error('账号删除失败');
            }
        },
        // 确认删除框
        confirmDelete(row) {
            this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
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
        // 取消选择
        deselect() {
            // 通过DOM调用el-ui内置方法
            this.$refs.multipleTable.clearSelection();
        },
        // 选项处理
        handleSeletionChange(selection) {
            // 收集所选账号的id
            this.ids = selection.map(v => v.id);
        },
        // 批量删除
        batchDelSel() {
            // 无选中内容 不进行删除操作
            if (this.ids.length === 0)
                return;
            // 获取参数 转为字符串 符合后端参数要求
            let ids = JSON.stringify(this.ids);

            this.$confirm('此操作将永久删除这些账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 发送请求
                let res = await batchDelUserReq({ ids });
                // 解构数据
                let { code, msg } = res.data;
                // 判断
                if (code === 0) {
                    this.$message.success(msg);
                    // 重新拉取数据
                    this.getData();
                } else {
                    this.$message.error(msg);
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 取消选择
        deselect() {
            // 通过DOM调用el-ui内置方法
            this.$refs.multipleTable.clearSelection();
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
    .pagination{
        margin: 16px 0 ;
    }

    .el-form{
        width: 284px;
    }
</style>