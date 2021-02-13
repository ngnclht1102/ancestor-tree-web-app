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

export default () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <AppWithReduxWrapper />
    </ErrorBoundary>
  )
}

const ErrorView = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text>There is an error!</Text>
    </View>
  )
}
