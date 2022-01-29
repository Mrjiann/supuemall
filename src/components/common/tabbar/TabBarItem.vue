<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon2"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor:{
      type:String,
      default:'#ff5777'
    }
  },
  data() {
    return {
      // isActive: true,
    };
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
  computed: {
    isActive() {
      // 当活跃的路径this.$route.path=当前点击后传入的路径（true）
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
      // 动态绑定样式
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
  /* display: block; */
}

.active {
  color: red;
}
</style>
