// @ts-ignore
import PushNotification from 'react-native-push-notification'

export const setAppIconBadgeNumber = (number: number) => {
  console.log('INSIDE setAppIconBadgeNumber', number)

  PushNotification.setApplicationIconBadgeNumber(number)
}
