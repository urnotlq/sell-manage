<template>
    <div class="login">
        <div class="login-content">
            <!-- 标题 -->
            <div class="title df aic jcc">
                <img class="logo" src="@/assets/imgs/logo.png" alt="">
                <h2>酥肉后台管理系统</h2>
            </div>
            <!-- 表单 -->
            <!-- v-model 双向数据绑定 -->
            <!-- ref 绑定DOM 用于表单提交校验 -->
            <el-form :model="formData" status-icon :rules="rules" ref="formRef" class="demo-ruleForm">
                <el-form-item prop="account">
                <!-- 通过 prefix-icon 属性在 input 组件首部增加显示图标 -->
                    <el-input
                     v-model.number="formData.account"
                     prefix-icon="iconfont icon-user"
                      ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <!-- 动态绑定文本框类型 控制密码是否可见 -->
                    <el-input
                     :type="isOpen ? '' : 'password'"
                     v-model="formData.password" 
                     autocomplete="off"
                     prefix-icon="iconfont icon-lock"
                     >
                     <!-- 通过 slot 放置图标 -->
                     <!-- 动态绑定类名 通过数据判断控制图标样式 -->
                     <i slot="suffix" class="cur iconfont" 
                      :class="isOpen ? 'icon-eye-open': 'icon-eye-close'"
                      @click="isOpen = !isOpen"
                      ></i>
                     </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="submit-login" type="primary" @click="submitForm('formRef')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
// 引入校验规则函数 
import { checkAccount, checkPassword } from '@/utils'
// 引入接口函数
import { checkLoginReq } from '@/api/user.js';

export default {
    data() {
        return {
            // 控制密码是否可见
            isOpen: false,
            // 表单数据
            formData: {
                account:'',
                password:'',
            },
            // 表单校验规则
            rules: {
                account: [
                    { validator: checkAccount, trigger: 'blur' }
                ],
                password: [
                    { validator: checkPassword, trigger: 'blur' }
                ],
            },

        }
    },
    methods: {
        submitForm(formName) {
            // validate 表单校验方法  valid返回true或false 表示校验结果
            this.$refs[formName].validate(async (valid)=>{
                // 表单校验判断
                if(valid){
                    // 发送请求
                    let res = await checkLoginReq(this.formData)
                    // 解构数据
                    let {code,msg,role,token} = res.data;
                    // 根据返回的数据做行动
                    if(code === 0){
                        // 成功 弹出消息 存储token 跳转首页
                        this.$message.success(msg)
                        localStorage.setItem('t_k', token)
                        this.$router.push('/')
                    }else{
                        // 失败
                        this.$message.error(msg)
                    }
                } else {
                    // 校验失败
                    console.log('validate ERROR');
                }
            } );
        },
    },
}
</script>

<style lang="scss" scoped>

// scss 样式穿透 进子组件
// ::v-deep .el-input__inner{
//     background: transparent;
//     color: white;
// }

.login {
    width: 100%;
    height: 100%;
    background: url('../../assets/imgs/login-bg.jpg') top center;
    background-size: auto 100%;
}

.login-content {
    width: 360px;
    height: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.title {
    margin-bottom: 16px;
    .logo {
        width: 40px;
        margin-right: 10px;
        // 旋转动画调用 c3
        // animation: cycle 2s linear infinite;
    }
}
// 旋转动画函数
@keyframes cycle {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.cur{
    cursor: pointer;
    padding-right: 4px;
}

.submit-login {
    width: 100%;
}
</style>