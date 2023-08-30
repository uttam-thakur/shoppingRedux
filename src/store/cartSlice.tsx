import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    [x: string]: any;
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as Product[],
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            const productToAdd = action.payload;
            const existingProduct = state.find(product => product.id === productToAdd.id);
        
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                state.push({ ...productToAdd, quantity: 1 });
            }
        },
        remove: (state, action: PayloadAction<{ id: number; quantity?: number }>) => {
            const { id, quantity } = action.payload;
            const existingProduct = state.find((product) => product.id === id);
            if (existingProduct) {
                if (quantity === undefined || quantity >= existingProduct.quantity) {
                    return state.filter((product) => product.id !== id);
                } else {
                    existingProduct.quantity -= quantity;
                }
            }
        },
        clearCart: (state) => {
            return [];
        },
    },
});

export const { add, remove, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
