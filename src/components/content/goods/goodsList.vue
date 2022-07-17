<template>
  <div class="goods">
    <!-- {{goods}} -->
    <goods-list-item
      v-for="item in goods"
      :key="item.index"
      :goodsItem="item"
    ></goods-list-item>
  </div>
</template>
<script>
import goodsListItem from "components/content/goods/goodsListItem";

export default {
  data() {
    return {
      title: "111",
    };
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { goodsListItem },
};
</script>
<style scoped>
.goods {
  display: flex;
  /* 不换行 */
  flex-wrap: wrap;
  /* 水平分布 */
  justify-content: space-around;

  padding: 2px;
}
</style>