<template>
  <div class="home">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <!-- tab控制栏 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      v-on:tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <home-swiper
        :cbanners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>

      <!-- 推荐信息展示 -->
      <recommend-view :crecommends="recommends"></recommend-view>

      <!-- 本周流行 -->
      <feature-view></feature-view>

      <!-- tab控制栏 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        v-on:tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>

      <!-- 商品列表 -->
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import goodsList from "components/content/goods/goodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  data() {
    return {
      title: "首页",
      banners: [],
      recommends: [],
      currentType: "pop",
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    goodsList,
    Scroll,
    BackTop,
  },
  methods: {
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // console.log("11");
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 2.获取tabControl的offsetTop
      // 所有组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl.$el2.offsetTop);
    },
    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        //   console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 在上拉刷新的时候调用，当前默认是0页，page=0+1，page=1.请求第一页数据
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 当把接口中的当前页数据依次加入到data当前页数据后，这页加完了，this.goods[type].page页码要变为下一页
        // 0+1=1 this.goods[type].page=1
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成了上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  created() {
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.图片加载完的时间监听
    const refresh = debounce(this.$refs.scroll.refresh, 50);

    // 监听item中图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  destroyed(){
    console.log("home销毁");
  },
  activated(){
    // console.log('activated');
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh();
  },
  deactivated(){
    // console.log('deactivated');
    this.saveY = this.$refs.scroll.getScrollY();
  }
};
</script>
<style scoped>
.home {
  position: relative;
  /* padding-top: 44px; */
  /* 该元素会被撑开屏幕高度一致 */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  /* position: sticky; */
  /* top: 44px; */
  position: relative;
  margin-top: -1px;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;

  /* margin-top: 44px; */
}
</style>