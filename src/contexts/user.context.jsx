import { createContext, useState, useEffect } from "react"

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils"

/*
    È più ordinato mettere i context in una cartella separata in modo da gestirli al meglio
    prima di tutto creo il context al quale posso passare un default value e che sarà 
    il valore attuale cioè quello che voglio renderizzare per intenderci in tempo reale
    programmo già che il context dovrà contenere il valore del contesto e la funzione 
    che va a cambiarlo e li istanzio a null , così potrò andare a sovrascriverli
    a mio piacimento nell'app, se non li avessi instanziati avrebbero dato errore
*/
export const UserContext = createContext(
    {
        currentUser: null,
        setCurrentUser: () => null
    }
)

/*
    Successivamente creo il provider che sarà il vero component che poi vado ad utilizzare
    nella mia app dove mi serve il valore UserContext devo wrappare questo elemento
    attorno al provider in modo da averne disposizione
*/
export const UserProvider = ({ children }) => {
    // vogliamo storeare un user object(l'utente loggato)
    const [ currentUser, setCurrentUser ] = useState(null)
    // quindi utilizzo use state per tenere monitorati i cambiamenti, inizialmente sarà null, al 
    // login si popola quindi passo queste due var come props al mio provider, in modo da averne
    // disposizione dove voglio
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
        console.log(user)
    })
    //  con use effect quello che metto al return è cosa voglio eseguire all'unmoount del component
    return unsubscribe
   }, [])

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}