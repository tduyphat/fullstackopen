import React, { useState, useEffect } from "react"
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY


const SingleMatchedCountry = ({singleCountry}) => {
    
    const [weather, setWeather] = useState()
    useEffect(() =>{
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${singleCountry.capital}&appid=${api_key}`)
        .then (response => {
            console.log(response.data)
            setWeather(response.data)     
        }
            )
    }, [singleCountry.capital])

    
    return (
        <div>
          <h1>{singleCountry.name.common}</h1>
          <div>capital {singleCountry.capital}</div>
          <div>population {singleCountry.population}</div>
          <h1>languages</h1>
            <ul>
                {Object.keys(singleCountry.languages).map(country => (
                <li key={country}>{singleCountry.languages[country]}</li>
                ))}
            </ul>
          <img src={singleCountry.flags.png} alt={singleCountry.name} width='10%'/>
          {weather && <div>
                <h2>Weather in {singleCountry.capital}</h2> 
                <p>{weather.weather[0].description}</p>
                <p><strong>temperature:</strong> {(weather.main.temp-273.15).toFixed(1)} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={singleCountry.capital}/>
                <p><strong>wind:</strong> {weather.wind.speed} m/s</p>
            </div>}
        </div>
      )
}

export default SingleMatchedCountry
