import React from 'react'
import { Button } from 'antd'
import request from '@/utils/request'
export default function HomeView() {
  return (
    <Button color='primary' onClick={() => {
      request.get('/children')
    }}>按钮</Button>
  )
}
