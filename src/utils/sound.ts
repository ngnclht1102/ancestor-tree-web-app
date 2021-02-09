import { Platform, AppState } from 'react-native'
import { bugsnag } from '@/utils'

const isIOS = Platform.OS === 'ios'
const playNotificationSound = () => {
  try {
    const currentAppState = AppState.currentState
    if (currentAppState !== 'active') return
    console.log('inside playNotificationSound')
    const Sound = require('react-native-sound')

    Sound.setCategory('Ambient')

    const notification = new Sound(
      'notification.mp3',
      isIOS ? encodeURIComponent(Sound.MAIN_BUNDLE) : Sound.MAIN_BUNDLE,
      (error: any) => {
        if (error) {
          console.log('failed to load the sound', error.message)
          return
        }
        // loaded successfully
        console.log(
          'duration in seconds: ' +
            notification.getDuration() +
            'number of channels: ' +
            notification.getNumberOfChannels()
        )

        // Play the sound with an onEnd callback
        notification.play((success: boolean) => {
          if (success) {
            console.log('successfully finished playing')
          } else {
            console.log('playback failed due to audio decoding errors')
            bugsnag().notify(
              new Error('playback failed due to audio decoding errors')
            )
          }
        })
      }
    )
  } catch (e) {
    console.log(`cannot play the sound file`, e.message)
    bugsnag().notify(new Error(e.message))
  }
}

module.exports = playNotificationSound
