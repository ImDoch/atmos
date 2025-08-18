import { magicIcon, termostatIcon, windIcon, rainIcon, uvIndexIcon, currentWeatherSection, currentForecastCardsContainer } from "./nodes.js"

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
    return date.getHours().toString().padStart(2, '0') + ':00'
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
    const feelsLikeInfo = document.createElement('p')
    feelsLikeInfo.textContent = `Feels Like: ${localClimate.currently.apparentTemperature}°`

    const weatherIcon = document.createElement('i')
    weatherIcon.classList.add('wi', `${iconMapping[localClimate.currently.icon]}`)

    const currentTemperature = document.createElement('h2')
    currentTemperature.textContent = `${localClimate.currently.temperature}°`

    if (currentCityName === undefined ) {
        cityName.textContent = 'ciudad'
    } else {
        cityName.textContent = currentCityName
    }

    div.append(cityName, feelsLikeInfo)
    currentWeatherSection.append(div, weatherIcon, currentTemperature)
}

const createCurrentForecastCard = (localClimate) => {
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
    console.log(threeHourForecast)
}


export {toggleMode, createCurrentWeather, createCurrentForecastCard}