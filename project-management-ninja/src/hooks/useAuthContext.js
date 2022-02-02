import {useContext} from 'react'
import  AuthContext  from "../contexts/AuthContext";

const useAuthContext = () => {

    const authContext = useContext(AuthContext)

    if(!authContext){
        throw Error('AuthContext Not in Scope')
    }

    return authContext
}

export default useAuthContext