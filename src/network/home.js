// 导入网络模块
import { request } from "./request";

// 导出
// 获取首页多个数据
export function getHomeMultidata(){
    return request({
        url:'http://123.207.32.32:8000/home/multidata'
    })
}

// 获取首页商品数据
export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}