
<template>
  <div class="r_singer">
    <div class="shai">
      <div class="type">语言：</div>
      <Filtrate
        :fvalue="language"
        @filtrateClick="languageSwitch(arguments)"
      ></Filtrate>
    </div>
    <div class="shai">
      <div class="type">歌手：</div>
      <Filtrate :fvalue="sex" @filtrateClick="sexSwitch(arguments)"></Filtrate>
    </div>
    <div class="shai">
      <div class="type">筛选：</div>
      <Filtrate
        :fvalue="letters"
        @filtrateClick="typeSwitch(arguments)"
      ></Filtrate>
    </div>
    <div class="clear"></div>

    <ModuleTitle
      :width="90"
      :title="title"
      style="margin-top: 30px"
      :isMore="false"
    ></ModuleTitle>
    <div class="card">
      <Card
        v-for="(item, index) in singerData"
        :key="index"
        :item="item"
        :width="18"
        titlecolor="red"
      ></Card>
    </div>
  </div>
</template>

<script>
import Filtrate from "@/components/filtrate/Filtrate";
import ModuleTitle from "@/components/moduleTitle/ModuleTitle";
import Card from "@/components/anchor/Card";

import { getSinger } from "@/network/singer.js";
export default {
  components: {
    Filtrate,
    ModuleTitle,
    Card,
  },
  data() {
    return {
      language: ["华语", "欧美", "日本", "韩国", "其他"],
      sex: ["全部", "男歌手", "女歌手", "乐队组合"],
      letters: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      title: "热门歌手",
      type: -1,
      initial: -1,
      area: -1,
      limit: 30,
      singerData: [],
    };
  },
  created() {
    this.getSinger(this.type, this.initial, this.area, this.limit);
  },
  methods: {
    /**
     * 网络请求
     */
    getSinger(type, initial, area, limit) {
      //获取初始化歌手数据 默认为热门歌手数据
      getSinger(type, initial, area, limit).then((res) => {
        console.log(res);
        this.singerData = res.data.artists;
      });
    },

    /**
     * 事件处理
     */
    languageSwitch(e) {
      //语言类型点击切换事件处理 映射 实现拉去对应数据
      console.log(e[0], e[1]);
      switch (e[1]) {
        case "华语":
          this.area = 7;
          break;
        case "欧美":
          this.area = 96;
          break;
        case "日本":
          this.area = 8;
          break;
        case "韩国":
          this.area = 16;
          break;
        case "其他":
          this.area = 0;
          break;
      }
      this.getSinger(this.type, this.initial, this.area, this.limit);
    },

    sexSwitch(e) {
      //歌手类型点击切换事件处理 映射 实现拉去对应数据
      switch (e[1]) {
        case "全部":
          this.type = -1;
          break;
        case "男歌手":
          this.type = 1;
          break;
        case "女歌手":
          this.type = 2;
          break;
        case "乐队组合":
          this.type = 3;
          break;
      }
      this.getSinger(this.type, this.initial, this.area, this.limit);
    },
    typeSwitch(e) {
      //歌手性质点击切换事件处理 实现拉去对应数据
      if (e[1] === "热门") {
        this.initial = -1;
      } else {
        this.initial = e[1].toLowerCase();
      }
      this.getSinger(this.type, this.initial, this.area, this.limit);
    },
  },
};
</script>

<style scoped>
.r_singer {
  height: 600px;
  width: 100%;
}
.shai {
  box-sizing: border-box;
  padding: 15px 15px;
  border-bottom: 1px dashed #dadada;
  margin: 10px auto;
  width: 90%;
}
.type {
  color: #8a8a8a;
  font-size: 18px;
  float: left;
  margin-top: 5px;
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