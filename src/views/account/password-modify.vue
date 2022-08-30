<template>
    <el-card>
        <!-- 表头 -->
        <div slot="header">
            <span>修改密码</span>
        </div>
        <!-- 表单内容 -->
        <el-form :model="formData" :rules="rules" status-icon ref="formRef" label-width="90px" size="medium"
            hide-required-asterisk>
            <!-- 原密码 -->
            <el-form-item prop="oldPassword" label="原密码">
                <el-input v-model="formData.oldPassword"></el-input>
            </el-form-item>
            <!-- 新密码 -->
            <el-form-item prop="newPassword" label="新密码">
                <el-input 
                :type="isNewOpen ? '' : 'password'"
                 v-model="formData.newPassword">
                    <!-- 通过 slot 放置图标 -->
                    <!-- 动态绑定类名 通过数据判断控制图标样式 -->
                    <i slot="suffix" 
                     class="cur iconfont" 
                     :class="isNewOpen ? 'icon-eye-open': 'icon-eye-close'"
                     @click="isNewOpen = !isNewOpen"></i>
                </el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item prop="confirmPwd" label="确认密码">
                <el-input
                :type="isConfOpen ? '' : 'password'" 
                 v-model="formData.confirmPwd">
                 <i slot="suffix" 
                     class="cur iconfont" 
                     :class="isConfOpen ? 'icon-eye-open': 'icon-eye-close'"
                     @click="isConfOpen = !isConfOpen"></i>
                 </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="modifyPwd">确定</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>


<script>
export default {
    data() {
        // 旧密码校验函数
        const checkOldPwd = (rule, value, callback) => {
            if (!value) {
                // 非空校验失败
                callback(new Error('请输入原密码！'));
            } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}$/.test(value)) {
                // 正则校验失败
                callback(new Error('密码8至16位，由字母、数字组成'));
            } else {
                // 校验成功
                callback();
            }
        };
        // 新密码校验函数
        const checkNewPwd = (rule,value,callback)=>{
            if(!value){
                callback(new Error('请输入新密码！'));
            }else if (value === this.formData.oldPassword){
                callback(new Error('新密码不能与旧密码相同！'));
            }else if (!rule.reg.test(value)){
                // 正则校验失败
                callback(new Error('密码8至16位，由字母、数字组成'));
            }else{
                // 再次验证确认密码
                this.$refs.formRef.validateField('confirmPwd');
                callback();
            }
        };
        // 确认密码校验函数
        const checkConfPwd = (rule,value,callback)=>{
            if(!value){
                // 非空校验
                callback(new Error('请确认新密码！'));
            }else if (value !== this.formData.newPassword){
                // 与新密码是否相同校验
                callback(new Error('密码不同'));
            }else{
                // 校验成功
                callback();
            }
        };

        return {
            // 表单密码是否显示标识
            isNewOpen: false,
            isConfOpen: false,
            // 表单数据
            formData: {
                oldPassword: '',
                newPassword: '',
                confirmPwd: '',
            },
            // 表单验证
            rules: {
                oldPassword: [{ validator: checkOldPwd, trigger: 'blur' }],
                newPassword: [{ 
                    validator: checkNewPwd, 
                    trigger: 'blur' ,
                    reg: /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}$/
                    // 传参方式验证
                }],
                confirmPwd: [{ validator: checkConfPwd, trigger: 'blur' }],
            },
        }
    },
    methods: {
        // 提交表单 修改密码
        modifyPwd() {
            this.$refs.formRef.validate(vilid => {
                if (vilid) {
                    console.log('提交数据', this.formData);
                } else {
                    console.log('校验失败');
                }
            });
        },
        //重置表单
        resetForm() { }

    }
}
</script>

<style lang="scss" scoped>
.el-form {
    width: 296px;
}
</style>