import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import triggerReducer from './triggerSlice';
import authReducer from './authSlice';
import OrderHistoryReducer from './orderHistorySlice';
// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        trigger: triggerReducer,
        auth: authReducer,
        orderHistory: OrderHistoryReducer,

    },
});


export default store;
