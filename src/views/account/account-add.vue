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
         hide-required-asterisk
         >
            <!-- 账号 -->
            <el-form-item prop="account" label="账号">
                <el-input v-model="formData.account"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="formData.password"></el-input>
            </el-form-item>
            <!-- 用户组 -->
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
// 引入校验规则函数 
import { checkAccount, checkPassword } from '@/utils'
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
                    { validator: checkAccount, trigger: 'blur' }
                ],
                password: [
                    { validator: checkPassword, trigger: 'blur' }
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