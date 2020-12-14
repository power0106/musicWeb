<template>
  <div class="lylic">
    <div class="lylic_main">
      <div class="lylic_top">
        <div class="singer_img_bg">
          <img :src="getMusicMenu.al.picUrl" alt="" />
        </div>
        <div class="singer_play_img">
          <div class="play_bar" ref="play_bar">
            <img src="../../assets/img/playMusic/player_bar.png" alt="" />
          </div>
          <div class="play_disc" ref="playRotate">
            <img src="../../assets/img/playMusic/disc.png" alt="" />
            <div class="disc_img">
              <img :src="getMusicMenu.al.picUrl" alt="" />
            </div>
          </div>
          <div class="btns">
            <el-button size="mini" icon="el-icon-circle-plus-outline"
              >喜欢</el-button
            >
            <el-button size="mini" icon="el-icon-star-off">收藏</el-button>
            <el-button size="mini" icon="el-icon-thumb">分享</el-button>
            <el-button size="mini" icon="el-icon-download">vip下载</el-button>
          </div>
        </div>

        <div class="lylic_text">
          <div class="title">
            <span class="singername">{{ getMusicMenu.name }}</span>
            <span class="tone_q">标准音质</span>
            <div class="info">
              专辑：<span class="zhunji">{{ getMusicMenu.al.name }}</span>
              歌手：<span
                class="singername"
                v-for="(itemx, indey) in getMusicMenu.ar"
                :key="indey"
                >{{ itemx.name
                }}{{ indey + 1 === getMusicMenu.ar.length ? "" : " /" }}</span
              >
            </div>
          </div>
          <div class="lylic_info">
            <div class="lylic_detail">
              <ul>
                <li v-for="(item, index) in lylicObject" :key="index">
                  {{ item.c }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="lylic_back">
          <el-button
            @click="comBack"
            icon="el-icon-copy-document"
            size="small"
          ></el-button>
        </div>
      </div>

      <div class="lylic_bottom">
        <div class="comment">
          <ModuleTitle title="评论" :isMore="false" :width="100" style="margin:0;" :comment="true" :count="totalComment"></ModuleTitle>
          <SongCommend :songCommend="commentData" :head="false"></SongCommend>
          <div class="turn_page">
            <TurnPage :total="totalComment" @turnPageData="turnPageData(arguments)"></TurnPage>
          </div>
        </div>

        <div class="similari">
          <ModuleTitle title="相似歌曲" :isMore="false" style="margin-bottom: 10px;"></ModuleTitle>
          <Simi v-for="(item,index) in simiData" :key="index" :simi-data="item"></Simi>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLylic,getMusicComment,getSimiSong } from "@/network/home.js";

import Simi from "./childrenComps/Simi"

import ModuleTitle from "@/components/moduleTitle/ModuleTitle";
import SongCommend from "@/components/songDetail/childrenComps/SongCommend";
import TurnPage from "@/components/turnPage/TurnPage";

