<!--
 * @name: 
 * @test: test font
 * @msg: 
 * @param: 
 * @return: 
-->

<template>
  <div class="r_new_music">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <NewSongList
          title="热门歌曲"
          :newSongData="allNewSongData"
          :show="true"
        ></NewSongList>
      </el-tab-pane>
      <el-tab-pane label="华语" name="chinese">
        <NewSongList
          title="华语歌曲"
          :newSongData="chineseSongData"
          :show="true"
        ></NewSongList>
      </el-tab-pane>
      <el-tab-pane label="欧美" name="europe">
        <NewSongList
          title="欧美歌曲"
          :newSongData="europeSongData"
          :show="true"
        ></NewSongList>
      </el-tab-pane>
      <el-tab-pane label="韩国" name="korea">
        <NewSongList
          title="韩国歌曲"
          :newSongData="koreaSongData"
          :show="true"
        ></NewSongList>
      </el-tab-pane>
      <el-tab-pane label="日本" name="japan">
        <NewSongList
          title="日本歌曲"
          :newSongData="japanSongData"
          :show="true"
        ></NewSongList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NewSongList from "@/components/newSong/NewSongList";

import { getNewSong } from "@/network/newSong.js";
export default {
  components: {
    NewSongList,
  },
  data() {
    return {
      activeName: "all",
      type: 0,
      allNewSongData: [],
      chineseSongData: [],
      europeSongData: [],
      koreaSongData: [],
      japanSongData: [],
    };
  },
  created() {
    this.getNewSong(this.type);
  },
  methods: {
    /**
     * 网络请求
     */
    getNewSong(type) {
      getNewSong(type).then((res) => { //获取点击的类型 获得相应数据进行渲染
        // console.log(res);
        switch (type) {
          case 0:
            this.allNewSongData = res.data.data;
            break;
          case 7:
            this.chineseSongData = res.data.data;
            break;
          case 96:
            this.europeSongData = res.data.data;
            break;
          case 16:
            this.koreaSongData = res.data.data;
            break;
          case 8:
            this.japanSongData = res.data.data;
            break;
        }
        // this.allNewSongData.push(...res.data.data);
      });
    },

    /**
     * 事件处理
     */
    handleClick(tab, event) {
      //标签栏点击事件处理 拉去对应数据
      console.log(tab.name);
      switch (tab.name) {
        case "all":
          this.type = 0;
          break;
        case "chinese":
          this.type = 7;
          break;
        case "europe":
          this.type = 96;
          break;
        case "korea":
          this.type = 16;
          break;
        case "japan":
          this.type = 8;
          break;
      }
      this.getNewSong(this.type);
    },
  },
};
</script>

<style scoped>
.r_new_music {
  height: 600px;
  width: 100%;
}
.el-tabs {
  width: 90%;
  margin: 10px auto;
}
</style>