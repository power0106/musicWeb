<template>
  <el-carousel-item>
    <img :src="getImg" alt="" />
  </el-carousel-item>
</template>

<script>
export default {
  props:{
    bannerItem:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    getImg(){
      return this.bannerItem.imgUrl || this.bannerItem.pic
    }
  }
};
</script>

<style>
</style>