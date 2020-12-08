/*
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
 */
import request from "./request"

/**
 * 获取热门标签
 */
export function getHotTabs() {
    return request({
        url: "/playlist/hot",
    })
}

/**
 * 
 * @param {cat} cat 
 * @param {page} page 
 * 获取歌单组件中热门标签各个数据
 */
export function getHotTabsData(cat, page) {
    return request({
        url: "/top/playlist",
        params: {
            cat: cat,
            offset: page,
            limit: 30
        }
    })
}