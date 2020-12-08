import request from "./request"

/**
 * 获取轮播图数据
 */
export function getDjBanner() {
    return request({
        url: "/dj/banner"
    })
}

/**
 * 获取分类列表
 */
export function getCateList() {
    return request({
        url: "/dj/catelist"
    })
}

/**
 * 获取个性推荐数据
 */
export function getRecommends() {
    return request({
        url: "/dj/recommend"
    })
}

/**
 * 获取付费精选数据 截取四条展示
 */
export function getPaygift() {
    return request({
        url: "/dj/paygift",
        params: {
            limit: 4
        }
    })
}

/**
 * 获取板块内容数据
 */
export function getRecommendType(type) {
    return request({
        url: "/dj/recommend/type",
        params: {
            type
        }
    })
}