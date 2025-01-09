import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/products-slice"

const store = configureStore({
    reducer:{
        auth: authReducer,
        AdminProducts : AdminProductsSlice,
    }
})

export default store;