import { PIRATE_WEATHER_API_KEY } from "./api-keys.js"
import { createCurrentWeather } from "./utils.js"
import { mainWeatherContainer } from "./nodes.js"
const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const getCurrentWeather = async (lat, lon) => {
    const weather = await fetchData(`https://api.pirateweather.net/forecast/${PIRATE_WEATHER_API_KEY}/${lat},${lon}?icon=pirate`)
    // createCurrentWeather(weather, mainWeatherContainer)
    console.log(weather);
    
}

export { getCurrentWeather }