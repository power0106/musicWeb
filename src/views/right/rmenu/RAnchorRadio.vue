
<template>
  <div class="r_anchor_radio">
    <Swiper :banners="banners"></Swiper>
    <TitleIcon :categories="categories"></TitleIcon>
    <ModuleTitle title="精选电台" :width="90"></ModuleTitle>
    <div class="card">
      <Card
        :width="22"
        :top_t="true"
        :user="true"
        v-for="(item, index) in recommendData"
        :key="index"
        :item="item"
      >
        <i class="el-icon-view"></i>
        <span class="count">{{ item.playCount | getCount }}</span>
      </Card>
    </div>

    <ModuleTitle title="付费精选" :width="90"></ModuleTitle>
    <PayCard :payData="paygiftData"></PayCard>
    <ModuleTitle title="电台个性推荐" :width="90"></ModuleTitle>
    <div class="card">
      <Card v-for="(item,index) in recommendsData" :key="index" :item="item">
        <span class="count">{{ item.name }}</span>
      </Card>
    </div>
    <ModuleTitle title="创作|翻唱" :width="90"></ModuleTitle>
    <div class="card">
      <Card v-for="(item,index) in writeCoverData" :key="index" :item="item">
        <span class="count">{{ item.name }}</span>
      </Card>
    </div>
    <ModuleTitle title="3D|电子" :width="90"></ModuleTitle>
    <div class="card">
      <Card v-for="(item,index) in electronData" :key="index" :item="item">
        <span class="count">{{ item.name }}</span>
      </Card>
    </div>
    <ModuleTitle title="音乐故事" :width="90"></ModuleTitle>
    <div class="card">
      <Card v-for="(item,index) in musicStoryData" :key="index" :item="item">
        <span class="count">{{ item.name }}</span>
      </Card>
    </div>
    <ModuleTitle title="情感调频" :width="90"></ModuleTitle>
    <div class="card">
      <Card v-for="(item,index) in emotionalFM" :key="index" :item="item">
        <span class="count">{{ item.name }}</span>
      </Card>
    </div>
    <ModuleTitle title="二次元" :width="90"></ModuleTitle>
    <div class="card">
      <Card v-for="(item,index) in cospa" :key="index" :item="item">
        <span class="count">{{ item.name }}</span>
      </Card>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/swiper/Swiper";
import TitleIcon from "@/components/anchor/TitleIcon";
import Card from "@/components/anchor/Card";
import PayCard from "@/components/anchor/PayCard";

import ModuleTitle from "@/components/moduleTitle/ModuleTitle";

import {
  getDjBanner,
  getCateList,
  getRecommends,
  getPaygift,
  getRecommendType,
} from "@/network/anchor.js";
export default {
  components: {
    Swiper,
    TitleIcon,
    ModuleTitle,
    Card,
    PayCard,
  },
  data() {
    return {
      banners: {}, //轮播图数据
      cates: [], //分类列表
      categories: [], //频道列表
      recommendData: [], //精选电台数据
      paygiftData: [], //付费精选数据
      recommendsData: [], //电台个性推荐数据
      writeCoverData: [], //创作翻唱数据
      electronData: [], //3d电子数据
      musicStoryData: [], //音乐故事数据
      emotionalFM: [], //情感调频数据
      cospa: [], //二次元数据
    };
  },
  created() {
    this.getDjBanner();
    this.getCateList();
    this.getRecommends();
    this.getPaygift();
    this.getWriteCover(2001);
    this.get3DERP(10002);
    this.getMusicStory(2);
    this.getEmotionalFM(3);
    this.getCospa(3001)
  },
  filters: {
    getCount(value) {
      let result = null;
      if (value < 10000) {
        result = value;
      } else {
        result = (value / 10000).toFixed(1) + "万";
      }
      return result;
    },
  },
  methods: {
    getDjBanner() {
      //获取dj轮播图数据
      getDjBanner().then((res) => {
        // console.log(res)
        this.banners = { ...res.data.data };
      });
    },
    getCateList() {
      //获取分类列表 拿到板块id和板块名
      getCateList().then((res) => {
        // console.log(res)
        this.categories.push(...res.data.categories.slice(0, 6));
        // this.cates.push(...res.data)
        res.data.categories.map((item) => {
          this.cates.push({
            name: item.name,
            id: item.id,
          });
        });
      });
    },

    getRecommends() {
      //获取个性推荐数据
      getRecommends().then((res) => {
        // console.log(res)
        this.recommendData = res.data.djRadios;
        let arr = [...this.recommendData];
        // console.log(arr)
        this.recommendData = this.recommendData.slice(0, 4); //截取精选电台数据

        this.recommendsData.push(...arr.slice(4, 10));
      });
    },
    getPaygift() {
      getPaygift().then((res) => {
        // console.log(res)
        this.paygiftData.push(...res.data.data.list);
      });
    },
    getWriteCover(type) {  //获取创作翻唱数据
      getRecommendType(type).then((res) => {
        // console.log(res);
        this.writeCoverData.push(...res.data.djRadios.slice(0, 6));
      });
    },
    get3DERP(type){ //获取3d电子数据
      getRecommendType(type).then(res=>{
        // console.log(res)
        this.electronData.push(...res.data.djRadios.slice(0,6))
      })
    },
    getMusicStory(type){ //获取3d电子数据
      getRecommendType(type).then(res=>{
        // console.log(res)
        this.musicStoryData.push(...res.data.djRadios.slice(0,6))
      })
    },
    getEmotionalFM(type){ //获取3d电子数据
      getRecommendType(type).then(res=>{
        // console.log(res)
        this.emotionalFM.push(...res.data.djRadios.slice(0,6))
      })
    },
    getCospa(type){ //获取3d电子数据
      getRecommendType(type).then(res=>{
        // console.log(res)
        this.cospa.push(...res.data.djRadios.slice(0,6))
      })
    },
    
  },
};
</script>

<style scoped>
.r_radio {
  height: 600px;
  overflow: auto;
  width: 100%;
  /* background: deeppink; */
}
.r_anchor_radio {
  height: 600px;
  width: 100%;
  margin: 0 auto;
}
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 15px 0px 5px;
  width: 90%;
  margin: 15px auto;
}
</style>