import request from '@/utils/request'
export const getRights = () => request.get('/rights')
export const getChild = () => request.get('/children')
