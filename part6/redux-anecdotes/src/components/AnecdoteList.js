import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()
    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }
    return (
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    return (
        <>
        {anecdotes.sort((mine, yours) => yours.votes - mine.votes) 
        .map(anecdote =>
            <Anecdote anecdote={anecdote} key={anecdote.id}/>
            )}
        </>
    )
}

export default AnecdoteList