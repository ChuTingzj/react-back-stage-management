import React from 'react'
import PubTable from '@/components/PubTable'
import usePublish from '@/hooks/usePublish'
export default function AuditSunSet() {
  const { pendingPublishList } = usePublish(3)
  return (
    <PubTable words='删除' dataSource={pendingPublishList}></PubTable>
  )
}
