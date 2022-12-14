import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Switch, Table, Button, Modal, FormInstance } from 'antd'
const { confirm } = Modal
import { useSelector, useDispatch } from 'react-redux'
import { initUserList, initRegionList, submitForm, deleteUser, changeState, updateUserList, setUserList } from '@/store/features/UserSlice'
import { initRolesList } from '@/store/features/RightSlice'
import type { AppDispatch, RootState } from '@/store/index'
import type { RolesList } from '@/types/Right'
import type { userItem, UserAndRole } from '@/types/Users'
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons'
import { PopForm } from '@/components/PopForm'
export default function UserView() {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const positionMap = new Map([[1, 'SuperAdmin'], [2, 'Admin'], [3, 'Editor']])
  const info = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  const { roleId, region, username } = info
  const [Id, setId] = useState(0)
  const dispatch: AppDispatch = useDispatch()
  const formRef = useRef<FormInstance>(null)
  const editRef = useRef<FormInstance>(null)
  const { userList, regionList, weakList } = useSelector((state: RootState) => state.user)
  const { rolesList } = useSelector((state: RootState) => state.right)
  useEffect(() => {
    dispatch(initUserList())
  }, [])
  useEffect(() => {
    dispatch(initRegionList())
  }, [])
  useEffect(() => {
    dispatch(initRolesList())
  }, [])
  useEffect(() => {
    if (positionMap.get(roleId) !== 'SuperAdmin') {
      const list = userList.filter(item => item.username == username).concat(userList.filter(item => item.region === region && positionMap.get(item.roleId) === 'Editor'))
      dispatch(setUserList({ list }))
    }
  }, [roleId, region, username, userList])
  const pop = (id: number) => {
    confirm({
      title: 'Are you sure to delete this task?',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      content: 'Descriptions',
      onOk() {
        dispatch(deleteUser(id))
      },
    })
  }
  const onChange = (id: number, status: boolean) => {
    dispatch(changeState({ id, status }))
  }
  const onEdit = (item: UserAndRole) => {
    setTimeout(() => {
      editRef?.current?.setFieldsValue(item)
      if (item.roleId === 1) {
        setIsDisable(true)
      } else {
        setIsDisable(false)
      }
      setId(item.id)
    })
    setEditVisible(true)
  }
  const columns = [
    {
      title: '??????',
      dataIndex: 'region',
      render: (region: string) => <b>{region === '' ? '??????' : region}</b>,
      filters: [
        {
          text: '??????',
          value: '??????'
        }
      ].concat(regionList.map(item => ({
        text: item.title,
        value: item.value
      }))),
      onFilter: (value: string, item: UserAndRole) => {
        if (value === '??????') return item.region === ''
        return item.region == value
      }
    },
    {
      title: '????????????',
      dataIndex: 'role',
      render: (role: RolesList) => role.roleName
    },
    {
      title: '?????????',
      dataIndex: 'username'
    },
    {
      title: '????????????',
      dataIndex: 'roleState',
      render: (state: boolean, item: userItem) => <Switch onChange={() => onChange(item.id, !item.roleState)} disabled={item.default} checked={state}></Switch>
    },
    {
      title: '??????',
      key: 'action',
      render: (item: UserAndRole) => (
        <div>
          <Button onClick={() => onEdit(item)} style={{ marginRight: '1vw' }} shape='circle' icon={<EditFilled />}></Button>
          <Button onClick={() => pop(item.id)} danger shape='circle' icon={<DeleteFilled />}></Button>
        </div>
      )
    }
  ]
  return (
    <div>
      <Button onClick={() => {
        setVisible(true)
      }} type='primary'>????????????</Button>
      <Table columns={columns as any} dataSource={weakList?.length ? weakList : userList} pagination={{ pageSize: 5 }}></Table>
      <Modal
        visible={visible}
        title="????????????"
        okText="??????"
        cancelText="??????"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          formRef.current?.validateFields().then(res => {
            setVisible(false);
            dispatch(submitForm(res))
            formRef.current?.resetFields()
          }).catch()
        }}
      >
        <PopForm regionList={regionList} rolesList={rolesList} ref={formRef}></PopForm>
      </Modal>
      <Modal visible={editVisible} title='????????????' okText='??????' cancelText='??????'
        onCancel={() => {
          setEditVisible(false)
        }}
        onOk={() => {
          editRef.current?.validateFields().then(res => {
            setEditVisible(false)
            dispatch(updateUserList({ id: Id, value: res }))
          })
        }}
      >
        <PopForm isUpdate={true} isDisable={isDisable} regionList={regionList} rolesList={rolesList} ref={editRef}></PopForm>
      </Modal>
    </div>
  )
}
