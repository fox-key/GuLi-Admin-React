import React, {useState} from 'react'

import {Navigate, Routes, Route} from 'react-router-dom'

import {Layout} from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'

import Home from '../home/home'
import Category from '../category'
import Product from '../product/product'
import Role from '../role'
import User from '../user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const {Footer, Sider, Content} = Layout

export default function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    const user = memoryUtils.user
    if (!user._id) {
        return <Navigate to='/login'/>
    }

    return (
        <>
            <Layout style={{height: '100%'}}>

                <Sider collapsible collapsed={collapsed}
                       onCollapse={value => setCollapsed(value)}>
                    <LeftNav collapsed={collapsed} />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor: 'white'}}>
                        <Routes>
                            <Route path='/home' element={<Home/>}></Route>
                            <Route path='/category' element={<Category/>}></Route>
                            <Route path='/product' element={<Product/>}></Route>
                            <Route path='/role' element={<Role/>}></Route>
                            <Route path='/user' element={<User/>}></Route>
                            <Route path='/charts/bar' element={<Bar/>}></Route>
                            <Route path='/charts/line' element={<Line/>}></Route>
                            <Route path='/charts/pie' element={<Pie/>}></Route>
                        </Routes>
                    </Content>
                    <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器， 可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        </>
    )
}
