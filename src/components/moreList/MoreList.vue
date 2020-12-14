<template>
  <div class="more_list">
    <ModuleTitle :title="mName" :isMore="false" :width="100"></ModuleTitle>
    <el-row>
      <el-col :span="12" class="left">
        <div class="list_item" v-for="(item,index) in listData.slice(0,10)" :key="index" @click="moreClick(item.id)">
          <div class="img" :style="{width: imgWidth+'%',height: imgHeight ? '150px' : ''}">
            <img :src="item.picUrl" alt />
          </div>
          <div class="txt">
            <div class="title">{{item.name}}</div>

            <div class="right" v-if="isDesc">
              <div class="desc">{{item.rcmdText}}</div>
              <div class="info" v-if="isInfo">{{item.lastProgramName}}</div>
              <div class="nickname" v-else>{{item.dj.nickname}}</div>
              <div class="price" v-if="isPrice">￥ {{item.originalPrice}}</div>
              <div class="numbers" v-else>
                <span class="jiemu">节目：{{item.programCount}}</span>
                <span class="sub">订阅：{{item.subCount | getCount}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="list_item" v-for="(item,index) in listData.slice(10,20)" :key="index" @click="moreClick(item.id)">
          <div class="img" :style="{width: imgWidth+'%',height: imgHeight ? '150px' : ''}">
            <img :src="item.picUrl" alt />
          </div>
          <div class="txt">
            <div class="title">{{item.name}}</div>

            <div class="right" v-if="isDesc">
              <div class="desc">{{item.rcmdText}}</div>
              <div class="info" v-if="isInfo">{{item.lastProgramName}}</div>
              <div v-else class="nickname">
                {{item.dj.nickname}}
              </div>
              <div class="price" v-if="isPrice">￥ {{item.originalPrice}}</div>
              <div class="numbers" v-else>
                <span class="jiemu">节目：{{item.programCount}}</span>
                <span class="sub">订阅：{{item.subCount | getCount}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ModuleTitle from '@/components/moduleTitle/ModuleTitle'

import {getPersonalizedList} from "@/network/home.js";
import {getPaylist,getDjMoreList} from "@/network/anchor.js"
export default {
  components: {
    ModuleTitle,
  },
  data() {
    return {
      mName: '',
      imgWidth: 30,
      imgHeight: true,
      isDesc: true,
      isInfo: false,
      isPrice: false,
      limit: 20,
      offset: 0,
      listData: [],
    }
  },
  created() {
    console.log(this.$route)
    this.mName = this.$route.params.name
    switch (this.mName) {
      case '独家放送':
        this.getPersonalizedList(this.limit,this.offset)
        break
      case '付费精选':
        this.getPaylist(this.limit,this.offset)
        break;
      case '创作翻唱':
        this.getDjMoreList(this.$route.query.cateId,this.limit,this.offset)
        break;
      case '3d电子':
        this.getDjMoreList(this.$route.query.cateId,this.limit,this.offset)
        break;
      case '音乐故事':
        this.getDjMoreList(this.$route.query.cateId,this.limit,this.offset)
        break;
      case '情感调频':
        this.getDjMoreList(this.$route.query.cateId,this.limit,this.offset)
        break;
      case '二次元':
        this.getDjMoreList(this.$route.query.cateId,this.limit,this.offset)
        break;
    }
  },
  filters:{
    getCount(value){
      let rs = null
      if(value>=10000){
        rs = (value/10000).toFixed(1)+"万"
      }else{
        rs = value
      }
      return rs
    }
  },
  methods: {
    /**
     * 网络请求
     */
    getPersonalizedList(limit,offset) { //独家放送网络请求
      // console.log('发独家放送列表网络请求')
      this.imgWidth = 100
      this.isDesc = false
      this.imgHeight = false
      getPersonalizedList(limit,offset).then(res=>{
        console.log(res)
        this.listData = res.data.result
      })
    },
    getPaylist(limit,offset) { //付费精选网络请求
      // console.log('发付费精选列表网络请求')
      getPaylist(limit,offset).then(res=>{
        // console.log(res)
        this.isInfo = true;
        this.isPrice = true;
        this.listData = res.data.data.list
      })
    },
    getDjMoreList(cateId,limit,offset){
      getDjMoreList(cateId,limit,offset).then(res=>{
        console.log(res)
        this.listData = res.data.djRadios
      })
    },

    /**
     * 事件处理
     */
    moreClick(id){
      this.$router.push({
        path: "/anchor/"+id
      })
    }
  },
  watch: {
    $route(to) {
      console.log(to.params)
    },
  },
}
</script>

<style scoped>
.el-row {
  margin-top: 15px;
}
.more_list {
  width: 90%;
  margin: 30px auto;
}
.list_item {
  display: flex;
  flex-wrap: wrap;
}
.left{
  margin-right: 0px;
}
.img {
  /* width: 100%; */
  /* width: 30%; */
  /* height: 150px; */
  margin-bottom: 5px;
  margin-right: 10px;
}
.img img {
  width: 100%;
  height: 100%;
}
.txt {
  flex: 1;
}
.title{
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}
.right{
  /* margin-left: 10px; */
  padding: 10px 0px;
  box-sizing: border-box;
  line-height: 25px;
}
.desc,.info{
  font-size: 13px;
  color: #999;
  padding-left: 5px;
}
.ji{
  margin-left: 10px;
}
.info{
  max-width: 180px;
  max-height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nickname{
  color: #A599A5;
  font-size: 12px;
}
.price{
  color: #44b1fb;
  font-size: 16px;
  margin-top: 2px;
}
.numbers{
  color: #A599A5;
  font-size: 13px;
}
.jiemu{
  margin-right: 5px;
}
</style>