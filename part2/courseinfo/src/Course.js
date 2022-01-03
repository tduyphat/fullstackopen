import React from 'react'

const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }

  const Part = ({part, exercises}) => {
    return (
      <p>{part} {exercises}</p>
    )
  }

  const Content = ({parts}) => {
    return (
      <div>
      {parts.map((part, i) =>
        <Part key={i} part={part.name} exercises={part.exercises} />
      )}
      </div>  
    )
  }

    const Total = ({parts}) => {
      const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <p>Number of exercises {total}</p>
    )
  }
  

  const Course = ({course}) => {
    return (
      <div>
      {course.map(course =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      )}
      </div> 
    )
  }


  export default Course