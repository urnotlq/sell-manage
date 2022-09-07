import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';

// 引入默认样式
import '@/assets/css/property.css';
import '@/assets/css/reset.css';
// 引入字体图标
import '@/assets/fonts/iconfont.css';
// 引入ElementUI
import 'element-ui/lib/theme-chalk/index.css';

// 全局过滤器
import * as filters from '@/filters';
Object.keys(filters).forEach(key => {
    // 循环注册过滤器
    Vue.filter(key, filters[key]);
});
// 引入的 filters 是一个对象
// Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组

// 创建中央事件总线
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false

// 调用ElementUI
Vue.use(ElementUI);


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')