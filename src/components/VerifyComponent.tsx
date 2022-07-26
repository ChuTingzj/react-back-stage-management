import React from 'react'
import { Navigate } from 'react-router-dom'
import type { IVerify } from '@/types/Permission'
export const VerifyComponent: React.FC<IVerify> = (props) => {
  const token = localStorage.getItem('token-news')
  return token ? props.children : <Navigate to='/login'></Navigate>
}
