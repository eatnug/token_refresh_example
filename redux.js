import { rootReducer, rootSaga } from './reducer'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleWare = createSagaMiddleware()
export const store = createStore(combineReducers({root:rootReducer}), applyMiddleware(sagaMiddleWare))
sagaMiddleWare.run(rootSaga)