import requset from "./request"
/**
 * 获取轮播图数据
 */
export function getBanner() {
    return requset({
        url: "/banner"
    })
}

/**
 * 获取10条推荐歌单数据
 */
export function getMusicList() {
    return requset({
        url: "/top/playlist",
        params: {
            offset: (Math.random() * 1297).toFixed(0) - 12,
            limit: 12
        }
    })
}

/**
 * 获取独家放送数据
 */
export function getPersonalized() {
    return requset({
        url: "/personalized/privatecontent"
    })
}

/**
 * 获取独家放送列表
 */
export function getPersonalizedList(limit, offset) {
    return requset({
        url: "/personalized/privatecontent/list",
        params: {
            limit,
            offset
        }
    })
}

/**
 * 获取最新音乐数据
 */
export function getNewSong() {
    return requset({
        url: "/personalized/newsong"
    })
}


/**
 * 获取歌曲详细信息
 */
export function getSongDetail(id) {
    return requset({
        url: "/playlist/detail",
        params: {
            id
        }
    })
}

/**
 * 获取歌曲专辑评论信息
 */
export function getSongCommend(id) {
    return requset({
        url: "/comment/playlist",
        params: {
            id
        }
    })
}

/**
 * 获取歌曲专辑收藏者
 */
export function getSubscriber(id) {
    return requset({
        url: "/playlist/subscribers",
        params: {
            id
        }
    })
}

/**
 * 获取歌曲列表
 */
export function getSongs(ids) {
    return requset({
        url: "/song/detail",
        params: {
            ids
        }
    })
}


/**
 * 获取歌曲播放路径
 */
export function getMusiUrl(id) {
    return requset({
        url: "/song/url",
        params: {
            id
        }
    })
}
/**
 * 获取歌曲详细信息
 * @param {歌曲id} ids 
 */
export function getMusicMenu(ids) {
    return requset({
        url: "/song/detail",
        params: {
            ids
        }
    })
}

/**
 * 获取歌词
 */
export function getLylic(id) {
    return requset({
        url: "/lyric",
        params: {
            id
        }
    })
}

/**
 * 获取歌曲评论
 */
export function getMusicComment(id, limit, offset) {
    return requset({
        url: "/comment/music",
        params: {
            id,
            limit,
            offset
        }
    })
}

/**
 * 获取相似歌曲
 */
export function getSimiSong(id) {
    return requset({
        url: "/simi/song",
        params: {
            id
        }
    })
}