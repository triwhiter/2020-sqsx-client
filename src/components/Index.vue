<template>
  <div class="container">
    <!--    <Search></Search>-->
    <HomeNav v-bind:navList="eatList"></HomeNav>
    <!-- 商品显示区域 -->
    <div class="content">
      <!-- 秒杀 -->
      <div class="seckill">
        <!-- 头部 -->
        <div class="seckill-head">
          <div class="seckill-icon">
            <img src="static/img/index/clock.png" />
          </div>
          <div class="seckill-text">
            <span class="seckill-title">限时秒杀</span>
            <span class="seckill-remarks">总有你想不到的低价</span>
          </div>
          <div class="count-down">
            <span class="count-down-text">当前场次</span>
            <span class="count-down-num count-down-hour">{{
              seckillsHours
            }}</span>
            <span class="count-down-point">:</span>
            <span class="count-down-num count-down-minute">{{
              seckillsMinutes
            }}</span>
            <span class="count-down-point">:</span>
            <span class="count-down-num count-down-seconds">{{
              seckillsSeconds
            }}</span>
            <span class="count-down-text">后结束抢购</span>
          </div>
        </div>
        <!-- 内容 -->
        <div class="seckill-content">
          <div
            class="seckill-item"
            v-for="(item, index) in top5List"
            :key="index"
          >
            <div class="seckill-item-img">
              <img v-lazy="item.imgUrl[0]" @click="eatDetail(item.productId)" />
            </div>
            <div class="seckill-item-info">
              <p style="width: 155px;height: 52px; overflow: hidden">
                {{ item.intro }}
              </p>
              <p>
                <span class="seckill-price text-danger"
                  ><Icon type="social-yen"></Icon>{{ item.promotePrice }}</span
                >
                <span class="seckill-old-price"
                  ><s>{{ item.price }}</s></span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--      循环测试-->
      <div>{{ eat.code }}</div>
      <div v-for="(item1, index1) in eatList" :key="index1">
        <div class="seckill">
          <!-- 头部 -->
          <div :class="cssList[index1 % 4]">
            <span class="item-class-title">{{ item1.cname }}</span>
          </div>
          <!-- 内容 -->
          <div class="seckill-content">
            <div
              class="seckill-item"
              v-for="(item, index) in item1.products"
              :key="index"
              v-if="index <= 4"
            >
              <div class="seckill-item-img">
                <img
                  v-lazy="item.imgUrl[0]"
                  @click="eatDetail(item.productId)"
                />
              </div>
              <div class="seckill-item-info">
                <p style="width: 155px;height: 52px; overflow: hidden">
                  {{ item.intro }}
                </p>
                <p>
                  <span class="seckill-price text-danger"
                    ><Icon type="social-yen"></Icon
                    >{{ item.promotePrice }}</span
                  >
                  <span class="seckill-old-price"
                    ><s>{{ item.price }}</s></span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import HomeNav from "@/components/nav/HomeNav";
