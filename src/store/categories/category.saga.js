import { takeLatest, all, call, put } from "redux-saga/effects"

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"

import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action"

import { CATEGORIES_ACTION_TYPES } from "./category.types"


// export const fetchCategoriesAsync = () => async (dispatch) => { 
//     dispatch(fetchCategoriesStart())

//     try {
//         const categoriesArray = await getCategoriesAndDocuments("categories")
//         dispatch(fetchCategoriesSuccess(categoriesArray))
//     } catch(error) {
//         dispatch(fetchCategoriesFailed(error))
//     }
// }

/**
 * essendo i generator la base per le async await function, non posso utilizzare la stessa sintassi qua dentro
 * invece mettto in pausa con lo yield e siccome aspetto una risposta da una funzione utilizzo anche il call,
 * che è il metodo per generare un effect può aspettarsi due parametri, il prima è la funzione da chiamare
 * il secondo sono i parametri che questa funzione si aspetta
 * yield sostanzialmente aspetta che la funzione mi torni indietro con qualcosa
 * in un generator poi non utiliZzo il dispatch ma il put method
 */

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, "categories")
        yield put(fetchCategoriesSuccess(categoriesArray))
    } catch(error) {
        yield put(fetchCategoriesFailed(error))
    }
}

export function* onFetchCategories() {
    // con takeLatest ricevo delle funzioni, ma prendo in considerazione solo l'ultima,
    // prende due argomenti, il primo è da dove inizia il ciclo, dallo  start ed il secondo come 
    // continua lo sviluippo
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    // con all runno tutto quello che c'è all'interno e non vado avanti con l'esecuzione di 
    // questa funzione fino a quando non ho finito i calcoli dell'all, sostanzialmente mette in pausa 
    // fino a quando non completo quello che c'è all'interno delle quadre
    yield all([call(onFetchCategories)])
}