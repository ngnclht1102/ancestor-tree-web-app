import analytics from '@react-native-firebase/analytics'
const trackingScreen = async (name: string) => {
  analytics().setAnalyticsCollectionEnabled(true)
  await analytics().setCurrentScreen(name, name)
}
export default trackingScreen
