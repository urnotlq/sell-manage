<template>
    <div class="layout df">
        <!-- 左侧导航 -->
        <div class="nav fn">
            <left-menu></left-menu>
        </div>

        <!-- 右侧内容 -->
        <div class="main f1 df fdc">
            <!-- 右侧头部 -->
            <right-header></right-header>
            <!-- 右侧内容 -->
            <div class="content f1">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
// 引入组件
import LeftMenu from './LeftMenu.vue';
import RightHeader from './RightHeader.vue';

export default {
    // 注册组件
    components:{
        LeftMenu,
        RightHeader,
    },
}
</script>

<style lang="scss" scoped>
.layout{
    height: 100%;
}
</style>