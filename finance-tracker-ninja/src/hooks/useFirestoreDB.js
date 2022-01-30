import {useReducer, useEffect, useState} from 'react'
import {projectFirestore, timeStamp} from '../firebase/config'

const PENDING = 'PENDING'
const ADDED_DOCUMENT = 'ADDED_DOCUMENT'
const ERROR = 'ERROR'
const DELETED_DOCUMENT = 'DELETED_DOCUMENT'


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
}

const firestoreReducer = (state,action) => {
    switch(action.type){
        case PENDING: 
            return {document: null, isPending: true, error: null, success: null}
        case ADDED_DOCUMENT:
            return { document: action.payload, isPending: false, success: true, error: null}
        case DELETED_DOCUMENT:
            return {isPending: false, document: null, success: true, error: null}
        case ERROR:
            return {document: null, isPending: false, success: false, error: action.payload}
        default:
            return state
    }
}


export const useFirestoreDB = (collection) => {

    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // the reference to the DB collection on FirestoreDB
    const ref = projectFirestore.collection(collection)
    
    // Helper f() to dispatch state if user has not cancelled
    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled){
            dispatch(action)
        }
    }
    
    // add document
    const addDocument = async (doc) =>{
       dispatch({type: PENDING})
       try {
           const createdAt =  timeStamp.fromDate(new Date())
           const addedDocument = await ref.add({...doc, createdAt})
           dispatchIfNotCancelled({type: ADDED_DOCUMENT, payload: addedDocument})
       } catch (err) {
            dispatchIfNotCancelled({type: ERROR, payload: err.message})
       }
    }
    // delete a document
    const deleteDocument = async (id) => {
        dispatch({type: PENDING})
        try{
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type: DELETED_DOCUMENT})
        }catch(err){
            dispatchIfNotCancelled({type: ERROR, payload: 'Could Not Delete Document'})
        }

    }

    // clean up f()
    useEffect(()=>{
        return () => setIsCancelled(true)
    },[])

    return {addDocument, deleteDocument, response}

}

