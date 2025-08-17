import { mainWeatherContainer, searchContainer, backButton } from "./nodes.js"
import { getCurrentWeather, getCurrentCityName, getCurrentLocation } from "./services.js"
import { createCurrentWeather } from "./utils.js"

const appNavigator = () => {
    if(location.hash.startsWith('#search=')) {
        searchPage()
    }
    else if (location.hash.startsWith('#weather=')) {
        weatherPage()
    }
    else {
        homePage()
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
}

const homePage = async () => {
    mainWeatherContainer.classList.remove('hidden')
    searchContainer.classList.add('hidden')
    backButton.classList.add('hidden')

    const location = await getCurrentLocation()
    const lat = location.coords.latitude
    const lon = location.coords.longitude
    const weather = await getCurrentWeather(lat, lon)
    const cityName = await getCurrentCityName(lat, lon)

    createCurrentWeather(weather, cityName)
}

const weatherPage = () => {
    mainWeatherContainer.classList.remove('hidden')
    searchContainer.classList.add('hidden')
    backButton.classList.remove('hidden')
}

const searchPage = () => {
    mainWeatherContainer.classList.add('hidden')
    searchContainer.classList.remove('hidden')
    backButton.classList.remove('hidden')
}

export { appNavigator }