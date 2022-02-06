import {useState, useEffect} from 'react'
import {projectAuth, projectFirestore} from '../firebase/config'
import useAuthContext from './useAuthContext'

const useLogin = () => {
    
    // Context
    const {loginUser, user}= useAuthContext()

    // State Variables
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false) // Check if user has cancelled by clicking other buttons


    // listener to detect if the user has clicked elsewhere and unmounted
    useEffect(() => {
        return () => setIsCancelled(true)
    },[])
    

    // Helper function
    const login = async (email, password) => {
        setError(false)
        setIsPending(true)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // Update User online status on the backend
            await projectFirestore.collection('users')
                                  .doc(res.user.uid)
                                  .update({online: true})

            loginUser(res.user)
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
        login,
        error,
        isPending
    }
}

export default useLogin
