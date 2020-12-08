<template>
  <div class="new_list_item">
    <el-row>
      <el-col :span="12">
        <div
          class="new_list_item_content"
          v-for="(item, index) in newSongItemData.slice(0, 5)"
          :key="index"
          @dblclick="newListClick(item.id)"
        >
          <div class="number">0{{ index + 1 }}</div>
          <div class="new_list_item_content_right">
            <a href="javascript:void(0)">
              <img v-lazy="item.picUrl" alt="" @click="imgClick(item.id)" />
              <i class="el-icon-video-play play_icon"></i>
            </a>

            <div class="txt">
              <span class="music_name">{{ item.name }}</span>
              <span class="singer_name">{{ item.song.artists[0].name }}</span>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div
          class="new_list_item_content"
          v-for="(item, index) in newSongItemData.slice(5, 10)"
          :key="index"
          @dblclick="newListClick(item.id)"
        >
          <div class="number">{{ (index + 6) | num }}</div>
          <div class="new_list_item_content_right">
            <a href="javascript:void(0)">
              <img :src="item.picUrl" alt="" @click="imgClick(item.id)" />
              <i class="el-icon-video-play play_icon"></i>
            </a>
            <div class="txt">
              <span class="music_name">{{ item.name }}</span>
              <span class="singer_name">{{ item.song.artists[0].name }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getMusiUrl, getMusicMenu } from "@/network/home.js";
export default {
  props: {
    newSongItemData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    num(value) {
      let result = null;
      if (value < 10) {
        result = "0" + value;
      } else {
        result = value;
      }
      return result;
    },
  },
  methods: {
    newListClick(id) {
      // console.log(id)
      this.getMusiUrl(id);
      this.getMusicMenu(id);
    },
    imgClick(id) {
      this.newListClick(id);
      // console.log(id)
    },
    getMusiUrl(id) {
      //获取歌曲播放路径
      getMusiUrl(id).then((res) => {
        // console.log(res)
        this.$store.commit("nowMusic", res.data.data[0].url);
      });
    },
    getMusicMenu(id) {
      getMusicMenu(id).then((res) => {
        console.log(res);
        this.$store.commit("nowMusicMenu",res.data.songs[0])
      });
    },
  },
};
</script>

<style scoped>
.new_list_item {
  margin-top: 20px;
  cursor: pointer;
}
.new_list_item_content {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
  padding: 15px 0;
}
.number {
  padding: 5px 20px;
  color: #606266;
}
.new_list_item_content_right a {
  width: 100px;
  height: 100px;
  position: relative;
}
.new_list_item_content_right img {
  width: 100px;
  height: 100px;
}
.play_icon {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: orange;
  font-size: 25px;
  font-weight: 500;
}
.new_list_item_content_right {
  display: flex;
  align-items: center;
}
.txt {
  margin-left: 15px;
}
.txt span {
  display: block;
  margin-bottom: 12px;
}
.txt span:nth-child(2) {
  margin-left: 5px;
}
</style>