import React, { useState, useEffect } from 'react'
import { observer } from "mobx-react"
import { searchWeather } from "../request"
import ListGroup from "react-bootstrap/ListGroup"


function CurrentWeather({ keywordStore }) {
  const [ weather, setWeather ] = useState({})

  const getWeatherForecast = async keyword => {
    try {
      const response = await searchWeather(keyword)
      console.log(response)
      setWeather(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    keywordStore.keyword && 
    getWeatherForecast(keywordStore.keyword);
  }, [keywordStore.keyword])

  const roundUp = (number) => {
    return Math.max( Math.round(number * 10) / 10).toFixed(0)
  }

  return (
    <div>
      {weather.main ? (
        <ListGroup>
          <ListGroup.Item>
            Current Temperature: {roundUp(weather.main.temp)}<p>&deg;F</p>
          </ListGroup.Item>
          <ListGroup.Item>
            High: {roundUp(weather.main.temp_max)}<p>&deg;F</p>
          </ListGroup.Item>
          <ListGroup.Item>
            Low: {roundUp(weather.main.temp_min)}<p>&deg;F</p>
          </ListGroup.Item>
          <ListGroup.Item>
            Pressure: {weather.main.pressure}
          </ListGroup.Item>
          <ListGroup.Item>
            Humidity: {weather.main.humidity}%
          </ListGroup.Item>
        </ListGroup>
      ) : null}
    </div>
  )
}

export default observer(CurrentWeather)
