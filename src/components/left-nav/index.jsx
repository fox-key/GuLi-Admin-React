import React, {useState} from 'react'


import {Link, useNavigate,useLocation} from 'react-router-dom'
import {Menu, Icon, Button} from 'antd'

import menuConfig from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import './index.less'
import iconfont from '../../assets/icon/iconfont.js'

import {createFromIconfontCN, AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';



function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    scriptUrl: iconfont,
});

// 根据后台发送的菜单整理格式
const dealMenu = (menulist) => {
    var str = []
    for (let i = 0; i < menulist.length; i++) {
        var item = {};
        item.label = menulist[i].title;
        item.key = menulist[i].key;
        item.icon = <IconFont type={menulist[i].icon}></IconFont>
        if (menulist[i].children && menulist[i].children.length > 0) {
            item.children = dealMenu(menulist[i].children)
        }
        str.push(item)
    }
    return str;
}

// 初始化菜单Menu
let menuArr = dealMenu(menuConfig)



/*
*   左侧导航组件
*
* */

export default function LeftNav(props) {

    const navigate = useNavigate()
    const location = useLocation()
    // 菜单项点击事件
    const menuClick = (item, key, keyPath, domEvent) => {
        navigate(item.key)
    }

    return (
        <div className='left-nav'

        >
            <Link to='/home' className='logo-link'>
                <img src={logo} alt="logo"/>
                <h1 style={{opacity:props.collapsed?'0':'1'}}>供应商后台</h1>
            </Link>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={menuArr}
                onClick={menuClick}
                inlineIndent='24'
            />
        </div>
    )
}
