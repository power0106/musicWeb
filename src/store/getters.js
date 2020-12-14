export default {
    getNowMusic(state) {
        if (state.nowmusic === null) {
            state.nowmusic = ""
        }
        return state.nowmusic
    },

    getMusicMenu(state) {
        if (state.musicmenu.al === undefined) {
            return {
                al: {
                    picUrl: require('../assets/img/playMusic/music.jpg'),
                    name: '歌名',
                    pic: 0,
                    id: 0,
                },
                ar: [{
                    id: 0,
                    name: '歌手'
                }],
                dt: 0,
            }
        } else {
            return state.musicmenu
        }
    },
    getIsPlay(state) {
        return state.isplay
    }
}