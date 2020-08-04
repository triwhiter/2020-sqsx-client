<template>
  <div>
    <Table border :columns="columns" :data="dataForm" size="large" no-data-text="您的购物车没有商品，请先添加商品到购物车再点击购买"></Table>
    <div class="go-to">
      <template>
        <i-button type="error" @click="delAll">一键删除</i-button>
      </template>

      <Button @click="goTo" type="primary">去付款</Button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MyShoppingCart',
    data() {
      return {
        columns: [{
            title: '店铺名',
            key: 'store',

          }, {
            title: '名称',
            key: 'name',

          },
          {
            title: '图片',
            key: 'img_url',
            width: 220,
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: 'http://img14.360buyimg.com/n4/'+params.row.img_url
                  }
                })
              ]);
            },
            align: 'center'
          },
          {
            title: '原价',
            key: 'original_price'
          },
          {
            title: '促销价',
            key: 'promote_price'
          },
          {
            title: '数量',
            key: 'shopcart_num'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.pid)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        dataForm: [{
            store: ' ',
            name:' ',
            img_url:' ',
            promote_price:0,
            original_price:0,
            shopcart_num:0,
            pid:''
          },

        ]
      }
    },
    methods: {
      // show(index) {
      //   this.$Modal.info({
      //     title: 'User Info',
      //     content: `Name：${this.dataForm[index].name}<br>Age：${this.dataForm[index].age}<br>Address：${this.dataForm[index].address}`
      //   })
      // },
      remove(index) {
        console.log(index)
        let user = sessionStorage.getItem('loginInfo');
        let userin = (JSON.parse(user));
        this.$http
          .delete('/shopCart/del/' + userin.id+ '/'+index)
          .then(resp => {

            if(resp.data.code == 200){
              console.log("删除成功")
              this.$Message.info('删除成功', 3);
              this.$router.push({
                path: '/home/MyOrder'
              })
            }

            console.log(resp.data.code)

          })
      },
      delAll:function(){
        let user = sessionStorage.getItem('loginInfo');
        let userin = (JSON.parse(user));
        this.$http
          .delete('/shopCart/del/' + userin.id)
          .then(resp => {

            if(resp.data.code == 200){
              console.log("删除成功")
              this.$Message.info('全部删除', 3);
              this.$router.push({
                path: '/home/MyOrder'
              })
            }
            console.log(resp.data.code)

          })
      },
      goTo:function(){
       this.$router.push({
         path: '/Order'
       })
      }
    },
    created: function() {
      console.log(this.dataForm)
      const _this = this;
      let user = sessionStorage.getItem('loginInfo');
      let userin = (JSON.parse(user));
      _this.$http
        .get('/shopCart/findShopCart/' + userin.id)
        .then(resp => {
          console.log("打印cart")
          console.log(resp.data.data)
          _this.dataForm = resp.data.data
        })

    }
  }
</script>

<style scoped>
  .go-to {
    margin: 15px;
    display: flex;
    justify-content: flex-end;
  }
  button{
    margin-right:30px;
    }
</style>
