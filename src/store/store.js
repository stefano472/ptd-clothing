// questo sarà il file pricipale dove andrò a definire redux e tutte le sue ation

import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

// root-reducer è il reducer che va a contenere tutti i sotto reducer e crea lo stato globale accessibile ovuunque nell'app

// i middleware sono delle librerie che aiutano a capire il lavoro dei reducer nel nostro caso, infatti sono funzioni che vengono eseguite appena
// prima delle dispatch function che andranno ad aggiornare i lreducer
const middlewares = [logger]
const composedEnhancer = compose(applyMiddleware(...middlewares))

export const store =  createStore(rootReducer, undefined, composedEnhancer)
