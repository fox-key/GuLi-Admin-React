/*包含 n 个接口请求函数的模块 每个函数返回 promise */

import ajax from './ajax'

//登录
export const reqLogin = (username,password)=>ajax('/api/login',{username,password},'POST')

//天气
export const reqWeather = (city)=>ajax('/weather/simpleWeather/query?key=cb132bd5b272f9fc07ab22f0ca328ef8',{city},'GET')

//获取一级或某个二级分类列表
export const reqCategorys = (parentId)=>ajax('/api/manage/category/list',{parentId})

//添加分类
export const reqAddCategory=(parentId,categoryName)=>ajax('/api/manage/category/add',{
    parentId,categoryName
},'POST')

//更新品类名称
export const reqUpdateCategory = ({categoryId,categoryName})=>{
    ajax('/api/manage/category/update',{
        categoryId,categoryName
    },'POST')
}
