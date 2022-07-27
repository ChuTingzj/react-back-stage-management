import { AppDispatch, RootState } from '@/store'
import { getInfoList } from '@/store/features/NewsSlice'
import { HeartTwoTone } from '@ant-design/icons'
import { PageHeader, Descriptions } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { follow, like } from '@/api/visitor'
export default function Detail() {
  const params = useParams()
  const dispatch: AppDispatch = useDispatch()
  const { previewList } = useSelector((store: RootState) => store.news)
  useEffect(() => {
    dispatch(getInfoList(Number(params.id)))
  }, [params.id])
  const publish = new Map([
    [0, '未发布'],
    [1, '待发布'],
    [2, '已上线'],
    [3, '未通过']
  ])
  const audit = new Map([
    [0, '未审核'],
    [1, '审核中'],
    [2, '以通过'],
    [3, '未通过']
  ])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={previewList.title}
        subTitle={previewList?.category?.title}
        style={{ flex: '1' }}
      >
        <div style={{ position: 'absolute', top: '3.5vh', left: '16vw' }}>
          <HeartTwoTone twoToneColor="#eb2f96" onClick={async () => {
            const { data: res } = await follow(Number(params.id))
            like(Number(params.id), res.view + 1)
          }} />
        </div>
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建者">{previewList.author}</Descriptions.Item>
          <Descriptions.Item label="创建时间">
            {dayjs(previewList.createTime).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="发布时间">{dayjs(previewList.publishTime ?? +new Date()).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="区域">{previewList.region}</Descriptions.Item>
          <Descriptions.Item label="审核状态">
            {audit.get(previewList.auditState ?? 0)}
          </Descriptions.Item>
          <Descriptions.Item label="发布状态">{publish.get(previewList.publishState ?? 0)}</Descriptions.Item>
          <Descriptions.Item label="访问数量">{previewList.view}</Descriptions.Item>
          <Descriptions.Item label="点赞数量">{previewList.star}</Descriptions.Item>
          <Descriptions.Item label="评论数量">{0}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <div dangerouslySetInnerHTML={{
        __html: previewList.content ?? ''
      }} style={{ border: '1px solid black', flex: '1' }}>

      </div>
    </div>
  )
}
