import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../apis";
import axiosClient from "../apis/api";

const initialState = JSON.parse(sessionStorage.getItem("auth")) || {
    user: {},
    token: "",
    isAuthenticated: false,
};

export const loginAsync = createAsyncThunk("login", async (payload) => {
    const res = await apis.auth.login(payload.email, payload.password);
    axiosClient.defaults.headers.common.Authorization = `Bearer ${res.token}`;
    sessionStorage.setItem("auth", JSON.stringify({ ...res, isAuthenticated: true }));

    return res;
});

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout(state, action) {
            sessionStorage.removeItem("auth");
            return {
                user: {},
                token: "",
                isAuthenticated: false,
            };
        },
    },
    extraReducers: {
        [loginAsync.fulfilled]: (state, action) => {
            return { ...action.payload, isAuthenticated: true };
        },
    },
});

export const { logout } = authSlice.actions;


export default authSlice.reducer;
