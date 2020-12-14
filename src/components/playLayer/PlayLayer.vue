<template>
  <div class="play_icon">
    <i class="el-icon-video-play" :style="{fontSize: size+'px'}"></i>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 60
    }
  }
}
</script>

<style scoped>
.play_icon{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0,0,0,.3);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}
.play_icon i{
  color: rgba(255,255,255,.8);
  font-weight: 700;
}
</style>