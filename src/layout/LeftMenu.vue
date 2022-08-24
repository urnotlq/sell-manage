<template>
    <div class="left-menu">
        <div class="logo"></div>
        <!-- 导航栏 -->
        <el-menu default-active="2"
         class="el-menu-vertical-demo" 
         background-color="#545c64" 
         text-color="#fff"
         active-text-color="#ffd04b">

            <!-- 后台首页 -->
            <el-menu-item index="2">
                <i class="iconfont icon-home"></i>
                <span slot="title">后台首页</span>
            </el-menu-item>

            <!-- 订单管理 -->
            <el-menu-item index="2">
                <i class="iconfont icon-order"></i>
                <span slot="title">订单管理</span>
            </el-menu-item>
            
            <!-- 商品管理 -->
            <el-submenu index="1">
                <template slot="title">
                    <i class="iconfont icon-goods"></i>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="1-1">商品列表</el-menu-item>
                <el-menu-item index="1-2">商品添加</el-menu-item>
                <el-menu-item index="1-3">商品分类</el-menu-item>
            </el-submenu>

            <!-- 店铺管理 -->
            <el-menu-item index="2">
                <i class="iconfont icon-shop"></i>
                <span slot="title">店铺管理</span>
            </el-menu-item>

            <!-- 账号管理 -->
            <el-submenu index="1">
                <template slot="title">
                    <i class="iconfont icon-account"></i>
                    <span>账号管理</span>
                </template>
                <el-menu-item index="1-1">账号列表</el-menu-item>
                <el-menu-item index="1-2">添加账号</el-menu-item>
                <el-menu-item index="1-2">修改密码</el-menu-item>
                <el-menu-item index="1-2">个人中心</el-menu-item>
            </el-submenu>

            <!-- 销售统计 -->
            <el-submenu index="1">
                <template slot="title">
                    <i class="iconfont icon-total"></i>
                    <span>销售统计</span>
                </template>
                <el-menu-item index="1-1">商品统计</el-menu-item>
                <el-menu-item index="1-2">订单统计</el-menu-item>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.left-menu {
    width: 200px;
    height: 100%;
    background: #304155;
}
</style>