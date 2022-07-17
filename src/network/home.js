import {request} from './request'

export function getHomeMultidata(){
    return request({
        url:'http://123.207.32.32:8000/home/multidata'
    })
}

// 获取首页的相关商品数据
export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}
