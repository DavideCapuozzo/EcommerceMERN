import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated : false,
    isLoading: false,
    user: null
}

export const registerUser = createAsyncThunk("/auth/register",
    async(FormData) => {
        //in quanto ho indicato nel mio server>server.js la porta 5000 e il resto del percorso e' 
        // quello inserito sempre nello stesso file che mi permette di accedere alle routes quindi 
        // andro a completare il mio link con register che 'e la route 
        // che mi permette di accedere al controller 
        const response = await axios.post('http://localhost:5000/api/auth/register', FormData, {
            withCredentials: true
        });

        return response.data;
    }
)

export const loginUser = createAsyncThunk("/auth/login",
    async(FormData) => {
        //in quanto ho indicato nel mio server>server.js la porta 5000 e il resto del percorso e' 
        // quello inserito sempre nello stesso file che mi permette di accedere alle routes quindi 
        // andro a completare il mio link con register che 'e la route 
        // che mi permette di accedere al controller 
        const response = await axios.post('http://localhost:5000/api/auth/login', FormData, {
            withCredentials: true
        });

        return response.data;
    }
)

export const authSlice = createSlice({
    name:'auth',
    initialState: initialState,
    reducers:{
        setUser:(state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false
            })
    }
})


export const {setUser} = authSlice.actions;
export default authSlice.reducer;
