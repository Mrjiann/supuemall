<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>

    <MainTab />
  </div>
</template>

<script>
import MainTab from "components/content/mainTabber/MainTab";

export default {
  name: "App",
  components: {
    MainTab,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
