import React, {createRef} from 'react'

import PubSub from 'pubsub-js'

import PropsTypes from 'prop-types'
import {Button, Checkbox, Form, Select, Input} from 'antd'

const {Option} = Select;
const Item = Form.Item;

function AddForm(props) {
    const formRef = createRef()


    const onFinish = (values)=>{
        console.log('formRef',values)
        // PubSub.publish('sendForm',formRef)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    const {categorys, parentId, getAddFormValues} = props
    console.log(categorys, parentId)


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
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Item label='所属分类'>
                <Select>
                    <Option key='0' value='0' allowClear={true}>一级分类</Option>
                    {categorys.map(c =>
                        <Option key={c._id} value={c._id}>{c.name}</Option>)
                    }
                </Select>
            </Item>

            <Item label='分类名称'>
                <Input placeholder='请输入分类名称'/>
            </Item>
            <Item label='分类名称'>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Item>
        </Form>
    )
}

AddForm.propTypes = {
    categorys: PropsTypes.array.isRequired,
    parentId: PropsTypes.string.isRequired,
    // setForm: PropsTypes.func.isRequired,
}

export default AddForm
