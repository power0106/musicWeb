<!--
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
-->
<template>
  <div class="songs_list">
    <el-table :data="songsList" style="width: 100%" @row-dblclick="openDetails">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="操作" width="70">
        
        <a href="javascript:void(0);" class="icon">
          <i class="el-icon-video-play"></i>
          <!-- <i class="el-icon-star-on"></i> -->
        </a>
     
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" width="180">
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" width="180">
      </el-table-column>
      <el-table-column prop="al.name" label="专辑"> </el-table-column>
      <el-table-column prop="dt" label="时长"> </el-table-column>
    </el-table>


  </div>
</template>

<script>
import { getSongs } from "@/network/home.js";
import { formatDate } from "@/until";

import { getMusiUrl, getMusicMenu } from "@/network/home.js";
export default {
  props: {
    trackIds: {
      type: Array,
      default() {
        return [];
      },
    },
    
  },
  data() {
    return {
      ids: [],
      songsList: [],
      id: ""
    };
  },
  created() {
    for (let key in this.trackIds) {
      // console.log(this.trackIds[key])
      this.ids.push(this.trackIds[key].id); //获取到歌曲列表各个id
    }
    // console.log(this.ids);
    this.ids.map((item) => {
      this.getSongs(item);
    });
    // console.log(this.songsList);
  },
  methods: {
    /**
     * 网络请求
     */
    getSongs(ids) { //获取专辑歌曲
      getSongs(ids).then((res) => {
        // console.log(res)
        res.data.songs[0].dt = formatDate(new Date(res.data.songs[0].dt), "mm:ss")
        this.songsList.push(res.data.songs[0]);
      });
      // console.log(this.songsList)
    },
    getMusiUrl(id) {
      //获取歌曲播放路径
      getMusiUrl(id).then((res) => {
        // console.log(res)
        this.$store.commit("nowMusic", res.data.data[0].url);
      });
    },
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        console.log(res);
        this.$store.commit("nowMusicMenu",res.data.songs[0])
      });
    },


    /**
     * 事件处理
     */
    playMusic(){
      
      this.getMusiUrl(this.id)
      this.getMusicMenu(this.id)
    },
    openDetails(row){
      console.log(row)
      this.id = row.id
      this.playMusic(row)
      
    }
  },
};
</script>

<style scoped>
</style>