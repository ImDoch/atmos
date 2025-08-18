//nodos relacionados con el light-dark mode
const toggleModeButton = document.querySelector('.toggle-mode-button')
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
const mobileSearchButton = document.querySelector('.search__button--mobile')
const searchInput = document.querySelector('.search__input')

const currentWeatherSection = document.querySelector('.current-weather__content')

const currentForecastCardsContainer = document.querySelector('.current-forecast__cards-container')

const sevenDaysForecastCardsContainer = document.querySelector('.seven-days-forecast__cards-container')

export { toggleModeButton, magicIcon, termostatIcon, windIcon, rainIcon, uvIndexIcon, searchButtonMobile, mainWeatherContainer, searchContainer, backButton, mobileSearchButton, searchInput, currentWeatherSection, currentForecastCardsContainer, sevenDaysForecastCardsContainer }