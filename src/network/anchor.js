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
 * 获取付费精选列表
 * @param {截取数量} limit 
 * @param {分页} offset 
 */
export function getPaylist(limit, offset) {
    return request({
        url: "/dj/paygift",
        params: {
            limit,
            offset
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

/**
 * 获取电台分类更多内容列表
 * @param {电台分类id} cateId 
 * @param {截取数量} limit 
 * @param {分页} offset 
 */
export function getDjMoreList(cateId, limit, offset) {
    return request({
        url: "/dj/radio/hot",
        params: {
            cateId,
            limit,
            offset
        }
    })
}

/**
 * 获取电台详情
 */
export function getAnchorDetail(rid) {
    return request({
        url: "/dj/detail",
        params: {
            rid
        }
    })
}

/**
 * 获取电台专辑歌曲
 */
export function getDjAblum(rid, asc = false) {
    return request({
        url: "/dj/program",
        params: {
            rid,
            asc
        }
    })
}