import React, { useState, useEffect } from "react"
import Filter from "./components/Filter"
import Results from "./components/Results"
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase())))
      })
  }, [searchTerm])

const handleSearch = (event) => {
  console.log(event.target.value)
  setSearchTerm(event.target.value)
}

return (
  <div>
  <Filter value={searchTerm} onChange={handleSearch}/>

  <Results matchedCountries={countries} setSearchFilter={countries} />

  </div>
)

}

export default App
