<template>
  <div class="music_list">
    <ModuleTitle title="推荐歌单"></ModuleTitle>
    <MusicListItem
      v-for="(item, index) in musicListData"
      :key="index"
      :music-list-item-data="item"
      :top-txt="true"
      :right-txt="true"
    ></MusicListItem>
  </div>
</template>

<script>
import ModuleTitle from "../moduleTitle/ModuleTitle";
import MusicListItem from "./MusicListItem";
export default {
  props: {
    musicListData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    ModuleTitle,
    MusicListItem,
  },
};
</script>

<style scoped>
.music_list {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 10px auto;
  justify-content: space-between;
  /* justify-content: space-around; */
}

</style>