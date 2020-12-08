
<template>
  <div id="top_tab_bar">
    <div class="top_left">
      <a href="">
        <img src="../../assets/img/common/avater.jpg" alt="" />
      </a>
      <span>power</span>
    </div>

    <div class="top_center">
      <i class="el-icon-arrow-left icon" @click.stop="goBack"></i>
      <i class="el-icon-refresh icon"></i>
      <div class="serch_input">
        <!-- <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          clearable
        >
        </el-input> -->
        <el-input
          size="mini"
          placeholder="请选择日期"
          @input="change($event)"
          v-model="serch_music_input"
        >
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <i class="el-icon-microphone icon voive"></i>
    </div>

    <div class="top_right">
      <a href>
        <i class="el-icon-monitor"></i>
      </a>
      <a href>
        <i class="el-icon-mobile-phone"></i>
      </a>
      <a href>
        <i class="el-icon-menu"></i>
      </a>
      <a href>
        <i class="el-icon-s-opportunity"></i>
      </a>
      <a href>
        <i class="el-icon-setting"></i>
      </a>
      <a href>
        <i class="el-icon-bell"></i>
      </a>
      <a href>
        <i class="el-icon-close"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serch_music_input: "",
    };
  },
  methods: {
    change(e) {
      this.$forceUpdate();
    },
    goBack(){
      this.$router.back()
    }
  },
};
</script>

<style>
#top_tab_bar {
  height: 60px;
  background-image: linear-gradient(90deg, #00d3ff, #00b7ff);
  display: flex;
  position: relative;
  line-height: 60px;
  padding: 10px;
  color: #fff;
  z-index: 10;
  justify-content: space-between;
}
.top_left {
  margin-left: 25px;
}
.top_left img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}
.icon {
  font-size: 20px;
}
.top_center {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.serch_input {
  width: 360px;
  margin-left: 10px;
}
.serch_input input.el-input__inner {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  color: #888;
}
.el-input--suffix .el-input__inner {
  height: 28px;
  line-height: 28px;
}
.voive {
  margin-left: 10px;
}
.top_right a{
  color: #fff;
  margin-right: 8px;
}
</style>