<template>
  <div class="song_subscriber">
    <div v-if="songSubscriberData.length > 0" class="song_subscriber">
      <div class="song_subscriber_item" v-for="(item,index) in songSubscriberData" :key="index">
        <img :src="item.avatarUrl" alt="">
        <p>{{item.nickname}}</p>
      </div>
    </div>

    <div v-else>
      <div>暂无收藏者</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    songSubscriberData:{
      type: Array,
      default(){
        return []
      }
    }
  }
} 
</script>

<style scoped>
.song_subscriber{
  display: flex;
  flex-wrap: wrap;
}
.song_subscriber_item{
  width: 120px;
  height: 120px;
  color: red;
  text-align: center;
  font-size: 13px;
  margin: 10px;
  overflow: hidden;
}
.song_subscriber_item img{
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 10px;
}
</style>