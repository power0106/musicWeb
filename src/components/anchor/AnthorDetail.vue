<template>
  <div class="anchor">
    <SongDetailInfo :songDetailData="baseInfoData" themetype="电台" :tags="false"></SongDetailInfo>

    <div class="song_tab">
      <ModuleTitle title="节目列表"  :width="90" style="margin-bottom: 15px;" :qi="true" :phase="total"></ModuleTitle>
      <AlbumList v-for="(item,index) in djAblum" :key="index" :albumData="item" :index="index"></AlbumList>
    </div>
  </div>
</template>

<script>
import SongDetailInfo from "@/components/songDetail/childrenComps/SongDetailInfo";
import AlbumList from "@/components/album/AlbumList";
import ModuleTitle from "@/components/moduleTitle/ModuleTitle";

import {getAnchorDetail,getDjAblum} from "@/network/anchor.js";
export default {
  components:{
    SongDetailInfo,
    AlbumList,
    ModuleTitle
  },
  data(){
    return{
      rid: "",
      activeName: "list",
      baseInfoData: {}, //电台专辑基本信息
      djAblum: [], // 专辑歌曲信息
      total: 0, //歌刊总数
    }
  },
  created(){
    this.rid = this.$route.params.id
    console.log(this.id)
    this.getAnchorDetail(this.rid)
    this.getDjAblum(this.rid)
  },
  methods:{
    /**
     * 网络请求
     */
    getAnchorDetail(rid){ //获取电台详细信息
      getAnchorDetail(rid).then(res=>{
        console.log(res)
        this.baseInfoData = {...res.data.data}
      })
    },
    getDjAblum(rid){ //获取详细歌曲列表
      console.log(rid)
      getDjAblum(rid).then(res=>{
        console.log(res)
        this.total = res.data.count
        this.djAblum.push(...res.data.programs)
      })
    }

  }
}
</script>

<style scoped>
.song_tab{

  margin-top: 50px;

}
</style>