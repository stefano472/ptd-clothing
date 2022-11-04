import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext(
    {
        categoriesMap: {},
        // setCategoriesMap: () => null
    }
)

export const CategoriesProvider = ({children}) => {
    const [ categoriesMap, setCategoriesMap ] = useState({})

    const value = { categoriesMap }

    useEffect(() => {
        /**
         * 
            una volta eseguito questo useEffect posso disattivarlo, perche altrimenti 
            mi cercherà di sovrascrivere i file tutte le volte quest afunz mi è servita per
            poopolare il mio db
            addCollectionAndDocuments('categories', SHOP_DATA)
         */

        /**
         * 
            quando utilizzo un a funz asincrona all'interno di un useEffect mai dichiararla 
            direttamente, invece renderla asincrona all'interno di una nostra funzione
         */
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            // console.log(categoryMap)
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()

    }, [])

    return <CategoriesContext.Provider value={value} >{children}</CategoriesContext.Provider>
}