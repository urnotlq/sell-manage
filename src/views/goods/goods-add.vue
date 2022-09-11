<template>
    <el-card>
        <div slot="header"  class="header">
            <span>商品添加</span>
        </div>
        <!-- 表单 -->
        <el-form :model="formData" label-width="90px" size="small">
            <!-- 商品名称 -->
            <el-form-item label="商品名称">
                <el-input  v-model="formData.name"></el-input>
            </el-form-item>
            <!-- 商品分类 -->
            <el-form-item label="商品分类">
                <el-select  v-model="formData.category" placeholder="请选择商品分类">
                    <el-option
                     v-for="item in categories" 
                     :key="item.cateName"
                     :label="item.cateName"
                     :value="item.cateName"></el-option>
                </el-select>
            </el-form-item>
            <!-- 商品价格 -->
            <el-form-item label="商品价格">
                <!-- precision 属性可以控制数值精度 -->
                <el-input-number v-model="formData.price" :precision="2"
                 :min="0" :max="100"></el-input-number>
            </el-form-item>
            <!-- 商品图片 -->
            <el-form-item label="商品图片">
                <!-- 头像上传框 -->
                <!-- action	上传的全地址 -->
                <!-- show-file-list	是否显示已上传文件列表 -->
                <!-- on-success	文件上传成功时的钩子 -->
                <!-- before-upload 上传文件之前的钩子，参数为上传的文件，若返回 false  -->
                <el-upload class="avatar-uploader"
                 :action="API+'/goods/goods_img_upload'" 
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess" 
                 :before-upload="beforeAvatarUpload">
                    <img v-if="formData.imgUrl" :src="formData.imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <!-- 商品描述 -->
            <el-form-item label="商品描述">
                <el-input  v-model="formData.goodsDesc"
                 type="textarea" :rows="2"></el-input>
            </el-form-item>
            <!-- 操作 -->
            <el-form-item>
                <el-button type="primary" @click="submit">添加商品</el-button>
            </el-form-item>
        </el-form>
        
    </el-card>
</template>

<script>
// 引入ajax接口函数
import { selectAllCategoriesReq, addGoodsReq } from '@/api/goods.js';
export default {
    data() {
        return {
            // 表单数据
            formData: {
                imgUrl:'',  // 图片地址 数据占位
            },
            categories: [],   // 所有商品分类列表
            API: 'http://localhost:5000',   // 服务器地址
        }
    },
    methods: {
        // 获取所有商品分类
        async getAllCategories() {
            // 发送请求
            let res = await selectAllCategoriesReq();
            // 数据赋值
            this.categories = res.data;
        },
        // 文件上传成功
        handleAvatarSuccess(res) {
            // 解构数据
            let { code, imgUrl, msg } = res;
            // 判断
            if (code === 0) {
                // 提示信息
                this.$message.success(msg);
                // 数据回显
                this.formData.imgUrl = this.API + imgUrl;
            } else {
                this.$message.error(msg);
            }
        },
        // 文件上传前
        beforeAvatarUpload(file) {
            // 通过正则限制图片格式
            const isJPGPNG = /(jpeg|png)$/.test(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPGPNG) {
                this.$message.error('上传图片格式错误!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPGPNG && isLt2M;
        },
        // 添加商品
        async submit(){
            // 发送请求
            let res = await addGoodsReq(this.formData);
            // 解构数据
            let {code} = res.data;
            // 判断
            if(code === 0){
                // 跳转页面
                this.$router.push('/goods');
            }
        },
    },
    created() {
        // 获取所有商品分类
        this.getAllCategories();
    },

}
</script>

<style lang="scss" scoped>
.el-form{
    width: 416px;
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