import { Alert } from 'react-native'

const error_message_remap = [
  {
    search:
      "mobile number Emergency contact's phone number can not be the same as your own phone number",
    content:
      "Emergency contact's phone number cannot be the same as your own phone number",
    title: 'Invalid Number'
  },
  {
    search: '[auth/too-many-requests] We have blocked',
    content:
      'Too many requests from your device. Please try again later in in 10 minutes',
    title: 'Oops!'
  },
  {
    search: '[auth/',
    content:
      'Kindly check your phone number again. Please remove any special characters or spaces',
    title: 'Invalid Number'
  }
]

export const remapErrorMessage = (original: string) => {
  for (let i = 0; i < error_message_remap.length; i++) {
    const err = error_message_remap[i]
    if (original.toLowerCase().includes(err.search.toLowerCase())) return err
  }
  return {
    title: 'Oops!',
    content: original
  }
}

export const showErrorFromServer = (message: string) => {
  // @ts-ignore
  global.dont_show_fallback_error = true
  const error = remapErrorMessage(message)
  Alert.alert(
    error.title,
    error.content,
    [
      {
        text: 'OK',
        onPress: () => {
          // @ts-ignore
          global.dont_show_fallback_error = false
        }
      }
    ],
    { cancelable: false }
  )
}

export const showFallBackError = (number: number) => {
  console.log('showFallBackError ' + number)

  // @ts-ignore
  if (global.dont_show_fallback_error) return
  const number_string = number < 10 ? '0' + number : number
  Alert.alert(
    `Unexpected Error - E${number_string}`,
    `Oops, we encountered an unexpected error. Please try again by restarting the app or contact support@thoughtfull.world`
  )
}
