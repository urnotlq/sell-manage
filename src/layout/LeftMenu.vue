<template>
    <div class="left-menu">
        <!-- 顶部标题 -->
        <div class="logo df aic">
            <img src="@/assets/imgs/logo.png" alt="">
            酥肉后台管理系统
        </div>
        <!-- 导航栏 -->
        <el-menu :default-active="$route.path"
         class="el-menu-vertical-demo" 
         background-color="#304156" 
         text-color="#fff"
         active-text-color="#a3ca39"
         unique-opened 
         router >
         <!-- 通过$route.path获取当前路由的地址 传给页面默认选择 -->
         <!-- unique-opened	只保持一个子菜单的展开 -->
         <!-- router 在激活导航时以 index 作为 path 进行路由跳转 -->

            <!-- 后台首页 -->
            <el-menu-item index="/home">
                <i class="iconfont icon-home"></i>
                <span slot="title">后台首页</span>
            </el-menu-item>

            <!-- 订单管理 -->
            <el-menu-item index="/order">
                <i class="iconfont icon-order"></i>
                <span slot="title">订单管理</span>
            </el-menu-item>
            
            <!-- 商品管理 -->
            <el-submenu index="3">
                <template slot="title">
                    <i class="iconfont icon-goods"></i>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="/goods-list">商品列表</el-menu-item>
                <el-menu-item index="/goods-add">商品添加</el-menu-item>
                <el-menu-item index="/goods-class">商品分类</el-menu-item>
            </el-submenu>

            <!-- 店铺管理 -->
            <el-menu-item index="/shop">
                <i class="iconfont icon-shop"></i>
                <span slot="title">店铺管理</span>
            </el-menu-item>

            <!-- 账号管理 -->
            <el-submenu index="5">
                <template slot="title">
                    <i class="iconfont icon-account"></i>
                    <span>账号管理</span>
                </template>
                <el-menu-item index="/account-list">账号列表</el-menu-item>
                <el-menu-item index="/account-add">添加账号</el-menu-item>
                <el-menu-item index="/password-modify">修改密码</el-menu-item>
                <el-menu-item index="/person-center">个人中心</el-menu-item>
            </el-submenu>

            <!-- 销售统计 -->
            <el-submenu index="6">
                <template slot="title">
                    <i class="iconfont icon-total"></i>
                    <span>销售统计</span>
                </template>
                <el-menu-item index="/total-goods">商品统计</el-menu-item>
                <el-menu-item index="/total-order">订单统计</el-menu-item>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.el-menu{
    border-right: none;
}

.el-menu--inline {
    .el-menu-item {
        background: darken($bg, 5%) !important;
        &:hover {
        background: darken($bg, 10%) !important;
        }
    }
}

.left-menu {
    width: 200px;
    height: 100%;
    background: $bg;
    overflow-y: scroll;
    overflow-x: hidden;
    // 隐藏滚动条
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
    }
}

.logo{
    height: 60px;
    color: white;
    font-weight: 500;
    img {
        width: 40px;
        margin: 0 6px;
    }
}

.iconfont{
    margin-right: 6px;
}
</style>