<template>
  <div>
<!--    <Search></Search>-->
<!--    <ShopHeader></ShopHeader>
    <GoodsDetailNav></GoodsDetailNav> -->
    <div class="shop-item-path">
      <div class="shop-nav-container">
        <Breadcrumb>
          <BreadcrumbItem to="/">首页</BreadcrumbItem>
          <BreadcrumbItem to="/goodsList">{{detail.shopName}}</BreadcrumbItem>
          <BreadcrumbItem>{{detail.intro}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
    <!-- 商品信息展示 -->
    <ShowGoods v-bind:msg="detail" v-bind:imgs="img"></ShowGoods>
    <!-- 商品详细展示 -->
   <ShowGoodsDetail v-bind:imgs="img" v-bind:comments="comment"></ShowGoodsDetail>
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import Search from '@/components/Search';
import GoodsDetailNav from '@/components/nav/GoodsDetailNav';
import ShopHeader from '@/components/header/ShopHeader';
import ShowGoods from '@/components/goodsDetail/ShowGoods';
import ShowGoodsDetail from '@/components/goodsDetail/ShowGoodsDetail';
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'GoodsDetail',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  created () {
    var productId = this.$route.query.productId;
    this.getDetail(productId);
    this.getImg(productId);
    this.getComment(productId);
    this.pushId(productId);
    this.loadGoodsInfo();
    sessionStorage.setItem('img', this.img);
  },
  data () {
    return {
      detail: [],
      img: [],
      comment: [],
      tagsColor: [ 'blue', 'green', 'red', 'yellow' ]
    };
  },
  methods: {
    ...mapActions(['loadGoodsInfo']),
    getDetail (productId) {
      const _this = this;
      this.$http
        .get('/products/' + productId)
        .then(resp => {
          console.log(resp);
          let res = resp.data.data;
          _this.detail = res;
          if (res.code === 200) {
            console.log(res);
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    getImg (productId) {
      this.$http
        .get('/productImage/' + productId)
        .then(resp => {
          console.log(resp);
          let res = resp.data.data;
          this.img = res;
          if (res.code === 200) {
            console.log(res);
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    getComment(productId) {
      this.$http
        .get('/comment/' + productId)
        .then(resp => {
          console.log(resp);
          let res = resp.data.data;
          this.comment = res;
          if (res.code === 200) {
            console.log(res);
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    pushId (productId) {

    }

  },
  computed: {
    ...mapState(['goodsInfo', 'isLoading'])
  },
  components: {
    Search,
    ShopHeader,
    GoodsDetailNav,
    ShowGoods,
    ShowGoodsDetail
  },
  store
};
</script>

<style scoped>
.shop-item-path {
  height: 38px;
  background-color: rgb(236, 235, 235);
  line-height: 38px;
  color: #2c2c2c;
}
.shop-nav-container {
  margin: 0px auto;
  width: 80%;
}
</style>
