
<template>
  <div class="title" :style="{width: width+'%'}">
    <h3 :style="{fontSize: size+'px'}">{{title}}</h3>
    <span class="nums" v-if="comment">共{{count | getCount}}条评论</span>
    <div class="more" v-if="isMore">
      <span>更多</span>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    title: {
      type: String,
      default: "模块名称"
    },
    isMore: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 20
    },
    width:{
      type: Number,
      default: 100
    },
    comment: {
      type: Boolean,
      default: false
    },
    count:{
      type: Number,
      default: 0
    }
  },
  filters: {
    getCount(value){
      let result = null
      if(value >= 10000){
        result = (value / 10000).toFixed(1) +"万"
      }else{
        result = value
      }
      return result
    }
  }
};
</script>

<style scoped>
.title{
  position: relative;
  margin: 0 auto;
  border-bottom: 1px solid #E4E7ED;
}
.title h3{
  line-height: 50px;
  font-style: normal;
  font-weight: 400;
}
.more{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.more span{
  color: #999;
  font-size: 14px;
  
}
.title h3{
  display: inline-block;
  margin-right: 15px;
}
.nums{
  color: #666;
  font-size: 15px;
}
</style>