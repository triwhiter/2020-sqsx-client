<template>
  <div id="app">
    <Header></Header>
    <router-view v-if="isRouterAlive"></router-view>
    <!-- 部分路由不应该包含这个Footer -->
    <Footer v-if="excludeRoutes.indexOf($route.name) == -1"></Footer>

  </div>
</template>

<script>
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },

  data () {
    return {
      excludeRoutes: ['HomeIndex', 'MyAddress', 'AddAddress', 'MyOrder', 'MyShoppingCart'],

      isRouterAlive:true
    };
  },
  components: {
    Header,
    Footer
  },

  // created () {
  //   if (sessionStorage.getItem('store')) {
  //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
  //   };
  //   window.addEventListener('beforeunload', () => {
  //     sessionStorage.setItem('store', JSON.stringify(this.$store.state));
  //   });
  // }
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
};
</script>
