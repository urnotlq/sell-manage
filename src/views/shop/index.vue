<template>
    <el-card>
        <div slot="header" class="header df aic jcsb">
            <span>店铺管理</span>
            <el-button v-if="!isEdit" size="small" type="primary" @click="isEdit = !isEdit">编辑</el-button>
            <el-button v-else size="small" type="success" @click="isEdit = !isEdit;submit()">完成</el-button>
        </div>
        
        <!-- 表单 -->
        <el-form :disabled="!isEdit" :model="formData" label-width="90px" size="small">
            <!-- 店铺名称 -->
            <el-form-item label="店铺名称">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <!-- 店铺公告 -->
            <el-form-item label="店铺公告">
                <el-input type="textarea" :rows="6" v-model="formData.bulletin"></el-input>
            </el-form-item>
            <!-- 店铺头像 -->
            <el-form-item label="店铺头像">
                <el-upload class="avatar-uploader"
                 :action="API+'/shop/upload'"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess" 
                 :before-upload="beforeAvatarUpload">
                    <img v-if="formData.avatar" :src="API+'/upload/shop/'+formData.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <!-- 店铺图片 -->
            <el-form-item label="店铺图片">
                <!-- list-type	文件列表的类型 -->
                <el-upload
                 :action="API+'/shop/upload'"
                 list-type="picture-card"
                 :file-list="formData.pics"
                 :on-success="handleShopSuccess" 
                 :on-preview="handlePictureCardPreview"
                 :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <!-- 配送费 -->
            <el-form-item label="配送费">
                <el-input-number v-model="formData.deliveryPrice"
                 :precision="2" :min="0" :max="100"
                ></el-input-number>
            </el-form-item>
            <!-- 配送时间 -->
            <el-form-item label="配送时间">
                <el-input-number v-model="formData.deliveryTime"
                 :min="10" :max="100"
                ></el-input-number>
            </el-form-item>
            <!-- 配送描述 -->
            <el-form-item label="配送描述">
                <el-input v-model="formData.description"></el-input>
            </el-form-item>
            <!-- 店铺评分 -->
            <el-form-item label="店铺评分">
                <el-rate
                 v-model="formData.score"
                 disabled
                 show-score
                 text-color="#ff9900"
                 score-template="{value}">
                </el-rate>
            </el-form-item>
            <!-- 销量 -->
            <el-form-item label="销量">
                <el-input-number v-model="formData.sellCount"
                 :min="0" :max="10000"
                ></el-input-number>
            </el-form-item>
            <!-- 活动 -->
            <el-form-item label="活动">
                <el-checkbox-group v-model="formData.supports">
                    <el-checkbox label="在线支付满28减5"></el-checkbox>
                    <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
                    <el-checkbox label="单人精彩套餐"></el-checkbox>
                    <el-checkbox label="特价饮品8折抢购"></el-checkbox>
                    <el-checkbox label="单人特色套餐"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <!-- 营业时间 -->
            <el-form-item label="营业时间">
                <!-- format 显示时间格式 -->
                <!-- value-format 数据存储时间格式 -->
                <el-date-picker
                 format="HH:mm:ss"
                 value-format="yyyy-MM-dd HH:mm:ss"
                 v-model="formData.date"
                 type="datetimerange"
                 range-separator="至"
                 start-placeholder="开始时间"
                 end-placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
// 引入ajax接口函数
import { getShopInfoReq, editShopReq } from '@/api/shop';
export default {
    data() {
        return {
            // 表单数据
            formData: {
                id: '', // id
                name: '',   // 店铺名称
                bulletin: '',   // 公告
                avatar: '', // 店铺头像
                deliveryPrice: '',  // 配送费
                deliveryTime: '',   // 送达时间
                description: '',    // 描述
                score: 0,  // 评分
                sellCount: '',  // 销量
                supports: [],   // 活动
                pics: [],   // 店铺图片
                date: '',   // 营业时间
                minPrice: '',   // 起送价格
            },
            API: 'http://localhost:5000',    // 服务器地址
            dialogImageUrl: '',
            dialogVisible: false,
            isEdit: false,  // 表单是否可编辑
            /* fileList: [
                {
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                },
                {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }
            ],  // 图片列表 */

        }
    },
    methods: {
        // 获取店铺信息
        async getData() {
            // 发送请求
            let res = await getShopInfoReq();
            // 解构数据
            let { data } = res.data;
            // 修改数据
            let pics = data.pics.map(v => {
                return {
                    name: v,
                    url: this.API+'/upload/shop/'+v,
                }
            });
            // 数据回显
            this.formData = { ...data, pics };
        },
        // 文件上传成功
        handleAvatarSuccess(res) {
            // 解构数据
            let { code, imgUrl, msg } = res;
            // 判断
            if (code === 0) {
                // 数据回显
                this.formData.avatar = imgUrl.slice(imgUrl.lastIndexOf('/')+1);
            } 
        },
        // 文件上传前
        beforeAvatarUpload(file) {
            // 通过正则限制图片格式
            const isValid = /(jpeg|png|webp)$/.test(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isValid) {
                this.$message.error('上传头像图片格式错误!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isValid && isLt2M;
        },
        // 店铺图片上传成功回调
        handleShopSuccess(res, file){
            // 解构数据
            let url = this.API + res.imgUrl;
            let name = url.slice(url.lastIndexOf('/')+1);
            // 数据赋值
            this.formData.pics.push({ name, url });
        },
        // 移除图片
        handleRemove(file, fileList) {
            // // 提取数据
            // let pics = fileList.map(v=>{
            //     return {
            //         name: v.name,
            //         url: v.url,
            //     }
            // })
            // // 数据赋值
            // this.formData.pics = pics;

            // 定位要移出的图片
            let index = this.formData.pics.findIndex(v=>v.name === file.name);
            // 从数组中移出这个元素
            this.formData.pics.splice(index,1);
        },
        // 图片预览
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 提交表单
        async submit() {
            // 参数处理 将pics的图片名单独提取送入数据库
            let pics = this.formData.pics.map(v => v.name);
            // 发送请求
            let res = await editShopReq({...this.formData, pics});
        },
    },
    created () {
        // 初始化拉取数据
        this.getData();
    },
}
</script>

<style lang="scss" scoped>
.el-form{
    width: 560px;
}
.el-rate{
    margin-top: 6px;
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