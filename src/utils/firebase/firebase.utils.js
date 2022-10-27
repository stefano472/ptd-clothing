///// DOCUMENTATION FIREBASE AUTH
// https://firebase.google.com/docs/auth/web/google-signin#web-version-9_3


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCxUMVwkbV-HpsVoDEDCMmpJDfunJGRGY",
    authDomain: "ptd-clothing-db.firebaseapp.com",
    projectId: "ptd-clothing-db",
    storageBucket: "ptd-clothing-db.appspot.com",
    messagingSenderId: "969948919566",
    appId: "1:969948919566:web:4e703069378dd83346895f"
};
  
// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// console.log(firebaseApp)
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
// auth.languageCode = 'it'

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()
// un db in firestore ha 3 elementi collection, document, data
// collection è la tabella(nel nostro es users) che accumuna tutti i document
// document è il singolo el all'interno della tabella (nel nostro es user), che deve avere unique ID
// data sono i valori che identificato il nostro user (id, name , role, ecc...)

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return
    // doc serve per recuperarere documents all'interno del nostro db
    // prende 3 elementi, il database, la collection ed un identifier
    // uid è all'interno della nostra response nella signin component (uniqueidentifier)
    const userDocRef = doc(db, 'users', userAuth.uid)

    // setdoc e getdoc possono confondere per il nome ma non intendono settare e prendere i documents(le tabelle)
    // ma prendere o settare i dati all'interno di quella tabella (cioè prendere il singolo user)
    // console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef)
    // console.log(userSnapshot)

    if (!userSnapshot.exists()) {
        
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userDocRef, {
                displayName, 
                email,
                createdAt,
                ...additionalInformation
            })
        }  catch(e) {console.log('error creating user', e)}
    }

    return userDocRef
}

export const createAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

/*
    metodo che mette a disposizione firebase a cui passo la mia auth signature ed un acallback
    functiion ch evoglio eseguire tutte le volte che chiamo questo metodo
    è sostanzialmente un open listener permanente che è sempre in ascolto del primo 
    parametro fornito, ovvero auth (che cambia a tutti i divversi signi in o sign out)
    quindi al cambiare di auth esegu e la funzione callback
    l'unico problema è che dobbiamo indicare quando smettere di restare in ascolto, perchè 
    se la componente unmounta devo rimuovere anche il listener, cosa che faremo nel component
    dove andiamo ad utilizzarlo, grazie ad un metodo unsubscribe che ci fornisce firebase
*/
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
