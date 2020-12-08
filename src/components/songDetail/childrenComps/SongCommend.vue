<template>
  <div class="user_commend">
    <ModuleTitle :title="title" :isMore="false" :size="14" style="paddingLeft: 10px" v-if="head"></ModuleTitle>
    <div v-if="songCommend.length > 0">
      <div class="user_commend_item" v-for="(item,index) in songCommend" :key="index">
        <div class="left">
          <a href="">
            <img :src="item.user.avatarUrl" alt="">
          </a>
        </div>
    

        <div class="right">
          <div class="commend_info">
            <span class="nickname">{{item.user.nickname}}</span>：{{item.content}}
          </div>
          
        </div>
        <div class="rp">
            <div class="date">{{item.time | getTime}}</div>
            
            <div class="btns">
              <i class="el-icon-thumb"></i>
              <span class="shu">|</span>
              <span>回复</span>
            </div>
            <div class="clear"></div>
          </div>
      </div>
    </div>
    <div v-else>
      <div class="user_commend_item" >
        <p style="text-align:center">暂无评论</p>
      </div>
    </div>
      
    
  </div>
</template>

<script>
import ModuleTitle from "@/components/moduleTitle/ModuleTitle"

import { formatDate } from "@/until";
export default {
  components:{
    ModuleTitle
  },
  props:{
    songCommend:{
      type: Array,
      default(){
        return []
      }
    },
    head:{
      type: Boolean,
      default: true
    }
  },
  filters:{
    getTime(value){
      let date = new Date(value)
      return formatDate(date, 'MM-dd hh:mm')
      
    }
  },
  data(){
    return{
      title: "最新评论("+this.songCommend.length+")"
    }
  }
}
</script>

<style scoped>
.user_commend{
  width: 100%;
  margin: 0 auto;
}
.user_commend_item{
  align-items: center;
  width: 100%;
  padding: 20px 0px;
  border-bottom: 1px solid #ccc;
  margin: 0 auto;
}
.left{
  width: 50px;
  height: 50px;
  float: left;
  margin-right: 20px;
}
.left img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.right{
  margin-left: 15px;
  font-size: 12px;
  line-height: 20px;
  width: 100%;
}
.nickname{
  color: #0c73c2;
  margin-right: 5px;
}
.rp{
  margin-top: 20px;
  width: 100%;
  text-align: right;
}
.date{
  color: #999;
  font-size: 12px;
  float: left;
}
.shu{
  margin: 0 8px;
  color: #ccc;
}
</style>