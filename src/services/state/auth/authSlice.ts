import { createSlice } from "@reduxjs/toolkit"
import {googleLogin, loginUser, signupUser} from "./authActions.ts"
import { User } from "@/lib/types.ts"
import { toast } from "sonner"

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
			toast.success("Successfully Logget Out")
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
				state.error = null
				toast.success("Successfully Signed Up")
				return state
			})
			.addCase(signupUser.rejected, (state, { payload }: any) => {
				state.loading = false
				state.error = payload.error
				toast.error(payload.error)
			})
			.addCase(signupUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.userInfo = payload
				state.loading = false
				toast.success("Successfully Logged In")
				return state
			})
			.addCase(loginUser.rejected, (state, { payload }: any) => {
				state.loading = false
				state.error = payload.error
				toast.error(payload.error)
			})
			.addCase(loginUser.pending, state => {
				state.loading = true
			})
			.addCase(googleLogin.fulfilled, (state, { payload }: any) => {
				state.userInfo = payload;
				state.loading = false;
				state.error = null;
				toast.success("Successfully Logged In");
			})
			.addCase(googleLogin.rejected, (state, { payload }: any) => {
				state.loading = false;
				state.error = payload.error;
			})
			.addCase(googleLogin.pending, (state) => {
				state.loading = true;
				state.error = null;
			});
	},
})

export const { logout } = authSlice.actions
