import React, {useState, useEffect, createRef} from 'react'
import PubSub from 'pubsub-js'
import {Card, Table, Button, message, Modal, Select, Form, Input} from 'antd'
import {
    ArrowRightOutlined, PlusOutlined

} from '@ant-design/icons';

import AddForm from './addForm'
import LinkButton from '../../components/link-button/index'
import {reqCategorys, reqAddCategory, reqUpdateCategory} from '../../api/index'

import './index.less'

const Item = Form.Item;
const {Option} = Select;

/*分类管理路由组件*/
export default function Category() {
    const [categorys, setCategorys] = useState([]) //一级分类列表
    const [subCategorys, setSubCategorys] = useState([]) //二级分类列表
    const [parentId, setParentId] = useState('0') //父分类的id
    const [parentName, setParentName] = useState('') //父分类的名称
    const [loading, setLoading] = useState(false) // 标识是否正在加载中
    const [showStatus, setShowStatus] = useState(0) //是否显示对话框 0:都不显示  1:显示添加  2:显示更新

    //点击修改的category的id
    const [updateCategoryId, setUpdateCategoryId] = useState()

    let categoryName = {};

    // 添加分类form
    const formRef = React.createRef()
    // 修改分类form
    const updateFormRef = React.createRef()
    const [form] = Form.useForm()
    const [form2] = Form.useForm()

    const getCategorys = async (pId) => {
        // 更新loading状态: 加载中
        setLoading(true)

        //优先使用指定的parentId,如果没有指定使用状态中的parentId
        let partId = pId || parentId

        //异步获取分类列表
        const result = await reqCategorys(partId)
        console.log('getresult',result)
        //更新loading状态: 加载完成
        setLoading(false)


        if (result.status === 0) {
            const categorys = result.data
            if (partId === '0') {
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
        setParentId(category._id)
        setParentName(category.name)
        getCategorys(category._id)
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
        console.log('category', category)
        categoryName=category
        // setCategorys([category])
        setUpdateCategoryId(category._id)
        setShowStatus(2)
    }


    // 添加分类
    const onFinish = async (values) => {
        // formRef.current?.getFieldsValue() 的值即为 form 表单中的数据
        const pid = formRef.current?.getFieldsValue().parentId
        const cname = formRef.current?.getFieldsValue().categoryName
        setShowStatus(0)
        // 重置表单
        form.resetFields()
        // 请求添加分类
        const result = await reqAddCategory(pid, cname)
        if (result.status === 0) {
            if (pid === parentId) {
                getCategorys()
            } else if (pid === '0') {
                getCategorys(pid)
            }
        }
    };


    /*更新分类 */
    const updateCategory = async () => {
        const cname = updateFormRef.current?.getFieldsValue().categoryName
        const res = await reqUpdateCategory({categoryId: updateCategoryId, categoryName: cname})
        form2.resetFields()
        console.log('updateResult',res)
        getCategorys()
        setShowStatus(0)
        /*  if (result.status === 0) {
              // 重新获取列表
          }*/
    }

    useEffect(() => {
        getCategorys()
    }, [])

    useEffect(() => {
        getCategorys()
    }, [parentId])

    // Card 的左侧标题
    const title = parentId === '0' ? '一级分类列表' : (
        <span> <LinkButton onClick={showCategorys}>一级分类列表</LinkButton> &nbsp;&nbsp;
            <ArrowRightOutlined/>
            &nbsp;&nbsp;
            <span>{parentName}</span> </span>)
    // Card 的右侧 button
    const extra = (<Button type='primary' onClick={showAdd}><PlusOutlined/> 添加 </Button>)


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

    const addCategoryForm = () => {
        return (
            <Form
                labelCol={{
                    span: 6,
                }}
                ref={formRef}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Item label='所属分类' name='parentId'>
                    <Select defaultValue='0'>
                        <Option key='0' value='0' allowClear={true}>一级分类</Option>
                        {categorys.map(c =>
                            <Option key={c._id} value={c._id}>{c.name}</Option>)
                        }
                    </Select>
                </Item>

                <Item label='分类名称' name='categoryName'>
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }

    const uppdateCategoryForm = () => {
        console.log('categoryName',categoryName)
        return (
            <Form onFinish={updateCategory} ref={updateFormRef} form={form2}>
                <Item name='categoryName' initialValue={categoryName.categoryName}>
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        )
    }

    return (
        <Card title={title} extra={extra}>
            <Table dataSource={parentId === '0' ? categorys : subCategorys} columns={columns}
                   pagination={{defaultPageSize: 5, showQuickJumper: true}}/>
            <Modal title="添加分类" visible={showStatus === 1} onOk={onFinish}
                   onCancel={() => setShowStatus(0)} forceRender>
                {addCategoryForm()}
            </Modal>
            <Modal title="修改分类" visible={showStatus === 2} onOk={updateCategory} onCancel={() => setShowStatus(0)}>
                {uppdateCategoryForm()}
            </Modal>
        </Card>
    )
}
