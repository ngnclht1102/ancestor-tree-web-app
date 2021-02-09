import { fork, spawn } from 'redux-saga/effects'
import app_init_watcher from '@/modules/app/init.saga'

function* rootSagas() {
  yield [app_init_watcher]
}
export default rootSagas
