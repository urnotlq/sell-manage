<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>管理员信息</span>
        </div>
        <div class="text item">
            管理员ID：{{userInfo.id}}
            <el-divider></el-divider>
            账号：{{userInfo.account}}
            <el-divider></el-divider>
            用户组：{{userInfo.userGroup}}
            <el-divider></el-divider>
            创建时间：{{userInfo.ctime | formatDateYMD}}
            <el-divider></el-divider>
            <!-- 上传头像 -->
            <div class="user-avatar">
                <span>管理员头像：</span>
                <!-- 头像上传框 -->
                <!-- action	上传的全地址 -->
                <!-- show-file-list	是否显示已上传文件列表 -->
                <!-- on-success	文件上传成功时的钩子 -->
                <!-- before-upload 上传文件之前的钩子，参数为上传的文件，若返回 false  -->
                <el-upload class="avatar-uploader"
                 :action="API+'/users/avatar_upload'" 
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess" 
                 :before-upload="beforeAvatarUpload">
                    <img v-if="userInfo.imgUrl" :src="userInfo.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <el-button class="upload-btn" type="primary" size="small"
             @click="uploadAvatar">上传头像</el-button>
        </div>
    </el-card>
</template>

<script>
// 引入ajax接口函数
import { editAvatarReq } from '@/api/user.js';
// 引入local函数
import local from '@/utils/local.js';
export default {
    data() {
        return {
            userInfo: {},    // 账号信息
            API: 'http://localhost:5000',   // 默认请求地址
        }
    },
    methods: {
        // 文件上传成功
        handleAvatarSuccess(res) {
            // 解构数据
            let { code, imgUrl, msg } = res;
            // 判断
            if (code === 0) {
                // 数据回显
                this.userInfo.imgUrl = this.API + imgUrl;
            } 
        },
        // 文件上传前
        beforeAvatarUpload(file) {
            // 通过正则限制图片格式
            const isJPGPNG = /(jpeg|png)$/.test(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPGPNG) {
                this.$message.error('上传头像图片格式错误!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPGPNG && isLt2M;
        },
        // 头像上传到数据库 修改信息
        async uploadAvatar(){
            // 处理参数 只保留图片文件名
            let index = this.userInfo.imgUrl.lastIndexOf('/');
            let imgUrl = this.userInfo.imgUrl.slice(index+1);
            // 发送请求
            let res = await editAvatarReq({imgUrl});
            // 解构数据 
            let {code, msg} = res.data;
            // 判断
            if(code===0){
                // 通知头部更新头像 触发自定义通知事件 
                this.$bus.$emit('updataAvatar');
            }
        },
    },
    // 生命周期 页面创建时
    created () {
        // 从本地抓取用户信息
        this.userInfo = local.get('userInfo');
    },
}
</script>

<style lang="scss" scoped>
.upload-btn {
    margin: 10px 0 0 100px;
}

.user-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.avatar-uploader ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader ::v-deep .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
}

.avatar {
    width: 90px;
    height: 90px;
    display: block;
}
</style>