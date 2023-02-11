import React, { useState } from 'react'
import Select from 'react-select'
import { useQuery, useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const result = useQuery(ALL_AUTHORS)

  if(!props.show) return null 

  if(result.loading) return (
    <>Wait a bit...</>
  )

  const submit = async (event) => {
    event.preventDefault()
    let yearBorn = Number(year)
    let nameValue = name.value
    editYear({ variables: {nameValue, yearBorn}})
    setYear('')
  }

  const authors = result.data.allAuthors

  const options = []

  authors.forEach(author => options.push({value: author.name, label: author.name}))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <h2>Set birthyear</h2>
        name
        <Select options={options} onChange={setName}/>
        <br />
        born
        <input
          type="number"
          value={year}
          onChange={({ target }) => setYear(target.value)}
        />
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
