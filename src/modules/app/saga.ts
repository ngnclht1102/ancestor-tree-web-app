import { fork, spawn, all } from 'redux-saga/effects'
import initWatcher from '@/modules/app/init.saga'

function* rootSagas() {
  yield all([initWatcher()])
}
export default rootSagas
