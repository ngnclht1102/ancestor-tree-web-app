import React, { useEffect } from 'react'
import { ImageProps, StyleSheet, Text, View } from 'react-native'

export default () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.text} category="h1">
          Welcome to APP- this is home screen 😻
        </Text>
        <Text style={styles.text} category="s1">
          Start with editing App.js to configure your App
        </Text>
        <Text style={styles.text} appearance="hint">
          For example, try changing theme to Dark by using eva.dark
        </Text>
      </View>
    </View>
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
