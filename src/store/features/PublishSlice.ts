import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { pullUnPublishList, publish, sunset, deleteNews } from '@/api/publish'
import type { AuditNewsItem } from '@/types/Audit'
interface State {
  unPublishList: AuditNewsItem[]
  hasPublishedList: AuditNewsItem[]
  pendingPublishList: AuditNewsItem[]
}
const initialState: State = {
  unPublishList: [],
  hasPublishedList: [],
  pendingPublishList: []
}
export const getUnPublishList = createAsyncThunk(
  'publish/getUnPublishList',
  async ({ username, type }: { username: string; type: number }) => {
    const { data: res } = await pullUnPublishList(username, type)
    return {
      list: res,
      type: type
    }
  }
)
export const pub = createAsyncThunk('publish/pub', async (id: number) => {
  await publish(id)
})
export const down = createAsyncThunk('publish/down', async (id: number) => {
  await sunset(id)
})
export const destroy = createAsyncThunk('publish/destroy', async (id: number) => {
  await deleteNews(id)
})
const PublishSlice = createSlice({
  name: 'publish',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUnPublishList.fulfilled, (state, { payload }) => {
      switch (payload.type) {
        case 1:
          state.unPublishList = payload.list
          break
        case 2:
          state.hasPublishedList = payload.list
          break
        default:
          state.pendingPublishList = payload.list
      }
    })
  }
})
export default PublishSlice.reducer
