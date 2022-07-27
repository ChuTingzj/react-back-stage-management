import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Button, Card, Col, Drawer, List, Row } from 'antd'
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store/index'
import { getMainNewsList, getMainStarList, getAllNewsList } from '@/store/features/HomeSlice'
import { NavLink } from 'react-router-dom'
import { Column, Pie } from '@ant-design/plots';
export default function HomeView() {
  const { username, region, role: { roleName } } = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  const dispatch: AppDispatch = useDispatch()
  const { mainList, starList, newsList } = useSelector((store: RootState) => store.home)
  useEffect(() => {
    dispatch(getMainNewsList())
  }, [])
  useEffect(() => {
    dispatch(getMainStarList())
  }, [])
  useEffect(() => {
    dispatch(getAllNewsList())
  }, [])
  const category = useMemo(() => {
    return newsList.map(item => item.category)
  }, [newsList])
  const selfNews = useMemo(() => {
    return newsList.filter(item => item.author === username)
  }, [newsList])
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  const config = {
    data: category,
    height: 400,
    xField: 'value',
    yField: 'id',
    point: {
      size: 5,
      shape: 'diamond',
    },
  }
  const configPie = {
    appendPadding: 10,
    data: selfNews,
    angleField: 'view',
    colorField: 'title',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <div className="site-card-wrapper">
      <Button type="primary" onClick={showDrawer}>
        查看访问量图表
      </Button>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered>
            <List
              size="large"
              dataSource={mainList}
              renderItem={item => <List.Item><NavLink to={'/news-manage/preview/' + item.id}>{item.title}</NavLink></List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={false}>
            <List
              size="large"
              dataSource={starList}
              renderItem={item => <List.Item><NavLink to={'/news-manage/preview/' + item.id}>{item.title}</NavLink></List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={username}
              description={
                <div>
                  <b style={{ paddingRight: '1vw' }}>{region ? region : '全球'}</b>{roleName}
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <Column {...config} />
      <Drawer title="文章访问量" placement="right" onClose={onClose} visible={visible}>
        <Pie {...configPie as any} />
      </Drawer>
    </div>
  )
}
