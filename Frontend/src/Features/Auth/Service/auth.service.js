import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1/user',
    withCredentials: true
})



export const registerUser = async ({ fullname, password, email }) => {
    const response = await api.post('/register', { fullname, email, password })
    return response.data
}


export const loginUser = async ({ email, password }) => {
    const response = await api.post('/login', { email, password })
    return response.data
}


export const getUserProfile=async()=>{
    const response=await api.get('/profile')
    return response.data
}


export const logoutUser=async()=>{
    const response=await api.post('/logout')
    return response.data
}