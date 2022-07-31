import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {List, Card} from 'antd'

import {LeftOutlined} from '@ant-design/icons'

import {BASE_IMG_URL} from '../../utils/constants'
import {reqCategory} from '../../api'
import LinkButton from '../../components/link-button'

import './detail.less'

export default function Detail() {
    const {state: {product}} = useLocation()
    console.log('product', product)
    const {name, desc, price, imgs, detail, categoryId, pCategoryId} = product

    // 初始化状态
    const [cName1, setcName1] = useState('') //一级分类名称
    const [cName2, setcName2] = useState('') //二级分类名称

    const navigate = useNavigate()

    const getCategoryName = async () => {
        if (pCategoryId === '0') {
            // 获取一级分类名称
            const result = await reqCategory(categoryId)
            setcName1(result.data.name)
        } else {
            const result = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
            const result1 = result[0]
            const result2 = result[1]
            setcName1(result1.data.name)
            setcName2(result2.data.name)
        }
    }

    const title = (
        <span>
            <LinkButton onClick={() => {
                navigate(-1)
            }}>
                <LeftOutlined style={{fontSize: 20}}/>
            </LinkButton>
            &nbsp;&nbsp;商品详情
        </span>
    )

    const imgStyle = {width: 150, height: 150, marginRight: 10, border: '1px solid black'}

    useEffect(() => {
        getCategoryName()
    }, [])


    return (
        <Card title={title} className='product-detail'>
            <List>
                <List.Item>
                    <span className='left'>商品名称:</span>
                    <span>{name}</span>
                </List.Item>
                <List.Item>
                    <span className='left'>商品描述:</span>
                    <span>{desc}</span>
                </List.Item>
                <List.Item>
                    <span className='left'>商品价格:</span>
                    <span>{price + '元'}</span>
                </List.Item>
                <List.Item>
                    <span className='left'>所属分类:</span>
                    <span>{cName1 + (cName2 ? ' --> ' + cName2 : '')}</span>
                </List.Item>
                <List.Item>
                    <span className='left'>商品图片:</span>
                    <span> {imgs.map(img => (
                        <img src={BASE_IMG_URL + img} alt="img" key={img} style={imgStyle}/>))} </span>
                </List.Item>
                <List.Item>
                    <span className='left'>商品详情:</span>
                    <div dangerouslySetInnerHTML={{__html: detail}}></div>
                </List.Item>
            </List>
        </Card>
    )
}
