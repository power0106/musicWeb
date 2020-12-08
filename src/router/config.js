/*
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
 */
export default {
    mode: 'history',
    routes: [{
            path: '/',
            redirect() {
                return '/home/rTsyle'
            },
        },
        {
            path: '/home',
            name: '首页',
            component: () =>
                import ('@/views/home/Home.vue'),
            meta: {
                index: 1
            },
            children: [{
                    path: 'rTsyle',
                    name: "个性推荐",
                    component: () =>
                        import ("@/views/right/rmenu/RTstyle.vue"),
                    meta: {
                        index: 2
                    }
                },
                {
                    path: 'rSongList',
                    name: '歌单',
                    component: () =>
                        import ("@/views/right/rmenu/RsongList.vue"),
                    meta: {
                        index: 3
                    }
                },
                {
                    path: 'rAnchorRadio',
                    name: '主播电台',
                    component: () =>
                        import ("@/views/right/rmenu/RAnchorRadio.vue"),
                    meta: {
                        index: 4
                    }
                },
                {
                    path: 'rRank',
                    name: '排行榜',
                    component: () =>
                        import ("@/views/right/rmenu/Rrank.vue"),
                    meta: {
                        index: 5
                    }
                },
                {
                    path: 'rSinger',
                    name: '歌手',
                    component: () =>
                        import ("@/views/right/rmenu/Rsinger.vue"),
                    meta: {
                        index: 6
                    }
                },
                {
                    path: 'rNewMusic',
                    name: '最新音乐',
                    component: () =>
                        import ("@/views/right/rmenu/RnewMusic.vue"),
                    meta: {
                        index: 7
                    }
                }
            ]
        },
        {
            path: '/songdetail/:id',
            name: '歌曲详情',
            component: () =>
                import ('@/components/songDetail/SongDetail'),
            meta: {
                index: -1
            }
        },
        {
            path: '/lylic/:id',
            name: '歌词详情',
            component: () =>
                import ('@/components/lylic/Lylic'),
            meta: {
                index: -1
            }
        },
        {
            path: '/search/:keywords',
            name: '搜索',
            component: () =>
                import ("@/components/search/Search"),
            meta: {
                index: -1
            }
        }
    ]
}