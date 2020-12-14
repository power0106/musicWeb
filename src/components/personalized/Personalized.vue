
<template>
  <div class="personalized">
    <ModuleTitle :title="modulename" @click.native="moduleClick"></ModuleTitle>
    <PersonalizedList v-for="(item,index) in personalizedData" :key="index" :musicListItemData="item"></PersonalizedList>
    <!-- <MusicListItem v-for="(item,index) in personalizedData" :key="index"  :musicListItemData="item" :width="32"></MusicListItem> -->
  </div>
</template>

<script>
import ModuleTitle from "../moduleTitle/ModuleTitle"

import PersonalizedList from "./PersonalizedList"
// import MusicListItem from "../musiclist/MusicListItem"
export default {
  components:{
    ModuleTitle,
    PersonalizedList
  },
  props:{
    personalizedData:{
      type: Array,
      default(){
        return []
      }
    },
    modulename:{
      type: String,
      default: "独家放送a"
    }
  },
  data(){
    return{
      cateId: ""
    }
  },
  methods:{
    moduleClick(){
      this.$router.push({
        path: `/moreList/${this.modulename}`
      })
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