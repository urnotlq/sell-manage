<template>
    <div class="card-list df jcsb">
        <div v-for="(item, index) in cardData" :key="index" class="card-item df aic jcsb">
            <!-- 设置具名作用域插槽 :img给插槽传参 -->
            <slot name="img" :img="item.img"></slot>
            <!-- 设置匿名作用域插槽 :info给插槽传参（一个对象） -->
            <div class="info df fdc aic">
                <slot :info="{name: item.name,num: item.num}"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // 接收父组件传入的数据
    props: {
        cardData: Array,
    },
}
</script>

<style lang="scss" scoped>
.card-item{
    width: 22%;
    padding: 8px 20px;
    background: #fff;
    box-shadow: 0 0 10px #ccc;
}
.img{
    width: 52px;
    height: 52px;
}
.info h4{
    color: #999;
    font-weight: normal;
    padding: 6px;
}
.info p{
    font-size: 18px;
    font-weight: 600;
}
</style>