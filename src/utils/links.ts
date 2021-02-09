import { Linking, Platform } from 'react-native'
import Config from '@/configs/evn.config'

const isIOS = Platform.OS === 'ios'

export const openContact = () => {
  Linking.openURL('https://www.thoughtfull.world/contact-us').catch((err) =>
    console.error('An error occurred', err)
  )
}

export const openStore = () => {
  try {
    Linking.openURL(
      isIOS
        ? `itms-apps://itunes.apple.com/us/app/${Config.IOS_APP_ID}?mt=8`
        : `market://details?id=${Config.ANDROID_APP_ID}`
    )
  } catch (error) {}
}
