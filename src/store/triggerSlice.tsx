import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TriggerState {
  triggerCount: number;
}

const triggerSlice = createSlice({
  name: 'trigger',
  initialState: { triggerCount: 0 } as TriggerState,
  reducers: {
    incrementTrigger: (state) => {
      state.triggerCount += 1;
    },
    decrementTrigger: (state) => {
      state.triggerCount -= 1;
    },
    decrementTriggerAll: (state, action: PayloadAction<number>) => {
      state.triggerCount -= action.payload;
    },
  },
});

export const { incrementTrigger, decrementTrigger, decrementTriggerAll } = triggerSlice.actions;

export default triggerSlice.reducer;
