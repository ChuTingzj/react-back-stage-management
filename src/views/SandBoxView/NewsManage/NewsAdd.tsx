import React, { useState, useEffect } from 'react'
import { Button, PageHeader, Steps, Form, Input, Select, message, Result } from 'antd'
const { Option } = Select
const { Step } = Steps
import type { AppDispatch, RootState } from '@/store/index'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryList, submitNews } from '@/store/features/NewsSlice'
import RichText from '@/components/RichText'
import { useNavigate } from 'react-router-dom'
export default function NewsAdd() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { categoryList } = useSelector((store: RootState) => store.news)
  const [page, setPage] = useState(0)
  const [data, setData] = useState<{ title?: string, categoryId?: number, content?: string }>({})
  const [form] = Form.useForm()
  useEffect(() => {
    dispatch(getCategoryList())
  }, [])
  const { region, username, roleId } = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  const saveHandler = (auditState: number) => {
    dispatch(submitNews({ title: data.title, categoryId: data.categoryId, content: data.content, region: region === '' ? '全球' : region, author: username, roleId, auditState, publishState: 0, createTime: Date.now(), star: 0, view: 0 }))
    const target = auditState === 0 ? '/news-manage/draft' : '/audit-manage/list'
    navigate(target)
    message.success('提交成功!')
  }
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="撰写新闻"
      />
      <Steps current={page}>
        <Step title="基本信息" description="新闻标题、新闻分类" />
        <Step title="新闻内容" description="新闻主题内容" />
        <Step title="新闻提交" description="保存草稿、提交审核" />
      </Steps>
      <div style={page === 0 ? { marginTop: '20vh' } : { display: 'none' }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="新闻标题"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="新闻分类"
            name="categoryId"
            rules={[{ required: true, message: 'Please input your category!' }]}
          >
            <Select>
              {
                categoryList.map(item => <Option key={item.id} value={item.id}>{item.title}</Option>)
              }
            </Select>
          </Form.Item>
        </Form>
      </div>
      <div style={page === 1 ? {} : { display: 'none' }}>
        <RichText getQuillText={(value) => {
          setData({ ...data, content: value as string })
        }}></RichText>
      </div>
      <div style={page === 2 ? {} : { display: 'none' }}>
        <Result
          title="正准备提交！"
        />
      </div>
      <div style={{ position: 'absolute', right: '0', bottom: '0' }}>
        {
          page === 2 && <span>
            <Button type='default' onClick={() => saveHandler(0)}>保存草稿箱</Button>
            <Button type='primary' onClick={() => saveHandler(1)}>提交审核</Button>
          </span>
        }
        {
          page < 2 && <Button type='primary' onClick={() => {
            form.validateFields().then((res) => {
              const keys = Object.keys(data)
              if (!keys.length) {
                setData({ ...data, ...res })
              }
              setPage(page + 1)
            }, () => { message.error('Please input your category,title,motherfucker!') })
          }}>下一步</Button>
        }
        {
          page > 0 && <Button type='default' onClick={() => {

            setPage(page - 1)
          }}>上一步</Button>
        }
      </div>
    </div>
  )
}
