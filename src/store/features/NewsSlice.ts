import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { NewsCategory, News, DraftItem, previewInfo, NewsPatch } from '@/types/News'
import {
  getCategory,
  postNews,
  getDraftList,
  deleteNews,
  getNewsInfo,
  updateNewsInfo,
  pushCheck,
  deleteCategory,
  editCategory
} from '@/api/news'
interface State {
  categoryList: NewsCategory[]
  draftList: DraftItem[]
  previewList: previewInfo
}
const initialState: State = {
  categoryList: [],
  draftList: [],
  previewList: {}
}
export const getCategoryList = createAsyncThunk('news/getCategoryList', async () => {
  const { data: res } = await getCategory()
  return res
})
export const submitNews = createAsyncThunk('news/submitNews', async (data: News) => {
  await postNews(data)
})
export const getDraft = createAsyncThunk('news/getDraft', async (username: string) => {
  const { data: res } = await getDraftList(username)
  return res
})
export const deleteNew = createAsyncThunk('news/deleteNew', async (id: number) => {
  await deleteNews(id)
})
export const getInfoList = createAsyncThunk('news/getInfoList', async (id: number) => {
  const { data: res } = await getNewsInfo(id)
  return res
})
export const updateInfo = createAsyncThunk(
  'news/updateInfo',
  async ({ data, id }: { data: NewsPatch; id: number }) => {
    await updateNewsInfo(data, id)
  }
)
export const submitCheck = createAsyncThunk('news/submitCheck', async (id: number) => {
  await pushCheck(id)
})
export const deleteCate = createAsyncThunk('news/deleteCate', async (id: number) => {
  await deleteCategory(id)
})
export const updateCategories = createAsyncThunk(
  'news/updateCategories',
  async ({ id, title, value }: { id: number; title: string; value: string }) => {
    await editCategory(id, title, value)
  }
)
const NewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCategoryList.fulfilled, (state, { payload }) => {
      state.categoryList = payload
    })
    builder.addCase(getDraft.fulfilled, (state, { payload }) => {
      state.draftList = payload
    })
    builder.addCase(deleteNew.fulfilled, () => {
      const { username } = JSON.parse(localStorage.getItem('token-news') ?? '{}')
      getDraft(username)
    })
    builder.addCase(getInfoList.fulfilled, (state, { payload }) => {
      state.previewList = payload
    })
  }
})
export default NewsSlice.reducer
