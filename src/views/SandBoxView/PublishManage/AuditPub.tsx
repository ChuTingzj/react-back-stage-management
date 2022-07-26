import React from 'react'
import PubTable from '@/components/PubTable'
import usePublish from '@/hooks/usePublish'
export default function AuditPub() {
  const { hasPublishedList } = usePublish(2)
  return (
    <PubTable words='下线' dataSource={hasPublishedList}></PubTable>
  )
}
