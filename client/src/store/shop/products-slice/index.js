import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList : []
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts', async({filterParams, sortParams}) => {
    console.log('fetchAllProducts is being called...');
    try{
        const query = new URLSearchParams({
            ...filterParams, 
            sortBy : sortParams
        })
        const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`);
        console.log(result?.data, "CHIAMATA API FETCHALLPRODUCTS")
        return result?.data

    }catch (error){
        console.error('Error during API call:', error);
        throw error; 
    }
    
    
})

const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchAllFilteredProducts.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                console.log(action.payload, 'ACTION PAYLOAD shoppingProductSlice')
                state.isLoading = true
                state.productList = action.payload.data
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false
                state.productList = []
            })
    }
})

export default shoppingProductSlice.reducer;