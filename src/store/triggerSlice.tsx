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
    resetTrigger: (state) => {
      state.triggerCount = 0; // Reset the trigger count to zero
    },
  },
});

export const { incrementTrigger, decrementTrigger, decrementTriggerAll, resetTrigger } = triggerSlice.actions;

export default triggerSlice.reducer;
