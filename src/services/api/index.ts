import axios from "axios";
import {LoginUser, SignupUser} from "@/services/models/auth.model.ts";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
});

export const login = (formData: LoginUser) =>
    API.post('/auth/login', formData)

export const signup = (formData: SignupUser) =>
    API.post('/auth/signup', formData)

export const loginByGoogle = (formData: any) =>
    API.post('/auth/google/callback', formData)
