import axios from "axios"

const apiBaseUrl = import.meta.env.VITE_API_URL || (
    import.meta.env.DEV ? "http://localhost:3000" : window.location.origin
)

const api = axios.create({
    baseURL: apiBaseUrl,
    timeout: 30000,
    withCredentials:true
})
export async function register({username,email,password}) {
    const response = await api.post("/api/auth/register",{
        username,email,password
    })

    return response.data
}

export async function login({email,password}){
    const response = await api.post("/api/auth/login",{
        email,password
    })

    return response.data
}

export async function logout(){
    const response = await api.get("/api/auth/logout")

    return response.data
}

export async function getMe(){
    const response = await api.get("/api/auth/get-me")
    return response.data
}
