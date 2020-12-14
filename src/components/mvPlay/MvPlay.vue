<template>
  <div class="mv_play">
    <div class="video">
      <div class="video_play_left">
        <div class="title">
          <span class="mv">MV</span>
          <span class="title_name">{{mvDetailData.name}}</span>
          <span
            class="name"
            v-for="(item,index) in mvDetailData.artists"
            :key="index"
          >{{item.name}} {{index+1 === mvDetailData.artists.length-1 ? "/" : ""}}</span>
        </div>
        <div class="video_main">
          <video :src="mvUrl" width="580px" height="300px" controls></video>
        </div>

        <div class="hot_comment" v-if="isHotComment">
          <ModuleTitle :isMore="false" title="精彩评论"></ModuleTitle>
          <SongCommend :songCommend="mvHotCommentData" :head="false"></SongCommend>
        </div>

        <div class="now_commen">
          <ModuleTitle :isMore="false" title="最新评论" :comment="true" :count="totalComment"></ModuleTitle>
          <SongCommend :songCommend="mvNowCommentData" :head="false"></SongCommend>
          <TurnPage :total="totalComment" :pagesize="20" @turnPageData="turnPageData(arguments)"></TurnPage>
        </div>
      </div>

      <div class="video_play_right">
        <div class="video_info">
          <ModuleTitle title="MV介绍" :isMore="false"></ModuleTitle>
          <div class="time">
            <span class="create_time">发布时间：{{mvDetailData.publishTime}}</span>
            <span class="play_count">播放次数：{{mvDetailData.playCount | getPlayCount}}</span>
          </div>

          <div class="desc">
            <div class="jian">简介：</div>
            {{mvDetailData.desc}}
          </div>
        </div>

        <div class="raleted_video">
          <ModuleTitle title="相关视频" :isMore="false"></ModuleTitle>
          <RalatedCard v-for="(item,index) in raletedVideoData" :key="index" :relatedata="item"></RalatedCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RalatedCard from './RelatedCard'

import ModuleTitle from '@/components/moduleTitle/ModuleTitle'
import SongCommend from '@/components/songDetail/childrenComps/SongCommend'
import TurnPage from '@/components/turnPage/TurnPage'


import {
  getMvUrl,
  getMvDetail,
  getMvHotComment,
  getMvNowComment,
  getRelatedVideo,
} from '@/network/singer.js'

import { itemListenMixin } from '@/until/mixin.js'
export default {
  components: {
    ModuleTitle,
    SongCommend,
    TurnPage,
    RalatedCard,
  },
  mixins: [itemListenMixin],
  data() {
    return {
      id: '',
      mvUrl: '',
      mvDetailData: {},
      mvHotCommentData: [],
      mvNowCommentData: [],
      isHotComment: true,
      offset: 0,
      totalComment: 0,
      raletedVideoData: [],
    }
  },
  filters: {
    getPlayCount(value) {
      let rs = null
      if (value >= 10000) {
        rs = (value / 10000).toFixed(1) + '万'
      } else {
        rs = value
      }
      return rs
    },
  },
  created() {
    this.id = this.$route.params.id
    this.getMvUrl(this.id)
    this.getMvDetail(this.id)
    this.getMvHotComment(this.id)
    this.getMvNowComment(this.id, this.offset)
    this.getRelatedVideo(this.id)
  },
  methods: {
    getMvUrl(id) {
      getMvUrl(id).then((res) => {
        //获取mv路径
        // console.log(res)
        this.mvUrl = res.data.data.url
      })
    },
    getMvDetail(id) {
      getMvDetail(id).then((res) => {
        //获取mv详情
        console.log(res)
        this.mvDetailData = res.data.data
      })
    },
    getMvHotComment(id) {
      //获取mv热门评论
      getMvHotComment(id).then((res) => {
        console.log(res)
        this.hotTotal = res.data.hotComments.length
        this.mvHotCommentData = res.data.hotComments
      })
    },
    getMvNowComment(id, offset) {
      //获取最新评论
      getMvNowComment(id, offset).then((res) => {
        console.log(res)
        this.totalComment = res.data.total
        this.mvNowCommentData = res.data.comments
      })
    },
    getRelatedVideo(id) {
      //获取相关视频
      getRelatedVideo(id).then((res) => {
        console.log(res)
        this.raletedVideoData = res.data.data
      })
    },

    /**
     * 事件处理
     */
    turnPageData(e) {
      console.log(e[0])
      if (e[0] > 1) {
        this.isHotComment = false
        this.offset = e[0]
        this.getMvNowComment(this.id, this.offset)
        this.backTop()
      } else {
        this.isHotComment = true
        this.offset = e[0]
        this.getMvNowComment(this.id, this.offset)
        this.backTop()
      }
    },
  },
  watch: {
    $route(to) {
      console.log(to)
      this.id = to.params.id
      this.getMvUrl(this.id)
      this.getMvDetail(this.id)
      this.getMvHotComment(this.id)
      this.getMvNowComment(this.id, this.offset)
      this.getRelatedVideo(this.id)
      this.backTop()
    },
  },
}
</script>

<style scoped>
.mv_play {
  width: 90%;
  margin: 15px auto;
}
.video {
  padding: 10px 6px;
  display: flex;
  flex-wrap: wrap;
}
.video_play_left {
  flex: 1;
}
.video_main {
  width: 100%;
  padding: 10px 0;
}
.video_play_right {
  width: 320px;
}
.video_info{
  margin-left: 50px;
}
.title {
  color: #333333;
}
.mv {
  padding: 3px 6px;
  border: 1px solid red;
  color: red;
  font-size: 14px;
  margin-right: 5px;
}
.title_name {
  margin-right: 15px;
  display: inline-block;
  width: 380px;
  height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.name {
  color: #666666;
  font-size: 12px;
}
.time {
  color: #666;
  font-size: 13px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.jian {
  display: inline-block;
}
.desc {
  display: inline-block;
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  line-height: 25px;
}
.now_commen {
  margin-top: 80px;
}

.raleted_video {
  margin-top: 135px;
  margin-left: 50px;
}
</style>