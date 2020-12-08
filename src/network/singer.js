import request from "./request"

/**
 * 获取歌手数据
 * @param {类型} type 
 * @param {歌手性质} initial 
 * @param {地区} area 
 * @param {截取数量} limit 
 */
export function getSinger(type, initial, area, limit) {
    return request({
        url: "/artist/list",
        params: {
            type,
            initial,
            area,
            limit
        }
    })
}