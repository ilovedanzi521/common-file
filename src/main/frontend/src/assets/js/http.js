/*
 * @Author: mikey.zhaopeng 
 * @Date: 2019-05-22 15:14:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-22 15:31:22
 */


import axios from "axios"

/* 
 * @Author: mikey.zhz
 * @Date: 2019-05-20 13:17:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-22 15:14:18
 */
let _setUrl=(url,params)=>{
    if(!params) {return url};
    let connectUrl=`${url}?`;
    let query="";
    Object.keys(params)
          .forEach(item=>{
           query+=`&${item}=${params[item]}`})
    query=query.slice(1);
    return `${connectUrl}${query}`
}

/**get请求 */
export const getHttp=(url,params)=>{
    return new Promise((resolve,reject)=>{
       axios.get(_setUrl(url,params)).then(res=>{
           resolve(res.data) 
         }).catch((err)=>{
           reject(err)
       })
    })
}

/**post请求 */
export const postHttp=(url,params,data)=>{
    return new Promise((resolve,reject)=>{
       axios.post(_setUrl(url,params),data).then(res=>{
            resolve(res.data) 
           }).catch((err)=>{
           reject(err.data)
       })
    })
}