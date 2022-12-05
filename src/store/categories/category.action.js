import { CATEGORIES_ACTION_TYPES } from "./category.types";

// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

// export const setCategories = (categoriesArray) => {
//     return {
//         type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
//         payload: categoriesArray
//     }
// }

export const fetchCategoriesStart = () => {
    return {
        type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    }
}

export const fetchCategoriesSuccess = (categoriesArray) => {
    return {
        type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
        payload: categoriesArray
    }
}

export const fetchCategoriesFailed = (error) => {
    return {
        type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
        payload: error
    }
}

/**
 * ho creato queste 3 nuove funzioni per la migrazione all' utilizzo di 
 * redux-thunk, quindi qui di seguito creo la mia thunk function asyncrona 
 * sostanzialmente sarà una function che ritorna una function asincrona a cui 
 * farò fare il dispatch
 */

// a questo punto procedo a trasferire la mia thunk function
// to saga

// export const fetchCategoriesAsync = () => async (dispatch) => { 
//     dispatch(fetchCategoriesStart())

//     try {
//         const categoriesArray = await getCategoriesAndDocuments("categories")
//         dispatch(fetchCategoriesSuccess(categoriesArray))
//     } catch(error) {
//         dispatch(fetchCategoriesFailed(error))
//     }
// }