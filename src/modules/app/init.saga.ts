// import { delay } from 'redux-saga'
import { takeLatest, put, call, take, select, delay } from 'redux-saga/effects'
import { INIT_APP } from '@/modules/app/actions'
import { app_navigate } from './navigation/navigation-service'
import { SCREEN_HOME } from './screens'
import { SCREEN_AUTHENTICATION_SIGNIN } from '../authentication/screens'
import { createAction } from './utils/create-action'
import {
  AUTHENTICATION_CHECK_STATE_REQUEST,
  AUTHENTICATION_CHECK_STATE_SUCCESS
} from '../authentication/actions'

function* initFlow(action: any) {
  console.log('INSIDE  initFlow start showing splash screen')
  // tell authentication module to check authentication state
  yield put(createAction(AUTHENTICATION_CHECK_STATE_REQUEST))
  const checkResult = yield take(AUTHENTICATION_CHECK_STATE_SUCCESS)
  const accessToken = checkResult?.payload

  yield delay(1000)
  if (accessToken) {
    app_navigate(SCREEN_HOME)
  } else {
    app_navigate(SCREEN_AUTHENTICATION_SIGNIN)
  }
}

function* initWatcher() {
  yield takeLatest(INIT_APP, initFlow)
}

export default initWatcher
