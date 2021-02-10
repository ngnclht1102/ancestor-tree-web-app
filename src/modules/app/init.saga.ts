import { takeLatest, put, call, take, select } from 'redux-saga/effects'
import * as t from '@/modules/app/actions'

function* initFlow(action: any) {
  console.log('INSIDE  initFlow FLOW OF SAGA')
}

function* initWatcher() {
  yield takeLatest(t.INIT_APP, initFlow)
}

export default initWatcher
