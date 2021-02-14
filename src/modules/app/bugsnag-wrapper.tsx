import React, { useEffect } from 'react'
import { ImageProps, StyleSheet, View, Text } from 'react-native'
import store from '@/configs/store.config'
import Bugsnag from '@bugsnag/react-native'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import AppWithReduxWrapper from './redux-wrapper'

Bugsnag.start({
  plugins: [new BugsnagPluginReact()],
  onError: function (event) {
    event.addMetadata('store', store.getState())
    return true
  }
})

// @ts-ignore
const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

const ErrorView = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>There is an error!</Text>
    </View>
  )
}

// @ts-ignore
module.exports = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <AppWithReduxWrapper />
    </ErrorBoundary>
  )
}
