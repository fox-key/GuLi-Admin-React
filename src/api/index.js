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


//商品管理
// 根据分类id获取分类
export const reqCategory = (categoryId)=>ajax('/api/manage/category/info',{categoryId})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/api/manage/product/list', {pageNum, pageSize})

// 根据 ID/Name 搜索产品分页列表
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) => ajax('/api/manage/product/search', { pageNum, pageSize, [searchType]: searchName, })

// 添加/更新商品
export const reqAddOrUpdateProduct = (product) => ajax('/api/manage/product/' + (product._id ? 'update' : 'add'), product, 'post')

// 对商品进行上架/下架处理
export const reqUpdateProductStatus = (productId, status) => ajax('/api/manage/product/updateStatus', { productId, status }, 'POST')

// 删除图片
export const reqDeleteImg = (name) => ajax('/api/manage/img/delete', {name}, 'post')
