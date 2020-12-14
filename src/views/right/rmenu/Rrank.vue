

<template>
  <div class="r_rank">
    <MuduleTitle title="榜单" :width="90" :isMore="false"></MuduleTitle>
    <div class="rank">
      <Rank
        :rank-data="rank"
        v-for="(item, index) in rank"
        :key="index"
        :item="item"
      >
        <RankList :id="item.id"></RankList>
      </Rank>
    </div>
    <MuduleTitle title="全球媒体榜" :width="90" :isMore="false"></MuduleTitle>
    <div class="ranksking_list">
      <MusicListItem
        v-for="(item, index) in globalRank"
        :key="index"
        :musicListItemData="item"
        :right-txt="true"
        @click.native="rankClick(item.id)"
      ></MusicListItem>
    </div>
  </div>
</template>

<script>
import Rank from "@/components/rank/Rank";
import RankList from "@/components/rank/RankList";

import MuduleTitle from "@/components/moduleTitle/ModuleTitle";
import MusicListItem from "@/components/musiclist/MusicListItem";

import { getRanking } from "@/network/rank.js";
export default {
  components: {
    MuduleTitle,
    Rank,
    RankList,
    MusicListItem,
  },
  data() {
    return {
      rank: [], //榜单数据
      globalRank: [], //全球榜单
    };
  },
  created() {
    this.getRanking();
  },
  methods: {
    getRanking() {
      getRanking().then((res) => {
        console.log(res);
        this.rank.push(...res.data.list.slice(0, 6));
        this.globalRank.push(...res.data.list.slice(6, 32));
      });
    },

  },
};
</script>

<style scoped>
.r_rank {
  height: 600px;
  width: 100%;
  margin: 0 auto;
  /* background: darkolivegreen; */
}
.rank {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 15px auto;
  justify-content: space-around;
}
.ranksking_list {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 10px auto;
  justify-content: space-between;
}
</style>