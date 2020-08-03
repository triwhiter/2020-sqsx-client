/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax';

const BASE_URL = 'http://localhost:8088/api';

// const BASE_URL = '/bookstore'

// 1、根据经纬度获取位置详情
// export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`);
// 2、获取商品分类列表
export const reqGoodCategorys = () => ajax(BASE_URL + '/bookclassify/all');
export const reqIndexGoods = () => ajax(BASE_URL + '/product/allinCate');
