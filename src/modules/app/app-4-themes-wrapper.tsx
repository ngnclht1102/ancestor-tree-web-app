import React, { useEffect } from 'react'
import { ImageProps, StyleSheet, Appearance } from 'react-native'
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text
} from '@ui-kitten/components'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Provider, useDispatch } from 'react-redux'
import * as eva from '@eva-design/eva'
import App from './app-main'
import dark from './themes/dark'
import light from './themes/light'

const colorScheme = Appearance.getColorScheme()

export default () => {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={colorScheme === 'dark' ? dark : dark}
      >
        <App />
      </ApplicationProvider>
    </SafeAreaProvider>
  )
}
