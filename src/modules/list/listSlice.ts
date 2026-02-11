import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ListItem {
  id: number;
  date: string;
  lrNo: string;
  runnerName: string;
  startTime: string;
  endTime: string;
  status: string;
  vehicleNo: string;
  vehicleType: string;
  purpose: string;
}

interface ListState {
  data: ListItem[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  search: string;
  statusFilter: string;
}

const initialState: ListState = {
  data: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  search: '',
  statusFilter: 'All',
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    fetchListStart(state) {
      state.loading = true;
      state.error = null;
    },

    fetchListSuccess(state, action: PayloadAction<ListItem[]>) {
      state.loading = false;

      state.data =
        state.page === 1
          ? action.payload
          : [...state.data, ...action.payload];

      state.hasMore = action.payload.length === 10;
    },

    fetchListFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    incrementPage(state) {
      state.page += 1;
    },

    resetList(state) {
      state.page = 1;
      state.data = [];
      state.hasMore = true;
    },

    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },

    setStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    },
  },
});

export const {
  fetchListStart,
  fetchListSuccess,
  fetchListFailure,
  incrementPage,
  resetList,
  setSearch,
  setStatusFilter,
} = listSlice.actions;

export default listSlice.reducer;
