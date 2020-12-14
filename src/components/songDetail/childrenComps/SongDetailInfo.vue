<template>
  <div class="song_detail">
    <div class="song_detail_info_left">
      <a href="">
        <img :src="getCoverImgUrl" alt="" />
      </a>
    </div>

    <div class="song_detail_info_right" v-if="isShowBase">
      <div class="title">
        <span class="gedan">{{themetype}}</span>
        <span class="tou">{{ songDetailData.name }}</span>
        <div class="title_right">
          <div class="song_num">
            歌曲数
            <p>{{ getTrackCount  }}</p>
          </div>
          <div class="play_num">
            播放数
            <p>{{ songDetailData.playCount | playCount }}</p>
          </div>
        </div>
      </div>

      <div class="creator">
        <a href="">
          <img :src="getCreateImg" alt="" />
        </a>
        <span class="createname">{{ songDetailData.dj.nickname }}</span>
        <span>{{ songDetailData.createTime | showDate }}</span>
      </div>

      <div class="btns">
        <el-button type="primary" size="mini" icon="el-icon-video-play"
          >播放全部</el-button
        >
        <el-button size="small" icon="el-icon-star-off"
          >收藏({{ getSubscribedCount }})</el-button
        >
        <el-button size="small" icon="el-icon-thumb"
          >分享({{ songDetailData.shareCount }})</el-button
        >
        <el-button size="small" icon="el-icon-download">下载全部</el-button>
      </div>

      <div class="tags" v-if="tags">
        标签：<span v-for="(item, index) in songDetailData.tags" :key="index"
          >{{ item
          }}<i>{{
            index + 1 === songDetailData.tags.length ? "" : "/"
          }}</i></span
        >
      </div>

      <div class="desc">
        <span>简介：</span>
        <p>{{ getDesc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/until";
export default {
  props: {
    songDetailData: {
      type: Object,
      default() {
        return {};
      },
    },
    themetype: {
        type: String,
        default: "歌曲"
    },
    tags: {
      type: Boolean,
      default: true
    },
    isShowBase: {
      type: Boolean,
      default: true
    }
  },
  computed:{
    /**对传不同键名过来数据处理 */
    getCoverImgUrl(){
      return this.songDetailData.coverImgUrl || this.songDetailData.picUrl
    },
    getCreateImg(){
      return this.songDetailData.dj.avatarUrl
    },
    getTrackCount(){
      return this.songDetailData.trackCount || this.songDetailData.programCount
    },
    getSubscribedCount(){
      return this.songDetailData.subscribedCount || this.songDetailData.subCount
    },
    getDesc(){
      return this.songDetailData.desc || this.songDetailData.description
    }
  },
  filters: {
    playCount(value) {
      let result = null;
      if (value >= 10000) {
        result = (value / 10000).toFixed(1) + "万";
      } else {
        result = value;
      }
      return result;
    },
    showDate(value) {
      let date = new Date(value);
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.song_detail {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  width: 100%;
  padding-top: 30px;
}
.song_detail_info_left {
  width: 20%;
  margin: 0 20px;
}
.song_detail_info_right {
  flex: 1;
}
.song_detail_info_left img {
  width: 100%;
}
.title {
  display: flex;
  position: relative;
  margin-bottom: 15px;
  align-items: center;
  width: 100%;
}
.gedan {
  padding: 2px 5px;
  border: 1px solid red;
  font-size: 12px;
  color: red;
  margin-right: 10px;
}
.tou {
  font-size: 23px;
}
.title_right {
  display: flex;
  position: absolute;
  right: 100px;
  color: #ccc;
  font-size: 14px;
}
.play_num {
  margin-left: 20px;
}
.creator {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.createname {
  color: rgba(0, 0, 255, 0.7);
  margin-right: 10px;
}
.creator img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.btns {
  margin-bottom: 15px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 7px 15px;
}
.el-button--small,
.el-button--small.is-round {
  padding: 9px 15px;
}
.tags,
.desc {
  font-size: 13px;
}
.tags span {
  font-size: 14px;
  color: #0c73c2;
  margin-right: 5px;
}
.tags span i {
  display: inline-block;
  margin: 0 5px;
  font-size: 14px;
}
.desc {
  line-height: 20px;
}
.desc p {
  display: inline-block;
  margin-top: 15px;
  max-width: 550px;
  font-size: 14px;
  max-height: 20px;
}
.song_tab {
  width: 90%;

  margin: 50px auto;
}
</style>