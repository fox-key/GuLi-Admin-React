import React,{useState,useEffect} from 'react'
import {Card, Select, Input, Button, Table,message} from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'

import LinkButton from '../../components/link-button/index'

import {reqSearchProducts,reqProducts,reqUpdateProductStatus} from '../../api/index'
import {PAGE_SIZE} from '../../utils/constants'
const {Option} = Select


export default function ProductHome() {
    //初始化状态
    const [total,setTotal] = useState(0);
    const [products,setProducts] = useState([])
    const [searchType,setSearchType] = useState('productName')
    const [searchName,setSearchName] = useState('')
    const [loading,setLoading] = useState(false)




    const navigate = useNavigate()

    // 搜索商品
    const getProducts= async (pageNum)=>{
        setLoading(true)
        let result;
        if(searchName){
            // 搜索分页
            result = await reqSearchProducts({pageNum,searchName,searchType,pageSize:PAGE_SIZE})
        }else{
            // 一般分页
            result = await reqProducts(pageNum,PAGE_SIZE)
        }
        console.log('result',result)
        setProducts(result.data.list)
        setTotal(result.data.total)
        setLoading(false)
    }

    // 上架/下架
    const updateProductStatus = async (productId,status)=>{
        const result = await reqUpdateProductStatus(productId,status)
        if(result.status===0){
            message.success('更新状态成功!')
            getProducts(1)
        }
    }


    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) => <span>￥{price}</span>
        },
        {
            title: '状态',
            width: 100,
            align:'center',
            dataIndex: 'status',
            render: (status,product) => {  //1 在售  2 下架
                let btnText = '下架'
                let statusText = '在售'
                if (status === 2) {
                    btnText = '上架'
                    statusText = '已下架'
                }
                status = status === 1 ? 2 : 1
                return (
                    <span>
                        <Button type='primary' onClick={()=>{
                            updateProductStatus(product._id,status)}}>{btnText}</Button><br/>
                        <span>{statusText}</span>
                    </span>
                )
            }
        },
        {
            title: '操作',
            width: 100,
            render: (product) => {
                return (
                    <span>
                            <LinkButton onClick={()=>{navigate('/product/detail',{replace:false,state:{product}})}}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                     </span>
                )
            }
        },
    ];

    const title = (
        <span>
             <Select defaultValue="lucy" value={searchType} style={{width: 120}} onChange={(value)=>{setSearchType(value)}}>
                  <Option value="productName" key='productName'>按名称搜索</Option>
                  <Option value="productDesc" key='productDesc'>按描述搜索</Option>
             </Select>
            <Input placeholder="关键字"
                   style={{width: 150, marginLeft: 10, marginRight: 10}}
                    onChange={(e)=>{setSearchName(e.target.value)}}/>
             <Button type="primary" onClick={()=>{getProducts(1)}}>搜索</Button>
        </span>
    )

    const extra = (
        <Button type='primary'><PlusOutlined/> 添加商品 </Button>
    )

    useEffect(()=>{
        getProducts(1)
    },[])

    return (
        <Card title={title} extra={extra}>
            <Table loading={loading} dataSource={products} columns={columns}/>
        </Card>
    )
}
