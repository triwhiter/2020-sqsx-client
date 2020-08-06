// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import HttpRequest from './api/http.js';

Vue.prototype.$http = HttpRequest;
Vue.use(iView);
Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start();
//   next();
// });
router.beforeEach((to, from, next) => {
  let flag = sessionStorage.getItem('loginInfo')
  // 判断跳转的路由是否需要登录
  if (to.meta.requiresAuth == true) {
    // 用户是否登录
    if (!flag) {
      next({
        path: '/login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {
          redirect: to.fullPath
        }
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
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
