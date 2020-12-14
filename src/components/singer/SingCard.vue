
<template>
  <div class="singer_card">
    
    <div class="img" :style="{width: imgwidth+'px',height: imgheight+'px'}">
      <a href="javascript:void(0);">
        <img v-lazy="getImg" alt="" />
      </a>
      <PlayLayer :size="40" v-if="isplaylayer"></PlayLayer>
    </div>
    <div class="title" :style="{color: tcolor, fontSize: size+'px',maxWidth: maxw+'px'}">{{ item.name }}</div>
    <div class="time" v-if="isTime">{{item.publishTime | getTime}}</div>
  </div>
</template>

<script>
import {formatDate} from "@/until"
import PlayLayer from "@/components/playLayer/PlayLayer"

export default {
  components:{
    PlayLayer
  },
  props: {
    item:{
      type: Object,
      default(){
        return {}
      }
    },
    tcolor: {
      type: String,
      default: "red"
    },
    isTime: {
      type: Boolean,
      default: false
    },
    imgwidth: {
      type: Number,
      default: 160
    },
    imgheight: {
      type: Number,
      default: 120
    },
    size: {
      type: Number,
      default: 14
    },
    maxw: {
      type: Number,
      default: 160
    },
    isplaylayer: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    getTime(value){
      return formatDate(new Date(value),"yyyy.MM.dd")
    }
  },
  computed: {
    getImg(){
      return this.item.picUrl || this.item.imgurl
    }
  },
  methods:{
    // singerCard(id){
    //   this.$router.push({
    //     path: "/singerDetail/"+id
    //   })
    // }
  }
}
</script>

<style scoped>
.singer_card {
  margin-top: 25px;
  margin-bottom: 10px;
  cursor: pointer;
  margin-right: 15px;
}
.img{
  position: relative;
}
.img img {
  width: 100%;
  border-radius: 5px;
}
.singer_card:hover .top_t {
  transform: translateY(0);
}
.singer_card:hover .bottom_t i {
  transform: translateX(0);
}


.title {
  height: 40px;
  padding-top: 10px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  max-height: 40px;
}
.time{
  color: #666;
  font-size: 12px;
}
</style>