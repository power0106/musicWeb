<template>
  <div class="raleted_video_item" @click="raletedVideoClick(relatedata.vid)">
    <div class="left">
      <img :src="relatedata.coverUrl" alt />
      <PlayLayer :size="40"></PlayLayer>
      <div class="right_t">
        <i class="el-icon-video-play
"></i>
        <span>{{ relatedata.playTime | playCount }}</span>
      </div>
      <div class="time">{{relatedata.durationms | getTime}}</div>
    </div>

    <div class="right">
      <div class="r_title">
        <span class="tabs">MV</span>
        {{relatedata.title}}
      </div>
      <div class="r_name">
        <span
          v-for="(item,index) in relatedata.creator"
          :key="index"
        >{{item.userName}} {{index+1 === relatedata.creator.length-1 ? "/" : ""}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import PlayLayer from "@/components/playLayer/PlayLayer"

import {formatDate} from "@/until"
export default {
  components:{
    PlayLayer
  },
  props: {
    relatedata: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  filters:{
    playCount(value){
      let rs = null
      if(value >= 10000){
        rs = (value / 10000).toFixed(1)+'万'
      }else{
        rs = value
      }
      return rs
    },
    getTime(value){
      return formatDate(new Date(value), "mm:ss")
    }
  },
  methods:{
    raletedVideoClick(vid){
      console.log(vid)
      this.$router.push({
        path: "/mvPlay/" +vid
      })
    }
  }
}
</script>

<style scoped>
.raleted_video_item {
  display: flex;
  margin-bottom: 10px;
  margin-top: 15px;
  cursor: pointer;
}
.left {
  width: 50%;
  position: relative;
  margin-right: 8px;
}
.left img {
  width: 100%;
  border-radius: 6px;
}
.right_t {
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0)
  );
  padding: 2px 8px;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  font-size: 14px;
}
.right_t i {
  margin-right: 5px;
}
.time{
  position: absolute;
  background-image: linear-gradient( to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.02) );
  left: 0;
  bottom: 0;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
}
.right {
  flex: 1;
  padding: 10px 8px;
}
.r_title {
  font-size: 14px;
  color: #333333;
  max-width: 195px;
  overflow: hidden;
  max-height: 39px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-wrap: break-word;
}
.tabs {
  padding: 1px 5px;
  border: 1px solid red;
  color: red;
  font-size: 12px;
  margin-right: 5px;
}
.r_name {
  color: #999999;
  font-size: 12px;
  margin-top: 25px;
}
</style>