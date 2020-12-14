export default {
    nowMusic(state, url) {
        state.nowmusic = url
    },
    nowMusicMenu(state, menu) {
        state.musicmenu = {...menu }
    },
    setPlay(state, flag) {
        state.isplay = flag
    }
}