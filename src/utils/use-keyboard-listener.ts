import { useState, useEffect } from 'react'
import { Keyboard } from 'react-native'

const useKeyboardListener = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      }
    )
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      }
    )

    return () => {
      keyboardWillHideListener.remove()
      keyboardWillShowListener.remove()
    }
  }, [])

  return isKeyboardVisible
}

export default useKeyboardListener
