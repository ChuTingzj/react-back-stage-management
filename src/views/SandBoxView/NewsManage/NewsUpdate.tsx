import React, { useState, useEffect } from 'react'
import { Button, Form, Input, message, PageHeader, Result, Select, Steps } from 'antd'
import RichText from '@/components/RichText'
const { Step } = Steps
const { Option } = Select
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/index'
import { getCategoryList, getInfoList, updateInfo } from '@/store/features/NewsSlice'
import { useNavigate, useParams } from 'react-router-dom'
export default function NewsUpdate() {
  const [page, setPage] = useState(0)
  const [data, setData] = useState<{ title?: string, categoryId?: number, content?: string }>({})
  const [form] = Form.useForm()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { previewList, categoryList } = useSelector((store: RootState) => store.news)
  useEffect(() => {
    dispatch(getCategoryList())
  }, [])
  useEffect(() => {
    dispatch(getInfoList(Number(params.id)))
  }, [])
  useEffect(() => {
    form.setFieldsValue({
      title: previewList.title,
      categoryId: previewList.categoryId
    })
  }, [previewList.title, previewList.categoryId])
  const saveHandler = (auditState: number) => {
    dispatch(updateInfo({ data: { title: data.title ?? '', content: data.content ?? '', auditState, categoryId: data.categoryId ?? 1 }, id: data.categoryId ?? 1 }))
    const target = auditState === 0 ? '/news-manage/draft' : '/audit-manage/list'
    navigate(target)
    message.success('提交成功!')
  }
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="修改新闻"
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
        }} initialValue={previewList.content}></RichText>
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
