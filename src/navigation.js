import { mainWeatherContainer, searchContainer, backButton } from "./nodes.js"
import { getActualLocation, getCurrentWeather } from "./services.js"

const navigator = () => {
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
    const { lat, lon } = await getActualLocation()
    getCurrentWeather(lat, lon)
    backButton.classList.add('hidden')
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

export { navigator }