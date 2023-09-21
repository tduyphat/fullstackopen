import blogService from '../services/blogs'
import loginService from '../services/login'
import registerService from '../services/register'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT_USER':
    return action.data
  case 'SET_USER':
    return action.data
  case 'NEW_USER':
    return action.data
  case 'LOG_OUT':
    return null
  default:
    return state
  }
}

export const initUser = () => {
  return async dispatch => {
    let user = null
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if(loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    dispatch({
      type: 'INIT_USER',
      data: user
    })
  }
}

export const setUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    blogService.setToken(user.token)
    window.localStorage.setItem(
      'loggedBlogsUser', JSON.stringify(user)
    )
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const newUser = (username, name, password) => {
  return async dispatch => {
    const user = await registerService.register({
      username, name, password
    })
    dispatch({
      type: 'NEW_USER',
      data: user
    })
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch({
      type:'LOG_OUT'
    })
  }
}

export default userReducer