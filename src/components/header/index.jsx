import React, {useState, useEffect} from 'react'
import {Modal} from 'antd'
import {useLocation, useNavigate} from 'react-router-dom'


import './index.less'
import LinkButton from '../../components/link-button'
import menuList from '../../config/menuConfig'
// import {reqWeather} from '../../api/weather'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
// import {reqWeather} from '../../api/index'
import {searchWeather} from '../../api/weather'

/*
*   头部组件
* */

export default function Header() {

    const [systime, setSystime] = useState(formateDate(Date.now()));
    const [dayPictureUrl, setDayPictureUrl] = useState();
    const [weather, setWeather] = useState();

    const navigate = useNavigate()

    const getWeather = async () => {
        let res = await searchWeather('北京')
        console.log(res)
        setWeather(res)
    }


    const logout = () => {
        Modal.confirm({
            content: '确定退出吗?', onOk: () => {
                console.log('确定')
                storageUtils.removeUser()
                memoryUtils.user = {}
                navigate('/login')
            }, onCancel() {
                console.log('取消')
            },
        })
    }

    const getTitle = (path) => {
        let title
        menuList.forEach(menu => {
            if (menu.key === path) {
                title = menu.title
            } else if (menu.children) {
                menu.children.forEach(item => {
                    if (path.indexOf(item.key) === 0) {
                        title = item.title
                    }
                })
            }
        })
        return title
    }


    // 得到当前用户
    const user = memoryUtils.user
    //获取当前路径path
    const {pathname} = useLocation()
    const title = getTitle(pathname)



    useEffect(() => {
        getWeather()
    }, [])

    useEffect(() => {
        let timer = setInterval(() => {
            setSystime(formateDate(Date.now()))
        }, 1000)
        return ()=>{
            clearInterval(timer)
        }
    }, [])

    return (<div className="header">
        <div className="header-top"><span>欢迎, {user.username}</span> <LinkButton onClick={logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
            <div className="header-bottom-left">{title}</div>
            <div className="header-bottom-right"><span>{systime}</span>{/*<img src='' alt="weather"/>*/} &nbsp; &nbsp;
                <span>{weather?.realtime?.info}</span></div>
        </div>
    </div>)
}
