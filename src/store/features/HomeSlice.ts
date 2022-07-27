import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMenuItemList, pullMainNews, pullStarNews, pullAllNews } from '@/api/home'
import { deleteMenuItem, deleteSecItem, changePermission, changeSecPermission } from '@/api/rights'
import type { MenuItem } from '@/types/Menu'
import type { AuditListItem } from '@/types/Audit'
import _ from 'lodash'
interface homeState {
  menuList: MenuItem[]
  collapsed: boolean
  spinning: boolean
  mainList: AuditListItem[]
  starList: AuditListItem[]
  newsList: AuditListItem[]
}
const initialState: homeState = {
  menuList: [],
  collapsed: false,
  spinning: false,
  mainList: [],
  starList: [],
  newsList: []
}
export const initMenuList = createAsyncThunk('home/initMenuList', async () => {
  const { data: res } = await getMenuItemList()
  return res
})
export const deleteMenu = createAsyncThunk('home/deleteMenu', async (id: number) => {
  await deleteMenuItem(id)
})
export const deleteSecMenu = createAsyncThunk('home/deleteSecMenu', async (id: number) => {
  await deleteSecItem(id)
})
export const changePer = createAsyncThunk(
  'home/changePer',
  async ({ id, permission }: { id: number; permission: number }) => {
    await changePermission(id, permission)
  }
)
export const changeSecPer = createAsyncThunk(
  'home/changePer',
  async ({ id, permission }: { id: number; permission: number }) => {
    await changeSecPermission(id, permission)
  }
)
export const getMainNewsList = createAsyncThunk('home/getMainNewsList', async () => {
  const { data: res } = await pullMainNews()
  return res
})
export const getMainStarList = createAsyncThunk('home/getMainStarList', async () => {
  const { data: res } = await pullStarNews()
  return res
})
export const getAllNewsList = createAsyncThunk('home/getAllNewsList', async () => {
  const { data: res } = await pullAllNews()
  return res
})
const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeCollapsed(state: homeState, { payload }: { payload: { status: boolean } }) {
      state.collapsed = payload.status
    },
    changeSpinning(state: homeState, { payload }: { payload: { status: boolean } }) {
      state.spinning = payload.status
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initMenuList.fulfilled, (state, { payload }) => {
      state.menuList = payload
      state.menuList.forEach((item) => {
        if (!item.children?.length) return (item.children = '')
      })
    })
    builder.addCase(getMainNewsList.fulfilled, (state, { payload }) => {
      state.mainList = payload
    })
    builder.addCase(getMainStarList.fulfilled, (state, { payload }) => {
      state.starList = payload
    })
    builder.addCase(getAllNewsList.fulfilled, (state, { payload }) => {
      state.newsList = payload
    })
  }
})
export default HomeSlice.reducer
export const { changeCollapsed, changeSpinning } = HomeSlice.actions
