<!--
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
-->
<!--
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
-->

<template>
  <div class="r_style">
    <Swiper :banners="banners"></Swiper>
    <MusicList :musicListData="musicListData"></MusicList>
    <Personalized :personalizedData="personalizedData"></Personalized>
    <NewList :newSongData="newSongData"></NewList>
  </div>
</template>

<script>
import Swiper from "@/components/swiper/Swiper"
import MusicList from "@/components/musiclist/MusicList"
import Personalized from "@/components/personalized/Personalized"
import NewList from "@/components/newlist/NewList"

import {getBanner,getMusicList,getPersonalized,getNewSong} from "@/network/home.js"
export default {
  components:{
    Swiper,
    MusicList,
    Personalized,
    NewList
  },
  data(){
    return{
      banners: {}, //轮播图数据
      musicListData: [], //推荐歌单数据
      personalizedData: [], //独家放送数据
      newSongData: [], //最新音乐数据
    }
  },
  created(){
    this.getBanner()
    this.getMusicList()
    this.getPersonalized()
    this.getNewSong()
  },
  methods:{
    /**
     * 网络请求
     */
    getBanner(){ //获取轮播数据
      getBanner().then(res=>{
        this.banners = {...res.data.banners}
      })
    },
    getMusicList(){ //获取推荐歌单数据
      getMusicList().then(res=>{
        this.musicListData = res.data.playlists.slice(0,10)
      })
    },
    getPersonalized(){ //获取独家放送数据
      getPersonalized().then(res=>{
        this.personalizedData = res.data.result
      })
    },
    getNewSong(){ //获取最新音乐数据
      getNewSong().then(res=>{
        this.newSongData = res.data.result
      })
    }
  },
  destroyed(){
    console.log('组件销毁')
  }
}
</script>

<style scoped>
.r_style{
  height: 600px;
  width: 100%;
  /* background: chocolate; */
}
</style>