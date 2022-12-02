// se devo filtrare dei dati che ricevo da api esterne è meglio farlo all'interno
// del nostro selector invece che nella utility di quella api, nel nostro caso
// firebase utils, quindi metto qua la logica di questo filto

// passo da questo
// export const selectCategoriesMap = (state) => state.categories.categoriesMap


/**
 
 cambiando in questo modo il codice, dobbiamo scendere ad un compromesso
 ovvero il re3render di tutto questo elemento tutte le volte che il reducer cambia, questo
 vogliamo evitarlo ed invochiamo una libreria di redux per aiutarci in ciò, utilizzando
 funzioni di memoaization, sostanzialmente all'eseguire di un comando nuovo, lo
 vado a storare in cache, in modo che se richiamo la stessa funzione, con gli sdtessi dati
 l'applicazione avrà subito a disposizione il risultato senza dover fare nuovi calcoli
 
 */
// a questo vedi spiegazione in firebase utils
// export const selectCategoriesMap = (state) => {
//     return state.categories.categories.reduce((acc, category) => {
//         const { title, items } = category
//         acc[title.toLowerCase()] = items
//         return acc
//     }, {})
// }

// per raggiungere il risultato finale con memoization delle categories
import { createSelector } from 'reselect'

const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
    /**
     un selector prende 2 parametri il primo è un array di input selectors
     sostanzialmente quello che andrò a memoizzare e che poi trasmetterò tramite
     il secondo argomento, che è l'output selector, selectCategoryReducer sarà uguale
     a categoriesSlice
     la funzione verrà rirunnato solo quando questi due valori saranno differenti 
     altrimenti redux non farà altro che displayare nuovamente lo stesso oggetto
     
     */
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

/**
  ora vado a scomporre nuovemnte creando un altro selector che saranno le mie categories
  
 */
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category) => {
        const { title, items } = category
        acc[title.toLowerCase()] = items
        return acc
    }, {})
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)