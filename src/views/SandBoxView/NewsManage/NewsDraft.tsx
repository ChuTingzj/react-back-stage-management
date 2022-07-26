import React, { useEffect } from 'react'
import { Button, Table, Modal, message } from 'antd'
const { confirm } = Modal
import type { DraftItem } from '@/types/News'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/index'
import { getDraft, deleteNew, submitCheck } from '@/store/features/NewsSlice'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, ArrowUpOutlined } from '@ant-design/icons'
import { useNavigate, NavLink } from 'react-router-dom'
export default function NewsDraft() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { draftList } = useSelector((store: RootState) => store.news)
  const { username } = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  useEffect(() => {
    dispatch(getDraft(username))
  }, [])
  const clickHandler = (item: DraftItem) => {
    confirm({
      title: '你确定要删除吗？',
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        deleteHandler(item)
      }
    })
  }
  const deleteHandler = (item: DraftItem) => {
    dispatch(deleteNew(item.id))
  }
  const checkHandler = (id: number) => {
    dispatch(submitCheck(id))
    message.success('提交审核成功！')
    navigate('/audit-manage/list')
  }
  const columns = [
    {
      title: "ID",
      dataIndex: 'id',
      render: (id: number) => <b>{id}</b>
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title: string, item: DraftItem) => <NavLink to={'/news-manage/preview/' + item.id}>{title}</NavLink>
    },
    {
      title: '作者',
      dataIndex: 'author'
    },
    {
      title: '分类',
      dataIndex: 'category',
      render: (category: any) => category.title
    },
    {
      title: '操作',
      render: (item: DraftItem) => (
        <div>
          <Button onClick={() => clickHandler(item)} danger shape='circle' icon={<DeleteOutlined />}></Button>
          <Button onClick={() => {
            navigate('/news-manage/update/' + item.id)
          }} shape='circle' icon={<EditOutlined />}></Button>
          <Button onClick={() => checkHandler(item.id)} type='primary' shape='circle' icon={<ArrowUpOutlined />}></Button>
        </div>
      )
    }
  ]
  return (
    <Table rowKey={item => item.id} columns={columns} dataSource={draftList} pagination={{ pageSize: 5 }}></Table>
  )
}
