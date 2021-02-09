import { takeLatest, put, call, take, select } from 'redux-saga/effects'
import * as t from '@/modules/app/actions'

export function* initFlow(action: any) {}

function* initWatcher() {
  yield takeLatest(t.INIT_APP, initFlow)
}

export default initWatcher
