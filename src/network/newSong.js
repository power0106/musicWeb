import request from "./request"

export function getNewSong(type) {
    return request({
        url: "/top/song",
        params: {
            type
        }
    })
}