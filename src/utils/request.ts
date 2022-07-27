import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { addPending, removePending } from './cancelRequest'
import nprogress from 'nprogress'
import { store } from '@/store/index'
import { changeSpinning } from '@/store/features/HomeSlice'
const instance = axios.create({
  timeout: 5000,
  baseURL: '/js'
})
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    // 展示 loading 效果
    nprogress.start()
    // store.dispatch(changeSpinning({ status: !store.getState().home.spinning }))
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    nprogress.done()
    removePending(response.config) // 在请求结束后，移除本次请求
    // 隐藏 loading 效果
    // store.dispatch(changeSpinning({ status: !store.getState().home.spinning }))
    return response
  },
  async (err) => {
    removePending(err.config ?? {})
    if (axios.isCancel(err)) {
      console.log('repeated request: ' + err.message)
    }
    return Promise.reject(err)
  }
)
export default instance
