import { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
//TODO:添加请求
export const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  const controller = new AbortController()
  config.signal = config.signal || controller.signal
  if (!pending.has(url)) {
    // 如果 pending 中不存在当前请求，则添加进去
    pending.set(url, controller)
  }
}
//TODO:移除请求
export const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const controller = pending.get(url)
    controller.abort()
    pending.delete(url)
  }
}
//TODO:跳转时清除上一个页面的请求
export const clearPending = () => {
  for (const [controller] of pending) {
    controller.abort()
  }
  pending.clear()
}
