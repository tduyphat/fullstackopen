import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Anecdote = ({anecdote, voteAnecdote, createNotification}) => {
    
    const vote = (anecdote) => {
        voteAnecdote(anecdote.id)
        createNotification(`you voted '${anecdote.data}'`, 5000)
    }

    return (
        <div>
          <div>
            {anecdote.data}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteList = (props) => {
    const {voteAnecdote, createNotification} = props
    return (
        <>
        {props.anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
            <Anecdote anecdote={anecdote} voteAnecdote={voteAnecdote} createNotification={createNotification} key={anecdote.id}/>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    if(state.keyword === null) return {anecdotes : state.anecdotes}
    return {anecdotes : state.anecdotes.filter(anecdote => anecdote.data.toLowerCase().includes(state.keyword.toLowerCase())) }
}

const mapDispatchToProps = {
    voteAnecdote,
    createNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)