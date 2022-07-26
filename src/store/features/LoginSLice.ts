import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { logIn } from '@/api/login'
import type { userInfo } from '@/types/Login'
interface State {
  userInfo: userInfo[]
}
const initialState: State = {
  userInfo: []
}
export const login = createAsyncThunk(
  'login/login',
  async ({ username, password }: { username: string; password: string }) => {
    const { data: res } = await logIn(username, password)
    return res
  }
)
const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearUserInfo: (state: State) => {
      state.userInfo = []
    }
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.userInfo = payload
      localStorage.setItem('token-news', JSON.stringify(payload[0]))
    })
  }
})
export default LoginSlice.reducer
export const { clearUserInfo } = LoginSlice.actions
