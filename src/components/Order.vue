<template>
  <div>
    <Search></Search>
    <GoodsListNav></GoodsListNav>
    <div class="goods-list-container">
      <Alert show-icon class="tips-box">
        小提示
        <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
        <template slot="desc"
          >请点击商品前的选择框，选择购物车中的商品，点击付款即可。</template
        >
      </Alert>
      <Table
        border
        ref="selection"
        :columns="columns"
        :data="shoppingCart"
        size="large"
        @on-selection-change="select"
        no-data-text="您的购物车没有商品，请先添加商品到购物车再点击购买"
      ></Table>
      <div class="address-container">
        <h3>收货人信息</h3>
        <div class="address-box">
          <div class="address-check">
            <div class="address-check-name">
              <span
                ><Icon type="ios-checkmark-outline"></Icon>
                {{ checkAddress.name }}</span
              >
            </div>
            <div class="address-detail">
              <p>{{ checkAddress.address }}</p>
            </div>
          </div>
          <Collapse>
            <Panel>
              选择地址
              <p slot="content">
                <RadioGroup vertical size="large" @on-change="changeAddress">
                  <Radio
                    :label="item.id"
                    v-for="(item, index) in address"
                    :key="index"
                  >
                    <span
                      >{{ item.receiver }} {{ item.street }} {{ item.phone }}
                      {{ item.zipCode }}</span
                    >
                  </Radio>
                </RadioGroup>
              </p>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div class="remarks-container">
        <h3>备注</h3>
        <i-input
          v-model="remarks"
          size="large"
          placeholder="在这里填写备注信息"
          class="remarks-input"
        ></i-input>
      </div>
      <div class="invoices-container">
        <h3>发票信息</h3>
        <p>该商品不支持开发票</p>
      </div>
      <div class="pay-container">
        <div class="pay-box">
          <p>
            <span>提交订单应付总额：</span>
            <span class="money"
              ><Icon type="social-yen"></Icon> {{ totalPrice.toFixed(2) }}</span
            >
          </p>
          <div class="pay-btn">
            <router-link to="/pay"
              ><Button type="error" size="large" @click="submitOrder"
                >支付订单</Button
              ></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import GoodsListNav from "@/components/nav/GoodsListNav";
import store from "@/vuex/store";
// import { mapState, mapActions } from 'vuex';
export default {
  name: "Order",
  beforeRouteEnter(to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  created() {
    this.getUser();
    this.loadAddress();
    this.loadShoppingCart();
  },
  data() {
    return {
      goodsCheckList: [],
      shoppingCart: [],
      address: [],
      user: {},
      columns: [
        {
          type: "selection",
          width: 58,
          align: "center"
        },
        {
          title: "图片",
          key: "img_url",
          width: 86,
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.img_url
                }
              })
            ]);
          },
          align: "center"
        },
        {
          title: "商品名称",
          key: "name",
          align: "center"
        },
        {
          title: "所属类别",
          width: 198,
          key: "store",
          align: "center"
        },
        {
          title: "数量",
          key: "shopcart_num",
          width: 68,
          align: "center"
        },
        {
          title: "单价",
          width: 68,
          key: "promote_price",
          align: "center"
        }
      ],
      checkAddress: {
        name: "未选择",
        address: "请选择地址"
      },
      remarks: ""
    };
  },
  computed: {
    // ...mapState(['address', 'shoppingCart']),
    totalPrice() {
      let price = 0;
      this.goodsCheckList.forEach(item => {
        price += item.promote_price * item.shopcart_num;
      });
      return price;
    }
  },
  methods: {
    // ...mapActions(['loadAddress']),
    select(selection, row) {
      console.log(selection);
      this.goodsCheckList = selection;
    },
    changeAddress(data) {
      const father = this;
      this.address.forEach(item => {
        if (item.id === data) {
          father.checkAddress.name = item.receiver;
          father.checkAddress.address = `${item.receiver} ${item.street} ${item.phone} ${item.zipCode}`;
          sessionStorage.setItem("addressId", item.id);
        }
      });
    },
    getUser() {
      this.user = JSON.parse(sessionStorage.getItem("loginInfo"));
    },
    loadAddress() {
      this.$http.get("/address/getAllAddress/" + this.user.id).then(resp => {
        console.log(resp);
        let res = resp.data;
        if (res.code == 200) {
          this.address = res.data;
          console.log(this.address);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //获取购物车信息 shoppingCart
    loadShoppingCart() {
      this.$http.get("/shopCart/findShopCart/" + this.user.id).then(resp => {
        let res = resp.data;
        let beforeImg = "";
        if (res.code == 200) {
          res.data.forEach(item => {
            item.img_url = item.img_url;
            item.img_url = "http://img14.360buyimg.com/n5/"+item.img_url.split('n1/')[1];
          });
          this.shoppingCart = res.data;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //支付订单，传输商品id列表，总价，备注，收货地址id,用户id
    submitOrder() {
      let pids = [];
      let nums = [];
      this.goodsCheckList.forEach(item => {
        pids.push(item.pid);
        nums.push(item.shopcart_num);
      });
      let total = this.totalPrice.toFixed(2);
      let data = {
        pids: pids,
        nums: nums,
        amount: parseFloat(total),
        message: this.remarks,
        aid: parseInt(sessionStorage.getItem("addressId"))
      };
      console.log(data);
      this.$http.post("/orderList/", data).then(resp => {
        let res = resp.data;
        console.log(res);
        if (res.code == 200) {
          this.$Message.success(res.msg);
        } else {
          this.$Message.error(res.msg);
        }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.selection.selectAll(true);
    }, 500);
  },
  components: {
    Search,
    GoodsListNav
  },
  store
};
</script>

<style scoped>
.goods-list-container {
  margin: 15px auto;
  width: 80%;
}
.tips-box {
  margin-bottom: 15px;
}
.address-container {
  margin-top: 15px;
}
.address-box {
  margin-top: 15px;
  padding: 15px;
  border: 1px #ccc dotted;
}
.address-check {
  margin: 15px 0px;
  height: 36px;
  display: flex;
  align-items: center;
}
.address-check-name {
  width: 120px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #ccc;
}
.address-check-name span {
  width: 120px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  background-color: #f90013;
}
.address-detail {
  padding-left: 15px;
  font-size: 14px;
  color: #999999;
}
.remarks-container {
  margin: 15px 0px;
}
.remarks-input {
  margin-top: 15px;
}
.invoices-container p {
  font-size: 12px;
  line-height: 30px;
  color: #999;
}
.pay-container {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}
.pay-box {
  font-size: 18px;
  font-weight: bolder;
  color: #495060;
}
.money {
  font-size: 26px;
  color: #f90013;
}
.pay-btn {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
}
</style>
