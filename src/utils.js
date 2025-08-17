import { magicIcon, termostatIcon, windIcon, rainIcon, uvIndexIcon, currentWeatherSection } from "./nodes.js"

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
const createCurrentWeather = (location, currentCityName,container) => {
    const div = document.createElement('div')
    const cityName = document.createElement('h1')
    const feelsLikeInfo = document.createElement('p')
    feelsLikeInfo.textContent = `Feels Like: ${location.currently.apparentTemperature}°`

    const weatherIcon = document.createElement('i')
    weatherIcon.classList.add('wi', `${iconMapping[location.currently.icon]}`)

    const currentTemperature = document.createElement('h2')
    currentTemperature.textContent = `${location.currently.temperature}°`

    if (currentCityName === undefined ) {
        cityName.textContent = 'ciudad'
    } else {
        cityName.textContent = currentCityName
    }

    div.append(cityName, feelsLikeInfo)
    currentWeatherSection.append(div, weatherIcon, currentTemperature)
    container.appendChild(currentWeatherSection)
}

export {toggleMode, createCurrentWeather}