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
      <el-slider
        v-model="musicDuration"
        :show-tooltip="false"
        :disabled="isUrl"
        @change="musicDurationChange"
        :max="totalDuration"
        tooltip-class="huakuai"
      ></el-slider>
    </div>

    <div class="content">
      <div class="left">
        <div class="singimg" @click.stop="toLylic">
          <img :src="getMusicMenu.al.picUrl" alt=""  />
          <div class="m-img">
            <a href="javascript:void(0)">
              <i
                class="el-icon-arrow-up"
                style="color: rgba(255, 255, 255, 0.8)"
              ></i>
              <i
                class="el-icon-arrow-up"
                style="
                  color: rgba(255, 255, 255, 0.8);
                  position: absolute;
                  top: 12px;
                  left: 13px;
                "
              ></i>
            </a>
          </div>
        </div>
        <div class="sing">
          <div class="name">
            {{ getMusicMenu.ar[0].name }} -
            {{ getMusicMenu.name || getMusicMenu.al.name }}
          </div>
          <div class="singtime">
            <span>{{ musicDuration | showTime }}</span> /
            <span>{{ getTime }}</span>
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
import { formatDate, songTimeFormat } from "@/until";
export default {
  computed: {
    ...mapGetters(["getNowMusic", "getMusicMenu","getIsPlay"]),
    getTime() {
      let date = new Date(this.getMusicMenu.dt);
      return formatDate(date, "mm:ss");
    },
  },
  filters: {
    showTime(value) {
      return songTimeFormat(value);
    },
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
  mounted() {
    this.musicDurationChange();
  },
  methods: {
    toLylic(){ //路由跳转，去到歌曲详情
      this.$router.push({
        path: '/lylic/'+this.getMusicMenu.id+''
      })
    },
    musicDurationChange() {
      //监听歌曲播放情况
      let audio = this.$refs.audio;
      console.log(audio.currentTime);
      audio.currentTime = this.musicDuration;
      audio.addEventListener("timeupdate", () => {
        this.totalDuration = audio.duration;
        this.musicDuration = audio.currentTime;

        if (audio.currentTime >= audio.duration) {
          //监听播放完
          this.isplay = false;
          this.$store.commit("setPlay",this.isplay)
          this.musicDuration = 0;
          console.log("end")
          setTimeout(() => {
            audio.loop = "loop"
            this.playClick()
          }, 1000);

        }
      });
      if(!this.isplay){return;} //如果没有在播放，终止操作
      this.isplay = true 
      this.$store.commit("setPlay",this.isplay)
      // console.log(audio.currentTime)
    },
    playClick() {
      if (this.getNowMusic !== "") {
        if (!this.$refs.audio.paused) {
          this.$refs.audio.pause();
        } else {
          this.$refs.audio.play();
        }
        this.isplay = !this.isplay;
        this.$store.commit("setPlay",this.isplay)
      }
    },
  },
  watch: {
    getNowMusic() {
      //监听是否有歌曲路径变化
      this.isUrl = false;
      this.isplay = true;
      this.$store.commit("setPlay",this.isplay)
    },
  },
};
</script>

<style scoped>
.bottom_bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -70px;
  height: 70px;
  /* background: rgba(0, 0, 255, 0.1); */
  background: #fff;
  /* z-index: 999; */
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
.scroll >>> .el-slider__runway{
  background: rgba(255,255,255,0) !important;
}
.lound {
  position: absolute;
  top: -26px;
  left: 10px;
}

.content {
  display: flex;
  justify-content: space-between;
}
.left {
  display: flex;
}
.singimg {
  margin-left: 10px;
  margin-top: 10px;
  width: 45px;
  height: 45px;
  position: relative;
}
.singimg:hover .m-img {
  display: block;
}
.singimg img {
  width: 45px;
  height: 45px;
}
.m-img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  line-height: 62px;
  font-size: 20px;
  border-radius: 5px;
  display: none;
}
.sing {
  margin-left: 15px;
  margin-top: 10px;
  font-size: 14px;
  margin-right: 10px;
}
.name {
  margin-bottom: 5px;
}
.icon {
  margin-left: 10px;
  margin-top: 25px;
}
.play {
  margin-top: 18px;
}
.play i {
  font-size: 35px;
  color: #5192fe;
}
.right {
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-right: 35px;
}
.more-btn {
  padding: 0;
  width: 60px;
  height: 20px;
  background: none;
  color: #888;
  margin-right: 8px;
}
.ic {
  margin-right: 10px;
}
</style>