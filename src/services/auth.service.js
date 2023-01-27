import axios from '../common/axios.js'
import {apiUrl} from "../common/constants.js";

export async function signupRequest(data) {
    const res = await axios.post(`${apiUrl}/auth/signup`, data)
    return res.data;
}

export async function loginRequest(data) {
    const res = await axios.post(`${apiUrl}/auth/login`, data)
    return res.data;
}