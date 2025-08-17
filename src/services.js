import { PIRATE_WEATHER_API_KEY, GEOAPIFY_API_KEY } from "./api-keys.js"
import { createCurrentWeather } from "./utils.js"
import { mainWeatherContainer } from "./nodes.js"

const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

const getCurrentWeather = async () => {
    const location = await getCurrentLocation()
    const lat = location.coords.latitude
    const lon = location.coords.longitude
    const weather = await fetchData(`https://api.pirateweather.net/forecast/${PIRATE_WEATHER_API_KEY}/${lat},${lon}?units=si`)
    const locationInfo = await fetchData(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`)
    const currentCityityName = locationInfo.features[0].properties.city || locationInfo.features[0].properties.county

    createCurrentWeather(weather, currentCityityName,mainWeatherContainer)
}
export { getCurrentWeather }