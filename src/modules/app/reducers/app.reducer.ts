import * as t from '@/modules/app/actions'

export const initialState: App_State = {}

export default function App_Reducer(
  state = initialState,
  action: App_Action
): App_State {
  switch (action.type) {
    default:
      return state
  }
}
