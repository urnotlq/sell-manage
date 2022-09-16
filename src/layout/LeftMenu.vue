<template>
    <div class="left-menu">
        <!-- 顶部标题 -->
        <div class="logo df aic">
            <img src="@/assets/imgs/logo.png" alt="">
            酥肉后台管理系统
        </div>
        <!-- 导航栏 -->
        <el-menu 
         :default-active="$route.path"
         class="el-menu-vertical-demo" background-color="#304156"
         text-color="#fff" active-text-color="#a3ca39" 
         unique-opened router>
            <!-- 通过$route.path获取当前路由的地址 传给页面默认选择 -->
            <!-- unique-opened	只保持一个子菜单的展开 -->
            <!-- router 在激活导航时以 index 作为 path 进行路由跳转 -->

            <!-- 用template虚拟标签循环 -->
            <template v-for="item in menu">

                <!-- 仅一级路由 -->
                <el-menu-item :index="item.meta.path" :key="item.meta.path"
                 v-if="item.children.length === 1">
                    <i class="iconfont" :class="item.meta.icon"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>

                <!-- 有二级路由 -->
                <el-submenu :index="item.meta.path" :key="item.meta.title" v-else>
                    <template slot="title">
                        <i class="iconfont" :class="item.meta.icon"></i>
                        <span>{{item.meta.title}}</span>
                    </template>
                    <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">
                        {{subItem.meta.title}}
                    </el-menu-item>
                </el-submenu>

            </template>
        </el-menu>
    </div>
</template>

<script>
import local from '@/utils/local';
export default {
    data() {
        return {
            menu: [],   // 路由菜单
        }
    },
    created () {
        this.menu = local.get('menu');
    },
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