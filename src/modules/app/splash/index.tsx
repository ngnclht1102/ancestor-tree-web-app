import React, { useEffect, useState } from 'react'
import { View, Image, Text, StatusBar } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import CodePush from 'react-native-code-push'
import styles from './styles'

interface SplashScreenProps {
  children?: any
  fromCodepushWrapper: boolean
}

const SplashScreen = (props: SplashScreenProps) => {
  const [state, setState] = useState({
    label: '',
    version: '',
    description: ''
  })

  useEffect(() => {
    console.log('inside SPLASH fromCodepushWrapper', props.fromCodepushWrapper)

    CodePush.getUpdateMetadata().then((metadata: any) => {
      setState({
        label: metadata ? metadata.label : '',
        version: metadata ? metadata.appVersion : '',
        description: metadata ? metadata.description : ''
      })
    })
    if (!props.fromCodepushWrapper) {
      console.log('inside SPLASH, not from codepush wrapper')
    }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.txt}>MY APP</Text>
      <View style={styles.bottomView}>
        <Text style={styles.version}>
          {DeviceInfo.getVersion()}.{state.label ? state.label : ''}
          {DeviceInfo.getBuildNumber()}
        </Text>
        {props.children}
      </View>
    </View>
  )
}

export default SplashScreen
