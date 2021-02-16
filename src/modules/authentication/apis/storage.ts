/**
 * Helper to Save, Load, Delete data from local storage
 */
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ACCESS_TOKEN = '@app-v1:ACCESS_TOKEN'

export async function saveAccessToken(accessToken: string) {
  return await AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
}

export async function loadAccessToken() {
  return await AsyncStorage.getItem(ACCESS_TOKEN)
}

export async function removeAccessToken() {
  return await AsyncStorage.removeItem(ACCESS_TOKEN)
}
