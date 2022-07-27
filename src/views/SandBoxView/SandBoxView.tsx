import React from 'react'
import SideMenu from '@/components/SideMenu'
import TopHeader from '@/components/TopHeader'
import './SandBox.css'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
const { Content } = Layout;
import 'nprogress/nprogress.css'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/index'
export default function SandBoxView() {
  const { spinning } = useSelector((store: RootState) => store.home)
  return (
    <Layout style={{ height: '100vh' }}>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto'
          }}
        >
          <Spin size="large" spinning={spinning} >
            <Outlet></Outlet>
          </Spin>
        </Content>
      </Layout>
    </Layout>
  )
}
