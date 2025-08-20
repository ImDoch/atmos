import { magicIcon, termostatIcon, windIcon, rainIcon, uvIndexIcon, currentWeatherSection, currentForecastCardsContainer, sevenDaysForecastCardsContainer, airConditionsRealFeel, airConditionsWind, airConditionsChanceRain, airConditionsUvIndex, searchResultsCardsContainer } from "./nodes.js"
import { getCurrentWeather } from "./services.js"

const iconMapping = {
  "clear-day": "wi-day-sunny",
  "clear-night": "wi-night-clear",
  "rain": "wi-rain",
  "snow": "wi-snow",
  "sleet": "wi-sleet",
  "wind": "wi-strong-wind",
  "fog": "wi-fog",
  "cloudy": "wi-cloudy",
  "partly-cloudy-day": "wi-day-cloudy",
  "partly-cloudy-night": "wi-night-alt-cloudy",
  "hail": "wi-hail",
  "thunderstorm": "wi-thunderstorm",
  "tornado": "wi-tornado"
}

//funcion para dar formato a la hora (9:00 PM)
const formatHour = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-US', {
        hour: "numeric",
        minute: "2-digit"
    });
}

//funcion para dar formato a los dias (Wed, Thu)
const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short'
    }).format(date)

}

//funcion para dar formato UTF-8 a strings 
const fixEncoding = (string) => {
    const bytes = Uint8Array.from(string, c => c.charCodeAt(0))
    return new TextDecoder('utf-8').decode(bytes)
}

//cambio de modo
const toggleMode = () => {
    document.body.classList.toggle('light')
    if(document.body.classList.contains('light')) {
        magicIcon.src = 'assets/magic-icon-white.svg'
        magicIcon.parentElement.style.backgroundColor = 'hsl(0 0% 5%)'
        magicIcon.parentElement.style.color = 'hsl(0 0% 95%)'
        termostatIcon.src = './assets/termostat-icon-light.svg'
        windIcon.src = './assets/wind-icon-light.svg'
        rainIcon.src = './assets/rain-icon-light.svg'
        uvIndexIcon.src = './assets/uv-index-icon-light.svg'
    }
    else {
        magicIcon.src = 'assets/magic-icon-black.svg'
        magicIcon.parentElement.style.backgroundColor = 'hsl(0 0% 100%)'
        magicIcon.parentElement.style.color = 'hsl(0 0% 5%)'
        termostatIcon.src = './assets/termostat-icon-dark.svg'
        windIcon.src = './assets/wind-icon-dark.svg'
        rainIcon.src = './assets/rain-icon-dark.svg'
        uvIndexIcon.src = './assets/uv-index-icon-dark.svg'
    }
    
}

//crear elementos dinamicos de current weather
const createCurrentWeather = (localClimate, cityNameText) => {
    currentWeatherSection.innerHTML = ''

    const div = document.createElement('div')

    const cityName = document.createElement('h1')
    cityName.textContent = fixEncoding(cityNameText)
    
    const feelsLikeInfo = document.createElement('p')
    feelsLikeInfo.textContent = `Feels Like: ${Math.round(localClimate.currently.apparentTemperature)}°`

    const weatherIconContainer = document.createElement('div')
    const weatherIcon = document.createElement('i')
    weatherIcon.classList.add('wi', `${iconMapping[localClimate.currently.icon]}`)

    const currentTemperature = document.createElement('h2')
    currentTemperature.textContent = `${Math.round(localClimate.currently.temperature)}°`

    div.append(cityName, feelsLikeInfo)
    weatherIconContainer.append(weatherIcon)
    currentWeatherSection.append(div, weatherIconContainer, currentTemperature)
}

const createTodaysForecastCard = (localClimate) => {
    currentForecastCardsContainer.innerHTML = ''

    const hourlyForecast = localClimate.hourly.data
    const actualData = new Date()
    const actualDay = actualData.getDate()
    const actualHour = actualData.getHours()

    const todaysForecast = hourlyForecast.filter(forecast => {
        const date = new Date(forecast.time * 1000)
        return date.getDate() === actualDay
    })

    const midnightForecast = hourlyForecast.find(forecast => {
    const date = new Date(forecast.time * 1000)
    return date.getDate() === actualDay + 1 && date.getHours() === 0
    })

    let combinedForecast = [...todaysForecast]
    if (midnightForecast) combinedForecast.push(midnightForecast)

    const upcomingForecasts = combinedForecast.filter(forecast => {
        const date = new Date(forecast.time * 1000)
        return date.getHours() >= actualHour || date.getHours() === 0
    })

    const threeHourForecast = upcomingForecasts.filter(forecast => {
        const hour = new Date(forecast.time * 1000).getHours()
        return hour % 3 === 0
    })

    const hourlyForecastCards = threeHourForecast.map(forecast => {
        const currentForecastCard = document.createElement('article')
        currentForecastCard.classList.add('current-forecast__card')

        const hour = document.createElement('h3')
        hour.textContent = formatHour(forecast.time)

        const weatherIconContainer = document.createElement('div')
        const weatherIcon = document.createElement('i')
        weatherIcon.classList.add('wi', `${iconMapping[forecast.icon]}`)

        const temperature = document.createElement('p')
        temperature.textContent = `${Math.round(forecast.temperature)}°`

        weatherIconContainer.append(weatherIcon)
        currentForecastCard.append(hour, weatherIconContainer, temperature)

        return currentForecastCard
    })

    currentForecastCardsContainer.append(...hourlyForecastCards)
}

