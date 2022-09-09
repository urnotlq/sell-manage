<template>
    <div class="right-header df aic jcsb">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- 遍历面包屑数据列表 -->
            <!-- :to='path' 点击跳转某级页面 -->
            <el-breadcrumb-item
             v-for="item in breadListComp"
             :key="item.path"
             :to="item.path"
            >
            {{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 用户 下拉菜单 -->
        <div class="df aic">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎您，{{userInfo.account}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="person">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-avatar class="el-avatar" :size="40" :src="userInfo.imgUrl || avatar"></el-avatar>
        </div>
    </div>
</template>

<script>
// 引入ajax接口函数
import { getUserInfoReq } from '@/api/user.js';
// 引入local函数 
import local from '@/utils/local.js';
export default {
    data() {
        return {
            // 用户头像引入
            avatar: require('@/assets/imgs/logo.png'),
            // 面包屑导航数据列表
            breadList:[ ],
            // 用户信息
            userInfo: {},
        }
    },
    methods:{
        // 用户下拉菜单页面跳转处理
        handleCommand(command){
            switch (command) {
                case 'person':
                    // 跳转至个人中心
                    this.$router.push('/person-center');
                    break;
                case 'logout':
                    // 页面数据处理 清除登录信息
                    local.clear();
                    // 跳转至登录
                    this.$router.push('/login');
                    break;
                default:
                    break;
            }
        },
        // 计算面包屑导航列表数据
        calcBreadList(){
            // 初始化面包屑数据 添加首页对象
            this.breadList = [ {path:'/', title:'首页'} ];
            // 遍历路由匹配数组
            this.$route.matched.forEach(v => {
                // 仅存储有路径的对象
                if(v.meta.path){
                    // 深拷贝 将导航信息对象push进面包屑数据列表中
                    this.breadList.push({...v.meta});
                    // 浅拷贝
                    // this.breadList.push(v.meta);
                }
            });
            // console.log(this.breadList);
        },
        // 获取个人信息
        async getUserInfo() {
            // 发送请求
            let res = await getUserInfoReq();
            // 传递数据
            this.userInfo = res.data;
            // 将用户信息打入本地 供其他页面使用
            local.set('userInfo', res.data);
        },
    },
    // 生命周期 页面创建时
    created() {
        // 获取用户信息 
        this.getUserInfo();
        // 接收更新头像通知 监听自定义通知事件
        this.$bus.$on('updataAvatar',()=>{
            // 收到通知 执行获取用户信息
            this.getUserInfo();
        });
    },
    // 方式1 侦听器
    watch: {
        // 监听路由变化 更新面包屑列表
        '$route.path': {
            // 回调函数应被声明在 handler 中
            handler(){
                this.calcBreadList();
            }
        },
        // deep: true,  // 深度监听 对监听的对象深层监听
        immediate: true,    // 在侦听器创建时立即触发监听方法handler
    },

    // 方式2 计算属性 √
    computed: {
        // 面包屑导航 路由列表数据
        breadListComp(){
            // 初始化列表数据
            let breadComp = [{path: '/', title: '首页'}];
            // 遍历当前路由对象 从父到子
            this.$route.matched.forEach(v=>{
                // 存储当前路由的描述对象
                if(v.meta?.path){
                    breadComp.push(v.meta);
                }
            });
            // 返回列表数据 
            return breadComp;
        }
    },
}
</script>

<style lang="scss" scoped>
.right-header {
    height: 60px;
    padding: 0 16px;
    background: white;
}

.el-avatar{
    margin-left: 10px;
}

.el-dropdown-link {
    cursor: pointer;
    color: $bg;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>