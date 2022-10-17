import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../apis";

export const getStoresAsync = createAsyncThunk("store/getStoresAsync", async () => {
    const { status, result } = await apis.store.getStores();
    if (status === 1) {
        return result;
    }
});

export const addStoreAsync = createAsyncThunk("store/addStoreAsync", async (payload) => {
    const { status, result } = await apis.store.addStore(payload);
    if (status === 1) {
        return result;
    }
});

export const updateStoreAsync = createAsyncThunk("store/updateStoreAsync", async (payload) => {
    const { status, result } = await apis.store.updateStore(payload);
    if (status === 1) {
        return result;
    }
});

export const deleteStoreAsync = createAsyncThunk("store/deleteStoreAsync", async (payload) => {
    const { status, result } = await apis.store.deleteStore(payload);
    if (status === 1) {
        return result;
    }
});

const initialState = {
    stores: [],
    selectedStore: sessionStorage.getItem("auth") ? JSON.parse(sessionStorage.getItem("auth")).user.storeId : "",
};

export const storeSlice = createSlice({
    name: "store",
    initialState: initialState,
    reducers: {
        selectStore: (state, action) => {
            state.selectedStore = action.payload;
        },
    },
    extraReducers: {
        [getStoresAsync.fulfilled]: (state, action) => {
            state.stores = [...action.payload];
        },
        [addStoreAsync.fulfilled]: (state, action) => {
            state.stores.push(action.payload);
        },
        [updateStoreAsync.fulfilled]: (state, action) => {
            const index = state.stores.findIndex((store) => store.id === action.payload.id);
            state.stores[index] = action.payload;
        },
        [deleteStoreAsync.fulfilled]: (state, action) => {
            const stores = state.stores.filter((store) => store.id !== action.payload.id);
            state.stores = [...stores];
        },
    },
});

export const { selectStore } = storeSlice.actions;

export default storeSlice.reducer;
