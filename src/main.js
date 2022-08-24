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


Vue.config.productionTip = false

// 调用ElementUI
Vue.use(ElementUI);


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')