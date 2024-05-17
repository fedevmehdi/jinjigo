import axios from "axios";
import {LoginUser, SignupUser} from "@/services/models/auth.model.ts";

const API = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
});

export const login = (formData: LoginUser) =>
    API.post('/auth/login', formData)

export const signup = (formData: SignupUser) =>
    API.post('/auth/signup', formData)
