<template>
  <div class="new_list">
    <ModuleTitle title="最新音乐" @click.native="newClick"></ModuleTitle>
    <NewListItem :newSongItemData="newSongData"></NewListItem>
  </div>
</template>

<script>
import ModuleTitle from "../moduleTitle/ModuleTitle";
import NewListItem from "./NewListItem"
export default {
  components:{
    ModuleTitle,
    NewListItem
  },
  props:{
    newSongData:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    newClick(){
      this.$router.push({
        path: "rNewMusic"
      })
    }
  }
};
</script>

<style scoped>
.new_list{
  width: 90%;
  margin: 10px auto;
}
</style>