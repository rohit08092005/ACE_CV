import  {useAuth} from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'

const Protected =({children, loadingFallback = null}) =>{
    const{authChecking,user} = useAuth()
   

    if(authChecking){
        return loadingFallback
    }

    if(!user){
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected