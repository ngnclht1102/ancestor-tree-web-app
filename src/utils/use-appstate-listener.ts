import { useState, useEffect } from 'react'
import { AppState } from 'react-native'

const useAppStateListener = (callback?: (state: string) => void) => {
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    callback && callback(appState)
  }, [appState])

  useEffect(() => {
    AppState.addEventListener('change', setAppState)
    return () => {
      AppState.removeEventListener('change', setAppState)
    }
  }, [])

  return appState
}

export default useAppStateListener
