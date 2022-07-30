import React, {useState, useEffect} from 'react'
import PubSub from 'pubsub-js'
import {Card, Table, Button, message, Modal} from 'antd'
import {
    ArrowRightOutlined, PlusOutlined

} from '@ant-design/icons';

import AddForm from './addForm'
import LinkButton from '../../components/link-button/index'
import {reqCategorys, reqAddCategory, reqUpdateCategory} from '../../api/index'

import './index.less'

/*分类管理路由组件*/
export default function Category() {
    const [categorys, setCategorys] = useState([]) //一级分类列表
    const [subCategorys, setSubCategorys] = useState([]) //二级分类列表
    const [parentId, setParentId] = useState('0') //父分类的id
    const [parentName, setParentName] = useState('') //父分类的名称
    const [loading, setLoading] = useState(false) // 标识是否正在加载中
    const [showStatus, setShowStatus] = useState(0) //是否显示对话框 0:都不显示  1:显示添加  2:显示更新

    const category = [];

    const getCategorys = async (pId) => {
        // 更新loading状态: 加载中
        setLoading(true)

        //优先使用指定的parentId,如果没有指定使用状态中的parentId
        let partId = pId || parentId

        //异步获取分类列表
        const result = await reqCategorys(partId)
        //更新loading状态: 加载完成
        setLoading(false)

        if (result.status === 0) {
            const categorys = result.data
            if (parentId === '0') {
                //更新一级分类列表
                setCategorys(categorys)
            } else {
                // 更新二级分类列表
                setSubCategorys(categorys)
            }
        } else {
            //获取列表失败
            message.error('获取列表失败')
        }
    }

    /*显示指定分类的子分类列表*/
    const showSubCates = (category) => {
        console.log('category',category)
        setParentId(category._id)
        setParentName(category.name)
       getCategorys()
    }

    /*显示一级列表*/
    const showCategorys = () => {
        setParentId('0')
        setParentName('')
        setSubCategorys([])
        setShowStatus(0)
    }

    /*显示添加的对话框*/
    const showAdd = () => {
        setShowStatus(1)
    }

    /*显示修改的对话框*/
    const showUpdate = (category) => {
        category = category
        setShowStatus(2)
    }

    /*添加分类*/
    const addCategory = async () => {
        //得到数据
    }

    const onFinish = (values) => {

    };

    const handleOk = ()=>{
        PubSub.subscribe('sendForm', (msg, data) => {
            // console.log(msg, data);
            console.log(data.current.getFiledValue)
            console.log(222)
        })

    }

    /*更新分类 */
    const updateCategory = async () => {

    }

    useEffect(() => {
        getCategorys()
    }, [])

    // useEffect(()=>{},[])

    // Card 的左侧标题
    const title = parentId === '0' ? '一级分类列表' : (
        <span> <LinkButton onClick={showCategorys}>一级分类列表</LinkButton> &nbsp;&nbsp;
            <ArrowRightOutlined/>
            &nbsp;&nbsp;
            <span>{parentName}</span> </span>)
    // Card 的右侧 button
    const extra = (<Button type='primary' onClick={showAdd}><PlusOutlined/> 添加 </Button>)

    const getAddFormValues = (form)=>{
        console.log('form',form)
    }


    const columns = [
        {title: '分类名称', dataIndex: 'name',},
        {
            title: '操作',
            width: 300,
            render: (category) => (
                <span> <LinkButton onClick={() => showUpdate(category)}>修改分类 </LinkButton>&nbsp;&nbsp;&nbsp;
                    {parentId === '0' ?
                        <LinkButton onClick={() => showSubCates(category)}>查看子分类</LinkButton> : null} </span>)
        }];
    return (
        <Card title={title} extra={extra}>
            <Table dataSource={parentId === '0' ? categorys : subCategorys} columns={columns}/>
            <Modal title="添加分类" visible={showStatus === 1} onOk={handleOk}
                   onCancel={() => setShowStatus(0)}>
                <AddForm categorys={categorys} parentId={parentId} />
            </Modal>
            <Modal title="修改分类" visible={showStatus === 2} onOk={updateCategory} onCancel={() => setShowStatus(0)}>
                {/*<UpdateForm categoryName={category.name} setForm={form => this.form = form}/>*/}
            </Modal>
        </Card>
    )
}
