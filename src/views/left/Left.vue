<template>
  <div class="c_left">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-magic-stick"></i>
          <span>推荐</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <i class="el-icon-magic-stick"></i>
            <span>发现音乐</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-news"></i>
            <span>私人</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-video-camera-solid"></i>
            <span>LOOK直播</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-video-camera"></i>
            <span>视频</span>
          </el-menu-item>
          <el-menu-item index="1-5">
            <i class="el-icon-s-custom"></i>朋友
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>我的音乐</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <i class="el-icon-bangzhu"></i>
            <span>本地音乐</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-download"></i>
            <span>下载管理</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-cloudy"></i>
            <span>我的音乐云盘</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-coin"></i>
            <span>我的电台</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-star-off"></i>
            <span>我的收藏</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>创建的歌单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <i class="el-icon-bangzhu"></i>
            <span>本地音乐</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-download"></i>
            <span>下载管理</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-cloudy"></i>
            <span>我的音乐云盘</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-coin"></i>
            <span>我的电台</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <i class="el-icon-star-off"></i>
            <span>我的收藏</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  created() {},
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
}

</style>