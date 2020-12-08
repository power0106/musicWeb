<template>
  <div class="new_song_list">
    <div class="title">
      <div class="txt">{{title}}</div>
      <div class="right">
        <i class="el-icon-first-aid-kit icon"></i>
        <i class="el-icon-video-play icon"></i>
      </div>
    </div>
    <div v-if="newSongData.length === 0">
      <Loading></Loading>
    </div>
    <div v-else class="new_song_list_item" v-for="(item,index) in newSongData.slice(0,limitEnd)" :key="index">
      <div class="sort">{{index+1}}</div>
      <div class="img">
        <img
          :src="item.album.blurPicUrl"
          alt=""
        />
      </div>
      <div class="song_name">{{item.name}}</div>
      <div class="singer"><span v-for="(items,index) in item.artists" :key="index">{{items.name}}{{index + 1 === item.artists.length ? "" : "/"}}</span></div>
      <div class="time">{{item.duration | getDuration}}</div>
    </div>

    <div class="show_more" v-if="newSongData.length!==0  && isShow" @click="showMore">
      展开全部{{newSongData.length}}首歌曲
      <i class="el-icon-arrow-right"></i>
    </div>
    
  </div>
</template>

<script>
import Loading from "@/components/loading/Loading";

import {formatDate} from "@/until";
export default {
  components:{
    Loading
  },
  props: {
    newSongData: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "热门歌曲",
    },
  },
  data(){
    return{
      isShow: true,
      limitEnd: 10,
    }
  },
  filters:{
    getDuration(value){
      let date = new Date(value)
      return formatDate(date,"mm:ss")
    }
  },
  methods:{
    showMore(){
      this.isShow = false
      this.limitEnd = this.newSongData.length
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  color: #909399;
  line-height: 23px;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
  width: 100%;
}
.txt {
  padding: 6px 10px;
  font-size: 14px;
}
.right {
  margin-right: 10px;
}
.icon {
  font-size: 20px;
  margin-right: 10px;
}
.new_song_list_item{
  display: flex;
  width: 100%;
  border-bottom: 1px solid #ebeef5;
  padding: 15px 8px;
  align-items: center;
  color: #606266;
  font-size: 14px;
}
.img{
  width: 70px;
}
.new_song_list_item img{
  width: 30px;
  height: 30px;
  margin: 0 5px;
}
.sort{
  width: 90px;

}
.song_name{
  width: 180px;
  text-align: center;
}
.singer{
  flex: 1;
  text-align: center;
}
.time{
  width: 100px;
}
.show_more{
  color: #ccc;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
  transition: color .3s;
  width: 150px;
}
.show_more:hover{
  color: #000;
}
</style>