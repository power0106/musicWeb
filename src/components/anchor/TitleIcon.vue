<template>
  <div class="title_icon">
    <div class="title_icon_item" v-for="(item,index) in categories" :key="index">
      <a href="">
        <img :src="item.pic84x84IdUrl" alt="" >
      </a>
      <div class="desc">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    categories: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.title_icon{
  margin: 0 auto;
  display: flex;
  padding: 0 60px;
  box-sizing: border-box;
  justify-content: space-between;
  margin-bottom: 10px;
}
.title_icon_item{
  padding: 6px 10px;
  cursor: pointer;
  transition: background-color .3s;
}
.title_icon_item:hover{
  background-color: #eee;
}
.title_icon_item:hover .desc{
  color: red
} 
.title_icon_item:hover .title_icon img{
  opacity: 1;
  text-align: center;
}

.title_icon img{
  width: 45px;
  height: 45px;
  opacity: .9;
  transition: opacity .3s;
}
.desc{
  color: rgba(255,0,0,.7);
  font-size: 12px;
  text-align: center;
  transition: color .3s;
}
</style>