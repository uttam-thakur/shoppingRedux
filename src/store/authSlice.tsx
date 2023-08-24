
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { login } from '../Services/servicesApi';

// export const loginUser = createAsyncThunk('auth/login', async (loginData, thunkAPI) => {
//     try {
//         const response = await login(loginData); // Call your login API function
//         return response;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.message);
//     }
// });

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         user: null, // Initial user state
//         status: 'idle', // Initial status
//         error: null, // Initial error state
//     },
//     reducers: {
//         // Your other actions
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(loginUser.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.user = action.payload;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.status = 'failed';
//                 // state.error = action.payload;
//             });
//     },
// });

// export const { /* your other actions */ } = authSlice.actions;
// export default authSlice.reducer;


// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: '',
        password: '',
        address: {},
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
          },
    },
});

// const selectAuth = (state) => state.auth;

// export const selectAddress = createSelector(
//   selectAuth,
//   (auth) => auth.address
// );

export const { setUsername, setPassword,setAddress } = authSlice.actions;
export default authSlice.reducer;
