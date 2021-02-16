import { fork, spawn, all } from 'redux-saga/effects'
import initWatcher from '@/modules/app/init.saga'
import authWatchers from '@/modules/authentication/sagas'

function* rootSagas() {
  yield all([initWatcher(), ...authWatchers])
}
export default rootSagas
