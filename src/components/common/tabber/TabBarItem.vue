<template>
  <span class="tab-bar-item" v-on:click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon2"></slot></div>
    <div v-bind:style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </span>
</template>
<script>
export default {
  data() {
    return {
      // isActive:false
    };
  },
  props: {
    path: String,
    activeColor: {
      type:String,
      default:"#ff5777"
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      // 不等于-1的时候就有path
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      return this.isActive ? { color: this.activeColor }:{};
    }
  },
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /* 一般tab-bar高度是49px */
  height: 49px;
}

.tab-bar-item img {
  display: block;
  width: 24px;
  height: 24px;
  margin: auto;
  margin-top: 2px;
}

.tab-bar-item{
  color: rgb(0, 0, 0);
}

.tab-bar-item p {
  font-size: 16px;
  margin-top: 2px;
}

/* .active p {
  color: #ff5777 !important;
} */
</style>