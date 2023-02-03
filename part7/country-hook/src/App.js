import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name === '') return
    axios.get(`https://restcountries.com/v2/name/${name}`).then(response =>
      setCountry(response.data[0])
    )
  }, [name])
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return (
      <p>Not found...</p>
    )
  }
  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  )
}

const App = () => {
  const userInput = useField('text')
  const [searchTerm, setSearchTerm] = useState('')
  const country = useCountry(searchTerm)

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchTerm(userInput.value)
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
         type={userInput.type} 
         value={userInput.value} 
         onChange={userInput.onChange} 
        />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App