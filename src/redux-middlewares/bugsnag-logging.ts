import { bugsnag } from '../errors'

const logger = (store) => (next) => (action) => {
  try {
    bugsnag().leaveBreadcrumb(action.type, action)
    let result = next(action)
    return result
  } catch (err) {
    console.log('Caught an exception!', err)
    bugsnag().notify(err)
  }
}

export default logger
