import Vue from 'vue'
import VueRouter from 'vue-router'
import local from '@/utils/local';

// 引入页面级别组件  静态引入——预编译时引入
import Layout from '@/layout';
import Login from '@/views/login';

Vue.use(VueRouter)

/* 通过 this.$route [路由信息对象] 中的meta属性 可以存储一些信息*/

/* 路由拆分 ———— 静态路由、动态路由、错误路由 */
// 静态路由（所有用户可见）
const routes = [
    // 登录
    {
        path: '/login',
        component: Login,
    },
    // 首页重定向
    {
        path: '/',
        redirect: '/home',
    },
    // 后台首页
    {
        path: '/home',
        component: Layout,
        meta: {
            path: '/home',
            title: '后台首页'
        },
        children: [{
            path: '',
            // 懒加载
            component: () =>
                import ('@/views/home')
        }]
    },

]

// 动态路由（区分权限） 
// 在meta里配置 roles: ['super'] 设置仅super权限可见
const dynamicRoues = [
    // 订单管理
    {
        path: '/order',
        component: Layout,
        meta: {
            path: '/order',
            title: '订单管理'
        },
        children: [
            // 订单列表
            {
                path: '',
                component: () =>
                    import ('@/views/order')
            },
            // 订单详情
            {
                path: '/order-detail',
                component: () =>
                    import ('@/views/order/order-detail')
            },
            // 编辑订单
            {
                path: 'order-edit',
                meta: {
                    roles: ['super'],
                },
                component: () =>
                    import ('@/views/order/order-edit')
            },
        ]
    },
    // 商品管理
    {
        path: '/goods',
        component: Layout,
        redirect: '/goods-list',
        meta: {
            path: '/goods',
            title: '商品管理'
        },
        children: [
            // 商品列表
            {
                path: '/goods-list',
                component: () =>
                    import ('@/views/goods/goods-list'),
                meta: {
                    path: '/goods-list',
                    title: '商品列表'
                },
            },
            // 商品添加
            {
                path: '/goods-add',
                component: () =>
                    import ('@/views/goods/goods-add'),
                meta: {
                    path: '/goods-add',
                    title: '商品添加',
                    roles: ['super'],
                },
            },
            // 商品分类
            {
                path: '/goods-class',
                component: () =>
                    import ('@/views/goods/goods-class'),
                meta: {
                    path: '/goods-class',
                    title: '商品分类'
                },
            },

        ]
    },
    // 店铺管理
    {
        path: '/shop',
        component: Layout,
        meta: {
            path: '/shop',
            title: '店铺管理',
            roles: ['super'],
        },
        children: [{
            path: '',
            component: () =>
                import ('@/views/shop')
        }]
    },
    // 账号管理
    {
        path: '/account',
        component: Layout,
        redirect: '/account-list',
        meta: {
            path: '/account',
            title: '账号管理'
        },
        children: [
            // 账号列表
            {
                path: '/account-list',
                component: () =>
                    import ('@/views/account/account-list'),
                meta: {
                    path: '/account-list',
                    title: '账号列表',
                    roles: ['super'],
                },
            },
            // 添加账号
            {
                path: '/account-add',
                component: () =>
                    import ('@/views/account/account-add'),
                meta: {
                    path: '/account-add',
                    title: '添加账号',
                    roles: ['super'],
                },
            },
            // 修改密码
            {
                path: '/password-modify',
                component: () =>
                    import ('@/views/account/password-modify'),
                meta: {
                    path: '/password-modify',
                    title: '修改密码'
                },
            },
            // 个人中心
            {
                path: '/person-center',
                component: () =>
                    import ('@/views/account/person-center'),
                meta: {
                    path: '/person-center',
                    title: '个人中心'
                },
            },
        ]
    },
    // 销售统计
    {
        path: '/total',
        component: Layout,
        redirect: '/total-goods',
        meta: {
            path: '/total',
            title: '销售统计',
            roles: ['super'],
        },
        children: [
            // 商品统计
            {
                path: '/total-goods',
                component: () =>
                    import ('@/views/total/total-goods'),
                meta: {
                    path: '/total-goods',
                    title: '商品统计'
                },
            },
            // 订单统计
            {
                path: '/total-order',
                component: () =>
                    import ('@/views/total/total-order'),
                meta: {
                    path: '/total-order',
                    title: '订单统计'
                },
            },
        ]
    },
]

// 错误路由
const errorRoutes = [
    // 404页面
    {
        path: '*',
        redirect: '/404',
    }, {
        path: '/404',
        component: () =>
            import ('@/views/error404')
    },
]

// 创建路由实例
const router = new VueRouter({
    routes
})


/* 判断用户是否有权限 */
const isPermission = (role, route) => {
    if (route.meta && route.meta.roles) {
        // 有roles 验证其中是否role值
        return route.meta.roles.includes(role);
    } else {
        // 没有roles 所有人都能访问
        return true;
    }

}

/**
 * 动态计算路由
 * @param {用户角色（字符串）} role 
 * @param {需要计算的路由（数组）} routes 
 */
const calcDynamic = (role, routes) => {
    let res = [];
    routes.forEach(v => {
        // 如果当前路由有权限 则存入结果路由
        if (isPermission(role, v)) {
            // 如果当前路由的儿子非空 则筛选出符合条件的儿子
            if (v.children && v.children.length) {
                v.children = calcDynamic(role, v.children);
            }
            res.push(v);
        }
    })

    // 返回符合条件的动态路由
    return res;
}

/* 创建路由函数 */
export const createRouter = () => {
    // 获取本地角色
    const role = local.get('role');
    // 无角色 跳出
    if (!role) return;
    // 计算出可以使用的路由 传入当前用户角色和需要计算的路由
    const accessRoutes = calcDynamic(role, dynamicRoues);

    // 把筛选好的路由添加进静态路由中
    router.addRoutes([...accessRoutes, ...errorRoutes]);
}

// 初始化创建路由
createRouter();


/**
 * 全局前置路由守卫
 * @param {到哪去 路由对象} to 
 * @param {从哪来 路由对象} from 
 * @param {放行方法} next 
 */
router.beforeEach((to, from, next) => {
    // 获取本地token
    const token = localStorage.getItem('t_k');
    /* 
    if (token) {
        // 有token 放行
        next();
    } else {
        if (to.path === '/login') {
            // 去登录页面 放行
            next();
        } else {
            // 无token 去登录
            next('/login');
        }
    } */
    // 目的地为login直接放行  无token则跳转到login
    if (to.path !== '/login' && !token) next('/login')
    else next()
})

// 处理重复点击导航 路由push地址冗余 控制台报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default router