/* @本地存储
 * @Author: mikey.zhz 
 * @Date: 2019-05-24 09:50:10 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-05-24 09:55:48
 * @params[key:string 保存在本地的名称，value:any 保存在本地数据的参数]
 */


export let settLocalStore=(key,value)=>{
    localStorage.setItem(key,JSON.stringify(value))
}

export let gettLocalStore=key=>JSON.parse(localStorage.getItem(key))
