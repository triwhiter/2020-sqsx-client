// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import iView from "iview";
import "iview/dist/styles/iview.css";
import HttpRequest from "./api/http.js";
import VueLazyLoad from "vue-lazyload";

Vue.use(VueLazyLoad, {
  error: "./static/error.gif",
  loading: "./static/loading.gif"
});

Vue.prototype.$http = HttpRequest;
Vue.use(iView);
Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start();
//   next();
// });
router.beforeEach((to, from, next) => {
    let flag = sessionStorage.getItem('loginInfo')
    if (to.meta.requiresAuth == true) { // 判断跳转的路由是否需要登录

        if (!flag) { // vuex.state判断token是否存在
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        } else {
            return next();
        }
    } else {
       next()
    }
})

router.afterEach(route => {
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
