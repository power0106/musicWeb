<template>
    <div class="card_item" :style="{width: width+'%'}" @click.prevent="djClick(item.id)">
      <div class="img">
        <a href="">
          <img v-lazy="item.picUrl" alt="">
        </a>
        <div class="top_t" v-if="top_t">{{item.category}}</div>
        <div class="bottom_t">
          <slot></slot>
        </div>
      </div>

      <div class="info">
        <p class="title" :style="{color: titlecolor}">{{getTitle}}</p>
        <div class="user" v-if="user">
          <img v-lazy="item.dj.avatarUrl" alt="">
          <span class="nickname">{{item.dj.nickname}}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    item:{
      type: Object,
      default(){
        return {}
      }
    },
    width: {
      type: Number,
      default: 16
    },
    top_t: {
      type: Boolean,
      defalut: false
    },
    user: {
      type: Boolean,
      defalut: false
    },
    titlecolor:{
      type: String,
      default: "#3c3c3c"
    }
  },
  filters:{
    getCount(value){
      let result = null
      if(value < 10000){
        result = value
      }else{
        result = (value / 10000).toFixed(1)+'万'
      }
      return result
    },
    
  },
  computed:{
    getTitle(){
      return this.item.rcmdtext || this.item.name
    }
  },
  methods:{
    djClick(id){
      this.$router.push({
        path: "/anchor/"+id
      })
    }
  }
}
</script>

<style scoped>

.card_item{
  margin-bottom: 15px;
}
.img{
  width:100%;
  position: relative;
}
.img img{
  width: 100%
}
.top_t{
  position: absolute;
  left: 0;
  top: 0;
  background: #ff2c55;
  border-bottom-right-radius: 6px;
  color: #fff;
  padding: 5px 8px;
  font-size: 12px;
}
.bottom_t{
  position: absolute;
  left: 0px;
  bottom: 1px;
  background-image: linear-gradient(to right, rgba(0,0,0,0.5) , rgba(0,0,0,0.02));
  color: rgba(255,255,255,.9);
  padding: 2px 6px;
  max-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.count{
  margin-left: 5px;
}
.user{
  display: flex;
}
.title{
  padding: 5px 6px;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
}
.user{
  margin-left: 5px;
  display: flex;
  align-items: center;
}
.user img{
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 5px;
}
.nickname{
  color: red;
  font-size: 14px;
}
</style>