import { createSelector, createSlice } from "@reduxjs/toolkit";
import { dataReceived } from "@/redux/sagas";
import { RootState } from "@/redux/store";

interface SseState {
  data: Record<number, number[]>;
}

const initialState: SseState = {
  data: {},
};
const sseSlice = createSlice({
  name: "sse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dataReceived, (state, { payload: { streamID, data } }) => {
      if (!state.data[streamID]) {
        state.data[streamID] = [];
      }
      state.data[streamID].push(data);
    });
  },
});

export default sseSlice.reducer;

export const selectData = (state: RootState) => state.sse.data;
