import PubTable from '@/components/PubTable'
import usePublish from '@/hooks/usePublish'
export default function AuditUnPub() {
  const { unPublishList } = usePublish(1)
  return (
    <div>
      <PubTable words='发布' dataSource={unPublishList}></PubTable>
    </div>
  )
}
