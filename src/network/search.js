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