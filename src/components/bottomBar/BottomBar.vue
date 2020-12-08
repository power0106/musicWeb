<!--
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
-->
<template>
  <div class="bottom_bar">
    <div class="scroll">
      <el-slider v-model="musicDuration" 
      :show-tooltip="false" :disabled="isUrl" @change="musicDurationChange" :max="totalDuration"></el-slider>
    </div>

    <div class="content">
      <div class="left">
        <div class="singimg">
          <img
            :src="getMusicMenu.al.picUrl"
            alt=""
          />
        </div>
        <div class="sing">
          <div class="name">{{getMusicMenu.ar[0].name}} - {{getMusicMenu.name || getMusicMenu.al.name}}</div>
          <div class="singtime">
            <span>{{musicDuration | showTime}}</span> /
            <span>{{getTime}}</span>
          </div>
        </div>
        <div class="icon">
          <span style="cursor: pointer">
            <i class="el-icon-star-off"></i>
            <!-- <i class="el-icon-star-on" v-show="false"></i> -->
          </span>
        </div>
        <div class="icon">
          <span style="cursor: pointer">
            <i class="el-icon-download"></i>
          </span>
        </div>
        <div class="icon">
          <span style="cursor: pointer">
            <i class="el-icon-chat-dot-square"></i>
          </span>
        </div>
        <div class="icon">
          <span style="cursor: pointer">
            <i class="el-icon-more-outline"></i>
          </span>
        </div>
      </div>

      <div class="play" @click="playClick">
        <div class="start">
          <span style="cursor: pointer">
            <i class="el-icon-video-pause" v-if="isplay"></i>
            <i class="el-icon-video-play" v-show="!isplay"></i>
          </span>
        </div>
      </div>

      <div class="right">
        <el-button type="primary" class="more-btn">
          倍速
          <i class="el-icon-arrow-up el-icon--right"></i>
        </el-button>
        <el-button type="primary" class="more-btn">
          标准
          <i class="el-icon-arrow-up el-icon--right"></i>
        </el-button>
        <div>
          <a href="#">
            <i class="el-icon-s-data ic"></i>
          </a>
        </div>
        <div>
          <a href="#">
            <i class="el-icon-sort ic"></i>
          </a>
        </div>
        <div>
          <a href="#">
            <i class="el-icon-close-notification ic"></i>
          </a>
        </div>
      </div>
    </div>
    <audio :src="getNowMusic" autoplay ref="audio"></audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {formatDate,songTimeFormat} from "@/until";
export default {
  computed: {
    ...mapGetters(["getNowMusic", "getMusicMenu"]),
    getTime(){
      let date = new Date(this.getMusicMenu.dt)
      return formatDate(date,"mm:ss")
    }
  },
  filters:{
    showTime(value){
      return songTimeFormat(value)
    }
  },
  data() {
    return {
      musicscroll: 0,
      isplay: false, //是否正在播放
      musicDuration: 0, //当前歌曲播放的时间
      isUrl: true, //设置没有歌曲路径进度条不能点
      totalDuration: 100, //总时长
    };
  },
  mounted(){
    this.musicDurationChange()
  },
  methods: {
    musicDurationChange(){ //监听歌曲播放情况
      let audio = this.$refs.audio
      console.log(audio.currentTime)
      audio.currentTime = this.musicDuration
      audio.addEventListener("timeupdate",()=>{
        this.totalDuration = audio.duration
        this.musicDuration = audio.currentTime;

        if(audio.currentTime >= audio.duration){ //监听播放完
          this.isplay = false
          this.musicDuration = 0

        }
      })
      // console.log(audio.currentTime)
    },
    playClick(){
      if(this.getNowMusic !== ""){
        this.isplay = !this.isplay
        if (!this.$refs.audio.paused) {
          this.$refs.audio.pause();
        } else {
          this.$refs.audio.play();
        }
      }
    }
  },
  watch:{
    getNowMusic() { //监听是否有歌曲路径变化
      this.isUrl = false;
      this.isplay = true;
    },
  }
};
</script>

<style scoped>
.bottom_bar {
  position: relative;
  left: 0;
  bottom: 0;
  height: 70px;
  background: rgba(0, 0, 255, 0.1);
}
.scroll {
  position: absolute;
  width: 98%;
  top: -20px;
  margin: 0 auto;
}
.scroll .el-slider__bar {
  background-image: linear-gradient(to left, #a1c4fd 0%, #c2e9fb 100%);
}
.lound .el-slider__bar {
  background: linear-gradient(#a1c4fd 0%, #c2e9fb 100%);
}
.loundBox:hover .el-slider.is-vertical .el-slider__runway {
  display: block;
}
.lound .el-slider__button {
  width: 10px;
  height: 10px;
}
.lound .el-slider.is-vertical .el-slider__runway {
  width: 4px;
  display: none;
}
.lound {
  position: absolute;
  top: -26px;
  left: 10px;
}

.content{
  display: flex;
  justify-content: space-between;
}
.left{
  display: flex;

}
.singimg{
  margin-left: 10px;
  margin-top: 10px;
}
.singimg img {
  width: 45px;
  height: 45px;
}
.sing{
  margin-left: 15px;
  margin-top: 10px;
  font-size: 14px;
  margin-right: 10px;
}
.name{
  margin-bottom: 5px;
}
.icon{
  margin-left: 10px;
  margin-top: 25px;
}
.play{
  margin-top: 18px;

}
.play i {
  font-size: 35px;
  color: #5192fe;
}
.right{
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-right: 35px;
}
.more-btn{
    padding: 0;
    width: 60px;
    height: 20px;
    background: none;
    color: #888;
    margin-right: 8px;
}
.ic{
  margin-right: 10px;
}
</style>