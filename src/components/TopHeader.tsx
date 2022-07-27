import React from 'react'
import { Layout, Dropdown, Menu, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom'
const { Header } = Layout;
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo } from '@/store/features/LoginSLice'
import type { AppDispatch, RootState } from '@/store/index'
import { changeCollapsed } from '@/store/features/HomeSlice'
export default function TopHeader() {
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const { collapsed } = useSelector((store: RootState) => store.home)
  const info = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          danger: true,
          label: '退出登录',
        },
      ]}
      onClick={({ key }) => {
        if (key === '2') {
          localStorage.removeItem('token-news')
          dispatch(clearUserInfo())
          navigate('/login')
        }
      }}
    />
  );
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => dispatch(changeCollapsed({ status: !collapsed })),
      })}
      <div>
        <span style={{ marginRight: '5vh' }}>欢迎<b style={{ padding: '1vh' }}>{info.username.length ? info.username : ''}</b>回来</span>
        <Dropdown overlay={menu}>
          <Avatar size='large' icon={<UserOutlined />} />
        </Dropdown>
      </div>

    </Header>
  )
}
