import  {useAuth} from "../hooks/useAuth";
import { Navigate } from "react-router";
import LoadingScreen from "../../../components/LoadingScreen.jsx"

const Protected =({children, loadingFallback}) =>{
    const{authChecking,authError,retryAuthCheck,user} = useAuth()
   

    if(authChecking){
        return loadingFallback || <LoadingScreen />
    }

    if (authError) {
        return (
            <LoadingScreen
                message="We couldn't reach your workspace."
                error={authError}
                onRetry={retryAuthCheck}
            />
        )
    }

    if(!user){
        return <Navigate to={'/login'} />
    }

    return children
}

export default Protected