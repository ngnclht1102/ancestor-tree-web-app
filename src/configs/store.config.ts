import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducers from '@/modules/app/reducers'
import rootSagas from '@/modules/app/saga'
import midlewares from '@/redux-middlewares'
import Reactotron from '@/configs/reactoron.config'

var store: any = null

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, ...midlewares]

const configureStore = () => {
  if (store) return store
  let enhancers

  if (__DEV__) {
    const composeWithDevTools = require('redux-devtools-extension')
      .composeWithDevTools
    enhancers = composeWithDevTools(
      applyMiddleware(...middlewares),
      // @ts-ignore
      Reactotron.createEnhancer()
    )
  } else {
    // production env - exclude dev tools
    enhancers = compose(applyMiddleware(...middlewares))
  }

  // @ts-ignore
  store = createStore(rootReducers, enhancers)

  sagaMiddleware.run(rootSagas)
  return store
}
export default configureStore()
