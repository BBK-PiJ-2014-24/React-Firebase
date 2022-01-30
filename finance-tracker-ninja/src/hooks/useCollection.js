import {useEffect, useState, useRef} from 'react'
import {projectFirestore} from '../firebase/config'


export const useCollection = (collection, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // WARNING _query is an [], which is a ref type variable. This means 
    // that if it is placed in a useEffect, then it will create an infinite 
    // loop. This can be avoided by wrapping it in a useRef, which will not
    // not be re=referenced on each render.
    const query = useRef(_query).current 
    const orderBy = useRef(_orderBy).current
   
    // Listener to the collection, firing for when there are changes
    useEffect(() => {
        // reference to the firestore collection
        let ref = projectFirestore.collection(collection)

        // Build DB Query if it exists
        if(query){
            ref = ref.where(...query) // spreads ['uid', '==', user.uid]
        }

        if(orderBy){
            ref=ref.orderBy(...orderBy)
        }
        

        // firestore callback that retrieves the whole collection table
        // whenever there is a change to the collection as it is fired
        // by the useEffect
        // onSnapshot(fn on DB, fn for error handling)
        const unsubscribe = ref.onSnapshot(snapshot => {
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({...doc.data(), id: doc.id})
        });
        
        // update STATE VARIABLES
        setDocuments(results)
        setError(null)
        }, error => {
            console.log(error)
            setError('could not fetch the data')
        })
    
        // unsubscribe on unmount
        return () => unsubscribe()
    
    }, [collection, query, orderBy]) // Warning _query[] is a ref type and so requires 
    
    return { documents, error }
}