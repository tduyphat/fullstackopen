import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')                                  //states of objects
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const personsFilter = persons.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))     //search engine

  
  useEffect(() => {
    console.log('effect')
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  
  
  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {                                                        //contact object
      name: newName,
      id: persons.length + 1,
      number: newNumber,

    }
    
    if (persons.map(person => person.name).includes(newName) === true) {           //if name already exists
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        handleUpdate(newName)
      }
  }

    else {

      personServices
      .create(contactObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${newName}`)
        setTimeout(()=> {
          setMessage(null)
        },5000)
      })
    }
    
    setNewName('')
    setNewNumber('')
  
  }
  
  //Event Handlers
  
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

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name} ?`)) {
      personServices
      .remove(id)
      .then(
        setPersons(persons.filter(person => person.id !== id)))
      .catch(error => {
        console.log(error)
      })
    }
  }

  const handleUpdate = (name) => {
    const person = persons.find(n => n.name.toLowerCase() === name.toLowerCase())
    const changedName = {...person, number: newNumber}
      personServices
      .update(person.id, changedName)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
      })
      .catch(error =>{
        console.log(error)
        setErrorMessage(
          `Informations of ${person.name} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  return (                                  //render section
    <div>
      <h2>Phonebook</h2>
        
      <Notification message={message} messageClass='message'/> 

      <Notification message={errorMessage} messageClass='error' />
      
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />

      <h3>add a new</h3>

      <PersonForm onSubmit={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
     
      <h3>Numbers</h3>
      
      <Persons persons={searchTerm.length>0 ? personsFilter : persons} handleDelete={handleDelete}/>
    
    </div>
  )
}

export default App
