<template>
  <div class="recommend">
    <div v-for="item in crecommends" :key="item.index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    crecommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      title: "111",
    };
  },
};
</script>
<style>
    .recommend{
        display: flex;
        font-size: 12px;
        padding: 10px 0 20px;        
        border-bottom: 10px solid #eee;
    }
    .recommend-item{
        flex: 1;
    }
    .recommend-item a{
        display: flex;
        /* 把主轴设置为y轴 */
        flex-direction: column;
        /* 侧轴居中对齐 */
        align-items: center;
    }
    .recommend-item a img{
        width: 70px;
        margin-bottom: 10px;
    }
</style>