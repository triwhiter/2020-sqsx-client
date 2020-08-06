import Axios from "axios";

// 设置后端api路径
Axios.defaults.baseURL = "http://localhost:8088/api";
// Axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
// Axios.defaults.headers["Access-Control-Allow-Methods"] = "POST";
// Axios.defaults.headers["Access-Control-Allow-Headers"] =
// "x-requested-with,content-type";
// 设置请求头
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
// 这个Cookie不加通过工具类获取用户会有NPE
Axios.defaults.withCredentials = true; //让ajax携带cookie

Axios.interceptors.request.use(
  config => {
    //   config.headers['Accept-Key'] = Store.getters.key
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 设置拦截 出现错误时提示 错误信息
Axios.interceptors.response.use(
  resp => {
    switch (resp.data.code) {
      //响应拦截
      case 404:
        router.replace({
          path: "404",
          query: { redirect: to.fullPath }
        });
      case 500:
        router.replace({
          path: "500",
          query: { redirect: to.fullPath }
        });
      case 403:
        router.replace({
          path: "403",
          query: { redirect: to.fullPath }
        });
      default:
        return resp;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default Axios;
