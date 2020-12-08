<!--
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
-->
<template>
  <div class="right_menu" ref="right_menu">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs" >
      <el-tab-pane v-for="(item,index) in menuList" :key="index" :name="item.path" :label="item.label"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { label: "个性推荐", path: "/home/rTsyle" },
        { label: "歌单", path: "/home/rSongList" },
        { label: "主播电台", path: "/home/rAnchorRadio" },
        { label: "排行榜", path: "/home/rRank" },
        { label: "歌手", path: "/home/rSinger" },
        { label: "最新音乐", path: "/home/rNewMusic" },
      ],
      activeName: '/home/rTsyle'
    };
  },
  methods: {
    handleClick(tab,event,path) {
      this.$router.replace(tab.name)
      this.activeName = tab.name
    },
  },
};
</script>

<style scoped>
.right_menu {
  width: 100%;
  text-align: center;
}
.tabs{
  display: flex;
  justify-content: center;
}
.menu_list {
  display: flex;
}
.right_menu_item {
  /* flex: 1; */
  padding: 0 10px;
  text-align: center;
}
.right_menu_item span {
  padding: 8px 6px;
  cursor: pointer;
}
.active {
  color: #288fe7;
}
.line {
  position: absolute;
  height: 2px;
  /* width: 15px; */
  background: #36aefe;
  border-radius: 8px;
  bottom: -2px;
  left: 170px;
}
</style>