<template>
    <div class="right-header df aic jcsb">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 用户 下拉菜单 -->
        <div class="df aic">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    欢迎您，酥肉<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="person">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-avatar class="el-avatar" :size="40" :src="avatar"></el-avatar>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            avatar: require('@/assets/imgs/logo.png'),
        }
    },
    methods:{
        handleCommand(command){
            switch (command) {
                case 'person':
                    // 跳转至个人中心
                    this.$router.push('/person-center');
                    break;
                case 'logout':
                    // 页面数据处理
                    // 跳转至登录
                    this.$router.push('/login');
                    break;
                default:
                    break;
            }
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