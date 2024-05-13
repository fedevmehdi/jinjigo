import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
	isSignedIn: boolean
	email: string
	fullName: string
}

const initialState: UserState = {
	isSignedIn: false,
	email: "",
	fullName: "",
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signIn(state, action: PayloadAction<{ email: string; fullName: string }>) {
			state.isSignedIn = true
			state.email = action.payload.email
			state.fullName = action.payload.fullName
		},
		signOut(state) {
			state.isSignedIn = false
			state.email = ""
			state.fullName = ""
		},
	},
})

export const { signIn, signOut } = userSlice.actions
export default userSlice.reducer
