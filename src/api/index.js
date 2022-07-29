/*包含 n 个接口请求函数的模块 每个函数返回 promise */

import ajax from './ajax'

//登录
export const reqLogin = (username,password)=>ajax('/api/login',{username,password},'POST')

//天气
export const reqWeather = (city)=>ajax('/weather/simpleWeather/query?key=cb132bd5b272f9fc07ab22f0ca328ef8',{city},'GET')
