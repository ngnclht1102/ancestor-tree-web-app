import React, { useEffect } from 'react'
import { ImageProps, StyleSheet } from 'react-native'
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Provider, useDispatch } from 'react-redux'
import store from '@/configs/store.config'
import * as eva from '@eva-design/eva'
import App from './app'
import { myTheme } from './themes'

export default (): React.ReactFragment => {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...myTheme }}>
        <App />
      </ApplicationProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  },
  likeButton: {
    marginVertical: 16
  }
})
