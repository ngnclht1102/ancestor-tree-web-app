import images from '@/assets/images'
import store from '@/configs/store.config'
import * as t from '@/actionTypes'
import actions from '@/actions'
import global from '@/global'

const showSuccess = (
  show: any,
  title?: string,
  message?: string,
  buttonTitle?: string,
  buttonCallback?: () => void
) => {
  const defaultCallback = () => {
    // @ts-ignore
    store.dispatch(actions[t.BACK]())
  }
  // @ts-ignore
  show({
    title: title || 'Success!',
    subTitle: message || 'Somethings bad happened',
    icon: global.isUserApp() ? images.mascotHappy : images.profMascotHappy,
    buttonTitle: buttonTitle || 'Done',
    buttonCallback: buttonCallback || defaultCallback
  })
}

export default showSuccess
