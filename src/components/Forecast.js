import React, { useState, useEffect } from 'react'
import { observer } from "mobx-react"
import { searchForecast } from "../request"
import ListGroup from "react-bootstrap/ListGroup"
import Card from "react-bootstrap/Card"

function Forecast({ keywordStore }) {
  const [forecast, setForecast] = useState({})

  const getWeatherForecast = async keyword => {
    try {
      const response = await searchForecast(keyword)
      console.log(response)
      setForecast(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    keywordStore.keyword && getWeatherForecast(keywordStore.keyword)
  }, [keywordStore.keyword])

  const roundUp = (number) => {
    return Math.max(Math.round(number * 10) / 10).toFixed(0)
  }

  const dateFormat = (timeStamp) => {

    let unix_timestamp = timeStamp
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
  }

  function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
      h = hh - 12;
      dd = "PM";
    }
    if (h == 0) {
      h = 12;
    }
    m = m < 10 ? "0" + m : m;
  
    s = s < 10 ? "0" + s : s;
  
    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */
  
    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
  
    var replacement = h + ":" + m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " " + dd;
  
    return date.replace(pattern, replacement);
  }
  

  return (
    <div>
      {Array.isArray(forecast.list) ? (
        <div>
          {forecast.list.map((l, index) => {
            return (
              <Card body key={index}>
                <ListGroup>
                  <ListGroup.Item>
                    Date: {formatDate(l.dt_txt)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Temperature: {roundUp(l.main.temp)}<p>&deg;F</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    High: {roundUp(l.main.temp_max)}<p>&deg;F</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Low: {roundUp(l.main.temp_min)}<p>&deg;F</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Pressure: {l.main.pressure}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default observer(Forecast)
