<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <Scroll 
    class="content"
    ref="scroll"
    :probe-type="3"
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <!-- 轮播图 -->
      <!--:banners = "banners"父传子，传数据-->
      <HomeSwiper :banners="banners"></HomeSwiper>

      <!-- 四项小组件 -->
      <RecommendView :recommends="recommends"></RecommendView>

      <!-- 推荐更多 -->
      <feature-view></feature-view>

      <!-- 选项卡 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      ></tab-control>

      <!-- 商品 -->
      <goods-list :goods="showGoods"></goods-list>
    </Scroll>

    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>


<script>
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import HomeSwiper from "./childComps/HomeSwiper";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from 'components/content/backTop/BackTop'

// 只有default导出才是对象
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop:false
    };
  },
  methods: {
    // 事件监听相关的方法
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    // 网络请求的方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },  
    backClick() {
        this.$refs.scroll.scrollTo(0, 0);
        // console.log('1');
    },
    contentScroll(position){
      // console.log(position);
      this.isShowBackTop = (-position.y)>1000;
    },
    loadMore() {
        this.getHomeGoods(this.currentType)
        console.log("loadMore");
    }
  },
  // 首页一创建就发送请求
  created() {
    // 1.请求轮播图与是想的数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
}

.content {
  overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>
