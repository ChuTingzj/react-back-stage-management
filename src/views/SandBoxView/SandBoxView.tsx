import React from 'react'
import SideMenu from '@/components/SideMenu'
import TopHeader from '@/components/TopHeader'
import './SandBox.css'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
const { Content } = Layout;
import 'nprogress/nprogress.css'
export default function SandBoxView() {
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
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  )
}
