<template>
  <div>
    <div class="search-nav">
      <div class="search-nav-container">
        <ul >
          <li :class="activeClass == -1 ? 'active' : ''" @click="onload(-1)"><router-link :to="{name: 'GoodsList', query :{cid: 0}}">全部商品</router-link></li>
          <li v-for="(item,index) in category"
            :key="index" @click="onload(index)"
            :class="activeClass == index ? 'active' : ''"><router-link :to="{name: 'GoodsList', query :{cid: item.id}}">{{item.name}}</router-link></li>
<!--          <li><router-link to="/">服装城</router-link></li>
          <li><router-link to="/">美妆馆</router-link></li>
          <li><router-link to="/">BIT超市</router-link></li>
          <li><router-link to="/">生鲜</router-link></li>
          <li><router-link to="/">全球购</router-link></li>
          <li><router-link to="/">闪购</router-link></li>
          <li><router-link to="/">拍卖</router-link></li>
          <li><router-link to="/">金融</router-link></li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListNav',
  data () {
    return {
      category: [],
      activeClass: -1
    };
  },
  methods: {
    loadCategory () {
       this.$http
       .post('/category/all')
       .then(resp => {
         let res = resp.data;
         if(res.code == 200) {
           this.category = res.data;
           console.log(this.category);
         } else {
           this.$Message.error(res.msg);
         }
       })
    },
    onload(index) {
      this.activeClass = index;
    }
  },
  created() {
    this.loadCategory();
  }
};
</script>

<style scoped>
.search-nav{
  width: 100%;
  height: 64px;
  border-bottom: 2px solid #B1191A;
}
.search-nav-container{
  width: 80%;
  min-width: 1000px;
  height: 64px;
  margin: 0px auto;
}
.search-nav-container-90{
  width: 90%;
}
.search-nav-container ul{
  margin: 0px;
  padding-left: 0px;
  list-style: none;
}
.search-nav-container li{
  cursor: pointer;
  margin-left: 30px;
  line-height: 64px;
  color: #C81623;
  font-size: 18px;
  /*font-weight: bold;*/
  float: left;
}
.search-nav-container a{
  color: #C81623;
  text-decoration: none;
}
/* .search-nav-container li:first-child{
  padding: 0px 38px;
 background:#B1191A;
  margin: 0px;
  color: #fff;
} */
.active{
  padding: 0px 38px;
  margin: 0px;
  background:#B1191A;
}
.active a{
  color: #fff !important;
}
</style>
