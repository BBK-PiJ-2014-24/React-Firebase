import {useState, useEffect} from 'react'
import {projectAuth} from '../firebase/config'
import  useAuthContext  from './useAuthContext'

const useSignUp = () => {

    // Contexts
    const {loginUser} = useAuthContext()

    // State Variables
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [isCancelled, setIsCancelled] = useState(false) // Check if user has cancelled by clicking other buttons

    // listener to detect if the user has clicked elsewhere and unmounted
    useEffect(() => {
        return () => setIsCancelled(true)
    },[])



    // Hook that makes an API call to Firebase to set up a User

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            // defence check
            if(!res){
                throw new Error('Sign Up Failed')
            }
            //Set display name for user
            await res.user.updateProfile({displayName})

           // reducer dispatch a login action 
            loginUser(res.user)
           
            if(!isCancelled){
                setError(null)
                setIsPending(false)
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
        error,
        isPending,
        signup
    }
}


export {useSignUp}