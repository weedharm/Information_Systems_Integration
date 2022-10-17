import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../apis";

export const getRolesAsync = createAsyncThunk("role/getRolesAsync", async () => {
    const { status, result } = await apis.role.getRoles();
    if (status === 1) {
        return result;
    }
});

// export const addStoreAsync = createAsyncThunk("store/addStoreAsync", async (payload) => {
//     const { status, result } = await apis.store.addStore(payload);
//     if (status === 1) {
//         return result;
//     }
// });

// export const updateStoreAsync = createAsyncThunk("store/updateStoreAsync", async (payload) => {
//     const { status, result } = await apis.store.updateStore(payload);
//     if (status === 1) {
//         return result;
//     }
// });

// export const deleteStoreAsync = createAsyncThunk("store/deleteStoreAsync", async (payload) => {
//     const { status, result } = await apis.store.deleteStore(payload);
//     if (status === 1) {
//         return result;
//     }
// });

export const roleSlice = createSlice({
    name: "role",
    initialState: [],
    reducers: {},
    extraReducers: {
        [getRolesAsync.fulfilled]: (state, action) => {
            return action.payload;
        },
        // [addStoreAsync.fulfilled]: (state, action) => {
        //     state.stores.push(action.payload);
        // },
        // [updateStoreAsync.fulfilled]: (state, action) => {
        //     const index = state.stores.findIndex((store) => store.id === action.payload.id);
        //     state.stores[index] = action.payload;
        // },
        // [deleteStoreAsync.fulfilled]: (state, action) => {
        //     const stores = state.stores.filter((store) => store.id !== action.payload.id);
        //     state.stores = [...stores];
        // },
    },
});

export default roleSlice.reducer;
