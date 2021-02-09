import images from '@/assets/images'

const showError = (
  show: any,
  title?: string,
  message?: string,
  buttonTitle?: string,
  buttonCallback?: () => void,
  secondButtonTitle?: string,
  secondButtonCallback?: () => void,
  icon?: any
) => {
  // @ts-ignore
  show({
    title: title || 'Ooops!',
    subTitle: message || 'Somethings bad happened',
    icon: icon || images.mascotSad,
    buttonTitle: buttonTitle || 'Try again',
    buttonCallback,
    secondButtonTitle,
    secondButtonCallback
  })
}

export default showError
