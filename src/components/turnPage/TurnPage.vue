
<template>
  <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
  </el-pagination>
</template>

<script>
export default {
  props:{
    total: {
      type: Number,
      default: 0
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