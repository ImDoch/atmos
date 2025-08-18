import { PIRATE_WEATHER_API_KEY, GEOAPIFY_API_KEY } from "./api-keys.js"

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

const getCurrentWeather = async (lat, lon) => {
    const weather = await fetchData(`https://api.pirateweather.net/forecast/${PIRATE_WEATHER_API_KEY}/${lat},${lon}?units=si&extend=hourly`)
    return weather
}

const getCurrentCityName = async (lat, lon) => {
    const locationInfo = await fetchData(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`)
    const currentCityityName = locationInfo.features[0].properties.city || locationInfo.features[0].properties.county

    return currentCityityName
}
export { getCurrentWeather, getCurrentCityName, getCurrentLocation }