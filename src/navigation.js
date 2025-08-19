import { mainWeatherContainer, searchContainer, backButton, airConditionsRealFeel, airConditionsWind, airConditionsChanceRain, airConditionsUvIndex } from "./nodes.js"
import { getCurrentWeather, getCurrentLocation, getInputCities } from "./services.js"
import { createCurrentWeather, createTodaysForecastCard, createSevenDaysForecastCard } from "./utils.js"

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

    console.log(weather)

    createCurrentWeather(weather, cityName)
    createTodaysForecastCard(weather)
    createSevenDaysForecastCard(weather)
    airConditionsRealFeel.textContent = `${Math.round(weather.currently.apparentTemperature)}°`
    airConditionsWind.textContent = `${(weather.currently.windSpeed * 3.6).toFixed(2)} Km/h`
    airConditionsChanceRain.textContent = `${(weather.currently.precipProbability * 100).toFixed(0)}%`
    airConditionsUvIndex.textContent = weather.currently.uvIndex

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

    const [_, query] = location.hash.split('=')
    if(query !== '') {
        const cities = await getInputCities(query)
        console.log(cities)
    }
    
}

export { appNavigator }