<template>
  <div>
    <Table border :columns="columns" :data="order" size="large" no-data-text="你还有订单，快点去购物吧"></Table>
    <div class="page-size">
      <Page :total="10" show-sizer></Page>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyOrder',
    data() {
      return {
        order: [{
          oid: '1',
          // avatar: '',
          store: 0,
          name: '',
          number: 0,
          amount: 0,
          title: '',
          create_time: ''
        }],
        columns: [{
            title: '订单号',
            key: 'oid',
            width: 200,
            align: 'center'
          },
          // {
          //   title: '图片',
          //   src: 'avatar',

          //   align: 'center'
          // },
          {
            title: '标题',
            key: 'store',
            align: 'center',
            width: 200,
          },
          {
            title: '名称',
            width: 200,
            key: 'name',
            align: 'center'
          },
          {
            title: '数量',
            key: 'number',
            width: 200,
            align: 'center'
          },
          {
            title: '支付价格',
            width: 200,
            key: 'amount',
            align: 'center'
          },
          {
            title: '购买时间',
            width: 200,
            key: 'create_time',
            align: 'center'
          }
        ]
      };
    },
    created: function() {
      console.log(this.order[0].oid)
      const _this = this;
      let user = sessionStorage.getItem('loginInfo');
      let userin = (JSON.parse(user));
      // _this.formData.uid = userin.id
      _this.$http
        .get('/orderList/getOrderInfo/' + userin.id)
        .then(resp => {
          console.log("打印order")
          console.log(resp.data.data.length)
          _this.total = resp.data.data.length


          _this.order = resp.data.data


        })
    }
  };
</script>

<style scoped>
  .page-size {
    margin: 15px 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
