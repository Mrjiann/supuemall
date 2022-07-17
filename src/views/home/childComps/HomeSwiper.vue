<template>
  <div>
    <swiper>
      <swiper-item v-for="item in cbanners" v-bind:key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" v-on:load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  props: {
    cbanners: {
      type: Array,
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      // console.log("111");

      // 只需要发出一次就可以了，发出一次就知道高度
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad=true;
      }
    },
  },
};
</script>
<style scoped>
</style>