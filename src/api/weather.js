

import {reqWeather} from './index'


export function searchWeather(city){
    return new Promise(async(resolve,reject)=>{
       try{
           const {error_code,result} =await reqWeather(city);
           if(error_code===0){
               resolve(result)
           }
       }catch (err){
           alert('获取天气信息失败!')
       }
    })
}
