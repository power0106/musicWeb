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

/**
 * 获取歌手热门歌曲
 * @param {歌手id} id 
 */
export function getSingerSong(id) {
    return request({
        url: "/artists",
        params: {
            id
        }
    })
}

/**
 * 获取歌手专辑
 * @param {歌手id} id 
 */
export function getSingerAblum(id) {
    return request({
        url: "artist/album",
        params: {
            id
        }
    })
}

/**
 * 获取歌手mv
 * @param {歌手id} id 
 */
export function getSingerMv(id) {
    return request({
        url: "/artist/mv",
        params: {
            id
        }
    })
}

/**
 * 获取艺人介绍
 * @param {歌手id} id 
 */
export function getSingerDesc(id) {
    return request({
        url: "/artist/desc",
        params: {
            id
        }
    })
}

/**
 * 获取相似歌手
 * @param {歌手id} id 
 */
export function getSimiSinger(id) {
    return request({
        url: "/simi/artist",
        params: {
            id
        }
    })
}

/**
 * 获取mv地址
 * @param {mvid} id 
 */
export function getMvUrl(id) {
    return request({
        url: "/mv/url",
        params: {
            id
        }
    })
}

/**
 * 获取mv详情
 * @param {mv id} id 
 */
export function getMvDetail(mvid) {
    return request({
        url: "/mv/detail",
        params: {
            mvid
        }
    })
}

/**
 * 获取mv热门评论
 * @param {mvid} id 
 */
export function getMvHotComment(id) {
    return request({
        url: "/comment/mv",
        params: {
            id
        }
    })
}

/**
 * 获取最新评论
 * @param {*} id 
 * @param {*} offset 
 */
export function getMvNowComment(id, offset) {
    return request({
        url: "/comment/mv",
        params: {
            id,
            offset
        }
    })
}

/**
 * 获取相关视频
 * @param {视频id} id 
 */
export function getRelatedVideo(id) {
    return request({
        url: "/related/allvideo",
        params: {
            id
        }
    })
}