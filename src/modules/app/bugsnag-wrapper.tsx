import React, { useEffect } from 'react'
import { ImageProps, StyleSheet, View, Text } from 'react-native'
import AppWithReduxWrapper from './redux-wrapper'
import Bugsnag from '@bugsnag/react-native'
import BugsnagPluginReact from '@bugsnag/plugin-react'

Bugsnag.start({
  plugins: [new BugsnagPluginReact()]
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
