import React, { useEffect } from 'react'
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd'
const { confirm } = Modal
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/index'
import { initMenuList, deleteMenu, deleteSecMenu, changePer, changeSecPer } from '@/store/features/HomeSlice'
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import type { MenuItem } from '@/types/Menu'
export default function RightView() {
  const dispatch: AppDispatch = useDispatch()
  const { menuList } = useSelector((state: RootState) => state.home)
  useEffect(() => {
    dispatch(initMenuList())
  }, [])
  const pop = (item: MenuItem) => {
    confirm({
      title: 'Are you sure to delete this task?',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      content: 'Descriptions',
      onOk() {
        if (item.grade === 1) return dispatch(deleteMenu(item.id))
        return dispatch(deleteSecMenu(item.id))
      }
    })
  }
  const switchChange = (item: MenuItem) => {
    if (item.grade === 1) return dispatch(changePer({ id: item.id, permission: item.pagepermisson === 1 ? 0 : 1 }))
    return dispatch(changeSecPer({ id: item.id, permission: item.pagepermisson === 1 ? 0 : 1 }))
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id: string) => <b>{id}</b>
    },
    {
      title: '权限名称',
      dataIndex: 'title'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key: string) => <Tag color='Orange'>{key}</Tag>
    },
    {
      key: 'action',
      title: '操作',
      render: (item: MenuItem) => (
        <div>
          <Popover content={<div style={{ textAlign: 'center' }}>
            <Switch onChange={() => switchChange(item)} checked={item.pagepermisson === 0 ? false : true}></Switch>
          </div>} title="页面配置项" trigger={item.pagepermisson ? 'click' : ''}>
            <Button disabled={!item.pagepermisson} style={{ marginRight: '1vw' }} shape='circle' icon={<EditFilled />} ></Button>
          </Popover>
          <Button danger shape='circle' icon={<DeleteFilled />} onClick={() => pop(item)}></Button>
        </div>
      )
    }
  ];
  return (
    <Table dataSource={menuList} columns={columns} pagination={{ pageSize: 5 }} />
  )
}
