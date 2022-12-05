// questo sarà il file pricipale dove andrò a definire redux e tutte le sue ation

import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// con questo import vado a definire il  local storage che di default viene utilizzato in tutti i browser
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'
// il thunk è un cugino di redux saga, solo che quest' ultimo
// è molto più completa e con molte più funzionalità, quindi a
// questo punto lo commentiamo
// import thunk from 'redux-thunk'
import createSagaMiddleware from '@redux-saga/core'

import { rootSaga } from './root-saga'

// root-reducer è il reducer che va a contenere tutti i sotto reducer e crea lo stato globale accessibile ovuunque nell'app

// i middleware sono delle librerie che aiutano a capire il lavoro dei reducer nel nostro caso, infatti sono funzioni che vengono eseguite appena
// prima delle dispatch function che andranno ad aggiornare i lreducer
/**
 * voglio mostrare i console log del middleware solo in fase di development quindi setto questa condizione di ambiente
 * e filtro in questo modo, per far si che se non siamo in development non passi un valore di tipo false, così facendo passo un array vuoto
 */

const persistConfig = {
    key: 'root',
    storage, 
    // vado a definire cosa non voglio storare, perchè lo user si salva in con l'auth reducer
    // blacklist: ['user']
    // vado a definire cosa voglio storare
    whitelist: ['cart']

}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean)
const composedEnhancer = compose(applyMiddleware(...middlewares))

export const store =  createStore(persistedReducer, undefined, composedEnhancer)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
