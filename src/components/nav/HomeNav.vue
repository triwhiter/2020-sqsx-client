<template>
  <div>

    <div class="nav-body">
      <div class="nav-content">
        <!-- 幻灯片 -->
        <div>
          <Carousel autoplay loop>
              <CarouselItem  v-for="(item, index) in marketing.CarouselItems" :key="index">
                <router-link to="/goodsList">
                  <img :src="item" style="width:100%">
                </router-link>
              </CarouselItem>
          </Carousel>
        </div>

<!--        <div class="nav-show">-->
<!--          <div class="nav-show-img" v-for="(item, index) in marketing.activity" :key="index">-->
<!--            <router-link to="/goodsList">-->
<!--              <img :src="item">-->
<!--            </router-link>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="nav-item">
        <ul style="display:table;text-align:center">
          <li v-for="(item,index) in nav" :key="index">
            <a href="#">{{item}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState } from 'vuex';
export default {
  name: 'HomeNav',
  data () {
    return {
      panel1: false,
      panel2: false,
      nav: [
        '限时优惠',
        '坚果',
        '麻辣',
        '果干',
        '饼干',
        '果茶',
        '鲜果',
        '罐头',
        '肉类',
        '饮品',
        '大礼盒',
        '本站特色'
      ]
    };
  },
  computed: {
    ...mapState(['marketing'])
  },
  methods: {
    showDetail (index) {
      index === 1 ? (this.panel1 = true) : (this.panel2 = true);
    },
    hideDetail (index) {
      index === 1 ? (this.panel1 = false) : (this.panel2 = false);
    }
  },
  mounted () {
    this.$refs.itemPanel1.style.left =
      this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + 'px';
    this.$refs.itemPanel2.style.left =
      this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + 'px';
    this.$refs.itemPanel1.style.top = this.$refs.navSide.offsetTop + 'px';
    this.$refs.itemPanel2.style.top = this.$refs.navSide.offsetTop + 'px';
  },
  updated () {
    this.$refs.itemPanel1.style.left =
      this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + 'px';
    this.$refs.itemPanel2.style.left =
      this.$refs.navSide.offsetLeft + this.$refs.navSide.offsetWidth + 'px';
    this.$refs.itemPanel1.style.top = this.$refs.navSide.offsetTop + 'px';
    this.$refs.itemPanel2.style.top = this.$refs.navSide.offsetTop + 'px';
  },
  store
};
</script>

<style scoped>
.nav-item {
  width: 1020px;
  height: 36px;
  margin: 0px auto;
}
.nav-item ul {
  list-style: none;
  margin-left: 35px;
}
.nav-item li {
  float: left;
  font-size: 16px;
  font-weight: bold;

  margin-left: 35px;
}
.nav-item a {
  text-decoration: none;
  color: #555555;
}
.nav-item a:hover {
  color: #d9534f;
}
/*大的导航信息，包含导航，幻灯片等*/
.nav-body {

  width: 1020px;
  height: 465px;
  margin: 0px auto;
}
.nav-side {
  width: 200px;
  height: 100%;
  padding: 0px;
  color: #fff;
  float: left;
  background-color: #6e6568;
}
.nav-side ul {
  width: 100%;
  padding: 0px;
  padding-top: 15px;
  list-style: none;
}
.nav-side li {
  padding: 7.5px;
  padding-left: 15px;
  font-size: 14px;
  line-height: 18px;
}
.nav-side li:hover {
  background: #999395;
}
.nav-side-item:hover {
  cursor: pointer;
  color: #c81623;
}

/*导航内容*/
.nav-content {
  width: 1020px;
  overflow: hidden;
  float: left;
}
/*导航图片*/
.nav-show-img {
  margin-top: 10px;
  float: left;
  width:100%;
}
.nav-show-img:nth-child(2) {
  margin-left: 12px;
}
/*显示商品*/
.content {
  width: 100%;
}
/*显示商品详细信息*/
.detail-item-panel {
  width: 815px;
  height: 485px;
  background-color: #fff;
  position: absolute;
  top: 168px;
  left: 389px;
  z-index: 999;
}
.nav-detail-item {
  margin-left: 26px;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  color: #eee;
}
.nav-detail-item span {
  padding: 6px;
  padding-left: 12px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6e6568;
}
.nav-detail-item span:hover {
  margin-left: 15px;
  background-color: #f44336;
}
.detail-item-panel ul {
  list-style: none;
}
.detail-item-panel li {
  line-height: 38px;
  margin-left: 40px;
}
.detail-item-title {
  padding-right: 6px;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  color: #555555;
}
.detail-item-title:hover {
  color: #d9534f;
}
.detail-item-row a {
  color: #555555;
}
.detail-item{
  font-size: 14px;
  padding-left: 12px;
  padding-right: 8px;
  cursor: pointer;
  border-left: 1px solid #ccc;
}
.detail-item:hover {
  color: #d9534f;
}
</style>
