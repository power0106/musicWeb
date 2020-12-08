<template>
  <div class="song_detail">
    <div class="song_detail_info_left">
      <a href="">
        <img :src="songDetailData.coverImgUrl" alt="" />
      </a>
    </div>

    <div class="song_detail_info_right">
      <div class="title">
        <span class="gedan">歌单</span>
        <span class="tou">{{ songDetailData.name }}</span>
        <div class="title_right">
          <div class="song_num">
            歌曲数
            <p>{{ songDetailData.trackCount }}</p>
          </div>
          <div class="play_num">
            播放数
            <p>{{ songDetailData.playCount | playCount }}</p>
          </div>
        </div>
      </div>

      <div class="creator">
        <a href="">
          <img :src="songDetailData.creator.avatarUrl" alt="" />
        </a>
        <span class="createname">{{ songDetailData.creator.nickname }}</span>
        <span>{{ songDetailData.createTime | showDate }}</span>
      </div>

      <div class="btns">
        <el-button type="primary" size="mini" icon="el-icon-video-play"
          >播放全部</el-button
        >
        <el-button size="small" icon="el-icon-star-off"
          >收藏({{ songDetailData.subscribedCount }})</el-button
        >
        <el-button size="small" icon="el-icon-thumb"
          >分享({{ songDetailData.shareCount }})</el-button
        >
        <el-button size="small" icon="el-icon-download">下载全部</el-button>
      </div>

      <div class="tags">
        标签：<span v-for="(item, index) in songDetailData.tags" :key="index"
          >{{ item
          }}<i>{{
            index + 1 === songDetailData.tags.length ? "" : "/"
          }}</i></span
        >
      </div>

      <div class="desc">
        <span>简介：</span>
        <p>{{ songDetailData.description }}...</p>
      </div>
    </div>
    <!-- <SongDetailInfo :songDetailData="songDetailData"></SongDetailInfo> -->

    <div class="song_tab">
      <el-tabs v-model="activeName" style="marginleft: 50px">
        <el-tab-pane :label="songlist" name="list"> 
          <SongsTable :trackIds="trackIds"></SongsTable>
        </el-tab-pane>
        <el-tab-pane :label="commend" name="comment">
          <SongCommend :songCommend="songCommendData"></SongCommend>
        </el-tab-pane>
        <el-tab-pane :label="shoucang" name="shoucang">
          <SongSubscriber
            :songSubscriberData="songSubscriberData"
          ></SongSubscriber>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SongDetailInfo from "./childrenComps/SongDetailInfo";
import SongCommend from "./childrenComps/SongCommend";
import SongSubscriber from "./childrenComps/SongSubscriber";
import SongsTable from "./childrenComps/SongsTable";

import {
  getSongDetail,
  getSongCommend,
  getSubscriber,
  getSongs,
} from "@/network/home.js";
import { formatDate } from "@/until";
export default {
  name: "songDetail",
  components: {
    SongDetailInfo,
    SongCommend,
    SongSubscriber,
    SongsTable,
  },
  data() {
    return {
      id: null,
      activeName: "list",
      songDetailData: {}, //歌曲详细信息
      songCommendData: [], //歌曲评论数据
      songSubscriberData: [], //歌曲收藏者数据
      trackIds: [], //歌曲列表各个id
      songlist: '歌曲列表',
      commend: "评论",
      shoucang: "收藏者",
    };
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
  created() {
    //拿到对应id
    this.id = this.$route.params.id;
    this.getSongDetail();
    this.getSongCommend();
    this.getSubscriber();
  },
  methods: {
    getSongDetail() {
      //获取目标歌曲详细信息
      getSongDetail(this.id).then((res) => {
        // console.log(res);
        this.songDetailData = res.data.playlist;
        console.log({...res.data.playlist})
        // this.$set(this.songDetailData,{...res.data.playlist})
        // Object.assign({},this.songDetailData,res.data.playlist)
        this.songlist = "歌曲列表("+res.data.playlist.trackCount+")";
        this.commend = "评论(" + res.data.playlist.commentCount + ")";
        this.shoucang = "收藏者(" + res.data.playlist.subscribedCount + ")";
        this.trackIds.push(...res.data.playlist.trackIds)
      });
      console.log(this.songDetailData)
    },
    getSongCommend() { //获取目标歌曲评论信息
      getSongCommend(this.id).then((res) => {
        // console.log(res)
        this.songCommendData = res.data.comments;
      });
    },
    getSubscriber() { //获取目标歌曲收藏者信息
      getSubscriber(this.id).then((res) => {
        console.log(res);
        this.songSubscriberData = res.data.subscribers;
      });
    },
  },
  watch:{
    $route (to,from){
      console.log(to,from)
      
    }
  }
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