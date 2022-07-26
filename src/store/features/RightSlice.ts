import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RolesList, RightList, right_RolesList } from '@/types/Right'
import { getRolesList, deleteRoles, getRightList, changeChecked } from '@/api/rights'
interface State {
  rolesList: RolesList[]
  rightList: RightList[]
  currentRight: right_RolesList
  rolesId: number
}
const initialState: State = {
  rolesList: [],
  rightList: [],
  currentRight: [],
  rolesId: 0
}
export const initRolesList = createAsyncThunk('right/initRolesList', async () => {
  const { data: res } = await getRolesList()
  return res
})
export const deleteRole = createAsyncThunk('right/deleteRole', async (id: number) => {
  await deleteRoles(id)
})
export const initRightList = createAsyncThunk('right/initRightList', async () => {
  const { data: res } = await getRightList()
  return res
})
export const changeCheck = createAsyncThunk(
  'right/changeCheck',
  async ({ id, rights }: { id: number; rights: right_RolesList }) => {
    await changeChecked(id, rights)
  }
)
const RightSlice = createSlice({
  name: 'right',
  initialState,
  reducers: {
    initCurrentRight: (
      state: State,
      { payload }: { payload: { currentList: right_RolesList } }
    ) => {
      state.currentRight = payload.currentList
    },
    initRolesId: (state: State, { payload }: { payload: { id: number } }) => {
      state.rolesId = payload.id
    }
  },
  extraReducers(builder) {
    builder.addCase(initRolesList.fulfilled, (state, { payload }) => {
      state.rolesList = payload
    })
    builder.addCase(initRightList.fulfilled, (state, { payload }) => {
      state.rightList = payload
    })
    builder.addCase(deleteRole.fulfilled, () => {
      initRolesList()
    })
    builder.addCase(changeCheck.fulfilled, () => {
      initRightList()
    })
  }
})
export default RightSlice.reducer
export const { initCurrentRight, initRolesId } = RightSlice.actions
