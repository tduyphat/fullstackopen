import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { combineReducers } from 'redux'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    keyword: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
)

export default store