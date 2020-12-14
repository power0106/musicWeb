/*
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
 */
/*
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import ElementUI from 'element-ui';
import vueLazyload from "vue-lazyload"

import 'element-ui/lib/theme-chalk/index.css';

import "./assets/css/reset.css"

Vue.config.productionTip = false

//获取原型对象上的push函数


/**图片懒加载 */
Vue.use(vueLazyload, {
    loading: require('./assets/img/common/loading.png')
})

Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')