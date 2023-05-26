import {createAsyncThunk} from '@reduxjs/toolkit';

import api from '../../api';

const fetchNews = createAsyncThunk(
  'news',
  async (value: any, {rejectWithValue}) => {
    try {
      const {data} = await api.get(``, {
        params: {
          limit: value.limit,
          offset: value.offset,
        },
      });
      return data.results;
    } catch (error: any) {
      if (error.response.data) {
        return rejectWithValue(error.response.data.detail);
      } else {
        return rejectWithValue('Something went wrong');
      }
    }
  },
);

export {fetchNews};
