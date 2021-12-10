import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    console.log(props)
    return (
    <div>
      <h1>{props.course}</h1>
    </div>
    )
  }
  
  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>{props.part} {props.exercises}</p>
      </div>
    )
  }

  const Content = (props) => {
    console.log(props)
    return (
    <div>
      <Part part={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Part part={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Part part={course.parts[2].name} exercises={course.parts[2].exercises} />
    </div>
    )
  }

  const Total = (props) => {
    console.log(props)
    return (
    <div>
      <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} </p>
    </div>
    )
  } 

  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App