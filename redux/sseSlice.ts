import { createSlice } from "@reduxjs/toolkit";
import { dataReceived, setStats } from "@/redux/sagas";
import { RootState } from "@/redux/store";

interface SseState {
  data: Record<number, number[]>;
  stats: {
    max?: number;
    min?: number;
  };
}

const initialState: SseState = {
  data: {},
  stats: {
    max: undefined,
    min: undefined,
  },
};

const sseSlice = createSlice({
  name: "sse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dataReceived, (state, { payload: { streamID, data } }) => {
        if (!state.data[streamID]) {
          state.data[streamID] = [];
        }
        state.data[streamID].push(data);
      })
      .addCase(setStats, (state, { payload: { stats } }) => {
        state.stats = stats;
      });
  },
});

export default sseSlice.reducer;

export const selectData = (state: RootState) => state.sse.data;
export const selectStats = (state: RootState) => state.sse.stats;
