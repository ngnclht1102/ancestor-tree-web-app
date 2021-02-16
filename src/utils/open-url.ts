import { Linking } from 'react-native'

export async function openUrl(url: string) {
  // check if we can use this link
  const canOpen = await Linking.canOpenURL(url)
  if (!canOpen) {
    return
  }

  return Linking.openURL(url)
}
