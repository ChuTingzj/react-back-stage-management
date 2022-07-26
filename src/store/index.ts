import { configureStore } from '@reduxjs/toolkit'
import HomeSlice from './features/HomeSlice'
import RightSlice from './features/RightSlice'
import UserSlice from './features/UserSlice'
import LoginSLice from './features/LoginSLice'
import RouterSlice from './features/RouterSlice'
import NewsSlice from './features/NewsSlice'
import AuditSlice from './features/AuditSlice'
import PublishSlice from './features/PublishSlice'
export const store = configureStore({
  reducer: {
    home: HomeSlice,
    right: RightSlice,
    user: UserSlice,
    login: LoginSLice,
    router: RouterSlice,
    news: NewsSlice,
    audit: AuditSlice,
    publish: PublishSlice
  }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
