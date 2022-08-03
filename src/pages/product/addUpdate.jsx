import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

import {
    Card, Icon, Form, Input, Cascader, Button, message
} from 'antd'

import LinkButton from '../../components/link-button'
import {reqCategorys, reqAddOrUpdateProduct} from '../../api'
import {LeftOutlined} from '@ant-design/icons'

const {TextArea} = Input
const Item = Form.Item

export default function ProductAddUpdate() {

    // 状态初始化
    const [option, setOption] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [product, setProduct] = useState([])

    const navigate = useNavigate()
    const [form] = Form.useForm()
    const formRef = React.createRef()

    const {state} = useLocation()


    const validateMessages = {
        required: '请输入${label}!', /* types: {
             email: '${label} is not a valid email!',
             number: '${label} is not a valid number!',
             string: '232232'
         },
         number: {
             range: '${label} must be between ${min} and ${max}',
         }*/
    };

    /*
    验证价格的自定义验证函数
     */
    const validatePrice = (rule, value, callback) => {
        console.log(value, typeof value)
        if (value * 1 > 0) {
            callback() // 验证通过
        } else {
            callback('价格必须大于0') // 验证没通过
        }
    }

    const submit = () => {
        form.validateFields().then(async (values) => {
            console.log(values)
            const {name, desc, price, categoryIds} = values
            let pCategoryId, categoryId;
            if (categoryIds.length === 1) {
                pCategoryId = '0'
                categoryId = categoryIds[0]
            } else {
                pCategoryId = categoryIds[0]
                categoryId = categoryIds[1]
            }
            const Product = {name, desc, price, categoryIds}

            if (isUpdate) {
                Product._id = product._id
            }
            // 2. 调用接口请求函数去添加/更新
            const result = await reqAddOrUpdateProduct(Product)

            // 3. 根据结果提示
            if (result.status === 0) {
                message.success(`${isUpdate ? '更新' : '添加'}商品成功!`)
                this.props.history.goBack()
            } else {
                message.error(`${isUpdate ? '更新' : '添加'}商品失败!`)
            }

        })
    }

    const options = [{
        value: 'zhejiang', label: 'Zhejiang', children: [{
            value: 'hangzhou', label: 'Hangzhou', children: [{
                value: 'xihu', label: 'West Lake',
            },],
        },],
    }, {
        value: 'jiangsu', label: 'Jiangsu', children: [{
            value: 'nanjing', label: 'Nanjing', children: [{
                value: 'zhonghuamen', label: 'Zhong Hua Men',
            },],
        },],
    },];


    // 指定Item布局的配置对象
    const formItemLayout = {
        labelCol: {span: 2},  // 左侧label的宽度
        wrapperCol: {span: 8}, // 右侧包裹的宽度
    }

    // 头部左侧标题
    const title = (<span>
        <LinkButton onClick={() => {
            navigate(-1)
        }}>
          <LeftOutlined style={{fontSize: 20}}/>
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>)

    useEffect(() => {
        setIsUpdate(!!state)
        setProduct(state.product || {})
    }, [])


    return (<Card title={title}>
        <Form {...formItemLayout}
              validateMessages={validateMessages}
              autoComplete="off"
              ref={formRef}
              form={form}
              initialValues={product}
        >
            <Item label="商品名称" name='name' initialValue={product.name}
                  rules={[{required: true, message: 'Please input your username!'}]}>
                <Input placeholder='请输入商品名称'/>
            </Item>
            <Item label="商品描述" name='desc' rules={[{required: true, message: 'Please input your username!'}]}>
                <TextArea placeholder="请输入商品描述" autosize={{minRows: 2, maxRows: 6}}/>
            </Item>
            <Item label="商品价格" name='price'
                  rules={[{required: true, message: 'Please input your username!'}, {validator: validatePrice}]}>
                <Input type='number' placeholder='请输入商品价格' addonAfter='元'/>
            </Item>
            <Item label="商品分类" name='categoryIds'
                  rules={[{required: true, message: 'Please input your username!'}]}>
                <Cascader
                    placeholder='请指定商品分类'
                    options={options}  /*需要显示的列表数据数组*/
                    // loadData={this.loadData} /*当选择某个列表项, 加载下一级列表的监听回调*/
                />
            </Item>
            <Item>
                <Button type='primary' onClick={submit}>提交</Button>
            </Item>
        </Form>
    </Card>)
}
