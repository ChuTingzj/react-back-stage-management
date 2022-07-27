import { configureStore } from '@reduxjs/toolkit'
import HomeSlice from './features/HomeSlice'
import RightSlice from './features/RightSlice'
import UserSlice from './features/UserSlice'
import LoginSLice from './features/LoginSLice'
import RouterSlice from './features/RouterSlice'
import NewsSlice from './features/NewsSlice'
import AuditSlice from './features/AuditSlice'
import PublishSlice from './features/PublishSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['navigation']
// }
const reducer = combineReducers({
  home: HomeSlice,
  right: RightSlice,
  user: UserSlice,
  login: LoginSLice,
  router: RouterSlice,
  news: NewsSlice,
  audit: AuditSlice,
  publish: PublishSlice
})
// const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
  reducer
})
// export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
