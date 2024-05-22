import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
import { SignupUser, LoginUser } from "@/services/models/auth.model";

export const signupUser = createAsyncThunk(
	"users/signup",
	async (user: SignupUser, thunkAPI) => {
		try {
			const request = await api.signup(user);
			const response = await request.data;
			if (request.status === 200) {
				return response.user;
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
			const response = await request.data;
			if (request.status === 200) {
				return response.user;
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
	'auth/googleLogin',
	async (tokenId: string, thunkAPI) => {
		try {
			const response = await api.loginByGoogle(tokenId);
			if (response.status === 200) {
				return response.data.user;
			} else {
				return thunkAPI.rejectWithValue(response.data);
			}
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
