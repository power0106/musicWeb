

<template>
  <div id="home" ref="home">
    <RightTop></RightTop>
    <transition :name="transitionName">
      <keep-alive exclude="songDetail,SingerDetail">
        <router-view :home="home"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import RightTop from "../right/RightTop"
export default {
  components:{
    RightTop
  },
  data(){
    return{
      transitionName: 'slide-left',
      home: null,
    }
  },
  mounted(){
    this.home = this.$refs.home
  },
  watch:{
    $route(to,from){
      console.log(to.meta.index,from.meta.index)
      if(from.meta.index > to.meta.index){
        this.transitionName = "slide-right"
      }
      if(from.meta.index < to.meta.index){
        this.transitionName = "slide-left"
      }
      if (to.meta.index === -1 && to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-com";
      }
      if (from.meta.index === -1) {
        //设置动画名称
        this.transitionName = "slide-com";
      }
      if (to.meta.index === -1 && to.meta.index < from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-back";
      }
    }
  }
}
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.slide-com-enter-active,
.slide-com-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-com-enter {
  opacity: 0;
  transform: translate3d(0,-100%,0);
}
.slide-com-leave-active {
  opacity: 0;
  transform: translate3d(0,100%,0);
}
.slide-back-enter {
  opacity: 0;
  transform: translate3d(0,100%,0);
}
.slide-back-leave-active {
  opacity: 0;
  transform: translate3d(0,-100%, 0);
}
#home{
  padding: 20px 0px;

}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
</style>