import { mapGetters } from "vuex";
import {itemListenMixin} from "@/until/mixin.js"
export default {
  components: {
    ModuleTitle,
    SongCommend,
    TurnPage,
    Simi
  },
  mixins: [itemListenMixin],
  data() {
    return {
      id: "",
      limit: 20, //默认截取20条
      offset: 0, //分页
      lylic: "",
      lylicObject: {}, //歌词数组
      rotateAngle: 0, //旋转角度
      timer: null, //定时器
      commentData: [], //评论数据
      totalComment: 0, //总评论数
      simiData: [], //相似歌曲数据
    };
  },
  computed: {
    ...mapGetters(["getNowMusic", "getMusicMenu", "getIsPlay"]),
  },
  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.getLylic(this.id);
    this.getMusicComment(this.id,this.limit,this.offset)
    this.getSimiSong(this.id)
  },
  mounted() {
    this.$nextTick(() => {
      if (this.getIsPlay) {
        this.timer = setInterval(this.imgRotate, 100);
      }
    });

    if (!this.getIsPlay) {
      this.$refs.play_bar.style.transform = "rotate(-32deg)";
    } else {
      this.$refs.play_bar.style.transform = "rotate(0deg)";
    }
  },
  methods: {
    /**
     * 网络请求
     */
    getLylic(id) { //获取歌词
      getLylic(id).then((res) => {
        console.log(res);
        this.lylic = res.data.lrc.lyric;
        //解析歌词
        this.parseLyric(this.lylic);
        // console.log(this.lylicObject);
      });
    },
    parseLyric(option) {
      //解析歌词
      var Olrc = {
        ms: [], //歌词数组 m: 歌词 s: 时间
      };
      if (option.length === 0) return;
      var lrcs = option.split("\n"); //用回车拆分数组，每局歌词换行隔开
      for (let i in lrcs) {
        lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
        var arr = lrcs[i].match(/\[(\d+:.+?)\]/g); //提取时间字段，可能有多个
        // console.log(arr)
        var start = 0;
        for (var k in arr) {
          start += arr[k].length; //计算歌词位置 长度叠加
        }
        var content = lrcs[i].substring(start); //获取歌词内容 相当于减去时间字符串的长度剩下的就是内容
        for (var k in arr) {
          var t = arr[k].substring(1, arr[k].length - 1); //取[]间的内容
          // var t = arr[k]
          var s = t.split(":"); //分离:前后文字 便于计算成毫秒数
          // console.log(parseFloat(s[0]))
          Olrc.ms.push({
            //对象{t:时间,c:歌词}加入ms数组
            // t: t,
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
            c: content === "" ? "" : content,
          });
        }
      }

      Olrc.ms.sort(function (a, b) {
        return a.t - b.t;
      });

      this.lylicObject = Olrc.ms;
    },
    getMusicComment(id,limit,offset){ //获取歌曲评论
      getMusicComment(id,limit,offset).then(res=>{
        console.log(res)
        this.totalComment = res.data.total
        this.commentData = res.data.comments
      })
    },
    getSimiSong(id){ //获取相似歌曲
      getSimiSong(id).then(res=>{
        console.log(res)
        this.simiData = res.data.songs
      })
    },
    

    /**
     * 图片旋转
     */
    imgRotate() {
      let Oimg = this.$refs.playRotate;
      Oimg.style.transform = `rotate(${this.rotateAngle}deg)`;
      this.rotateAngle += 2;
    },

    /**
     * 事件处理
     */
    comBack() {
      this.$router.back();
    },
    turnPageData(e){ //分页事件处理
      console.log(e[0])
      this.offset = e[0]
      this.getMusicComment(this.id,this.limit,this.offset)
      this.backTop()
    },
  },
  watch: {
    getIsPlay() {
      if (!this.getIsPlay) {
        //如果停止播放 停止转动
        this.$refs.play_bar.style.transform = "rotate(-32deg)";
        clearInterval(this.timer);
      } else {
        //播放时转动
        this.$refs.play_bar.style.transform = "rotate(0deg)";
        this.timer = setInterval(this.imgRotate, 100);
      }
    },
    $route(to){
      console.log(to)
      this.id = to.params.id
      this.getLylic(this.id)
      this.getMusicComment(this.id)
      getSimiSong(this.id)
    }
  },
  destroyed(){
    clearInterval(this.timer)
  }
};
</script>

<style scoped>
.lylic {
  width: 100%;
  height: 600px;
  position: relative;
  padding-top: 20px;
}
.lylic_main {
  width: 80%;
  margin: 0 auto;
}
.lylic_top {
  display: flex;
  position: relative;
  justify-content: space-between;
}
.singer_img_bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
.singer_img_bg img {
  width: 100%;
  filter: blur(80px);
  max-height: 400px;
  border-radius: 50%;
}
.play_bar {
  position: absolute;
  top: -30px;
  left: 120px;
  z-index: 10;
  transform: rotate(-32deg);
  transition: 0.6s ease-in-out;
  transform-origin: left top;
}
.play_disc {
  width: 254px;
  height: 255px;
  position: relative;
  margin-top: 30px;
  margin-left: 40px;
  transform: rotate(0deg);
  /* transition: .3s linear; */
}
.disc_img {
  width: 140px;
  height: 140px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -70px;
  margin-top: -70px;
}
.disc_img img {
  width: 100%;
  border-radius: 50%;
}
.btns {
  margin-top: 15px;
  position: absolute;
  bottom: 60px;
}
.el-button {
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  color: rgba(0, 0, 0, 0.7);
}
.lylic_text {
  margin-left: 50px;
}
.lylic_detail {
  width: 350px;
  height: 350px;
  overflow: auto;
  transition: scrollTop 0.3s ease 0;
}
.lylic_detail ul {
  list-style: none;
}
.lylic_detail ul li {
  margin-top: 15px;
  font-size: 16px;
}
.singername {
  font-size: 25px;
  color: #000;
  margin-right: 10px;
}
.tone_q {
  padding: 1px 4px;
  border: 1px solid red;
  font-size: 12px;
  color: red;
}
.info {
  margin: 20px 0;
  font-size: 13px;
}
.info span {
  color: rgb(37, 89, 164);
}
.singername {
  font-size: 13px;
}
.zhunji {
  margin-right: 5px;
}
.lylic_info {
  position: relative;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
.lylic_back {
  position: absolute;
  top: 0;
  right: -70px;
}
.lylic_bottom{
  margin-top: 20px;
  display: flex;
}
.comment{
  width: 60%;
  margin-right: 30px;

}
.similari{
  flex: 1;
  margin-top: 50px;
}
</style>