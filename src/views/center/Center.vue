<template>
  <div id="center">
    <el-container class="c_main">
      <el-aside width="241px" style="background-color: rgb(238, 241, 246)">
        <Left></Left>
      </el-aside>
      <div class="c_main_center">
        <!-- <RightTop></RightTop> -->
        <keep-alive exclude="songDetail">
          <transition :name="transitionName">
            <router-view></router-view>
          </transition>
        </keep-alive>
      </div>
    </el-container>
  </div>
</template>

<script>
import Left from "../left/Left";
import RightTop from "../right/RightTop";
export default {
  components: {
    Left,
    RightTop,
  },
  data() {
    return {
      transitionName: "",
    };
  },
  watch: {
    $route(to, from) {
      if (from.meta.index > to.meta.index) {
        this.transitionName = "slide-right";
      }
      if (from.meta.index < to.meta.index) {
        this.transitionName = "slide-left";
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

     
    },
  },
};
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active 
.slide-com-enter-active,
.slide-com-leave-active,
.slide-back-enter-active,
.slide-back-leave-active{
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



#center {
  height: 680px;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 680px;
}
.c_main {
  height: 100%;
  overflow-y: hidden;
}

.c_main_center {
  width: 100%;
  position: relative;
  flex-direction: column;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
</style>