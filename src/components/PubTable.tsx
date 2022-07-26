import React from 'react'
import { Button, Table } from 'antd'
import { NavLink } from 'react-router-dom'
import type { AuditNewsItem } from '@/types/Audit'
import { useDispatch } from 'react-redux'
import { pub, down, destroy } from '@/store/features/PublishSlice'
import type { AppDispatch } from '@/store/index'
interface Prop {
  dataSource: Array<AuditNewsItem>
  words: string
}
export default function PubTable(props: Prop) {
  const dispatch: AppDispatch = useDispatch()
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title: AuditNewsItem['title'], item: AuditNewsItem) => <NavLink to={'/news-manage/preview/' + item.id}>{title}</NavLink>
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
      render: (item: AuditNewsItem) => <div><Button type='primary' onClick={() => {
        switch (props.words) {
          case '下线':
            dispatch(down(item.id))
            break;
          case '删除':
            dispatch(destroy(item.id))
            break;
          default:
            dispatch(pub(item.id))

        }
      }}>{props.words}</Button></div>
    }
  ]
  return (
    <div>
      <Table columns={columns} rowKey={item => item.id} dataSource={props.dataSource}></Table>
    </div>
  )
}
