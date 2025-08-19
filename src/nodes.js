//nodos manejadores de eventos:
const header = document.querySelector('header')
const searchForms = document.querySelectorAll('.search-form')

//nodos relacionados con el light-dark mode
const magicIcon = document.querySelector('.magic-icon')
const termostatIcon = document.querySelector('.termostat-icon')
const windIcon = document.querySelector('.wind-icon')
const rainIcon = document.querySelector('.rain-icon')
const uvIndexIcon = document.querySelector('.uv-index-icon')
const searchButtonMobile = document.querySelector('.search__button--mobile')

//nodos relacionados con las vistas
const mainWeatherContainer = document.querySelector('.weather-grid-container')
const searchContainer = document.querySelector('.search-results-container')
const backButton = document.querySelector('.back-button')
const searchInputs = document.querySelectorAll('.search__input')

//nodos para renderizar la información
const currentWeatherSection = document.querySelector('.current-weather__content')
const currentForecastCardsContainer = document.querySelector('.current-forecast__cards-container')
const sevenDaysForecastCardsContainer = document.querySelector('.seven-days-forecast__cards-container')
const airConditionsRealFeel = document.querySelector('.air-conditions__real-feel')
const airConditionsWind = document.querySelector('.air-conditions__wind')
const airConditionsChanceRain = document.querySelector('.air-conditions__chance-rain')
const airConditionsUvIndex = document.querySelector('.air-conditions__uv-index')


export { header, magicIcon, termostatIcon, windIcon, rainIcon, uvIndexIcon, searchButtonMobile, mainWeatherContainer, searchContainer, backButton, searchInputs, currentWeatherSection, currentForecastCardsContainer, sevenDaysForecastCardsContainer, airConditionsRealFeel, airConditionsWind, airConditionsChanceRain, airConditionsUvIndex, searchForms }