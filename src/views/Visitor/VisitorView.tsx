import { Card, Col, List, PageHeader, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/index'
import { getAllNewsList } from '@/store/features/HomeSlice'
import { useNavigate } from 'react-router-dom'
export default function VisitorView() {
  const { newsList } = useSelector((store: RootState) => store.home)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllNewsList())
  }, [])
  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="全球新闻"
        subTitle="看新闻"
      />
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {
            newsList.map(item => <Col key={item.id} span={8}>
              <Card onClick={() => navigate('/detail/' + item.id)} title={item.category.title} bordered={false} hoverable>
                <List
                  pagination={{ pageSize: 3 }}
                  size="small"
                  bordered
                  dataSource={newsList}
                  renderItem={item => <List.Item>{item.title}</List.Item>}
                />
              </Card>
            </Col>)
          }
        </Row>
      </div>
    </div>
  )
}
