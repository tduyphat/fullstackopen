import React, { useState } from 'react'


const Anecdote = ({text, votesCount}) =>
  <div>
    <p>{text}</p>
    <p>has {votesCount} votes</p>
  </div>


const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const MostVotes = ({anecdotes, votes}) => {
  const highestVoteCount = Math.max(...votes)
  const mostVotedAnecdoteIndex = votes.indexOf(highestVoteCount)
  const mostVotedAnecdote = anecdotes[mostVotedAnecdoteIndex]
  if (highestVoteCount === 0) {
    return (
      <p>You have not voted any anecdote</p>
    )
  }

  return (
    <div>
      <p>{mostVotedAnecdote}</p>
      <p>has {highestVoteCount} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))

  const handleAnecdotesClick = () => {
    console.log('you generated anecdote number '+ (anecdotes.indexOf(anecdotes[selected]) +1))
    const arrayIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(arrayIndex)
  }

  const handleVoteClick = () => {
    console.log('you voted anecdote number '+ (anecdotes.indexOf(anecdotes[selected]) +1))
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Anecdote text={anecdotes[selected]} votesCount={votes[selected]}  />
      <Button onClick={handleAnecdotesClick} text="next Anecdotes" />
      <Button onClick={handleVoteClick} text="vote"/>
      <h1>Anecdote with most votes</h1>
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App