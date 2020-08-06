<template>
  <div>
    <div class="item-detail-show">
      <div class="item-detail-left">
        <div class="item-detail-big-img">
          <img :src="imgs[imgIndex].imgUrl" alt="" />
        </div>
        <div class="item-detail-img-row">
          <div
            class="item-detail-img-small"
            v-for="(item, index) in imgs"
            :key="index"
            @mouseover="showBigImg(index)"
          >
            <img :src="item.imgUrl" alt="" />
          </div>
        </div>
      </div>
      <div class="item-detail-right">
        <div class="item-detail-title">
          <p>
            <span class="item-detail-express">校园配送</span> {{ msg.intro }}
          </p>
        </div>
        <div class="item-detail-tag">
          <p>
            <span v-for="(item, index) in goodsInfo.tags" :key="index"
              >【{{ item }}】</span
            >
          </p>
        </div>
        <div class="item-detail-price-row">
          <div class="item-price-left">
            <div class="item-price-row">
              <p>
                <span class="item-price-title">B I T 价</span>
                <span class="item-price">￥{{ msg.price }}</span>
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title">优 惠 价</span>
                <span
                  class="item-price-full-cut"
                  v-for="(item, index) in goodsInfo.discount"
                  :key="index"
                  >{{ item }}</span
                >
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title"
                  >促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span
                >
                <span
                  class="item-price-full-cut"
                  v-for="(item, index) in goodsInfo.promotion"
                  :key="index"
                  >{{ item }}</span
                >
              </p>
            </div>
          </div>
        </div>

        <div class="add-buy-car-number">
          <br />
          <row>
            <i-col span="12">
              <p style="text-align: center;border-right: 2px dotted #ccc ">
                累计购买:<span class="item-remarks-num"
                  >{{ msg.saleNum }} 个</span
                >
              </p>
            </i-col>
            <i-col span="12">
              <p style="text-align: center">
                累计评价:<span class="item-remarks-num"
                  >{{ msg.collectNum }} 条</span
                >
              </p>
            </i-col>
          </row>

          <br />
        </div>
        <br /><br />
        <row>
          <i-col span="3">
            <InputNumber :min="1" v-model="count" size="large"></InputNumber>
          </i-col>
          <i-col span="12">
            <p style="padding-top:2px;font-size: 20px">库存{{ msg.stock }}</p>
          </i-col>
        </row>

        <div class="add-buy-car-box">
          <div class="add-buy-car">
            <row>
              <i-col span="12" style="text-align: right;padding-right: 10px">
                <Button
                  type="warning"
                  style="height:60px;width:260px;font-size: 20px"
                  @click="addShoppingCartBtn(msg)"
                  >加入购物车</Button
                >
              </i-col>
              <i-col span="12" style="padding-left: 10px">
                <Button
                  type="error"
                  style="height:60px;width:260px;font-size: 20px"
                  @click="buyShoppingCartBtn()"
                  >立即购买</Button
                >
              </i-col>
            </row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapState, mapActions } from "vuex";
