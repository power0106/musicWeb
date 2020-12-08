<template>
  <div class="hot_tab">
    <div class="title">热门标签:</div>
    <div class="hot_tab_item_box">
      <div class="hot_tab_item" v-for="(item,index) in hotTabList" :key="index" @click.prevent="hotTabClick(item.name,index)">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    hotTabList: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    hotTabClick(tabName,index){
      // console.log(tabName,index)
      this.$emit('hotTabClick',tabName,index)
    }
  }
};
</script>

<style scoped>
.hot_tab {
  width: 90%;
  display: flex;
  padding: 10px 20px;
  align-items: center;
  flex-wrap: wrap;
}
.hot_tab_item_box{
  flex: 1;

}
.title {
  margin-left: 30px;
  color: #9a9a9a;
  font-size: 18px;
  margin-right: 15px;
  /* width: 120px; */
  line-height: 25px;
}
.hot_tab_item {
  padding: 6px 15px;
  border: 1px solid #e5e5e5;
  margin-right: 15px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ,color .3s;
  display: inline-block;
  margin-bottom: 10px;
  color: #999999;
  letter-spacing: 1px;
}
.hot_tab_item:hover {
  background-color: #f9f9f9;
  color: #555555;
}
</style>