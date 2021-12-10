import React, { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <div>
      <h1>statistics</h1>
      
        <table>
          <tbody>
            <StatisticLine text ="good" value ={props.good} />
            <StatisticLine text ="neutral" value ={props.neutral} />
            <StatisticLine text ="bad" value ={props.bad} />
            <StatisticLine text ="all" value ={props.all} />
            <StatisticLine text ="average" value ={props.average/props.all} />
            <StatisticLine text ="positive" value ={(props.good/props.all)*100 + " %"} />
          </tbody>
      </table>
    
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    console.log('you rated good')
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average + 1)
  }

  const handleNeutralClick = () => {
    console.log('you rated neutral')
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    console.log('you rated bad')
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)
  }

  //What display on the browser
  return (
    <div>
      <Header header="give feedback"/>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} />
    </div>
  )
}

export default App