export default {
  name: "ShowGoods",
  props: {
    msg: {
      default: ""
    },
    imgs: {
      default: ""
    }
  },
  data() {
    return {
      beforeImg: "",
      price: 0,
      count: 1,
      selectBoxIndex: 0,
      imgIndex: 0
    };
  },
  computed: {
    ...mapState(["goodsInfo"]),
    hirePurchase() {
      const three = (this.price * this.count) / 3;
      const sex = (this.price * this.count) / 6;
      const twelve = ((this.price * this.count) / 12) * 1.0025;
      const twentyFour = ((this.price * this.count) / 24) * 1.005;
      return [
        {
          tooltip: "无手续费",
          type: "不分期"
        },
        {
          tooltip: "无手续费",
          type: `￥${three.toFixed(2)} x 3期`
        },
        {
          tooltip: "无手续费",
          type: `￥${sex.toFixed(2)} x 6期`
        },
        {
          tooltip: "含手续费：费率0.25%起，￥0.1起×12期",
          type: `￥${twelve.toFixed(2)} x 12期`
        },
        {
          tooltip: "含手续费：费率0.5%起，￥0.1起×12期",
          type: `￥${twentyFour.toFixed(2)} x 24期`
        }
      ];
    }
  },
  methods: {
    ...mapActions(["addShoppingCart"]),
    select(index1, index2) {
      this.selectBoxIndex = index1 * 3 + index2;
      this.price = this.goodsInfo.setMeal[index1][index2].price;
    },
    showBigImg(index) {
      this.imgIndex = index;
    },
    addShoppingCartBtn(msg) {
      const data = {
        pid: msg.productId,
        shopcart_num: this.count
      };
      // this.$http
      //   .post('/shopCart/', JSON.stringify(data))
      //   .then(resp => {
      //     console.log(resp);
      //     let res = resp.data.data;
      //     if (res.code === 200) {
      //       console.log(res);
      //     } else {
      //       this.$Message.error(res.msg);
      //     }
      //   });
      this.$router.push("/shoppingCart");
    },
    buyShoppingCartBtn() {
      const index1 = parseInt(this.selectBoxIndex / 3);
      const index2 = this.selectBoxIndex % 3;
      const date = new Date();
      const goodsId = date.getTime();
      const data = {
        goods_id: goodsId,
        title: this.goodsInfo.title,
        count: this.count,
        package: this.goodsInfo.setMeal[index1][index2]
      };
      this.addShoppingCart(data);
      this.$router.push("/order");
    }
  },
  mounted() {
    const father = this;
    setTimeout(() => {
      father.price = father.goodsInfo.setMeal[0][0].price || 0;
    }, 300);
  },
  store
};
</script>

<style scoped>
/******************商品图片及购买详情开始******************/
.item-detail-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff;
}
.item-detail-left {
  width: 500px;
  margin-right: 50px;
}
.item-detail-big-img {
  width: 500px;
  height: 450px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-big-img img {
  width: 100%;
  height: 450px;
}
.item-detail-img-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.item-detail-img-small {
  width: 68px;
  height: 68px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer;
}
.item-detail-img-small img {
  width: 100%;
}
/*商品选购详情*/
.item-detail-right {
  display: flex;
  flex-direction: column;
}
.item-detail-title p {
  color: #666;
  font-size: 20px;
}
.item-detail-express {
  font-size: 14px;
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e4393c;
  color: #fff;
}
/*商品标签*/
.item-detail-tag {
  font-size: 12px;
  color: #e4393c;
}
/*价格详情等*/
.item-detail-price-row {
  padding: 5px;
  width: 680px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f3f3f3;
  margin-bottom: 20px;
}
.item-price-left {
  display: flex;
  flex-direction: column;
}
.item-price-title {
  color: #999999;
  font-size: 20px;
  margin-right: 15px;
}
.item-price-row {
  margin: 5px 0px;
}
.item-price {
  color: #e4393c;
  font-size: 40px;
  cursor: pointer;
}
.item-price-full-cut {
  margin-right: 5px;
  padding: 3px;
  color: #e4393c;
  font-size: 12px;
  background-color: #ffdedf;
  border: 1px dotted #e4393c;
  cursor: pointer;
}

.item-remarks-sum p {
  color: #999999;
  font-size: 12px;
  line-height: 10px;
  text-align: center;
}
.item-remarks-num {
  line-height: 18px;
  color: #005eb7;
}

.item-select-img img {
  width: 100%;
}
.item-select-intro p {
  margin: 0px;
  padding: 5px;
}

.add-buy-car-number {
  width: 100%;
  margin-top: 15px;
  border-top: 1px dotted #ccc;
  border-bottom: 1px dotted #ccc;
}
.add-buy-car-box {
  width: 100%;
  margin-top: 15px;
}
.add-buy-car {
  margin-top: 15px;
}
/******************商品图片及购买详情结束******************/
</style>
