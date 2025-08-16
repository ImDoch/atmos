import { OPEN_WEATHER_API_KEY } from "./api-keys.js"

const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}
const getActualLocation= async () => {
    const actualLocation = await fetchData('https://ipapi.co/json/')
    const lat = actualLocation.latitude
    const lon = actualLocation.longitude
    return {
        lat,
        lon
    }
}

const getCurrentWeather = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`)
    const data = await response.json()
}