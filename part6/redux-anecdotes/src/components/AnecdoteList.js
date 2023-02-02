import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote}) => {
    
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(createNotification(`you voted '${anecdote.data}'`))
        setTimeout(() => dispatch(createNotification('')),5000)
    }

    return (
        <div>
          <div>
            {anecdote.data || ''}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({ keyword, anecdotes })=> {
        if (keyword == null) return anecdotes
        return anecdotes.filter(anecdote => {
            return anecdote.data.toLowerCase().includes(keyword.toLowerCase())
        })
    })

    return (
        <>
        {anecdotes.sort((a, b) => b.votes - a.votes) 
        .map(anecdote =>
            <Anecdote anecdote={anecdote} key={anecdote.id}/>
            )}
        </>
    )
}

export default AnecdoteList