import React, { useEffect } from 'react'
import { ImageProps, StyleSheet } from 'react-native'
import { Button, Icon, IconRegistry, Layout, Text } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { useDispatch } from 'react-redux'
import * as eva from '@eva-design/eva'
import { myTheme } from './themes'
import { INIT_APP } from './actions'

export default () => {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: INIT_APP
      })
    }, 1000)
  }, [])
  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category="h1">
        Welcome to UI Kitten 😻
      </Text>
      <Text style={styles.text} category="s1">
        Start with editing App.js to configure your App
      </Text>
      <Text style={styles.text} appearance="hint">
        For example, try changing theme to Dark by using eva.dark
      </Text>
      <Button style={styles.likeButton}>LIKE</Button>
    </Layout>
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
