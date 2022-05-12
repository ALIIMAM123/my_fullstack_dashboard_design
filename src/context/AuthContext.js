import { createContext,useEffect } from "react"
import AuthReducer from "./AuthReducer"
import { useReducer } from "react"

const INITIAL_STATE = {
    currentUser : JSON.parse(localStorage.getItem("user")) || null,
}

export const AuthContext = createContext(INITIAL_STATE)

// To react the initial_state everywhere we have a contextProvider


export const AuthContextProvider = ({children}) => {
    const [state,dispatch ] = useReducer(AuthReducer , INITIAL_STATE)

    useEffect(()=>{
        localStorage.setItem("user" , JSON.stringify(state.currentUser))
     },[state.currentUser])
     
    return (
        <AuthContext.Provider value = {{currentUser:state.currentUser , dispatch}}>
             {children}
        </AuthContext.Provider>
    )
}