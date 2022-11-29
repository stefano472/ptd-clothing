// una volta impostato Redux questo file non mi occorre più

import { createContext, useEffect, useReducer } from "react"

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils"

export const UserContext = createContext(
    {
        currentUser: null,
        setCurrentUser: () => null
    }
)

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}
const INITIAL_STATE = {
    currentUser: null
}
/**
 * 
 * un reducer necessità di due parametri uno state iniziale ed una funzione action che mi permette di aggiornarlo
 * la action a suo può contenere due parametri il type (tipo di azione che verrà definita a parte per aggiornare lo state)
 * e al bisogno, il payload (un qualcosa che utilizzierò nella mia action), un es può essere il prodotto di un db che andrà ad aggiornarmi
 * un carrello, mi serve quell'oggetto per poter aggiornare nel modo corretto i miei elementi
 * IL REDUCER RITORNA UN NUOVO OBJECT, quindi dovrò spredare lo state se non indico tutte le props di un obj che ritorno
 * è sempre meglio dichiarare tutti i type della mia action in una variabile da esportare per mantenere tutto più leggibile
 * 
 */
const userReducer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER :
            return {
                ...state,
                currentUser: payload
            }

        default : 
            	throw new Error(`Unhandled type in userReducer action ${type}`)
    }

}


export const UserProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE)
    const { currentUser } = state
    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }
    const value = {currentUser, setCurrentUser}

    /*
        con use effect ed un array di dipendenze vuoto indico che voglio runnare questa funzione
        una volta sola, come un mounted per intenderci 
    */
   useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user) {
            createUserDocumentFromAuth(user)
        }
        setCurrentUser(user)
        // console.log(user)
    })
    return unsubscribe
   }, [])

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}