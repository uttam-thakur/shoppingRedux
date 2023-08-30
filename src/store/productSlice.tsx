
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

interface ProductState {
    data: Product[];
    status: string;
    searchQuery: string; // Add the searchQuery field
}

const initialState: ProductState = {
    data: [],
    status: STATUSES.IDLE,
    searchQuery: '', // Initialize searchQuery as an empty string
};

// Modify the fetchProducts action to accept API URL
export const fetchProducts = createAsyncThunk('products/fetch', async (apiURL: string) => {
    const res = await fetch(apiURL);
    const data = await res.json();
    return data;
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.data = action.payload;
        },
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = STATUSES.IDLE;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = STATUSES.ERROR;
            });
    },
});

export const { setProducts, setStatus, setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
