import {combineReducers} from 'redux';
import notes from './notes'
import owner from './owner'
import reducer from './counter'
import auth from './auth'
import newUsers from './topex'
import companyStore from './companyStore'

const PonyApp=combineReducers({
notes,
owner,
reducer,
auth,
newUsers,
companyStore

})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
        state = undefined;
    }

 if (action.type === 'REFETCHING_COMPANY_STORE') {
         state['companyStore']=undefined;

    }


  return PonyApp(state, action)
}


export default rootReducer;