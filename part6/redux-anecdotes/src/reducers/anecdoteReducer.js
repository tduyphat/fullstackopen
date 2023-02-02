import anecdoteService from '../services/anecdotes'
import { createNotification } from './notificationReducer'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'LIKE':
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote: action.data)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANEC':
      return action.data
    default:
      return state
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.anecdoteToVote({id})
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdoteToVote)
    dispatch({
      type: 'LIKE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
    dispatch(createNotification(`a new anecdotes '${newAnecdote.data}' has been created`, 5000))
  }
}

export default anecdoteReducer