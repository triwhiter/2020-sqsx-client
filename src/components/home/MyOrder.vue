<template>
  <div>
    <Table border :columns="columns" :data="order" size="large" no-data-text="你还没有订单，快点去购物吧"></Table>
    <div class="page-size">
      <template>
          <Page :total="total" :page-size="pageSize" prev-text="Previous" next-text="Next" @on-change="change" />
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyOrder',
    data() {
      return {
        order: [
          // {
        //   id: '1',
        //   avatar: '',
        //   store: '',
        //   name: '',
        //   number: 0,
        //   amount: 0,
        //   // title: '',
        //   create_time: ''
        // }
        ],
        total:10,
        pageNo: 1,
        pageSize:10,
        columns: [{
            title: '订单号',
            key: 'id',
            width: 200,
            align: 'center'
          },
          {
            title: '店铺名',
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
          title: '图片',
          key: 'img_url',
          width: 220,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.img_url
                }
              })
            ]);
          },
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
    methods:{
      getData() {
        let user = sessionStorage.getItem('loginInfo');
        let userin = (JSON.parse(user));
        this.pageSize = 10;
        this.$http
        .get('/orderList/getOrderInfoPage/'+userin.id+'/'+this.pageNo +'/' + this.pageSize)
        .then(resp => {
          console.log(resp);
          if(resp.data.code == 200){
            console.log("查询成功")
            console.log(resp.data.data)
            this.total = resp.data.data[0].total;
            this.pageSize = resp.data.data.size;
            this.order = resp.data.data;
            console.log(this.order);
            this.order.forEach(item => {
              item.img_url = item.img_url;
              item.img_url = "http://img14.360buyimg.com/n5/"+item.img_url.split('n1/')[1];
            });
          }
        })
      },
      change(current) {
        // console.log(current)
        // let user = sessionStorage.getItem('loginInfo');
        // let userin = (JSON.parse(user));
        // this.$http
        // .get('/orderList/getOrderInfoPage/'+userin.id+'/'+current+'/6')
        // .then(resp => {
        //   if(resp.data.code == 200){
        //     console.log("查询成功")
        //     console.log(resp.data.data)
        //     this.total = resp.data.data.totalPages;
        //     this.pageSize = resp.data.data.size;
        //     this.order = resp.data.data;
        //   }
        // })
        console.log(current);
        this.pageNo = current;
        this.getData();
      }
    },
    created() {
     this.getData();
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
