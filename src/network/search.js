import request from "./request"

/**
 * 
 * @param {搜索内容} keywords 
 * @param {截取数量} limit 
 * @param {分页} offset 
 */
export function getSearchData(keywords, limit = 30, offset) {
    return request({
        url: "/search",
        params: {
            keywords,
            limit,
            offset
        }
    })
}

/**
 * 获取热门搜索
 */
export function getSearchHot() {
    return request({
        url: "/search/hot"
    })
}

/**
 * 搜索联想
 */
export function getSearchSuggest(keywords) {
    return request({
        url: "/search/suggest",
        params: {
            keywords
        }
    })
}

export class getSuggestName {
    constructor(songs) {
        this.name = songs
    }
}