import { USER_ACTION_TYPES } from "./user.types"

const INITIAL_STATE = {
    currentUser: null
}
/**
 * 
 * In redux tolgo il default throw error perchè lo switch type è globale, questo significa che la mia dispatch function in questo segmento non prenderà altro
 * fuori che SET_CURRENT_USER ma nel cart reducer invece ce ne saranno altri, e qusto porterebbe conflitto, quindi come default io ritorno lo state, che non 
 * sarà cambiato quindi react sa che non dovrò aggiornare nulla nelle user reducer, non avendo più lo use state del mio INITIAL_STATE, devo dichiarare il valore di 
 * default all'interno del reducer
 * 
 */
export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER :
            return {
                ...state,
                currentUser: payload
            }

        default : 
            return state
    }
}