// 导入模块
import Vue from 'vue'
import axios from 'axios'
import {SERVER_BASE_URL} from './config'
// import router from '@/router'
import iView, {Notice} from 'iview'
import Cookies from 'js-cookie';
import qs from 'qs';
// import store from '@/store'
Vue.use(iView)

// 设置用户信息action
/* const setUserInfo = function (user) {
 //store.dispatch(SET_USER_INFO, user)
}; */

export default function fetch (options) {
  let data=options.data;
  if(Cookies.get("sp_dmp_uid")!=""&&Cookies.get("sp_dmp_uid")!=undefined){
   data["uid"]=Cookies.get("sp_dmp_uid");
   data["token_no"]=Cookies.get("sp_dmp_token");
 }
 options.data=qs.stringify(options.data);
 return new Promise((resolve, reject) => {
  const instance = axios.create({
    baseURL: SERVER_BASE_URL,
    timeout: 500000,
    headers: {}
  })
    // http request 拦截器
    instance.interceptors.request.use(
      config => {
        
        if(options.loading){
          iView.Spin.show({
            render: (h) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'load-c',
                    size: 24
                  },
                  style: {
                   animation: "ani-demo-spin 2s linear infinite"
                 },
               }),
                h('div', 'Loading')
                ])
            }
          });
        }
        iView.LoadingBar.start()
        iView.LoadingBar.config({
          color: '#5cb85c',
          failedColor: '#f0ad4e',
          height: 5
        });
        // config.headers.Authorization = 'token'
        return config
      },
      err => {
        iView.LoadingBar.error()
        iView.Spin.hide();
        return Promise.reject(err)
      })

    // http response 拦截器
    instance.interceptors.response.use(
      response => {
        iView.Spin.hide();
        iView.LoadingBar.finish()
        return response
      },
      error => {
        iView.Spin.hide();
        iView.LoadingBar.error()
        if (error) {
        }
        return Promise.reject(error) // 返回接口返回的错误信息
      })

    // 请求处理
    instance(options)
    .then((res) => {
        // alert(JSON.stringify(options.data));
        // 请求成功时,根据业务判断状态
        /*  if (code === port_code.success) {
         resolve({code, msg, data})
         return false
         } else if (code === port_code.unlogin) {
         setUserInfo(null)
         router.replace({name: "login"})
       } */
       resolve(res.data)
       iView.Spin.hide();
       return false
     })
    .catch((error) => {
        // 请求失败时,根据业务判断状态
        iView.Spin.hide();
        Notice.error({
          title: '出错了！',
          desc: '错误原因 ' + JSON.stringify(error),
          duration: 0
        })
        reject(error)
      })
  })
}