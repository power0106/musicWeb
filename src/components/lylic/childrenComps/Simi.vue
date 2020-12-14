
<template>
  <div class="simi_item" @click="simiSongClick(simiData.id)">
    <div class="img">
      <img :src="simiData.album.picUrl" alt="" />
    </div>

    <div class="info">
      <p class="musicname">{{ simiData.name }}</p>
      <p class="singer">
        <span
          class="singer"
          v-for="(item, index) in simiData.artists"
          :key="index"
        >
          {{ item.name }}{{ index + 1 === simiData.artists.length ? "" : "/" }}
        </span>
      </p>
      <p class="dt">{{ simiData.duration | getTime }}</p>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/until";

import { getMusiUrl, getMusicMenu } from "@/network/home.js";
export default {
  props: {
    simiData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    getTime(value) {
      return formatDate(new Date(value), "mm:ss");
    },
  },
  methods:{
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
    simiSongClick(id){
      this.getMusiUrl(id)
      this.getMusicMenu(id)
      this.$router.replace({
        path: "/lylic/"+id
      })
    }
  }
};
</script>

<style scoped>
.simi_item {
  padding: 10px 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
}
.img img {
  width: 108px;
  height: 108px;
}
.info {
  margin-left: 15px;
}
.info p {
  margin-bottom: 10px;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.musicname {
  font-size: 14px;
  color: #000;
}
.singer {
  font-size: 13px;
  color: #666;
}
.dt {
  margin-top: 22px;
}
</style>