import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';


//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('Token');//注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = Object.assign( {
      'Content-Type': 'application/json;charset=UTF-8'
    },config.headers);
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {

    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function get(url,params={},headers={}){
//   return new Promise((resolve,reject) => {
//     axios.get(url,{
//       params:params,
//       headers:headers
//     })
//     .then(response => {
//       resolve(response.data);
//     })
//     .catch(err => {
//       reject(err)
//     })
//   })
// }
export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装权限验证方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function getAuthority(baseName,ValidData ,params={}){
  return new Promise((resolve,reject) => {
    axios.get("/WxBaseSites/Account/ValidRoleAsync?sysNo="+baseName+ValidData,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
   })
 }




 // export function post(url, options = {}) {
 //   return new Promise((resolve, reject) => {
 //     axios.post(url, options)
 //     .then(response => {
 //       resolve(response.data);
 //     })
 //     .catch(err => {
 //       reject(err)
 //     })
 //   })
 // }






 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}
