import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (anecdote) => {
  const object = {data: anecdote, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const anecdoteToVote = async (object) => {
  const response = await axios.get(`${baseUrl}/${object.id}`)
  return response.data
}

const voteAnecdote = async (anecdote) => {
  const object = {...anecdote, votes: anecdote.votes+1}
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data
}

const objectExport = { getAll, createNew, anecdoteToVote, voteAnecdote }

export default objectExport