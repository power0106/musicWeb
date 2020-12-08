<template>
  <div class="rank_list">
    <div class="rank_list_item" v-for="(item,index) in songs" :key="index">
      <span class="num">{{index+1}}</span>
      <span class="mucsicname">{{item.name}}</span>
      <!-- <span class="singer">{{}}</span> -->
    </div>
  </div>
</template>

<script>
import {getRankList} from "@/network/rank.js"
export default {
  components:{
  },
  props:{
    id: {
      type: Number,
    }
  },
  data(){
    return{
      songs: []
    }
  },
  created(){
    this.getRankList(this.id)
  },
  methods:{
    getRankList(id){
      console.log(id)
      getRankList(id).then(res=>{
        console.log(res)
        this.songs.push(...res.data.playlist.tracks.slice(0,10))
      })
    }
  },
  watch:{
    id(val){
      this.getRankList(val)
    }
  }
};
</script>

<style scoped>
.rank_list{
  width: 100%;
}
.rank_list_item{
  box-sizing: border-box;
  padding: 8px 6px;
  display: flex;
  width: 100%;
  align-items: center;
}
.rank_list_item:nth-child(even){
  background: #f4f4f4;
}
.rank_item:nth-child(odd){
  background: #e8e8e8;
}
.num{
  font-size: 16px;
  color: #666;
  margin: 0 10px;
  width: 50px;
  height: 100%;
  text-align: center;
}
.mucsicname{
  flex: 1;
}
.singer{
  width: 50px;
  height: 100%;
  text-align: center;
  margin-right: 5px;
}
</style>