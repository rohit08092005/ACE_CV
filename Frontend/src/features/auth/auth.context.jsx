import { createContext, useEffect, useRef, useState } from "react";
import { getMe } from "./services/auth.api";


export const AuthContext = createContext(null)

export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [authChecking, setAuthChecking] = useState(true)
    const [authError, setAuthError] = useState("")
    const [authRetry, setAuthRetry] = useState(0)
    const authRequest = useRef(null)

    useEffect(() => {
        let isCurrentEffect = true

        if (!authRequest.current) {
            authRequest.current = getMe()
        }

        authRequest.current
            .then((data) => {
                if (!isCurrentEffect) return
                setUser(data.user)
                setAuthError("")
            })
            .catch((error) => {
                if (!isCurrentEffect) return
                setUser(null)
                setAuthError(
                    error.response?.status === 401
                        ? ""
                        : error.code === "ECONNABORTED"
                            ? "The server is taking too long to respond. Please retry."
                            : error.response?.data?.message || "Unable to connect to ACE_CV. Check your connection and retry."
                )
            })
            .finally(() => {
                if (isCurrentEffect) setAuthChecking(false)
            })

        return () => {
            isCurrentEffect = false
        }
    }, [authRetry])

    const retryAuthCheck = () => {
        authRequest.current = null
        setAuthError("")
        setAuthChecking(true)
        setAuthRetry((attempt) => attempt + 1)
    }

    return (
        <AuthContext.Provider value ={{user,setUser,loading,setLoading,authChecking,authError,retryAuthCheck}}>
            {children}
            </AuthContext.Provider>

    )
}