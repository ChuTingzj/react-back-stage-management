import React, { useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons'
import './LoginView.css'
import type { AppDispatch, RootState } from '@/store/index'
import { login } from '@/store/features/LoginSLice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function LoginView() {
  const dispatch: AppDispatch = useDispatch()
  const { userInfo } = useSelector((store: RootState) => store.login)
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    dispatch(login({ username: values.username, password: values.password }))
  };
  useEffect(() => {
    if (userInfo.length) {
      navigate('/home')
    }
  }, [userInfo])
  return (
    <div style={{ background: 'rgba(35,39,65)', height: '100vh' }}>
      <div className='container'>

        <div className='title'>React后台管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </div>

          </Form.Item>
        </Form>
      </div>

    </div>


  )
}