import { takeLatest, put, call, take, select } from 'redux-saga/effects'
import { INIT_APP } from '@/modules/app/actions'

function* initFlow(action: any) {
  console.log('INSIDE  initFlow FLOW OF SAGA')
}

function* initWatcher() {
  yield takeLatest(INIT_APP, initFlow)
}

export default initWatcher
