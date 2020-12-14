<template>
  <div class="album_list">
    <table>
      <tbody>
        <tr @dblclick="albumClick(albumData.id)">
          <td class="num">{{index +1}}</td>
          <td><img :src="albumData.coverUrl" alt=""></td>
          <td class="name">{{albumData.name}}</td>
          <td class="zhuan">
           播放<span>{{albumData.listenerCount | getPlayCount}}</span></td>
          <td class="zan">赞<span>{{albumData.likedCount}}</span></td>
          <td class="time">{{albumData.createTime | getTime}}</td>
          <td class="dt">{{albumData.duration | getDt}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getMusiUrl, getMusicMenu } from "@/network/home.js";

import {formatDate} from "@/until";
export default {
  props: {
    albumData: {
      type: Object,
      default(){
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  filters: {
    getPlayCount(value){
      let rs = null
      if(value >= 10000){
        rs = (value / 10000).toFixed(1)+"万"
      }else{
        rs = value
      }
      return rs
    },
    getTime(value){
      return formatDate(new Date(value),"yyyy-MM-dd")
    },
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
    albumClick(id){
      this.getMusiUrl(id)
      this.getMusicMenu(id)
    }
  }
}
</script>

<style scoped>
.album_list{
  width: 90%;
  margin: 0 auto;
}
.album_list img{
  width: 50px;
  height: 50px;
}
table{
  width: 100%;
  border: 1px solid #d9d9d9;
  border-bottom: none;
}
tbody tr{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 5px;
  height: 55px;
  user-select: none;
}
tbody tr:hover{
  background: #E6E6E6;
}
tbody tr:nth-child(even){
  background: #f7f7f7;
}
tbody tr td{
  /* flex: 1; */
  color: #333;
  font-size: 16px;
  font-family: "Arial";
}
.zhuan{
  width: 100px;
  color: #666;
  margin-left: 50px;
}
.zan{
  width: 70px;
  color: #666;
}
.name{
  width: 230px;
}
.icon,.num{
  color: #BCBCBC;
  font-size: 26px;
  width: 40px;
  text-align: center;
}
.num{
  font-size: 18px;
  
}
.icon{
  margin-right: 20px;
}
.time,.dt{
  color: #999;
  font-size: 15px;
  width: 85px;
}
</style>