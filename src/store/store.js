// questo sarà il file pricipale dove andrò a definire redux e tutte le sue ation

import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// con questo import vado a definire il  local storage che di default viene utilizzato in tutti i browser
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

// root-reducer è il reducer che va a contenere tutti i sotto reducer e crea lo stato globale accessibile ovuunque nell'app

// i middleware sono delle librerie che aiutano a capire il lavoro dei reducer nel nostro caso, infatti sono funzioni che vengono eseguite appena
// prima delle dispatch function che andranno ad aggiornare i lreducer
/**
 * voglio mostrare i console log del middleware solo in fase di development quindi setto questa condizione di ambiente
 * e filtro in questo modo, per far si che se non siamo in development non passi un valore di tipo false, così facendo passo un array vuoto
 */
const middlewares = [process.env.NODE_ENV !== 'development' && logger].filter(Boolean)
const composedEnhancer = compose(applyMiddleware(...middlewares))

const persistConfig = {
    key: 'root',
    storage, 
    // vado a definire cosa non voglio storare, perchè lo user si salva in con l'auth reducer
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store =  createStore(persistedReducer, undefined, composedEnhancer)
export const persistor = persistStore(store)
