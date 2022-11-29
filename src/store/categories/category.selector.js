// se devo filtrare dei dati che ricevo da api esterne è meglio farlo all'interno
// del nostro selector invece che nella utility di quella api, nel nostro caso
// firebase utils, quindi metto qua la logica di questo filto

// passo da questo
// export const selectCategoriesMap = (state) => state.categories.categoriesMap

// a questo vedi spiegazione in firebase utils
export const selectCategoriesMap = (state) => {
    return state.categories.categories.reduce((acc, category) => {
        const { title, items } = category
        acc[title.toLowerCase()] = items
        return acc
    }, {})
}

/**
 
 cambiando in questo modo il codice, dobbiamo scendere ad un compromesso
 ovvero il re3render di tutto questo elemento tutte le volte che il reducer cambia, questo
 vogliamo evitarlo ed invochiamo una libreria di redux per aiutarci in ciò
 
*/