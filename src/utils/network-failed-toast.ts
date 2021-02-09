// @ts-ignore
import Toast from 'react-native-toast-message'

const networkErrorToast = {
  showing: false
}

export const showNetWorkDisconnectedToast = () => {
  if (networkErrorToast.showing) return
  networkErrorToast.showing = true
  Toast.show({
    type: 'error',
    text1: 'Disconnected',
    position: 'bottom',
    autoHide: false,
    bottomOffset: 100,
    text2: 'Network unavailable, please reconnect.',
    onHide: () => {
      networkErrorToast.showing = false
    }
  })
}
