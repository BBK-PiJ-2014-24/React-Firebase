import {
    LOGIN,
    LOGOUT,
    IS_AUTH_READY,
} from './Types'

const AuthReducer = (state, action) => {


    switch(action.type) {
        case LOGIN:
            return {...state, user: action.payload}
        case LOGOUT:
            return {...state, user: null}
        case IS_AUTH_READY:
            return {...state, user: action.payload, isAuthReady: true}
        default:
            return state
    }
}

export default AuthReducer