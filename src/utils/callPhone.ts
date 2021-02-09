import { Linking, Alert, Platform } from 'react-native'
import { bugsnag } from './errors'

export const callNumber = (phone: string) => {
  let phoneNumber = phone
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`
  } else {
    phoneNumber = `tel:${phone}`
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Phone number is not available')
      } else {
        return Linking.openURL(phoneNumber)
      }
    })
    .catch((err) => {
      bugsnag().notify(new Error(err))
      console.log(err)
    })
}
