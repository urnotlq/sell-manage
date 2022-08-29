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
            rules: {
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
            },

        }
    },
    methods: {
        submitForm(formName) {
            // validate 表单校验方法  valid返回true或false 表示校验结果
            this.$refs[formName].validate( (valid)=>{
                console.log(valid);
                if(valid){
                    // 校验成功 可以发送请求传递数据
                    console.log('validate succeed');
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