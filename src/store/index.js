import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex)

const state = {
    nowmusic: "", //当前歌曲
    musicmenu: [], //当前歌曲信息
    isplay: false, //播放状态
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})