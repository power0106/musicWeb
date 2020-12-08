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
 * 获取歌曲评论信息
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
 * 获取歌曲收藏者
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