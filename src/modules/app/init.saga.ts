// import { delay } from 'redux-saga'
import { takeLatest, put, call, take, select, delay } from 'redux-saga/effects'
import { INIT_APP } from '@/modules/app/actions'
import { app_navigate } from './navigation/navigation-service'
import { SCREEN_HOME } from './screens'

function* initFlow(action: any) {
  console.log('INSIDE  initFlow start showing splash screen')

  // pause the app to show splash screen
  yield delay(1000)
  console.log('INSIDE  initFlow finished showing splash screen')
  app_navigate(SCREEN_HOME)
}

function* initWatcher() {
  yield takeLatest(INIT_APP, initFlow)
}

export default initWatcher
