const APIURL = "http://api.openweathermap.org"
const axios = require("axios")

export function searchWeather(loc) {
  return axios.get(`${APIURL}/data/2.5/weather?q=${loc}&units=imperial&appid=${process.env.REACT_APP_APIKEY}`)
}

export const searchForecast = loc => {
 return axios.get(`${APIURL}/data/2.5/forecast?q=${loc}&units=imperial&appid=${process.env.REACT_APP_APIKEY}`)
}