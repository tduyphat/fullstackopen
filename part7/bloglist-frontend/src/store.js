import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import successReducer from './reducers/successReducer'
import errorReducer from './reducers/errorReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
  successMess: successReducer,
  errorMess: errorReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store