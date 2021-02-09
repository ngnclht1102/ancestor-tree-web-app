import UUIDGenerator from 'react-native-uuid-generator'

export async function generateUUID() {
  return await UUIDGenerator.getRandomUUID().then((uuid: string) => uuid)
}
