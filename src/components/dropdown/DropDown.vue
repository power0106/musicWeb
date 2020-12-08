<template>
  <div class="drop_down">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #595959;
    font-size: 16px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .drop_down{
    padding: 10px 20px;
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px solid #F8F8F8;
  }
  .el-dropdown{
    padding: 6px 8px;
    border:1px solid #CCCCCC;
  }
</style>