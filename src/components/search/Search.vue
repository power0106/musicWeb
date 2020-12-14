<template>
  <div class="search" ref="search">
    <div class="result_info">
      搜索到<span class="nums">{{ total }}</span
      >条<i class="search_value">"{{ keywords }}"</i>的相关歌曲
    </div>

    <div class="search_list">
      <el-table
        :data="searchData"
        style="width: 100%"
        @row-dblclick="openDetails"
      >
        <el-table-column type="selection" width="70"> </el-table-column>
        <el-table-column prop="name" label="音乐标题" width="200">
        </el-table-column>
        <el-table-column label="歌手" width="150">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.artists" :key="index"
              >{{ item.name
              }}{{ index + 1 === scope.row.artists.length ? "" : "/" }}</span
            >
            <!-- {{scope}} -->
          </template>
          <!-- <span v-for="(item,index) in artists" :key="index">{{item}}</span> -->
        </el-table-column>
        <el-table-column prop="album.name" label="专辑" width="200">
        </el-table-column>
        <el-table-column label="时长" width="100">
          <template slot-scope="scope">
            <span>
              {{ scope.row.duration | getTime }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="turn_page">
      <TurnPage :total="total" @turnPageData="turnPage(arguments)" :pagesize="30"></TurnPage>
    </div>
  </div>
</template>

<script>
import { getSearchData } from "@/network/search.js";

import TurnPage from "@/components/turnPage/TurnPage";

import { getMusiUrl, getMusicMenu } from "@/network/home.js";

import { formatDate } from "@/until";
import {itemListenMixin} from "@/until/mixin.js";
export default {
  components: {
    TurnPage,
  },
  // props: ['cen','scrolltop'],
  mixins: [itemListenMixin],
  data() {
    return {
      keywords: null,
      limit: 30,
      offset: 0,
      searchData: [],
      total: 0,
      id: "",
      scrollTop: ""
    };
  },
  filters: {
    getTime(value) {
      return formatDate(new Date(value), "mm:ss");
    },
  },
  created() {
    console.log(this.$route.params.keywords);
    this.keywords = this.$route.params.keywords;
    this.getSearchData(this.keywords, this.limit, this.offset);
  },
  methods: {
    indexMethod(index) {
      return index;
    },

   

    /**
     * 网络请求
     */
    getSearchData(keywords, limit, offset) {
      getSearchData(keywords, limit, offset).then((res) => {
        console.log(res);
        this.total = res.data.result.songCount;
        this.searchData = res.data.result.songs;
      });
    },
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
        this.$store.commit("nowMusicMenu", res.data.songs[0]);
      });
    },

    /**
     * 事件处理
     */
    turnPage(e) {
      this.offset = e[0];
      this.getSearchData(this.keywords, this.limit, this.offset);
      this.indexMethod();
      this.backTop() //回到顶部
      console.log(this.cen,this.scrolltop)
    },
    openDetails(row) {
      console.log(row);
      this.id = row.id;
      this.getMusiUrl(this.id);
      this.getMusicMenu(this.id);
    },
  },
  watch: {
    $route(to) {
      console.log(to);
      this.keywords = to.params.keywords;

      this.getSearchData(this.keywords, this.limit, this.offset);
    },
  },
};
</script>

<style scoped>
.search {
  width: 90%;
  margin: 30px auto;
}
.result_info {
  color: #9e9e9e;
  font-size: 16px;
  padding: 8px 10px;
}
.search_value {
  color: #288ef7;
  margin: 0 10px;
}
.search_list {
  padding: 10px 20px;
}
.title,
.content {
  display: flex;
  justify-content: space-between;
  line-height: 45px;
  border-bottom: 1px solid #ccc;
  color: #909399;
  font-size: 13px;
  margin-bottom: 10px;
}
.kong {
  width: 70px;
}
.handle {
  width: 70px;
}
.musicname {
  width: 280px;
}
.zhuanji {
  flex: 1;
}
.dt {
  width: 100px;
}
.content {
  color: #606266;
  font-size: 14px;
}

.el-table th,
.el-table tr {
  cursor: pointer;
}
</style>