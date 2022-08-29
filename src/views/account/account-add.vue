<template>
    <el-card>
        <!-- 表头 -->
        <div slot="header">
            <span>添加账号</span>
        </div>
        <!-- 表单内容 -->
        <el-form 
         :model="formData" 
         :rules="rules" 
         status-icon 
         ref="formRef" 
         label-width="90px" 
         size="medium"
         >
            <!-- 账号 -->
            <el-form-item prop="account" label="账号">
                <el-input v-model="formData.account"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="formData.password"></el-input>
            </el-form-item>
            <!-- 账号 -->
            <el-form-item prop="userGroup" label="用户组">
                <el-select v-model="formData.userGroup" placeholder="请选择">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addAccount">添加</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            // 表单数据
            formData: {
                account: '',
                password: '',
                userGroup: '',
            },
            // 表单验证
            rules: {
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                userGroup: [
                    { required: true, message: '请选择用户组', trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        addAccount(){
            this.$refs.formRef.validate(vilid => {
                if (vilid) {
                    console.log('提交数据', this.formData);
                } else {
                    console.log('校验失败');
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
    .el-form{
        width: 296px;
    }
</style>