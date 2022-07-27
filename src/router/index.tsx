import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRouterList } from '@/store/features/RouterSlice'
import { routerMap } from './routerMap'
import type { AppDispatch, RootState } from '@/store/index'
import type { RightsItem } from '@/types/Router'
import { Routes, Route } from 'react-router-dom'
import LazyLoad from '@/utils/LazyLoad'
import { VerifyComponent } from '@/components/VerifyComponent'
import SandBoxView from '@/views/SandBoxView/SandBoxView'
export default function index() {
  const dispatch: AppDispatch = useDispatch()
  const { routerList } = useSelector((store: RootState) => store.router)
  useEffect(() => {
    dispatch(getRouterList())
  }, [])
  const { role } = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  function checkRole() {
    if (Array.isArray(role.rights)) return role.rights
    return role.rights.checked
  }
  function checkRoute(item: RightsItem) {
    return routerMap.get(item.key) && (item.pagepermisson || item.routepermisson)
  }
  function checkUserPermission(item: RightsItem) {
    return checkRole().includes(item.key)
  }
  return (
    <Routes>
      <Route path='/' element={LazyLoad(<VerifyComponent>
        <SandBoxView></SandBoxView>
      </VerifyComponent>)}>
        <Route index element={LazyLoad('../views/SandBoxView/Home/HomeView.tsx')}></Route>
        <Route path='/home' element={LazyLoad('../views/SandBoxView/Home/HomeView.tsx')}></Route>
        {
          routerList.length > 0 ? routerList.map(item => {
            if (checkRoute(item) && checkUserPermission(item)) {
              return <Route path={item.key} key={item.key} element={LazyLoad(routerMap.get(item.key) ?? '')}></Route>
            }
            return null
          }) : ''
        }
        {
          routerList.length > 0 ? <Route path='*' element={LazyLoad('../views/SandBoxView/403/NoPermission')}></Route> : ''
        }

      </Route>
      <Route path='/login' element={LazyLoad('../views/LoginView/LoginView')}></Route>
      <Route path='/news' element={LazyLoad('../views/Visitor/VisitorView.tsx')}></Route>
      <Route path='/detail/:id' element={LazyLoad('../views/Visitor/Detail.tsx')}></Route>
    </Routes>
  )
}
