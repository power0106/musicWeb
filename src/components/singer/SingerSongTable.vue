
<template>
  <div class="songs_list">
    <el-table :data="songData" style="width: 100%" @row-dblclick="openDetails">
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
      <el-table-column label="时长"> 
        <template slot-scope="scope">
          <span>{{scope.row.dt | getDt}}</span>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
import {formatDate} from "@/until";

import { getMusiUrl, getMusicMenu } from "@/network/home.js";
export default {
  props: {
    songData: {
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      id: ""
    }
  },
  filters: {
    getDt(value){
      return formatDate(new Date(value),"mm:ss")
    }
  },
  methods:{
    /**
     * 网络请求
     */
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
    openDetails(row){
      this.id = row.id
      this.getMusiUrl(this.id)
      this.getMusicMenu(this.id)
    }
  }
}
</script>

<style scoped>

</style>