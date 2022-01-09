import React, { useState } from 'react'
import SingleMatchedCountry from './SingleMatchedCountry'


const MultipleMatchedCountries = ({country}) => {
    const [view, setView] = useState(false)
    const handleView = () => {
        setView(!view)
    }

    return (
        <div>
            <p>{country.name.common}</p>
            <button onClick={handleView}>show</button>
            {(view === true) && <SingleMatchedCountry singleCountry={country}/>}
        </div>
    )
}

export default MultipleMatchedCountries