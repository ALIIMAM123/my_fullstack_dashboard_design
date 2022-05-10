import { createContext } from "react"
import DarkModeReducer from "./darkModeReducer"
import { useReducer } from "react"

const INITIAL_STATE = {
    darkMode : true
}

export const DarkModeContext = createContext(INITIAL_STATE)

// To react the initial_state everywhere we have a contextProvider

export const DarkModeContextProvider = ({children}) => {
    const [state,dispatch ] = useReducer(DarkModeReducer , INITIAL_STATE)
    return (
        <DarkModeContext.Provider value = {{darkMode:state.darkMode , dispatch}}>
             {children}
        </DarkModeContext.Provider>
    )
}