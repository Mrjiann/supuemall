import axios from 'axios'

// 导出
export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    // 2.axios的拦截器
    // 请求拦截
    instance.interceptors.request.use(config =>{
        // console.log(config);
        // 拦截请求成功后需要放行
        return config
    },err => {
        // 2.请求失败在这里执行
        // console.log(err);
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        // 拦截后要放行,放行data就可以了
        return res.data
    },err => {
        // console.log(err);
    })

    //  instance(config)本身返回的就是promise
    return instance(config)
}