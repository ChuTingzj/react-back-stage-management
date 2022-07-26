import request from '@/utils/request'
export const logIn = (username: string, password: string) =>
  request(`/users?username=${username}&password=${password}&roleState=true&_expand=role`)
