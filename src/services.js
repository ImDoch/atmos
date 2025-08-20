import { PIRATE_WEATHER_API_KEY, GEOAPIFY_API_KEY } from "./api-keys.js"


const fetchData = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const getCurrentWeather = async (lat, lon) => {
    const weather = await fetchData(`https://api.pirateweather.net/forecast/${PIRATE_WEATHER_API_KEY}/${lat},${lon}?units=si`)
    return weather
}

const getCurrentLocation = async () => {
    const locationInfo = await fetchData(`https://api.geoapify.com/v1/ipinfo?apiKey=${GEOAPIFY_API_KEY}`)
    const cityName = locationInfo.city.name
    const lat = locationInfo.location.latitude
    const lon = locationInfo.location.longitude
    return {
        cityName,
        lat,
        lon
    }
}

const getSearchCities = async (query) => {
    const cities = fetchData(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${GEOAPIFY_API_KEY}`)
    return cities
}


export { getCurrentWeather, getCurrentLocation , getSearchCities }