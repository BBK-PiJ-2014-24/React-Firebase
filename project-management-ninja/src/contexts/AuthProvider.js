import {useReducer, useEffect} from 'react'
import { projectAuth } from '../firebase/config'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import {
    LOGIN,
    LOGOUT,
    IS_AUTH_READY,
 } from './Types'

const AuthProvider = (props) => {

    // Init Values for State Going into Reducer
    const initValues = {
        user: null,
        isAuthReady: false,
    }
    // Reducer
    const [state, dispatch] = useReducer(AuthReducer, initValues)

    // Functions Exposed in Context to the Helper HOOKS 
    const loginUser = (user) => {
        dispatch({
            type: LOGIN,
            payload: user
        })
    }

    const logoutUser = () => {
        dispatch({
            type: LOGOUT,
        })
    }

    // One-off Check with Firebase if user state has changed
    useEffect(()=> {
        const unsubscribe = projectAuth.onAuthStateChanged((user)=>{
            dispatch({
                type: IS_AUTH_READY,
                payload: user
            })
            unsubscribe();
        })
    },[])

    console.log('Context State', state);


    return (
        <AuthContext.Provider value = {{...state, loginUser, logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
