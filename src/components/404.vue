<template>
  <div style="width: 100%; height: 50%;">
    <HomeNav v-bind:navList="eatList"></HomeNav>
    <img src="../../static/404.jpg" style="width: 100%;"/>
  </div>

</template>

<script>
import HomeNav from "@/components/nav/HomeNav";
  export default{
    name: '404',
  }
</script>

<style>
</style>
