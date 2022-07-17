import axios from 'axios'

// 导出
export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    // 请求拦截
    instance.interceptors.request.use(config => {
        // 1.请求成功在这里执行,config就是传入的config，url等
        // console.log(config);
        // 拦截请求成功后需要放行
        return config
        ////拦截失败，在发送都没发送出去就拦截失败
    }, err => {
        // 2.请求失败在这里执行
        // console.log(err);
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        // res结果，res是拦截的数据等
        // console.log(res);
        // 拦截后要放行,放行data就可以了
        return res.data;
    }, err => {
        // console.log(err);
    })

    //  instance(config)本身返回的就是promise
    return instance(config)
}