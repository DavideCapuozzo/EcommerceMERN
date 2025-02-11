import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/products-slice"
import shoppingProductSlice from "./shop/products-slice"
import shopCartSlice from "./shop/cart-slice"
import shopAddressSlice from "./shop/address-slice"


const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts : AdminProductsSlice,
        shopProducts : shoppingProductSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,

    }
})

export default store;