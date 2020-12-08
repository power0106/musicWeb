import request from "./request"

/**
 * 获取榜单
 */
export function getRanking() {
    return request({
        url: "/toplist"
    })
}

/**
 * 榜单列表数据
 */
export function getRankList(id) {
    return request({
        url: "/playlist/detail",
        params: {
            id
        }
    })
}