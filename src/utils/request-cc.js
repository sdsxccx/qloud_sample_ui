import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  // request timeout
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    //登录验证
    if (res.statusCode == 401){
      Message({
        message: res.message.resp_msg,
        type: 'error',
        duration: 3 * 1000
      })
    }
    if (res.message && res.message.resp_code === 1) {
      store.dispatch('user/resetToken').then(() => {
        router.push({ path: '/login' })
      })
      return
    }
    //处理blob类型数据
    /* if (res.type == 'application/octet-stream' || res.type == "blob" || res.code==0 ){
      return res
    }
    if (res.statusCode !== 200 && res.statusCode !== 202) {
      Message({
        message: res.message.resp_msg || '系统内部错误，请联系管理员',
        type: 'error',
        duration: 3 * 1000
      })
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if (res.data && res.data.resp_code == 1){
        Message({
          message: res.data.resp_msg,
          type: 'error',
          duration: 3 * 1000
        })
        // return Promise.reject(new Error(res.message || 'Error'))
      }  else if (res.data && res.data.code == 1){
        Message({
          message: res.resp_msg || '系统内部错误，请联系管理员',
          type: 'error',
          duration: 3 * 1000
        })
      } else{
        return res
      }
    } */
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
