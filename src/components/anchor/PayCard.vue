<template>
  <div class="pay_card">
    <div class="pay_card_item" v-for="(item,index) in payData" :key="index" @click="payDj(item.id)">
      <div class="pay_card_content">
        <div class="left">
          <img v-lazy="item.picUrl" alt="">
          <div class="time" :style="{textAlign: align}">1970年01月01日...</div>
        </div>
        <div class="right">
          <div class="title"><span class="type" v-if="isType">MV</span>{{item.name}}</div>
          <div class="desc" v-if="isDesc">{{item.rcmdText}}</div>
          <div class="info">{{item.lastProgramName}}</div>
          <div class="price" v-if="isPrice">￥ {{item.originalPrice}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    payData: {
      type: Array,
      default(){
        return []
      }
    },
    align: {
      type: String,
      default: "left"
    },
    isType: {
      type: Boolean,
      default: false
    },
    isDesc: {
      type: Boolean,
      default: true
    },
    isPrice: {
      type: Boolean,
      default: true
    }
  },
  methods:{
    payDj(id){
      this.$router.push({
        path: "/anchor/"+id
      })
    }
  }
}
</script>

<style scoped>
.pay_card{
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
}
.pay_card_item{
  /* width: 50%; */
  width: 42%;
  margin-right: 50px;
}
.pay_card_content{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}
.left{
  width: 30%;
  position: relative;
}
.left img{
  width: 100%;
}
.time{
  position: absolute;
  background-image: linear-gradient( to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.02) );
  left: 0;
  bottom: 0;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;

}
.right{
  margin-left: 10px;
  padding: 10px 5px;
  box-sizing: border-box;
  line-height: 25px;
}
.title{
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
  max-width: 208px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-wrap: break-word;

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
.price{
  color: #44b1fb;
  font-size: 16px;
  margin-top: 2px;
}
</style>