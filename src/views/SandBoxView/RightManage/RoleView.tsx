import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, Tree } from 'antd'
const { confirm } = Modal
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/index'
import type { RolesList } from '@/types/Right'
import { initRolesList, deleteRole, initRightList, initCurrentRight, changeCheck, initRolesId } from '@/store/features/RightSlice'
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons'
export default function RoleView() {
  const dispatch: AppDispatch = useDispatch()
  const { rolesList, rightList, currentRight, rolesId } = useSelector((state: RootState) => state.right)
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    dispatch(initRolesList())
  }, [])
  useEffect(() => {
    dispatch(initRightList())
  }, [])
  const pop = (id: number) => {
    confirm({
      title: 'Are you sure to delete this task?',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      content: 'Descriptions',
      onOk() {
        dispatch(deleteRole(id))
      },
    })
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id: string) => <b>{id}</b>
    },
    {
      title: '角色名称',
      dataIndex: 'roleName'
    },
    {
      title: '操作',
      key: 'action',
      render: (item: RolesList) => (
        <div>
          <Button onClick={() => {
            setIsModalVisible(true)
            dispatch(initCurrentRight({ currentList: item.rights }))
            dispatch(initRolesId({ id: item.id }))
          }} style={{ marginRight: '1vw' }} shape='circle' icon={<EditFilled />}></Button>
          <Button onClick={() => pop(item.id)} danger shape='circle' icon={<DeleteFilled />}></Button>
        </div>
      )
    }
  ]
  const handleOk = () => {
    setIsModalVisible(false)
    dispatch(changeCheck({ id: rolesId, rights: currentRight }))
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Table dataSource={rolesList} columns={columns} rowKey={(item) => item.id}></Table>
      <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          treeData={rightList}
          checkedKeys={currentRight}
          onCheck={(rights) => {
            dispatch(initCurrentRight({ currentList: rights as string[] }))
          }}
          checkStrictly
        />
      </Modal>
    </div>
  )
}
