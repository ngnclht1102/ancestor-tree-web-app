import { createAction } from '@/modules/app/utils/create-action'
import { takeLatest, put, call, take, select, delay } from 'redux-saga/effects'
import {
  AUTHENTICATION_CHECK_STATE_REQUEST,
  AUTHENTICATION_CHECK_STATE_SUCCESS,
  AUTHENTICATION_CHECK_STATE_FAILED
} from '../actions'
import { loadAccessToken } from '../apis/storage'

function* checkAuthenticationStateFlow(action: any) {
  try {
    console.log('INSIDE  checkAuthenticationStateFlow')
    const accessToken = yield call(loadAccessToken)
    if (accessToken)
      yield put(createAction(AUTHENTICATION_CHECK_STATE_SUCCESS, accessToken))
    else yield put(createAction(AUTHENTICATION_CHECK_STATE_SUCCESS, null))
  } catch (error) {
    yield put(createAction(AUTHENTICATION_CHECK_STATE_FAILED, error.message))
  }
}

function* checkAuthenticationStateWatcher() {
  yield takeLatest(
    AUTHENTICATION_CHECK_STATE_REQUEST,
    checkAuthenticationStateFlow
  )
}

export default checkAuthenticationStateWatcher
