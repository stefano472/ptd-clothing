import { all, call } from "redux-saga/effects"

import { categoriesSaga } from "./categories/category.saga"

// una funzione con la star(*) definisce una generated 
// function da ES6 in poi

/**
 * the most common building block of a saga, a ganerator function
 * è una funzione simile all' async await 
 * (che è costruita on top a tanti generators)
 * solo che qui ho le capacità di mettere in pausa la risoluzione
 * dei comandi nella funzione utilizzando la parola chiave
 * yield all' interno ed invocandola dall' esterno 
 * grazie alla funzione .next()
 */
export function* rootSaga() {
    yield all([call(categoriesSaga)])
}