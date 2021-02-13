import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Linking,
  Platform,
  Text,
  View
} from 'react-native'
import codePush from 'react-native-code-push'
import ProgressCircle from 'react-native-progress-circle'
import Splash from '@/modules/app/splash'
import Config from '@/configs/env.config'

console.disableYellowBox = true

const isIOS = Platform.OS === 'ios'

interface State {
  percents: number
  status: any
  content: any
}

const styles = StyleSheet.create({
  update: {
    position: 'absolute',
    bottom: 20,
    color: '#928F8F'
  },
  txtAlign: {
    textAlign: 'center'
  }
})

class CodepushWrapper extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      status: codePush.SyncStatus.CHECKING_FOR_UPDATE,
      percents: 0,
      content: null
    }
  }

  openStore = () => {
    try {
      Linking.openURL(
        isIOS
          ? `itms-apps://itunes.apple.com/us/app/${Config.APPLE_APP_ID}?mt=8`
          : `market://details?id=${Config.ANDROID_APP_ID}`
      )
    } catch (error) {}
  }

  codePushStatusDidChange(status: number) {
    this.setState({ status })
    const { percents } = this.state
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({
          content: (
            <Text style={[styles.update, styles.txtAlign]}>
              Checking for updates...
            </Text>
          )
        })
        break
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({
          content: <ActivityIndicator style={styles.update} color="#e1e1e1" />
        })
        break
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('codePush Installing update.')
        this.setState({
          content: (
            <ProgressCircle
              percent={percents}
              radius={10}
              borderWidth={8}
              color="#60B5F6"
              shadowColor="white"
              bgColor="transparent"
              containerStyle={styles.update}
            />
          )
        })
        break
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('codePush Update installed.')
        if (!isIOS) codePush.restartApp()
        break
      default:
        this.setState({
          content: null
        })
        break
    }
  }

  codePushDownloadDidProgress(progress: any) {
    console.log(
      progress.receivedBytes + ' of ' + progress.totalBytes + ' received.'
    )
    this.setState({
      percents: Math.floor((progress.receivedBytes / progress.totalBytes) * 100)
    })
  }

  render() {
    const { content, status } = this.state
    if (
      status == codePush.SyncStatus.UP_TO_DATE ||
      status == codePush.SyncStatus.UPDATE_IGNORED ||
      status == codePush.SyncStatus.UNKNOWN_ERROR
    ) {
      const App = require('../app/bugsnag-wrapper')
      return <App />
    }
    return <Splash fromCodepushWrapper={true}>{content}</Splash>
  }
}
// @ts-ignore
export default codePush({
  installMode: codePush.InstallMode.IMMEDIATE
})(CodepushWrapper)
