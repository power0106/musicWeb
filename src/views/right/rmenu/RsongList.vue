<template>
  <div class="r_song_list">
    <HotTab
      :hotTabList="hotTabList"
      @hotTabClick="hotTabClick(arguments)"
    ></HotTab>
    <div class="music_list" >
      <MusicListItem
        v-for="(item,index) in hotTabListData" :key="index"
        :music-list-item-data="item"
        :right-txt="true"
      ></MusicListItem>
      <TurnPage :total="total" class="turn" @turnPageData="turnPageData(arguments)"></TurnPage>
    </div>
  </div>
</template>

<script>
import DropDown from "@/components/dropdown/DropDown";
import HotTab from "@/components/hotTab/HotTab";
import MusicListItem from "@/components/musiclist/MusicListItem";
import TurnPage from "@/components/turnPage/TurnPage";

import { getHotTabs, getHotTabsData } from "@/network/songs.js";
export default {
  components: {
    DropDown,
    HotTab,
    MusicListItem,
    TurnPage,
  },
  data() {
    return {
      hotTabList: [],
      hotTabListData: [],
      currentType: "全部",
      offset: 0,
      total: 0,
    };
  },
  created() {
    this.getHotTabs();
    this.getHotTabsData(this.currentType,this.offset)
  },
  methods: {
    /**
     * 网络请求
     */
    getHotTabs() {
      //获取热门标签列表
      getHotTabs().then((res) => {
        // console.log(res)
        let all = {
          name: "全部"
        }
        this.hotTabList.push(all)
        this.hotTabList.push(...res.data.tags);
        console.log(this.hotTabList.length);
      });
      // console.log(this.hotTabListData);
    },
    getHotTabsData(currentType, offset){ //获取各个分类标签数据
      getHotTabsData(currentType,offset).then(res=>{
        console.log(res)
        this.total = res.data.total
        this.hotTabListData = res.data.playlists
      })
    },

    /**
     * 事件处理
     */
    hotTabClick(e) { //点击分类标签后响应对应数据
      this.currentType = e[0]
      this.getHotTabsData(e[0],0)
      // console.log(e[0], e[1]);
    },
    turnPageData(e){ // 分页拉去数据
      this.offset = e[0]
      console.log(e[0])
      this.getHotTabsData(this.currentType,this.offset)
    }
  },
  watch: {
    hotTabList() {
      for (let i = 0; i < this.hotTabList.length; i++) {
        let list = this.hotTabList[i].name;
        // console.log(list)
        this.hotTabListData[list] = {
          page: 0,
          list: [],
        };
      }
      // console.log(this.hotTabListData["华语"]);
    },
  },
};
</script>

<style scoped>
.r_song_list {
  height: 600px;
  width: 100%;
  /* background: cornflowerblue; */
}
.music_list {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 10px auto;
  justify-content: space-between;
}

</style>