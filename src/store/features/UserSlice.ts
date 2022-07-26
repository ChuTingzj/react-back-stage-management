import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getUserList,
  getRegionList,
  postUsers,
  deleteUsers,
  changeStatus,
  updateUser
} from '@/api/user'
import type { userItem, regionItem, FormData } from '@/types/Users'
interface State {
  userList: userItem[]
  regionList: regionItem[]
  weakList: userItem[]
}
const initialState: State = {
  userList: [],
  regionList: [],
  weakList: []
}
export const initUserList = createAsyncThunk('user/initUserList', async () => {
  const { data: res } = await getUserList()
  return res
})
export const initRegionList = createAsyncThunk('user/initRegionList', async () => {
  const { data: res } = await getRegionList()
  return res
})
export const submitForm = createAsyncThunk('user/submitForm', async (value: FormData) => {
  await postUsers(value)
})
export const deleteUser = createAsyncThunk('user/deleteUser', async (id: number) => {
  await deleteUsers(id)
})
export const changeState = createAsyncThunk(
  'user/changeStatus',
  async ({ id, status }: { id: number; status: boolean }) => {
    await changeStatus(id, status)
  }
)
export const updateUserList = createAsyncThunk(
  'user/updateUserList',
  async ({ id, value }: { id: number; value: FormData }) => {
    await updateUser(id, value)
  }
)
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserList: (state: State, { payload }: { payload: { list: Array<userItem> } }) => {
      state.weakList = payload.list
    }
  },
  extraReducers(builder) {
    builder.addCase(initUserList.fulfilled, (state, { payload }) => {
      state.userList = payload
    })
    builder.addCase(initRegionList.fulfilled, (state, { payload }) => {
      state.regionList = payload
    })
    builder.addCase(submitForm.fulfilled, () => {
      initUserList()
    })
    builder.addCase(deleteUser.fulfilled, () => {
      initUserList()
    })
    builder.addCase(changeState.fulfilled, () => {
      initUserList()
    })
    builder.addCase(updateUserList.fulfilled, () => {
      initUserList()
    })
  }
})
export default UserSlice.reducer
export const { setUserList } = UserSlice.actions
