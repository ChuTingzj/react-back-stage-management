import { Menu } from 'antd';
const { SubMenu } = Menu
import type { MenuItem } from '@/types/Menu'
import { useNavigate } from 'react-router-dom'
import {
  HomeOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  SettingOutlined,
  RobotOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  DeleteOutlined,
  MessageOutlined,
  CommentOutlined,
  CameraOutlined,
  BorderOutlined,
  BarsOutlined,
  BugOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  CloudOutlined,
  CloudSyncOutlined
} from '@ant-design/icons'
const iconList = new Map([
  ['/home', <HomeOutlined></HomeOutlined>],
  ['/user-manage', <UserOutlined></UserOutlined>],
  ['/user-manage/add', <UserAddOutlined />],
  ['/user-manage/delete', <UserDeleteOutlined />],
  ['/user-manage/update', <UserSwitchOutlined />],
  ['/user-manage/list', <UsergroupAddOutlined />],
  ['/right-manage', <SettingOutlined></SettingOutlined>],
  ['/right-manage/role/list', <RobotOutlined></RobotOutlined>],
  ['/right-manage/right/list', <UnlockOutlined></UnlockOutlined>],
  ['/right-manage/role/update', <UserSwitchOutlined />],
  ['/right-manage/role/delete', <DeleteOutlined />],
  ['/right-manage/right/update', <UserSwitchOutlined />],
  ['/right-manage/right/delete', <DeleteOutlined />],
  ['/news-manage', <MessageOutlined />],
  ['/news-manage/list', <CommentOutlined />],
  ['/news-manage/add', <UserAddOutlined />],
  ['/news-manage/update/:id', <UserSwitchOutlined />],
  ['/news-manage/preview/:id', <CameraOutlined />],
  ['/news-manage/draft', <BorderOutlined />],
  ['/news-manage/category', <BarsOutlined />],
  ['/audit-manage', <BugOutlined />],
  ['/audit-manage/audit', <BugOutlined />],
  ['/audit-manage/list', <BarsOutlined />],
  ['/publish-manage', <CloudUploadOutlined />],
  ['/publish-manage/unpublished', <CloudSyncOutlined />],
  ['/publish-manage/published', <CloudOutlined />],
  ['/publish-manage/sunset', <CloudDownloadOutlined />]
])
export const getMenuList = (menu: MenuItem[]) => {
  const navigate = useNavigate()
  const info = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  function checkRights() {
    if (Array.isArray(info?.role?.rights)) return info?.role?.rights
    return info?.role?.rights?.checked
  }
  function checkPagePermission(item: MenuItem) {
    return item.pagepermisson === 1 && checkRights()?.includes(item.key)
  }
  return function executor(list = menu) {
    return list.map(item => {
      if (!checkPagePermission(item)) return
      if (item.children?.length) return <SubMenu title={item.title} key={item.key} icon={iconList.get(item.key)}>
        {executor(item.children)}
      </SubMenu>
      return <Menu.Item onClick={() => {
        navigate(`${item.key}`)
      }} key={item.key} icon={iconList.get(item.key)}>{item.title}</Menu.Item>
    })
  }

}