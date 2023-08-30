import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Product {
//     id: number;
//     title: string;
//     price: number;
//     image: string;
//     quantity: number;
// }

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: [{}], // Initialize as an empty array of OrderHistoryItem
  reducers: {
    addToOrderHistory: (state, action) => {
      state.push(action.payload);
    },
    clearOrderHistory: () => [] , // Clear order history by returning an empty array
  },
});

export const { addToOrderHistory, clearOrderHistory } = orderHistorySlice.actions;

export default orderHistorySlice.reducer;

