import React, { useEffect } from 'react'
import { ImageProps, StyleSheet } from 'react-native'
import {
  Button,
  Icon,
  IconRegistry,
  Layout,
  Divider,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { useDispatch } from 'react-redux'
import '@/configs/env.config'
import AppHeader from '../../components/header'

export default () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader title="Home" />
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Welcome to APP- this is home screen 😻
        </Text>
        <Text style={styles.text} category="s1">
          Start with editing App.js to configure your App
        </Text>
        <Text style={styles.text} appearance="hint">
          For example, try changing theme to Dark by using eva.dark
        </Text>
        <Button style={styles.likeButton}>LIKE</Button>
      </Layout>
    </SafeAreaView>
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
