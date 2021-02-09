/**
 * Helper to Save, Load, Delete data from local storage
 */
import { AsyncStorage } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const ACCESS_TOKEN = '@app-v2:ACCESS_TOKEN'
export const IS_FIRST_TIME = '@app-v2:IS_FIRST_TIME'
export const FIRST_DEEP_LINK = '@app-v2:FIRST_DEEP_LINK'
export const SHOULD_OPEN_WELCOME_TO_ACTIVITY_CENTER_POPUP =
  '@app-v2:SHOULD_OPEN_WELCOME_TO_ACTIVITY_CENTER_POPUP'
export const FIRST_INSTALL_AT_BUILD = '@app-v2:FIRST_INSTALL_AT_BUILD'

// needed for code push
export async function setFirstInstallAtWhatBuild() {
  const firstInstallAtBuild = await AsyncStorage.getItem(FIRST_INSTALL_AT_BUILD)
  console.log('inside setFirstInstallAtWhatBuild')
  console.log(
    'inside setFirstInstallAtWhatBuild ALREADY SET BUILD',
    firstInstallAtBuild
  )
  if (!firstInstallAtBuild) {
    console.log(
      'inside setFirstInstallAtWhatBuild SET BUILD',
      DeviceInfo.getBuildNumber()
    )
    await AsyncStorage.setItem(
      FIRST_INSTALL_AT_BUILD,
      DeviceInfo.getBuildNumber()
    )
  }
}

export async function saveFirstTimeActivity(firstTime: string) {
  return await AsyncStorage.setItem(
    SHOULD_OPEN_WELCOME_TO_ACTIVITY_CENTER_POPUP,
    firstTime
  )
}

export async function loadFirstTimeActivity() {
  return await AsyncStorage.getItem(
    SHOULD_OPEN_WELCOME_TO_ACTIVITY_CENTER_POPUP
  )
}

export async function saveAccessToken(accessToken: string) {
  return await AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
}

export async function loadAccessToken() {
  return await AsyncStorage.getItem(ACCESS_TOKEN)
}

export async function removeAccessToken() {
  return await AsyncStorage.removeItem(ACCESS_TOKEN)
}

export async function isFirstTime() {
  return await AsyncStorage.getItem(IS_FIRST_TIME)
}

export async function setFirstTime(value: boolean) {
  return await AsyncStorage.setItem(IS_FIRST_TIME, value ? 'true' : 'false')
}

export async function saveFirstDeepLink(Deeplink: string) {
  return await AsyncStorage.setItem(FIRST_DEEP_LINK, Deeplink)
}

export async function loadFirstDeepLink() {
  return await AsyncStorage.getItem(FIRST_DEEP_LINK)
}
