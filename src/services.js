import { OPEN_WEATHER_API_KEY } from "./api-keys.js"
import { createCurrentWeather } from "./utils.js"
import { mainWeatherContainer } from "./nodes.js"
const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const getCurrentWeather = async (lat, lon) => {
    const weather = await fetchData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`)
    createCurrentWeather(weather, mainWeatherContainer)
}

const getTodaysForecast = async (lat, lon) => {
    const fiveDaysForecast = await fetchData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`)
    console.log(fiveDaysForecast);
    
}

export { getCurrentWeather, getTodaysForecast}