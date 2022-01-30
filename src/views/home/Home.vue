<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!-- 轮播图 -->
     <!--:banners = "banners"父传子，传数据-->
    <HomeSwiper :banners = "banners"></HomeSwiper>
    
    <!-- 四项小组件 -->
    <RecommendView :recommends = "recommends"></RecommendView>

    <!-- 推荐更多 -->
    <feature-view></feature-view>

    <!-- 选项卡 -->
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control"></tab-control>

    <ui>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
      <li>11X</li>
    </ui>

  </div>
</template>


<script>
import RecommendView from "./childComps/RecommendView";
import FeatureView from './childComps/FeatureView';
import HomeSwiper from "./childComps/HomeSwiper";

import NavBar from "components/common/navbar/NavBar";
import TabControl from 'components/content/tabControl/TabControl';


// 只有default导出才是对象
import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  // 首页一创建就发送请求
  created() {
    // 1.请求多个数据
    getHomeMultidata().then((res) => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style scoped>
#home{
    padding-top: 44px;
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
    z-index: 9;
  }
</style>
