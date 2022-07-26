import React, { forwardRef, useState, ForwardedRef, useEffect } from 'react'
import { Form, Input, Select, FormInstance } from 'antd'
const { Option } = Select
import type { regionItem } from '@/types/Users'
import type { RolesList } from '@/types/Right'
interface PropData {
  regionList: regionItem[],
  rolesList: RolesList[],
  isDisable?: boolean,
  isUpdate?: boolean
}
export const PopForm = forwardRef((props: PropData, ref: ForwardedRef<FormInstance<any>>) => {
  const [disable, setDisable] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => {
    if (props.isDisable) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }, [props.isDisable])
  const { roleId, region } = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  const positionMap = new Map([[1, 'SuperAdmin'], [2, 'Admin'], [3, 'Editor']])
  function checkDisable1(item: regionItem) {
    if (props.isUpdate) {
      if (positionMap.get(roleId) === 'SuperAdmin') return false
      return true
    } else {
      if (positionMap.get(roleId) === 'SuperAdmin') return false
      return item.value !== region
    }
  }
  function checkDisable2(item: RolesList) {
    if (props.isUpdate) {
      if (positionMap.get(roleId) === 'SuperAdmin') return false
      return true
    } else {
      if (positionMap.get(roleId) === 'SuperAdmin') return false
      return positionMap.get(item.id) !== 'Editor'
    }
  }
  return (
    <Form
      layout="vertical"
      ref={ref}
      form={form}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: 'Please input the title of collection!' }]}>
        <Input type="password" />
      </Form.Item>
      <Form.Item name="region" label="区域" rules={disable ? [] : [{ required: true, message: 'Please input the title of collection!' }]}>
        <Select disabled={disable}>
          {
            props.regionList.map(item => <Option disabled={checkDisable1(item)} key={item.id} value={item.value}>{item.title}</Option>)
          }
        </Select>
      </Form.Item>
      <Form.Item name="roleId" label="角色" rules={[{ required: true, message: 'Please input the title of collection!' }]}>
        <Select onChange={(value) => {
          if (value === 1) {
            setDisable(true)
            form.setFieldsValue({
              region: ''
            })
          } else {
            setDisable(false)
          }
        }}>
          {
            props.rolesList.map(item => <Option disabled={checkDisable2(item)} key={item.id} value={item.id}>{item.roleName}</Option>)
          }
        </Select>
      </Form.Item>
    </Form>
  )
})
