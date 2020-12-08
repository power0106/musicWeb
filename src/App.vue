<!--
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
-->
<!--
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
-->

<template>
  <div class="main">
    <div class="bg">
      <img src="./assets/img/bg/bg.jpg" alt="">
    </div>
  
    <div id="app">
      <TopTabBar></TopTabBar>
      <Center></Center>
      <Bottom></Bottom>
    </div>
  </div>
</template>
<script>
import TopTabBar from "./components/topTabBar/TopTabBar"
import Center from "./views/center/Center"
import Bottom from "./components/bottomBar/BottomBar"
export default {
  components:{
    TopTabBar,
    Center,
    Bottom
  }
}
</script>
<style scoped>
#app{
  width: 1280px;
  margin: 50px auto;
  position: relative;
  background: #fff;
}
.main{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.bg img{
  width: 100%;
  filter: blur(100px);
  position: absolute;
  top: 0;
  left: 0;
}

</style>
