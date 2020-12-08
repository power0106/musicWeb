<template>
  <div class="filtrate">
    <div
      class="filtrate_item"
      v-for="(item, index) in fvalue"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click.prevent="filtrateClick(index,item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fvalue: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    filtrateClick(index,item) {
      // console.log(index,item);
      this.currentIndex = index
      this.$emit("filtrateClick",index,item)
    },
  },
};
</script>

<style scoped>
.filtrate {
  display: flex;
  flex-wrap: wrap;
}
.filtrate_item {
  color: #252525;
  margin: 0 10px;
  font-size: 16px;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 5px;
}
.filtrate_item:hover {
  color: #fff;
  background-image: linear-gradient(90deg, #00d3ff, #00b7ff);
}
.active {
  background-image: linear-gradient(90deg, #00d3ff, #00b7ff);
  color: #fff;
}
</style>