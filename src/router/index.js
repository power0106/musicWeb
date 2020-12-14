import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config.js'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter(config)

export default router