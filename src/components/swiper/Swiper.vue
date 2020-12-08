<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl || item.pic" alt="">
      </el-carousel-item>
      <!-- <SwiperItem v-for="(item,index) in banners" :key="index" :bannerItem="item"></SwiperItem> -->
    </el-carousel>
  </div>
</template>

<script>
import SwiperItem from "./SwiperItem";
export default {
  components:{
    SwiperItem
  },
  props:{
    banners: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    getImg(){
      return this.banners.imageUrl || this.banners.pic
    }
  }
};
</script>

<style scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.swiper{
  width: 90%;
  margin: 0 auto;
}
.el-carousel__item img{
  width: 100%;
  height: 100%;
}
</style>