import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  
  useEffect(() => {
    console.log('effect')
    axios
    .get('http://localhost:3002/persons')
    .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  
  
  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    }
    if (persons.map(person => person.name).includes(newName) === true) {
      alert(newName +' is already added to phonebook')
      return
    }
    
    else {
      setPersons(persons.concat(contactObject))
      setNewName('')
    }
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const results = !searchTerm
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ) 

  return (
    <div>
      <h2>Phonebook</h2>
        
        <Filter value={searchTerm} onChange={handleSearch} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
     
      <h3>Numbers</h3>
      
      <ul>
        {results.map(person => 
          <Persons key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

export default App
