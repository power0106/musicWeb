<template>
  <div class="music_list_item" :style="{ width: width + '%' }" @click.prevent="musicListClick(musicListItemData.id)">
    <div class="img">
      <a href="">
        <img v-lazy="getImg" alt="" />
      </a>
      <div class="top_t" v-if="topTxt">{{ musicListItemData.description }}</div>
      <div class="right_t" v-if="rightTxt">
        <i class="el-icon-headset"></i>
        <span>{{ musicListItemData.playCount | playCount }}</span>
      </div>
      <div class="bottom_t">
        <i class="el-icon-video-play"></i>
      </div>
    </div>

    <div class="title">{{ musicListItemData.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 18,
    },
    topTxt: {
      type: Boolean,
      default: false,
    },
    rightTxt: {
      type: Boolean,
      default: false,
    },
    musicListItemData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed:{
    getImg(){
      return this.musicListItemData.coverImgUrl || this.musicListItemData.picUrl
    }
  },
  filters: {
    playCount(value) {
      let result = null;
      if (value < 10000) {
        result = value;
      }
      if (value > 10000) {
        result = (value / 10000).toFixed(1) + "万";
      }
      return result;
    },
  },
  methods:{
    musicListClick(id){
      // console.log(id)
      this.$router.push('/songdetail/'+id)
    }

  }
};
</script>

<style scoped>
.music_list_item {
  margin-top: 25px;
  margin-bottom: 10px;
  cursor: pointer;
  margin-right: 10px;
}
.music_list_item img {
  width: 100%;
  border-radius: 5px;
}
.music_list_item:hover .top_t {
  transform: translateY(0);
}
.music_list_item:hover .bottom_t i {
  transform: translateX(0);
}
.img {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.top_t {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  font-size: 14px;
  height: 20px;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px 0;
  color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transform: translateY(-100%);
  transition: transform 0.5s;
  z-index: 2;
}
.right_t {
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0)
  );
  padding: 2px 8px;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}
.right_t i {
  margin-right: 5px;
}
.bottom_t {
  position: absolute;
  right: 5px;
  bottom: 10px;
}
.bottom_t i {
  font-size: 25px;
  color: red;
  transform: translateX(120%);
  transition: transform 0.5s;
}
.title {
  height: 40px;
  font-size: 13px;
  padding-top: 10px;
}
</style>