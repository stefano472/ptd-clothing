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

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection, 
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'


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
// un db in firestore ha 3 elementi collection, document, data noSql db non relazionale
// collection è la tabella(nel nostro es users) che accumuna tutti i document
// document è il singolo el all'interno della tabella (nel nostro es user), che deve avere unique ID
// data sono i valori che identificato il nostro user (id, name , role, ecc...)

/**
 * quest a funzione la utilizzerò per aggiungere una nuova collection nel mio db con i relativi 
 * documents infatti siccome comunica con una fonte esterna la renderò async e gli passerò 
 * come due argmenti il nome della collection e come oggetti i documents
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // in questo modo vado a creare la collection mandandola al nostro db
    const collectionRef = collection(db, collectionKey)

    /**
     * successivamente vado a creare un batch in modo da essere sicuri che tutti documents 
     * vengano scritti nella maniere corretta (l'intero processo è definito come 'transaction
     * succeded') se anche solo un elemento non viene scritto nella maniera corretta, vuoi
     * per problemi di rete o altro, il processo viene interrrotto
     */
    const batch = writeBatch(db)

    // l'object che mando sarà il nostro SHOP_DATA js file se noto bene sono 5 oggetti
    // ognuno con title ed un items array 
    objectsToAdd.forEach((object) => {
        /**
         * successivamente creo una documents ref attaccandomi alla collection, che ha il riferimento al db
         * e gli assegno un titolo come sotto  quando ho inserito 'users' solo che in questo caso sarà 
         * preso dal mio object con object.title e lo rendo a lower case
         * ora posso settare il batch dandogli questa doc ref e l'oggetto stesso 
         */
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    }) 

    // dovendo aspetare che cicli tutto faccio l'await per il mio commit
    await batch.commit()
    console.log('batch done')

}

export const getCategoriesAndDocuments = async () => {
    const q = query(collection(db, "categories"));

    const querySnapshot = await getDocs(q);
    /**
        Il metodo .data() fa sostanzialmete a prendermi i dati all'interno del document 
        selezionato nel mio caso quello alla posizione zero
        console.log(querySnapshot.docs[0].data())
     */

    /**
     * versione semplificata da firebase qui ottengo 5 oggetti con due key
     * title con la string e items con i prodotti 
         querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
        });
     * 
     */

    // qui voglio invece ridurre il mio result in base alle categories
    // qua invece ottengo 1 oggetto con 5 key (i title) che hanno come valore un array di items(prodotti)
    const categoriesArray = querySnapshot.docs.map(docSnapshot => docSnapshot.data())
    
    // .reduce((acc, doc) => {
    //     const { title, items } = doc.data()
    //     // a questo punto vado a settare l'accumulator, e dico alla key equivalente al title,
    //     // gli vado ad associare i miei items nel quale ci sono tutti i dati
    //     acc[title.toLowerCase()] = items
    //     return acc
    // }, {})

    return categoriesArray
    // con quest'ultimo cambiamento la funz getCategoriesand document ritornerà un array di categories
    // invece che un oggetto
}

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
