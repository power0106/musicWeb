<template>
<div class="s_bg" ref="s_bg">
  <div class="singer_detail">
    <div class="left">
      <ModuleTitle :title="singerBaseInfoData.name" :isMore="false"></ModuleTitle>
      <div class="img">
        <img :src="singerBaseInfoData.picUrl" alt="">
      </div>
      <div class="singer_tab">
         <el-tabs v-model="activeName" style="marginleft: 50px" @tab-click="handleClick">
        <el-tab-pane label="热门作品" name="product"> 
          <SingerSongTable :song-data="singerSongData"></SingerSongTable>
        </el-tab-pane>
        <el-tab-pane label="热门专辑" name="ablum">
          <Loading v-if="ablumData.length === 0"></Loading>
          <div class="card" v-else>
            <SingCard v-for="(item,index) in ablumData" :key="index" :item="item" tcolor="black" :isTime="true"></SingCard>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相关MV" name="mv">
          <Loading v-if="singerMvData.length === 0"></Loading>
          <div class="card" v-else>
            <SingCard v-for="(item,index) in singerMvData" :key="index" :item="item" tcolor="black" :isplaylayer="true" @click.native="singMvClick(item.id)"></SingCard>
          </div>
        </el-tab-pane>
        <el-tab-pane label="艺人介绍" name="desc">
          <Loading v-if="Object.keys(singerDescData).length === 0"></Loading>
          <div class="singer_desc" v-else>
            <ModuleTitle :isMore="false" :title="name" style="font-weight: 700;"></ModuleTitle>
            <div class="info">
              {{singerDescData.briefDesc}}
            </div>

            <div class="go_through">
              <div class="go_through_item" v-for="(item,index) in singerDescData.introduction" :key="index">
                <ModuleTitle :title="item.ti" :isMore="false"></ModuleTitle>
                <div class="info">
                  {{item.txt}}
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      </div>
    </div>
    <div class="right">
      <div class="card" style="margin-left: 45px;">
        <ModuleTitle :title="isHot ? '热门歌手' :'相似歌手'" :isMore="false" :size="16"></ModuleTitle>
        <SingCard v-for="(item,index) in simiSingerData" :key="index" :item="item" :imgwidth="50" :imgheight="50" tcolor="black" :size="12" :maxw="50" @click.native="singCard(item.id)"></SingCard>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {getSingerSong,getSingerAblum,getSingerMv,getSingerDesc,getSimiSinger,getSinger} from "@/network/singer.js";

import SingerSongTable from "./SingerSongTable";
import SingCard from "./SingCard"

import SongCommend from "@/components/songDetail/childrenComps/SongCommend";
import ModuleTitle from "@/components/moduleTitle/ModuleTitle";
import Loading from "@/components/loading/Loading";
export default {
  name: "SingerDetail",
  components:{
    SingerSongTable,
    SingCard,
    SongCommend,
    ModuleTitle,
    Loading
  },
  data(){
    return{
      activeName: "product",
      id: "",
      name: "",
      type: -1,
      initial: -1,
      area: -1,
      limit: 9,
      isHot: false,
      singerBaseInfoData: {}, //歌手基本信息数据
      singerSongData: [], //歌手歌曲数据
      ablumData: [], //歌手专辑数据
      singerMvData: [], //歌手mv数据
      singerDescData: {}, //歌手详细资料数据
      simiSingerData: [], //相似歌手数据
    }
  },
  created(){
    this.id = this.$route.params.id
    console.log(this.id)
    
    this.getSingerSong(this.id)
    this.getSimiSinger(this.id)
  },
  methods:{
    /**
     * 网络请求
     */
    getSingerSong(id){ //获取歌手热门歌曲
      getSingerSong(id).then(res=>{
        // console.log(res)
        this.name = res.data.artist.name + "简介"
        this.singerBaseInfoData = res.data.artist
        this.singerSongData = res.data.hotSongs
      })
    },

    getTypeData(type,id){ //获取不同tab栏对应的数据
      if(type === "ablum"){
        getSingerAblum(id).then(res=>{ //取歌手专辑
          this.ablumData = res.data.hotAlbums
        })
      } else if(type === "mv"){
          getSingerMv(id).then(res=>{ //获取歌手mv
        // console.log(res)
            this.singerMvData = res.data.mvs
          })
      }else if(type === "desc"){
          getSingerDesc(id).then(res=>{ //获取艺人信息
          //console.log(res)
            this.singerDescData = {...res.data}
          })
      }
    },

    getSimiSinger(id){ //获取相似歌手
      getSimiSinger(id).then(res=>{
        console.log(res)
        if(res.data.artists.length !== 0){ //如果有相似歌手拉取相似歌手数据展示
          this.simiSingerData = res.data.artists
        }else{ //没有相似歌手默认拉取热门歌手
          this.isHot = true
          getSinger(this.type,this.initial,this.area,this.limit).then(res=>{
            // console.log(res)
            this.simiSingerData = res.data.artists
          })
        }
      })
    },
    // getSinger(type,initial,area,limit){
      
    // },

    /**
     * 事件处理
     */
    handleClick(tab,event){ //tab栏点击发对应网络请求拉取对应数据
      console.log(tab.name)
      switch(tab.name){
        case "ablum":
          this.getTypeData(tab.name,this.id)
          // this.getSingerAblum(this.id)
          break;
        case "mv":
          console.log(this.id)
          this.getTypeData(tab.name,this.id)
          // this.getSingerMv(this.id)
          break;
        case "desc":
          this.getTypeData(tab.name,this.id)
          // this.getSingerDesc(this.id)
          break;
        default: 
          this.getSingerSong(this.id)
      }
      
    },
    singCard(id){ //相似歌手点击事件
      this.$router.push({
        path: "/singerDetail/"+id
      })
    },
    singMvClick(id){ //歌手mv点击事件
      this.$router.push({
        path: "/mvPlay/" +id
      })
    }

  },
  watch: {
    $route(to){
      console.log(to,this.activeName)
      this.id = to.params.id
      this.getSingerSong(this.id)
      this.getTypeData(this.activeName,this.id)
      this.getSimiSinger(this.id)
      // this.handleClick(this.activeName)
    }
  }
}
</script>

<style scoped>
.s_bg{
  width: 100%;
  background: #F5F5F5;
}
.singer_detail{
  width: 90%;
  margin: 10px auto;
  display: flex;
}
.left{
  flex: 1;
  background: #fff;
  padding: 47px 30px 40px 39px;
  border: 1px solid #D3D3D3;
}
.img{
  width: 640px;
  height: 300px;
}
.img img{
  width: 100%;
  height: 100%;
}
.right{
  width: 270px;
}
.singer_tab{
  margin-top: 50px;
}
.card{
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0px 5px;
  width: 90%;
  margin: 15px auto;
}
.info{
  line-height: 25px;
  color: #666;
  text-indent: 2em;
  margin-top: 20px;
  font-size: 12px;
}
</style>