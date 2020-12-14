import axios from "axios"

export default function request(config) {
    const instance = axios.create({
        baseURL: '/api'
            // baseURL: 'https://autumnfish.cn'
    })

    return instance(config)
}