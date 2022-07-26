import { useEffect } from 'react'
import { Button, Table, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/index'
import { getAuditList, postRecall, postPublish } from '@/store/features/AuditSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import type { AuditListItem } from '@/types/Audit'
export default function AuditView() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { AuditList } = useSelector((store: RootState) => store.audit)
  const { username } = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  useEffect(() => {
    dispatch(getAuditList(username))
  }, [])
  function switchState(state: number) {
    switch (state) {
      case 1: return '撤回'
      case 2: return '发布'
      case 3: return '更新'
    }
  }
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title: string, item: AuditListItem) => <NavLink to={'/news-manage/preview/' + item.id}>{title}</NavLink>
    },
    {
      title: '作者',
      dataIndex: 'author'
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (item: AuditListItem['category']) => <div>{item.value}</div>
    },
    {
      title: '审核状态',
      dataIndex: 'auditState'
    },
    {
      title: '操作',
      render: (item: AuditListItem) => (<div>
        <Button onClick={() => {
          if (item.auditState === 1) {
            dispatch(postRecall(item.id))
          }
          if (item.auditState === 3) {
            navigate('/news-manage/update/' + item.id)
          }
          if (item.auditState === 2) {
            dispatch(postPublish(item.id))
            navigate('/publish-manage/published')
          }
        }} shape='round' type='primary'>{switchState(item.auditState)}</Button>
      </div>)
    }
  ]
  return (
    <div>
      <Table dataSource={AuditList} columns={columns} rowKey={item => item.id} pagination={{ pageSize: 5 }}></Table>
    </div>
  )
}