import store from "@/vuex/store";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Index",
  created() {
    this.loadSeckillsInfo();
    this.loadCarouselItems();
    this.loadEat();
    this.loadShoppingCart();
    this.loadEatDetail();
    this.loadTop5Detail();
  },
  mounted() {
    const father = this;
    this.setIntervalObj = setInterval(function() {
      father.REDUCE_SECKILLS_TIME();
    }, 1000);
  },
  data() {
    return {
      setIntervalObj: null,
      top5List: [],
      eatList: [],
      cssList: [
        "item-class-head",
        "item-class-head1",
        "item-class-head2",
        "item-class-head3",
        "item-class-head4"
      ]
    };
  },
  methods: {
    ...mapActions([
      "loadSeckillsInfo",
      "loadCarouselItems",
      "loadComputer",
      "loadEat",
      "loadShoppingCart"
    ]),
    ...mapMutations(["REDUCE_SECKILLS_TIME"]),
    loadEatDetail() {
      const _this = this;
      this.$http.get("/products/allinCate").then(resp => {
        console.log(resp);
        let res = resp.data.data;
        _this.eatList = res;
        if (res.code === 200) {
          console.log(res);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    loadTop5Detail() {
      const _this = this;
      this.$http.get("/products/top5").then(resp => {
        console.log(resp);
        let res = resp.data.data;
        _this.top5List = res;
        if (res.code === 200) {
          console.log(res);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    eatDetail(productId) {
      this.$router.push({
        path: "/goodsDetail",
        query: { productId: productId }
      });
    }
  },
  computed: {
    ...mapState(["seckills", "computer", "eat"]),
    ...mapGetters(["seckillsHours", "seckillsMinutes", "seckillsSeconds"])
  },
  components: {
    Search,
    HomeNav
  },
  destroyed() {
    clearInterval(this.setIntervalObj);
  },
  store
};
</script>

<style scoped>
.container {
  background-color: #f6f6f6;
  padding-top: 20px;
}
.content {
  width: 1008px;
  margin: 0px auto;
}
/*****************************秒杀专栏开始*****************************/
/*秒杀专栏*/
.seckill {
  width: 100%;
  height: 330px;
  margin: 15px auto;
  background-color: #fff;
}
.seckill-head {
  width: 100%;
  height: 50px;
  background-color: #e01222;
}
.seckill-icon {
  width: 68px;
  height: 100%;
  float: left;
}
.seckill-icon img {
  width: 35px;
  height: 35px;
  margin-top: 6px;
  margin-left: 15px;
  animation-name: shake-clock;
  animation-duration: 0.3s;
  animation-iteration-count: infinite; /*设置无线循环*/
}
/*定义闹钟震动动画关键帧*/
@keyframes shake-clock {
  0% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(-8deg);
  }
}
.seckill-text {
  width: 300px;
  height: 100%;
  float: left;
}
.seckill-text .seckill-title {
  font-size: 22px;
  line-height: 50px;
  color: #fff;
}
.seckill-text .seckill-remarks {
  margin-left: 5px;
  font-size: 10px;
  color: #fff;
}
/*倒计时*/
.count-down {
  height: 100%;
  margin-right: 30px;
  line-height: 50px;
  float: right;
}
.count-down-text {
  color: #fff;
}
.count-down-num {
  padding: 3px;
  border-radius: 5px;
  background-color: #440106;
  font-size: 26px;
  font-weight: bold;
  color: #f90013;
}
.count-down-point {
  font-size: 26px;
  font-weight: bold;
  color: #440106;
}

.seckill-content {
  width: 100%;
  height: 280px;
}
.seckill-item {
  width: 183px;
  height: 250px;
  margin-top: 15px;
  margin-left: 15px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
  float: left;
}
.seckill-item-img {
  width: 160px;
  height: 160px;
  margin: 0px auto;
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
.seckill-item-img img {
  width: 130px;
  height: 130px;
  margin-left: 15px;
  margin-top: 15px;
  transition: margin-top 0.3s;
}
.seckill-item-img:hover img {
  margin-top: 6px;
  transition: margin-top 0.3s;
}
.seckill-item-info {
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 12px;
  color: #009688;
}
.seckill-item-info i:first-child {
  font-size: 14px;
}
.seckill-price {
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}
/*****************************秒杀专栏结束*****************************/

/*****************************商品专栏开始*****************************/
.item-class {
  width: 100%;
  height: 470px;
  margin-top: 15px;
  background-color: #fff;
}
.item-class-head {
  width: 100%;
  height: 50px;
  background-color: #6da6be;
}
.item-class-head1 {
  width: 100%;
  height: 50px;
  background-color: #e3613ae6;
}
.item-class-head2 {
  width: 100%;
  height: 50px;
  background-color: #963ca7;
}
.item-class-head3 {
  width: 100%;
  height: 50px;
  background-color: #4221a7;
}
.item-class-head4 {
  width: 100%;
  height: 50px;
  background-color: #442217;
}

.item-class-head ul {
  list-style: none;
  float: right;
  margin-right: 30px;
  line-height: 50px;
}
.item-class-head a {
  padding: 6px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6da6be;
  border: 1px solid #6da6be;
  text-decoration: none;
  color: #fff;
}

.item-class-head a:hover {
  border: 1px solid #fff;
}
.item-class-head li {
  float: left;
}
.item-class-head1 ul {
  list-style: none;
  float: right;
  margin-right: 30px;
  line-height: 50px;
}
.item-class-head1 a {
  padding: 6px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6da6be;
  border: 1px solid #6da6be;
  text-decoration: none;
  color: #fff;
}

.item-class-head1 a:hover {
  border: 1px solid #fff;
}
.item-class-head1 li {
  float: left;
}
.item-class-head2 ul {
  list-style: none;
  float: right;
  margin-right: 30px;
  line-height: 50px;
}
.item-class-head2 a {
  padding: 6px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #e3613ae6;
  border: 1px solid #e3613ae6;
  text-decoration: none;
  color: #fff;
}

.item-class-head2 a:hover {
  border: 1px solid #fff;
}
.item-class-head2 li {
  float: left;
}
.item-class-head3 ul {
  list-style: none;
  float: right;
  margin-right: 30px;
  line-height: 50px;
}
.item-class-head3 a {
  padding: 6px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6da6be;
  border: 1px solid #6da6be;
  text-decoration: none;
  color: #fff;
}

.item-class-head4 ul {
  list-style: none;
  float: right;
  margin-right: 30px;
  line-height: 50px;
}
.item-class-head4 a {
  padding: 6px;
  margin-left: 15px;
  font-size: 12px;
  background-color: #6da6be;
  border: 1px solid #6da6be;
  text-decoration: none;
  color: #fff;
}

.item-class-head4 a:hover {
  border: 1px solid #fff;
}
.item-class-head4 li {
  float: left;
}
.item-class-head3 a:hover {
  border: 1px solid #fff;
}
.item-class-head3 li {
  float: left;
}
.item-class-title {
  font-size: 25px;
  line-height: 50px;
  color: #fff;
  margin-left: 15px;
}
.item-class-content {
  width: 49%;
  cursor: pointer;
  border-right: 1px solid #ccc;
  margin-left: 0.9%;
  /*background-color: #cff;*/
  float: left;
}
.item-class-content:nth-child(odd) {
  border: none;
}
.item-content-top {
  width: 100%;
  height: 260px;
}
.item-big-img {
  width: 180px;
  height: 260px;
  overflow: hidden;
  float: left;
}
.item-big-img img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-big-img:hover img {
  margin-left: -15px;
  transition: margin-left 0.3s;
}
.item-four-img {
  width: 303px;
  margin-left: 8px;
  float: left;
}
.item-four-detail img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-four-detail:hover img {
  margin-left: -6px;
  transition: margin-left 0.3s;
}
.item-four-detail {
  width: 152px;
  height: 130px;
  margin-left: -1px;
  float: left;
}
.item-four-detail:first-child {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.item-four-detail:last-child {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.item-four-detail-text {
  width: 50px;
  margin-left: 5px;
  margin-top: 15px;
  float: left;
}
.item-four-detail-img {
  width: 96px;
  margin-top: 15px;
  overflow: hidden;
  float: left;
}
.item-four-detail-img img {
  margin-left: 5px;
  width: 90px;
}
.pt_bi_tit {
  font-weight: bold;
  font-size: 12px;
  color: #4488a7;
}
.pt_bi_tit-eat {
  color: #ecb127;
}
.pt_bi_promo {
  color: #00695c;
}
.item-content-bottom {
  width: 100%;
  margin-top: 8px;
}
.item-content-bottom-img {
  width: 156px;
  margin-right: 8px;
  overflow: hidden;
  float: left;
}
.item-content-bottom-img img {
  margin-left: 0px;
  transition: margin-left 0.3s;
}
.item-content-bottom-img:hover img {
  margin-left: -15px;
  transition: margin-left 0.3s;
}
/*****************************商品专栏结束*****************************/
</style>
