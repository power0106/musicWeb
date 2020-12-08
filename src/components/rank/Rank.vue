<template>

    <div class="rank_item">
      <div class="img" :style="{'background-image':'url('+item.coverImgUrl+')'}">
        <i class="el-icon-video-play icon"></i>
        <span class="time">{{item.updateTime | getTime}}更新</span>
      </div>
      <slot></slot>

      <!-- <div class="rank_list">
        <div class="rank_list_item">
          <span class="num">1</span>
          <span class="mucsicname">芒</span>
          <span class="singer">李润棋</span>
        </div>
        
      </div> -->
    </div>
</template>

<script>
import {formatDate} from "@/until"
export default {
  props:{
    item: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    getTime(value){
      let date = new Date(value)
      return formatDate(date,"MM-dd")
    }
  }
};
</script>

<style scoped>
.rank {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 15px auto;
  justify-content: space-around;
}
.rank_item {
  width: 300px;
  margin-bottom: 10px;
  border: 1px solid #D3D3D3;
}
.img {
  width: 100%;
  height: 90px;
  position: relative;
  background:0px -65px / 300px 215px no-repeat;
}
.img img {
  width: 100%;
  height: 100%;
}
.icon{
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 30px;
  color: #fff;
}
.time{
  position: absolute;
  left: 5px;
  bottom: 5px;
  color: #fff;
}

</style>