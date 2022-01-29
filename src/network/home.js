// 导入网络模块
import { request } from "./request";

// 导出
// 获取首页多个数据
export function getHomeMultidata(){
    return request({
        url:'http://123.207.32.32:8000/home/multidata'
    })
}