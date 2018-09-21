import {combineReducers} from 'redux';
import notes from './notes'
import owner from './owner'
import reducer from './counter'
import auth from './auth'
import newUsers from './topex'

const PonyApp=combineReducers({
notes,
owner,
reducer,
auth,
newUsers
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
        state = undefined;
    }


  return PonyApp(state, action)
}


export default rootReducer;