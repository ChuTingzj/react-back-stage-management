import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMenuItemList } from '@/api/home'
import { deleteMenuItem, deleteSecItem, changePermission, changeSecPermission } from '@/api/rights'
import type { MenuItem } from '@/types/Menu'
interface homeState {
  menuList: MenuItem[]
}
const initialState: homeState = {
  menuList: []
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
const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initMenuList.fulfilled, (state, { payload }) => {
      state.menuList = payload
      state.menuList.forEach((item) => {
        if (!item.children?.length) return (item.children = '')
      })
    })
  }
})
export default HomeSlice.reducer