const createSevenDaysForecastCard = (localClimate) => {
    sevenDaysForecastCardsContainer.innerHTML = ''
    const dailyForecast = localClimate.daily.data
    const sevenDaysForecastCards = dailyForecast.slice(0, 7).map((forecast, index) => {
        if(index === 0) forecast.time = 'Today'
        
        const sevenDaysForecastCard = document.createElement('article')
        sevenDaysForecastCard.classList.add('seven-days-forecast__card')

        const dayOfWeek = document.createElement('p')
        if(forecast.time === 'Today') {
            dayOfWeek.textContent = forecast.time
        }
        else {
            dayOfWeek.textContent = formatDay(forecast.time)
        }

        const div = document.createElement('div')
        
        const weatherIconContainer = document.createElement('div')
        const weatherIcon = document.createElement('i')
        weatherIcon.classList.add('wi', `${iconMapping[forecast.icon]}`)

        const maxTemperature = document.createElement('h3')
        maxTemperature.textContent = `${Math.round(forecast.apparentTemperatureMax)}°`
        
        const minTemperature = document.createElement('p')
        minTemperature.textContent = `min: ${Math.round(forecast.apparentTemperatureMin)}°`

        weatherIconContainer.append(weatherIcon)
        div.append(weatherIconContainer, maxTemperature)
        sevenDaysForecastCard.append(dayOfWeek, div, minTemperature)
        return sevenDaysForecastCard
    })
    sevenDaysForecastCardsContainer.append(...sevenDaysForecastCards)
}

const fillAirConditionsContainer = (weather) => {
    airConditionsRealFeel.textContent = `${Math.round(weather.currently.apparentTemperature)}°`
    airConditionsWind.textContent = `${(weather.currently.windSpeed * 3.6).toFixed(2)} Km/h`
    airConditionsChanceRain.textContent = `${(weather.currently.precipProbability * 100).toFixed(0)}%`
    airConditionsUvIndex.textContent = weather.currently.uvIndex
}

const createSearchResultsCard = async (searchLocation) => {
    searchResultsCardsContainer.innerHTML = ''

    const searchResultsCards = await Promise.all(
        searchLocation.features.map(async (feature) => {
            const lat = feature.properties.lat
            const lon = feature.properties.lon
            const locationWeather = await getCurrentWeather(lat, lon)

            const searchResultsCard = document.createElement('article')
            searchResultsCard.classList.add('search-results__card')

            const weatherIconContainer = document.createElement('div')

            const weatherIcon = document.createElement('i')
            weatherIcon.classList.add('wi', `${iconMapping[locationWeather.currently.icon]}`)

            const locationInfoContainer = document.createElement('div')

            const cityName = document.createElement('h2')
            const cityNameText = feature.properties.city || feature.properties.name
            cityName.textContent = cityNameText

            const countryName = document.createElement('p')
            countryName.textContent = feature.properties.country

            const locationTemperature = document.createElement('h3')
            locationTemperature.textContent = `${Math.round(locationWeather.currently.temperature)}°`

            weatherIconContainer.append(weatherIcon)
            locationInfoContainer.append(cityName, countryName)
            searchResultsCard.append(weatherIconContainer, locationInfoContainer, locationTemperature)

            searchResultsCard.addEventListener('click', async () => {
                location.hash = `#weather=${feature.properties.city}-${feature.properties.country}`
                createCurrentWeather(locationWeather, cityNameText)
                createTodaysForecastCard(locationWeather)
                createSevenDaysForecastCard(locationWeather)
                fillAirConditionsContainer(locationWeather)
            })

            return searchResultsCard
        })
    )
    searchResultsCardsContainer.append(...searchResultsCards)
}


export { toggleMode, createCurrentWeather, createTodaysForecastCard, createSevenDaysForecastCard, fillAirConditionsContainer, createSearchResultsCard }