import { combineReducers } from "redux";

import { userReducer } from './user/user.reducer'

// il mio root reducer andrà a prendere tutti i reducer importati e li esporta con la chiave corrispettiva, essendo un oggetto
export const rootReducer = combineReducers({
    user: userReducer
})