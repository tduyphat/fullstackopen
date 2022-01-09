import React from 'react'
import SingleMatchedCountry from './SingleMatchedCountry'
import MultipleMatchedCountries from './MultipleMatchedCountries'

const Results = ({matchedCountries}) => {
    
   return (
    <>
        {(matchedCountries.length > 10) && <p>Too many matches, specify another filter</p>}
        {(matchedCountries.length > 1 && matchedCountries.length < 10) && matchedCountries.map(country => (
           <MultipleMatchedCountries key={country.name.common} country = {country}/>
        ))}
        {(matchedCountries.length === 1) && 
        <SingleMatchedCountry singleCountry={matchedCountries[0]} />
        }
    </>
   )
}

export default Results