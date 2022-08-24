import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入页面级别组件  静态引入——预编译时引入
import Layout from '@/layout';
import Login from '@/views/login';

Vue.use(VueRouter)

// 配合页面级别组件与路由地址的一一对应关系
const routes = [
    // 登录
    {
        path: '/login',
        component: Login
    },
    // 重定向
    {
        path: '/',
        redirect: '/home'
    },
    // 后台首页
    {
        path: '',
        component: Layout,
        children: [{
            path: '/home',
            // 懒加载
            component: () =>
                import ('@/views/home')
        }]
    },
    // 订单管理
    {
        path: '',
        component: Layout,
        children: [{
            path: '/order',
            component: () =>
                import ('@/views/order')
        }]
    },
    // 商品管理
    {
        path: '',
        component: Layout,
        children: [{ // 商品列表
                path: '/goods-list',
                component: () =>
                    import ('@/views/goods/goods-list')
            },
            { // 商品添加
                path: '/goods-add',
                component: () =>
                    import ('@/views/goods/goods-add')
            },
            { // 商品分类
                path: '/goods-class',
                component: () =>
                    import ('@/views/goods/goods-class')
            },

        ]
    },
    // 店铺管理
    {
        path: '',
        component: Layout,
        children: [{
            path: '/shop',
            component: () =>
                import ('@/views/shop')
        }]
    },
    // 账号管理
    {
        path: '',
        component: Layout,
        children: [{
                // 添加账号
                path: '/account-add',
                component: () =>
                    import ('@/views/account/account-add'),
            },
            {
                // 账号管理
                path: '/account-list',
                component: () =>
                    import ('@/views/account/account-list'),
            },
            {
                // 修改密码
                path: '/password-modify',
                component: () =>
                    import ('@/views/account/password-modify'),
            },
            {
                // 个人中心
                path: '/person-center',
                component: () =>
                    import ('@/views/account/person-center'),
            },
        ]
    },
    // 销售统计
    {
        path: '',
        component: Layout,
        children: [{
                // 商品统计
                path: '/total-goods',
                component: () =>
                    import ('@/views/total/total-goods'),
            },
            {
                // 订单统计
                path: '/total-order',
                component: () =>
                    import ('@/views/total/total-order'),
            },
        ]
    },
    // 404页面
    {
        path: '*',
        redirect: '/404',
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error404')
    }

]

const router = new VueRouter({
    routes
})

export default router