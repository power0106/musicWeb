
<template>
  <div id="top_tab_bar" @click="topBar">
    <div class="top_left">
      <a href>
        <img src="../../assets/img/common/avater.jpg" alt />
      </a>
      <span>power</span>
    </div>

    <div class="top_center">
      <i class="el-icon-arrow-left icon" @click.stop="goBack"></i>
      <i class="el-icon-refresh icon"></i>
      <div class="serch_input" @click.stop="getSearchHot">
        <el-input
          size="mini"
          placeholder="请输入内容"
          @input="change($event)"
          v-model="serch_music_input"
          @keydown.enter.native="submit"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="iClick"
            style="cursor: pointer"
          ></i>
        </el-input>
      </div>

      <div class="hot_list" ref="hot">
        <div class="hotsong_list">
          <div v-if="hotSearchData.length!==0">
            <div class="sug_title">热搜榜</div>
            <div
              class="suggest_item"
              v-for="(item,index) in hotSearchData"
              :key="index"
              @click="sugRs(item)"
            >
              <span
                class="sug_nums"
                :style="{color:(index + hotSearchData.length)<hotSearchData.length+3 ? 'red' : ''}"
              >{{index+1}}</span>
              <div
                class="sug_name"
                :style="{fontWeight:(index + hotSearchData.length)<hotSearchData.length+3 ? '700' : ''}"
              >
                <p>{{item.first}}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="suggest_item"
              v-for="(item,index) in suggestData"
              :key="index"
              @click="sugRs(item)"
            >{{item.name}}</div>
          </div>
        </div>
      </div>

      <i class="el-icon-microphone icon voive"></i>
      <i class="el-icon-price-tag icon home" @click="goHome"></i>
    </div>

    <div class="top_right">
      <a href="javascript:void(0);">
        <i class="el-icon-monitor"></i>
      </a>
      <a href="javascript:void(0);">
        <i class="el-icon-mobile-phone"></i>
      </a>
      <a href="javascript:void(0);">
        <i class="el-icon-menu"></i>
      </a>
      <a href="javascript:void(0);">
        <i class="el-icon-s-opportunity"></i>
      </a>
      <a href="javascript:void(0);">
        <i class="el-icon-setting"></i>
      </a>
      <a href="javascript:void(0);">
        <i class="el-icon-bell"></i>
      </a>
      <a href="javascript:void(0);">
        <i class="el-icon-close"></i>
      </a>
    </div>
  </div>
</template>

<script>
let isHot = true
document.onclick = function () {
  document.getElementsByClassName('hot_list')[0].style.transform = 'scaleY(0)'
  isHot = true
}
import {
  getSearchHot,
  getSearchSuggest,
  getSuggestName,
} from '@/network/search.js'
export default {
  data() {
    return {
      serch_music_input: '',
      isHotList: false,
      hotSearchData: [],
      suggestData: [],
      inputVal: '',
      h: null,
    }
  },
  mounted() {},
  methods: {
    change(e) {
      this.$forceUpdate()
      this.hotSearchData = []
      // console.log(this.serch_music_input)
      if (this.serch_music_input === '') {
        this.getSearchHot()
        // this.$refs.hot.style.display = 'block'
        this.$refs.hot.style.transform = `scaleY(1)`
      } else {
        this.getSearchSuggest(this.serch_music_input)
      }

      // console.log(this.serch_music_input)
    },
    submit() {
      this.toPage()
    },
    iClick() {
      // console.log("点击");
      this.toPage()
    },

    /**
     * 网络请求
     */
    getSearchHot(e) {
      // this.isHotList = !this.isHotList
      if (isHot) {
        // this.$refs.hot.style.display = 'block'
        this.$refs.hot.style.transform = `scaleY(1)`
        isHot = false
      } else {
        // this.$refs.hot.style.display = 'none'
        this.$refs.hot.style.transform = `scaleY(0)`
        isHot = true
      }
      if (this.serch_music_input === '') {
        getSearchHot().then((res) => {
          // console.log(res.data.result)
          this.hotSearchData = res.data.result.hots
        })
      }
      // e.stopPropagation()
    },
    getSearchSuggest(keywords) {
      getSearchSuggest(keywords).then((res) => {
        // console.log(res)
        this.suggestData = res.data.result.songs || res.data.result.albums
      })
    },

    /**
     * 事件处理
     */

    handleSelect(item) {
      console.log(item)
    },
    sugRs(item) {
      console.log(item.name || item.first)
      this.serch_music_input = item.name || item.first
      this.toPage()
    },
    inputEve(e) {},
    toPage() {
      if (this.serch_music_input === '' || this.serch_music_input == null) {
        this.$message({
          message: '内容不可以空哦~',
        })
        return
      }
      this.$refs.hot.style.transform = 'scaleY(0)'
      isHot = true
      this.$router.push({
        path: '/search/' + this.serch_music_input + '',
      })
    },
    topBar() {
      this.$emit('top', this.$refs.hot)
    },
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push({
        path: '/rTsyle',
      })
    },
  },
}
</script>

<style>
#top_tab_bar {
  height: 60px;
  background-image: linear-gradient(90deg, #00d3ff, #00b7ff);
  display: flex;
  position: relative;
  line-height: 60px;
  padding: 10px;
  color: #fff;
  justify-content: space-between;
}

.top_left {
  margin-left: 25px;
}
.top_left img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}
.login {
  cursor: pointer;
  text-align: center;
  width: 100%;
  display: block;
}
.phone i{
  font-size: 70px;
  color: rgba(242,156,159,.6);
}
.el-dialog__body{
  text-align: center;
}
.icon {
  font-size: 20px;
  cursor: pointer;
}
.top_center {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
}
.serch_input {
  width: 360px;
  margin-left: 10px;
}
.el-autocomplete {
  width: 100%;
}
.serch_input input.el-input__inner {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  color: #888;
}
.el-input--suffix .el-input__inner {
  height: 28px;
  line-height: 28px;
}
.voive {
  margin-left: 10px;
}
.top_right a {
  color: #fff;
  margin-right: 8px;
}
.home {
  margin-left: 15px;
  cursor: pointer;
}
.hot_list {
  width: 340px;
  background: #fff;
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 45px;
  left: 60px;
  border-right: 6px;
  overflow: auto;
  box-sizing: border-box;
  z-index: 10000;
  max-height: 380px;
  transform: scaleY(0);
  transition: transform .3s;
}
.sug_nums {
  display: inline-block;
  width: 35px;
  height: 24px;
  line-height: 24px;
  text-align: center;
}
.sug_name {
  flex: 1;
  padding-left: 10px;
}
.active {
}
.suggest_item {
  color: #333333;
  padding: 10px 15px;
  line-height: 24px;
  font-size: 14px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  display: flex;
}
.suggest_item:hover {
  background: #f5f7fa;
}
.hot_list::-webkit-scrollbar {
  width: 8px;
}

.hot_list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 255, 0.1);
  border-radius: 3px;
}
.sug_title {
  color: #6a6a6a;
  padding: 0 15px;
  font-size: 16px;
  box-sizing: border-box;
}
</style>