import React, { useState, useEffect } from 'react'
import { observer } from "mobx-react"
import { searchWeather } from "./request"
import ListGroup from "react-bootstrap/ListGroup"


function CurrentWeather({ keywordStore }) {
  const [ weather, setWeather ] = useState({})

  const getWeatherForecast = async keyword => {
    const response = await searchWeather(keyword)
    setWeather(response.data)
  }

  useEffect(() => {
    keywordStore.keyword && getWeatherForecast(keywordStore.keyword)
  }, [keywordStore.keyword])

  return (
    <div>
      {weather.main ? (
        <ListGroup>
          <ListGroup.Item>
            Current Temperature: {weather.main.temp - 273.15 } C
          </ListGroup.Item>
          <ListGroup.Item>
            High: {weather.main.temp_max - 273.15} C
          </ListGroup.Item>
          <ListGroup.Item>
            Low: {weather.main.temp_min - 273.15} C
          </ListGroup.Item>
          <ListGroup.Item>
            Pressure: {weather.main.pressure}
          </ListGroup.Item>
          <ListGroup.Item>
            Humidity: {weather.main.humidity}
          </ListGroup.Item>
        </ListGroup>
      ) : null}
    </div>
  )
}

export default observer(CurrentWeather)
