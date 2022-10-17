import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import storeSlice from "./storeSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        store: storeSlice,
        user: userSlice,
    },
});
