import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

type SignupUser = {
	username: string
	password: string
	email: string
}

type LoginUser = {
	email: string
	password: string
}

export const signupUser = createAsyncThunk(
	"users/signup",
	async (user: SignupUser, thunkAPI) => {
		try {
			const request = await axios.post("/auth/signup", user)
			const response = await request.data
			if (request.status === 200) {
				const user = { ...response.user, token: response.token }
				localStorage.setItem("user", JSON.stringify(user))
				return user
			} else {
				return thunkAPI.rejectWithValue(response)
			}
		} catch (e: any) {
			console.log("Error", e.response.data)
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)

export const loginUser = createAsyncThunk(
	"users/login",
	async (user: LoginUser, thunkAPI) => {
		try {
			const request = await axios.post("/auth/login", user)
			const response = await request.data
			if (request.status === 200) {
				const user = { ...response.user, token: response.token }
				localStorage.setItem("user", JSON.stringify(user))
				return user
			} else {
				return thunkAPI.rejectWithValue(response)
			}
		} catch (e: any) {
			console.log("Error", e.response.data)
			return thunkAPI.rejectWithValue(e.response.data)
		}
	}
)
