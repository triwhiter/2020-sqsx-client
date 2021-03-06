import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
const Login = resolve => require(['@/components/Login'], resolve);
const SignUp = resolve => require(['@/components/SignUp'], resolve);
const CheckPhone = resolve => require(['@/components/signUp/CheckPhone'], resolve);
const InputInfo = resolve => require(['@/components/signUp/InputInfo'], resolve);
const SignUpDone = resolve => require(['@/components/signUp/SignUpDone'], resolve);
const GoodsList = resolve => require(['@/components/GoodsList'], resolve);
const GoodsDetail = resolve => require(['@/components/GoodsDetail'], resolve);
const ShoppingCart = resolve => require(['@/components/ShoppingCart'], resolve);
const Order = resolve => require(['@/components/Order'], resolve);
const Pay = resolve => require(['@/components/Pay'], resolve);
const PayDone = resolve => require(['@/components/PayDone'], resolve);
const Freeback = resolve => require(['@/components/Freeback'], resolve);
const Home = resolve => require(['@/components/Home'], resolve);
const MyAddress = resolve => require(['@/components/home/MyAddress'], resolve);
const AddAddress = resolve => require(['@/components/home/AddAddress'], resolve);
const MyOrder = resolve => require(['@/components/home/MyOrder'], resolve);
const MyShoppingCart = resolve => require(['@/components/home/MyShoppingCart'], resolve);
const UserInfo = resolve => require(['@/components/home/UserInfo'], resolve);
const Merchant = resolve => require(['@/components/Merchant'], resolve);
const GoodsListNav = resolve => require(['@/components/nav/GoodsListNav.vue'], resolve);
const NoPage = resolve => require(['@/components/404'], resolve);
const NoPower = resolve => require(['@/components/403'], resolve);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/", // 首页
      name: "Index",
      component: Index
    },
    {
      path: '/404',
      name: 'NoPage',
      component: NoPage
    },
    {
      path: '/403',
      name: 'NoPower',
      component: NoPower
    },
    {
      path: '/GoodsListNav',
      name: 'GoodsListNav',
      component: GoodsListNav
    },
    {
      path: "/Login", // 登录
      name: "Login",
      component: Login
    },
    {
      path: "/SignUp", // 注册
      name: "SignUp",
      component: SignUp,
      children: [
        {
          path: "/",
          name: "index",
          component: CheckPhone
        },
        {
          path: "checkPhone",
          name: "CheckPhone",
          component: CheckPhone
        },
        {
          path: "inputInfo",
          name: "InputInfo",
          component: InputInfo
        },
        {
          path: "signUpDone",
          name: "SignUpDone",
          component: SignUpDone
        }
      ]
    },
    {
      path: "/goodsList", // 商品列表
      name: "GoodsList",
      component: GoodsList
    },
    {
      path: "/goodsDetail", // 商品详情
      name: "GoodsDetail",
      component: GoodsDetail
    },
    {
      path: "/shoppingCart", // 商品详情
      name: "ShoppingCart",
      component: ShoppingCart
    },
    {
      path: "/order", // 订单页面
      name: "Order",
      component: Order,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/pay", // 支付页面
      name: "Pay",
      component: Pay,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/payDone", // 支付成功页面
      name: "PayDone",
      component: PayDone,
     meta: {
       requiresAuth: true
     }
    },
    {
      path: "/freeback", // 反馈页面
      name: "Freeback",
      component: Freeback,
     meta: {
       requiresAuth: true
     }
    },
    {
      path: "/home", // 主页
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true
      },

      children: [
        {
          path: "/",
          name: "HomeIndex",
          component: MyOrder,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "UserInfo",
          name: "UserInfo",
          component: UserInfo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "myAddress",
          name: "MyAddress",
          component: MyAddress,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "addAddress",
          name: "AddAddress",
          component: AddAddress,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "myOrder",
          name: "MyOrder",
          component: MyOrder,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "myShoppingCart",
          name: "MyShoppingCart",
          component: MyShoppingCart,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: "/merchant",
      name: "Merchant",
      component: Merchant
    }
  ]
});
