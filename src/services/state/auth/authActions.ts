import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
import { SignupUser, LoginUser } from "@/services/models/auth.model";

export const signupUser = createAsyncThunk(
	"users/signup",
	async (user: SignupUser, thunkAPI) => {
		try {
			const request = await api.signup(user);
			const response = request.data;
			if (request.status === 200) {
				const user = { ...response.user, token: response.token };
				localStorage.setItem("token", response.token);
				localStorage.setItem("user", JSON.stringify(user));
				return user;
			} else {
				return thunkAPI.rejectWithValue(response);
			}
		} catch (e: any) {
			console.log("Error", e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const loginUser = createAsyncThunk(
	"users/login",
	async (user: LoginUser, thunkAPI) => {
		try {
			const request = await api.login(user);
			const response = request.data;
			if (request.status === 200) {
				const user = { ...response.user, token: response.token };
				localStorage.setItem("token", response.token);
				localStorage.setItem("user", JSON.stringify(user));
				return user;
			} else {
				return thunkAPI.rejectWithValue(response);
			}
		} catch (e: any) {
			console.log("Error", e.response.data);
			return thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const googleLogin = createAsyncThunk(
	"auth/googleLogin",
	async (tokenId: string, thunkAPI) => {
		try {
			const response = await api.loginByGoogle(tokenId);
			if (response.status === 200) {
				const user = { ...response.data.user, token: response.data.token };
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("user", JSON.stringify(user));
				return user;
			} else {
				return thunkAPI.rejectWithValue(response.data);
			}
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
