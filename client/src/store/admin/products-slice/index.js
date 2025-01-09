import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState ={
    isLoading: false,
    productList: [],
};


export const addNewProduct = createAsyncThunk('/products/addnewproduct', async(FormData) => {
    const result = await axios.post('http://localhost:5000/api/admin/products/add', FormData, {
        headers: {
            "Content-Type": "application/json",
        }
    })

    return result?.data
})

export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async() => {
    const result = await axios.get('http://localhost:5000/api/admin/products/get');

    return result?.data
})


export const editProduct = createAsyncThunk('/products/editProduct', async(id, FormData) => {
    const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, FormData, {
        headers: {
            "Content-Type": "application/json",
        }
    })

    return result?.data
})


export const deleteProduct = createAsyncThunk('/products/deleteProduct', async(id) => {
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`)

    return result?.data
})



const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers : {
        exteraReducers: (builder) => {
            builder.addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true
            }).addCase(fetchAllProducts.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false
                state.productList = action.payload
            }).addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.productList = []
            })
        }
    }
})

export default AdminProductsSlice.reducer;