import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUnPublishList } from '@/store/features/PublishSlice'
import type { AppDispatch, RootState } from '@/store/index'
export default function usePublish(type: number) {
  const dispatch: AppDispatch = useDispatch()
  const { unPublishList, hasPublishedList, pendingPublishList } = useSelector(
    (store: RootState) => store.publish
  )
  const { username } = JSON.parse(localStorage.getItem('token-news') ?? '{}')
  useEffect(() => {
    dispatch(getUnPublishList({ username, type }))
  }, [])
  return {
    unPublishList,
    hasPublishedList,
    pendingPublishList
  }
}
