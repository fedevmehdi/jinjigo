import { createSlice } from "@reduxjs/toolkit"
import { loginUser, signupUser } from "./authActions.ts"
import { User } from "@/lib/types.ts"

const userString = localStorage.getItem("user")
const user: User = userString ? JSON.parse(userString) : null

const initialState = {
	userInfo: user as User | null,
	error: null,
	loading: false,
}

export const authSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: state => {
			localStorage.removeItem("user")
			state.loading = false
			state.userInfo = null
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(signupUser.fulfilled, (state, { payload }) => {
				state.userInfo = payload
				state.loading = false
				return state
			})
			.addCase(signupUser.rejected, (state, { payload }: any) => {
				state.loading = false
				state.error = payload
			})
			.addCase(signupUser.pending, state => {
				state.loading = true
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.userInfo = payload
				state.loading = false
				return state
			})
			.addCase(loginUser.rejected, (state, { payload }: any) => {
				state.loading = false
				state.error = payload
			})
			.addCase(loginUser.pending, state => {
				state.loading = true
			})
	},
})

export const { logout } = authSlice.actions
