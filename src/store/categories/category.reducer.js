import { CATEGORIES_ACTION_TYPES } from "./category.types"

export const CATEGORIES_INITIAL_STATE = {
    categories: [], 
    isLoading: false,
    error: null
    // aggiungo queste due voci allo state con redux thunk in modo di non andare 
    // così posso monitorare lo stato di loading delle mie categories
    // e siccome utilizzo funz asincrone per fetcharle posso anche catchare
    // eventuali error
}

export const categoriesReducer = ( state = CATEGORIES_INITIAL_STATE, action) => {
    const { type, payload } = action

    switch(type) {
        // case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
        //     return { ...state, categories: payload}
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START: 
            return { ...state, isLoading: true}
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS: 
            return { ...state, categories: payload, isLoading: false}
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED: 
            return { ...state, error: payload, isLoading: false}
        default : 
            return state
    }
}