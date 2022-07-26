import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getChild, getRights } from '@/api/router'
import type { RightsItem } from '@/types/Router'
const initialState = {
  routerList: [] as RightsItem[]
}
export const getRouterList = createAsyncThunk('router/getRouterList', async () => {
  const [{ data: child }, { data: right }] = await Promise.all([getChild(), getRights()])
  return [...child, ...right]
})
const RouterSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getRouterList.fulfilled, (state, { payload }) => {
      state.routerList = payload
    })
  }
})
export default RouterSlice.reducer
