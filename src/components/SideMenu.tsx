import React, { useEffect, useMemo } from 'react'
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import { LogoDiv } from '@/styles/LogoDiv';
import { getMenuList } from '@/utils/getMenuList'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/index'
import { initMenuList } from '@/store/features/HomeSlice'
import { Parent, Child } from '@/styles/ScrollMenu'
import { useLocation } from 'react-router-dom'
export default function SideMenu() {
  const dispatch: AppDispatch = useDispatch()
  const location = useLocation()
  const defaultOpenMenu = useMemo(() => {
    return '/' + location.pathname.split('/')[1]
  }, [location.pathname])
  const { menuList } = useSelector((state: RootState) => state.home)
  useEffect(() => {
    dispatch(initMenuList())
  }, [])
  const executor = getMenuList(menuList)
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <Parent>
        <LogoDiv>React后台管理系统</LogoDiv>
        <Child>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={[defaultOpenMenu]}
            selectedKeys={[location.pathname === '/' ? '/home' : location.pathname]}
          >
            {executor()}
          </Menu>
        </Child>
      </Parent>
    </Sider>
  )
}
