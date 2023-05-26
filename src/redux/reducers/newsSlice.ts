import {createSlice} from '@reduxjs/toolkit';
import {fetchNews} from '../actions/newsAction';
import {News, NewsResponse} from '../../types';

enum Status {
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

interface NewsState {
  loading: boolean;
  error: null | any;
  success: null | Object;
  status: null | string;
  message: string | null;
  data: NewsResponse | null;
  pinned: Array<News>;
  limit: number;
  results: News[];
  offset: number;
}

const initialState: NewsState = {
  loading: false,
  error: null,
  success: false,
  status: null,
  message: '',
  data: null,
  pinned: [],
  limit: 5,
  results: [],
  offset: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPinned: (state, action) => {
      state.pinned = [...state.pinned, action.payload];
    },
    updatePinned: (state, action) => {
      const filter = state.pinned.filter(
        _item => _item.id !== action.payload.id,
      );
      state.pinned = filter;
    },
    deleteResults: state => {
      if (state.results.length > 10) {
        const data = state.results.splice(0, 10);
        state.results = data;
      }
    },
    addOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, (state, _) => {
        state.status = Status.pending;
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.loading = false;
        state.success = true;
        state.offset = state.offset + 5;
        state.results.unshift(...action.payload);
        state.results = state.results;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = Status.failed;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {addPinned, updatePinned, deleteResults, addOffset} =
  userSlice.actions;

export default userSlice.reducer;
