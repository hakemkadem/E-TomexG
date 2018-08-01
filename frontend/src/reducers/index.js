import {combineReducers} from 'redux';
import notes from './notes'
import owner from './owner'
import reducer from './counter'

const PonyApp=combineReducers({
notes,
owner,
reducer,
})

export default PonyApp;