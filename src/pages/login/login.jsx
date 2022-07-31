/*
*   登录组件
* */

import React, {Component} from 'react'

import {Form, Input, Button, message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import logo from '../../assets/images/logo.png'
import './login.less'

import {reqLogin} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import {useNavigate,Navigate} from 'react-router-dom'
import storageUtils from '../../utils/storageUtils'

const Item = Form.Item

export default function Login() {

    const formRef = React.createRef();

    const navigate = useNavigate()

    const login = async (values) => {
        console.log(values)
        const {username, password} = values
        const result = await reqLogin(username, password)
        console.log('login', result)
        if (result.status === 0) {
            message.success('登录成功', 2);
            memoryUtils.user = result.data;
            storageUtils.saveUser(result.data);
            // this.props.history.replace('/')
            navigate('/')
        } else {
            message.error(result.msg)
        }
    }


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const validateMessages = {
        required: '请输入${label}!',
        /* types: {
             email: '${label} is not a valid email!',
             number: '${label} is not a valid number!',
             string: '232232'
         },
         number: {
             range: '${label} must be between ${min} and ${max}',
         }*/
    };

    const passwordChecked = (rule, value, callback) => {
        const length = value && value.length
        const pwdReg = /^[a-zA-Z0-9_]+$/
        if (!value) {
            callback('请输入密码')
        } else if (length < 4) {
            callback('密码必须大于 4 位')
        } else if (length > 12) {
            callback('密码必须小于 12 位')
        } else if (!pwdReg.test(value)) {
            callback('密码必须是英文、数组或下划线组成')
        } else {
            callback() // 必须调用 callback }
        }
    }
    if(memoryUtils.user&&memoryUtils.user._id){
        return <Navigate to='/'/>
    }

    return (
        <div className='login'>
            <header className='login-header'>
                <img src={logo} alt="logo"/>
                <h1>React 项目: 后台管理系统</h1>
            </header>
            <section className='login-content'><h3>用户登陆</h3>
                <Form ref={formRef}
                      onFinish={login}
                      onFinishFailed={onFinishFailed}
                      className="login-form"
                      autoComplete="off"
                      validateMessages={validateMessages}
                      colon>
                    <Item name='username'
                          rules={[
                              {required: true, whitespace: true, message: '必须输入用户名'},
                              {
                                  min: 4,
                                  message: '用户名必须大于 4 位'
                              },
                              {max: 12, message: '用户名必须小于 12 位'},
                              {
                                  pattern: /^[a-zA-Z0-9_]+$/,
                                  message: '用户名必须是英文、数组或下划线 组成'
                              }
                          ]}>
                        <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                    </Item>
                    <Item name='password'
                          rules={[
                              {
                                  required: false
                              }, {
                                  validator: passwordChecked
                              }
                          ]}>
                        <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="password"
                               placeholder="密码"/>
                    </Item>
                    <Item>
                        <Button type="primary"
                                htmlType="submit"
                                className="login-form-button"> 登录
                        </Button>
                    </Item>
                </Form>
            </section>
        </div>
    )


}



