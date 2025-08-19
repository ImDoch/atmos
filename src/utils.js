import { magicIcon, termostatIcon, windIcon, rainIcon, uvIndexIcon, currentWeatherSection, currentForecastCardsContainer, sevenDaysForecastCardsContainer } from "./nodes.js"

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

const formatHour = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-US', {
        hour: "numeric",
        minute: "2-digit"
    });
}

const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short'
    }).format(date)

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
const createCurrentWeather = (localClimate, currentCityName) => {
    currentWeatherSection.innerHTML = ''

    const div = document.createElement('div')

    const cityName = document.createElement('h1')
    if (currentCityName === undefined ) {
        cityName.textContent = 'ciudad'
    } else {
        cityName.textContent = currentCityName
    }

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

        const weatherType = document.createElement('h3')
        weatherType.textContent = forecast.precipType

        const minMaxTemperature = document.createElement('p')
        const maxTemperature = document.createElement('span')
        maxTemperature.textContent = `${Math.round(forecast.apparentTemperatureMax)}°`
        const minTemperature = document.createTextNode(`/${Math.round(forecast.apparentTemperatureMin)}°`)

        weatherIconContainer.append(weatherIcon)
        div.append(weatherIconContainer, weatherType)
        minMaxTemperature.append(maxTemperature, minTemperature)
        sevenDaysForecastCard.append(dayOfWeek, div, minMaxTemperature)
        return sevenDaysForecastCard
    })
    sevenDaysForecastCardsContainer.append(...sevenDaysForecastCards)
}


export {toggleMode, createCurrentWeather, createTodaysForecastCard, createSevenDaysForecastCard}