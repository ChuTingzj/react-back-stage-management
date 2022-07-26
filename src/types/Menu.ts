import React from 'react'
interface MenuItem {
  key: string
  title?: string
  icon?: React.ReactNode
  children?: MenuItem[] | any
  grade?: number
  pagepermisson: number
  id: number
}
export type { MenuItem }
