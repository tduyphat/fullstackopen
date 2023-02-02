// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     data: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'LIKE':
      let votedAnecdote = state.find(anecdote => anecdote.id === action.data.id)
      votedAnecdote = {...votedAnecdote, votes: votedAnecdote.votes+1}
      return state.map(anecdote => anecdote.id !== votedAnecdote.id ? anecdote: votedAnecdote)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANEC':
      return action.data
    default:
      return state
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANEC',
    data: anecdotes
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'LIKE',
    data: {
      id: id
    }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    data: anecdote
  }
}

export default anecdoteReducer