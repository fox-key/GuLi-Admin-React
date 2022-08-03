/*
*   应用根组件
* */

import React from 'react'
// import {Button,message} from 'antd'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


import './App.less'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

//应用跟组件
export default class App extends React.Component {

    // handleClick = () => { message.success('成功啦...'); }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path='/login'  element={<Login/>}></Route>
                        <Route path='/*'  element={<Admin/>}></Route>
                    </Routes>
                </BrowserRouter></>
        )
    }
}
