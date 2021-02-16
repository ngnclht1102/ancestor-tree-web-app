import React, { useEffect } from 'react'
import { ImageProps, StyleSheet } from 'react-native'
import {
  Button,
  Icon,
  IconRegistry,
  Layout,
  Divider,
  Input,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { useDispatch } from 'react-redux'
import '@/configs/env.config'
import AppHeader from '@/components/header'

export default () => {
  const [value, setValue] = React.useState('')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader title="Sign in" />
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          LOGIN SCREEN
        </Text>
        <Text style={styles.text} category="s1">
          More smaller text
        </Text>
        <Input
          placeholder="Place your Text"
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />
        <Button style={styles.likeButton}>LOGIN</Button>
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
