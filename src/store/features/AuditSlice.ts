import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { pullAuditList, recall, publish, pullAuditNews, passOrReject } from '@/api/audit'
import type { AuditListItem, AuditNewsItem } from '@/types/Audit'
interface State {
  AuditList: AuditListItem[]
  AuditNewsList: AuditNewsItem[]
}
const initialState: State = {
  AuditList: [],
  AuditNewsList: []
}
export const getAuditList = createAsyncThunk('audit/getAuditList', async (username: string) => {
  const { data: res } = await pullAuditList(username)
  return res
})
export const postRecall = createAsyncThunk('audit/postRecall', async (id: number) => {
  await recall(id)
})
export const postPublish = createAsyncThunk('audit/postPublish', async (id: number) => {
  await publish(id)
})
export const getAuditNewsList = createAsyncThunk('audit/getAuditNewsList', async () => {
  const { data: res } = await pullAuditNews()
  return res
})
export const submitResult = createAsyncThunk(
  'audit/submitResult',
  async ({
    id,
    auditState,
    publishState
  }: {
    id: number
    auditState: number
    publishState: number
  }) => {
    await passOrReject(id, auditState, publishState)
  }
)
const AuditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAuditList.fulfilled, (state, { payload }) => {
      state.AuditList = payload
    })
    builder.addCase(getAuditNewsList.fulfilled, (state, { payload }) => {
      state.AuditNewsList = payload
    })
  }
})
export default AuditSlice.reducer
