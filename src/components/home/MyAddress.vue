<template>
  <div>
    <div class="address-box" v-for="(item, index) in address" :key="index">
      <div class="address-header">
        <span>{{item.receiver}}</span>
        <div class="address-action">

          <span @click="del(item.id)">
            <Icon type="trash-a"></Icon> 删除
          </span>
        </div>
      </div>
      <div class="address-content">
        <p><span class="address-content-title"> 收 货 人 :</span> {{item.receiver}}</p>
        <p><span class="address-content-title">收货地区:</span> {{item.area}}</p>
        <p><span class="address-content-title">收货地址:</span> {{item.street}}</p>
        <p><span class="address-content-title">邮政编码:</span> {{item.zipCode}}</p>
        <p><span class="address-content-title">手机号码:</span> {{item.phone}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  import store from '@/vuex/store';
  import {
    mapState,
    mapActions
  } from 'vuex';
  import Distpicker from 'v-distpicker';
  export default {
    name: 'MyAddress',
    data() {
      return {
        address: []


      };
    },

    computed: {

    },
    methods: {
      del: function(res) {
        this.$http
          .delete('/address/del/' + res)
          .then(resp => {
            if (resp.data.code == 200) {
              console.log("删除成功" + res)
              this.$router.push({
                path: '/home'
              })
            }
          })
      }
    },
    components: {
      Distpicker
    },
    created: function() {
      // const _this = this;
      let user = sessionStorage.getItem('loginInfo');
      let userin = (JSON.parse(user));
      var uid = userin.id;
      console.log(uid)
      this.$http
        .get('/address/getAllAddress' + '/' + uid)
        .then(resp => {
          console.log(resp)
          this.address = resp.data.data
        });
    },

    store
  };
</script>

<style scoped>
  .address-box {
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #ccc;
  }

  .address-header {
    height: 35px;
    display: flex;
    justify-content: space-between;
    color: #232323;
    font-size: 18px;
  }

  .address-content {
    font-size: 14px;
  }

  .address-content-title {
    color: #999;
  }

  .address-action span {
    margin-left: 15px;
    font-size: 14px;
    color: #2d8cf0;
    cursor: pointer;
  }
</style>
