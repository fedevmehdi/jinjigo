import axios from "axios"
import { LoginUser, SignupUser } from "@/services/models/auth.model"
import { CreateInterview } from "@/lib/types"

const API = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
})

API.interceptors.request.use(
	config => {
		const token = JSON.parse(localStorage.getItem("token") ?? "")
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

export const login = (formData: LoginUser) => API.post("/auth/login", formData)
export const signup = (formData: SignupUser) =>
	API.post("/auth/signup", formData)
export const loginByGoogle = (token: string) =>
	API.post("/auth/validate-google-token", { token })

export const fetchInterviews = () => {
	return API.get("/api/interviews/all-interviews")
}

export const createInterview = (formData: CreateInterview) =>
	API.post("/api/interviews/schedule", formData)
