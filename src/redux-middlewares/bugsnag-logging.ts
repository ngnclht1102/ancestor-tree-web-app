import Bugsnag from '@bugsnag/react-native'

const logger = (store: any) => (next: any) => (action: any) => {
  try {
    Bugsnag.leaveBreadcrumb(action.type, action)
    let result = next(action)
    return result
  } catch (err) {
    console.log('Caught an exception!', err)
    Bugsnag.notify(err)
  }
}

export default logger
