import { mainWeatherContainer, searchContainer, backButton } from "./nodes.js"
import { getCurrentWeather, getCurrentLocation, getSearchCities } from "./services.js"
import { createCurrentWeather, createTodaysForecastCard, createSevenDaysForecastCard,createSearchResultsCard, fillAirConditionsContainer } from "./utils.js"

const appNavigator = () => {
    if(location.hash.startsWith('#search=')) {
        searchPage()
    }
    else if (location.hash.startsWith('#weather=')) {
        weatherPage()
    }
    else {
        location.hash = '#home'
        homePage()
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
}

const homePage = async () => {
    mainWeatherContainer.classList.remove('hidden')
    searchContainer.classList.add('hidden')
    backButton.classList.add('hidden')

    const { cityName, lat, lon } = await getCurrentLocation()
    const weather = await getCurrentWeather(lat, lon)

    createCurrentWeather(weather, cityName)
    createTodaysForecastCard(weather)
    createSevenDaysForecastCard(weather)
    fillAirConditionsContainer(weather)
}

const weatherPage = () => {
    mainWeatherContainer.classList.remove('hidden')
    searchContainer.classList.add('hidden')
    backButton.classList.remove('hidden')
}

const searchPage = async () => {
    mainWeatherContainer.classList.add('hidden')
    searchContainer.classList.remove('hidden')
    backButton.classList.remove('hidden')

    const params = new URLSearchParams(location.hash.slice(1))
    const query = params.get('search') || ''
    if(query !== '') {
        const cities = await getSearchCities(query)
        createSearchResultsCard(cities)
    }
    
}

export { appNavigator }