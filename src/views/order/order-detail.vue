<template>
    <div>
        订单详情
    </div>
</template>

<script>
import { getOrderDetailReq } from '@/api/order';
export default {
    methods: {
        async getData() {
            // 获取数据
            let { id } = this.$route.query;
            // 发送请求
            let res = await getOrderDetailReq({id});
        }
    },
    created () {
        // 拉取数据
        this.getData();
    },
}
</script>

<style lang="scss" scoped>

</style>