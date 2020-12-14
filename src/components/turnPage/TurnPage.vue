
<template>
  <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" :page-size="pagesize">
  </el-pagination>
</template>

<script>
import {itemListenMixin} from "@/until/mixin.js";
export default {
  mixins: [itemListenMixin],
  props:{
    total: {
      type: Number,
      default: 0
    },
    pagesize: {
      type: Number,
      default: 20,
    }
  },
  methods:{
    handleCurrentChange(val) {
      this.$emit('turnPageData',val)
      
    },
  }
};
</script>

<style scoped>
.el-pagination{
  margin: 15px auto;
}
</style>