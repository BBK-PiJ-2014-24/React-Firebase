import {useState, useEffect} from 'react'
import {projectAuth} from '../firebase/config'
import useAuthContext from './useAuthContext'

const useLogout = () => {
    
    // Context
    const {logoutUser}= useAuthContext()

    // State Variables
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false) // Check if user has cancelled by clicking other buttons

    // listener to detect if the user has clicked elsewhere and unmounted
    useEffect(() => {
        return () => setIsCancelled(true)
    },[])



    // Helper function
    const logout = async () => {
        setError(false)
        setIsPending(true)

        try {
            await projectAuth.signOut()
            logoutUser()
            // update state
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            if(!isCancelled){
                console.log(err.message);
                setError(err.message)
                setIsPending(false)
            }
        }
    }


    return {
        logout,
        error,
        isPending
    }
}

export default useLogout
