import { combineReducers } from 'redux'
// app level reducer
import app from '@/modules/app/reducers/app.reducer'

const state = {
  app
}

const rootReducer = combineReducers(state)

export default rootReducer
