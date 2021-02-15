import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from '@/configs/store.config'
import App from './app-4-themes-wrapper'

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
