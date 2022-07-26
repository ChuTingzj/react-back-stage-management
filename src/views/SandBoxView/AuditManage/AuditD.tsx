import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/index'
import { getAuditNewsList, submitResult } from '@/store/features/AuditSlice'
import { Button, message, Table } from 'antd'
import type { AuditNewsItem } from '@/types/Audit'
import { NavLink } from 'react-router-dom'
export default function AuditD() {
  const dispatch: AppDispatch = useDispatch()
  const { AuditNewsList } = useSelector((store: RootState) => store.audit)
  const { username, region, roleId } = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  const positionMap = new Map([
    [1, 'SuperAdmin'],
    [2, 'Admin'],
    [3, 'Editor']
  ])
  useEffect(() => {
    dispatch(getAuditNewsList())
  }, [])
  const list = useMemo(() => {
    if (positionMap.get(roleId) === 'SuperAdmin') return AuditNewsList
    return AuditNewsList.filter(item => item.author === username).concat(AuditNewsList.filter(item => item.region === region && positionMap.get(item.roleId) === 'Editor'))
  }, [AuditNewsList])
  const clickHandler = (item: AuditNewsItem, auditState: number, publishState: number) => {
    dispatch(submitResult({ id: item.id, auditState, publishState }))
    dispatch(getAuditNewsList())
    message.success('操作成功！')
  }
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title: string, item: AuditNewsItem) => <NavLink to={'news-manage/preview' + item.id}>{title}</NavLink>
    },
    {
      title: '作者',
      dataIndex: 'author'
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (item: AuditNewsItem['category']) => <div>{item.title}</div>
    },
    {
      title: '操作',
      render: (item: AuditNewsItem) => (
        <div>
          <Button onClick={() => clickHandler(item, 2, 1)} type='primary' style={{ marginRight: '1vw' }}>通过</Button>
          <Button onClick={() => clickHandler(item, 3, 0)} danger>驳回</Button>
        </div>
      )
    }
  ]
  return (
    <div>
      <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={list}></Table>
    </div>
  )
}
