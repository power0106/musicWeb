
<template>
  <div class="personalized">
    <ModuleTitle title="独家放送"></ModuleTitle>
    <MusicListItem v-for="(item,index) in personalizedData" :key="index"  :musicListItemData="item" :width="32"></MusicListItem>
  </div>
</template>

<script>
import ModuleTitle from "../moduleTitle/ModuleTitle"
import MusicListItem from "../musiclist/MusicListItem"
export default {
  components:{
    ModuleTitle,
    MusicListItem
  },
  props:{
    personalizedData:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.personalized{
  width: 90%;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
}
</style>